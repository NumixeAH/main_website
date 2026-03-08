"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import styles from "./Hero.module.css";

export default function Hero() {
  const t = useTranslations("hero");

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.05,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  };

  const brandName = "SPARKIXE";

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <motion.p
          className={styles.greeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("greeting")}
        </motion.p>

        <h1 className={styles.title}>
          {brandName.split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className={i >= 5 ? styles.titleAccent : ""}
              style={{ display: "inline-block", perspective: "500px" }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {t("tagline")}
        </motion.p>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <MagneticButton as="a" href="#projects" className={styles.ctaPrimary}>
            {t("cta_projects")}
          </MagneticButton>
          <MagneticButton as="a" href="#contact" className={styles.ctaSecondary}>
            {t("cta_contact")}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
