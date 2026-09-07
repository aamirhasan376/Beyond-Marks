import React from "react";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "24px",
      textAlign: "center",
      fontSize: 13,
      color: "var(--ink-muted)",
    }}>
      <div style={{ fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 }}>BEYOND MARKS</div>
      <div>All rights reserved</div>
      <div>Designed &amp; Developed by Mohammed Amir Hasan</div>
    </footer>
  );
}
