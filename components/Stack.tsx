import styles from "./Stack.module.css";

const stack = [
  { cat: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { cat: "Mobile", items: ["React Native", "Expo", "iOS / Android"] },
  { cat: "Backend", items: ["Node.js", "Supabase", "PostgreSQL", "REST / tRPC"] },
  { cat: "Desktop", items: ["Electron", "Tauri", "SQLite"] },
  { cat: "DevOps", items: ["Vercel", "GitHub Actions", "Docker"] },
  { cat: "Design", items: ["Figma", "Framer", "Principe"] },
];

export default function Stack() {
  return (
    <section id="stack" className={styles.stack}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.label}>04 — Stack</span>
          <h2 className={styles.title}>Outils & technologies.</h2>
        </div>
        <div className={styles.grid}>
          {stack.map((s) => (
            <div key={s.cat} className={styles.group}>
              <h3 className={styles.cat}>{s.cat}</h3>
              <ul className={styles.items}>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
