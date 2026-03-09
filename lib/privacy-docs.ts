import fs from "fs";
import path from "path";

/**
 * Maps project slugs to their privacy policy markdown file path (under public/).
 * Add an entry here when an app has its own policy (e.g. Shake It).
 */
export const privacyDocBySlug: Record<string, string> = {
  "cocktail-app": "docs/privacy_policy.md",
};

export function getPrivacyDocPath(appSlug: string): string | null {
  const rel = privacyDocBySlug[appSlug];
  if (!rel) return null;
  return path.join(process.cwd(), "public", rel);
}

export function getPrivacyContentForLocale(
  appSlug: string,
  locale: "fr" | "en"
): string | null {
  const filePath = getPrivacyDocPath(appSlug);
  if (!filePath || !fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");

  if (locale === "fr") {
    const match = raw.match(/##\s+Français\s*([\s\S]*?)(?=##\s+English|$)/i);
    return match ? match[1].trim() : null;
  }
  const match = raw.match(/##\s+English\s*([\s\S]*)/i);
  return match ? match[1].trim() : null;
}

export function getAppSlugsWithPrivacy(): string[] {
  return Object.keys(privacyDocBySlug);
}
