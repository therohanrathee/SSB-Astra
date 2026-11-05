import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedOtp = otp.trim();

    // Verify OTP from database
    const { data: record, error } = await supabaseAdmin
      .from("email_otps")
      .select("*")
      .eq("email", normalizedEmail)
      .eq("otp_code", normalizedOtp)
      .eq("verified", false)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (error || !record) {
      return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
    }

    // Mark as verified
    await supabaseAdmin
      .from("email_otps")
      .update({ verified: true })
      .eq("id", record.id);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
