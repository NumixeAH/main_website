"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            SPARK<span className={styles.accent}>IXE</span>
          </span>
        </div>
        <div className={styles.footerLinks}>
          <p className={styles.copy}>
            &copy; {year} Sparkixe. {t("rights")}
          </p>
          <p className={styles.tech}>{t("built_with")}</p>
          <p className={styles.tech}>
            <Link href={`/${locale}/privacy`} className={styles.privacyLink}>
              {t("privacy")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
