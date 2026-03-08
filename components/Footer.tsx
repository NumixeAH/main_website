"use client";

import { useTranslations } from "next-intl";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            SPARK<span className={styles.accent}>IXE</span>
          </span>
        </div>
        <p className={styles.copy}>
          &copy; {year} Sparkixe. {t("rights")}
        </p>
        <p className={styles.tech}>
          {t("built_with")}
        </p>
      </div>
    </footer>
  );
}
