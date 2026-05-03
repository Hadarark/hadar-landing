"use client";

import { useState } from "react";
import Image from "next/image";

const PAIN_MOMENTS = [
  {
    time: "13:00",
    text: "הוא לבד בבית. שולח לך הודעות. את עונה בין ישיבה לישיבה. מנהלת את הבית שלך מ\"שלט רחוק\" — ומרגישה שמשהו שם לא בסדר.",
  },
  {
    time: "17:00",
    text: "נכנסת הביתה. ציפית לחיבוק. קיבלת ילד אטום מול מסך שבקושי הרים עיניים.",
  },
  {
    time: "ערב",
    text: "פיצוץ על מקלחת, שיעורים, כיבוי מסכים. דלת נטרקת. ואת עומדת במסדרון ושואלת את עצמך — מה קרה לנו?",
  },
];

export default function MagnetPage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function scrollToForm() {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  }

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
    padding: "15px 18px",
    fontSize: 16,
    border: "1px solid rgba(35,51,73,0.2)",
    backgroundColor: "#fff",
    color: "#233349",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
    direction: "rtl",
    textAlign: "right",
    borderRadius: 0,
  };

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
        color: "#233349",
        direction: "rtl",
        overflowX: "hidden",
      }}
    >

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#2C3E5A",
          padding: "44px 24px 56px",
          textAlign: "center",
        }}
      >
        {/* לוגו */}
        <div style={{ marginBottom: 40 }}>
          <Image
            src="/logo.svg"
            alt="הדר ארקדש"
            width={200}
            height={70}
            style={{ height: 60, width: "auto", display: "inline-block", filter: "brightness(0) invert(1)" }}
            priority
          />
        </div>

        {/* תג */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 22 }}>
          <span style={{ display: "inline-block", width: 28, height: 2, backgroundColor: "#dda96a" }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#dda96a" }}>
            שאלון + אתגר · חינמי לחלוטין
          </span>
          <span style={{ display: "inline-block", width: 28, height: 2, backgroundColor: "#dda96a" }} />
        </div>

        {/* כותרת */}
        <h1
          style={{
            fontSize: "clamp(30px, 7vw, 50px)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#fff",
            margin: "0 0 18px",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          הילד שלך לא השתנה לרע.
          <br />
          <span style={{ color: "#dda96a" }}>
            אבל גיל הגשר לא מסביר את עצמו.
          </span>
        </h1>

        {/* תת כותרת */}
        <p
          style={{
            fontSize: "clamp(16px, 3.5vw, 20px)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.72)",
            margin: "0 auto 36px",
            maxWidth: 480,
          }}
        >
          שאלון קצר שיגרום לך לראות מה באמת קורה בינכם — ו-3 ימים שיחזירו אותך למושב הנהג.
        </p>

        {/* CTA */}
        <button
          onClick={scrollToForm}
          style={{
            display: "inline-block",
            backgroundColor: "#A0522D",
            color: "#fff",
            fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
            fontWeight: 800,
            fontSize: 18,
            padding: "16px 40px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 28px rgba(160,82,45,0.5)",
            letterSpacing: "0.01em",
          }}
        >
          אני רוצה להבין מה קורה ←
        </button>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>
          בחינם. ללא התחייבות.
        </p>
      </section>

      {/* ══ PAIN ═══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "56px 24px" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 28, height: 2, backgroundColor: "#dda96a" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#b16039" }}>
              את מכירה את הרגעים האלו?
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PAIN_MOMENTS.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                  paddingTop: 22,
                  paddingBottom: 22,
                  borderBottom: i < PAIN_MOMENTS.length - 1 ? "1px solid rgba(35,51,73,0.08)" : "none",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "#2C3E5A",
                      color: "#dda96a",
                      fontWeight: 800,
                      fontSize: 13,
                      padding: "4px 10px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {m.time}
                  </span>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.75, color: "#233349", opacity: 0.78, margin: 0 }}>
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 36,
              padding: "22px 20px",
              backgroundColor: "#F5F4F2",
              borderRight: "4px solid #dda96a",
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 700, color: "#233349", margin: "0 0 8px", lineHeight: 1.4 }}>
              זה לא "הגיל". זה גיל הגשר.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#233349", opacity: 0.65, margin: 0 }}>
              בין 7 ל-11 המוח של הילד שלך עובר שינוי ביולוגי אמיתי. הוא מחפש כתובת. ואם לא תהיי את — הוא ימצא אחרת. יש לזה שם, יש לזה הסבר, ויש מה לעשות עם זה.
            </p>
          </div>
        </div>
      </section>

      {/* ══ TEASE ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F5F4F2", padding: "52px 24px" }}>
        <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>

          <p style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 800, color: "#233349", lineHeight: 1.3, margin: "0 0 16px" }}>
            מה אם 5 שאלות יכולות לשנות
            <br />
            <span style={{ color: "#A0522D" }}>את כל האופן שבו את רואה אותו?</span>
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: "#233349", opacity: 0.65, margin: "0 0 36px", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
            שאלות שרוב האמהות לא עוצרות לשאול — ושהתשובות עליהן מגלות משהו שהיה שם כל הזמן.
          </p>

          {/* מה תקבלי */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400, margin: "0 auto 36px" }}>
            {[
              "שאלון להתבוננות פנימית — מוכן להורדה מיידית",
              "כניסה לאתגר הגשר: 3 ימים, הודעה בבוקר, משימה אחת ליום",
              "פעולה — לא רק ידע",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", textAlign: "right" }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: "#A0522D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: "#233349", margin: 0, fontWeight: i === 0 ? 700 : 400 }}>{item}</p>
              </div>
            ))}
          </div>

          <button
            onClick={scrollToForm}
            style={{
              display: "inline-block",
              backgroundColor: "#A0522D",
              color: "#fff",
              fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
              fontWeight: 800,
              fontSize: 17,
              padding: "15px 36px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(160,82,45,0.35)",
            }}
          >
            שלחי לי את השאלון ←
          </button>
        </div>
      </section>

      {/* ══ CREDIBILITY ════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "44px 24px" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "3px solid rgba(221,169,106,0.5)",
              }}
            >
              <Image
                src="/hadar.jpg"
                alt="הדר ארקדש"
                width={64}
                height={64}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#233349", margin: "0 0 4px" }}>הדר ארקדש</p>
              <p style={{ fontSize: 13, color: "#b16039", fontWeight: 600, margin: "0 0 10px" }}>
                מדריכת הורים · ייעוץ זוגי EFT · אמא לשלושה
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#233349", opacity: 0.65, margin: 0 }}>
                למדתי את זה על עצמי קודם — עם הבת שלי, בגיל הגשר שלה. היום אני מעבירה הלאה את מה שלקח לי שנים להבין.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FORM ═══════════════════════════════════════════════════════════════ */}
      <section
        id="register"
        style={{ backgroundColor: "#2C3E5A", padding: "52px 24px 64px" }}
      >
        <div style={{ maxWidth: 440, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ display: "inline-block", width: 28, height: 2, backgroundColor: "#dda96a" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#dda96a" }}>
              הצטרפי עכשיו
            </span>
          </div>

          <p style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 800, color: "#fff", margin: "0 0 8px", lineHeight: 1.3 }}>
            שלחי לי את השאלון
          </p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", margin: "0 0 28px", lineHeight: 1.7 }}>
            + כניסה לאתגר הגשר — 3 ימים, הודעה בבוקר, משימה אחת ליום.
          </p>

          {status === "success" ? (
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "36px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  backgroundColor: "rgba(160,82,45,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dda96a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>נרשמת!</p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", lineHeight: 1.7 }}>
                השאלון יורד עכשיו.
                <br />
                תוך 24 שעות תקבלי פרטים על אתגר הגשר.
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
                  boxShadow: "0 4px 20px rgba(160,82,45,0.4)",
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
                style={{ ...inputStyle, backgroundColor: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}
              />
              <input
                type="email"
                placeholder="כתובת מייל"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ ...inputStyle, backgroundColor: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}
              />

              <style>{`input::placeholder { color: rgba(255,255,255,0.35) !important; }`}</style>

              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  padding: "17px",
                  fontSize: 18,
                  fontWeight: 800,
                  backgroundColor: "#A0522D",
                  color: "#fff",
                  border: "none",
                  cursor: status === "loading" ? "default" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1,
                  fontFamily: '"Assistant", "Rubik", Arial, sans-serif',
                  marginTop: 4,
                  boxShadow: "0 6px 24px rgba(160,82,45,0.45)",
                  letterSpacing: "0.01em",
                }}
              >
                {status === "loading" ? "שולחת..." : "שלחי לי את השאלון ←"}
              </button>

              {status === "error" && (
                <p style={{ fontSize: 14, color: "#dda96a", textAlign: "center", margin: 0 }}>
                  משהו השתבש — נסי שוב.
                </p>
              )}

              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", textAlign: "center", margin: "4px 0 0", lineHeight: 1.7 }}>
                ללא ספאם. בכל עת ניתן להסיר.{" "}
                <a href="/privacy" style={{ color: "rgba(221,169,106,0.6)", textDecoration: "underline" }}>
                  מדיניות פרטיות
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

    </main>
  );
}
