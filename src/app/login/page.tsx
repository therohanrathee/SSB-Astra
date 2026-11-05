"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight, Lock, Mail, KeyRound, User, Calendar, Award, CheckCircle2, AlertCircle } from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import { supabase } from "@/lib/supabaseClient";

type AuthStep = "email" | "password_login" | "otp_verify" | "create_password" | "onboarding";

export default function LoginPage() {
  const router = useRouter();

  // State management
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [targetEntry, setTargetEntry] = useState("NDA");

  // Status & feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  // STEP 1: Check Email
  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setInfoMsg("");

    try {
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process email.");
      }

      if (data.exists) {
        setStep("password_login");
        setInfoMsg(data.message || "Account found. Please enter your password.");
      } else {
        setStep("otp_verify");
        setInfoMsg("New aspirant detected! A 6-digit verification code was sent to your email.");
        if (data.devOtp) {
          setDevOtpHint(data.devOtp);
        }
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2A: Password Login for Existing User
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg("Password is required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Successfully authenticated!
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Invalid password. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2B: Verify OTP for New User
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setErrorMsg("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid verification code.");
      }

      setStep("create_password");
      setInfoMsg("Email verified! Create a secure password for your terminal account.");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Verification error");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Create Password
  const handleCreatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    setErrorMsg("");
    setStep("onboarding");
    setInfoMsg("Almost done! Provide basic candidate details for your SSB dossier.");
  };

  // STEP 4: Complete Fast Onboarding
  const handleCompleteOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !dob || !targetEntry) {
      setErrorMsg("Please fill in all candidate details.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: newPassword,
          fullName,
          dob,
          targetEntry,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to complete onboarding.");
      }

      // Automatically sign in with the new credentials
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: newPassword,
      });

      if (signInError) {
        // Fallback to login screen
        setStep("password_login");
        setInfoMsg("Registration complete! Please enter your password to sign in.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Onboarding failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-military-grid flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[var(--primary-glow)] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Emblem */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-md border border-[var(--primary-accent)]/60 bg-[var(--canvas-surface)] flex items-center justify-center overflow-hidden shadow-sm">
            <CrossedSwords className="w-5 h-5 text-[var(--primary-accent)]" />
          </div>
          <span className="font-mono text-xl tracking-wider text-[var(--fg-primary)] font-extrabold">
            SSB<span className="text-[var(--gold-accent)] font-semibold">ASTRA</span>
          </span>
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--fg-primary)]">
          Candidate Access Portal
        </h2>
        <p className="text-xs text-[var(--fg-secondary)] max-w-sm mx-auto">
          Single smart authentication terminal for all Armed Forces commissioning aspirants.
        </p>
      </div>

      {/* Card Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="hud-corner bg-[var(--canvas-surface)] border border-[var(--canvas-border)] py-8 px-5 shadow-2xl rounded-lg sm:px-10 font-mono">
          
          {/* Progress Micro-Bar */}
          <div className="flex items-center justify-between text-[10px] text-[var(--fg-muted)] mb-6 border-b border-[var(--canvas-border)] pb-3">
            <span className="uppercase text-[var(--primary-accent)] font-bold">
              {step === "email" && "STEP 01: IDENTITY CHECK"}
              {step === "password_login" && "STEP 02: CANDIDATE AUTH"}
              {step === "otp_verify" && "STEP 02: EMAIL VERIFICATION"}
              {step === "create_password" && "STEP 03: CREDENTIAL CREATION"}
              {step === "onboarding" && "STEP 04: DOSSIER INITIALIZATION"}
            </span>
            <span className="text-[var(--gold-accent)]">
              {step === "email" && "1 / 4"}
              {step === "password_login" && "READY"}
              {step === "otp_verify" && "2 / 4"}
              {step === "create_password" && "3 / 4"}
              {step === "onboarding" && "4 / 4"}
            </span>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="mb-4 p-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{infoMsg}</span>
            </div>
          )}

          {devOtpHint && (
            <div className="mb-4 p-2.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-500 text-[11px]">
              <strong>[Dev Mode Helper]</strong> Verification OTP: <span className="underline font-bold">{devOtpHint}</span>
            </div>
          )}

          {/* 1. EMAIL CHECK FORM */}
          {step === "email" && (
            <form onSubmit={handleCheckEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--fg-primary)] mb-1">
                  Candidate Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--fg-muted)]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aspirant@gmail.com"
                    className="block w-full pl-9 pr-3 py-2.5 text-xs rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider text-white bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <span>{loading ? "Verifying Registry..." : "Proceed to Portal"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 2A. PASSWORD LOGIN FORM */}
          {step === "password_login" && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="text-xs text-[var(--fg-muted)]">
                Signing in as: <strong className="text-[var(--fg-primary)]">{email}</strong>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--fg-primary)] mb-1">
                  Account Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--fg-muted)]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-9 pr-3 py-2.5 text-xs rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider text-white bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <span>{loading ? "Authenticating..." : "Access Dashboard"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-center text-[10px] text-[var(--fg-muted)] hover:text-[var(--primary-accent)] transition-colors pt-2"
              >
                ← Use a different email
              </button>
            </form>
          )}

          {/* 2B. OTP VERIFICATION FORM */}
          {step === "otp_verify" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-xs text-[var(--fg-muted)]">
                Code sent to: <strong className="text-[var(--fg-primary)]">{email}</strong>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--fg-primary)] mb-1">
                  6-Digit OTP Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--fg-muted)]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="block w-full pl-9 pr-3 py-2.5 text-base tracking-widest text-center font-bold rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--primary-accent)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider text-white bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <span>{loading ? "Checking Code..." : "Verify & Continue"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full text-center text-[10px] text-[var(--fg-muted)] hover:text-[var(--primary-accent)] transition-colors pt-2"
              >
                ← Edit email address
              </button>
            </form>
          )}

          {/* 3. CREATE PASSWORD FORM */}
          {step === "create_password" && (
            <form onSubmit={handleCreatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--fg-primary)] mb-1">
                  Create Account Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--fg-muted)]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="block w-full pl-9 pr-3 py-2.5 text-xs rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider text-white bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] transition-all shadow-md active:scale-95"
              >
                <span>Set Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 4. FAST CANDIDATE ONBOARDING FORM */}
          {step === "onboarding" && (
            <form onSubmit={handleCompleteOnboarding} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--fg-primary)] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--fg-muted)]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Rohan Sharma"
                    className="block w-full pl-10 pr-3 py-2.5 text-xs rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--fg-primary)] mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--fg-muted)]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 text-xs rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--fg-primary)] mb-1">
                  Target SSB Entry
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--fg-muted)] z-10">
                    <Award className="w-4 h-4" />
                  </div>
                  <select
                    value={targetEntry}
                    onChange={(e) => setTargetEntry(e.target.value)}
                    className="block w-full pl-10 pr-8 py-2.5 text-xs rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)] appearance-none cursor-pointer"
                  >
                    <option value="NDA">NDA (National Defence Academy)</option>
                    <option value="CDS">CDS (IMA / OTA / AFA / INA)</option>
                    <option value="AFCAT">AFCAT (Flying / Ground Duty)</option>
                    <option value="TGC">TGC (Technical Graduate Course)</option>
                    <option value="TES">TES (10+2 Technical Entry Scheme)</option>
                    <option value="NCC">NCC Special Entry Scheme</option>
                    <option value="OTHER">Other Officer Entry</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[var(--fg-muted)]">
                    <span className="text-[10px]">▼</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider text-white bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <span>{loading ? "Registering Dossier..." : "Complete & Enter Dashboard"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
