import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import { hasDeleteAccountPage, deleteAccountAppSlugs } from "@/lib/delete-account-apps";
import { getProjectBySlug } from "@/lib/projects";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ locale: string; appSlug: string }>;
};

export async function generateStaticParams() {
  return deleteAccountAppSlugs.map((appSlug) => ({ appSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, appSlug } = await params;
  if (!hasDeleteAccountPage(appSlug)) return { title: "Sparkixe" };
  const t = await getTranslations({ locale, namespace: "delete_account" });
  const pt = await getTranslations({ locale, namespace: "projects" });
  const project = getProjectBySlug(appSlug);
  const appTitle = project ? pt(`${project.translationKey}.title`) : appSlug;
  return {
    title: `${t("title")} — ${appTitle}`,
  };
}

export default async function DeleteAccountPage({ params }: Props) {
  const { locale, appSlug } = await params;
  if (!hasDeleteAccountPage(appSlug)) notFound();

  const t = await getTranslations({ locale, namespace: "delete_account" });
  const project = getProjectBySlug(appSlug);
  if (!project) notFound();

  const pt = await getTranslations({ locale, namespace: "projects" });
  const appTitle = pt(`${project.translationKey}.title`);

  return (
    <main className={styles.container}>
      <div className="section">
        <div className={styles.links}>
          <Link
            href={`/${locale}/privacy/${appSlug}`}
            className={styles.backLink}
          >
            ← {t("back_privacy")}
          </Link>
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className={styles.backLink}
          >
            {t("back_project")}
          </Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <article className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.h2}>{t("procedure_title")}</h2>
            <ol className={styles.ol}>
              <li className={styles.li}>{t("procedure_in_app")}</li>
              <li className={styles.li}>{t("procedure_email")}</li>
            </ol>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>{t("data_deleted_title")}</h2>
            <p className={styles.p}>{t("data_deleted")}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>{t("data_retained_title")}</h2>
            <p className={styles.p}>{t("data_retained")}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>{t("retention_title")}</h2>
            <p className={styles.p}>{t("retention")}</p>
          </section>
        </article>
      </div>
      <Footer />
    </main>
  );
}
