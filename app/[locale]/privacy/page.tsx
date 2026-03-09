import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("privacy_title") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await import("next-intl/server").then((m) =>
    m.getTranslations({ locale, namespace: "privacy" })
  );
  const pt = await import("next-intl/server").then((m) =>
    m.getTranslations({ locale, namespace: "projects" })
  );
  const { getAppSlugsWithPrivacy } = await import("@/lib/privacy-docs");
  const { getProjectBySlug } = await import("@/lib/projects");
  const appSlugs = getAppSlugsWithPrivacy();

  return (
    <main className={styles.container}>
      <div className="section">
        <div>
          <Link href={`/${locale}`} className={styles.backLink}>
            ← {t("back")}
          </Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <div className={styles.body}>
          <p className={styles.paragraph}>{t("global.intro")}</p>
          <p className={styles.paragraph}>{t("global.data")}</p>
          <p className={styles.paragraph}>{t("global.rights")}</p>
          <p className={styles.paragraph}>{t("global.apps")}</p>

          {appSlugs.length > 0 && (
            <div className={styles.appLinks}>
              <h2 className={styles.sectionTitle}>{t("app_policy")}</h2>
              <ul className={styles.list}>
                {appSlugs.map((slug) => {
                  const project = getProjectBySlug(slug);
                  const label = project
                    ? pt(`${project.translationKey}.title`)
                    : slug;
                  return (
                    <li key={slug}>
                      <Link href={`/${locale}/privacy/${slug}`}>{label}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
