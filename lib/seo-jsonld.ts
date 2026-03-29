import type { Project } from "@/lib/projects";

export function homeJsonLdGraph(params: {
  baseUrl: string;
  locale: string;
  siteDescription: string;
}) {
  const { baseUrl, locale, siteDescription } = params;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/${locale}#website`,
        name: "Sparkixe",
        url: `${baseUrl}/${locale}`,
        description: siteDescription,
        inLanguage: locale,
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/${locale}#person`,
        name: "Numixe",
        url: `${baseUrl}/${locale}`,
        jobTitle:
          locale === "fr" ? "Développeur full-stack" : "Full-stack developer",
      },
    ],
  };
}

export function projectCreativeWorkJsonLd(params: {
  baseUrl: string;
  locale: string;
  slug: string;
  title: string;
  description: string;
  project: Project;
}) {
  const { baseUrl, locale, slug, title, description, project } = params;
  const url = `${baseUrl}/${locale}/projects/${slug}`;
  const images =
    project.images?.map((src) =>
      src.startsWith("http") ? src : `${baseUrl}${src}`
    ) ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url,
    inLanguage: locale,
    ...(images.length > 0 ? { image: images } : {}),
  };
}
