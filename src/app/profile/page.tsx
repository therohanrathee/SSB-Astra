"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Download, 
  UploadCloud, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  FileText, 
  User, 
  Home, 
  Users, 
  GraduationCap, 
  Trophy, 
  Shield, 
  Plus, 
  Trash2, 
  RefreshCw,
  FileCheck,
  Compass,
  Camera,
  Images,
  AlertTriangle,
  Target,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  RotateCcw
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import { supabase } from "@/lib/supabaseClient";

// --- Types for Structured PIQ (DIPR Questionnaire No. 107-A) ---
export interface PiqAssessment {
  piq_score: number;
  overall_verdict: string;
  score_breakdown: {
    academics: { score: number; max: number; assessment: string };
    sports_and_ncc: { score: number; max: number; assessment: string };
    leadership_and_responsibility: { score: number; max: number; assessment: string };
    hobbies_and_depth: { score: number; max: number; assessment: string };
  };
  key_strengths: string[];
  vulnerabilities_and_red_flags: string[];
  io_probable_questions: string[];
  recommendations_for_improvement: string[];
}
interface FamilyMember {
  relation: string;
  education: string;
  occupation: string;
  monthly_income: string;
}

interface EducationRecord {
  qualification: string;
  institution: string;
  board_university: string;
  year: string;
  div_marks_pct: string;
  medium: string;
  boarder_dayscholar: string;
  achievement: string;
}

interface SportRecord {
  sport: string;
  duration: string;
  represented_level: string;
  achievement: string;
}

interface SsbAttempt {
  entry: string;
  board_place: string;
  date: string;
  chest_batch_no: string;
  result: string;
}

interface PiqFormData {
  // Identity & Demographics (Items 1, 2, 3, 5)
  full_name: string;
  father_name: string;
  gender: "male" | "female" | "";
  dob: string;
  target_entry: string;
  religion: string;
  mother_tongue: string;
  category: string;
  marital_status: string;

  // Residential History (Item 4)
  max_residence_place: string;
  max_residence_district: string;
  max_residence_state: string;
  max_residence_population: string;

  present_residence_place: string;
  present_residence_district: string;
  present_residence_state: string;
  present_residence_population: string;

  perm_residence_place: string;
  perm_residence_district: string;
  perm_residence_state: string;
  perm_residence_population: string;
  perm_residence_district_hq: boolean;

  // Family Record (Item 6)
  parents_alive: boolean;
  father_mother_death_age: string;
  family_members: FamilyMember[];

  // Educational Record (Item 7)
  education_records: EducationRecord[];

  // Physical & Occupation (Items 8, 9)
  height_m: string;
  weight_kg: string;
  present_occupation: string;
  monthly_income: string;

  // NCC & Sports (Items 10, 11)
  has_ncc: boolean;
  ncc_wing: string;
  ncc_division: string;
  ncc_certificate: string;
  ncc_duration: string;
  sports_records: SportRecord[];

  // Hobbies, Extra-curriculars & Responsibilities (Items 12, 13)
  hobbies: string;
  extra_curricular: string;
  responsibilities_held: string;

  // Commission & Previous SSB Attempts (Item 14)
  nature_of_commission: string;
  service_preference: string;
  total_chances_availed: string;
  ssb_attempts: SsbAttempt[];
}

const INITIAL_PIQ_DATA: PiqFormData = {
  full_name: "",
  father_name: "",
  gender: "",
  dob: "",
  target_entry: "CDS",
  religion: "Hindu",
  mother_tongue: "Hindi",
  category: "General",
  marital_status: "Single",

  max_residence_place: "",
  max_residence_district: "",
  max_residence_state: "",
  max_residence_population: "",

  present_residence_place: "",
  present_residence_district: "",
  present_residence_state: "",
  present_residence_population: "",

  perm_residence_place: "",
  perm_residence_district: "",
  perm_residence_state: "",
  perm_residence_population: "",
  perm_residence_district_hq: true,

  parents_alive: true,
  father_mother_death_age: "",
  family_members: [],

  education_records: [],

  height_m: "",
  weight_kg: "",
  present_occupation: "",
  monthly_income: "",

  has_ncc: false,
  ncc_wing: "",
  ncc_division: "",
  ncc_certificate: "",
  ncc_duration: "",
  sports_records: [],

  hobbies: "",
  extra_curricular: "",
  responsibilities_held: "",

  nature_of_commission: "Permanent Commission (PC)",
  service_preference: "1. Army  2. Air Force  3. Navy",
  total_chances_availed: "0",
  ssb_attempts: []
};

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"personal" | "residence" | "family_edu" | "activities">("personal");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PiqFormData>(INITIAL_PIQ_DATA);
  const [completionPct, setCompletionPct] = useState(30);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isParsingPiq, setIsParsingPiq] = useState(false);
  const [parseStatusMessage, setParseStatusMessage] = useState<string | null>(null);
  const [parseNotification, setParseNotification] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<PiqAssessment | null>(null);
  const [showAssessment, setShowAssessment] = useState(true);

  // Intake mode & Device detection
  const [intakeMode, setIntakeMode] = useState<"pdf" | "photos" | "camera">("pdf");
  const [isMobile, setIsMobile] = useState(false);

  // Staged Files for user review prior to analysis
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [photoP1, setPhotoP1] = useState<File | null>(null);
  const [photoP2, setPhotoP2] = useState<File | null>(null);
  const [photoP1Preview, setPhotoP1Preview] = useState<string | null>(null);
  const [photoP2Preview, setPhotoP2Preview] = useState<string | null>(null);

  // Dedicated refs for dropboxes and camera triggers
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const photoP1InputRef = useRef<HTMLInputElement>(null);
  const photoP2InputRef = useRef<HTMLInputElement>(null);
  const cameraP1InputRef = useRef<HTMLInputElement>(null);
  const cameraP2InputRef = useRef<HTMLInputElement>(null);

  // Detect mobile device to selectively hide/show camera scanning
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      const ua = navigator.userAgent || "";
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const hasTouch = "ontouchstart" in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      const isNarrow = window.innerWidth < 768;
      setIsMobile((mobileRegex.test(ua) || Boolean(hasTouch)) && isNarrow);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper to ensure dates strictly conform to YYYY-MM-DD for HTML5 date inputs
  const normalizeDobForInput = (dobStr?: string): string => {
    if (!dobStr) return "";
    const trimmed = dobStr.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
    const dmyMatch = trimmed.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
    if (dmyMatch) {
      const day = dmyMatch[1].padStart(2, "0");
      const month = dmyMatch[2].padStart(2, "0");
      const year = dmyMatch[3];
      return `${year}-${month}-${day}`;
    }
    const ymdMatch = trimmed.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
    if (ymdMatch) {
      const year = ymdMatch[1];
      const month = ymdMatch[2].padStart(2, "0");
      const day = ymdMatch[3].padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  // 1. Load User Profile from Supabase & Local Cache
  useEffect(() => {
    async function loadCandidate() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          setEmail(user.email || "candidate@ssbastra.in");

          // Fetch profile row
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

          if (data) {
            setFormData(prev => ({
              ...prev,
              full_name: data.full_name || prev.full_name || "CADET ASPIRANT",
              target_entry: data.target_entry || prev.target_entry || "CDS",
              dob: normalizeDobForInput(data.dob) || prev.dob || "2003-08-15",
              gender: (data.gender as "male" | "female") || prev.gender || "male",
            }));
            setCompletionPct(data.profile_completion_pct || 30);
          }
        } else {
          setEmail("cadet@ssbastra.in");
          setFormData(prev => ({
            ...prev,
            full_name: "",
            dob: "",
            gender: "male",
            target_entry: "CDS"
          }));
        }

        // Restore any saved local PIQ draft & assessment (purging legacy mock demo artifacts)
        const cachedPiq = localStorage.getItem("ssb_candidate_piq_data");
        if (cachedPiq) {
          try {
            const parsed = JSON.parse(cachedPiq);
            // Purge legacy hardcoded demo entries if present in local storage
            if (parsed.full_name === "ROHAN SHARMA" || parsed.hobbies?.includes("Aeromodelling")) {
              localStorage.removeItem("ssb_candidate_piq_data");
              localStorage.removeItem("ssb_candidate_piq_assessment");
            } else {
              setFormData(prev => ({ ...prev, ...parsed, dob: normalizeDobForInput(parsed.dob) || prev.dob }));
            }
          } catch {
            // ignore JSON parse error
          }
        }

        const cachedAssessment = localStorage.getItem("ssb_candidate_piq_assessment");
        if (cachedAssessment) {
          try {
            const parsedAssessment = JSON.parse(cachedAssessment);
            const assessmentStr = JSON.stringify(parsedAssessment);
            // Purge legacy mock assessment referencing demo clubs/schools
            if (
              assessmentStr.includes("Robotics") ||
              assessmentStr.includes("Kendriya Vidyalaya") ||
              assessmentStr.includes("APS") ||
              assessmentStr.includes("NDA 148")
            ) {
              localStorage.removeItem("ssb_candidate_piq_assessment");
              setAssessment(null);
            } else {
              setAssessment(parsedAssessment);
            }
          } catch {
            // ignore JSON parse error
          }
        }
      } catch (err) {
        console.error("Failed to load cadet profile:", err);
      }
    }
    loadCandidate();
  }, []);

  // Update Field Helper
  const updateField = <K extends keyof PiqFormData>(field: K, value: PiqFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Helper: Client-Side Image Compression using FileReader + Canvas
  // Downscales any smartphone photo (10-25 MB) to max 1600px width/height & 80% JPEG quality (~200-350 KB)
  const compressImageClientSide = async (
    file: File,
    maxDimension = 1600,
    quality = 0.80
  ): Promise<File> => {
    return new Promise((resolve) => {
      const isImage = file.type.startsWith("image/") || /\.(jpe?g|png|webp|heic|bmp|tiff)$/i.test(file.name);
      if (!isImage) {
        return resolve(file);
      }

      const reader = new FileReader();
      reader.onerror = () => {
        console.warn("[Compression] FileReader error, proceeding with original file");
        resolve(file);
      };

      reader.onload = () => {
        const img = new Image();
        img.onerror = () => {
          console.warn("[Compression] Image decode error, proceeding with original file");
          resolve(file);
        };

        img.onload = () => {
          try {
            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;

            if (!width || !height) {
              return resolve(file);
            }

            // Downscale to maxDimension
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(file);

            // Clean white background for contrast and transparency handling
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (!blob) return resolve(file);

                const cleanBaseName = file.name.replace(/\.[^/.]+$/, "");
                const compressedFile = new File([blob], `${cleanBaseName}.jpg`, {
                  type: "image/jpeg",
                  lastModified: Date.now()
                });

                console.log(
                  `[Client Compression] ${file.name} compressed: ${(file.size / 1024).toFixed(0)} KB → ${(compressedFile.size / 1024).toFixed(0)} KB (${width}x${height})`
                );
                resolve(compressedFile);
              },
              "image/jpeg",
              quality
            );
          } catch (err) {
            console.warn("[Compression] Canvas processing error:", err);
            resolve(file);
          }
        };

        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    });
  };

  // Helper: Client-Side PDF Rasterization to Compressed Images
  // Converts every PDF into crisp, compressed JPEG page images (~200-350 KB each) directly in the browser
  const convertPdfToCompressedImages = async (
    file: File,
    onProgress?: (msg: string) => void
  ): Promise<File[]> => {
    if (typeof window === "undefined") {
      throw new Error("PDF rasterization must run in browser");
    }

    try {
      onProgress?.("⚡ Loading PDF rasterizer on device...");
      const pdfjsLib = await import("pdfjs-dist");

      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
      }

      onProgress?.("⚡ Reading PDF document...");
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        useSystemFonts: true,
        isEvalSupported: false,
      });

      const pdf = await loadingTask.promise;
      const numPages = Math.min(pdf.numPages, 2);
      const compressedImages: File[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        onProgress?.(`⚡ Converting Page ${pageNum} of ${numPages} to compressed image...`);
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.0 });

        const maxDim = Math.max(viewport.width, viewport.height);
        const targetScale = maxDim > 0 ? 1600 / maxDim : 1.5;
        const scaledViewport = page.getViewport({ scale: Math.min(Math.max(targetScale, 1.0), 2.5) });

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(scaledViewport.width);
        canvas.height = Math.round(scaledViewport.height);
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({
            canvas,
            canvasContext: ctx,
            viewport: scaledViewport,
          }).promise;

          const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob(resolve, "image/jpeg", 0.80);
          });

          if (blob) {
            const cleanName = `${file.name.replace(/\.[^/.]+$/, "")}_page_${pageNum}.jpg`;
            const compressedFile = new File([blob], cleanName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            console.log(
              `[PDF to Image] Page ${pageNum} converted: ${(compressedFile.size / 1024).toFixed(0)} KB (${canvas.width}x${canvas.height})`
            );
            compressedImages.push(compressedFile);
          }
        }
      }

      if (compressedImages.length > 0) {
        return compressedImages;
      }
    } catch (err: unknown) {
      console.error("[PDF Rasterization Failure]:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      throw new Error(`Could not convert PDF to images on device: ${errMsg}. Please upload JPG/PNG photos instead.`);
    }

    throw new Error("No pages could be extracted from this PDF. Please check the file or upload photos of Page 1 & Page 2.");
  };

  // 2. Real AI Analysis using Google Gemini API (/api/piq/analyze) with Client-Side Compression
  const analyzePiqWithGemini = async (files: File[]) => {
    if (!files || files.length === 0) return;
    setIsParsingPiq(true);
    setParseNotification(null);
    setParseError(null);
    setAssessment(null); // CRITICAL: Clear any stale/ghost assessment immediately
    setParseStatusMessage("⚡ Inspecting document files on device...");

    try {
      const optimizedFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");

        if (isPdf) {
          const pdfImages = await convertPdfToCompressedImages(f, (msg) => setParseStatusMessage(msg));
          optimizedFiles.push(...pdfImages);
        } else {
          const origMb = (f.size / (1024 * 1024)).toFixed(1);
          setParseStatusMessage(`⚡ Compressing photo ${i + 1} on device (${origMb} MB)...`);
          const compressed = await compressImageClientSide(f, 1600, 0.80);
          const compKb = (compressed.size / 1024).toFixed(0);
          console.log(`[SSB Client Compression] Compressed ${f.name} from ${origMb} MB to ${compKb} KB`);
          optimizedFiles.push(compressed);
        }
      }

      const totalPayloadBytes = optimizedFiles.reduce((acc, file) => acc + file.size, 0);
      const totalKb = (totalPayloadBytes / 1024).toFixed(0);

      // Pre-flight check: Prevent Vercel 413 by rejecting payloads over 4.2 MB on the client
      if (totalPayloadBytes > 4.2 * 1024 * 1024) {
        throw new Error(
          `Payload size (${(totalPayloadBytes / (1024 * 1024)).toFixed(1)} MB) exceeds Vercel's 4.5 MB limit. Please take photos using the Camera or upload standard JPG/PNG photos.`
        );
      }

      setParseStatusMessage(`⚡ Transmitting optimized payload (${totalKb} KB) to Gemini AI...`);

      const dataPayload = new FormData();
      for (const f of optimizedFiles) {
        dataPayload.append("files", f);
      }

      setParseStatusMessage("⚡ Senior Interviewing Officer AI evaluating PIQ dossier & scoring OLQs...");

      const res = await fetch("/api/piq/analyze", {
        method: "POST",
        body: dataPayload
      });

      // Safely read response text first to prevent Safari SyntaxError on non-JSON payloads
      const resText = await res.text();
      let json: { success?: boolean; error?: string; details?: string; data?: PiqFormData; assessment?: PiqAssessment };
      try {
        json = JSON.parse(resText);
      } catch {
        throw new Error(`Server returned unexpected response (${res.status}): ${resText.slice(0, 120)}`);
      }

      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || json.details || `Failed to analyze document (HTTP ${res.status})`);
      }

      // Merge extracted fields into state
      const ext = json.data;
      setFormData(prev => ({
        ...prev,
        ...ext,
        dob: normalizeDobForInput(ext.dob) || prev.dob,
        family_members: ext.family_members && ext.family_members.length > 0 ? ext.family_members : prev.family_members,
        education_records: ext.education_records && ext.education_records.length > 0 ? ext.education_records : prev.education_records,
        sports_records: ext.sports_records && ext.sports_records.length > 0 ? ext.sports_records : prev.sports_records,
        ssb_attempts: ext.ssb_attempts && ext.ssb_attempts.length > 0 ? ext.ssb_attempts : prev.ssb_attempts,
      }));

      if (json.assessment) {
        setAssessment(json.assessment);
        localStorage.setItem("ssb_candidate_piq_assessment", JSON.stringify(json.assessment));
      }

      setCompletionPct(100);
      setParseNotification(
        `✨ Successfully extracted DIPR Form 107-A data from ${optimizedFiles.length} optimized page(s) (${totalKb} KB) & generated Officer PIQ Score!`
      );
    } catch (err: unknown) {
      console.error("Gemini PIQ Analysis error:", err);
      const msg = err instanceof Error ? err.message : "Error analyzing document";
      setParseError(msg);
      setAssessment(null); // Ensure no old assessment is shown after an error
    } finally {
      setIsParsingPiq(false);
      setParseStatusMessage(null);
    }
  };

  // 3. Save PIQ Data
  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      // Always cache in localStorage for instant retrieval
      localStorage.setItem("ssb_candidate_piq_data", JSON.stringify(formData));

      // If user is authenticated in Supabase, update profile row
      if (userId) {
        await supabase
          .from("profiles")
          .update({
            full_name: formData.full_name,
            target_entry: formData.target_entry,
            dob: formData.dob ? formData.dob : null,
            profile_completion_pct: 100,
            updated_at: new Date().toISOString()
          })
          .eq("id", userId);
      }

      setCompletionPct(100);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Error saving PIQ:", err);
      alert("Failed to save PIQ to server. Local copy saved.");
    } finally {
      setSaving(false);
    }
  };

  // 4. Reset Form & Purge Local Cache
  const handleResetForm = () => {
    if (confirm("Reset all form fields and clear cached PIQ data from your device?")) {
      localStorage.removeItem("ssb_candidate_piq_data");
      localStorage.removeItem("ssb_candidate_piq_assessment");
      setFormData(INITIAL_PIQ_DATA);
      setAssessment(null);
      setSelectedPdf(null);
      setPhotoP1(null);
      setPhotoP2(null);
      setPhotoP1Preview(null);
      setPhotoP2Preview(null);
      setParseNotification(null);
      setParseError(null);
      setCompletionPct(0);
    }
  };

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
      
      {/* Top Header */}
      <header className="border-b border-[var(--canvas-border)] bg-[var(--canvas-surface)]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-8 h-8 rounded border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] flex items-center justify-center text-[var(--fg-secondary)] hover:text-[var(--primary-accent)] transition-colors"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded border border-[var(--primary-accent)]/60 bg-[var(--canvas-surface)] flex items-center justify-center">
              <CrossedSwords className="w-4 h-4 text-[var(--primary-accent)]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                  PIQ DOSSIER <span className="text-[var(--gold-accent)]">TERMINAL</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30 font-bold hidden sm:inline-block">
                  DIPR NO. 107-A (REVISED)
                </span>
              </div>
              <span className="text-[9px] block text-[var(--fg-muted)] leading-none uppercase">
                PERSONAL INFORMATION QUESTIONNAIRE & OLQ BASELINE
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-right">
            <div>
              <div className="text-[10px] font-bold text-[var(--gold-accent)]">
                {completionPct}% COMPLETE
              </div>
              <div className="w-20 h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden mt-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--gold-accent)] to-[var(--primary-accent)] transition-all duration-500"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetForm}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--canvas-border)] hover:border-red-500/50 bg-[var(--canvas-surface-subtle)] text-[var(--fg-muted)] hover:text-red-500 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Reset form fields & purge local cache"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? "SAVING..." : "SAVE PIQ"}</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="p-3.5 rounded-lg border border-[var(--military-olive)] bg-[var(--military-olive)]/15 text-[var(--fg-primary)] flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[var(--military-olive)] shrink-0" />
              <span><strong>PIQ DOSSIER SAVED:</strong> Profile completion updated to 100%. Candidate credentials synchronized.</span>
            </div>
            <Link href="/dashboard" className="text-xs font-bold underline hover:opacity-80">
              Return to Dashboard &rarr;
            </Link>
          </div>
        )}

        {/* AI SMART INGESTION & SAMPLE PIQ ACTION BAR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Left: Download Official Blank PIQ */}
          <div className="md:col-span-5 p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--gold-accent)]/5 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[var(--gold-accent)]" />
                <span className="text-xs font-bold tracking-wide">OFFICIAL BLANK PIQ FORM</span>
              </div>
              <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed mb-4">
                Download the standardized Armed Forces <strong>DIPR Questionnaire No. 107-A (Revised)</strong> PDF for physical practice and handwriting familiarity before your board.
              </p>
            </div>

            <a
              href="/sample_piq.pdf"
              download="DIPR_Questionnaire_107A_Blank_PIQ.pdf"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface-subtle)] hover:bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-primary)] transition-all group-hover:border-[var(--gold-accent)]/70 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
              <span>DOWNLOAD BLANK PIQ (PDF)</span>
            </a>
          </div>

          {/* Right: AI Smart Autofill from PIQ */}
          <div className="md:col-span-7 p-4 rounded-xl border-2 border-dashed border-[var(--primary-accent)]/50 bg-[var(--canvas-surface)] flex flex-col justify-between relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-accent)]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--primary-accent)] animate-pulse" />
                  <span className="text-xs font-bold text-[var(--primary-accent)] tracking-wider">
                    ANALYSE & AUTOFILL USING PIQ (AI OCR)
                  </span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] font-semibold border border-[var(--primary-accent)]/30">
                  FASTEST METHOD
                </span>
              </div>
              <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed mb-3">
                Don&apos;t want to type 14 sections manually? Upload your handwritten or filled PIQ scan (PDF/Image). Our AI model extracts all tables and autofills your profile in seconds.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 border-b border-[var(--canvas-border)] pb-2 mb-3">
              <button
                type="button"
                onClick={() => setIntakeMode("pdf")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  intakeMode === "pdf"
                    ? "bg-[var(--primary-accent)] text-white shadow-sm"
                    : "bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2-Page PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setIntakeMode("photos")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  intakeMode === "photos"
                    ? "bg-[var(--primary-accent)] text-white shadow-sm"
                    : "bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                }`}
              >
                <Images className="w-3.5 h-3.5" />
                <span>Upload Photos (P1 & P2)</span>
              </button>

              {/* Show Camera ONLY on mobile/touch screens */}
              {isMobile && (
                <button
                  type="button"
                  onClick={() => setIntakeMode("camera")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    intakeMode === "camera"
                      ? "bg-[var(--primary-accent)] text-white shadow-sm"
                      : "bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Scan Camera</span>
                </button>
              )}
            </div>

            {/* INTAKE MODE A: 1 SINGLE PDF DROP BOX */}
            {intakeMode === "pdf" && (
              <div className="space-y-3">
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) setSelectedPdf(f);
                  }}
                />

                <div
                  onClick={() => pdfInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const f = e.dataTransfer.files?.[0];
                    if (f && (f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"))) {
                      setSelectedPdf(f);
                    }
                  }}
                  className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-5 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)]/60 hover:bg-[var(--canvas-surface-subtle)] group"
                >
                  {selectedPdf ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 rounded-full bg-[var(--military-olive)]/20 border border-[var(--military-olive)] flex items-center justify-center text-[var(--military-olive)]">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[var(--fg-primary)]">{selectedPdf.name}</span>
                      <span className="text-[10px] text-[var(--fg-muted)]">
                        {(selectedPdf.size / 1024).toFixed(1)} KB • Click to change PDF
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/30 flex items-center justify-center text-[var(--primary-accent)] group-hover:scale-105 transition-transform">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--fg-primary)] block">
                          Drop your 2-Page PIQ PDF here, or click to browse
                        </span>
                        <span className="text-[10px] text-[var(--fg-muted)]">
                          Accepts official scanned or digital DIPR 107-A (.pdf)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  disabled={!selectedPdf || isParsingPiq}
                  onClick={() => selectedPdf && analyzePiqWithGemini([selectedPdf])}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isParsingPiq ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span className="truncate max-w-[280px]">{parseStatusMessage || "ANALYZING 2-PAGE PDF WITH GEMINI AI..."}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                      <span>{selectedPdf ? "ANALYSE SELECTED PDF WITH AI" : "SELECT PDF TO ANALYSE"}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* INTAKE MODE B: 2 DROP BOXES FOR PAGE 1 & PAGE 2 */}
            {intakeMode === "photos" && (
              <div className="space-y-3">
                <input
                  ref={photoP1InputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setPhotoP1(f);
                      setPhotoP1Preview(URL.createObjectURL(f));
                    }
                  }}
                />

                <input
                  ref={photoP2InputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setPhotoP2(f);
                      setPhotoP2Preview(URL.createObjectURL(f));
                    }
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Drop Box 1: Page 1 Front */}
                  <div
                    onClick={() => photoP1InputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const f = e.dataTransfer.files?.[0];
                      if (f && f.type.startsWith("image/")) {
                        setPhotoP1(f);
                        setPhotoP1Preview(URL.createObjectURL(f));
                      }
                    }}
                    className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-4 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)]/60 hover:bg-[var(--canvas-surface-subtle)] relative overflow-hidden group min-h-[140px] flex flex-col items-center justify-center"
                  >
                    <div className="text-[10px] font-bold text-[var(--gold-accent)] uppercase tracking-wider mb-1.5">
                      Box 1: Page 1 (Front)
                    </div>
                    {photoP1Preview ? (
                      <div className="flex flex-col items-center gap-1.5 w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photoP1Preview} alt="Page 1 preview" className="w-16 h-20 object-cover rounded border border-[var(--canvas-border)] shadow-sm" />
                        <span className="text-[10px] font-bold text-[var(--fg-primary)] truncate max-w-[140px]">{photoP1?.name}</span>
                        <span className="text-[9px] text-[var(--military-olive)] font-bold">✓ Ready • Click to change</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5">
                        <UploadCloud className="w-6 h-6 text-[var(--primary-accent)] group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-[var(--fg-primary)]">Drop Page 1 Photo</span>
                        <span className="text-[9px] text-[var(--fg-muted)]">Personal & academics</span>
                      </div>
                    )}
                  </div>

                  {/* Drop Box 2: Page 2 Back */}
                  <div
                    onClick={() => photoP2InputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const f = e.dataTransfer.files?.[0];
                      if (f && f.type.startsWith("image/")) {
                        setPhotoP2(f);
                        setPhotoP2Preview(URL.createObjectURL(f));
                      }
                    }}
                    className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-4 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)]/60 hover:bg-[var(--canvas-surface-subtle)] relative overflow-hidden group min-h-[140px] flex flex-col items-center justify-center"
                  >
                    <div className="text-[10px] font-bold text-[var(--primary-accent)] uppercase tracking-wider mb-1.5">
                      Box 2: Page 2 (Back)
                    </div>
                    {photoP2Preview ? (
                      <div className="flex flex-col items-center gap-1.5 w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photoP2Preview} alt="Page 2 preview" className="w-16 h-20 object-cover rounded border border-[var(--canvas-border)] shadow-sm" />
                        <span className="text-[10px] font-bold text-[var(--fg-primary)] truncate max-w-[140px]">{photoP2?.name}</span>
                        <span className="text-[9px] text-[var(--military-olive)] font-bold">✓ Ready • Click to change</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5">
                        <UploadCloud className="w-6 h-6 text-[var(--primary-accent)] group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-[var(--fg-primary)]">Drop Page 2 Photo</span>
                        <span className="text-[9px] text-[var(--fg-muted)]">Sports, NCC & SSB attempts</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={(!photoP1 && !photoP2) || isParsingPiq}
                  onClick={() => {
                    const files = [photoP1, photoP2].filter(Boolean) as File[];
                    analyzePiqWithGemini(files);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isParsingPiq ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span className="truncate max-w-[280px]">{parseStatusMessage || "ANALYZING PHOTOS WITH GEMINI AI..."}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                      <span>
                        {photoP1 && photoP2
                          ? "ANALYSE BOTH PAGES (PAGE 1 & 2) WITH AI"
                          : photoP1 || photoP2
                          ? "ANALYSE SELECTED PHOTO WITH AI"
                          : "SELECT PAGE 1 & PAGE 2 PHOTOS"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* INTAKE MODE C: 2 CAMERA CAPTURE BOXES (MOBILE ONLY) */}
            {isMobile && intakeMode === "camera" && (
              <div className="space-y-3">
                <input
                  ref={cameraP1InputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setPhotoP1(f);
                      setPhotoP1Preview(URL.createObjectURL(f));
                    }
                  }}
                />

                <input
                  ref={cameraP2InputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setPhotoP2(f);
                      setPhotoP2Preview(URL.createObjectURL(f));
                    }
                  }}
                />

                <div className="grid grid-cols-2 gap-3">
                  {/* Camera 1: Page 1 */}
                  <div
                    onClick={() => cameraP1InputRef.current?.click()}
                    className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-3 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)] min-h-[130px] flex flex-col items-center justify-center"
                  >
                    <span className="text-[9px] font-bold text-[var(--gold-accent)] uppercase block mb-1">
                      Page 1 (Front)
                    </span>
                    {photoP1Preview ? (
                      <div className="flex flex-col items-center gap-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photoP1Preview} alt="P1" className="w-12 h-16 object-cover rounded border" />
                        <span className="text-[9px] text-[var(--military-olive)] font-bold">✓ Retake</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <Camera className="w-6 h-6 text-[var(--primary-accent)]" />
                        <span className="text-[11px] font-bold">Snap Page 1</span>
                      </div>
                    )}
                  </div>

                  {/* Camera 2: Page 2 */}
                  <div
                    onClick={() => cameraP2InputRef.current?.click()}
                    className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-3 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)] min-h-[130px] flex flex-col items-center justify-center"
                  >
                    <span className="text-[9px] font-bold text-[var(--primary-accent)] uppercase block mb-1">
                      Page 2 (Back)
                    </span>
                    {photoP2Preview ? (
                      <div className="flex flex-col items-center gap-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photoP2Preview} alt="P2" className="w-12 h-16 object-cover rounded border" />
                        <span className="text-[9px] text-[var(--military-olive)] font-bold">✓ Retake</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <Camera className="w-6 h-6 text-[var(--primary-accent)]" />
                        <span className="text-[11px] font-bold">Snap Page 2</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={(!photoP1 && !photoP2) || isParsingPiq}
                  onClick={() => {
                    const files = [photoP1, photoP2].filter(Boolean) as File[];
                    analyzePiqWithGemini(files);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isParsingPiq ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span className="truncate max-w-[280px]">{parseStatusMessage || "ANALYZING CAPTURED PHOTOS WITH AI..."}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                      <span>
                        {photoP1 && photoP2
                          ? "ANALYSE BOTH CAPTURED PAGES WITH AI"
                          : photoP1 || photoP2
                          ? "ANALYSE CAPTURED PAGE WITH AI"
                          : "CAPTURE PAGE 1 & PAGE 2 TO ANALYSE"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Status / Document Format Indicator */}
            <div className="pt-2 text-[10px] text-[var(--fg-muted)] flex items-center gap-1.5">
              {isParsingPiq && <RefreshCw className="w-3 h-3 animate-spin text-[var(--primary-accent)] shrink-0" />}
              <span className="font-medium text-[var(--fg-secondary)]">
                {isParsingPiq
                  ? (parseStatusMessage || "Gemini AI is analyzing document & tables...")
                  : "On-device compression enabled: under Vercel payload limit & 100% private"}
              </span>
            </div>

              {/* Success Notification */}
              {parseNotification && (
                <div className="p-2.5 rounded bg-[var(--military-olive)]/15 border border-[var(--military-olive)] text-[11px] text-[var(--fg-primary)] flex items-center gap-2 animate-in fade-in duration-200">
                  <FileCheck className="w-4 h-4 text-[var(--military-olive)] shrink-0" />
                  <span>{parseNotification}</span>
                </div>
              )}

              {/* Error Notification */}
              {parseError && (
                <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-[11px] text-red-500 flex items-center gap-2 animate-in fade-in duration-200">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{parseError}</span>
                </div>
              )}
            </div>
          </div>

        {/* LOCKED EMAIL BAR */}
        <div className="p-3.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex items-center justify-center text-[var(--fg-muted)]">
              <Lock className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
            </div>
            <div>
              <div className="text-[10px] text-[var(--fg-muted)] uppercase tracking-wider font-semibold">
                Candidate Primary Identifier (Locked)
              </div>
              <div className="text-xs font-bold text-[var(--fg-primary)] flex items-center gap-2">
                <span>{email || "candidate@ssbastra.in"}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--gold-accent)] font-semibold">
                  READ-ONLY
                </span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-[var(--fg-muted)] italic">
            Email is tied to your SSB Astra credential & cannot be edited here.
          </div>
        </div>

        {/* AI PIQ DOSSIER ASSESSMENT & OFFICER READINESS RADAR */}
        {assessment && (
          <div className="p-5 sm:p-6 rounded-xl border-2 border-[var(--gold-accent)]/40 bg-[var(--canvas-surface)] shadow-lg space-y-5 animate-in fade-in slide-in-from-top-3 duration-300">
            {/* Header & Toggle */}
            <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg border border-[var(--gold-accent)]/50 bg-[var(--gold-accent)]/10 flex items-center justify-center text-[var(--gold-accent)]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                      AI PIQ DOSSIER ASSESSMENT & IO FORECAST
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] border border-[var(--gold-accent)]/30 font-bold">
                      DIPR BENCHMARK
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--fg-muted)]">
                    Evaluated against the 15 Officer Like Qualities (OLQs) by Senior Selection Board IO heuristics
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAssessment(!showAssessment)}
                className="flex items-center gap-1 text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--gold-accent)] px-2.5 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]"
              >
                <span>{showAssessment ? "Collapse" : "Expand Analysis"}</span>
                {showAssessment ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showAssessment && (
              <div className="space-y-6">
                {/* Top Row: Score Badge + 4 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Score Big Display */}
                  <div className="md:col-span-4 p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="text-[10px] uppercase font-bold text-[var(--fg-muted)] tracking-wider mb-1">
                      Candidate PIQ Score
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl sm:text-5xl font-black tracking-tight ${
                        assessment.piq_score >= 80 ? "text-[var(--military-olive)]" : assessment.piq_score >= 60 ? "text-[var(--gold-accent)]" : "text-amber-500"
                      }`}>
                        {assessment.piq_score}
                      </span>
                      <span className="text-sm font-bold text-[var(--fg-muted)]">/ 100</span>
                    </div>

                    <div className="mt-2 text-[10px] font-extrabold px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--fg-primary)] tracking-wide uppercase">
                      {assessment.overall_verdict}
                    </div>
                  </div>

                  {/* 4 Pillars Progress Bars */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider">
                      The 4 Classical Assessment Pillars
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Academics */}
                      <div className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-[var(--fg-secondary)]">Academics & Consistency</span>
                          <span className="text-[var(--primary-accent)]">{assessment.score_breakdown.academics.score}/25</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--primary-accent)]" 
                            style={{ width: `${(assessment.score_breakdown.academics.score / 25) * 100}%` }}
                          />
                        </div>
                        <p className="text-[9px] text-[var(--fg-muted)] leading-tight pt-0.5">
                          {assessment.score_breakdown.academics.assessment}
                        </p>
                      </div>

                      {/* Sports & NCC */}
                      <div className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-[var(--fg-secondary)]">Sports, NCC & Physical</span>
                          <span className="text-[var(--gold-accent)]">{assessment.score_breakdown.sports_and_ncc.score}/25</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--gold-accent)]" 
                            style={{ width: `${(assessment.score_breakdown.sports_and_ncc.score / 25) * 100}%` }}
                          />
                        </div>
                        <p className="text-[9px] text-[var(--fg-muted)] leading-tight pt-0.5">
                          {assessment.score_breakdown.sports_and_ncc.assessment}
                        </p>
                      </div>

                      {/* Leadership */}
                      <div className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-[var(--fg-secondary)]">Leadership & Responsibilities</span>
                          <span className="text-[var(--military-olive)]">{assessment.score_breakdown.leadership_and_responsibility.score}/25</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--military-olive)]" 
                            style={{ width: `${(assessment.score_breakdown.leadership_and_responsibility.score / 25) * 100}%` }}
                          />
                        </div>
                        <p className="text-[9px] text-[var(--fg-muted)] leading-tight pt-0.5">
                          {assessment.score_breakdown.leadership_and_responsibility.assessment}
                        </p>
                      </div>

                      {/* Hobbies & Depth */}
                      <div className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-[var(--fg-secondary)]">Hobbies & Drive</span>
                          <span className="text-purple-400">{assessment.score_breakdown.hobbies_and_depth.score}/25</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500" 
                            style={{ width: `${(assessment.score_breakdown.hobbies_and_depth.score / 25) * 100}%` }}
                          />
                        </div>
                        <p className="text-[9px] text-[var(--fg-muted)] leading-tight pt-0.5">
                          {assessment.score_breakdown.hobbies_and_depth.assessment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Strengths & Vulnerabilities Radar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Key Strengths */}
                  <div className="p-4 rounded-xl border border-[var(--military-olive)]/40 bg-[var(--military-olive)]/5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--military-olive)] uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Positive OLQ Indicators in your PIQ</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[var(--fg-primary)]">
                      {assessment.key_strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                          <span className="text-[var(--military-olive)] font-bold mt-0.5">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vulnerabilities & Red Flags */}
                  <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Vulnerabilities / Red Flags IO Will Probe</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[var(--fg-primary)]">
                      {assessment.vulnerabilities_and_red_flags.map((vuln, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                          <span className="text-amber-500 font-bold mt-0.5">⚠</span>
                          <span>{vuln}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Interviewing Officer (IO) Question Forecast */}
                <div className="p-4 rounded-xl border border-[var(--primary-accent)]/40 bg-[var(--primary-accent)]/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary-accent)] uppercase tracking-wider">
                      <Zap className="w-4 h-4 text-[var(--gold-accent)]" />
                      <span>Predicted Interviewing Officer (IO) Questions On Your PIQ</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] font-semibold">
                      RAPID-FIRE PREP
                    </span>
                  </div>

                  <div className="space-y-2">
                    {assessment.io_probable_questions.map((q, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs flex items-start gap-2.5 shadow-sm">
                        <span className="w-5 h-5 rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          Q{idx + 1}
                        </span>
                        <p className="text-[11px] text-[var(--fg-primary)] italic leading-relaxed">
                          &ldquo;{q}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tactical Recommendations */}
                <div className="p-4 rounded-xl border border-[var(--gold-accent)]/40 bg-[var(--gold-accent)]/5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>Tactical Recommendations To Strengthen Your Presentation</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[var(--fg-primary)]">
                    {assessment.recommendations_for_improvement.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                        <span className="text-[var(--gold-accent)] font-bold mt-0.5">&bull;</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION NAVIGATION TABS */}
        <div className="border-b border-[var(--canvas-border)] flex items-center gap-1 sm:gap-2 overflow-x-auto pb-px">
          {[
            { id: "personal", label: "1. Identity & Demographics", icon: User },
            { id: "residence", label: "2. Residential History", icon: Home },
            { id: "family_edu", label: "3. Family & Academics", icon: GraduationCap },
            { id: "activities", label: "4. NCC, Sports & SSB Record", icon: Trophy },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  active
                    ? "border-[var(--primary-accent)] text-[var(--primary-accent)] bg-[var(--canvas-surface)] rounded-t"
                    : "border-transparent text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:border-[var(--canvas-border)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <div className="p-5 sm:p-7 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-sm space-y-6">

          {/* TAB 1: IDENTITY & DEMOGRAPHICS */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div className="border-b border-[var(--canvas-border)] pb-3">
                <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
                  <User className="w-4 h-4 text-[var(--primary-accent)]" />
                  <span>SECTION 1: PERSONAL PARTICULARS & DEMOGRAPHICS (ITEMS 1-3, 5)</span>
                </h3>
                <p className="text-[11px] text-[var(--fg-muted)] mt-1">
                  Information as officially recorded on your Matriculation / 10th Board Certificate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Full Name in Capitals */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Full Name in CAPITALS (as in Matric Certificate) *
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={e => updateField("full_name", e.target.value.toUpperCase())}
                    placeholder="e.g. ROHAN SHARMA"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] font-bold focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>

                {/* Target SSB Entry */}
                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Target SSB Entry *
                  </label>
                  <select
                    value={formData.target_entry}
                    onChange={e => updateField("target_entry", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  >
                    <option value="CDS">CDS (IMA / OTA / AFA / INA)</option>
                    <option value="NDA">NDA (National Defence Academy)</option>
                    <option value="AFCAT">AFCAT (Flying / Ground Duty)</option>
                    <option value="TGC">TGC / Tech Entries (Army)</option>
                    <option value="TES">TES (10+2 Technical Entry)</option>
                    <option value="NCC">NCC Special Entry Scheme</option>
                    <option value="JAG">JAG (Judge Advocate General)</option>
                    <option value="OTHER">Other Officer Entry</option>
                  </select>
                </div>

                {/* Father's Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Father&apos;s Name in CAPITALS *
                  </label>
                  <input
                    type="text"
                    value={formData.father_name}
                    onChange={e => updateField("father_name", e.target.value.toUpperCase())}
                    placeholder="e.g. SHRI RAJESH SHARMA"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>

                {/* Gender - Critical for Lady/Gentleman dynamic salutation */}
                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Gender * (Determines Officer Salutation)
                  </label>
                  <select
                    value={formData.gender}
                    onChange={e => updateField("gender", e.target.value as "male" | "female")}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male (Gentleman Cadet)</option>
                    <option value="female">Female (Lady Cadet)</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={normalizeDobForInput(formData.dob)}
                    onChange={e => updateField("dob", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>

                {/* Mother Tongue */}
                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Mother Tongue *
                  </label>
                  <input
                    type="text"
                    value={formData.mother_tongue}
                    onChange={e => updateField("mother_tongue", e.target.value)}
                    placeholder="e.g. Hindi, Punjabi, Tamil"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>

                {/* Religion */}
                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Religion *
                  </label>
                  <input
                    type="text"
                    value={formData.religion}
                    onChange={e => updateField("religion", e.target.value)}
                    placeholder="e.g. Hindu, Sikh, Christian, Muslim"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  />
                </div>

                {/* Category (SC/ST/OBC/Gen) */}
                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Category (Whether SC / ST / OBC / Gen)
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => updateField("category", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

                {/* Marital Status */}
                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Marital Status *
                  </label>
                  <select
                    value={formData.marital_status}
                    onChange={e => updateField("marital_status", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--fg-primary)] focus:outline-none focus:border-[var(--primary-accent)]"
                  >
                    <option value="Single">Single / Unmarried</option>
                    <option value="Married">Married</option>
                    <option value="Widower">Widower</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RESIDENTIAL HISTORY */}
          {activeTab === "residence" && (
            <div className="space-y-6">
              <div className="border-b border-[var(--canvas-border)] pb-3">
                <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
                  <Home className="w-4 h-4 text-[var(--primary-accent)]" />
                  <span>SECTION 2: RESIDENTIAL HISTORY (ITEM 4)</span>
                </h3>
                <p className="text-[11px] text-[var(--fg-muted)] mt-1">
                  SSB Interviewing Officers evaluate your geographical exposure, adaptability, and socio-economic environment through your residency.
                </p>
              </div>

              {/* 4(a) Place of Maximum Residence */}
              <div className="p-4 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3">
                <div className="text-xs font-bold text-[var(--gold-accent)]">
                  4(a) Place of Maximum Residence (Where you have lived longest)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">Place / City</label>
                    <input
                      type="text"
                      value={formData.max_residence_place}
                      onChange={e => updateField("max_residence_place", e.target.value)}
                      placeholder="e.g. Pune"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">District</label>
                    <input
                      type="text"
                      value={formData.max_residence_district}
                      onChange={e => updateField("max_residence_district", e.target.value)}
                      placeholder="e.g. Pune"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">State</label>
                    <input
                      type="text"
                      value={formData.max_residence_state}
                      onChange={e => updateField("max_residence_state", e.target.value)}
                      placeholder="e.g. Maharashtra"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">Approx Population</label>
                    <input
                      type="text"
                      value={formData.max_residence_population}
                      onChange={e => updateField("max_residence_population", e.target.value)}
                      placeholder="e.g. 70 Lakhs"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 4(b) Place of Present Residence */}
              <div className="p-4 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3">
                <div className="text-xs font-bold text-[var(--primary-accent)]">
                  4(b) Place of Present Residence (Where you currently live)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">Place / City</label>
                    <input
                      type="text"
                      value={formData.present_residence_place}
                      onChange={e => updateField("present_residence_place", e.target.value)}
                      placeholder="e.g. Dehradun"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">District</label>
                    <input
                      type="text"
                      value={formData.present_residence_district}
                      onChange={e => updateField("present_residence_district", e.target.value)}
                      placeholder="e.g. Dehradun"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">State</label>
                    <input
                      type="text"
                      value={formData.present_residence_state}
                      onChange={e => updateField("present_residence_state", e.target.value)}
                      placeholder="e.g. Uttarakhand"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">Approx Population</label>
                    <input
                      type="text"
                      value={formData.present_residence_population}
                      onChange={e => updateField("present_residence_population", e.target.value)}
                      placeholder="e.g. 10 Lakhs"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 4(c) Place of Permanent Residence */}
              <div className="p-4 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[var(--fg-primary)]">
                    4(c) Place of Permanent Residence (Hometown / Native Place)
                  </div>
                  <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.perm_residence_district_hq}
                      onChange={e => updateField("perm_residence_district_hq", e.target.checked)}
                      className="rounded border-[var(--canvas-border)]"
                    />
                    <span className="text-[11px] text-[var(--fg-secondary)] font-semibold">Is District HQ?</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">Place / City</label>
                    <input
                      type="text"
                      value={formData.perm_residence_place}
                      onChange={e => updateField("perm_residence_place", e.target.value)}
                      placeholder="e.g. Jaipur"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">District</label>
                    <input
                      type="text"
                      value={formData.perm_residence_district}
                      onChange={e => updateField("perm_residence_district", e.target.value)}
                      placeholder="e.g. Jaipur"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">State</label>
                    <input
                      type="text"
                      value={formData.perm_residence_state}
                      onChange={e => updateField("perm_residence_state", e.target.value)}
                      placeholder="e.g. Rajasthan"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--fg-secondary)] mb-1">Approx Population</label>
                    <input
                      type="text"
                      value={formData.perm_residence_population}
                      onChange={e => updateField("perm_residence_population", e.target.value)}
                      placeholder="e.g. 40 Lakhs"
                      className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAMILY & ACADEMICS */}
          {activeTab === "family_edu" && (
            <div className="space-y-8">
              
              {/* Family Matrix (Item 6) */}
              <div className="space-y-4">
                <div className="border-b border-[var(--canvas-border)] pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
                      <Users className="w-4 h-4 text-[var(--primary-accent)]" />
                      <span>SECTION 3A: FAMILY DETAILS & OCCUPATIONS (ITEM 6)</span>
                    </h3>
                    <p className="text-[11px] text-[var(--fg-muted)] mt-0.5">
                      Particulars of Parents, Guardians, and Siblings with monthly income.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        family_members: [
                          ...prev.family_members,
                          { relation: "Sibling", education: "", occupation: "", monthly_income: "" }
                        ]
                      }));
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] text-xs font-bold hover:border-[var(--primary-accent)] transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Member</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--canvas-border)] text-[10px] text-[var(--fg-muted)] uppercase">
                        <th className="py-2 pr-3">Relation / Particulars</th>
                        <th className="py-2 pr-3">Education</th>
                        <th className="py-2 pr-3">Occupation</th>
                        <th className="py-2 pr-3">Monthly Income (₹)</th>
                        <th className="py-2 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--canvas-border)]">
                      {formData.family_members.map((member, idx) => (
                        <tr key={idx}>
                          <td className="py-2 pr-3">
                            <input
                              type="text"
                              value={member.relation}
                              onChange={e => {
                                const list = [...formData.family_members];
                                list[idx].relation = e.target.value;
                                updateField("family_members", list);
                              }}
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs font-bold"
                            />
                          </td>
                          <td className="py-2 pr-3">
                            <input
                              type="text"
                              value={member.education}
                              onChange={e => {
                                const list = [...formData.family_members];
                                list[idx].education = e.target.value;
                                updateField("family_members", list);
                              }}
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                            />
                          </td>
                          <td className="py-2 pr-3">
                            <input
                              type="text"
                              value={member.occupation}
                              onChange={e => {
                                const list = [...formData.family_members];
                                list[idx].occupation = e.target.value;
                                updateField("family_members", list);
                              }}
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                            />
                          </td>
                          <td className="py-2 pr-3">
                            <input
                              type="text"
                              value={member.monthly_income}
                              onChange={e => {
                                const list = [...formData.family_members];
                                list[idx].monthly_income = e.target.value;
                                updateField("family_members", list);
                              }}
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                            />
                          </td>
                          <td className="py-2 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                const list = formData.family_members.filter((_, i) => i !== idx);
                                updateField("family_members", list);
                              }}
                              className="p-1 text-[var(--fg-muted)] hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Educational Record Table (Item 7) */}
              <div className="space-y-4 pt-4 border-t border-[var(--canvas-border)]">
                <div className="border-b border-[var(--canvas-border)] pb-2">
                  <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[var(--gold-accent)]" />
                    <span>SECTION 3B: EDUCATIONAL RECORD (ITEM 7 - COMMENCING FROM MATRICULATION)</span>
                  </h3>
                  <p className="text-[11px] text-[var(--fg-muted)] mt-0.5">
                    Qualification, institution, board/university, percentage, medium & outstanding achievements.
                  </p>
                </div>

                <div className="space-y-3">
                  {formData.education_records.map((rec, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-2.5">
                      <div className="text-xs font-bold text-[var(--primary-accent)] flex items-center justify-between">
                        <span>{rec.qualification}</span>
                        <span className="text-[10px] text-[var(--fg-muted)] font-normal">Step {idx + 1} of {formData.education_records.length}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                        <div className="sm:col-span-2">
                          <label className="block text-[9px] text-[var(--fg-muted)] mb-0.5">Full Name of Institution</label>
                          <input
                            type="text"
                            value={rec.institution}
                            onChange={e => {
                              const list = [...formData.education_records];
                              list[idx].institution = e.target.value;
                              updateField("education_records", list);
                            }}
                            className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-[var(--fg-muted)] mb-0.5">Board / University</label>
                          <input
                            type="text"
                            value={rec.board_university}
                            onChange={e => {
                              const list = [...formData.education_records];
                              list[idx].board_university = e.target.value;
                              updateField("education_records", list);
                            }}
                            className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-[var(--fg-muted)] mb-0.5">Passing Year</label>
                          <input
                            type="text"
                            value={rec.year}
                            onChange={e => {
                              const list = [...formData.education_records];
                              list[idx].year = e.target.value;
                              updateField("education_records", list);
                            }}
                            className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-[var(--fg-muted)] mb-0.5">Div & Marks % / CGPA</label>
                          <input
                            type="text"
                            value={rec.div_marks_pct}
                            onChange={e => {
                              const list = [...formData.education_records];
                              list[idx].div_marks_pct = e.target.value;
                              updateField("education_records", list);
                            }}
                            className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-[var(--fg-muted)] mb-0.5">Boarder / Day Scholar</label>
                          <select
                            value={rec.boarder_dayscholar}
                            onChange={e => {
                              const list = [...formData.education_records];
                              list[idx].boarder_dayscholar = e.target.value;
                              updateField("education_records", list);
                            }}
                            className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                          >
                            <option value="Day Scholar">Day Scholar</option>
                            <option value="Boarder">Boarder / Hosteller</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] text-[var(--fg-muted)] mb-0.5">Outstanding Achievement, if any</label>
                        <input
                          type="text"
                          value={rec.achievement}
                          onChange={e => {
                            const list = [...formData.education_records];
                            list[idx].achievement = e.target.value;
                            updateField("education_records", list);
                          }}
                          placeholder="e.g. School topper, Olympiad medalist, Merit list rank"
                          className="w-full px-2.5 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs text-[var(--gold-accent)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: ACTIVITIES, NCC, SPORTS & PREVIOUS SSB */}
          {activeTab === "activities" && (
            <div className="space-y-6">
              <div className="border-b border-[var(--canvas-border)] pb-3">
                <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[var(--gold-accent)]" />
                  <span>SECTION 4: PHYSICAL STATS, NCC, SPORTS & SSB HISTORY (ITEMS 8-14)</span>
                </h3>
                <p className="text-[11px] text-[var(--fg-muted)] mt-1">
                  Key areas evaluated by GTO & Interviewing Officer for physical stamina, leadership, and OLQs.
                </p>
              </div>

              {/* Physical Metrics & Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]">
                <div>
                  <label className="block text-[10px] text-[var(--fg-secondary)] mb-1 font-bold">Height (in Metres)</label>
                  <input
                    type="text"
                    value={formData.height_m}
                    onChange={e => updateField("height_m", e.target.value)}
                    placeholder="e.g. 1.78"
                    className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--fg-secondary)] mb-1 font-bold">Weight (in Kilograms)</label>
                  <input
                    type="text"
                    value={formData.weight_kg}
                    onChange={e => updateField("weight_kg", e.target.value)}
                    placeholder="e.g. 72"
                    className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--fg-secondary)] mb-1 font-bold">Present Occupation</label>
                  <input
                    type="text"
                    value={formData.present_occupation}
                    onChange={e => updateField("present_occupation", e.target.value)}
                    placeholder="e.g. Student / Software Eng."
                    className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--fg-secondary)] mb-1 font-bold">Monthly Income, if any</label>
                  <input
                    type="text"
                    value={formData.monthly_income}
                    onChange={e => updateField("monthly_income", e.target.value)}
                    placeholder="e.g. Nil"
                    className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                  />
                </div>
              </div>

              {/* NCC Training Details */}
              <div className="p-4 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--primary-accent)]">Item 10: N.C.C. Training</span>
                  <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.has_ncc}
                      onChange={e => updateField("has_ncc", e.target.checked)}
                      className="rounded border-[var(--canvas-border)]"
                    />
                    <span className="text-[11px] font-bold">Has undergone NCC Training</span>
                  </label>
                </div>

                {formData.has_ncc && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                    <div>
                      <label className="block text-[10px] text-[var(--fg-muted)] mb-1">Wing</label>
                      <select
                        value={formData.ncc_wing}
                        onChange={e => updateField("ncc_wing", e.target.value)}
                        className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                      >
                        <option value="Army">Army Wing</option>
                        <option value="Navy">Naval Wing</option>
                        <option value="Air Force">Air Wing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--fg-muted)] mb-1">Division</label>
                      <input
                        type="text"
                        value={formData.ncc_division}
                        onChange={e => updateField("ncc_division", e.target.value)}
                        placeholder="e.g. Senior Division"
                        className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--fg-muted)] mb-1">Certificate Obtained</label>
                      <input
                        type="text"
                        value={formData.ncc_certificate}
                        onChange={e => updateField("ncc_certificate", e.target.value)}
                        placeholder="e.g. 'C' Certificate (Alpha)"
                        className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--fg-muted)] mb-1">Total Duration</label>
                      <input
                        type="text"
                        value={formData.ncc_duration}
                        onChange={e => updateField("ncc_duration", e.target.value)}
                        placeholder="e.g. 3 Years"
                        className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Hobbies, Interests & Extra-curriculars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Item 12: Hobbies / Interests *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.hobbies}
                    onChange={e => updateField("hobbies", e.target.value)}
                    placeholder="e.g. Aeromodelling, Reading military history, Distance running"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs focus:outline-none focus:border-[var(--primary-accent)] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[var(--fg-secondary)] mb-1">
                    Item 13(d): Positions of Responsibility Held *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.responsibilities_held}
                    onChange={e => updateField("responsibilities_held", e.target.value)}
                    placeholder="e.g. Head Boy / Girl, NCC Senior Under Officer, Sports Captain, Club Secretary"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs focus:outline-none focus:border-[var(--primary-accent)] leading-relaxed"
                  />
                </div>
              </div>

              {/* Commission Nature & Service Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]">
                <div>
                  <label className="block text-[10px] text-[var(--fg-secondary)] mb-1 font-bold">
                    Nature of Commission Applied For
                  </label>
                  <input
                    type="text"
                    value={formData.nature_of_commission}
                    onChange={e => updateField("nature_of_commission", e.target.value)}
                    placeholder="e.g. Permanent Commission (PC)"
                    className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--fg-secondary)] mb-1 font-bold">
                    Choice of Service (Priority Order)
                  </label>
                  <input
                    type="text"
                    value={formData.service_preference}
                    onChange={e => updateField("service_preference", e.target.value)}
                    placeholder="e.g. 1. Army  2. Air Force  3. Navy"
                    className="w-full px-2.5 py-1.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                  />
                </div>
              </div>

              {/* Previous SSB Attempts Table (Item 14) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[var(--primary-accent)]">
                      Item 14: Details of All Previous SSB Interviews
                    </h4>
                    <p className="text-[10px] text-[var(--fg-muted)]">
                      Mention Army, Navy, and Air Force Selection Boards attended with outcome.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        ssb_attempts: [
                          ...prev.ssb_attempts,
                          { entry: "", board_place: "", date: "", chest_batch_no: "", result: "Screened Out" }
                        ]
                      }));
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] text-xs font-bold hover:border-[var(--primary-accent)]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add SSB Attempt</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--canvas-border)] text-[10px] text-[var(--fg-muted)] uppercase">
                        <th className="py-2 pr-2">Entry</th>
                        <th className="py-2 pr-2">SSB No. & Place</th>
                        <th className="py-2 pr-2">Date / Year</th>
                        <th className="py-2 pr-2">Chest & Batch No.</th>
                        <th className="py-2 pr-2">Result</th>
                        <th className="py-2 w-8"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--canvas-border)]">
                      {formData.ssb_attempts.map((attempt, idx) => (
                        <tr key={idx}>
                          <td className="py-2 pr-2">
                            <input
                              type="text"
                              value={attempt.entry}
                              onChange={e => {
                                const list = [...formData.ssb_attempts];
                                list[idx].entry = e.target.value;
                                updateField("ssb_attempts", list);
                              }}
                              placeholder="e.g. NDA 148"
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                            />
                          </td>
                          <td className="py-2 pr-2">
                            <input
                              type="text"
                              value={attempt.board_place}
                              onChange={e => {
                                const list = [...formData.ssb_attempts];
                                list[idx].board_place = e.target.value;
                                updateField("ssb_attempts", list);
                              }}
                              placeholder="e.g. 18 SSB Prayagraj"
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                            />
                          </td>
                          <td className="py-2 pr-2">
                            <input
                              type="text"
                              value={attempt.date}
                              onChange={e => {
                                const list = [...formData.ssb_attempts];
                                list[idx].date = e.target.value;
                                updateField("ssb_attempts", list);
                              }}
                              placeholder="e.g. Nov 2021"
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                            />
                          </td>
                          <td className="py-2 pr-2">
                            <input
                              type="text"
                              value={attempt.chest_batch_no}
                              onChange={e => {
                                const list = [...formData.ssb_attempts];
                                list[idx].chest_batch_no = e.target.value;
                                updateField("ssb_attempts", list);
                              }}
                              placeholder="e.g. Chest 34"
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                            />
                          </td>
                          <td className="py-2 pr-2">
                            <select
                              value={attempt.result}
                              onChange={e => {
                                const list = [...formData.ssb_attempts];
                                list[idx].result = e.target.value;
                                updateField("ssb_attempts", list);
                              }}
                              className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs font-semibold"
                            >
                              <option value="Screened Out">Screened Out (Stage 1)</option>
                              <option value="Conference Out">Conference Out (Stage 2)</option>
                              <option value="Recommended">Recommended</option>
                            </select>
                          </td>
                          <td className="py-2 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                const list = formData.ssb_attempts.filter((_, i) => i !== idx);
                                updateField("ssb_attempts", list);
                              }}
                              className="p-1 text-[var(--fg-muted)] hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
          <div className="text-xs text-[var(--fg-muted)]">
            Cadet Profile: <strong className="text-[var(--fg-primary)]">{formData.full_name || "CADET ASPIRANT"}</strong> ({formData.target_entry}) • Completion: <span className="text-[var(--gold-accent)] font-bold">{completionPct}%</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/dashboard"
              className="flex-1 sm:flex-initial text-center px-4 py-2 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] text-xs font-bold text-[var(--fg-secondary)] transition-all"
            >
              Back to Dashboard
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saving ? "SAVING..." : "SAVE & COMPLETE PIQ"}</span>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
