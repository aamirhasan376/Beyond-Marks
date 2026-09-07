import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const { user } = useAuth();
  const { dark, toggleDark } = useTheme();

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>
        <div style={{ fontWeight: 700, letterSpacing: "0.04em", fontSize: 15 }}>BEYOND MARKS</div>
        <button
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          style={{
            background: "transparent", border: "1.5px solid var(--border-strong)", borderRadius: 10,
            width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--ink)",
          }}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} className="fade-in">
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <p className="eyebrow">SELF-DISCOVERY, NOT SCORING</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 46px)", lineHeight: 1.15, marginBottom: 20 }}>
            No marks. No rankings.<br />Just clarity.
          </h1>
          <p className="body-text">
            A calm, self-paced way to understand who you are before you decide what to
            become. A few short reflections a day — nothing timed, nothing scored against
            anyone else.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
            <Link to="/signup" className="btn-primary">
              Create an account <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </Link>
            <Link to="/login" className="btn-secondary">
              Log in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
