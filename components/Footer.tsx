import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Votre Nom. Tous droits réservés.</span>
      <span>Fait avec Next.js · Déployé sur Vercel</span>
    </footer>
  );
}
