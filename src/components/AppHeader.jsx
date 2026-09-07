import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu.jsx";

export default function AppHeader() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid var(--border)" }}>
      <Link to="/dashboard" style={{ fontWeight: 700, letterSpacing: "0.04em", fontSize: 15, textDecoration: "none", color: "var(--ink)" }}>
        BEYOND MARKS
      </Link>
      <HamburgerMenu />
    </header>
  );
}
