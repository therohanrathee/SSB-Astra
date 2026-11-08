"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ssb-theme");
    if (saved) {
      const dark = saved === "dark";
      setIsDark(dark);
      document.documentElement.classList.toggle("dark", dark);
    } else {
      const isDocDark = document.documentElement.classList.contains("dark");
      setIsDark(isDocDark);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("ssb-theme", nextDark ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/70 ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/80 hover:border-[var(--primary-accent)] text-[var(--fg-primary)] transition-all backdrop-blur-md shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-mono ${className}`}
      title={
        isDark
          ? "Current: Army Camo Olive (Dark). Switch to Air Force Blue (Light)"
          : "Current: Air Force Sky Blue (Light). Switch to Army Camo Olive (Dark)"
      }
    >
      {isDark ? (
        <>
          <Moon className="w-4 h-4 text-lime-400 shrink-0" />
          {!compact && <span className="hidden sm:inline text-lime-400 font-bold">Army Olive</span>}
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-sky-600 shrink-0" />
          {!compact && <span className="hidden sm:inline text-sky-600 font-bold">Air Force Sky</span>}
        </>
      )}
    </button>
  );
}
