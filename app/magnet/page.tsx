"use client";

import { useState } from "react";
import Image from "next/image";

const QUESTIONS = [
  {
    num: "01",
    q: "כשהוא שולח לך הודעות מהבית בשעות אחר הצהריים — מה התגובה הראשונה שלך?",
    hint: "פתרון מהיר? תסכול? דאגה? האם שאלת את עצמך מה הוא צריך ממך רגשית באותו הרגע?",
  },
  {
    num: "02",
    q: "כמה זמן עבר מאז שסתכלת לו בעיניים — רק כדי לראות אותו, לא כדי לפתור או לנזוף?",
    hint: "",
  },
  {
    num: "03",
    q: "כשהוא מתפרץ, מה הסיפור שאת מספרת לעצמך?",
    hint: '"הוא חצוף"? "הוא לא מעריך אותי"? "מה עשיתי לא נכון"?',
  },
  {
    num: "04",
    q: 'ידעת שהשעות שבהן הוא לבד בבית — 13:00 עד 17:00 — הן הקריטיות ביותר לכיוון שבו המצפן שלו מתפתח?',
    hint: "בגיל הזה, המוח שלו מחפש כתובת. אם לא את — הוא ימצא אחרת.",
  },
  {
    num: "05",
    q: "כשהוא בוחר חברים על פניך — מה את מרגישה? ומה את עושה עם זה?",
    hint: "",
  },
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
      const a = document.createElement("a");
      a.href = "/lead-magnet.pdf";
      a.download = "שאלון גיל הגשר - הדר ארקדש.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
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
  };

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
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Image
            src="/logo.svg"
            alt="הדר ארקדש"
            width={200}
            height={70}
            style={{ height: 64, width: "auto", display: "inline-block" }}
            priority
          />
        </div>

        {/* תג */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <span style={{ display: "inline-block", width: 32, height: 2, backgroundColor: "#dda96a" }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#b16039" }}>
            שאלון חינמי
          </span>
        </div>

        {/* כותרת */}
        <h1
          style={{
            fontSize: "clamp(26px, 6.5vw, 38px)",
            fontWeight: 800,
            lineHeight: 1.25,
            color: "#233349",
            margin: "0 0 16px",
          }}
        >
          5 שאלות שאמהות לילדים
          <br />
          בגיל 7-11 לא עוצרות
          <br />
          <span style={{ color: "#A0522D" }}>לשאול את עצמן.</span>
        </h1>

        {/* תת-כותרת */}
        <p style={{ fontSize: 18, lineHeight: 1.8, color: "#233349", opacity: 0.72, margin: "0 0 36px" }}>
          לא מדריך. לא טיפים. שאלות שגורמות לך לעצור — ולראות משהו שאולי לא ראית עד עכשיו.
        </p>

        {/* קו */}
        <div style={{ height: 1, backgroundColor: "#233349", opacity: 0.1, marginBottom: 32 }} />

        {/* הסבר קצר */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRight: "4px solid #dda96a",
            padding: "20px 20px 20px 16px",
            marginBottom: 36,
          }}
        >
          <p style={{ fontSize: 15, fontWeight: 700, color: "#233349", margin: "0 0 8px" }}>
            על קצה המזלג: מה זה גיל הגשר?
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#233349", opacity: 0.68, margin: 0 }}>
            גיל 7-11 הוא לא גיל ההתבגרות מוקדם. זה גיל שבו המוח של הילד עובר שינוי ביולוגי אמיתי — הוא מתחיל לחפש שייכות מחוץ לבית. החברים, המסכים, הקבוצה — הם לא "הגיל". הם מה שממלא את החלל שנוצר כשאין מבוגר שמחזיק אותו. וחלון ההזדמנויות הזה — הוא לא ייפתח שוב.
          </p>
        </div>

        {/* 5 שאלות */}
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#b16039", marginBottom: 16 }}>
          5 שאלות להתבוננות
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 40 }}>
          {QUESTIONS.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: i < QUESTIONS.length - 1 ? "1px solid rgba(35,51,73,0.08)" : "none",
                padding: "20px 0",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "rgba(221,169,106,0.6)",
                  flexShrink: 0,
                  marginTop: 2,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "0.05em",
                }}
              >
                {item.num}
              </span>
              <div>
                <p style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.6, color: "#233349", margin: 0 }}>
                  {item.q}
                </p>
                {item.hint && (
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "#233349", opacity: 0.48, margin: "6px 0 0", fontStyle: "italic" }}>
                    {item.hint}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* קו */}
        <div style={{ height: 1, backgroundColor: "#233349", opacity: 0.1, marginBottom: 32 }} />

        {/* גשר לאתגר */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: "#233349", margin: "0 0 10px", lineHeight: 1.4 }}>
            אם השאלות האלו נגעו בך —
            <br />
            <span style={{ color: "#A0522D" }}>אתגר הגשר בשבילך.</span>
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#233349", opacity: 0.68, margin: 0 }}>
            3 ימים. הודעה אחת בבוקר. תובנה אחת, משימה אחת ליום.
            <br />
            לא רק להבין — לפעול. מחר, בבית שלך.
          </p>
        </div>

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
              נרשמת! 🎉
            </p>
            <p style={{ fontSize: 16, color: "#233349", opacity: 0.65, margin: "0 0 8px", lineHeight: 1.7 }}>
              השאלון יורד עכשיו למכשיר שלך.
            </p>
            <p style={{ fontSize: 15, color: "#233349", opacity: 0.55, margin: "0 0 24px", lineHeight: 1.7 }}>
              תוך 24 שעות תקבלי הודעה עם כל הפרטים על אתגר הגשר.
            </p>
            <a
              href="/lead-magnet.pdf"
              download="שאלון גיל הגשר - הדר ארקדש.pdf"
              style={{
                display: "inline-block",
                backgroundColor: "#A0522D",
                color: "#fff",
                fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
                fontWeight: 700,
                fontSize: 16,
                padding: "13px 32px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(160,82,45,0.3)",
              }}
            >
              הורידי את השאלון ←
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="text"
              placeholder="שם פרטי"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="כתובת מייל"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
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
              {status === "loading" ? "שולחת..." : "אני רוצה להצטרף לאתגר הגשר ←"}
            </button>

            {status === "error" && (
              <p style={{ fontSize: 14, color: "#b16039", textAlign: "center", margin: 0 }}>
                משהו השתבש — נסי שוב.
              </p>
            )}

            <p style={{ fontSize: 12, color: "#233349", opacity: 0.38, textAlign: "center", margin: "4px 0 0", lineHeight: 1.6 }}>
              ללא ספאם. בכל עת ניתן להסיר.{" "}
              <a href="/privacy" style={{ color: "#b16039", textDecoration: "underline" }}>
                מדיניות פרטיות
              </a>
            </p>
          </form>
        )}

        {/* קו */}
        <div style={{ height: 1, backgroundColor: "#233349", opacity: 0.1, marginTop: 48, marginBottom: 32 }} />

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
            <p style={{ fontSize: 15, fontWeight: 700, color: "#233349", margin: "0 0 3px" }}>הדר ארקדש</p>
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
