import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Moon, Users, Share2, MessageCircle, Copy, Download, Check, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { loadProgress, saveProgress, todayStr } from "../data/progressStore.js";
import { QUESTIONS, DAILY_LIMIT } from "../data/questions.js";
import { ZONES } from "../data/zones.js";
import { ZONE_ICONS } from "../data/zoneIcons.js";
import AppHeader from "../components/AppHeader.jsx";

export default function Reflect() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(() => loadProgress(user));
  const [previewZone, setPreviewZone] = useState(null);
  const [showParentView, setShowParentView] = useState(false);

  const answeredToday = progress.lastAnsweredDate === todayStr() ? progress.answeredToday : 0;
  const canAnswerMore = answeredToday < DAILY_LIMIT;
  const done = progress.answers.length;

  const scores = useMemo(() => {
    const s = { Creator: 0, Builder: 0, Thinker: 0, Helper: 0, "Problem-Solver": 0 };
    progress.answers.forEach((a) => { s[a] = (s[a] || 0) + 1; });
    return s;
  }, [progress.answers]);

  const matchedZones = useMemo(() => {
    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (entries.every(([, v]) => v === 0)) return [];
    const top = entries[0][1];
    return entries.filter(([, v]) => v >= top - 1 && v > 0).slice(0, 3).map(([n]) => n);
  }, [scores]);

  function persist(next) {
    setProgress(next);
    saveProgress(user, next);
  }

  function answer(zone) {
    const today = todayStr();
    const sameDay = progress.lastAnsweredDate === today;
    const nextAnsweredToday = sameDay ? progress.answeredToday + 1 : 1;
    const nextAnswers = [...progress.answers, zone];
    const completedDates = sameDay ? progress.completedDates : [...progress.completedDates, today];
    persist({ ...progress, answers: nextAnswers, lastAnsweredDate: today, answeredToday: nextAnsweredToday, completedDates });
  }

  function chooseZone(zone) {
    persist({ ...progress, chosenZone: zone });
  }

  function setJournal(text) {
    setProgress({ ...progress, journal: text });
  }

  function finish() {
    persist({ ...progress, finished: true });
  }

  // ---- render logic ----
  if (progress.finished) {
    return <Decide progress={progress} showParentView={showParentView} setShowParentView={setShowParentView} onRestart={() => { persist({ answers: [], lastAnsweredDate: null, answeredToday: 0, completedDates: progress.completedDates, chosenZone: null, journal: "", finished: false }); }} />;
  }

  if (done >= QUESTIONS.length && progress.chosenZone && !progress.finished) {
    return (
      <Journal
        zone={progress.chosenZone}
        journal={progress.journal}
        setJournal={(t) => { setJournal(t); saveProgress(user, { ...progress, journal: t }); }}
        onBack={() => persist({ ...progress, chosenZone: null })}
        onDecide={finish}
      />
    );
  }

  if (done >= QUESTIONS.length) {
    return (
      <Reveal
        matched={matchedZones}
        previewZone={previewZone}
        setPreviewZone={setPreviewZone}
        onContinue={chooseZone}
      />
    );
  }

  if (!canAnswerMore) {
    return (
      <Shell>
        <div className="fade-in" style={{ maxWidth: 480, textAlign: "center", margin: "0 auto" }}>
          <CircleIcon color="#26344A"><Moon size={28} color="#26344A" /></CircleIcon>
          <p className="eyebrow">THAT'S ENOUGH FOR TODAY</p>
          <h2 style={{ fontSize: 24 }}>{done} of {QUESTIONS.length} done</h2>
          <p className="body-text">
            Reflection works better in small doses than all at once. Come back tomorrow and
            we'll pick up right where you left off — your answers are already saved.
          </p>
          <button className="btn-secondary" onClick={() => navigate("/dashboard")}>Back to dashboard</button>
        </div>
      </Shell>
    );
  }

  const question = QUESTIONS[done];
  return (
    <Shell showBackground>
      <div className="fade-in" style={{ maxWidth: 620, margin: "0 auto" }} key={done}>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {QUESTIONS.map((_, i) => (
            <span key={i} style={{ width: 22, height: 5, borderRadius: 3, background: i <= done ? "var(--accent)" : "var(--border)" }} />
          ))}
        </div>
        <p className="small-text">Today: {answeredToday + 1} of {DAILY_LIMIT}</p>
        <h2 style={{ fontSize: 24, lineHeight: 1.3 }}>{question.q}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
          {question.options.map(([label, zone], i) => (
            <button key={i} onClick={() => answer(zone)} className="option-btn">
              {label}
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ─── Shell ────────────────────────────────────────────────── */
const BACKGROUND_ZONES = [
  { name: "Creator",       color: "#8C5B8F", x: "8%",  y: "12%", size: 48, dur: "14s", delay: "0s"   },
  { name: "Builder",       color: "#B4772F", x: "82%", y: "8%",  size: 40, dur: "18s", delay: "-4s"  },
  { name: "Thinker",       color: "#3E5C86", x: "72%", y: "70%", size: 44, dur: "16s", delay: "-7s"  },
  { name: "Helper",        color: "#C15B5B", x: "15%", y: "75%", size: 36, dur: "20s", delay: "-2s"  },
  { name: "Problem-Solver",color: "#3F7A6E", x: "50%", y: "88%", size: 42, dur: "15s", delay: "-10s" },
  { name: "Creator",       color: "#8C5B8F", x: "90%", y: "40%", size: 32, dur: "22s", delay: "-5s"  },
  { name: "Thinker",       color: "#3E5C86", x: "5%",  y: "48%", size: 34, dur: "17s", delay: "-8s"  },
];

function Shell({ children, showBackground = false }) {
  return (
    <div className={showBackground ? "quiz-shell" : ""} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {showBackground && (
        <div className="quiz-bg-layer" aria-hidden="true">
          {BACKGROUND_ZONES.map((z, i) => {
            const Icon = ZONE_ICONS[z.name];
            return (
              <div
                key={i}
                className="quiz-bg-icon"
                style={{
                  left: z.x,
                  top: z.y,
                  animationDuration: z.dur,
                  animationDelay: z.delay,
                  color: z.color,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Icon size={z.size} color={z.color} />
              </div>
            );
          })}
        </div>
      )}
      <AppHeader />
      <main className="page-wrap" style={{ display: "flex", alignItems: "center", flex: 1, position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%" }}>{children}</div>
      </main>
    </div>
  );
}

/* ─── CircleIcon ────────────────────────────────────────────── */
function CircleIcon({ color, children, pulse = false }) {
  return (
    <div
      style={{
        width: 110, height: 110, borderRadius: "50%",
        border: `2px solid ${color}`,
        background: `${color}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px auto",
        animation: pulse ? `pulseGlow 2.8s ease-in-out infinite` : "none",
        "--glow-color": `${color}33`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Reveal ────────────────────────────────────────────────── */
function Reveal({ matched, previewZone, setPreviewZone, onContinue }) {
  const allZones = Object.keys(ZONES);
  const active = previewZone || matched[0];

  return (
    <Shell>
      <div className="fade-in" style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <p className="eyebrow">YOUR ZONES</p>
        <h2 style={{ fontSize: 26 }}>{matched.length} {matched.length === 1 ? "zone stands out" : "zones stand out"} for you</h2>
        <p className="body-text">Tap a zone to preview what the work actually looks like.</p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 24 }}>
          {allZones.map((name) => {
            const isMatched = matched.includes(name);
            const isActive = active === name;
            const Icon = ZONE_ICONS[name];
            return (
              <button
                key={name}
                onClick={() => isMatched && setPreviewZone(name)}
                disabled={!isMatched}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  width: 104, height: 104, borderRadius: "50%",
                  border: `1.5px solid ${isMatched ? ZONES[name].color : "var(--border)"}`,
                  background: isMatched ? `${ZONES[name].color}14` : "var(--surface)",
                  opacity: isMatched ? 1 : 0.35,
                  cursor: isMatched ? "pointer" : "default",
                  boxShadow: isActive && isMatched ? `0 0 0 3px ${ZONES[name].color}33` : "none",
                }}
              >
                <Icon size={22} color={isMatched ? ZONES[name].color : "var(--ink-muted)"} />
                <span style={{ fontSize: 13, marginTop: 6, color: isMatched ? "var(--ink)" : "var(--ink-muted)" }}>{name}</span>
              </button>
            );
          })}
        </div>

        {active && (
          <div className="card fade-in" style={{ marginTop: 28, textAlign: "left" }} key={active}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: ZONES[active].color, margin: 0 }}>{ZONES[active].tag}</p>
            <h3 style={{ fontSize: 22, margin: "4px 0 8px 0" }}>{active}</h3>
            <p className="body-text">{ZONES[active].line}</p>
            <p className="small-text">A day-in-the-life might include:</p>
            <ul style={{ paddingLeft: 20 }}>{ZONES[active].day.map((d, i) => <li key={i} className="body-text" style={{ margin: "4px 0" }}>{d}</li>)}</ul>
            <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => onContinue(active)}>
              This feels like me <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
          </div>
        )}
      </div>
    </Shell>
  );
}

/* ─── Journal ───────────────────────────────────────────────── */
function Journal({ zone, journal, setJournal, onBack, onDecide }) {
  const z = ZONES[zone];
  return (
    <Shell>
      <div className="fade-in" style={{ maxWidth: 560, margin: "0 auto" }}>
        <p className="eyebrow">YOUR REASONING</p>
        <h2 style={{ fontSize: 24 }}>Why {zone.toLowerCase()}, in your own words?</h2>
        <p className="body-text">Nobody sees this but you. Ownership starts with writing it down yourself.</p>
        <textarea
          className="input-field"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder={`What is it about ${z.tag.toLowerCase()} that pulls you in?`}
          rows={6}
          style={{ resize: "vertical" }}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button className="btn-secondary" onClick={onBack}>Back to zones</button>
          <button className="btn-primary" disabled={journal.trim().length < 10} onClick={onDecide}>
            Own this decision <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Decide ────────────────────────────────────────────────── */
function Decide({ progress, showParentView, setShowParentView, onRestart }) {
  const zone = progress.chosenZone;
  const z = ZONES[zone];
  const Icon = ZONE_ICONS[zone];
  const summaryRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const shareText = `✨ ${zone} — Beyond Marks\n\n${z.line}\n\nThrough a series of low-pressure reflections, my child showed a consistent pull toward ${zone}.\n\nThis isn't a test result or a ranking — it's a reflection of patterns in how they naturally think and act.\n\n— Beyond Marks`;

  function handleWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  async function handleDownload() {
    if (!summaryRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(summaryRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        // Fix: Google Fonts (Inter) causes word-spacing to break in html2canvas.
        // onclone lets us patch the cloned DOM before rendering.
        onclone: (_doc, el) => {
          el.querySelectorAll("*").forEach((node) => {
            node.style.letterSpacing = "normal";
            node.style.wordSpacing = "normal";
            // Swap custom fonts to a safe system stack that html2canvas handles correctly
            const computed = window.getComputedStyle(node);
            const ff = computed.fontFamily || "";
            if (ff.includes("Fraunces")) {
              node.style.fontFamily = "Georgia, 'Times New Roman', serif";
            } else if (ff.includes("Inter")) {
              node.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";
            }
          });
        },
      });
      const link = document.createElement("a");
      link.download = `beyond-marks-${zone.toLowerCase().replace(/\s/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Download failed", e);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <Shell>
      <div className="scale-in" style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
        {/* ── Icon with glow ── */}
        <CircleIcon color={z.color} pulse>
          <Icon size={42} color={z.color} />
        </CircleIcon>

        {/* ── Zone label pill ── */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${z.color}18`, border: `1px solid ${z.color}40`, borderRadius: 99, padding: "4px 14px", marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: z.color }}>THE DECISION IS YOURS</span>
        </div>

        {/* ── Zone name (big!) ── */}
        <h1 style={{
          fontSize: "clamp(44px, 10vw, 64px)",
          lineHeight: 1.05,
          marginBottom: 0,
          background: `linear-gradient(135deg, var(--ink) 40%, ${z.color} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {zone}
        </h1>

        {/* ── Journal quote ── */}
        {progress.journal && (
          <div style={{ margin: "20px auto", maxWidth: 440, borderLeft: `3px solid ${z.color}`, paddingLeft: 16, textAlign: "left" }}>
            <p style={{ fontStyle: "italic", fontSize: 17, lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>
              "{progress.journal}"
            </p>
          </div>
        )}

        {/* ── Description ── */}
        <p className="body-text" style={{ fontSize: 15.5, marginTop: 16 }}>
          This isn't a verdict — it's a starting point. Explore {z.paths[0].course.toLowerCase()} and{" "}
          {z.paths[1].course.toLowerCase()}, talk to people already doing this work, and keep
          listening to yourself as you go.
        </p>

        {/* ── Career Path Chips ── */}
        <div style={{ marginTop: 20, marginBottom: 4 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>Paths to explore</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {z.paths.map((p, i) => (
              <span key={i} style={{
                display: "inline-block",
                background: `${z.color}12`,
                border: `1px solid ${z.color}30`,
                borderRadius: 99,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: z.color,
              }}>
                {p.course}
              </span>
            ))}
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="result-buttons" style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <button
            className="btn-secondary"
            onClick={() => setShowParentView(!showParentView)}
            style={showParentView ? { borderColor: "var(--accent)", background: "var(--accent-soft)" } : {}}
          >
            <Users size={15} style={{ marginRight: 8 }} />
            Parent-safe summary
          </button>
          <button className="btn-secondary" onClick={onRestart}>Start over</button>
        </div>

        {/* ── Parent Summary Card ── */}
        {showParentView && (
          <div className="card fade-in" style={{ marginTop: 24, textAlign: "left" }}>
            {/* Capturable region */}
            <div ref={summaryRef} style={{ background: "var(--surface)", borderRadius: 14, overflow: "hidden" }}>
              {/* Card header accent strip */}
              <div style={{ height: 5, background: `linear-gradient(90deg, ${z.color}, ${z.color}55)`, marginBottom: 0 }} />
              <div style={{ padding: "22px 22px 16px 22px" }}>
                <p className="eyebrow" style={{ marginBottom: 6 }}>SHAREABLE SUMMARY</p>
                <h3 style={{ fontSize: 22, marginBottom: 12 }}>What we found</h3>
                <p className="body-text">
                  Through a series of low-pressure reflections, your child showed a consistent
                  pull toward <strong>{zone}</strong> — {z.line.toLowerCase()}
                </p>
                <p className="body-text">
                  This isn't a test result or a ranking — it's a reflection of patterns in how
                  they naturally think and act, meant to open a conversation, not close one.
                </p>

                {/* BEYOND MARKS watermark footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2L9.2 5.8H13.2L10 8.2L11.2 12L8 9.6L4.8 12L6 8.2L2.8 5.8H6.8L8 2Z" fill="white"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "var(--ink-muted)" }}>
                      BEYOND <span style={{ color: "var(--accent)" }}>MARKS</span>
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--ink-muted)", fontStyle: "italic" }}>beyond-marks.app</span>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 10 }}>Share this summary</p>
              <div className="share-row" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="share-btn whatsapp" onClick={handleWhatsApp} id="share-whatsapp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.855L.057 23.267a.75.75 0 0 0 .913.96l5.556-1.455A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.013-1.378l-.36-.213-3.713.973.99-3.613-.234-.371A9.818 9.818 0 1 1 12 21.818z"/>
                  </svg>
                  WhatsApp
                </button>
                <button className="share-btn copy" onClick={handleCopy} id="share-copy">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy text"}
                </button>
                <button className="share-btn download" onClick={handleDownload} disabled={downloading} id="share-download">
                  <Download size={14} />
                  {downloading ? "Saving…" : "Save image"}
                </button>
              </div>
            </div>

            <button className="btn-secondary" style={{ marginTop: 18, fontSize: 13.5 }} onClick={() => setShowParentView(false)}>
              <X size={14} style={{ marginRight: 6 }} /> Close
            </button>
          </div>
        )}
      </div>
    </Shell>
  );
}
