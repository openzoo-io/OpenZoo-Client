import React from 'react';
import logoSmallBlue from 'assets/svgs/openzoo_icon.svg';
import styles from "./styles.module.scss";

export function FooterEmbed() {
  return (
    <footer className={styles.footerEmbed}>
      <span>Powered by OpenZoo</span>
      <img src={logoSmallBlue} alt='logo' style={{ width: "24px", height: "24px" }} />
    </footer>);
}
