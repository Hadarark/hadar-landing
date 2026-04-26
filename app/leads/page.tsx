"use client";

import { useState } from "react";
import Image from "next/image";

// ─── טקסטים — החליפי בטקסט שלך ─────────────────────────────────────────────

const OPENING_PARAGRAPHS = [
  "יש רגע — לא תמיד ברור מתי בדיוק — שמבינים שמשהו השתנה. הילד שידעת קצת פחות פה. קצת יותר רחוק. והשיחות שפעם זרמו, היום... מסתיימות בדלת.",
  "זה לא גיל ההתבגרות. זה לא שהוא לא אוהב אותך. זה גיל הגשר — 7 עד 11 — גיל עם שינויים ביולוגיים אמיתיים במוח, שאף אחד לא מסביר מספיק. והחדשות הטובות? זה גם חלון ההזדמנויות הכי משמעותי שיש לך.",
  "סדרת המפגשים הזו נולדה מתוך הניסיון הזה — עם הבת שלי, ועם עשרות אמהות שפגשתי בדרך. נדבר על מה קורה שם, על מה קורה בנו, ועל איך מחזירים את הקשר הביתה. בלי אשמה. עם הרבה כלים.",
];

// ─────────────────────────────────────────────────────────────────────────────

export default function LeadsPage() {
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
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "48px 24px 64px",
        }}
      >
        {/* לוגו */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Image
            src="/logo.svg"
            alt="הדר ארקדש"
            width={160}
            height={56}
            style={{ height: 48, width: "auto", display: "inline-block" }}
            priority
          />
        </div>

        {/* קו זהב */}
        <div
          style={{
            height: 2,
            backgroundColor: "#dda96a",
            width: 48,
            marginBottom: 36,
          }}
        />

        {/* כותרת ראשית */}
        <h1
          style={{
            fontSize: "clamp(28px, 7vw, 38px)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#233349",
            margin: 0,
            marginBottom: 14,
          }}
        >
          לראות את הילד שלי מחדש
        </h1>

        {/* תת-כותרת */}
        <p
          style={{
            fontSize: 17,
            color: "#6a7459",
            fontWeight: 600,
            margin: 0,
            marginBottom: 40,
            letterSpacing: "0.01em",
          }}
        >
          סדרת מפגשים לאמהות בגיל הגשר
        </p>

        {/* קו מפריד */}
        <div
          style={{
            height: 1,
            backgroundColor: "#233349",
            opacity: 0.1,
            marginBottom: 36,
          }}
        />

        {/* 3 פסקאות פתיחה */}
        <div style={{ marginBottom: 44 }}>
          {OPENING_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: "#233349",
                opacity: 0.78,
                margin: 0,
                marginBottom: i < OPENING_PARAGRAPHS.length - 1 ? 20 : 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* קו מפריד */}
        <div
          style={{
            height: 1,
            backgroundColor: "#233349",
            opacity: 0.1,
            marginBottom: 36,
          }}
        />

        {/* טופס */}
        {status === "success" ? (
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(35,51,73,0.12)",
              padding: "32px 28px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#233349",
                margin: 0,
                marginBottom: 10,
              }}
            >
              תודה, קיבלתי!
            </p>
            <p
              style={{
                fontSize: 16,
                color: "#233349",
                opacity: 0.6,
                margin: 0,
              }}
            >
              אשמח לעדכן אותך כשמתחילים.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                border: "1px solid rgba(35,51,73,0.25)",
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
              placeholder="מייל"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: 16,
                border: "1px solid rgba(35,51,73,0.25)",
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
                backgroundColor: "#b16039",
                color: "#fff",
                border: "none",
                cursor: status === "loading" ? "default" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
                marginTop: 4,
              }}
            >
              {status === "loading" ? "שולחת..." : "רוצה להישאר בקשר"}
            </button>

            {status === "error" && (
              <p
                style={{
                  fontSize: 14,
                  color: "#b16039",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                משהו השתבש — נסי שוב.
              </p>
            )}
          </form>
        )}

        {/* קו מפריד */}
        <div
          style={{
            height: 1,
            backgroundColor: "#233349",
            opacity: 0.1,
            marginTop: 48,
            marginBottom: 32,
          }}
        />

        {/* חתימה */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div
            style={{
              width: 3,
              alignSelf: "stretch",
              backgroundColor: "#dda96a",
              flexShrink: 0,
            }}
          />
          <div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#233349",
                margin: 0,
                marginBottom: 4,
              }}
            >
              הדר ארקדש
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#233349",
                opacity: 0.55,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
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
