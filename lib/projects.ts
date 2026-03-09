export type ProjectStatus = "completed" | "in_progress";

export interface Project {
  slug: string;
  translationKey: string;
  status: ProjectStatus;
  tech: string[];
  /** Optional external links (e.g. live site, demo). Label keys are in messages under project_page.visit_site etc. */
  links?: { labelKey: string; url: string }[];
  /** Screenshot paths under public/ (e.g. "/projects/ecommerce-configurator/1.jpg"). Put files in public/projects/<slug>/ */
  images?: string[];
  /** If set, links to the app-specific privacy policy at /privacy/[this slug] (must exist in lib/privacy-docs). */
  privacySlug?: string;
}

export const projects: Project[] = [
  {
    slug: "ecommerce-configurator",
    translationKey: "ecommerce",
    status: "completed",
    tech: ["Next.js", "React", "TypeScript", "SVG", "Node.js"],
    links: [{ labelKey: "visit_site", url: "https://example.com" }],
    images: [], // e.g. ["/projects/ecommerce-configurator/1.jpg", "/projects/ecommerce-configurator/2.jpg"]
  },
  {
    slug: "cocktail-app",
    translationKey: "cocktail",
    status: "in_progress",
    tech: ["Flutter", "Material Design", "C#", "NoSQL"],
    images: [], // e.g. ["/projects/cocktail-app/1.jpg", "/projects/cocktail-app/2.jpg"]
    privacySlug: "cocktail-app",
  },
  {
    slug: "desktop-wpf",
    translationKey: "desktop",
    status: "in_progress",
    tech: ["C#", "WPF", ".NET"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
