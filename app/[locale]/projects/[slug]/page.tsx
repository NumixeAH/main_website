import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getProjectBySlug, projects } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site-url";
import { projectCreativeWorkJsonLd } from "@/lib/seo-jsonld";
import ProjectPageClient from "./ProjectPageClient";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "404 — Sparkixe" };
  }

  const base = getSiteUrl();
  const pt = await getTranslations({ locale, namespace: "projects" });
  const title = pt(`${project.translationKey}.title`);
  const description = pt(`${project.translationKey}.description`);
  const pageTitle = `${title} — Sparkixe`;
  const canonicalPath = `/${locale}/projects/${slug}`;
  const ogImage = project.images?.[0]
    ? `${base}${project.images[0]}`
    : undefined;

  const languages: Record<string, string> = {
    "x-default": `${base}/${routing.defaultLocale}/projects/${slug}`,
  };
  for (const l of routing.locales) {
    languages[l] = `${base}/${l}/projects/${slug}`;
  }

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalPath,
      languages,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalPath,
      type: "article",
      siteName: "Sparkixe",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const base = getSiteUrl();
  const pt = await getTranslations({ locale, namespace: "projects" });
  const title = pt(`${project.translationKey}.title`);
  const description = pt(`${project.translationKey}.description`);
  const jsonLd = projectCreativeWorkJsonLd({
    baseUrl: base,
    locale,
    slug,
    title,
    description,
    project,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectPageClient project={project} slug={slug} locale={locale} />
    </>
  );
}
