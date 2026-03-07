import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.wrapper}>
        <span className={styles.label}>05 — Contact</span>
        <h2 className={styles.title}>
          Un projet en tête ?<br />
          <em>Parlons-en.</em>
        </h2>
        <p className={styles.sub}>
          Je suis ouvert aux collaborations, aux missions freelance<br />
          et aux conversations intéressantes.
        </p>
        <a href="mailto:contact@sparkixe.com" className={styles.email}>
          contact@sparkixe.com
        </a>
        <div className={styles.socials}>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <span>·</span>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <span>·</span>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a>
        </div>
      </div>
    </section>
  );
}
