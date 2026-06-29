"use client";

import { WGPAResult } from "@/lib/calculations";

interface Props {
  cgpa: number | null;
  wgpa: WGPAResult;
  totalModules: number;
  gradedModules: number;
  whatIfMode: boolean;
  whatIfCgpa: number | null;
  whatIfWgpa: WGPAResult;
}

function GPABadge({ value }: { value: number | null }) {
  if (value === null) return <span className="text-gray-400 dark:text-gray-500 text-3xl font-bold">—</span>;

  const color =
    value >= 3.7
      ? "text-emerald-500"
      : value >= 3.0
      ? "text-blue-500"
      : value >= 2.0
      ? "text-yellow-500"
      : "text-red-500";

  return <span className={`text-3xl font-bold ${color}`}>{value.toFixed(2)}</span>;
}

export default function SummaryBar({
  cgpa,
  wgpa,
  totalModules,
  gradedModules,
  whatIfMode,
  whatIfCgpa,
  whatIfWgpa,
}: Props) {
  const displayCgpa = whatIfMode && whatIfCgpa !== null ? whatIfCgpa : cgpa;
  const displayWgpa = whatIfMode && whatIfWgpa.value !== null ? whatIfWgpa : wgpa;

  return (
    <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-between">

        {/* CGPA */}
        <div className="flex flex-col items-center min-w-[100px]">
          <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-0.5">
            {whatIfMode ? "Projected CGPA" : "CGPA"}
          </span>
          <GPABadge value={displayCgpa} />
          {whatIfMode && cgpa !== null && cgpa !== displayCgpa && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              was {cgpa.toFixed(2)}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

        {/* WGPA */}
        <div className="flex flex-col items-center min-w-[120px]">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
              {whatIfMode ? "Projected WGPA" : "WGPA"}
            </span>
            {displayWgpa.incomplete && (
              <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full px-1.5 py-0.5 font-medium">
                incomplete
              </span>
            )}
          </div>
          <GPABadge value={displayWgpa.value} />
          {whatIfMode && wgpa.value !== null && wgpa.value !== displayWgpa.value && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              was {wgpa.value.toFixed(2)}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

        {/* Progress */}
        <div className="flex flex-col items-center min-w-[90px]">
          <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-0.5">
            Progress
          </span>
          <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">
            {gradedModules}
            <span className="text-base text-gray-400 dark:text-gray-500">/{totalModules}</span>
          </span>
          <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${(gradedModules / totalModules) * 100}%` }}
            />
          </div>
        </div>

        {/* WGPA weight legend */}
        <div className="hidden lg:flex flex-col gap-0.5 text-xs text-gray-400 dark:text-gray-500">
          <span className="font-semibold text-gray-500 dark:text-gray-400">WGPA weights</span>
          <span>Y1 — excluded</span>
          <span>Y2 — 20%</span>
          <span>Y3 — 30%</span>
          <span>Y4 — 50%</span>
        </div>
      </div>
    </div>
  );
}
