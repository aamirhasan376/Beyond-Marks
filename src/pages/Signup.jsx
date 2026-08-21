import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import PasswordInput from "../components/PasswordInput.jsx";

export default function Signup() {
  const { user, signup, error } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to="/dashboard" replace />;

  function onSubmit(e) {
    e.preventDefault();
    if (signup(name, email, password)) navigate("/dashboard");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} className="fade-in">
        <form onSubmit={onSubmit} className="card" style={{ width: "100%", maxWidth: 400 }}>
          <p className="eyebrow">GET STARTED</p>
          <h2 style={{ fontSize: 24, marginBottom: 6 }}>Create your account</h2>
          <p className="body-text" style={{ marginTop: 0 }}>Your reflections save automatically as you go.</p>

          <label htmlFor="signup-name" style={{ fontSize: 13, fontWeight: 600, display: "block" }}>
            Name
          </label>
          <input id="signup-name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />

          <label htmlFor="signup-email" style={{ fontSize: 13, fontWeight: 600, display: "block", marginTop: 14 }}>
            Email
          </label>
          <input id="signup-email" className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="signup-password" style={{ fontSize: 13, fontWeight: 600, display: "block", marginTop: 14 }}>
            Password
          </label>
          <PasswordInput id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p style={{ color: "var(--danger)", fontSize: 13.5, marginTop: 12 }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: 20 }}>
            Create account <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>

          <p style={{ fontSize: 13.5, color: "var(--ink-muted)", marginTop: 16, textAlign: "center" }}>
            Already have an account? <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
