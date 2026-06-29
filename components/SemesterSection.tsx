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

  const yearColors: Record<number, string> = {
    1: "from-slate-500 to-slate-600",
    2: "from-blue-500 to-blue-600",
    3: "from-violet-500 to-violet-600",
    4: "from-rose-500 to-rose-600",
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r ${yearColors[year]} text-white`}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-base">
            {yearLabel} · {semLabel}
          </span>
          <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">
            {gradedModules.length}/{modules.length} graded · {gradedCredits}/{totalCredits} cr
          </span>
        </div>
        <div className="flex items-center gap-3">
          {semGPA !== null && (
            <span className="text-sm font-semibold bg-white/20 rounded-lg px-2.5 py-1">
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
        <div className="px-5 pb-2 bg-white dark:bg-gray-800">
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
