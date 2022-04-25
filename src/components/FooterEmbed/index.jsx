import React from 'react';
import logoSmallBlue from 'assets/svgs/openzoo_icon.svg';
export function FooterEmbed() {
  return (
    <footer style={{ marginBottom: "-200px", height: "100px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "5px", padding: "20px", borderTop: "1px solid #e2eef1", background: "#fff" }}>
      <span>Powered by OpenZoo</span>
      <img src={logoSmallBlue} alt='logo' style={{ width: "24px", height: "24px" }} />
    </footer>);
}
