"use client";

import React, { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Camera, UploadCloud, CheckCircle2, RotateCcw, AlertCircle, ArrowRight } from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";

function MobileUploadInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || "";

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreviewUrl(dataUrl);
      const base64 = dataUrl.split(",")[1];
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleTransmit = async () => {
    if (!sessionId || !imageBase64) return;
    setIsUploading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/screening/ppdt-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          imageBase64,
          mimeType: "image/jpeg",
          latencySeconds: 0
        })
      });

      if (!res.ok) {
        throw new Error("Failed to transmit image to desktop");
      }

      setIsUploaded(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sync transmission failed";
      setErrorMsg(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--canvas-bg)] text-[var(--fg-primary)] p-4 sm:p-6 flex flex-col justify-between font-mono">
      <div className="max-w-md mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--canvas-border)] pb-3">
          <CrossedSwords className="w-6 h-6" />
          <div>
            <span className="text-xs font-bold text-[var(--gold-accent)] block uppercase">
              PPDT MOBILE CAPTURE BRIDGE
            </span>
            <span className="text-sm font-extrabold text-[var(--fg-primary)]">
              Desktop Live Sync
            </span>
          </div>
        </div>

        {/* Status Info */}
        {!sessionId ? (
          <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-xs text-red-400 space-y-1">
            <span className="font-bold block">Invalid or Missing Session</span>
            Please scan the QR code again directly from your desktop screen.
          </div>
        ) : isUploaded ? (
          <div className="p-6 rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 text-center space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-emerald-400">
                PPDT Sheet Transmitted!
              </h3>
              <p className="text-xs text-[var(--fg-secondary)] font-sans mt-1">
                Your handwritten story has been safely received on your desktop. You may now return to your desktop screen for psychological AI scoring.
              </p>
            </div>
            <div className="text-[10px] text-[var(--fg-muted)]">
              Session ID: {sessionId.substring(0, 14)}...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
              Snap a clean, well-lit photo of your written PPDT answer sheet (ensure character box and story text are in focus).
            </div>

            {/* Hidden native inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Image Preview Box */}
            {previewUrl ? (
              <div className="p-4 rounded-2xl border-2 border-[var(--primary-accent)] bg-[var(--canvas-surface)] space-y-4">
                <div className="relative rounded-xl overflow-hidden border border-[var(--canvas-border)] max-h-80 flex items-center justify-center bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="PPDT Story Sheet Preview" className="w-full h-auto object-contain" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                      setImageBase64(null);
                    }}
                    className="py-2.5 px-3 rounded-xl border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Photo</span>
                  </button>

                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={handleTransmit}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>Submit to Desktop</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full py-4 px-4 rounded-2xl bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Open Camera & Snap Sheet</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4 text-[var(--gold-accent)]" />
                  <span>Choose from Photo Gallery</span>
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl border border-red-500/40 bg-red-500/10 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center text-[10px] text-[var(--fg-muted)] pt-6 border-t border-[var(--canvas-border)]">
        SSB ASTRA Screening Simulator • Secure On-Device Bridge
      </div>
    </div>
  );
}

export default function MobileUploadPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs font-mono">Loading sync interface...</div>}>
      <MobileUploadInner />
    </Suspense>
  );
}
