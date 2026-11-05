import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";
import { getAdaptiveOtpEmailHtml } from "@/lib/emailTemplates";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check if user already exists in auth.users or profiles
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name, target_entry")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (profile) {
      // User exists! Tell client to proceed to Password Login stage
      return NextResponse.json({
        exists: true,
        message: "Account recognized. Please enter your password.",
      });
    }

    // 2. User does not exist! Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes expiry

    // Save OTP in database
    await supabaseAdmin
      .from("email_otps")
      .delete()
      .eq("email", normalizedEmail); // Delete previous unverified OTPs

    const { error: insertError } = await supabaseAdmin
      .from("email_otps")
      .insert({
        email: normalizedEmail,
        otp_code: otpCode,
        expires_at: expiresAt,
        verified: false,
      });

    if (insertError) {
      console.error("Error storing OTP:", insertError);
      // Fallback for development if table not yet migrated
    }

    // 3. Send email using Resend
    if (resend) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "SSB Astra <mails@ssbastra.in>";
      try {
        await resend.emails.send({
          from: fromEmail,
          to: normalizedEmail,
          subject: `${otpCode} is your SSB Astra Verification Code`,
          html: getAdaptiveOtpEmailHtml(otpCode),
        });
      } catch (emailErr) {
        console.error("Resend delivery failed:", emailErr);
      }
    } else {
      console.log(`[DEV MODE] Resend API key not set. Generated OTP for ${normalizedEmail}: ${otpCode}`);
    }

    return NextResponse.json({
      exists: false,
      message: "New candidate detected. Verification code dispatched.",
      devOtp: !resend ? otpCode : undefined, // Useful helper during local development
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
