/**
 * Helper to generate dynamic, military-inspired dashboard greetings based on:
 * 1. Time of day (Morning / Afternoon / Evening)
 * 2. Candidate Name or honorific title
 * 3. Future-proof gender handling ('male' -> 'Gentleman', 'female' -> 'Lady', undefined -> neutral titles)
 */
export function getDynamicOfficerGreeting(fullName?: string, gender?: "male" | "female" | string | null): string {
  // 1. Determine Time of Day
  const hour = new Date().getHours();
  let timeSalutation = "Good Morning";
  if (hour >= 12 && hour < 17) {
    timeSalutation = "Good Afternoon";
  } else if (hour >= 17 || hour < 4) {
    timeSalutation = "Good Evening";
  }

  // 2. Candidate First Name
  const firstName = fullName?.trim() ? fullName.trim().split(" ")[0] : null;

  // 3. Assemble pool of titles
  const pool: string[] = [];

  // Always available title variants
  if (firstName) {
    pool.push(firstName);
  }
  pool.push("Future Officer");
  pool.push("Officer Aspirant");
  pool.push("Cadet");

  // Gender-specific titles (only unlocked if gender is populated in PIQ)
  if (gender) {
    const g = gender.toLowerCase();
    if (g === "male" || g === "m") {
      pool.push("Gentleman");
    } else if (g === "female" || g === "f") {
      pool.push("Lady");
    }
  }

  // 4. Randomly pick one title from the eligible pool
  const chosenTitle = pool[Math.floor(Math.random() * pool.length)];

  return `${timeSalutation}, ${chosenTitle}`;
}
