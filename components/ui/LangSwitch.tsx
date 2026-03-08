"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function LangSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={switchLocale}
      aria-label="Switch language"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "6px 12px",
        borderRadius: 20,
        border: "1px solid var(--border)",
        backgroundColor: "var(--card)",
        color: "var(--fg)",
        fontSize: "0.85rem",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 600,
        letterSpacing: "0.02em",
        transition: "border-color 0.2s",
      }}
    >
      <motion.span
        key={locale}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {locale === "fr" ? "EN" : "FR"}
      </motion.span>
    </button>
  );
}
