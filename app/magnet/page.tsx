"use client";

import { useState } from "react";
import Image from "next/image";

const BULLETS = [
  "למה הילד שלך השתנה — ולמה זה לא גיל ההתבגרות",
  "מה המוח שלו עושה בגיל 7-11 וכיצד זה משפיע עליכם",
  'מדוע "מוכוונות חברים" היא תופעה — ואיך נשארת הדמות המשמעותית שלו',
];

export default function MagnetPage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      // trigger automatic download
      const a = document.createElement("a");
      a.href = "/lead-magnet.pdf";
      a.download = "מדריך גיל הגשר - הדר ארקדש.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setStatus("error");
    }
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F4F2",
        fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
        color: "#233349",
        direction: "rtl",
      }}
    >
      <div style={{ maxWidth: 580, margin: "0 auto", padding: "40px 24px 72px" }}>

        {/* לוגו */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Image
            src="/logo.svg"
            alt="הדר ארקדש"
            width={160}
            height={56}
            style={{ height: 44, width: "auto", display: "inline-block" }}
            priority
          />
        </div>

        {/* תג */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ display: "inline-block", width: 32, height: 2, backgroundColor: "#dda96a" }} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#b16039",
            }}
          >
            מדריך בחינם
          </span>
        </div>

        {/* כותרת */}
        <h1
          style={{
            fontSize: "clamp(26px, 6.5vw, 38px)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#233349",
            margin: "0 0 14px",
          }}
        >
          הילד שלי השתנה.
          <br />
          <span style={{ color: "#A0522D" }}>מה באמת קורה בגיל 7-11?</span>
        </h1>

        {/* תת-כותרת */}
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            color: "#233349",
            opacity: 0.72,
            margin: "0 0 32px",
          }}
        >
          מדריך מתנה שמסביר את הביולוגיה, את הפסיכולוגיה, ואת מה שיכולה לעשות
          עכשיו — כדי לא לפספס את חלון ההזדמנויות הזה.
        </p>

        {/* קו */}
        <div style={{ height: 1, backgroundColor: "#233349", opacity: 0.1, marginBottom: 28 }} />

        {/* מה תלמדי */}
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#b16039",
            marginBottom: 14,
          }}
        >
          במדריך תמצאי
        </p>
        <div style={{ marginBottom: 36, display: "flex", flexDirection: "column", gap: 12 }}>
          {BULLETS.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: "rgba(160,82,45,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#A0522D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#233349", opacity: 0.8, margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>

        {/* קו */}
        <div style={{ height: 1, backgroundColor: "#233349", opacity: 0.1, marginBottom: 28 }} />

        {/* טופס / הצלחה */}
        {status === "success" ? (
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(35,51,73,0.1)",
              padding: "36px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "rgba(160,82,45,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A0522D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, color: "#233349", margin: "0 0 8px" }}>
              המדריך שלך מוכן!
            </p>
            <p style={{ fontSize: 16, color: "#233349", opacity: 0.6, margin: "0 0 26px" }}>
              לחצי להוריד ישירות
            </p>
            <a
              href="/lead-magnet.pdf"
              download="מדריך גיל הגשר - הדר ארקדש.pdf"
              style={{
                display: "inline-block",
                backgroundColor: "#A0522D",
                color: "#fff",
                fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
                fontWeight: 700,
                fontSize: 17,
                padding: "14px 36px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(160,82,45,0.35)",
              }}
            >
              ← הורידי את המדריך
            </a>
            <p style={{ fontSize: 13, color: "#233349", opacity: 0.35, marginTop: 16 }}>
              ההורדה מתחילה אוטומטית
            </p>
          </div>
        ) : (
          <>
            <p
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#233349",
                margin: "0 0 18px",
              }}
            >
              איפה לשלוח את המדריך?
            </p>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <input
                type="text"
                placeholder="שם פרטי"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: 16,
                  border: "1px solid rgba(35,51,73,0.22)",
                  backgroundColor: "#fff",
                  color: "#233349",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
                  direction: "rtl",
                  textAlign: "right",
                }}
              />
              <input
                type="email"
                placeholder="כתובת מייל"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: 16,
                  border: "1px solid rgba(35,51,73,0.22)",
                  backgroundColor: "#fff",
                  color: "#233349",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
                  direction: "rtl",
                  textAlign: "right",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: 17,
                  fontWeight: 700,
                  backgroundColor: "#A0522D",
                  color: "#fff",
                  border: "none",
                  cursor: status === "loading" ? "default" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1,
                  fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
                  marginTop: 4,
                  boxShadow: "0 4px 20px rgba(160,82,45,0.3)",
                }}
              >
                {status === "loading" ? "שולחת..." : "שלחי לי את המדריך ←"}
              </button>

              {status === "error" && (
                <p style={{ fontSize: 14, color: "#b16039", textAlign: "center", margin: 0 }}>
                  משהו השתבש — נסי שוב.
                </p>
              )}

              <p style={{ fontSize: 13, color: "#233349", opacity: 0.4, textAlign: "center", margin: "4px 0 0" }}>
                ללא ספאם. בכל עת ניתן להסיר.
              </p>
            </form>
          </>
        )}

        {/* קו */}
        <div style={{ height: 1, backgroundColor: "#233349", opacity: 0.1, marginTop: 44, marginBottom: 30 }} />

        {/* חתימה */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: "2px solid rgba(221,169,106,0.4)",
            }}
          >
            <Image
              src="/hadar.jpg"
              alt="הדר ארקדש"
              width={48}
              height={48}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#233349", margin: "0 0 3px" }}>
              הדר ארקדש
            </p>
            <p style={{ fontSize: 13, color: "#233349", opacity: 0.5, margin: 0, lineHeight: 1.6 }}>
              מדריכת הורים בגישה ההיקשרותית-התפתחותית
              <br />
              ייעוץ זוגי בשיטת EFT
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
