import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu.jsx";

function BrandLogo({ to }) {
  return (
    <Link to={to} className="brand-mark">
      <div className="brand-mark-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L9.2 5.8H13.2L10 8.2L11.2 12L8 9.6L4.8 12L6 8.2L2.8 5.8H6.8L8 2Z" fill="white"/>
        </svg>
      </div>
      <span className="brand-mark-text">
        BEYOND&nbsp;<span className="accent-word">MARKS</span>
      </span>
    </Link>
  );
}

export default function AppHeader() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid var(--border)" }}>
      <BrandLogo to="/dashboard" />
      <HamburgerMenu />
    </header>
  );
}
