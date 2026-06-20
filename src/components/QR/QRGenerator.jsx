import { useState } from "react";

const GREEN = "#071810";
const GOLD = "#F5C400";
const CREAM = "#F5F0E8";

export default function QRGenerator() {
  const [url, setUrl] = useState("https://campmahogany2026.ca/register");
  const [inputVal, setInputVal] = useState("https://campmahogany2026.ca/register");
  const [copied, setCopied] = useState(false);

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=071810&bgcolor=F5F0E8&data=${encodeURIComponent(url)}&qzone=1&format=png`;

  const apply = () => {
    if (inputVal.trim()) setUrl(inputVal.trim());
  };

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: "#1a1a1a",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "36px 16px",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      gap: 28,
    }}>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: GOLD, textTransform: "uppercase", marginBottom: 6 }}>
          Camp Mahogany 2026
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: 1 }}>
          Registration QR Code
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
          Paste your form link below — the QR updates instantly
        </div>
      </div>

      {/* URL input */}
      <div style={{ width: "100%", maxWidth: 560 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
          Registration Form URL
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && apply()}
            placeholder="Paste your Google Form or hosted link here..."
            style={{
              flex: 1, padding: "12px 16px",
              borderRadius: 8, border: `2px solid rgba(245,196,0,0.3)`,
              background: "rgba(255,255,255,0.06)", color: "#fff",
              fontSize: 13, fontFamily: "inherit", outline: "none",
            }}
          />
          <button onClick={apply} style={{
            background: GOLD, color: GREEN, border: "none",
            borderRadius: 8, padding: "12px 20px",
            fontWeight: 900, fontSize: 13, cursor: "pointer",
            letterSpacing: 1, textTransform: "uppercase",
            fontFamily: "inherit", whiteSpace: "nowrap",
          }}>
            Generate
          </button>
        </div>
      </div>

      {/* QR Card — print ready */}
      <div style={{
        background: CREAM,
        borderRadius: 16,
        padding: "32px 40px",
        boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        width: 340,
      }}>

        {/* Card header */}
        <div style={{
          background: GREEN,
          borderRadius: "10px 10px 0 0",
          padding: "10px 24px",
          marginBottom: 20,
          alignSelf: "stretch",
          textAlign: "center",
          margin: "-32px -40px 24px -40px",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 2 }}>
            Summer 2026
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: 2 }}>
            CAMP <span style={{ color: GOLD }}>MAHOGANY</span>
          </div>
        </div>

        {/* Scan label */}
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 3,
          textTransform: "uppercase", color: GREEN, opacity: 0.6,
          marginBottom: 12,
        }}>
          📱 Scan to Register
        </div>

        {/* QR image */}
        <div style={{
          border: `4px solid ${GREEN}`,
          borderRadius: 12,
          overflow: "hidden",
          width: 210, height: 210,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: CREAM,
        }}>
          <img
            src={qrSrc}
            alt="Registration QR Code"
            width={210} height={210}
            style={{ display: "block" }}
          />
        </div>

        {/* Or text */}
        <div style={{
          fontSize: 11, color: "#888", marginTop: 16, marginBottom: 4,
          fontWeight: 600, letterSpacing: 1,
        }}>
          — or visit —
        </div>

        {/* URL display */}
        <div style={{
          fontSize: 11, fontWeight: 700, color: GREEN,
          wordBreak: "break-all", textAlign: "center",
          padding: "6px 12px",
          background: "rgba(7,24,16,0.06)",
          borderRadius: 6,
          lineHeight: 1.5,
          maxWidth: 240,
        }}>
          {url}
        </div>

        {/* Urgency */}
        <div style={{
          marginTop: 18,
          background: GREEN,
          color: GOLD,
          borderRadius: 50,
          padding: "7px 20px",
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}>
          ⚡ Limited Spots — Register Now
        </div>

        {/* Footer info */}
        <div style={{
          marginTop: 16,
          fontSize: 11,
          color: "#666",
          textAlign: "center",
          lineHeight: 1.7,
        }}>
          July 6 – Aug 7, 2026 &nbsp;·&nbsp; Ages 4–10/11<br />
          9:30AM–4:30PM &nbsp;·&nbsp; Brampton, ON
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={copy} style={{
          background: copied ? "#2ecc71" : "rgba(255,255,255,0.1)",
          color: "#fff", border: "2px solid rgba(255,255,255,0.15)",
          borderRadius: 8, padding: "11px 22px",
          fontWeight: 700, fontSize: 13, cursor: "pointer",
          fontFamily: "inherit", transition: "all 0.2s",
        }}>
          {copied ? "✓ Copied!" : "📋 Copy Link"}
        </button>

        <a
          href={qrSrc}
          download="camp-mahogany-qr.png"
          style={{
            background: GOLD, color: GREEN,
            border: "none", borderRadius: 8,
            padding: "11px 22px", fontWeight: 900,
            fontSize: 13, cursor: "pointer",
            fontFamily: "inherit", textDecoration: "none",
            letterSpacing: 0.5,
          }}>
          ⬇ Download QR Image
        </a>

        <button onClick={() => window.print()} style={{
          background: GREEN, color: GOLD,
          border: "none", borderRadius: 8,
          padding: "11px 22px", fontWeight: 900,
          fontSize: 13, cursor: "pointer",
          fontFamily: "inherit", letterSpacing: 0.5,
        }}>
          🖨 Print Card
        </button>
      </div>

      {/* How to use */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12, padding: "20px 24px",
        maxWidth: 560, width: "100%",
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: GOLD, textTransform: "uppercase", marginBottom: 14 }}>
          How to use this
        </div>
        {[
          ["1. Get your form link", "Set up your Google Form or hosted registration page. Copy the link."],
          ["2. Paste it above", "Replace the placeholder URL and hit Generate — the QR updates instantly."],
          ["3. Download the QR", "Hit Download QR Image to save the PNG. Drop it into your flyer design."],
          ["4. Print & post", "Add the card anywhere — lobby, elevators, bulletin boards, Facebook posts."],
        ].map(([step, desc]) => (
          <div key={step} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <div style={{
              fontSize: 10, fontWeight: 900, color: GREEN,
              background: GOLD, borderRadius: 4,
              padding: "3px 8px", whiteSpace: "nowrap", flexShrink: 0,
            }}>
              {step}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
              {desc}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
