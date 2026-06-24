"use client";

import { useEffect, useRef, useState } from "react";
import { Frank_Ruhl_Libre, Assistant } from "next/font/google";
import { BRAND_MARK_SVG } from "./brand-mark";

/* Fonts from the original design (Frank Ruhl Libre for headings, Assistant for body) */
const serif = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--ag-serif",
  display: "swap",
});
const sans = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--ag-sans",
  display: "swap",
});

type Variant = "parenting" | "couples";

/* ---- Per-variant content (זוגי / הורי) ----
   The couples (זוגי) variant differs from parenting (הורי) in: the title word,
   the lead/manifesto, the first "מה כולל" line, and the second-person phrasing —
   couples reads in plural (שלכם / אתכם / עבורכם / רוצים…) while parenting keeps
   Hadar's singular-feminine voice (שלך / אותך / עבורך / רוצה…). Everything else
   is shared. Keep the parenting & couples strings below in sync except for number. */
const CONTENT: Record<
  Variant,
  {
    word: string;
    lead: string[];
    included1: { b: string; rest: string };
    included2: { b: string; rest: string };
    important1: string;
    important2?: string;
    important4: string;
    mantra: { pre: string; hl: string; post: string };
  }
> = {
  parenting: {
    word: "הורי",
    lead: [
      "אין נכון ולא נכון שמתאים לכולם. הילד שלך לא דומה לאף ילד אחר, ואת.ה לא דומה לאף אחד.ת אחרת - ולכן גם הדרך שלנו תהיה הדרך שלך. אני עובדת בקצב שלך, ומחברת בין מה שקורה לנו בראש ובגוף - מערכת העצבים, המוֹח והאוטומטים שמפעילים אותנו, לבין הדרך שבה אנחנו נקשרים לאנשים הקרובים לנו.",
      "רוב הדפוסים שחוזרים אצלנו הם שבילים שנחרשו במוח לאורך שנים. יחד נלמד לזהות אותם, לחרוש שבילים חדשים, ולהוביל מתוך קשר במקום מתוך כוח.",
    ],
    included1: {
      b: "תהליך ליווי הורי",
      rest: ", פעם בשבוע, שעה בזום או בקליניקה בגדרה בהתאם למה שייקבע מראש. עקביות חשובה לשמירה על התהליך.",
    },
    included2: {
      b: "עבודה בקצב שלך, בהתאמה אישית מלאה",
      rest: " - נמפה יחד את המצב שבו אתם נמצאים ומאיפה נובע הפער שמתבטא בזוגיות או בהורות.",
    },
    important1:
      "הליווי אינו תחליף לטיפול פסיכולוגי או רגשי - אך הוא נוגע בעומקים, מתוך רגש, נוכחות והחזקה. אם יעלה צורך אחר, אכווין אותך בכנות למקום הנכון עבורך.",
    important4:
      "כל מה שנאמר בתהליך נשמר בסודיות מוחלטת, במרחב בטוח, בגובה העיניים ומתוך הקשבה אמיתית לקצב שלך.",
    mantra: {
      pre: "”אני מאמינה בכל ליבי שאת רוצה לשנות - ",
      hl: "את רק צריכה את הכוח המניע",
      post: ". ואני אהיה הכוח הזה עבורך.“",
    },
  },
  couples: {
    word: "זוגי",
    lead: [
      "אם גם אתם מרגישים שהזוגיות ביניכם כבר לא מה שהייתה לפני הילדים - אתם לא היחידים, זה רוב הזוגות. מה שמבדיל את הזוגות ששורדים את הילדים זה לא מזל: חברות חזקה ביניהם, קשב לצרכים אחד של השני, וגבולות שברורים לשניהם.",
      "וכאן אני נכנסת לתמונה - להבין את הפער ביניכם, למצוא את מה שלא מדובר, ולהחזיר אתכם להיות החברים הכי טובים. קודם כל למענכם, ואז למען הילדים שלכם. כמדריכת הורים ישבתי מול לא מעט זוגות שהיו בטוחים שהפער הוא סביב הילדים - ובעצם הוא היה ביניהם, בבסיס.",
    ],
    included1: {
      b: "תהליך ליווי זוגי",
      rest: ", פעם בשבוע, שעה בזום או בקליניקה בגדרה בהתאם למה שייקבע מראש. עקביות חשובה לשמירה על התהליך.",
    },
    included2: {
      b: "עבודה בקצב שלכם, בהתאמה אישית מלאה",
      rest: " - נמפה יחד את המצב שבו אתם נמצאים ומאיפה נובע הפער שמתבטא בזוגיות או בהורות.",
    },
    important1:
      "הליווי אינו תחליף לטיפול פסיכולוגי או רגשי - אך הוא נוגע בעומקים, מתוך רגש, נוכחות והחזקה. אם יעלה צורך אחר, אכווין אתכם בכנות למקום הנכון עבורכם.",
    important2:
      "הלופ שאתם נמצאים בו לא אומר שהזוגיות כבר לא עובדת - זה דפוס שנחרש במוח ופועל על אוטומט, ואפשר לשנות אותו.",
    important4:
      "כל מה שנאמר בתהליך נשמר בסודיות מוחלטת, במרחב בטוח, בגובה העיניים ומתוך הקשבה אמיתית לקצב שלכם.",
    mantra: {
      pre: "”אני מאמינה בכל ליבי שאתם רוצים לשנות - ",
      hl: "אתם רק צריכים את הכוח המניע",
      post: ". ואני אהיה הכוח הזה עבורכם.“",
    },
  },
};

export default function AgreementPage() {
  const [variant, setVariant] = useState<Variant>("parenting");
  const dateRef = useRef<HTMLSpanElement>(null);

  // Pre-fill today's date once (client-side, so no hydration mismatch).
  useEffect(() => {
    const el = dateRef.current;
    if (el && !el.textContent?.trim()) {
      const d = new Date();
      el.textContent = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    }
  }, []);

  const v = CONTENT[variant];

  return (
    <div className={`ag-root ${serif.variable} ${sans.variable}`} dir="rtl">
      {/* ===== Tool bar (screen only — never prints) ===== */}
      <div className="ag-toolbar" role="toolbar" aria-label="כלי המסמך">
        <span className="ag-tb-label">גרסה</span>
        <div className="ag-seg">
          <button
            type="button"
            className={variant === "parenting" ? "sel" : ""}
            onClick={() => setVariant("parenting")}
          >
            הורי
          </button>
          <button
            type="button"
            className={variant === "couples" ? "sel" : ""}
            onClick={() => setVariant("couples")}
          >
            זוגי
          </button>
        </div>
        <span className="ag-tb-sep" aria-hidden="true" />
        <span className="ag-tb-hint">השם והתאריך ניתנים לעריכה — לחצי וכתבי</span>
        <button type="button" className="ag-pdf" onClick={() => window.print()}>
          שמירה כ־PDF
        </button>
      </div>

      {/* ===== The document ===== */}
      <article className="sheet">
        {/* HEADER */}
        <header className="masthead">
          <div className="brand">
            <div
              className="brand-mark"
              role="img"
              aria-label="הדר ארקדש"
              dangerouslySetInnerHTML={{ __html: BRAND_MARK_SVG }}
            />
            <div>
              <div className="brand-name">הדר ארקדש</div>
              <div className="brand-role">
                ליווי הורי · זוגי · אישי — מבוסס מוֹח ורגש
              </div>
            </div>
          </div>
          <div className="doc-kicker">מסמך הסכמות</div>
        </header>

        {/* META */}
        <div className="meta">
          <div className="field">
            <span className="label">עבור:</span>
            <span
              className="value ag-edit"
              contentEditable
              suppressContentEditableWarning
              data-ph="שם הלקוח/ה"
            />
          </div>
          <div className="field">
            <span className="label">תאריך:</span>
            <span
              ref={dateRef}
              className="value ag-edit"
              contentEditable
              suppressContentEditableWarning
              data-ph="DD.MM.YYYY"
            />
          </div>
        </div>

        {/* TITLE */}
        <div className="title-block">
          <h1 className="doc-title">
            תהליך ליווי {v.word}
            <span className="based">
              בגישה היקשרותית-התפתחותית, מבוססת <b>מוֹח ורגש</b>
            </span>
          </h1>
        </div>

        {/* LEAD / MANIFESTO */}
        <div className="lead">
          {v.lead.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* 01 — WHAT'S INCLUDED */}
        <section>
          <div className="sec-head">
            <span className="sec-num">01</span>
            <h2 className="sec-title">מה כולל הליווי</h2>
            <span className="sec-rule" />
          </div>
          <ul className="points">
            <li>
              <b>{v.included1.b}</b>
              {v.included1.rest}
            </li>
            <li>
              <b>{v.included2.b}</b>
              {v.included2.rest}
            </li>
            <li>
              <b>עבודה על התגובות האוטומטיות ועל מערכת העצבים</b> - נזהה את הלופים
              שחוזרים, נשבור דפוסים ונחרוש שבילים חדשים במוח.
            </li>
            <li>
              <b>כלים מבוססי מחקר</b> - מוֹח ורגש, פסיכולוגיה התפתחותית
              והיקשרותית ו־EFT זוגי, מוסברים בפשטות ומתורגמים לפעולה ביומיום.
            </li>
            <li>
              <b>ליווי לאורך כל הדרך</b> - אני זמינה עבורכם בוואטסאפ גם בין
              המפגשים: כאוזן קשבת, להתייעצות ולחיזוק נקודתי.
            </li>
          </ul>
        </section>

        {/* 02 — TERMS & PAYMENT */}
        <section>
          <div className="sec-head">
            <span className="sec-num">02</span>
            <h2 className="sec-title">תנאים ותשלום</h2>
            <span className="sec-rule" />
          </div>
          <ul className="points">
            <li>פגישת ייעוץ ראשונה: 400 ש״ח</li>
            <li>תהליך ליווי: 375 ש״ח עבור 3 מפגשים / 360 ש״ח עבור 5 מפגשים</li>
            <li>התשלום מתבצע בלינק שיישלח, לאחר המפגש הראשון</li>
            <li>ניתן לדחות או להזיז מפגש בהתראה של לפחות 24 שעות מראש</li>
          </ul>
        </section>

        {/* 03 — IMPORTANT */}
        <section>
          <div className="sec-head">
            <span className="sec-num">03</span>
            <h2 className="sec-title">חשוב לי להדגיש</h2>
            <span className="sec-rule" />
          </div>
          <ul className="points">
            <li>{v.important1}</li>
            {v.important2 && <li>{v.important2}</li>}
            <li>
              אין פתרונות קסם. תהליך הוא כמו ללכת במבוך: לקחנו פנייה לא נכונה
              ונתקלנו בקיר? חוזרים ומנסים שוב.{" "}
              <strong>העיקר לא להפסיק לנסות.</strong>
            </li>
            <li>{v.important4}</li>
          </ul>
        </section>

        {/* CLOSING MANTRA */}
        <div className="mantra">
          <p className="q">
            {v.mantra.pre}
            <span className="hl">{v.mantra.hl}</span>
            {v.mantra.post}
          </p>
        </div>

        {/* SIGN-OFF */}
        <div className="signoff">
          <div className="person">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="photo"
              src="/agreement/portrait.jpg"
              alt="הדר ארקדש"
            />
            <div className="ptext">
              <div className="warm">באהבה ובאמונה בדרך</div>
              <span className="sig">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/agreement/signature.png" alt="חתימת הדר ארקדש" />
              </span>
              <div className="who">
                הדר ארקדש
                <small>
                  ליווי הורי · זוגי · אישי | גישה היקשרותית-התפתחותית ו־EFT זוגי
                </small>
              </div>
            </div>
          </div>

          <div className="footer-note">
            הדר ארקדש · ליווי הורי · זוגי · אישי · <span>גדרה / זום</span>
          </div>
        </div>
      </article>

      <style jsx global>{`
        .ag-root {
          --bg: #ece3d6;
          --page: #faf4ea;
          --ink: #322c25;
          --muted: #8a7c6b;
          --accent: #c18769;
          --accent-deep: #9d5f43;
          --accent-soft: #ecdccd;
          --rule: #e4d8c7;
          --serif: var(--ag-serif), "Frank Ruhl Libre", Georgia, serif;
          --sans: var(--ag-sans), "Assistant", system-ui, sans-serif;
          --heading-font: var(--serif);

          background: var(--bg);
          color: var(--ink);
          font-family: var(--sans);
          font-size: 17px;
          line-height: 1.74;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          min-height: 100vh;
          padding: 92px 20px 80px;
        }
        .ag-root * {
          box-sizing: border-box;
        }

        .ag-root .sheet {
          max-width: 780px;
          margin: 0 auto;
          background: var(--page);
          border: 1px solid var(--rule);
          border-radius: 5px;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02),
            0 36px 70px -40px rgba(70, 45, 25, 0.34);
          padding: 60px 72px 54px;
          position: relative;
        }

        /* ===== HEADER ===== */
        .ag-root .masthead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--rule);
        }
        .ag-root .brand {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .ag-root .brand-mark {
          width: 62px;
          height: 54px;
          flex: none;
          color: var(--accent-deep);
        }
        .ag-root .brand-mark svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .ag-root .brand-name {
          font-family: var(--heading-font);
          font-size: 23px;
          font-weight: 600;
          letter-spacing: 0.2px;
          line-height: 1.05;
        }
        .ag-root .brand-role {
          font-size: 12.5px;
          color: var(--muted);
          letter-spacing: 0.3px;
          margin-top: 5px;
          white-space: nowrap;
        }
        .ag-root .doc-kicker {
          font-size: 11px;
          letter-spacing: 3px;
          color: var(--muted);
          text-transform: uppercase;
          font-weight: 700;
          text-align: left;
          white-space: nowrap;
          flex: none;
        }

        /* ===== META ===== */
        .ag-root .meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 40px;
          margin: 26px 0 2px;
          font-size: 14.5px;
        }
        .ag-root .meta .field {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .ag-root .meta .label {
          color: var(--muted);
          font-weight: 700;
          font-size: 12.5px;
          letter-spacing: 0.3px;
        }
        .ag-root .meta .value {
          font-weight: 500;
          border-bottom: 1px dashed var(--rule);
          padding-bottom: 2px;
          min-width: 140px;
        }

        /* editable fields */
        .ag-root .ag-edit {
          outline: none;
          cursor: text;
          border-radius: 3px;
          transition: background 0.12s, box-shadow 0.12s;
        }
        .ag-root .ag-edit:empty::before {
          content: attr(data-ph);
          color: var(--muted);
          opacity: 0.65;
        }
        .ag-root .ag-edit:hover {
          background: color-mix(in srgb, var(--accent-soft) 45%, transparent);
        }
        .ag-root .ag-edit:focus {
          background: color-mix(in srgb, var(--accent-soft) 70%, transparent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
        }

        /* ===== TITLE ===== */
        .ag-root .title-block {
          margin: 30px 0 6px;
        }
        .ag-root .doc-title {
          font-family: var(--heading-font);
          font-weight: 700;
          font-size: 40px;
          line-height: 1.16;
          letter-spacing: -0.2px;
          margin: 0;
          text-wrap: balance;
        }
        .ag-root .doc-title .based {
          display: block;
          font-size: 22px;
          font-weight: 400;
          color: var(--muted);
          margin-top: 12px;
          letter-spacing: 0.3px;
        }
        .ag-root .doc-title .based b {
          color: var(--accent-deep);
          font-weight: 600;
        }

        /* ===== LEAD / MANIFESTO ===== */
        .ag-root .lead {
          margin: 30px 0 6px;
          padding: 26px 28px;
          background: linear-gradient(
            180deg,
            var(--accent-soft) 0%,
            transparent 165%
          );
          border-radius: 8px;
          position: relative;
        }
        .ag-root .lead::before {
          content: "";
          position: absolute;
          top: 26px;
          bottom: 26px;
          right: 0;
          width: 3px;
          border-radius: 3px;
          background: var(--accent);
        }
        .ag-root .lead p {
          margin: 0;
          font-size: 17.5px;
          line-height: 1.82;
        }
        .ag-root .lead p + p {
          margin-top: 15px;
        }
        .ag-root .lead .emph {
          color: var(--accent-deep);
          font-weight: 600;
        }
        /* ===== SECTIONS ===== */
        .ag-root section {
          margin-top: 42px;
        }
        .ag-root .sec-head {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 18px;
        }
        .ag-root .sec-num {
          font-family: var(--serif);
          font-size: 15px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 1px;
          flex: none;
          min-width: 26px;
        }
        .ag-root .sec-title {
          font-family: var(--heading-font);
          font-size: 25px;
          font-weight: 600;
          margin: 0;
          line-height: 1.2;
        }
        .ag-root .sec-rule {
          flex: 1;
          height: 1px;
          background: var(--rule);
          align-self: center;
        }

        .ag-root ul.points {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ag-root ul.points li {
          position: relative;
          padding: 0 27px 0 4px;
          margin-bottom: 14px;
          font-size: 16.5px;
          line-height: 1.72;
        }
        .ag-root ul.points li::before {
          content: "";
          position: absolute;
          right: 6px;
          top: 0.7em;
          width: 7px;
          height: 7px;
          transform: rotate(45deg);
          background: var(--accent);
        }
        .ag-root ul.points li b,
        .ag-root ul.points li strong {
          color: var(--accent-deep);
          font-weight: 700;
        }

        .ag-root .price-callout {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          background: var(--accent-soft);
          color: var(--accent-deep);
          padding: 2px 12px;
          border-radius: 999px;
          font-weight: 700;
          font-feature-settings: "tnum";
          white-space: nowrap;
        }

        /* ===== CLOSING MANTRA ===== */
        .ag-root .mantra {
          margin-top: 48px;
          text-align: center;
          padding: 38px 30px 34px;
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
        }
        .ag-root .mantra .q {
          font-family: var(--serif);
          font-size: 25px;
          line-height: 1.55;
          font-weight: 500;
          color: var(--ink);
          text-wrap: balance;
          margin: 0 auto;
          max-width: 32ch;
        }
        .ag-root .mantra .q .hl {
          color: var(--accent-deep);
        }

        /* ===== SIGN-OFF ===== */
        .ag-root .signoff {
          margin-top: 40px;
        }
        .ag-root .person {
          display: flex;
          align-items: center;
          gap: 22px;
          background: linear-gradient(
            180deg,
            color-mix(in srgb, var(--accent-soft) 50%, transparent),
            transparent 180%
          );
          border: 1px solid var(--rule);
          border-radius: 12px;
          padding: 22px 24px;
        }
        .ag-root .person .photo {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          flex: none;
          object-fit: cover;
          object-position: center 16%;
          border: 3px solid var(--page);
          box-shadow: 0 0 0 1px var(--rule),
            0 10px 24px -12px rgba(70, 45, 25, 0.4);
        }
        .ag-root .person .ptext {
          flex: 1;
        }
        .ag-root .person .warm {
          font-family: var(--heading-font);
          font-size: 19px;
          color: var(--ink);
        }
        .ag-root .person .sig {
          display: block;
          height: 48px;
          margin: 6px 0 2px;
        }
        .ag-root .person .sig img {
          height: 100%;
          width: auto;
          display: block;
        }
        .ag-root .person .who {
          font-weight: 700;
          font-size: 16px;
          margin-top: 2px;
        }
        .ag-root .person .who small {
          display: block;
          font-weight: 500;
          font-size: 12.5px;
          color: var(--muted);
          margin-top: 3px;
          letter-spacing: 0.2px;
        }

        .ag-root .footer-note {
          margin-top: 30px;
          text-align: center;
          font-size: 12.5px;
          color: var(--muted);
          letter-spacing: 0.2px;
        }
        .ag-root .footer-note span {
          color: var(--accent-deep);
        }

        /* ===== TOOL BAR (screen only) ===== */
        .ag-root .ag-toolbar {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 8px 8px 14px;
          background: #fff;
          border: 1px solid #e7ded2;
          border-radius: 999px;
          box-shadow: 0 18px 50px -18px rgba(40, 28, 16, 0.45);
          font-family: var(--sans);
          font-size: 13px;
          max-width: calc(100vw - 24px);
          flex-wrap: wrap;
          justify-content: center;
        }
        .ag-root .ag-tb-label {
          font-weight: 700;
          color: #6a5d4d;
          letter-spacing: 0.3px;
          padding-inline-start: 6px;
        }
        .ag-root .ag-seg {
          display: flex;
          gap: 4px;
          background: #f5efe7;
          padding: 3px;
          border-radius: 999px;
        }
        .ag-root .ag-seg button {
          cursor: pointer;
          border: none;
          background: transparent;
          color: #4a4036;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 999px;
          transition: 0.14s;
        }
        .ag-root .ag-seg button.sel {
          background: #322c25;
          color: #fff;
          box-shadow: 0 2px 8px -2px rgba(40, 28, 16, 0.5);
        }
        .ag-root .ag-tb-sep {
          width: 1px;
          height: 22px;
          background: #ece3d6;
        }
        .ag-root .ag-tb-hint {
          color: #a2937f;
          font-size: 12px;
        }
        .ag-root .ag-pdf {
          cursor: pointer;
          border: none;
          background: #c18769;
          color: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 999px;
          transition: 0.14s;
        }
        .ag-root .ag-pdf:hover {
          background: #9d5f43;
        }

        /* ===== PRINT ===== */
        @page {
          size: A4;
          margin: 13mm;
        }
        @media print {
          body {
            background: #fff !important;
          }
          .ag-root {
            background: #fff !important;
            padding: 0 !important;
            min-height: 0;
            font-size: 12.5pt;
          }
          .ag-root .ag-toolbar {
            display: none !important;
          }
          .ag-root .sheet {
            box-shadow: none;
            border: none;
            border-radius: 0;
            max-width: none;
            padding: 0;
          }
          .ag-root .ag-edit {
            border-bottom-style: solid;
          }
          .ag-root .lead,
          .ag-root .person {
            background: var(--accent-soft) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .ag-root .lead,
          .ag-root section,
          .ag-root .mantra,
          .ag-root .signoff,
          .ag-root .person {
            break-inside: avoid;
          }
          .ag-root .price-callout,
          .ag-root .lead::before,
          .ag-root ul.points li::before,
          .ag-root .brand-mark,
          .ag-root .person .photo {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }

        /* ===== MOBILE ===== */
        @media (max-width: 640px) {
          .ag-root {
            padding: 84px 0 50px;
          }
          .ag-root .sheet {
            padding: 34px 22px 38px;
            border-radius: 0;
          }
          .ag-root .doc-title {
            font-size: 31px;
          }
          .ag-root .doc-kicker {
            display: none;
          }
          .ag-root .person {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
