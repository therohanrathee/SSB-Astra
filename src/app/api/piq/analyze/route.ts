import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // Allow sufficient time for multimodal vision processing

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_PIQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_PIQ_API_KEY is not configured on server" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded for PIQ analysis" },
        { status: 400 }
      );
    }

    // Convert uploaded files to Gemini inline_data parts
    const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [];

    // System prompt tailored for official DIPR Form 107-A (Revised)
    const systemPrompt = `You are the Expert DIPR (DRDO) Personal Information Questionnaire (PIQ Form 107-A Revised) Analyzer for SSB Astra.
Analyze the provided document (which may be a 2-page PDF, Page 1 image, Page 2 image, or multiple photo scans of a handwritten or typed PIQ).
Accurately transcribe all handwritten and printed details into the following strict JSON schema:

{
  "full_name": string (in CAPITALS as in Matriculation certificate),
  "father_name": string (in CAPITALS),
  "gender": "male" | "female" | "",
  "dob": string (YYYY-MM-DD or DD/MM/YYYY),
  "target_entry": string (e.g. "CDS", "NDA", "AFCAT", "TGC", "TES", "NCC"),
  "religion": string,
  "mother_tongue": string,
  "category": string ("General" | "OBC" | "SC" | "ST"),
  "marital_status": string ("Single" | "Married" | "Widower"),
  
  "max_residence_place": string,
  "max_residence_district": string,
  "max_residence_state": string,
  "max_residence_population": string,
  
  "present_residence_place": string,
  "present_residence_district": string,
  "present_residence_state": string,
  "present_residence_population": string,
  
  "perm_residence_place": string,
  "perm_residence_district": string,
  "perm_residence_state": string,
  "perm_residence_population": string,
  "perm_residence_district_hq": boolean,
  
  "parents_alive": boolean,
  "father_mother_death_age": string,
  "family_members": [
    {
      "relation": string,
      "education": string,
      "occupation": string,
      "monthly_income": string
    }
  ],
  
  "education_records": [
    {
      "qualification": string,
      "institution": string,
      "board_university": string,
      "year": string,
      "div_marks_pct": string,
      "medium": string,
      "boarder_dayscholar": string,
      "achievement": string
    }
  ],
  
  "height_m": string,
  "weight_kg": string,
  "present_occupation": string,
  "monthly_income": string,
  
  "has_ncc": boolean,
  "ncc_wing": string ("Army" | "Navy" | "Air Force"),
  "ncc_division": string,
  "ncc_certificate": string,
  "ncc_duration": string,
  
  "sports_records": [
    {
      "sport": string,
      "duration": string,
      "represented_level": string,
      "achievement": string
    }
  ],
  
  "hobbies": string,
  "extra_curricular": string,
  "responsibilities_held": string,
  
  "nature_of_commission": string ("Permanent Commission (PC)" | "Short Service Commission (SSC)"),
  "service_preference": string,
  "total_chances_availed": string,
  "ssb_attempts": [
    {
      "entry": string,
      "board_place": string,
      "date": string,
      "chest_batch_no": string,
      "result": string
    }
  ]
}

Instructions:
1. Handle handwriting gracefully. If handwriting has common Indian abbreviations (e.g. "KV No. 1", "APS", "CBSE", "CO", "CH-34", "B.Tech CSE"), expand or transcribe accurately.
2. If gender is not explicitly stated, infer from Cadet salutations (e.g. "Shri" / "Kumar" vs "Kumari", or boy/girl school contexts). If unknown, leave empty.
3. If an item or table row is not filled or blank on the form, leave its strings empty ("") or omit blank array entries.
4. Output ONLY valid JSON matching the schema above.`;

    parts.push({ text: systemPrompt });

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = buffer.toString("base64");
      const mimeType = file.type || "image/jpeg";

      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data
        }
      });
    }

    // Call Google Gemini API (gemini-3.5-flash-lite as primary high-quota model, gemini-3.8-flash as fallback)
    const modelsToTry = ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];
    let resultJsonText: string | null = null;
    let lastError: string | null = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.1
            }
          })
        });

        if (!geminiRes.ok) {
          const errText = await geminiRes.text();
          console.warn(`Model ${model} returned error status ${geminiRes.status}:`, errText);
          lastError = `Model ${model} failed (${geminiRes.status}): ${errText}`;
          continue; // try next model
        }

        const data = await geminiRes.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          resultJsonText = candidateText;
          break; // successfully extracted!
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
        console.warn(`Attempt with ${model} failed:`, err);
      }
    }

    if (!resultJsonText) {
      return NextResponse.json(
        { error: "AI document extraction failed across available models", details: lastError },
        { status: 502 }
      );
    }

    const parsedData = JSON.parse(resultJsonText);
    return NextResponse.json({
      success: true,
      data: parsedData
    });
  } catch (error: unknown) {
    console.error("PIQ Analysis API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to process PIQ document", details: message },
      { status: 500 }
    );
  }
}
