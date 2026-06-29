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
  "A+": "text-emerald-600 dark:text-emerald-400",
  "A": "text-emerald-600 dark:text-emerald-400",
  "A-": "text-green-600 dark:text-green-400",
  "B+": "text-blue-600 dark:text-blue-400",
  "B": "text-blue-600 dark:text-blue-400",
  "B-": "text-blue-500 dark:text-blue-300",
  "C+": "text-yellow-600 dark:text-yellow-400",
  "C": "text-yellow-600 dark:text-yellow-400",
  "C-": "text-orange-500 dark:text-orange-400",
  "D+": "text-red-500 dark:text-red-400",
  "D": "text-red-500 dark:text-red-400",
  "E": "text-red-700 dark:text-red-500",
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
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded shrink-0">
            {module.code}
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
            {module.name}
          </span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 block">
          {module.credits} credits
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {whatIfMode && (
          <select
            value={whatIfGrade}
            onChange={(e) => onWhatIfChange(module.code, e.target.value)}
            className="text-sm border border-purple-300 dark:border-purple-600 rounded-lg px-2 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
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
          className={`text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition-colors
            ${
              grade
                ? `border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-semibold ${gradeColors[grade] ?? "text-gray-800 dark:text-gray-200"}`
                : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-400 dark:text-gray-500"
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
