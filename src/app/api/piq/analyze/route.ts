import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

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

    // Convert and normalize uploaded files to Gemini inline_data parts
    const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [];

    // Refined System Prompt: Form Extraction + Senior Interviewing Officer (IO) Dossier Assessment
    const systemPrompt = `You are a Senior Armed Forces Selection Board Interviewing Officer (IO) and DIPR Form 107-A (Revised) PIQ Evaluator for SSB Astra.

Your task is two-fold:
1. TRANSCRIBE & EXTRACT: Accurately parse the uploaded document (PDF or photos of handwritten/typed DIPR Form 107-A) into the candidate's exact profile fields.
2. OFFICER DOSSIER ASSESSMENT & SCORING: Evaluate the candidate's overall profile from the perspective of an SSB Interviewing Officer and GTO. Compute an authoritative PIQ Score out of 100 based on the 4 classical officer appraisal pillars:
   - Pillar A: Academic Consistency & Cognitive Growth (25 points)
   - Pillar B: Physical Stamina, Sports & NCC Bearing (25 points)
   - Pillar C: Leadership, Initiative & Positions of Responsibility Held (25 points)
   - Pillar D: Hobbies, Self-Development & Service Alignment (25 points)

Output ONLY valid JSON matching this exact structure:
{
  "form_data": {
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
        "qualification": string (e.g. "Matriculation / 10th", "10+2 / Intermediate / 12th", "Graduation", "Post Graduation (Master's / M.Tech / M.Sc / MBA / etc.)"),
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
  },
  "assessment": {
    "piq_score": number (integer between 0 and 100),
    "overall_verdict": string (e.g. "STRONG OFFICER CANDIDATE PROFILE" or "MODERATE - NEEDS LEADERSHIP SUBSTANTIATION"),
    "score_breakdown": {
      "academics": { "score": number, "max": 25, "assessment": string },
      "sports_and_ncc": { "score": number, "max": 25, "assessment": string },
      "leadership_and_responsibility": { "score": number, "max": 25, "assessment": string },
      "hobbies_and_depth": { "score": number, "max": 25, "assessment": string }
    },
    "key_strengths": [
      string (3 to 4 specific positive OLQ indicators in this PIQ that will impress the IO)
    ],
    "vulnerabilities_and_red_flags": [
      string (2 to 4 potential red flags or gaps the IO will probe, such as academic dips, lack of team sports, gap years, or multiple previous conference outs)
    ],
    "io_probable_questions": [
      string (4 to 5 sharp, realistic rapid-fire questions the Interviewing Officer is guaranteed to ask based on this exact PIQ)
    ],
    "recommendations_for_improvement": [
      string (3 to 4 actionable tactical recommendations on how to defend and present this PIQ in the interview)
    ]
  }
}

Important Instructions:
1. STRICT FACTUAL EXTRACTION: Transcribe ONLY what is physically written or visible in the uploaded document. Never invent, hallucinate, or assume schools, family members, sports, marks, or previous attempts. If a field or table is empty or unreadable in the user's form, return "" or [].
2. Handwriting & Abbreviations: Accurately read handwritten or printed text. Expand standard defense/educational abbreviations only when clearly written (e.g. "CBSE", "ICSE", "B.Tech").
3. Blank or Partial Forms: If the uploaded form is partially filled or unreadable in some sections, extract only the valid sections and evaluate the score strictly on the verified facts provided.
4. Officer Assessment Accuracy: The PIQ score and Interviewing Officer assessment must be 100% grounded in the extracted form data. If the candidate has few extracurriculars or achievements, reflect that objectively in the breakdown and recommendations rather than fabricating imaginary activities.
5. RESIDENCE RESOLUTION (Item 4): Candidates frequently write "Same as above", "Do", "-do-", or "as above" in 4(b) (Present Residence) or 4(c) (Permanent Residence). When this occurs, DO NOT output literal "Same as above". Instead, COPY the actual place name, district, state, and approximate population from 4(a) (or 4(b)) into 4(b) and 4(c) so that all fields contain the full geographic data.
6. FAMILY DETAILS (Item 6): In the family table, use "Father", "Mother", and for any brothers or sisters, use "Sibling" (or "Elder Sibling" / "Younger Sibling", or "Brother" / "Sister" as indicated by candidate). Do not assume brother if it is a sister.
7. EDUCATIONAL RECORD (Item 7): Commencing from Matriculation, extract all academic qualifications listed in chronological order: Matriculation / 10th, 10+2 / 12th, Graduation, and Post Graduation (Master's / M.Tech / M.Sc / MBA / etc. if filled by candidate). If the candidate entered Post Graduation or additional higher qualifications, ALWAYS capture and transcribe them into education_records.
8. Output strictly valid JSON with no markdown formatting or commentary.`;

    parts.push({ text: systemPrompt });

    // Normalize each uploaded file
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

      if (isPdf) {
        // Send PDF directly as application/pdf (Gemini natively supports multi-page PDFs)
        parts.push({
          inline_data: {
            mime_type: "application/pdf",
            data: buffer.toString("base64")
          }
        });
      } else {
        // Normalize image using sharp: auto-rotate EXIF, resize to max 1600px width, convert to crisp JPEG
        try {
          const normalizedBuffer = await sharp(buffer)
            .rotate() // Auto-rotates based on mobile EXIF orientation
            .resize({ width: 1600, withoutEnlargement: true })
            .jpeg({ quality: 85, mozjpeg: true })
            .toBuffer();

          parts.push({
            inline_data: {
              mime_type: "image/jpeg",
              data: normalizedBuffer.toString("base64")
            }
          });
        } catch (imgErr) {
          console.warn("Sharp image normalization fallback:", imgErr);
          // Fallback to original buffer if sharp encountered an issue
          parts.push({
            inline_data: {
              mime_type: file.type || "image/jpeg",
              data: buffer.toString("base64")
            }
          });
        }
      }
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
          continue; // try next model in cascade
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

    const parsedJson = JSON.parse(resultJsonText);
    
    // Support backward-compatible response format:
    // If model wrapped in { form_data, assessment }, return both.
    const formDataOut = parsedJson.form_data || parsedJson;
    const assessmentOut = parsedJson.assessment || null;

    // 1. Residence Auto-Resolution (Item 4)
    // If candidate wrote "Same as above", "Do", "-do-", or "as above" in 4(b) or 4(c),
    // copy the actual geographic data from 4(a) (or 4(b)) so no literal "Same as above" is stored.
    const isSameAsAbove = (val?: string) => {
      if (!val) return false;
      const clean = val.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      return (
        clean === "sameasabove" ||
        clean === "same" ||
        clean === "do" ||
        clean === "ditto" ||
        clean === "asabove" ||
        clean === "sameas4a" ||
        clean === "sameas4b" ||
        val.toLowerCase().includes("same as") ||
        val.toLowerCase().includes("as above") ||
        val.trim() === "-" ||
        val.trim() === "--" ||
        val.trim() === '""'
      );
    };

    if (formDataOut && typeof formDataOut === "object") {
      // 4(b) Present Residence resolution
      if (isSameAsAbove(formDataOut.present_residence_place)) {
        formDataOut.present_residence_place = formDataOut.max_residence_place || "";
      }
      if (isSameAsAbove(formDataOut.present_residence_district) || (!formDataOut.present_residence_district && formDataOut.present_residence_place === formDataOut.max_residence_place)) {
        formDataOut.present_residence_district = formDataOut.max_residence_district || formDataOut.present_residence_district || "";
      }
      if (isSameAsAbove(formDataOut.present_residence_state) || (!formDataOut.present_residence_state && formDataOut.present_residence_place === formDataOut.max_residence_place)) {
        formDataOut.present_residence_state = formDataOut.max_residence_state || formDataOut.present_residence_state || "";
      }
      if (isSameAsAbove(formDataOut.present_residence_population) || (!formDataOut.present_residence_population && formDataOut.present_residence_place === formDataOut.max_residence_place)) {
        formDataOut.present_residence_population = formDataOut.max_residence_population || formDataOut.present_residence_population || "";
      }

      // 4(c) Permanent Residence resolution
      const sourcePlace = (!isSameAsAbove(formDataOut.present_residence_place) && formDataOut.present_residence_place)
        ? formDataOut.present_residence_place
        : formDataOut.max_residence_place;
      const sourceDistrict = (!isSameAsAbove(formDataOut.present_residence_district) && formDataOut.present_residence_district)
        ? formDataOut.present_residence_district
        : formDataOut.max_residence_district;
      const sourceState = (!isSameAsAbove(formDataOut.present_residence_state) && formDataOut.present_residence_state)
        ? formDataOut.present_residence_state
        : formDataOut.max_residence_state;
      const sourcePop = (!isSameAsAbove(formDataOut.present_residence_population) && formDataOut.present_residence_population)
        ? formDataOut.present_residence_population
        : formDataOut.max_residence_population;

      if (isSameAsAbove(formDataOut.perm_residence_place)) {
        formDataOut.perm_residence_place = sourcePlace || "";
      }
      if (isSameAsAbove(formDataOut.perm_residence_district) || (!formDataOut.perm_residence_district && formDataOut.perm_residence_place === sourcePlace)) {
        formDataOut.perm_residence_district = sourceDistrict || formDataOut.perm_residence_district || "";
      }
      if (isSameAsAbove(formDataOut.perm_residence_state) || (!formDataOut.perm_residence_state && formDataOut.perm_residence_place === sourcePlace)) {
        formDataOut.perm_residence_state = sourceState || formDataOut.perm_residence_state || "";
      }
      if (isSameAsAbove(formDataOut.perm_residence_population) || (!formDataOut.perm_residence_population && formDataOut.perm_residence_place === sourcePlace)) {
        formDataOut.perm_residence_population = sourcePop || formDataOut.perm_residence_population || "";
      }

      // 2. Family Details (Item 6): Normalize brother/sister to Sibling
      if (formDataOut.family_members && Array.isArray(formDataOut.family_members)) {
        formDataOut.family_members = formDataOut.family_members.map((member: { relation?: string }) => {
          let rel = (member.relation || "").trim();
          if (/younger\s*(brother|sister)/i.test(rel)) {
            rel = "Younger Sibling";
          } else if (/elder\s*(brother|sister)/i.test(rel)) {
            rel = "Elder Sibling";
          } else if (/^(brother|sister)$/i.test(rel)) {
            rel = "Sibling";
          }
          return {
            ...member,
            relation: rel
          };
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: formDataOut,
      assessment: assessmentOut
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
