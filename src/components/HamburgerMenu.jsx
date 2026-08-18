import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, LogOut, User, BarChart2, Compass } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { user, currentUserName, logout } = useAuth();
  const { dark, toggleDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(path) {
    setOpen(false);
    navigate(path);
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        style={{
          background: "transparent", border: "1.5px solid var(--border-strong)",
          borderRadius: 10, width: 42, height: 42, display: "flex",
          alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--ink)",
        }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div style={{
          position: "absolute", right: 0, top: 50,
          width: 240, maxWidth: "calc(100vw - 32px)",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, boxShadow: "var(--shadow-lg)",
          padding: 8, zIndex: 50,
        }}>
          {user && (
            <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border)", marginBottom: 6 }}>
              <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>Signed in as</div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{currentUserName()}</div>
            </div>
          )}

          <MenuItem icon={Compass} label="Dashboard" onClick={() => go("/dashboard")} />
          <MenuItem icon={BarChart2} label="Previous Progress" onClick={() => go("/progress")} />
          <MenuItem icon={User} label="Career Paths" onClick={() => go("/careers")} />
          <MenuItem
            icon={dark ? Sun : Moon}
            label={dark ? "Light mode" : "Dark mode"}
            onClick={() => { toggleDark(); }}
          />

          {user ? (
            <MenuItem icon={LogOut} label="Log out" onClick={() => { logout(); go("/"); }} danger />
          ) : (
            <MenuItem icon={User} label="Log in" onClick={() => go("/login")} />
          )}
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        background: "transparent", border: "none", borderRadius: 8,
        padding: "10px 12px", fontSize: 14.5, cursor: "pointer", textAlign: "left",
        color: danger ? "var(--danger)" : "var(--ink)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <Icon size={16} /> {label}
    </button>
  );
}
