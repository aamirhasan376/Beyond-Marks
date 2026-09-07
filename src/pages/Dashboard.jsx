import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { loadProgress, todayStr } from "../data/progressStore.js";
import { QUESTIONS, DAILY_LIMIT } from "../data/questions.js";
import { ZONE_ICONS } from "../data/zoneIcons.js";
import { ZONES } from "../data/zones.js";
import AppHeader from "../components/AppHeader.jsx";

export default function Dashboard() {
  const { user, currentUserName } = useAuth();
  const progress = loadProgress(user);
  const answeredToday = progress.lastAnsweredDate === todayStr() ? progress.answeredToday : 0;
  const canContinueToday = answeredToday < DAILY_LIMIT;
  const total = QUESTIONS.length;
  const done = progress.answers.length;

  let status, cta, ctaLink;
  if (progress.finished) {
    status = "Your reflection is complete.";
    cta = "View your result";
    ctaLink = "/progress";
  } else if (done >= total) {
    status = "All reflections done — time to see your zones.";
    cta = "Reveal your zones";
    ctaLink = "/reflect";
  } else if (done === 0) {
    status = "You haven't started yet.";
    cta = "Begin your journey";
    ctaLink = "/reflect";
  } else if (canContinueToday) {
    status = `${done} of ${total} reflections done. You have room for more today.`;
    cta = "Continue reflecting";
    ctaLink = "/reflect";
  } else {
    status = `${done} of ${total} done. You've reflected enough for today — come back tomorrow.`;
    cta = null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppHeader />
      <main className="page-wrap fade-in">
        <p className="eyebrow">DASHBOARD</p>
        <h2 style={{ fontSize: 26, marginBottom: 6 }}>Welcome back, {currentUserName().split(" ")[0]}</h2>

        <div
          className="card"
          style={{
            marginTop: 16, background: "var(--accent-soft)", border: "1.5px solid var(--accent)",
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16,
          }}
        >
          <p className="body-text" style={{ margin: 0, color: "var(--ink)", fontSize: 15.5, maxWidth: 380 }}>{status}</p>
          {cta && (
            <Link to={ctaLink} className="btn-primary" style={{ flexShrink: 0 }}>
              {cta} <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </Link>
          )}
        </div>

        {progress.finished && progress.chosenZone && (
          <div className="card" style={{ marginTop: 20 }}>
            <p className="eyebrow" style={{ marginBottom: 4 }}>YOUR ZONE</p>
            <ZoneBadge zone={progress.chosenZone} />
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 28 }}>
          <Link to="/progress" className="card" style={{ textDecoration: "none", color: "var(--ink)" }}>
            <Compass size={18} style={{ marginBottom: 8 }} />
            <div style={{ fontWeight: 600 }}>Previous Progress</div>
            <div className="body-text" style={{ margin: "4px 0 0 0", fontSize: 13.5 }}>
              {progress.completedDates.length} {progress.completedDates.length === 1 ? "day" : "days"} reflected
            </div>
          </Link>
          <Link to="/careers" className="card" style={{ textDecoration: "none", color: "var(--ink)" }}>
            <Compass size={18} style={{ marginBottom: 8 }} />
            <div style={{ fontWeight: 600 }}>Career Paths</div>
            <div className="body-text" style={{ margin: "4px 0 0 0", fontSize: 13.5 }}>
              Explore all 5 zones and their courses
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

function ZoneBadge({ zone }) {
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
