import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/lib/projects";
import { getAppSlugsWithPrivacy } from "@/lib/privacy-docs";
import { deleteAccountAppSlugs } from "@/lib/delete-account-apps";
import { getSiteUrl } from "@/lib/site-url";

function hreflangForPath(pathAfterLocale: string): Record<string, string> {
  const base = getSiteUrl();
  const languages: Record<string, string> = {
    "x-default": `${base}/${routing.defaultLocale}${pathAfterLocale}`,
  };
  for (const locale of routing.locales) {
    languages[locale] = `${base}/${locale}${pathAfterLocale}`;
  }
  return languages;
}

function entry(
  pathAfterLocale: string,
  options: {
    changeFrequency: NonNullable<MetadataRoute.Sitemap[0]["changeFrequency"]>;
    priority: number;
  }
): MetadataRoute.Sitemap[0] {
  const base = getSiteUrl();
  const pickLocale = routing.defaultLocale;
  return {
    url: `${base}/${pickLocale}${pathAfterLocale}`,
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: { languages: hreflangForPath(pathAfterLocale) },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [entry("", { changeFrequency: "weekly", priority: 1 })];

  for (const p of projects) {
    items.push(
      entry(`/projects/${p.slug}`, { changeFrequency: "monthly", priority: 0.8 })
    );
  }

  items.push(entry("/privacy", { changeFrequency: "monthly", priority: 0.5 }));

  for (const slug of getAppSlugsWithPrivacy()) {
    items.push(
      entry(`/privacy/${slug}`, { changeFrequency: "monthly", priority: 0.4 })
    );
  }

  for (const slug of deleteAccountAppSlugs) {
    items.push(
      entry(`/privacy/${slug}/delete-account`, {
        changeFrequency: "yearly",
        priority: 0.3,
      })
    );
  }

  return items;
}
