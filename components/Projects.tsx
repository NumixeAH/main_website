"use client";

import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/lib/projects";
import AnimatedText from "./ui/AnimatedText";
import GlowCard from "./ui/GlowCard";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";
import Link from "next/link";

export default function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <section id="projects" className="section" style={{ position: "relative", zIndex: 1 }}>
      <AnimatedText as="h2" className="section-title">
        {t("title")}
      </AnimatedText>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {t("subtitle")}
      </motion.p>

      <div className={styles.grid}>
        {projects.map((project) => (
          <GlowCard key={project.slug} className={styles.card}>
            <div className={styles.cardHeader}>
              <span
                className={`${styles.status} ${project.status === "completed" ? styles.statusCompleted : styles.statusProgress}`}
              >
                {project.status === "completed"
                  ? t("status_completed")
                  : t("status_in_progress")}
              </span>
            </div>

            <h3 className={styles.cardTitle}>
              {t(`${project.translationKey}.title`)}
            </h3>

            <p className={styles.cardDescription}>
              {t(`${project.translationKey}.description`)}
            </p>

            <div className={styles.tech}>
              {project.tech.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>

            <p className={styles.note}>
              {t(`${project.translationKey}.note`)}
            </p>

            <div className={styles.cardLinks}>
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className={styles.cardLink}
              >
                {t("view_project")} →
              </Link>
              {project.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLinkExternal}
                >
                  {t(link.labelKey)} ↗
                </a>
              ))}
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
