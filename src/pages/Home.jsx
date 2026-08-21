import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import Footer from "../components/Footer.jsx";

function BrandLogo() {
  return (
    <div className="brand-mark" style={{ cursor: "default" }}>
      <div className="brand-mark-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L9.2 5.8H13.2L10 8.2L11.2 12L8 9.6L4.8 12L6 8.2L2.8 5.8H6.8L8 2Z" fill="white"/>
        </svg>
      </div>
      <span className="brand-mark-text">
        BEYOND&nbsp;<span className="accent-word">MARKS</span>
      </span>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const { dark, toggleDark } = useTheme();

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <BrandLogo />
        <button
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          style={{
            background: "var(--surface)", border: "1.5px solid var(--border-strong)", borderRadius: 10,
            width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--ink)", boxShadow: "var(--shadow-sm)",
          }}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main
        style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, var(--surface-alt), transparent 70%)",
        }}
        className="fade-in"
      >
        <div style={{ maxWidth: 620, textAlign: "center" }}>
          <p className="eyebrow">SELF-DISCOVERY, NOT SCORING</p>
          <h1 style={{ fontSize: "clamp(34px, 6vw, 52px)", lineHeight: 1.12, marginBottom: 22 }}>
            No marks. No rankings.<br />Just clarity.
          </h1>
          <p className="body-text" style={{ fontSize: 17.5, maxWidth: 480, margin: "0 auto" }}>
            A calm, self-paced way to understand who you are before you decide what to
            become. A few short reflections a day — nothing timed, nothing scored against
            anyone else.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <Link to="/signup" className="btn-primary" style={{ textDecoration: "none" }}>
              Create an account <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </Link>
            <Link to="/login" className="btn-secondary" style={{ textDecoration: "none" }}>
              Log in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
