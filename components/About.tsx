import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.grid}>
        <div className={styles.label}>
          <span>02 — À propos</span>
        </div>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Développeur full-stack &<br />
            entrepreneur en solo.
          </h2>
          <div className={styles.body}>
            <p>
              Je suis un développeur indépendant qui conçoit, code et lance des produits
              digitaux de A à Z. De l'idée au déploiement, je maîtrise l'ensemble de la chaîne —
              ce qui me permet d'aller vite et de rester agile.
            </p>
            <p>
              Mes projets couvrent plusieurs domaines : e-commerce, applications mobiles
              et outils bureautiques. Chaque produit est pensé pour être simple à utiliser,
              robuste techniquement et viable commercialement.
            </p>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.num}>3</span>
              <span className={styles.desc}>Produits lancés</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.num}>1</span>
              <span className={styles.desc}>Fondateur</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.num}>∞</span>
              <span className={styles.desc}>Projets à venir</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
