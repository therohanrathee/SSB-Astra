import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email, password, fullName, dob, targetEntry } = await req.json();

    if (!email || !password || !fullName || !dob || !targetEntry) {
      return NextResponse.json({ error: "All onboarding fields are required." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Ensure email has a verified OTP record
    const { data: otpRecord } = await supabaseAdmin
      .from("email_otps")
      .select("id")
      .eq("email", normalizedEmail)
      .eq("verified", true)
      .maybeSingle();

    if (!otpRecord) {
      return NextResponse.json({ error: "Email verification required before onboarding." }, { status: 403 });
    }

    // 2. Create the user in Supabase auth using Admin API
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password: password,
      email_confirm: true, // Mark confirmed since they already passed our OTP
      user_metadata: {
        full_name: fullName,
        target_entry: targetEntry,
      },
    });

    if (authError || !authUser.user) {
      return NextResponse.json({ error: authError?.message || "Failed to create user." }, { status: 400 });
    }

    // 3. Update profile with Candidate Onboarding data
    // Initial profile completion is set to 30% for basic onboarding
    await supabaseAdmin
      .from("profiles")
      .upsert({
        id: authUser.user.id,
        email: normalizedEmail,
        full_name: fullName,
        dob: dob,
        target_entry: targetEntry,
        profile_completion_pct: 30, // Basic onboarding complete (30%)
        updated_at: new Date().toISOString(),
      });

    // Clean up OTP records for this email
    await supabaseAdmin.from("email_otps").delete().eq("email", normalizedEmail);

    return NextResponse.json({
      success: true,
      message: "Candidate profile registered successfully. You may now log in.",
      userId: authUser.user.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
