"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getProjectBySlug, projects } from "@/lib/projects";
import Link from "next/link";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function ProjectPage() {
  const t = useTranslations();
  const pt = useTranslations("projects");
  const pp = useTranslations("project_page");
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className={styles.container}>
        <div className="section">
          <h1>404</h1>
          <Link href={`/${locale}`} className={styles.backLink}>
            {pp("back")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <section className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/${locale}/#projects`} className={styles.backLink}>
            ← {pp("back")}
          </Link>
        </motion.div>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span
            className={`${styles.status} ${project.status === "completed" ? styles.statusCompleted : styles.statusProgress}`}
          >
            {pp("status")}:{" "}
            {project.status === "completed"
              ? pt("status_completed")
              : pt("status_in_progress")}
          </span>

          <h1 className={styles.title}>
            {pt(`${project.translationKey}.title`)}
          </h1>
        </motion.div>

        <motion.div
          className={styles.body}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{pp("about_project")}</h2>
            <p className={styles.description}>
              {pt(`${project.translationKey}.description`)}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{pp("tech")}</h2>
            <div className={styles.tech}>
              {project.tech.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{pp("note")}</h2>
            <p className={styles.note}>
              {pt(`${project.translationKey}.note`)}
            </p>
          </div>

          {project.links && project.links.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{pp("links")}</h2>
              <div className={styles.externalLinks}>
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    {pp(link.labelKey)} ↗
                  </a>
                ))}
              </div>
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{pp("screenshots")}</h2>
              <div className={styles.screenshots}>
                {project.images.map((src, i) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.screenshotWrap}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${pt(`${project.translationKey}.title`)} screenshot ${i + 1}`}
                      className={styles.screenshot}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className={styles.otherProjects}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className={styles.sectionTitle}>{pt("title")}</h2>
          <div className={styles.projectLinks}>
            {projects
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/projects/${p.slug}`}
                  className={styles.projectLink}
                >
                  {pt(`${p.translationKey}.title`)} →
                </Link>
              ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
