import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Moon, Users } from "lucide-react";
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
    return <Reveal matched={matchedZones} previewZone={previewZone} setPreviewZone={setPreviewZone} onContinue={chooseZone} />;
  }

  if (!canAnswerMore) {
    return (
      <Shell>
        <div className="fade-in" style={{ maxWidth: 480, textAlign: "center", margin: "0 auto" }}>
          <CircleIcon color="#1F3A2E"><Moon size={28} color="#1F3A2E" /></CircleIcon>
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
    <Shell>
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
            <button key={i} onClick={() => answer(zone)} className="option-btn">{label}</button>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppHeader />
      <main className="page-wrap" style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <div style={{ width: "100%" }}>{children}</div>
      </main>
    </div>
  );
}

function CircleIcon({ color, children }) {
  return (
    <div style={{ width: 88, height: 88, borderRadius: "50%", border: `1.5px solid ${color}`, background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
      {children}
    </div>
  );
}

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

function Decide({ progress, showParentView, setShowParentView, onRestart }) {
  const zone = progress.chosenZone;
  const z = ZONES[zone];
  const Icon = ZONE_ICONS[zone];
  return (
    <Shell>
      <div className="fade-in" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <CircleIcon color={z.color}><Icon size={32} color={z.color} /></CircleIcon>
        <p className="eyebrow">THE DECISION IS YOURS</p>
        <h1 style={{ fontSize: 36 }}>{zone}</h1>
        <p className="body-text" style={{ fontStyle: "italic" }}>"{progress.journal}"</p>
        <p className="small-text">
          This isn't a verdict — it's a starting point. Explore {z.paths[0].course.toLowerCase()} and{" "}
          {z.paths[1].course.toLowerCase()}, talk to people already doing this work, and keep
          listening to yourself as you go.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          <button className="btn-secondary" onClick={() => setShowParentView(true)}>
            <Users size={15} style={{ marginRight: 8 }} /> Parent-safe summary
          </button>
          <button className="btn-secondary" onClick={onRestart}>Start over</button>
        </div>

        {showParentView && (
          <div className="card fade-in" style={{ marginTop: 24, textAlign: "left" }}>
            <p className="eyebrow">SHAREABLE SUMMARY</p>
            <h3 style={{ fontSize: 20 }}>What we found</h3>
            <p className="body-text">
              Through a series of low-pressure reflections, your child showed a consistent
              pull toward <strong>{zone}</strong> — {z.line.toLowerCase()}
            </p>
            <p className="body-text">
              This isn't a test result or a ranking — it's a reflection of patterns in how
              they naturally think and act, meant to open a conversation, not close one.
            </p>
            <button className="btn-secondary" onClick={() => setShowParentView(false)}>Close</button>
          </div>
        )}
      </div>
    </Shell>
  );
}
