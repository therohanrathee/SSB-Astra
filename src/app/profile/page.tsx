"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Download, 
  UploadCloud, 
  Sparkles, 
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
  X
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
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

export interface PiqFormData {
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

const DEFAULT_EDUCATION_RECORDS: EducationRecord[] = [
  {
    qualification: "Matriculation / 10th",
    institution: "",
    board_university: "",
    year: "",
    div_marks_pct: "",
    medium: "English",
    boarder_dayscholar: "Day Scholar",
    achievement: ""
  },
  {
    qualification: "10+2 / Intermediate / 12th",
    institution: "",
    board_university: "",
    year: "",
    div_marks_pct: "",
    medium: "English",
    boarder_dayscholar: "Day Scholar",
    achievement: ""
  },
  {
    qualification: "Graduation (B.Tech / B.Sc / B.Com / B.A / etc.)",
    institution: "",
    board_university: "",
    year: "",
    div_marks_pct: "",
    medium: "English",
    boarder_dayscholar: "Day Scholar",
    achievement: ""
  }
];

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

  education_records: DEFAULT_EDUCATION_RECORDS,

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
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [hasUploadedData, setHasUploadedData] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const isInitialLoadedRef = useRef(false);

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

  // Listen for Escape key to close intake modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIntakeModalOpen(false);
      }
    };
    if (intakeModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [intakeModalOpen]);

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

  // 1. Load User Profile from Supabase & Local Cache with Multi-Device Authoritative Sync
  useEffect(() => {
    async function loadCandidate() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          setEmail(user.email || "candidate@ssbastra.in");

          // Fetch profile row from Supabase
          const { data, error: dbError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

          if (dbError) {
            console.warn("[loadCandidate Supabase fetch error]:", dbError);
          }

          if (data) {
            // A. Safely parse remote piq_data (support JSONB object and stringified JSON)
            let remotePiqData: Partial<PiqFormData> | null = null;
            if (data.piq_data) {
              if (typeof data.piq_data === "object" && data.piq_data !== null) {
                remotePiqData = data.piq_data;
              } else if (typeof data.piq_data === "string") {
                try {
                  remotePiqData = JSON.parse(data.piq_data);
                } catch (e) {
                  console.warn("Could not parse data.piq_data JSON string:", e);
                }
              }
            }

            // B. Safely parse remote piq_assessment (support JSONB object and stringified JSON)
            let remoteAssessment: PiqAssessment | null = null;
            if (data.piq_assessment) {
              if (typeof data.piq_assessment === "object" && data.piq_assessment !== null) {
                remoteAssessment = data.piq_assessment as PiqAssessment;
              } else if (typeof data.piq_assessment === "string") {
                try {
                  remoteAssessment = JSON.parse(data.piq_assessment);
                } catch (e) {
                  console.warn("Could not parse data.piq_assessment JSON string:", e);
                }
              }
            }

            // Helper: count how many real dossier fields are populated
            const countMeaningfulFields = (d?: Partial<PiqFormData> | null): number => {
              if (!d || typeof d !== "object") return 0;
              let count = 0;
              if (d.full_name && d.full_name.trim()) count++;
              if (d.father_name && d.father_name.trim()) count++;
              if (d.max_residence_place && d.max_residence_place.trim()) count++;
              if (d.present_residence_place && d.present_residence_place.trim()) count++;
              if (d.perm_residence_place && d.perm_residence_place.trim()) count++;
              if (d.hobbies && d.hobbies.trim()) count++;
              if (d.extra_curricular && d.extra_curricular.trim()) count++;
              if (Array.isArray(d.family_members) && d.family_members.length > 0) count += d.family_members.length * 2;
              if (Array.isArray(d.education_records) && d.education_records.length > 0) count += d.education_records.length * 2;
              if (Array.isArray(d.sports_records) && d.sports_records.length > 0) count += d.sports_records.length * 2;
              if (Array.isArray(d.ssb_attempts) && d.ssb_attempts.length > 0) count += d.ssb_attempts.length * 2;
              return count;
            };

            const remoteCount = countMeaningfulFields(remotePiqData);

            // Read device local storage
            let localPiqData: Partial<PiqFormData> | null = null;
            const cachedPiq = localStorage.getItem("ssb_candidate_piq_data");
            if (cachedPiq) {
              try {
                localPiqData = JSON.parse(cachedPiq);
              } catch {
                localPiqData = null;
              }
            }
            const localCount = countMeaningfulFields(localPiqData);

            // C. Multi-Device Authoritative Resolution:
            // 1. If remote database has populated fields, remote Supabase WINS (e.g. candidate uploaded on mobile, opening on desktop).
            //    We update formData and write it to desktop's localStorage so local cache is in sync.
            // 2. If remote database is empty but local device has populated fields (e.g. candidate just uploaded on this device),
            //    local cache wins and auto-heals Supabase.
            // 3. Fallback to basic profiles record.
            let resolvedData: PiqFormData;

            if (remoteCount > 0) {
              resolvedData = {
                ...INITIAL_PIQ_DATA,
                ...remotePiqData,
                full_name: data.full_name || remotePiqData?.full_name || "",
                target_entry: data.target_entry || remotePiqData?.target_entry || "CDS",
                dob: normalizeDobForInput(data.dob || remotePiqData?.dob) || "",
                gender: (data.gender as "male" | "female") || remotePiqData?.gender || "male",
                education_records: (remotePiqData?.education_records && remotePiqData.education_records.length > 0)
                  ? remotePiqData.education_records
                  : DEFAULT_EDUCATION_RECORDS,
                family_members: remotePiqData?.family_members || [],
                sports_records: remotePiqData?.sports_records || [],
                ssb_attempts: remotePiqData?.ssb_attempts || []
              };
              setFormData(resolvedData);
              localStorage.setItem("ssb_candidate_piq_data", JSON.stringify(resolvedData));
              setHasUploadedData(true);
            } else if (localCount > 0 && localPiqData) {
              resolvedData = {
                ...INITIAL_PIQ_DATA,
                ...localPiqData,
                full_name: localPiqData.full_name || data.full_name || "",
                target_entry: localPiqData.target_entry || data.target_entry || "CDS",
                dob: normalizeDobForInput(localPiqData.dob || data.dob) || "",
                gender: (localPiqData.gender as "male" | "female") || (data.gender as "male" | "female") || "male",
                education_records: (localPiqData.education_records && localPiqData.education_records.length > 0)
                  ? localPiqData.education_records
                  : DEFAULT_EDUCATION_RECORDS,
                family_members: localPiqData.family_members || [],
                sports_records: localPiqData.sports_records || [],
                ssb_attempts: localPiqData.ssb_attempts || []
              };
              setFormData(resolvedData);
              setHasUploadedData(true);

              // Auto-heal remote Supabase record with this local data
              try {
                await supabase
                  .from("profiles")
                  .update({
                    full_name: resolvedData.full_name,
                    target_entry: resolvedData.target_entry,
                    dob: resolvedData.dob ? normalizeDobForInput(resolvedData.dob) : null,
                    profile_completion_pct: 100,
                    piq_data: resolvedData,
                    updated_at: new Date().toISOString()
                  })
                  .eq("id", user.id);
              } catch (healErr) {
                console.warn("[Auto-heal to Supabase]:", healErr);
              }
            } else {
              resolvedData = {
                ...INITIAL_PIQ_DATA,
                full_name: data.full_name || "",
                target_entry: data.target_entry || "CDS",
                dob: normalizeDobForInput(data.dob) || "",
                gender: (data.gender as "male" | "female") || "male",
                education_records: DEFAULT_EDUCATION_RECORDS
              };
              setFormData(resolvedData);
            }

            // D. Assessment Resolution
            if (remoteAssessment) {
              setAssessment(remoteAssessment);
              setHasUploadedData(true);
              localStorage.setItem("ssb_candidate_piq_assessment", JSON.stringify(remoteAssessment));
            } else {
              const cachedAssessment = localStorage.getItem("ssb_candidate_piq_assessment");
              if (cachedAssessment) {
                try {
                  const parsed = JSON.parse(cachedAssessment);
                  if (parsed && typeof parsed === "object") {
                    setAssessment(parsed);
                    setHasUploadedData(true);
                  }
                } catch {
                  // ignore
                }
              }
            }

            if (data.last_piq_uploaded_at || remoteCount > 0 || remoteAssessment) {
              setHasUploadedData(true);
              localStorage.setItem("ssb_candidate_piq_uploaded", "true");
            }
            setCompletionPct(data.profile_completion_pct || (remoteAssessment ? 100 : (remoteCount > 0 ? 90 : 30)));
          }
        } else {
          // Unauthenticated or demo mode
          setEmail("cadet@ssbastra.in");
          const cachedPiq = localStorage.getItem("ssb_candidate_piq_data");
          if (cachedPiq) {
            try {
              const parsed = JSON.parse(cachedPiq);
              if (parsed && typeof parsed === "object") {
                setFormData(prev => ({ ...prev, ...parsed, dob: normalizeDobForInput(parsed.dob) || prev.dob }));
                if (parsed.full_name || parsed.father_name) {
                  setHasUploadedData(true);
                }
              }
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        console.error("Failed to load cadet profile:", err);
      } finally {
        isInitialLoadedRef.current = true;
      }
    }
    loadCandidate();
  }, []);

  // Update Field Helper
  const updateField = <K extends keyof PiqFormData>(field: K, value: PiqFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Helper: Bulletproof Client-Side Image Compression using Canvas
  // Downscales any smartphone photo (5-25 MB) to max 1600px width/height and 80% JPEG (~200-350 KB)
  const compressImageClientSide = async (
    file: File,
    maxDimension = 1600,
    quality = 0.80
  ): Promise<File> => {
    // If the file is already small (<= 400 KB), return as is
    if (file.size <= 400 * 1024 && file.type === "image/jpeg") {
      return file;
    }

    let imgSource: ImageBitmap | HTMLImageElement | null = null;
    let objectUrl: string | null = null;

    try {
      // Strategy 1: createImageBitmap (Native, fast, low memory, handles EXIF)
      if (typeof window !== "undefined" && typeof createImageBitmap === "function") {
        try {
          imgSource = await createImageBitmap(file);
        } catch (bitmapErr) {
          console.warn("[Compression] createImageBitmap fallback:", bitmapErr);
        }
      }

      // Strategy 2: Image element with URL.createObjectURL
      if (!imgSource) {
        objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = (e) => reject(new Error("Browser could not decode image format"));
          img.src = objectUrl!;
        });
        imgSource = img;
      }

      // Step 2: Measure dimensions
      const naturalWidth = "naturalWidth" in imgSource ? imgSource.naturalWidth : imgSource.width;
      const naturalHeight = "naturalHeight" in imgSource ? imgSource.naturalHeight : imgSource.height;

      if (!naturalWidth || !naturalHeight) {
        throw new Error("Invalid image dimensions detected");
      }

      let width = naturalWidth;
      let height = naturalHeight;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      // Step 3: Draw onto Canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to initialize canvas 2D rendering context");
      }

      // Fill solid white background (prevents transparent PNGs turning black)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(imgSource, 0, 0, width, height);

      // Clean up ImageBitmap if used
      if ("close" in imgSource && typeof imgSource.close === "function") {
        imgSource.close();
      }

      // Step 4: Export to JPEG Blob (toBlob with synchronous toDataURL fallback)
      let compressedBlob: Blob | null = null;

      try {
        compressedBlob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
        });
      } catch (blobErr) {
        console.warn("[Compression] canvas.toBlob fallback:", blobErr);
      }

      // Synchronous toDataURL fallback (guaranteed in all browsers if toBlob returns null)
      if (!compressedBlob) {
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        const byteString = atob(dataUrl.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let j = 0; j < byteString.length; j++) {
          ia[j] = byteString.charCodeAt(j);
        }
        compressedBlob = new Blob([ab], { type: "image/jpeg" });
      }

      if (!compressedBlob || compressedBlob.size === 0) {
        throw new Error("Canvas output resulted in empty blob");
      }

      const cleanBaseName = (file.name || "scanned_page").replace(/\.[^/.]+$/, "");
      const compressedFile = new File([compressedBlob], `${cleanBaseName}.jpg`, {
        type: "image/jpeg",
        lastModified: Date.now()
      });

      console.log(
        `[SSB Client Compression] Success! ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB) compressed to ${(compressedFile.size / 1024).toFixed(0)} KB (${width}x${height})`
      );

      return compressedFile;
    } catch (err: unknown) {
      console.error("[SSB Client Compression Failure]:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      
      // If original file is small enough (<= 3.0 MB), allow it through
      if (file.size <= 3 * 1024 * 1024) {
        return file;
      }
      
      // If it's a huge file (e.g. 5 MB) and compression failed, DO NOT silently send it!
      throw new Error(
        `Failed to compress ${file.name || "image"} (${(file.size / 1024 / 1024).toFixed(1)} MB): ${errMsg}. Please ensure the file is a standard JPEG/PNG photo.`
      );
    } finally {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    }
  };

  // Helper: Client-Side PDF Rasterization to Compressed Images
  // 3-Tier Multi-Strategy Pipeline:
  // Tier 1: Direct Scanned JPEG Stream Extraction (<10ms, 100% native Safari iOS safe, zero WebWorker/WASM limits).
  // Tier 2: Canvas Rasterizer using pdfjs-dist/legacy (with Promise.withResolvers polyfill for Safari iOS).
  // Tier 3: Direct transmission fallback for compact PDFs <= 3.5 MB.
  const convertPdfToCompressedImages = async (
    file: File,
    onProgress?: (msg: string) => void
  ): Promise<File[]> => {
    if (typeof window === "undefined") {
      throw new Error("PDF rasterization must run in browser");
    }

    onProgress?.("⚡ Reading PDF document on device...");
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // =========================================================================
    // TIER 1: Direct Scanned JPEG Extraction (<10ms, Native Safari iOS Safe)
    // Mobile scanning apps (Apple Notes, iOS Files Scan, CamScanner, Adobe Scan, etc.)
    // store the high-res document page scans as embedded DCT/JPEG streams.
    // =========================================================================
    try {
      onProgress?.("⚡ Scanning PDF for embedded high-res page photos...");
      const text = new TextDecoder("latin1").decode(bytes);
      const regex = /\/Filter\s*(?:\[\s*)?\/DCTDecode[\s\S]*?stream\r?\n/gi;
      let match: RegExpExecArray | null;
      const extractedSlices: Uint8Array[] = [];

      while ((match = regex.exec(text)) !== null && extractedSlices.length < 2) {
        const streamStart = match.index + match[0].length;
        const endstreamIdx = text.indexOf("endstream", streamStart);
        if (endstreamIdx > streamStart) {
          let slice = bytes.subarray(streamStart, endstreamIdx);
          while (slice.length > 0 && (slice[slice.length - 1] === 10 || slice[slice.length - 1] === 13)) {
            slice = slice.subarray(0, slice.length - 1);
          }
          // Validate minimum size (>25KB) and JPEG SOI marker (0xFF, 0xD8)
          if (slice.length > 25 * 1024 && slice[0] === 0xFF && slice[1] === 0xD8) {
            extractedSlices.push(slice);
          }
        }
      }

      // Binary scan fallback if regex didn't catch object streams
      if (extractedSlices.length === 0) {
        let i = 0;
        const len = bytes.length;
        while (i < len - 3 && extractedSlices.length < 2) {
          if (bytes[i] === 0xFF && bytes[i + 1] === 0xD8 && bytes[i + 2] === 0xFF) {
            const start = i;
            i += 3;
            while (i < len - 1) {
              if (bytes[i] === 0xFF && bytes[i + 1] === 0xD9) {
                const end = i + 2;
                const slice = bytes.subarray(start, end);
                if (slice.length > 25 * 1024) {
                  extractedSlices.push(slice);
                }
                i = end;
                break;
              }
              i++;
            }
          } else {
            i++;
          }
        }
      }

      if (extractedSlices.length > 0) {
        console.log(`[Tier 1 PDF Scan] Found ${extractedSlices.length} embedded JPEG page(s) in PDF.`);
        const compressedPages: File[] = [];
        for (let idx = 0; idx < extractedSlices.length; idx++) {
          onProgress?.(`⚡ Processing Page ${idx + 1}...`);
          const rawSlice = extractedSlices[idx];
          const rawBlob = new Blob([rawSlice as BlobPart], { type: "image/jpeg" });
          const rawFile = new File([rawBlob], `${(file.name || "piq_page").replace(/\.[^/.]+$/, "")}_page_${idx + 1}.jpg`, {
            type: "image/jpeg",
            lastModified: Date.now()
          });
          const compressed = await compressImageClientSide(rawFile, 1600, 0.80);
          console.log(`[Tier 1 Page ${idx + 1}] Compressed from ${(rawFile.size / 1024).toFixed(0)} KB to ${(compressed.size / 1024).toFixed(0)} KB`);
          compressedPages.push(compressed);
        }
        return compressedPages;
      }
    } catch (tier1Err) {
      console.warn("[Tier 1 Scanned Extraction Fallback]:", tier1Err);
    }

    // =========================================================================
    // TIER 2: Legacy Canvas Rasterizer (for digitally generated/vector PDFs)
    // Uses pdfjs-dist legacy build with Promise.withResolvers polyfill for Safari iOS.
    // =========================================================================
    try {
      onProgress?.("⚡ Reading document pages...");

      // Safari iOS < 17.4 Polyfill
      const P = Promise as unknown as { withResolvers?: () => { promise: Promise<unknown>; resolve: unknown; reject: unknown } };
      if (typeof Promise !== "undefined" && !P.withResolvers) {
        P.withResolvers = function () {
          let resolve: unknown, reject: unknown;
          const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          });
          return { promise, resolve, reject };
        };
      }

      try {
        // @ts-expect-error global worker binding
        globalThis.pdfjsWorker = await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs");
      } catch (attachErr) {
        console.warn("[PDF Legacy Worker in-memory attach]:", attachErr);
      }

      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
      }

      onProgress?.("⚡ Preparing document pages...");
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        useSystemFonts: true,
        isEvalSupported: false,
      });

      const pdf = await loadingTask.promise;
      const numPages = Math.min(pdf.numPages, 2);
      const compressedImages: File[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        onProgress?.(`⚡ Processing Page ${pageNum} of ${numPages}...`);
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

          let blob: Blob | null = null;
          try {
            blob = await new Promise<Blob | null>((resolve) => {
              canvas.toBlob(resolve, "image/jpeg", 0.80);
            });
          } catch {
            // fallback
          }

          if (!blob) {
            const dataUrl = canvas.toDataURL("image/jpeg", 0.80);
            const byteString = atob(dataUrl.split(",")[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let j = 0; j < byteString.length; j++) {
              ia[j] = byteString.charCodeAt(j);
            }
            blob = new Blob([ab], { type: "image/jpeg" });
          }

          const cleanName = `${(file.name || "piq_doc").replace(/\.[^/.]+$/, "")}_page_${pageNum}.jpg`;
          const compressedFile = new File([blob], cleanName, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          console.log(
            `[Tier 2 Canvas] Page ${pageNum} converted: ${(compressedFile.size / 1024).toFixed(0)} KB (${canvas.width}x${canvas.height})`
          );
          compressedImages.push(compressedFile);
        }
      }

      if (compressedImages.length > 0) {
        return compressedImages;
      }
    } catch (tier2Err: unknown) {
      console.warn("[Tier 2 Canvas Rasterization Failed]:", tier2Err);
    }

    // =========================================================================
    // TIER 3: Direct Safe Transmission Fallback for Compact PDFs (<= 3.5 MB)
    // =========================================================================
    if (file.size <= 3.5 * 1024 * 1024) {
      console.log(`[Tier 3 Fallback] Transmitting ${file.name} (${(file.size / 1024).toFixed(0)} KB) directly as application/pdf`);
      return [file];
    }

    throw new Error(
      "Could not process this scanned PDF. Please upload standard JPG/PNG photos of Page 1 & Page 2."
    );
  };

  // 2. Real AI Analysis using Google Gemini API (/api/piq/analyze) with Client-Side Compression
  const analyzePiqWithGemini = async (files: File[]) => {
    if (!files || files.length === 0) return;
    setIsParsingPiq(true);
    setParseNotification(null);
    setParseError(null);
    setAssessment(null); // CRITICAL: Clear any stale/ghost assessment immediately
    setParseStatusMessage("⚡ Reading PIQ document...");

    try {
      const optimizedFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");

        if (isPdf) {
          const pdfImages = await convertPdfToCompressedImages(f, (msg) => setParseStatusMessage(msg));
          optimizedFiles.push(...pdfImages);
        } else {
          setParseStatusMessage(`⚡ Processing Page ${i + 1}...`);
          const compressed = await compressImageClientSide(f, 1600, 0.80);
          const origMb = (f.size / (1024 * 1024)).toFixed(1);
          const compKb = (compressed.size / 1024).toFixed(0);
          console.log(`[SSB Client Compression] Compressed ${f.name} from ${origMb} MB to ${compKb} KB`);
          optimizedFiles.push(compressed);
        }
      }

      const totalPayloadBytes = optimizedFiles.reduce((acc, file) => acc + file.size, 0);

      // Pre-flight check: Prevent Vercel 413 by rejecting payloads over 4.2 MB on the client
      if (totalPayloadBytes > 4.2 * 1024 * 1024) {
        throw new Error(
          "File size is too large. Please upload standard photos of Page 1 & Page 2."
        );
      }

      setParseStatusMessage("⚡ Senior Interviewing Officer AI evaluating dossier...");

      const dataPayload = new FormData();
      for (const f of optimizedFiles) {
        dataPayload.append("files", f);
      }

      setParseStatusMessage("⚡ Formulating OLQ scores & predicting interview questions...");

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

      // 1. Residence Auto-Resolution (Item 4):
      // If candidate wrote "Same as above", "Do", "-do-", or "as above" in 4(b) or 4(c),
      // replace it with the actual location data from 4(a) (or 4(b)).
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

      // 4(b) Present Residence resolution
      if (isSameAsAbove(ext.present_residence_place)) {
        ext.present_residence_place = ext.max_residence_place || "";
      }
      if (isSameAsAbove(ext.present_residence_district) || (!ext.present_residence_district && ext.present_residence_place === ext.max_residence_place)) {
        ext.present_residence_district = ext.max_residence_district || ext.present_residence_district || "";
      }
      if (isSameAsAbove(ext.present_residence_state) || (!ext.present_residence_state && ext.present_residence_place === ext.max_residence_place)) {
        ext.present_residence_state = ext.max_residence_state || ext.present_residence_state || "";
      }
      if (isSameAsAbove(ext.present_residence_population) || (!ext.present_residence_population && ext.present_residence_place === ext.max_residence_place)) {
        ext.present_residence_population = ext.max_residence_population || ext.present_residence_population || "";
      }

      // 4(c) Permanent Residence resolution
      const sourcePlace = (!isSameAsAbove(ext.present_residence_place) && ext.present_residence_place)
        ? ext.present_residence_place
        : ext.max_residence_place;
      const sourceDistrict = (!isSameAsAbove(ext.present_residence_district) && ext.present_residence_district)
        ? ext.present_residence_district
        : ext.max_residence_district;
      const sourceState = (!isSameAsAbove(ext.present_residence_state) && ext.present_residence_state)
        ? ext.present_residence_state
        : ext.max_residence_state;
      const sourcePop = (!isSameAsAbove(ext.present_residence_population) && ext.present_residence_population)
        ? ext.present_residence_population
        : ext.max_residence_population;

      if (isSameAsAbove(ext.perm_residence_place)) {
        ext.perm_residence_place = sourcePlace || "";
      }
      if (isSameAsAbove(ext.perm_residence_district) || (!ext.perm_residence_district && ext.perm_residence_place === sourcePlace)) {
        ext.perm_residence_district = sourceDistrict || ext.perm_residence_district || "";
      }
      if (isSameAsAbove(ext.perm_residence_state) || (!ext.perm_residence_state && ext.perm_residence_place === sourcePlace)) {
        ext.perm_residence_state = sourceState || ext.perm_residence_state || "";
      }
      if (isSameAsAbove(ext.perm_residence_population) || (!ext.perm_residence_population && ext.perm_residence_place === sourcePlace)) {
        ext.perm_residence_population = sourcePop || ext.perm_residence_population || "";
      }

      // 2. Family Details (Item 6): Normalize brother/sister to "Sibling"
      if (ext.family_members && Array.isArray(ext.family_members)) {
        ext.family_members = ext.family_members.map(member => {
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

      // Auto-reset baseline and update to the newly extracted details
      const freshFormData: PiqFormData = {
        ...INITIAL_PIQ_DATA,
        ...ext,
        dob: normalizeDobForInput(ext.dob) || "",
        family_members: ext.family_members && ext.family_members.length > 0 ? ext.family_members : [],
        education_records: ext.education_records && ext.education_records.length > 0 ? ext.education_records : DEFAULT_EDUCATION_RECORDS,
        sports_records: ext.sports_records && ext.sports_records.length > 0 ? ext.sports_records : [],
        ssb_attempts: ext.ssb_attempts && ext.ssb_attempts.length > 0 ? ext.ssb_attempts : [],
      };
      setFormData(freshFormData);

      if (json.assessment) {
        setAssessment(json.assessment);
        localStorage.setItem("ssb_candidate_piq_assessment", JSON.stringify(json.assessment));
      }
      localStorage.setItem("ssb_candidate_piq_data", JSON.stringify(freshFormData));

      let activeUserId = userId;
      if (!activeUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          activeUserId = user.id;
          setUserId(user.id);
        }
      }

      // Auto-persist directly to database so candidate never loses assessment
      if (activeUserId) {
        try {
          await supabase
            .from("profiles")
            .update({
              full_name: freshFormData.full_name,
              target_entry: freshFormData.target_entry,
              dob: freshFormData.dob ? normalizeDobForInput(freshFormData.dob) : null,
              profile_completion_pct: 100,
              piq_data: freshFormData,
              piq_assessment: json.assessment || null,
              last_piq_uploaded_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq("id", activeUserId);
        } catch (dbErr) {
          console.warn("[Auto-sync to Supabase profiles]:", dbErr);
          await supabase
            .from("profiles")
            .update({
              full_name: freshFormData.full_name,
              target_entry: freshFormData.target_entry,
              dob: freshFormData.dob ? normalizeDobForInput(freshFormData.dob) : null,
              profile_completion_pct: 100,
              updated_at: new Date().toISOString()
            })
            .eq("id", activeUserId);
        }
      }

      setIntakeModalOpen(false);
      setHasUploadedData(true);
      localStorage.setItem("ssb_candidate_piq_uploaded", "true");
      setCompletionPct(100);
      setParseNotification(
        "✨ Successfully extracted PIQ dossier, evaluated OLQ scores, and generated Interviewing Officer questions!"
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
      if (assessment) {
        localStorage.setItem("ssb_candidate_piq_assessment", JSON.stringify(assessment));
      }

      // If user is authenticated in Supabase, update profile row
      if (userId) {
        try {
          await supabase
            .from("profiles")
            .update({
              full_name: formData.full_name,
              target_entry: formData.target_entry,
              dob: formData.dob ? formData.dob : null,
              profile_completion_pct: 100,
              piq_data: formData,
              piq_assessment: assessment,
              updated_at: new Date().toISOString()
            })
            .eq("id", userId);
        } catch (dbErr) {
          console.warn("[Save profile to Supabase with piq_data/assessment]:", dbErr);
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

  // Real-Time Auto-Save on form updates (debounced by 800ms)
  useEffect(() => {
    if (!isInitialLoadedRef.current) return;
    if (!hasUploadedData) return;

    // Strict guard: Never auto-save empty/blank state to Supabase
    const hasMeaningfulData = Boolean(
      formData.full_name?.trim() ||
      formData.father_name?.trim() ||
      formData.max_residence_place?.trim() ||
      formData.present_residence_place?.trim() ||
      formData.perm_residence_place?.trim() ||
      (formData.education_records && formData.education_records.some(r => r.institution?.trim() || r.board_university?.trim())) ||
      (formData.family_members && formData.family_members.length > 0) ||
      (formData.sports_records && formData.sports_records.length > 0)
    );
    if (!hasMeaningfulData) return;

    setIsAutoSaving(true);
    const timer = setTimeout(async () => {
      try {
        localStorage.setItem("ssb_candidate_piq_data", JSON.stringify(formData));
        if (assessment) {
          localStorage.setItem("ssb_candidate_piq_assessment", JSON.stringify(assessment));
        }

        if (userId) {
          try {
            await supabase
              .from("profiles")
              .update({
                full_name: formData.full_name,
                target_entry: formData.target_entry,
                dob: formData.dob ? normalizeDobForInput(formData.dob) : null,
                profile_completion_pct: 100,
                piq_data: formData,
                piq_assessment: assessment,
                updated_at: new Date().toISOString()
              })
              .eq("id", userId);
          } catch (dbErr) {
            await supabase
              .from("profiles")
              .update({
                full_name: formData.full_name,
                target_entry: formData.target_entry,
                dob: formData.dob ? normalizeDobForInput(formData.dob) : null,
                profile_completion_pct: 100,
                updated_at: new Date().toISOString()
              })
              .eq("id", userId);
          }
        }
      } catch (err) {
        console.warn("[Auto-save]:", err);
      } finally {
        setIsAutoSaving(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [formData, assessment, userId, hasUploadedData]);

  // Render the Intake Section (Blank form download + AI scan)
  // Supports hero layout (compact = false) or compact sidebar layout (compact = true)
  const renderIntakeSection = (compact: boolean = false) => {
    return (
      <div className={compact ? "space-y-3" : "grid grid-cols-1 md:grid-cols-12 gap-4"}>
        {/* 1. Official Blank PIQ Card */}
        <div className={
          compact
            ? "p-3.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex items-center justify-between shadow-sm relative overflow-hidden group"
            : "md:col-span-5 p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-sm relative overflow-hidden group"
        }>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--gold-accent)]/5 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-[var(--gold-accent)] shrink-0" />
              <span className="text-xs font-bold tracking-wide">OFFICIAL BLANK PIQ</span>
            </div>
            <p className="text-[10px] text-[var(--fg-muted)] leading-relaxed mb-2 sm:mb-3">
              {compact ? "Standardized Armed Forces DIPR 107-A (Revised)" : "Download the standardized Armed Forces DIPR Questionnaire No. 107-A (Revised) PDF for physical practice and handwriting familiarity before your board."}
            </p>
          </div>

          <a
            href="/sample_piq.pdf"
            download="DIPR_Questionnaire_107A_Blank_PIQ.pdf"
            className={
              compact
                ? "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface-subtle)] hover:bg-[var(--canvas-surface)] text-[11px] font-bold text-[var(--fg-primary)] transition-all shadow-sm shrink-0"
                : "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface-subtle)] hover:bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-primary)] transition-all group-hover:border-[var(--gold-accent)]/70 shadow-sm"
            }
          >
            <Download className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
            <span>{compact ? "Download PDF" : "DOWNLOAD BLANK PIQ (PDF)"}</span>
          </a>
        </div>

        {/* 2. AI Smart Autofill / Re-Scan Card */}
        <div className={
          compact
            ? "p-4 rounded-xl border-2 border-dashed border-[var(--primary-accent)]/50 bg-[var(--canvas-surface)] flex flex-col justify-between relative overflow-hidden group shadow-sm space-y-3"
            : "md:col-span-7 p-4 rounded-xl border-2 border-dashed border-[var(--primary-accent)]/50 bg-[var(--canvas-surface)] flex flex-col justify-between relative overflow-hidden group shadow-sm"
        }>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-accent)]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--primary-accent)] animate-pulse" />
                <span className="text-xs font-bold text-[var(--primary-accent)] tracking-wider">
                  {compact ? "AI DOSSIER INSIGHTS" : "AI DOSSIER INSIGHTS & INTERVIEW QUESTIONS"}
                </span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] font-semibold border border-[var(--primary-accent)]/30">
                {compact ? "AUTO-RESET" : "OFFICER EVALUATION"}
              </span>
            </div>
            <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed mb-3">
              {compact
                ? "Upload your PIQ to autofill 14 sections, calculate your Officer Score, and predict Interviewing Officer questions."
                : "Upload your handwritten or printed PIQ scan. Senior Interviewing Officer (IO) AI will autofill all 14 dossier sections, calculate your Officer PIQ Score, and generate probable rapid-fire interview questions & red flags tailored specifically to your background."}
            </p>
          </div>

          {/* Mode Switcher Tabs - Full Width Grid */}
          <div className={`grid ${isMobile ? "grid-cols-3" : "grid-cols-2"} gap-1.5 p-1 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] w-full mb-3`}>
            <button
              type="button"
              onClick={() => setIntakeMode("pdf")}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                intakeMode === "pdf"
                  ? "bg-[var(--primary-accent)] text-white shadow-sm"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setIntakeMode("photos")}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                intakeMode === "photos"
                  ? "bg-[var(--primary-accent)] text-white shadow-sm"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]"
              }`}
            >
              <Images className="w-3.5 h-3.5" />
              <span>Image</span>
            </button>

            {isMobile && (
              <button
                type="button"
                onClick={() => setIntakeMode("camera")}
                className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  intakeMode === "camera"
                    ? "bg-[var(--primary-accent)] text-white shadow-sm"
                    : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]"
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Camera</span>
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
                className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-4 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)]/60 hover:bg-[var(--canvas-surface-subtle)] group"
              >
                {selectedPdf ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-full bg-[var(--military-olive)]/20 border border-[var(--military-olive)] flex items-center justify-center text-[var(--military-olive)]">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[var(--fg-primary)] truncate max-w-[200px]">{selectedPdf.name}</span>
                    <span className="text-[10px] text-[var(--fg-muted)]">
                      Click to change PDF
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/30 flex items-center justify-center text-[var(--primary-accent)] group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[var(--fg-primary)] block">
                        Drop PIQ PDF here, or click to browse
                      </span>
                      <span className="text-[10px] text-[var(--fg-muted)]">
                        Standard scanned DIPR 107-A (.pdf)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={!selectedPdf || isParsingPiq}
                onClick={() => selectedPdf && analyzePiqWithGemini([selectedPdf])}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isParsingPiq ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span className="truncate max-w-[240px]">{parseStatusMessage || "EVALUATING PIQ..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                    <span>{selectedPdf ? "ANALYZE PIQ & GENERATE INSIGHTS" : "SELECT PDF TO ANALYZE"}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* INTAKE MODE B: 2 DROP BOXES FOR PHOTOS */}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                  className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-3 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)]/60 hover:bg-[var(--canvas-surface-subtle)] relative overflow-hidden group min-h-[110px] flex flex-col items-center justify-center"
                >
                  <div className="text-[10px] font-bold text-[var(--gold-accent)] uppercase tracking-wider mb-1">
                    Page 1 (Front)
                  </div>
                  {photoP1Preview ? (
                    <div className="flex flex-col items-center gap-1 w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoP1Preview} alt="Page 1 preview" className="w-12 h-16 object-cover rounded border border-[var(--canvas-border)] shadow-sm" />
                      <span className="text-[10px] font-bold text-[var(--fg-primary)] truncate max-w-[120px]">{photoP1?.name}</span>
                      <span className="text-[9px] text-[var(--military-olive)] font-bold">✓ Ready</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <UploadCloud className="w-5 h-5 text-[var(--primary-accent)] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-[var(--fg-primary)]">Drop Page 1</span>
                      <span className="text-[9px] text-[var(--fg-muted)]">Personal info</span>
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
                  className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-3 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)]/60 hover:bg-[var(--canvas-surface-subtle)] relative overflow-hidden group min-h-[110px] flex flex-col items-center justify-center"
                >
                  <div className="text-[10px] font-bold text-[var(--primary-accent)] uppercase tracking-wider mb-1">
                    Page 2 (Back)
                  </div>
                  {photoP2Preview ? (
                    <div className="flex flex-col items-center gap-1 w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoP2Preview} alt="Page 2 preview" className="w-12 h-16 object-cover rounded border border-[var(--canvas-border)] shadow-sm" />
                      <span className="text-[10px] font-bold text-[var(--fg-primary)] truncate max-w-[120px]">{photoP2?.name}</span>
                      <span className="text-[9px] text-[var(--military-olive)] font-bold">✓ Ready</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <UploadCloud className="w-5 h-5 text-[var(--primary-accent)] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-[var(--fg-primary)]">Drop Page 2</span>
                      <span className="text-[9px] text-[var(--fg-muted)]">Sports & SSB</span>
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
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isParsingPiq ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span className="truncate max-w-[240px]">{parseStatusMessage || "EVALUATING PIQ..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                    <span>
                      {photoP1 && photoP2
                        ? "ANALYZE PIQ & GENERATE INSIGHTS"
                        : photoP1 || photoP2
                        ? "ANALYZE SELECTED PAGE"
                        : "SELECT PAGE 1 & 2 IMAGES"}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* INTAKE MODE C: CAMERA (MOBILE ONLY) */}
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

              <div className="grid grid-cols-2 gap-2.5">
                <div
                  onClick={() => cameraP1InputRef.current?.click()}
                  className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-2.5 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)] min-h-[105px] flex flex-col items-center justify-center"
                >
                  <span className="text-[9px] font-bold text-[var(--gold-accent)] uppercase block mb-1">
                    Page 1 (Front)
                  </span>
                  {photoP1Preview ? (
                    <div className="flex flex-col items-center gap-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoP1Preview} alt="P1" className="w-10 h-14 object-cover rounded border" />
                      <span className="text-[9px] text-[var(--military-olive)] font-bold">✓ Retake</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Camera className="w-5 h-5 text-[var(--primary-accent)]" />
                      <span className="text-[10px] font-bold">Snap P1</span>
                    </div>
                  )}
                </div>

                <div
                  onClick={() => cameraP2InputRef.current?.click()}
                  className="border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] rounded-xl p-2.5 text-center cursor-pointer transition-all bg-[var(--canvas-surface-subtle)] min-h-[105px] flex flex-col items-center justify-center"
                >
                  <span className="text-[9px] font-bold text-[var(--primary-accent)] uppercase block mb-1">
                    Page 2 (Back)
                  </span>
                  {photoP2Preview ? (
                    <div className="flex flex-col items-center gap-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoP2Preview} alt="P2" className="w-10 h-14 object-cover rounded border" />
                      <span className="text-[9px] text-[var(--military-olive)] font-bold">✓ Retake</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Camera className="w-5 h-5 text-[var(--primary-accent)]" />
                      <span className="text-[10px] font-bold">Snap P2</span>
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
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isParsingPiq ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span className="truncate max-w-[240px]">{parseStatusMessage || "EVALUATING PIQ..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                    <span>
                      {photoP1 && photoP2
                        ? "ANALYZE PIQ & GENERATE INSIGHTS"
                        : photoP1 || photoP2
                        ? "ANALYZE CAPTURED PAGE"
                        : "CAPTURE PAGE 1 & 2"}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Active Parsing Status Indicator */}
          {isParsingPiq && (
            <div className="pt-2 text-xs text-[var(--primary-accent)] flex items-center gap-2 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
              <span className="font-semibold text-xs truncate">
                {parseStatusMessage || "Senior Interviewing Officer AI evaluating PIQ dossier..."}
              </span>
            </div>
          )}

          {/* Success Alert */}
          {parseNotification && (
            <div className="p-2.5 rounded bg-[var(--military-olive)]/15 border border-[var(--military-olive)] text-[11px] text-[var(--fg-primary)] flex items-center gap-2 animate-in fade-in duration-200">
              <FileCheck className="w-4 h-4 text-[var(--military-olive)] shrink-0" />
              <span>{parseNotification}</span>
            </div>
          )}

          {/* Error Alert */}
          {parseError && (
            <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-[11px] text-red-500 flex items-center gap-2 animate-in fade-in duration-200">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render the AI Assessment Card (Score, 4 Pillars, Strengths, Vulnerabilities, Questions, Recommendations)
  const renderAssessmentCard = () => {
    if (!assessment) return null;

    return (
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
            className="flex items-center gap-1 text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--gold-accent)] px-2.5 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] cursor-pointer"
          >
            <span>{showAssessment ? "Collapse" : "Expand Analysis"}</span>
            {showAssessment ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showAssessment && (
          <div className="space-y-4">
            {/* Top Row: Score Badge + 4 Pillars (Full-Width Symmetrical Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* Score Big Display */}
              <div className="lg:col-span-3 p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] flex flex-col items-center justify-center text-center relative overflow-hidden">
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
              <div className="lg:col-span-9 p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-2.5 flex flex-col justify-between">
                <div className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider">
                  The 4 Classical Assessment Pillars
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Academics */}
                  <div className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-[var(--fg-secondary)]">Academics</span>
                        <span className="text-[var(--primary-accent)]">{assessment.score_breakdown.academics?.score ?? 0}/25</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-[var(--primary-accent)] transition-all duration-500" 
                          style={{ width: `${Math.min(100, Math.max(0, (((assessment.score_breakdown.academics?.score ?? 0) / 25) * 100)))}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-[9px] text-[var(--fg-muted)] leading-tight pt-1 line-clamp-3">
                      {assessment.score_breakdown.academics?.assessment}
                    </p>
                  </div>

                  {/* Sports & NCC */}
                  <div className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-[var(--fg-secondary)]">Sports & NCC</span>
                        <span className="text-[var(--gold-accent)]">{assessment.score_breakdown.sports_and_ncc?.score ?? 0}/25</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-[var(--gold-accent)] transition-all duration-500" 
                          style={{ width: `${Math.min(100, Math.max(0, (((assessment.score_breakdown.sports_and_ncc?.score ?? 0) / 25) * 100)))}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-[9px] text-[var(--fg-muted)] leading-tight pt-1 line-clamp-3">
                      {assessment.score_breakdown.sports_and_ncc?.assessment}
                    </p>
                  </div>

                  {/* Leadership */}
                  <div className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-[var(--fg-secondary)]">Leadership</span>
                        <span className="text-[var(--military-olive,#16a34a)]">{assessment.score_breakdown.leadership_and_responsibility?.score ?? 0}/25</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-[var(--military-olive,#16a34a)] transition-all duration-500" 
                          style={{ width: `${Math.min(100, Math.max(0, (((assessment.score_breakdown.leadership_and_responsibility?.score ?? 0) / 25) * 100)))}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-[9px] text-[var(--fg-muted)] leading-tight pt-1 line-clamp-3">
                      {assessment.score_breakdown.leadership_and_responsibility?.assessment}
                    </p>
                  </div>

                  {/* Hobbies & Depth */}
                  <div className="p-2.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-[var(--fg-secondary)]">Hobbies & Drive</span>
                        <span className="text-purple-400">{assessment.score_breakdown.hobbies_and_depth?.score ?? 0}/25</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-purple-500 transition-all duration-500" 
                          style={{ width: `${Math.min(100, Math.max(0, (((assessment.score_breakdown.hobbies_and_depth?.score ?? 0) / 25) * 100)))}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-[9px] text-[var(--fg-muted)] leading-tight pt-1 line-clamp-3">
                      {assessment.score_breakdown.hobbies_and_depth?.assessment}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Key Strengths & Vulnerabilities Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {/* Key Strengths */}
              <div className="p-4 sm:p-5 rounded-xl border border-[var(--military-olive)]/40 bg-[var(--military-olive)]/5 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--military-olive)] uppercase tracking-wider mb-2">
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
              </div>

              {/* Vulnerabilities & Red Flags */}
              <div className="p-4 sm:p-5 rounded-xl border border-amber-500/40 bg-amber-500/5 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
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
            </div>

            {/* Row 3: IO Rapid-Fire Questions & Tactical Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {/* Interviewing Officer (IO) Question Forecast */}
              <div className="p-4 sm:p-5 rounded-xl border border-[var(--primary-accent)]/40 bg-[var(--primary-accent)]/5 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary-accent)] uppercase tracking-wider">
                      <Zap className="w-4 h-4 text-[var(--gold-accent)]" />
                      <span>Predicted IO Rapid-Fire Questions</span>
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
              </div>

              {/* Tactical Recommendations */}
              <div className="p-4 sm:p-5 rounded-xl border border-[var(--gold-accent)]/40 bg-[var(--gold-accent)]/5 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider mb-2.5">
                    <Target className="w-4 h-4" />
                    <span>Tactical Recommendations For Interview</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[var(--fg-primary)]">
                    {assessment.recommendations_for_improvement.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[11px] leading-relaxed p-2.5 rounded-lg bg-[var(--canvas-surface)] border border-[var(--canvas-border)] shadow-sm">
                        <span className="text-[var(--gold-accent)] font-bold mt-0.5">&bull;</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the Section Tabs and Dossier Form (Sections 1-4)
  const renderDossierForm = () => (
    <div className="space-y-4">
        {/* SECTION NAVIGATION TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
          {[
            { id: "personal", label: "1. Identity & Demographics", icon: User },
            { id: "residence", label: "2. Residential History", icon: Home },
            { id: "family_edu", label: "3. Family & Academics", icon: GraduationCap },
            { id: "activities", label: "4. NCC, Sports & SSB", icon: Trophy },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  active
                    ? "bg-[var(--canvas-surface)] text-[var(--primary-accent)] shadow-sm border border-[var(--canvas-border)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{tab.label}</span>
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--canvas-border)] pb-2">
                  <div>
                    <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[var(--gold-accent)]" />
                      <span>SECTION 3B: EDUCATIONAL RECORD (ITEM 7 - COMMENCING FROM MATRICULATION)</span>
                    </h3>
                    <p className="text-[11px] text-[var(--fg-muted)] mt-0.5">
                      Qualification, institution, board/university, percentage, medium & outstanding achievements.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newRec: EducationRecord = {
                          qualification: "Post Graduation (M.Tech / M.Sc / MBA / M.A / etc.)",
                          institution: "",
                          board_university: "",
                          year: "",
                          div_marks_pct: "",
                          medium: "English",
                          boarder_dayscholar: "Day Scholar",
                          achievement: ""
                        };
                        updateField("education_records", [...formData.education_records, newRec]);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--primary-accent)]/15 border border-[var(--primary-accent)]/40 hover:bg-[var(--primary-accent)]/25 text-xs font-bold text-[var(--primary-accent)] transition-all cursor-pointer shadow-sm active:scale-95"
                      title="Add Post Graduation / Master's degree record"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Post Graduation</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const newRec: EducationRecord = {
                          qualification: "Additional Qualification",
                          institution: "",
                          board_university: "",
                          year: "",
                          div_marks_pct: "",
                          medium: "English",
                          boarder_dayscholar: "Day Scholar",
                          achievement: ""
                        };
                        updateField("education_records", [...formData.education_records, newRec]);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all cursor-pointer shadow-sm active:scale-95"
                      title="Add diploma or other qualification"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Qualification</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData.education_records.map((rec, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-2.5 relative group">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 max-w-md">
                          <label className="block text-[9px] text-[var(--fg-muted)] mb-0.5">Qualification / Examination *</label>
                          <input
                            type="text"
                            value={rec.qualification}
                            onChange={e => {
                              const list = [...formData.education_records];
                              list[idx].qualification = e.target.value;
                              updateField("education_records", list);
                            }}
                            placeholder="e.g. Matriculation / 10th, 10+2, Graduation, Post Graduation"
                            className="w-full px-2.5 py-1 rounded border border-[var(--canvas-border)] focus:border-[var(--primary-accent)] bg-[var(--canvas-bg)] text-xs font-bold text-[var(--primary-accent)]"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[var(--fg-muted)] font-normal hidden sm:inline">
                            Step {idx + 1} of {formData.education_records.length}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const list = formData.education_records.filter((_, i) => i !== idx);
                              updateField("education_records", list);
                            }}
                            className="p-1.5 rounded text-[var(--fg-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Remove Qualification"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                            placeholder="School / College Name"
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
                            placeholder="e.g. CBSE / State Board / VTU"
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
                            placeholder="e.g. 2021"
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
                            placeholder="e.g. 1st Div (82.4%)"
                            className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-[var(--fg-muted)] mb-0.5">Medium of Instruction</label>
                          <input
                            type="text"
                            value={rec.medium || "English"}
                            onChange={e => {
                              const list = [...formData.education_records];
                              list[idx].medium = e.target.value;
                              updateField("education_records", list);
                            }}
                            placeholder="e.g. English / Hindi"
                            className="w-full px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
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

                        <div className="sm:col-span-3">
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
                    </div>
                  ))}

                  {formData.education_records.length === 0 && (
                    <div className="p-6 rounded-lg border border-dashed border-[var(--canvas-border)] text-center space-y-2">
                      <p className="text-xs text-[var(--fg-muted)]">No educational records present.</p>
                      <button
                        type="button"
                        onClick={() => updateField("education_records", DEFAULT_EDUCATION_RECORDS)}
                        className="px-3 py-1.5 rounded-lg bg-[var(--primary-accent)] text-white text-xs font-bold cursor-pointer"
                      >
                        Restore Standard 10th, 12th & Graduation Rows
                      </button>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newRec: EducationRecord = {
                          qualification: "Post Graduation (M.Tech / M.Sc / MBA / M.A / etc.)",
                          institution: "",
                          board_university: "",
                          year: "",
                          div_marks_pct: "",
                          medium: "English",
                          boarder_dayscholar: "Day Scholar",
                          achievement: ""
                        };
                        updateField("education_records", [...formData.education_records, newRec]);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-[var(--primary-accent)]/50 hover:border-[var(--primary-accent)] bg-[var(--primary-accent)]/5 hover:bg-[var(--primary-accent)]/10 text-xs font-bold text-[var(--primary-accent)] transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Post Graduation / Master&apos;s</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const newRec: EducationRecord = {
                          qualification: "Additional Qualification",
                          institution: "",
                          board_university: "",
                          year: "",
                          div_marks_pct: "",
                          medium: "English",
                          boarder_dayscholar: "Day Scholar",
                          achievement: ""
                        };
                        updateField("education_records", [...formData.education_records, newRec]);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-[var(--canvas-border)] hover:border-[var(--canvas-border-hover)] bg-[var(--canvas-surface-subtle)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Another Qualification</span>
                    </button>
                  </div>
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
      </div>
    );

    return (
      <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
        
        {/* Floating Top HUD (Invisible Header Container with Floating Action Pills) */}
        <header className="sticky top-0 z-40 px-3 sm:px-6 py-3.5 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            
            {/* Left: Floating Navigation Pill */}
            <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/85 backdrop-blur-md shadow-sm">
              <Link
                href="/dashboard"
                className="w-7 h-7 rounded border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] flex items-center justify-center text-[var(--fg-secondary)] hover:text-[var(--primary-accent)] transition-colors cursor-pointer"
                title="Return to Dashboard"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
              <div className="w-6 h-6 rounded border border-[var(--primary-accent)]/60 bg-[var(--canvas-surface)] flex items-center justify-center">
                <CrossedSwords className="w-3.5 h-3.5 text-[var(--primary-accent)]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                    PIQ DOSSIER <span className="text-[var(--gold-accent)]">TERMINAL</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30 font-bold hidden md:inline-block">
                    DIPR 107-A
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Floating Actions Pill */}
            <div className="pointer-events-auto flex items-center gap-2">
              {/* Universal Intake / Re-Scan Trigger Button */}
              <button
                type="button"
                onClick={() => setIntakeModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--primary-accent)] bg-[var(--primary-accent)]/15 hover:bg-[var(--primary-accent)]/25 text-[var(--primary-accent)] text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer backdrop-blur-md group"
                title="Download Blank PIQ or Upload & Scan Form"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--gold-accent)] group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">
                  {hasUploadedData ? "Upload / Re-Scan PIQ" : "Upload & AI Autofill"}
                </span>
                <span className="sm:hidden text-[11px]">
                  {hasUploadedData ? "Re-Scan" : "Upload"}
                </span>
              </button>

              {/* Profile Completion Meter */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/85 backdrop-blur-md shadow-sm text-right">
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

              {/* Military Dual Theme Switcher */}
              <ThemeToggle compact />

              {/* Auto-Save Indicator */}
              {hasUploadedData && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/85 backdrop-blur-md text-xs font-mono shadow-sm">
                  {isAutoSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--primary-accent)]" />
                      <span className="text-[10px] text-[var(--primary-accent)] font-semibold hidden sm:inline">SAVING...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] text-emerald-500 font-semibold hidden sm:inline">AUTO-SAVED</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-2 pb-16 space-y-6">

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

          {/* If Candidate Has NOT Uploaded Yet: Sleek Full-Width Hero Callout */}
          {!hasUploadedData && (
            <div className="p-4 sm:p-5 rounded-xl border border-[var(--primary-accent)]/40 bg-[var(--canvas-surface)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/30 flex items-center justify-center shrink-0 text-[var(--primary-accent)]">
                  <Sparkles className="w-5 h-5 text-[var(--gold-accent)]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[var(--fg-primary)] flex items-center gap-2">
                    <span>Autofill your PIQ with AI in 10 seconds</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] border border-[var(--gold-accent)]/30 font-bold uppercase">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--fg-muted)] mt-0.5">
                    Upload your handwritten or typed DIPR Form 107-A scan (PDF or Images). AI will extract all 14 sections and evaluate your Officer PIQ score.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
                <a
                  href="/sample_piq.pdf"
                  download="DIPR_Questionnaire_107A_Blank_PIQ.pdf"
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface-subtle)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                  <span>Blank PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIntakeModalOpen(true)}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload & Scan PIQ</span>
                </button>
              </div>
            </div>
          )}

          {/* FULL-WIDTH UNIFORM DOSSIER LAYOUT (NO MORPH, NO SIDEBAR) */}
          <div className="w-full space-y-6">
            {/* 1. TOP: PIQ Assessment & Officer Readiness Radar (Full Width) */}
            {assessment && renderAssessmentCard()}

            {/* 2. Extracted Questionnaire Details (Sections 1-4) (Full Width) */}
            <div className="space-y-4">
              <div className="border-b border-[var(--canvas-border)] pb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider">
                  Extracted PIQ Dossier Details (DIPR Form 107-A)
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Auto-saved
                  </span>
                  <button
                    type="button"
                    onClick={() => setIntakeModalOpen(true)}
                    className="text-[10px] font-bold text-[var(--primary-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Re-Scan PIQ</span>
                  </button>
                </div>
              </div>
              {renderDossierForm()}
            </div>
          </div>

          {/* BOTTOM ACTION BAR (Shown after upload / when candidate data is present) */}
          {hasUploadedData && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-sm">
              <div className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Cadet Profile: <strong className="text-[var(--fg-primary)] font-bold">{formData.full_name || "CADET ASPIRANT"}</strong> ({formData.target_entry}) • DOB: <span className="text-[var(--fg-primary)] font-bold">{formData.dob || "—"}</span> • Completion: <span className="text-[var(--gold-accent)] font-bold">{completionPct}%</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>All changes auto-saved</span>
                </div>

                <Link
                  href="/dashboard"
                  className="flex-1 sm:flex-initial text-center px-4 py-2 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* UNIVERSAL INTAKE & RE-SCAN MODAL CARD (DESKTOP & MOBILE) */}
          <AnimatePresence>
            {intakeModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
                <div
                  className="fixed inset-0"
                  onClick={() => setIntakeModalOpen(false)}
                />
                <div
                  className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--canvas-surface)] border-2 border-[var(--primary-accent)]/50 rounded-2xl shadow-2xl p-4 sm:p-6 font-mono space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--canvas-border)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg border border-[var(--primary-accent)]/50 bg-[var(--primary-accent)]/10 flex items-center justify-center text-[var(--primary-accent)]">
                        <Sparkles className="w-4 h-4 text-[var(--gold-accent)]" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-extrabold tracking-wider">
                          PIQ DOSSIER INTAKE, AI OLQ INSIGHTS & INTERVIEW FORECAST
                        </h3>
                        <p className="text-[10px] text-[var(--fg-muted)]">
                          Autofill your 14 dossier sections, calculate Officer PIQ Score, and unlock predicted SSB interview questions
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIntakeModalOpen(false)}
                      className="p-1.5 rounded-lg border border-[var(--canvas-border)] hover:border-red-500 text-[var(--fg-muted)] hover:text-red-500 transition-colors cursor-pointer"
                      title="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* The 2 Intake Cards */}
                  {renderIntakeSection(false)}
                </div>
              </div>
            )}
          </AnimatePresence>

        </main>
      </div>
    );
}
