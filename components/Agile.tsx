"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { AGILE_LINKS } from "@/lib/agile-links";
import styles from "./Agile.module.css";

export default function Agile() {
  const t = useTranslations("agile");

  return (
    <section id="agile" className="section" style={{ position: "relative", zIndex: 1 }}>
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

      <div className={styles.links}>
        {AGILE_LINKS.map((item, i) => (
          <motion.a
            key={item.key}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <span className={styles.linkLabel}>{t(`link_${item.key}` as any)}</span>
            <span className={styles.linkArrow}>↗</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
