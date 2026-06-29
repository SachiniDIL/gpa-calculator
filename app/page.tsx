"use client";

import { useState, useEffect, useCallback } from "react";
import { curriculum } from "@/data/curriculum";
import { calculateCGPA, calculateWGPA } from "@/lib/calculations";
import SemesterSection from "@/components/SemesterSection";
import SummaryBar from "@/components/SummaryBar";

const STORAGE_KEY = "gpa-calculator-grades";

function loadGrades(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export default function Home() {
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [whatIfMode, setWhatIfMode] = useState(false);
  const [whatIfGrades, setWhatIfGrades] = useState<Record<string, string>>({});
  const [darkMode, setDarkMode] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setGrades(loadGrades());
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    setMounted(true);
  }, []);

  const handleGradeChange = useCallback((code: string, grade: string) => {
    setGrades((prev) => {
      const next = { ...prev, [code]: grade };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const handleWhatIfChange = useCallback((code: string, grade: string) => {
    setWhatIfGrades((prev) => ({ ...prev, [code]: grade }));
  }, []);

  const handleReset = () => {
    setGrades({});
    setWhatIfGrades({});
    localStorage.removeItem(STORAGE_KEY);
    setShowResetConfirm(false);
  };

  const mergedGrades = whatIfMode
    ? {
        ...grades,
        ...Object.fromEntries(
          Object.entries(whatIfGrades).filter(([, v]) => v !== "")
        ),
      }
    : grades;

  const cgpa = calculateCGPA(grades, curriculum);
  const wgpa = calculateWGPA(grades, curriculum);
  const whatIfCgpa = whatIfMode ? calculateCGPA(mergedGrades, curriculum) : null;
  const whatIfWgpa = whatIfMode
    ? calculateWGPA(mergedGrades, curriculum)
    : { value: null, incomplete: false };

  const allModules = curriculum.flatMap((s) => s.modules);
  const totalModules = allModules.length;
  const gradedModules = allModules.filter((m) => grades[m.code] && grades[m.code] !== "").length;

  if (!mounted) return null;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#f0ebf8] dark:bg-[#1a1628] transition-colors">
        <SummaryBar
          cgpa={cgpa}
          wgpa={wgpa}
          totalModules={totalModules}
          gradedModules={gradedModules}
          whatIfMode={whatIfMode}
          whatIfCgpa={whatIfCgpa}
          whatIfWgpa={whatIfWgpa}
        />

        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-violet-950 dark:text-violet-100">
                GPA Calculator
              </h1>
              <p className="text-sm text-violet-500 dark:text-violet-400 mt-1">
                4-year BSc (Hons) IT / Software Engineering
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setDarkMode((d) => !d)}
                className="p-2 rounded-lg text-violet-500 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-900/40 transition-colors"
                title="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => {
                  setWhatIfMode((v) => !v);
                  if (whatIfMode) setWhatIfGrades({});
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  whatIfMode
                    ? "bg-violet-500 text-white dark:bg-violet-600"
                    : "bg-violet-200 dark:bg-violet-900/50 text-violet-800 dark:text-violet-300 hover:bg-violet-300 dark:hover:bg-violet-800/60"
                }`}
              >
                {whatIfMode ? "Exit What-if" : "What-if Mode"}
              </button>

              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/40 transition-colors"
                >
                  Reset All
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-violet-500 dark:text-violet-400">Sure?</span>
                  <button
                    onClick={handleReset}
                    className="px-2 py-1 rounded text-xs font-medium bg-rose-500 text-white hover:bg-rose-600"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-2 py-1 rounded text-xs font-medium bg-violet-200 dark:bg-violet-900/50 text-violet-800 dark:text-violet-300"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>

          {whatIfMode && (
            <div className="mb-6 p-3 rounded-xl bg-violet-100 dark:bg-violet-900/20 border border-violet-300 dark:border-violet-800 text-sm text-violet-800 dark:text-violet-300 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                <strong>What-if Mode:</strong> Use the purple dropdowns to try hypothetical grades. Your saved grades are not affected.
              </span>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {curriculum.map((sem) => (
              <SemesterSection
                key={`${sem.year}-${sem.semester}`}
                semesterData={sem}
                grades={grades}
                onChange={handleGradeChange}
                whatIfMode={whatIfMode}
                whatIfGrades={whatIfGrades}
                onWhatIfChange={handleWhatIfChange}
                defaultOpen={sem.year === 1 && sem.semester === 1}
              />
            ))}
          </div>

          <p className="text-center text-xs text-violet-400 dark:text-violet-600 mt-10">
            Grades saved locally in your browser · WGPA: Y2×20% + Y3×30% + Y4×50%
          </p>
        </main>
      </div>
    </div>
  );
}
