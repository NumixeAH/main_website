"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import styles from "./About.module.css";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { value: t("stat_projects_value"), label: t("stat_projects") },
    { value: t("stat_founder_value"), label: t("stat_founder") },
    { value: t("stat_stack_value"), label: t("stat_stack") },
    { value: t("stat_passion_value"), label: t("stat_passion") },
  ];

  return (
    <section id="about" className="section" style={{ position: "relative", zIndex: 1 }}>
      <AnimatedText as="h2" className="section-title">
        {t("title")}
      </AnimatedText>

      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("description")}
      </motion.p>

      <div className={styles.stats}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.stat}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
