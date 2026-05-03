export function ageInYears(dob: Date | string): number {
  const birth = new Date(dob as string);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

// Returns "Xy Ym", "Xy", or "Ym" string for display.
export function formatAge(dob: Date | string): string {
  const birth = new Date(dob as string);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  if (months < 0) { years--; months += 12; }
  if (today.getDate() < birth.getDate()) {
    months--;
    if (months < 0) { years--; months += 12; }
  }
  if (years > 0 && months > 0) return `${years}y ${months}m`;
  if (years > 0) return `${years}y`;
  return `${months}m`;
}

export function matchesAgeGroup(ageGroup: [number, number], age: number): boolean {
  return age >= ageGroup[0] && age <= ageGroup[1];
}
