"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import MagneticButton from "./ui/MagneticButton";
import styles from "./Contact.module.css";

export default function Contact() {
  const t = useTranslations("contact");

  const socials = [
    //{ label: "GitHub", url: "https://github.com/Numixe", icon: "GH" },
    { label: "LinkedIn", url: "https://linkedin.com/in/antoine-hagiyannakis", icon: "LI" }
  ];

  return (
    <section id="contact" className="section" style={{ position: "relative", zIndex: 1 }}>
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

      <div className={styles.content}>
        <motion.div
          className={styles.emailBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className={styles.label}>{t("email_label")}</span>
          <MagneticButton as="a" href="mailto:contact@sparkixe.com" className={styles.email}>
            contact@sparkixe.com
          </MagneticButton>
        </motion.div>

        <motion.div
          className={styles.socialsBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className={styles.label}>{t("socials_label")}</span>
          <div className={styles.socials}>
            {socials.map((social) => (
              <MagneticButton
                key={social.label}
                as="a"
                href={social.url}
                className={styles.socialLink}
              >
                <span className={styles.socialIcon}>{social.icon}</span>
                {social.label}
              </MagneticButton>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
