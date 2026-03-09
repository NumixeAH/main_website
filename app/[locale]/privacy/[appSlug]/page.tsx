import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Footer from "@/components/Footer";
import {
  getPrivacyContentForLocale,
  getPrivacyDocPath,
  privacyDocBySlug,
} from "@/lib/privacy-docs";
import { getProjectBySlug } from "@/lib/projects";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ locale: string; appSlug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(privacyDocBySlug).map((appSlug) => ({
    appSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, appSlug } = await params;
  const project = getProjectBySlug(appSlug);
  const t = await getTranslations({ locale, namespace: "meta" });
  const pt = await getTranslations({ locale, namespace: "projects" });
  const title = project
    ? `${pt(`${project.translationKey}.title`)} — ${locale === "fr" ? "Politique de confidentialité" : "Privacy policy"}`
    : t("privacy_title");
  return { title };
}

export default async function AppPrivacyPage({ params }: Props) {
  const { locale, appSlug } = await params;
  const validLocale = locale === "en" ? "en" : "fr";
  if (!getPrivacyDocPath(appSlug)) notFound();

  const content = getPrivacyContentForLocale(appSlug, validLocale);
  if (!content) notFound();

  const project = getProjectBySlug(appSlug);
  const t = await getTranslations({ locale, namespace: "privacy" });
  const pt = await getTranslations({ locale, namespace: "projects" });
  const pp = await getTranslations({ locale, namespace: "project_page" });
  const appTitle = project ? pt(`${project.translationKey}.title`) : appSlug;

  return (
    <main className={styles.container}>
      <div className="section">
        <div className={styles.links}>
          <Link href={`/${locale}/privacy`} className={styles.backLink}>
            ← {t("back")}
          </Link>
          {project && (
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className={styles.backLink}
            >
              {pp("back")} ({appTitle})
            </Link>
          )}
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>{appTitle}</h1>
          <p className={styles.subtitle}>{t("app_policy")}</p>
        </header>

        <article className={styles.body}>
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className={styles.mdH2}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className={styles.mdH3}>{children}</h3>
              ),
              p: ({ children }) => <p className={styles.mdP}>{children}</p>,
              ul: ({ children }) => <ul className={styles.mdUl}>{children}</ul>,
              li: ({ children }) => <li className={styles.mdLi}>{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mdA}
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className={styles.mdStrong}>{children}</strong>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
      <Footer />
    </main>
  );
}
