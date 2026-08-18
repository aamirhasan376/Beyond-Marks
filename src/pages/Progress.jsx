import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { loadProgress } from "../data/progressStore.js";
import { QUESTIONS } from "../data/questions.js";
import { ZONES } from "../data/zones.js";
import { ZONE_ICONS } from "../data/zoneIcons.js";
import AppHeader from "../components/AppHeader.jsx";

export default function Progress() {
  const { user } = useAuth();
  const progress = loadProgress(user);
  const total = QUESTIONS.length;
  const done = progress.answers.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppHeader />
      <main className="page-wrap fade-in">
        <p className="eyebrow">PREVIOUS PROGRESS</p>
        <h2 style={{ fontSize: 26 }}>Your reflection history</h2>

        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, marginBottom: 10 }}>
            <span>Reflections completed</span>
            <strong>{done} / {total}</strong>
          </div>
          <div style={{ width: "100%", height: 8, borderRadius: 4, background: "var(--border)" }}>
            <div style={{ width: `${(done / total) * 100}%`, height: "100%", borderRadius: 4, background: "var(--accent)" }} />
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>Days you've shown up</p>
          {progress.completedDates.length === 0 ? (
            <p className="body-text" style={{ margin: 0 }}>No reflections yet — your first day will show up here.</p>
          ) : (
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {progress.completedDates.map((d) => (
                <li key={d} className="body-text" style={{ margin: "4px 0" }}>{formatDate(d)}</li>
              ))}
            </ul>
          )}
        </div>

        {progress.finished && progress.chosenZone ? (
          <div className="card" style={{ marginTop: 16 }}>
            <p style={{ fontWeight: 600, marginBottom: 12 }}>Your result</p>
            <ZoneRow zone={progress.chosenZone} />
            {progress.journal && (
              <p className="body-text" style={{ fontStyle: "italic", marginTop: 12 }}>"{progress.journal}"</p>
            )}
          </div>
        ) : (
          <div className="card" style={{ marginTop: 16 }}>
            <p className="body-text" style={{ margin: 0 }}>
              You haven't finished your reflection yet. {done < total ? "Keep going a little at a time." : "You're ready to see your zones."}
            </p>
            <Link to="/reflect" className="btn-primary" style={{ textDecoration: "none", marginTop: 14 }}>
              Continue <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

function ZoneRow({ zone }) {
  const Icon = ZONE_ICONS[zone];
  const z = ZONES[zone];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${z.color}`, background: `${z.color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={z.color} />
      </div>
      <div>
        <div style={{ fontWeight: 600 }}>{zone}</div>
        <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{z.tag}</div>
      </div>
    </div>
  );
}

function formatDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
