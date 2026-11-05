import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

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
      const fromEmail = process.env.RESEND_FROM_EMAIL || "SSB Astra <onboarding@ssbastra.in>";
      try {
        await resend.emails.send({
          from: fromEmail,
          to: normalizedEmail,
          subject: `${otpCode} is your SSB Astra Verification Code`,
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #0b0f0a; color: #f2f5f1; padding: 30px; border-radius: 8px; max-width: 500px; margin: auto;">
              <div style="border-bottom: 1px solid #2d3b2a; padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="color: #65a30d; margin: 0;">SSB ASTRA</h2>
                <p style="font-size: 11px; color: #ca8a04; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Officer Intelligence Suite</p>
              </div>
              <p style="font-size: 14px; line-height: 1.5; color: #cad5c7;">Candidate Verification Protocol,</p>
              <p style="font-size: 14px; line-height: 1.5; color: #cad5c7;">Use the one-time authentication code below to verify your email and activate your officer preparation profile:</p>
              <div style="background-color: #131911; border: 1px solid #65a30d; padding: 16px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #84cc16; border-radius: 6px; margin: 25px 0;">
                ${otpCode}
              </div>
              <p style="font-size: 12px; color: #849680;">This code will expire in 10 minutes. If you did not request this verification, please disregard this email.</p>
              <div style="border-top: 1px solid #2d3b2a; padding-top: 15px; margin-top: 30px; font-size: 10px; color: #849680; text-align: center;">
                Tri-Services Officer Preparation Platform • Indian Army, Navy & Air Force
              </div>
            </div>
          `,
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
