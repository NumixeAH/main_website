"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import styles from "./Stack.module.css";

const stackData = [
  {
    key: "frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "CSS Modules"],
  },
  {
    key: "mobile",
    items: ["Flutter", "Material Design"],
  },
  {
    key: "backend",
    items: ["Node.js", "C#", "REST APIs", "SQL", "NoSQL"],
  },
  {
    key: "desktop",
    items: ["C#", "WPF", ".NET", "XAML"],
  },
  {
    key: "devops",
    items: ["Git", "Azure DevOps", "Vercel", "Docker", "CI/CD"],
  },
  {
    key: "design",
    items: ["Figma", "Draw.io", "SVG", "UI/UX", "Responsive Design"],
  },
  {
    key: "tools",
    items: ["Jira", "Notion", "Teams", "Discord"],
  }
];

export default function Stack() {
  const t = useTranslations("stack");

  return (
    <section id="stack" className="section" style={{ position: "relative", zIndex: 1 }}>
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
        {stackData.map((category, catIndex) => (
          <motion.div
            key={category.key}
            className={styles.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: catIndex * 0.08 }}
          >
            <h3 className={styles.categoryTitle}>
              {t(category.key as any)}
            </h3>
            <div className={styles.items}>
              {category.items.map((item) => (
                <span key={item} className={styles.item}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
