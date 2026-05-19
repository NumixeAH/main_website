import { getAppAdsTxtBody } from "@/lib/admob";

/** Read ADMOB_PUBLISHER_ID at request time (Vercel env) so a redeploy picks up new values. */
export const dynamic = "force-dynamic";

export function GET() {
  const body = getAppAdsTxtBody();
  if (!body) {
    return new Response(
      "app-ads.txt is not configured. Set ADMOB_PUBLISHER_ID on the host (e.g. pub-1234567890123456).",
      { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
