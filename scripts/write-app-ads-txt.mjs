/**
 * Writes public/app-ads.txt at build time (Vercel injects ADMOB_PUBLISHER_ID during `next build`).
 * Run: node scripts/write-app-ads-txt.mjs
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const GOOGLE_CERTIFICATION_ID = "f08c47fec0942fa0";

function normalize(raw) {
  if (!raw?.trim()) return null;
  const id = raw.trim().replace(/^["']|["']$/g, "");

  const fromAdUnit = id.match(/ca-app-pub-(\d{16})/);
  if (fromAdUnit) return `pub-${fromAdUnit[1]}`;

  if (/^pub-\d{16}$/.test(id)) return id;
  if (/^\d{16}$/.test(id)) return `pub-${id}`;

  const loosePub = id.match(/^pub-(\d{10,20})$/);
  if (loosePub) return `pub-${loosePub[1]}`;

  return null;
}

const raw =
  process.env.ADMOB_PUBLISHER_ID ?? process.env.NEXT_PUBLIC_ADMOB_PUBLISHER_ID;
const pub = normalize(raw);
const outPath = join(process.cwd(), "public", "app-ads.txt");

if (!pub) {
  const onVercel = process.env.VERCEL === "1";
  const msg =
    "[app-ads.txt] ADMOB_PUBLISHER_ID is missing or invalid. " +
    "Use the account publisher ID from AdMob (format pub- + 16 digits), " +
    "not an ad unit ID unless it contains ca-app-pub-XXXXXXXXXXXXXXXX.";

  if (onVercel) {
    console.error(msg);
    if (raw) {
      console.error(
        "[app-ads.txt] Current value length:",
        raw.length,
        "(check for spaces or wrong ID type)"
      );
    }
    process.exit(1);
  }

  console.warn(msg);
  console.warn("[app-ads.txt] Skipping file generation (local build).");
  process.exit(0);
}

const body = `google.com, ${pub}, DIRECT, ${GOOGLE_CERTIFICATION_ID}\n`;
writeFileSync(outPath, body, "utf8");
console.log(`[app-ads.txt] Wrote ${outPath} for ${pub.slice(0, 8)}…`);
