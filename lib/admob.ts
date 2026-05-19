/** Google AdMob / ads.txt certification authority ID for google.com entries. */
const GOOGLE_CERTIFICATION_ID = "f08c47fec0942fa0";

/**
 * Normalizes an AdMob publisher ID to `pub-` + 16 digits.
 * Accepts `pub-1234567890123456` or `1234567890123456`.
 */
export function normalizeAdMobPublisherId(
  raw: string | undefined
): string | null {
  if (!raw?.trim()) return null;
  const id = raw.trim();
  if (/^pub-\d{16}$/.test(id)) return id;
  if (/^\d{16}$/.test(id)) return `pub-${id}`;
  return null;
}

/** Single authorized-seller line for Google AdMob (app-ads.txt). */
export function buildGoogleAdMobAppAdsLine(publisherId: string): string {
  return `google.com, ${publisherId}, DIRECT, ${GOOGLE_CERTIFICATION_ID}`;
}

/**
 * Full app-ads.txt body from ADMOB_PUBLISHER_ID env var.
 * Returns null when the env var is missing or invalid.
 */
export function getAppAdsTxtBody(): string | null {
  const pub = normalizeAdMobPublisherId(process.env.ADMOB_PUBLISHER_ID);
  if (!pub) return null;
  return `${buildGoogleAdMobAppAdsLine(pub)}\n`;
}
