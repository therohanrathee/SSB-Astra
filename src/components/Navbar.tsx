"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Terminal, Award, HelpCircle, LayoutDashboard, UserCheck } from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial check for theme
    const isDocDark = document.documentElement.classList.contains("dark");
    setIsDark(isDocDark);

    // Check user auth state
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkUser();

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("ssb-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("ssb-theme", "dark");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[var(--canvas-bg)]/85 backdrop-blur-md border-[var(--canvas-border)] shadow-md"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
        {/* Brand Logo & Military Call-sign */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-md border border-[var(--primary-accent)]/60 bg-[var(--canvas-surface)] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shadow-sm">
            <div className="absolute inset-0 radar-sweep opacity-20 pointer-events-none" />
            <CrossedSwords className="w-5 h-5 text-[var(--primary-accent)] relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm tracking-wider text-[var(--fg-primary)] font-extrabold">
                SSB<span className="text-[var(--gold-accent)] font-semibold">ASTRA</span>
              </span>
            </div>
            <div className="text-[10px] font-mono text-[var(--fg-muted)] tracking-tight leading-none uppercase">
              Officer Intelligence Suite
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a
            href="#journey"
            className="text-[var(--fg-secondary)] hover:text-[var(--primary-accent)] transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-4 h-4" />
            <span>Process Roadmap</span>
          </a>
          <a
            href="#comparison"
            className="text-[var(--fg-secondary)] hover:text-[var(--primary-accent)] transition-colors"
          >
            Old PPDT vs New System
          </a>
          <a
            href="#subtests"
            className="text-[var(--fg-secondary)] hover:text-[var(--primary-accent)] transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>CSSS & OPAM Tests</span>
          </a>
          <a
            href="#faq"
            className="text-[var(--fg-secondary)] hover:text-[var(--primary-accent)] transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQs</span>
          </a>
        </nav>

        {/* Right Action: Military Theme Switcher & Launch Button */}
        <div className="flex items-center gap-3">
          {/* Dual Military Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-[var(--primary-accent)] text-[var(--fg-primary)] transition-colors relative group"
            title={
              isDark
                ? "Current: Army Camo Olive (Dark). Switch to Air Force Blue (Light)"
                : "Current: Air Force Sky Blue (Light). Switch to Army Camo Olive (Dark)"
            }
          >
            {isDark ? (
              <div className="flex items-center gap-1.5 text-xs font-mono text-lime-400">
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">Army Olive</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-mono text-sky-600">
                <Sun className="w-4 h-4" />
                <span className="hidden sm:inline">Air Force Sky</span>
              </div>
            )}
          </button>

          {/* Conditional Auth CTA: Dashboard if logged in, otherwise Login/Signup */}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 justify-center px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider text-white transition-all bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] shadow-sm hover:shadow-[0_0_15px_var(--primary-glow)] active:scale-95"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider text-white transition-all bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] shadow-sm hover:shadow-[0_0_15px_var(--primary-glow)] active:scale-95"
            >
              <span>Login / Signup</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
