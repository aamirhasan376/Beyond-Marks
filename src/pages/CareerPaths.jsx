import React, { useState } from "react";
import { ZONES, ZONE_NAMES } from "../data/zones.js";
import { ZONE_ICONS } from "../data/zoneIcons.js";
import AppHeader from "../components/AppHeader.jsx";

export default function CareerPaths() {
  const [active, setActive] = useState(ZONE_NAMES[0]);
  const z = ZONES[active];
  const Icon = ZONE_ICONS[active];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppHeader />
      <main className="page-wrap fade-in">
        <p className="eyebrow">CAREER PATHS</p>
        <h2 style={{ fontSize: 26 }}>Every way forward, across all 5 zones</h2>
        <p className="body-text">
          These aren't locked to your quiz result — explore any zone, whether or not it matched you.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          {ZONE_NAMES.map((name) => {
            const isActive = name === active;
            const ZIcon = ZONE_ICONS[name];
            return (
              <button
                key={name}
                onClick={() => setActive(name)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 16px", borderRadius: 999,
                  border: `1.5px solid ${isActive ? ZONES[name].color : "var(--border-strong)"}`,
                  background: isActive ? `${ZONES[name].color}14` : "transparent",
                  color: isActive ? ZONES[name].color : "var(--ink)",
                  fontWeight: 600, fontSize: 13.5, cursor: "pointer",
                }}
              >
                <ZIcon size={15} /> {name}
              </button>
            );
          })}
        </div>

        <div className="card fade-in" style={{ marginTop: 20 }} key={active}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${z.color}`, background: `${z.color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} color={z.color} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{active}</div>
              <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{z.tag}</div>
            </div>
          </div>
          <p className="body-text">{z.line}</p>

          <p className="small-text">Courses &amp; where to find them</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {z.paths.map((p, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{p.course}</div>
                <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 2 }}>{p.where}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
