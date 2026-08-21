import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { loadProgress, todayStr } from "../data/progressStore.js";
import { QUESTIONS, DAILY_LIMIT } from "../data/questions.js";
import { ZONE_ICONS } from "../data/zoneIcons.js";
import { ZONES } from "../data/zones.js";
import AppHeader from "../components/AppHeader.jsx";

/* ─── Educational Scribble SVG Background ─────────────────── */
function ScribbleBg() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.18,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── TOP ROW ── */}
      {/* Pencil top-left */}
      <g transform="translate(70,90) rotate(-20)" stroke="currentColor" strokeWidth="2.2" fill="none">
        <rect x="0" y="0" width="12" height="52" rx="2" />
        <polygon points="0,52 12,52 6,66" fill="currentColor" stroke="none" />
        <line x1="0" y1="48" x2="12" y2="48" />
        <line x1="2" y1="4" x2="2" y2="44" strokeWidth="1" />
        <rect x="0" y="0" width="12" height="7" rx="2" fill="currentColor" opacity="0.5" />
      </g>

      {/* Star burst top-left-center */}
      <g transform="translate(240,65)" stroke="currentColor" strokeWidth="2" fill="none">
        <line x1="0" y1="-18" x2="0" y2="18" />
        <line x1="-18" y1="0" x2="18" y2="0" />
        <line x1="-13" y1="-13" x2="13" y2="13" />
        <line x1="13" y1="-13" x2="-13" y2="13" />
      </g>

      {/* Lightbulb top-mid-left */}
      <g transform="translate(480,55)" stroke="currentColor" strokeWidth="2.2" fill="none">
        <path d="M0,-22 C-16,-22 -16,0 -8,12 L8,12 C16,0 16,-22 0,-22 Z" />
        <line x1="-6" y1="14" x2="6" y2="14" />
        <line x1="-5" y1="18" x2="5" y2="18" />
        <line x1="-3" y1="22" x2="3" y2="22" />
        <line x1="0" y1="-26" x2="0" y2="-30" />
        <line x1="18" y1="-18" x2="21" y2="-21" />
        <line x1="-18" y1="-18" x2="-21" y2="-21" />
      </g>

      {/* Formula E=mc² top-mid */}
      <g transform="translate(700,80)" fill="currentColor" fontFamily="serif" fontSize="22" fontStyle="italic">
        <text>E=mc²</text>
      </g>

      {/* Graduation cap top-mid-right */}
      <g transform="translate(940,80) rotate(10)" stroke="currentColor" strokeWidth="2.2" fill="none">
        <polygon points="0,-16 28,0 0,16 -28,0" />
        <rect x="-6" y="0" width="12" height="18" />
        <ellipse cx="0" cy="18" rx="10" ry="5" />
        <path d="M28,0 L28,12" />
        <circle cx="28" cy="14" r="3" fill="currentColor" />
      </g>

      {/* Open book top-right */}
      <g transform="translate(1220,90)" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M0,0 C-20,-4 -40,-4 -50,0 L-50,40 C-40,36 -20,36 0,40 Z" />
        <path d="M0,0 C20,-4 40,-4 50,0 L50,40 C40,36 20,36 0,40 Z" />
        <line x1="-35" y1="8" x2="-8" y2="8" strokeWidth="1.2" />
        <line x1="-35" y1="14" x2="-8" y2="14" strokeWidth="1.2" />
        <line x1="8" y1="8" x2="35" y2="8" strokeWidth="1.2" />
        <line x1="8" y1="14" x2="35" y2="14" strokeWidth="1.2" />
      </g>

      {/* ── MIDDLE-TOP ROW ── */}
      {/* Infinity symbol upper-left */}
      <g transform="translate(140,240)" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M-30,0 C-30,-16 -10,-16 0,0 C10,16 30,16 30,0 C30,-16 10,-16 0,0 C-10,16 -30,16 -30,0 Z" />
      </g>

      {/* Atom upper-center-left */}
      <g transform="translate(380,220)" stroke="currentColor" strokeWidth="1.8" fill="none">
        <ellipse rx="30" ry="13" />
        <ellipse rx="30" ry="13" transform="rotate(60)" />
        <ellipse rx="30" ry="13" transform="rotate(120)" />
        <circle r="4" fill="currentColor" opacity="0.6" />
      </g>

      {/* Compass rose upper-mid */}
      <g transform="translate(620,230)" stroke="currentColor" strokeWidth="1.8" fill="none">
        <circle r="20" />
        <line x1="0" y1="-24" x2="0" y2="-16" />
        <line x1="0" y1="16" x2="0" y2="24" />
        <line x1="-24" y1="0" x2="-16" y2="0" />
        <line x1="16" y1="0" x2="24" y2="0" />
        <polygon points="0,-14 4,-4 0,4 -4,-4" fill="currentColor" opacity="0.6" />
      </g>

      {/* π symbol upper-right */}
      <g transform="translate(860,240)" fill="currentColor" fontFamily="serif" fontSize="48" fontStyle="italic">
        <text>π</text>
      </g>

      {/* Pencil upper-far-right */}
      <g transform="translate(1120,230) rotate(35)" stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="0" y="0" width="10" height="44" rx="2" />
        <polygon points="0,44 10,44 5,56" fill="currentColor" stroke="none" />
        <line x1="0" y1="40" x2="10" y2="40" />
      </g>

      {/* Star burst far-right */}
      <g transform="translate(1320,260)" stroke="currentColor" strokeWidth="2" fill="none">
        <line x1="0" y1="-18" x2="0" y2="18" />
        <line x1="-18" y1="0" x2="18" y2="0" />
        <line x1="-13" y1="-13" x2="13" y2="13" />
        <line x1="13" y1="-13" x2="-13" y2="13" />
      </g>

      {/* ── MIDDLE ROW ── */}
      {/* Open book mid-left */}
      <g transform="translate(70,420)" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M0,0 C-20,-4 -40,-4 -50,0 L-50,40 C-40,36 -20,36 0,40 Z" />
        <path d="M0,0 C20,-4 40,-4 50,0 L50,40 C40,36 20,36 0,40 Z" />
        <line x1="-35" y1="8" x2="-8" y2="8" strokeWidth="1.2" />
        <line x1="-35" y1="14" x2="-8" y2="14" strokeWidth="1.2" />
        <line x1="8" y1="8" x2="35" y2="8" strokeWidth="1.2" />
        <line x1="8" y1="14" x2="35" y2="14" strokeWidth="1.2" />
      </g>

      {/* Σ symbol mid-left-center */}
      <g transform="translate(280,440)" fill="currentColor" fontFamily="serif" fontSize="42" fontStyle="italic">
        <text>Σ</text>
      </g>

      {/* Ruler center */}
      <g transform="translate(500,430) rotate(-15)" stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="0" y="0" width="120" height="24" rx="3" />
        {[15, 30, 45, 60, 75, 90, 105].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x} y2={i % 2 === 0 ? "12" : "7"} strokeWidth="1.4" />
        ))}
      </g>

      {/* Trophy mid-right */}
      <g transform="translate(780,430)" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M-14,0 C-14,-24 14,-24 14,0 C14,12 6,18 0,20 C-6,18 -14,12 -14,0 Z" />
        <path d="M-14,2 C-20,2 -24,-4 -24,-12 C-22,-12 -18,-10 -14,0" />
        <path d="M14,2 C20,2 24,-4 24,-12 C22,-12 18,-10 14,0" />
        <line x1="-6" y1="20" x2="6" y2="20" />
        <line x1="-10" y1="26" x2="10" y2="26" />
      </g>

      {/* Formula A=πr² mid-far-right */}
      <g transform="translate(1020,440)" fill="currentColor" fontFamily="serif" fontSize="22" fontStyle="italic">
        <text>A=πr²</text>
      </g>

      {/* Lightbulb far-right */}
      <g transform="translate(1260,430)" stroke="currentColor" strokeWidth="2.2" fill="none">
        <path d="M0,-22 C-16,-22 -16,0 -8,12 L8,12 C16,0 16,-22 0,-22 Z" />
        <line x1="-6" y1="14" x2="6" y2="14" />
        <line x1="-5" y1="18" x2="5" y2="18" />
        <line x1="0" y1="-26" x2="0" y2="-30" />
      </g>

      {/* ── LOWER-MIDDLE ROW ── */}
      {/* Checkmark lower-left */}
      <g transform="translate(160,620)" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round">
        <polyline points="-12,0 -4,10 14,-14" />
      </g>

      {/* Pencil lower-mid-left */}
      <g transform="translate(360,610) rotate(-40)" stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="0" y="0" width="10" height="46" rx="2" />
        <polygon points="0,46 10,46 5,60" fill="currentColor" stroke="none" />
        <line x1="0" y1="42" x2="10" y2="42" />
      </g>

      {/* Wavy underline lower-mid */}
      <path d="M560,620 Q580,610 600,620 Q620,630 640,620 Q660,610 680,620" stroke="currentColor" strokeWidth="2" fill="none" />

      {/* Atom lower-mid-right */}
      <g transform="translate(880,610)" stroke="currentColor" strokeWidth="1.8" fill="none">
        <ellipse rx="30" ry="13" />
        <ellipse rx="30" ry="13" transform="rotate(60)" />
        <ellipse rx="30" ry="13" transform="rotate(120)" />
        <circle r="4" fill="currentColor" opacity="0.6" />
      </g>

      {/* Graduation cap lower-far-right */}
      <g transform="translate(1140,610) rotate(-10)" stroke="currentColor" strokeWidth="2.2" fill="none">
        <polygon points="0,-16 28,0 0,16 -28,0" />
        <rect x="-6" y="0" width="12" height="18" />
        <ellipse cx="0" cy="18" rx="10" ry="5" />
        <path d="M28,0 L28,12" />
        <circle cx="28" cy="14" r="3" fill="currentColor" />
      </g>

      {/* ── BOTTOM ROW ── */}
      {/* Pencil bottom-left */}
      <g transform="translate(90,800) rotate(-30)" stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="0" y="0" width="10" height="46" rx="2" />
        <polygon points="0,46 10,46 5,60" fill="currentColor" stroke="none" />
        <line x1="0" y1="42" x2="10" y2="42" />
      </g>

      {/* Formula ∫dx bottom-mid-left */}
      <g transform="translate(300,810)" fill="currentColor" fontFamily="serif" fontSize="24" fontStyle="italic">
        <text>∫ f(x) dx</text>
      </g>

      {/* Compass rose bottom-mid */}
      <g transform="translate(540,800)" stroke="currentColor" strokeWidth="1.8" fill="none">
        <circle r="20" />
        <line x1="0" y1="-24" x2="0" y2="-16" />
        <line x1="0" y1="16" x2="0" y2="24" />
        <line x1="-24" y1="0" x2="-16" y2="0" />
        <line x1="16" y1="0" x2="24" y2="0" />
        <polygon points="0,-14 4,-4 0,4 -4,-4" fill="currentColor" opacity="0.6" />
      </g>

      {/* Infinity symbol bottom-mid-right */}
      <g transform="translate(760,810)" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M-30,0 C-30,-16 -10,-16 0,0 C10,16 30,16 30,0 C30,-16 10,-16 0,0 C-10,16 -30,16 -30,0 Z" />
      </g>

      {/* Open book bottom-right */}
      <g transform="translate(980,790)" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M0,0 C-20,-4 -40,-4 -50,0 L-50,40 C-40,36 -20,36 0,40 Z" />
        <path d="M0,0 C20,-4 40,-4 50,0 L50,40 C40,36 20,36 0,40 Z" />
        <line x1="-35" y1="8" x2="-8" y2="8" strokeWidth="1.2" />
        <line x1="8" y1="8" x2="35" y2="8" strokeWidth="1.2" />
      </g>

      {/* Trophy bottom-far-right */}
      <g transform="translate(1240,800)" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M-14,0 C-14,-24 14,-24 14,0 C14,12 6,18 0,20 C-6,18 -14,12 -14,0 Z" />
        <path d="M-14,2 C-20,2 -24,-4 -24,-12 C-22,-12 -18,-10 -14,0" />
        <path d="M14,2 C20,2 24,-4 24,-12 C22,-12 18,-10 14,0" />
        <line x1="-6" y1="20" x2="6" y2="20" />
        <line x1="-10" y1="26" x2="10" y2="26" />
      </g>

      {/* ── SCATTERED STARS (FULL CANVAS) ── */}
      {[
        [200, 160], [420, 120], [800, 150], [1050, 120], [1350, 110],
        [60, 320], [320, 310], [700, 320], [960, 310], [1200, 310],
        [210, 520], [440, 520], [680, 520], [920, 510], [1320, 540],
        [180, 720], [420, 710], [650, 720], [870, 710], [1100, 720], [1300, 710]
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`} stroke="currentColor" strokeWidth="1.4" fill="none">
          <line x1="0" y1="-8" x2="0" y2="8" />
          <line x1="-8" y1="0" x2="8" y2="0" />
          <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" />
          <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5" />
        </g>
      ))}
    </svg>
  );
}

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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      <ScribbleBg />
      <AppHeader />
      <main className="page-wrap fade-in" style={{ position: "relative", zIndex: 1 }}>
        <p className="eyebrow">DASHBOARD</p>
        <h2 style={{ fontSize: 26, marginBottom: 6 }}>Welcome back, {currentUserName().split(" ")[0]}</h2>

        <div
          className="card"
          style={{
            marginTop: 16,
            background: "var(--accent-soft)",
            border: "1.5px solid var(--accent)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
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
          <div className="card" style={{ marginTop: 28 }}>
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
