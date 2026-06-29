"use client";

import { Module } from "@/data/curriculum";
import { gradeOptions } from "@/lib/grades";

interface Props {
  module: Module;
  grade: string;
  onChange: (code: string, grade: string) => void;
  whatIfMode: boolean;
  whatIfGrade: string;
  onWhatIfChange: (code: string, grade: string) => void;
}

const gradeColors: Record<string, string> = {
  "A+": "text-teal-700 dark:text-teal-300",
  "A":  "text-teal-700 dark:text-teal-300",
  "A-": "text-teal-600 dark:text-teal-400",
  "B+": "text-indigo-700 dark:text-indigo-300",
  "B":  "text-indigo-700 dark:text-indigo-300",
  "B-": "text-indigo-600 dark:text-indigo-400",
  "C+": "text-amber-700 dark:text-amber-300",
  "C":  "text-amber-700 dark:text-amber-300",
  "C-": "text-amber-600 dark:text-amber-400",
  "D+": "text-rose-600 dark:text-rose-400",
  "D":  "text-rose-600 dark:text-rose-400",
  "E":  "text-rose-800 dark:text-rose-500",
};

export default function ModuleRow({
  module,
  grade,
  onChange,
  whatIfMode,
  whatIfGrade,
  onWhatIfChange,
}: Props) {
  const activeGrade = whatIfMode ? whatIfGrade || grade : grade;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b border-black/5 dark:border-white/5 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-black/8 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded shrink-0">
            {module.code}
          </span>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
            {module.name}
          </span>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 block">
          {module.credits} credits
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {whatIfMode && (
          <select
            value={whatIfGrade}
            onChange={(e) => onWhatIfChange(module.code, e.target.value)}
            className="text-sm border border-violet-300 dark:border-violet-600 rounded-lg px-2 py-1.5 bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
            title="What-if grade"
          >
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {g === "" ? "What-if?" : g}
              </option>
            ))}
          </select>
        )}

        <select
          value={grade}
          onChange={(e) => onChange(module.code, e.target.value)}
          className={`text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer transition-colors
            ${
              grade
                ? `border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-semibold ${gradeColors[grade] ?? "text-slate-800 dark:text-slate-200"}`
                : "border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500"
            }`}
        >
          {gradeOptions.map((g) => (
            <option key={g} value={g}>
              {g === "" ? "— Not graded —" : g}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
