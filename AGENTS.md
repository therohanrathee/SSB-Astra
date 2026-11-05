# AGENTS.md — Agent Instruction & Operational Protocol

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS & DEVELOPERS:**  
> Before writing code or making architectural modifications, **you must read and analyze `WHITEPAPER.md`**.  
> The `WHITEPAPER.md` file is the **single source of truth** containing the project vision, ground-truth DIPR exam constraints, active roadmap, design system, and technical architecture.

---

## 1. Mandatory Workflow for Any Agent / Developer

1. **Read & Analyze the Whitepaper:**
   - Open [`WHITEPAPER.md`](./WHITEPAPER.md) to understand the current progress, completed phases, active branch/component structure, and technical constraints.
2. **Execute Assigned Task:**
   - Write clean, modular, and accessible TypeScript/React code complying with the military dual-theme design system (Air Force Blue Light / Olive Army Dark).
3. **Update the Whitepaper:**
   - **Immediately after completing any feature, schema update, or phase, you MUST update `WHITEPAPER.md`** with:
     - The phase progress checklist.
     - Any new component or library additions.
     - State management, schema, or API route modifications.
     - Explicit instructions for the next agent on where to pick up.

---

## 2. Quick Reference & Pointers

* **Product Name:** SSB ASTRA (Comprehensive Armed Forces Officer Preparation Suite)
* **Branding:** Indian Army-inspired crossed swords emblem with dual Tri-Services military theme.
* **Master Whitepaper:** [`WHITEPAPER.md`](./WHITEPAPER.md) *(Always keep this updated!)*
* **Original Research Blueprint:** [`ssb_screening_app_blueprint.md`](file:///Users/rohan/.gemini/antigravity/brain/71d0b6d2-20ea-47e8-9703-7c3fbacee15e/ssb_screening_app_blueprint.md)
* **Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, Web Audio API, Supabase.
* **Current Phase Status:** Phase 2 Complete (Smart Auth, Resend OTP, Fast Onboarding & Dossier Completion Bar). Ready for Phase 3 (Interactive Test Modules & Question Engines).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
