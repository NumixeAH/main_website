"use client";
import { useState, useEffect } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#" className={styles.logo}>VN</a>
      <ul className={styles.links}>
        <li><a href="#about">À propos</a></li>
        <li><a href="#projects">Projets</a></li>
        <li><a href="#stack">Stack</a></li>
        <li><a href="#contact" className={styles.cta}>Contact</a></li>
      </ul>
    </nav>
  );
}
