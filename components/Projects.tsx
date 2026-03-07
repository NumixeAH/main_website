import styles from "./Projects.module.css";

const projects = [
  {
    num: "01",
    type: "E-commerce",
    title: "Nom de la boutique",
    description:
      "Une boutique en ligne pensée pour convertir — UX fluide, paiement simplifié, gestion des stocks intégrée. Lancée de zéro, de la conception au déploiement.",
    tags: ["Next.js", "Stripe", "Shopify / Custom"],
    status: "En ligne",
    link: "#",
  },
  {
    num: "02",
    type: "App Mobile",
    title: "Nom de l'app",
    description:
      "Application mobile native pensée pour le quotidien. Interface soignée, performances optimisées, disponible sur iOS & Android.",
    tags: ["React Native", "Expo", "Supabase"],
    status: "App Store",
    link: "#",
  },
  {
    num: "03",
    type: "App Bureautique",
    title: "Nom de l'outil",
    description:
      "Un outil de productivité pour les professionnels. Conçu pour être simple à prendre en main et puissant pour les utilisateurs avancés.",
    tags: ["Electron / Tauri", "TypeScript", "SQLite"],
    status: "En développement",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.label}>03 — Projets</span>
          <h2 className={styles.title}>Ce que j'ai construit.</h2>
        </div>

        <div className={styles.list}>
          {projects.map((p) => (
            <article key={p.num} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.num}>{p.num}</span>
                <span className={styles.type}>{p.type}</span>
                <span className={`${styles.badge} ${p.status === "En développement" ? styles.wip : styles.live}`}>
                  {p.status}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.desc}>{p.description}</p>
              <div className={styles.footer}>
                <div className={styles.tags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <a href={p.link} className={styles.link}>Voir →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
