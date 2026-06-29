"use client";

import { useState } from "react";
import { SemesterData } from "@/data/curriculum";
import { gradePoints } from "@/lib/grades";
import ModuleRow from "./ModuleRow";

interface Props {
  semesterData: SemesterData;
  grades: Record<string, string>;
  onChange: (code: string, grade: string) => void;
  whatIfMode: boolean;
  whatIfGrades: Record<string, string>;
  onWhatIfChange: (code: string, grade: string) => void;
  defaultOpen?: boolean;
}

export default function SemesterSection({
  semesterData,
  grades,
  onChange,
  whatIfMode,
  whatIfGrades,
  onWhatIfChange,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const { year, semester, modules } = semesterData;
  const totalCredits = modules.reduce((s, m) => s + m.credits, 0);

  const gradedModules = modules.filter(
    (m) => grades[m.code] && grades[m.code] in gradePoints
  );
  const gradedCredits = gradedModules.reduce((s, m) => s + m.credits, 0);

  // Semester GPA
  let semGPA: number | null = null;
  if (gradedModules.length > 0) {
    const pts = gradedModules.reduce(
      (s, m) => s + gradePoints[grades[m.code]] * m.credits,
      0
    );
    semGPA = pts / gradedCredits;
  }

  const yearLabel = `Year ${year}`;
  const semLabel = `Semester ${semester}`;

  const yearStyles: Record<number, { header: string; text: string; body: string; border: string }> = {
    1: {
      header: "from-teal-300 to-teal-400 dark:from-teal-700 dark:to-teal-800",
      text: "text-teal-950 dark:text-teal-100",
      body: "bg-teal-50 dark:bg-[#162320]",
      border: "border-teal-200 dark:border-teal-800",
    },
    2: {
      header: "from-sky-300 to-sky-400 dark:from-sky-700 dark:to-sky-800",
      text: "text-sky-950 dark:text-sky-100",
      body: "bg-sky-50 dark:bg-[#131d26]",
      border: "border-sky-200 dark:border-sky-800",
    },
    3: {
      header: "from-violet-300 to-violet-400 dark:from-violet-700 dark:to-violet-800",
      text: "text-violet-950 dark:text-violet-100",
      body: "bg-violet-50 dark:bg-[#1a1628]",
      border: "border-violet-200 dark:border-violet-800",
    },
    4: {
      header: "from-rose-300 to-rose-400 dark:from-rose-700 dark:to-rose-800",
      text: "text-rose-950 dark:text-rose-100",
      body: "bg-rose-50 dark:bg-[#251620]",
      border: "border-rose-200 dark:border-rose-800",
    },
  };

  const s = yearStyles[year];

  return (
    <div className={`rounded-2xl border ${s.border} overflow-hidden shadow-sm`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r ${s.header} ${s.text}`}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-base">
            {yearLabel} · {semLabel}
          </span>
          <span className="text-xs bg-black/10 dark:bg-white/10 rounded-full px-2 py-0.5">
            {gradedModules.length}/{modules.length} graded · {gradedCredits}/{totalCredits} cr
          </span>
        </div>
        <div className="flex items-center gap-3">
          {semGPA !== null && (
            <span className="text-sm font-semibold bg-black/10 dark:bg-white/10 rounded-lg px-2.5 py-1">
              GPA {semGPA.toFixed(2)}
            </span>
          )}
          <svg
            className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {open && (
        <div className={`px-5 pb-2 ${s.body}`}>
          {modules.map((mod) => (
            <ModuleRow
              key={mod.code}
              module={mod}
              grade={grades[mod.code] ?? ""}
              onChange={onChange}
              whatIfMode={whatIfMode}
              whatIfGrade={whatIfGrades[mod.code] ?? ""}
              onWhatIfChange={onWhatIfChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
