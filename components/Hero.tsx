import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Developer · Founder · Maker</p>
        <h1 className={styles.title}>
          Je construis des<br />
          <em>produits digitaux</em><br />
          qui fonctionnent.
        </h1>
        <p className={styles.sub}>
          Indie developer basé en Belgique —<br />
          e-commerce, apps mobiles, outils bureautiques,... .
        </p>
        <div className={styles.actions}>
          <a href="#projects" className={styles.primary}>Voir mes projets</a>
          <a href="#contact" className={styles.secondary}>Me contacter →</a>
        </div>
      </div>
      <div className={styles.decoration} aria-hidden="true">
        <span>01</span>
        <div className={styles.line} />
      </div>
    </section>
  );
}
