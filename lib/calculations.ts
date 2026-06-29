import { SemesterData } from "@/data/curriculum";
import { gradePoints } from "@/lib/grades";

export function calculateCGPA(
  grades: Record<string, string>,
  curriculum: SemesterData[]
): number | null {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const sem of curriculum) {
    for (const mod of sem.modules) {
      const grade = grades[mod.code];
      if (grade && grade in gradePoints) {
        totalPoints += gradePoints[grade] * mod.credits;
        totalCredits += mod.credits;
      }
    }
  }

  return totalCredits === 0 ? null : totalPoints / totalCredits;
}

export function calculateYearGPA(
  year: number,
  grades: Record<string, string>,
  curriculum: SemesterData[]
): number | null {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const sem of curriculum) {
    if (sem.year !== year) continue;
    for (const mod of sem.modules) {
      const grade = grades[mod.code];
      if (grade && grade in gradePoints) {
        totalPoints += gradePoints[grade] * mod.credits;
        totalCredits += mod.credits;
      }
    }
  }

  return totalCredits === 0 ? null : totalPoints / totalCredits;
}

export interface WGPAResult {
  value: number | null;
  incomplete: boolean;
}

export function calculateWGPA(
  grades: Record<string, string>,
  curriculum: SemesterData[]
): WGPAResult {
  const weights: Record<number, number> = { 2: 0.2, 3: 0.3, 4: 0.5 };
  let total = 0;
  let incomplete = false;

  for (const [yearStr, weight] of Object.entries(weights)) {
    const year = Number(yearStr);
    const gpa = calculateYearGPA(year, grades, curriculum);
    if (gpa === null) {
      incomplete = true;
    } else {
      total += gpa * weight;
    }
  }

  // If all three years are ungraded, return null
  const anyGraded = [2, 3, 4].some(
    (y) => calculateYearGPA(y, grades, curriculum) !== null
  );

  return {
    value: anyGraded ? total : null,
    incomplete,
  };
}
