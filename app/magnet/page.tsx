"use client";

import { useState, type ReactNode } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&family=Frank+Ruhl+Libre:wght@400;500;700;900&family=Caveat:wght@400;600&display=swap');

  .mg-root *{box-sizing:border-box;}
  .mg-root{
    background:#f6f3ec;
    font-family:"Heebo",sans-serif;
    color:#233349;
    direction:rtl;
    -webkit-font-smoothing:antialiased;
    line-height:1.5;
    min-height:100vh;
  }
  .mg-root img{display:block;max-width:100%;}
  .mg-root a{color:inherit;text-decoration:none;}

  /* TOPBAR */
  .mg-topbar{
    position:sticky;top:0;z-index:50;
    background:rgba(246,243,236,.92);
    backdrop-filter:blur(8px);
    border-bottom:1px solid #cfc9bd;
  }
  .mg-topbar-inner{
    max-width:1240px;margin:0 auto;
    padding:18px 32px;
    display:flex;align-items:center;justify-content:space-between;
  }
  .mg-brand{display:flex;align-items:center;gap:12px;}
  .mg-brand-name{
    font-family:"Heebo",sans-serif;
    font-weight:500;letter-spacing:.22em;
    font-size:11px;text-transform:uppercase;
    color:#233349;
  }
  .mg-nav{display:flex;align-items:center;gap:28px;}
  .mg-nav a{font-size:13px;font-weight:400;color:#233349;letter-spacing:.04em;}
  .mg-nav a:hover{color:#b16039;}
  .mg-nav .mg-pill{
    background:#233349;color:#e5e2de;
    padding:10px 20px;border-radius:999px;
    font-size:12px;letter-spacing:.08em;font-weight:500;
  }
  .mg-nav .mg-pill:hover{background:#b16039;}

  /* HERO */
  .mg-hero{
    max-width:1240px;margin:0 auto;
    padding:72px 32px 96px;
    display:grid;grid-template-columns:1.15fr 1fr;
    gap:72px;align-items:center;
  }
  .mg-eyebrow{
    font-size:11px;letter-spacing:.32em;text-transform:uppercase;
    color:#b16039;font-weight:500;
    display:flex;align-items:center;gap:14px;
  }
  .mg-eyebrow::after{content:"";flex:1;max-width:80px;height:1px;background:#b16039;opacity:.4;}
  .mg-h1{
    font-family:"Frank Ruhl Libre",serif;
    font-weight:500;font-size:clamp(48px,5.6vw,82px);
    line-height:1.02;letter-spacing:-.02em;
    margin:24px 0 0;color:#233349;
  }
  .mg-h1 em{font-style:italic;font-weight:400;color:#b16039;}
  .mg-lede{
    font-size:19px;line-height:1.65;font-weight:300;
    color:#233349;margin:28px 0 0;max-width:560px;
  }
  .mg-meta{
    display:flex;align-items:center;gap:18px;
    margin-top:38px;
    font-size:12px;letter-spacing:.14em;text-transform:uppercase;
    color:#6b6f74;
  }
  .mg-dot{width:4px;height:4px;border-radius:50%;background:#b16039;display:inline-block;}

  /* HERO CARD */
  .mg-card{
    background:#e5e2de;border:1px solid #cfc9bd;
    padding:40px 38px;position:relative;
  }
  .mg-card::before{
    content:"";position:absolute;inset:8px;
    border:1px solid rgba(35,51,73,.08);pointer-events:none;
  }
  .mg-booklet{display:flex;align-items:center;gap:18px;margin-bottom:28px;}
  .mg-thumb{
    width:88px;height:120px;
    background:#233349;color:#e5e2de;
    display:flex;flex-direction:column;justify-content:space-between;
    padding:10px 9px;
    box-shadow:0 12px 28px rgba(35,51,73,.22);
    flex-shrink:0;
  }
  .mg-thumb .t-top{font-size:7px;letter-spacing:.22em;text-transform:uppercase;color:rgba(229,226,222,.6);}
  .mg-thumb .t-ttl{font-family:"Frank Ruhl Libre",serif;font-size:13px;line-height:1;color:#dda96a;}
  .mg-thumb .t-num{font-family:"Frank Ruhl Libre",serif;font-size:9px;letter-spacing:.12em;color:rgba(229,226,222,.5);}
  .mg-meta-kicker{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#b16039;font-weight:500;}
  .mg-meta-ttl{font-family:"Frank Ruhl Libre",serif;font-size:22px;line-height:1.15;font-weight:500;margin-top:6px;color:#233349;}
  .mg-meta-sub{font-size:12px;color:#6b6f74;margin-top:8px;}

  /* FORM */
  .mg-form{display:flex;flex-direction:column;gap:14px;}
  .mg-field{display:flex;flex-direction:column;gap:6px;}
  .mg-field label{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#6b6f74;font-weight:500;}
  .mg-field input{
    background:transparent;border:none;
    border-bottom:1px solid rgba(35,51,73,.25);
    padding:10px 0 12px;
    font-size:15px;font-family:"Heebo",sans-serif;
    color:#233349;direction:rtl;outline:none;
    transition:border-color .2s;width:100%;
  }
  .mg-field input:focus{border-bottom-color:#b16039;}
  .mg-field input::placeholder{color:rgba(35,51,73,.35);}
  .mg-submit{
    margin-top:14px;
    background:#233349;color:#e5e2de;
    border:none;padding:18px 22px;
    font-family:"Heebo",sans-serif;font-weight:500;
    font-size:14px;letter-spacing:.08em;
    cursor:pointer;
    display:flex;align-items:center;justify-content:space-between;
    transition:background .2s;width:100%;
  }
  .mg-submit:hover{background:#b16039;}
  .mg-submit:disabled{opacity:.6;cursor:default;}
  .mg-submit-arrow{font-family:"Frank Ruhl Libre",serif;font-size:20px;}
  .mg-legal{margin-top:14px;font-size:11px;color:#6b6f74;line-height:1.5;}
  .mg-legal a{color:#b16039;text-decoration:underline;}

  /* SUCCESS */
  .mg-success{
    padding:28px;text-align:center;
    border:1px solid rgba(35,51,73,.1);
  }
  .mg-success p{font-size:17px;font-weight:600;color:#233349;margin:0 0 16px;}
  .mg-success a{
    display:inline-block;
    background:#233349;color:#e5e2de;
    padding:14px 28px;font-family:"Heebo",sans-serif;
    font-weight:500;font-size:14px;letter-spacing:.08em;
    text-decoration:none;
  }
  .mg-success a:hover{background:#b16039;}
  .mg-dark-success .mg-success{border-color:rgba(229,226,222,.2);}
  .mg-dark-success .mg-success p{color:#e5e2de;}
  .mg-dark-success .mg-success a{background:#dda96a;color:#233349;}

  /* SECTIONS */
  .mg-section{padding:104px 32px;border-top:1px solid #cfc9bd;}
  .mg-wrap{max-width:1240px;margin:0 auto;}
  .mg-section-eyebrow{font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#b16039;font-weight:500;}
  .mg-section-title{
    font-family:"Frank Ruhl Libre",serif;font-weight:500;
    font-size:clamp(36px,4.4vw,56px);line-height:1.1;
    letter-spacing:-.015em;margin:18px 0 0;color:#233349;max-width:18ch;
  }

  /* FOR YOU */
  .mg-foryou{display:grid;grid-template-columns:1fr 1.4fr;gap:80px;align-items:start;}
  .mg-foryou-intro p{font-size:16px;line-height:1.75;font-weight:300;color:#233349;margin-top:28px;max-width:34ch;}
  .mg-foryou-list{display:flex;flex-direction:column;}
  .mg-row{
    display:grid;grid-template-columns:54px 1fr;gap:26px;
    padding:26px 0;border-top:1px solid #cfc9bd;align-items:baseline;
  }
  .mg-row:last-child{border-bottom:1px solid #cfc9bd;}
  .mg-row-n{font-family:"Frank Ruhl Libre",serif;font-size:22px;color:#b16039;font-feature-settings:"tnum";}
  .mg-row-t{font-family:"Frank Ruhl Libre",serif;font-size:22px;line-height:1.35;color:#233349;font-weight:500;}

  /* INSIDE */
  .mg-inside{background:#e5e2de;}
  .mg-inside-top{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:end;margin-bottom:72px;}
  .mg-inside-lede{font-size:17px;line-height:1.7;font-weight:300;color:#233349;max-width:42ch;}
  .mg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#cfc9bd;border:1px solid #cfc9bd;}
  .mg-cell{
    background:#e5e2de;padding:38px 32px 44px;
    display:flex;flex-direction:column;gap:18px;min-height:280px;
  }
  .mg-cell-num{font-family:"Frank Ruhl Libre",serif;font-size:28px;color:#b16039;font-feature-settings:"tnum";line-height:1;}
  .mg-cell-ttl{font-family:"Frank Ruhl Libre",serif;font-size:24px;line-height:1.2;color:#233349;font-weight:500;}
  .mg-cell-body{font-size:13.5px;line-height:1.7;font-weight:300;color:#233349;}
  .mg-cell-tag{margin-top:auto;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#6b6f74;border-top:1px solid #cfc9bd;padding-top:14px;}

  /* ABOUT */
  .mg-about{display:grid;grid-template-columns:.85fr 1.15fr;gap:96px;align-items:center;}
  .mg-portrait{
    aspect-ratio:4/5;
    background:#e5e2de center/cover no-repeat;
    border:1px solid #cfc9bd;position:relative;
  }
  .mg-portrait::after{
    content:"";position:absolute;
    inset:-14px -14px auto auto;
    width:120px;height:120px;
    border:1px solid #b16039;z-index:-1;
  }
  .mg-about-h2{
    font-family:"Frank Ruhl Libre",serif;font-weight:500;
    font-size:48px;line-height:1.1;color:#233349;
    margin:14px 0 0;letter-spacing:-.01em;
  }
  .mg-about-p{font-size:16px;line-height:1.8;font-weight:300;margin-top:24px;color:#233349;}
  .mg-sig{
    margin-top:32px;display:flex;align-items:center;gap:18px;
    padding-top:22px;border-top:1px solid #cfc9bd;
  }
  .mg-signature{font-family:"Caveat",cursive;font-size:34px;color:#b16039;line-height:1;}
  .mg-role{font-size:12px;color:#6b6f74;letter-spacing:.04em;line-height:1.5;border-right:1px solid #cfc9bd;padding-right:18px;}

  /* FINAL CTA */
  .mg-final{background:#233349;color:#e5e2de;padding:120px 32px;}
  .mg-final-wrap{display:grid;grid-template-columns:1.1fr 1fr;gap:96px;align-items:center;}
  .mg-final .mg-section-eyebrow{color:#dda96a;}
  .mg-final-h2{
    font-family:"Frank Ruhl Libre",serif;font-weight:500;
    font-size:clamp(40px,4.6vw,62px);line-height:1.05;
    margin:18px 0 0;color:#e5e2de;letter-spacing:-.015em;
  }
  .mg-final-h2 em{font-style:italic;color:#dda96a;font-weight:400;}
  .mg-final-lede{font-size:17px;line-height:1.7;font-weight:300;margin-top:24px;color:rgba(229,226,222,.85);max-width:42ch;}
  .mg-final-card{background:rgba(229,226,222,.06);border:1px solid rgba(229,226,222,.18);padding:42px 38px;}
  .mg-final-card-title{font-family:"Frank Ruhl Libre",serif;font-size:24px;color:#e5e2de;font-weight:500;line-height:1.25;margin-bottom:24px;}
  .mg-final-card .mg-field input{color:#e5e2de;border-bottom-color:rgba(229,226,222,.3);}
  .mg-final-card .mg-field input::placeholder{color:rgba(229,226,222,.4);}
  .mg-final-card .mg-field label{color:rgba(229,226,222,.55);}
  .mg-final-card .mg-submit{background:#dda96a;color:#233349;}
  .mg-final-card .mg-submit:hover{background:#e5e2de;}
  .mg-final-card .mg-legal{color:rgba(229,226,222,.5);}
  .mg-final-card .mg-legal a{color:rgba(221,169,106,.7);}

  /* FOOTER */
  .mg-footer{background:#f6f3ec;padding:48px 32px;border-top:1px solid #cfc9bd;}
  .mg-footer-inner{
    max-width:1240px;margin:0 auto;
    display:flex;justify-content:space-between;align-items:center;
    font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#6b6f74;
  }
  .mg-footer-links{display:flex;gap:32px;}
  .mg-footer-links a:hover{color:#b16039;}

  /* RESPONSIVE */
  @media(max-width:920px){
    .mg-hero{grid-template-columns:1fr;gap:48px;padding:48px 24px 64px;}
    .mg-topbar-inner{padding:14px 20px;}
    .mg-nav a:not(.mg-pill){display:none;}
    .mg-section{padding:72px 24px;}
    .mg-foryou{grid-template-columns:1fr;gap:40px;}
    .mg-inside-top{grid-template-columns:1fr;gap:32px;margin-bottom:48px;}
    .mg-grid{grid-template-columns:1fr;}
    .mg-about{grid-template-columns:1fr;gap:48px;}
    .mg-portrait{max-width:340px;}
    .mg-final{padding:72px 24px;}
    .mg-final-wrap{grid-template-columns:1fr;gap:48px;}
    .mg-footer-inner{flex-direction:column;gap:18px;text-align:center;}
  }
`;

type Status = "idle" | "loading" | "success" | "error";

function LeadForm({
  id,
  form,
  setForm,
  status,
  onSubmit,
  dark,
  legalText,
}: {
  id: string;
  form: { name: string; email: string };
  setForm: (f: { name: string; email: string }) => void;
  status: Status;
  onSubmit: (e: React.FormEvent) => void;
  dark?: boolean;
  legalText?: ReactNode;
}) {
  if (status === "success") {
    return (
      <div className={`mg-success ${dark ? "mg-dark-success" : ""}`}>
        <p>נרשמת! החוברת יורדת למכשיר שלך.</p>
        <a href="/lead-magnet.pdf" download="חוברת גיל הגשר - הדר ארקדש.pdf">
          הורידי שוב ←
        </a>
      </div>
    );
  }
  return (
    <form className="mg-form" onSubmit={onSubmit}>
      <div className="mg-field">
        <label htmlFor={`${id}-name`}>השם הפרטי שלך</label>
        <input
          id={`${id}-name`}
          type="text"
          placeholder="מאיה"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="mg-field">
        <label htmlFor={`${id}-email`}>כתובת מייל</label>
        <input
          id={`${id}-email`}
          type="email"
          placeholder="name@example.com"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <button type="submit" className="mg-submit" disabled={status === "loading"}>
        <span>{status === "loading" ? "שולחת..." : "שלחי לי את החוברת"}</span>
        <span className="mg-submit-arrow">←</span>
      </button>
      {status === "error" && (
        <p style={{ color: "#b16039", fontSize: 12, margin: "4px 0 0" }}>משהו השתבש, נסי שוב.</p>
      )}
      <p className="mg-legal">
        {legalText ?? (
          <>המייל שלך נשמר אצלנו בלבד. אפשר להסיר את עצמך בכל רגע, בלחיצה אחת.{" "}
          <a href="/privacy">מדיניות פרטיות</a></>
        )}
      </p>
    </form>
  );
}

export default function MagnetPage() {
  const [form1, setForm1] = useState({ name: "", email: "" });
  const [status1, setStatus1] = useState<Status>("idle");
  const [form2, setForm2] = useState({ name: "", email: "" });
  const [status2, setStatus2] = useState<Status>("idle");

  async function submit(
    form: { name: string; email: string },
    setStatus: (s: Status) => void
  ) {
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
      a.download = "חוברת גיל הגשר - הדר ארקדש.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mg-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* TOPBAR */}
      <header className="mg-topbar">
        <div className="mg-topbar-inner">
          <a href="#" className="mg-brand">
            <img src="/logo.svg" alt="מעבדת הגשר" style={{ height: 32, width: "auto" }} />
            <span className="mg-brand-name">מעבדת הגשר</span>
          </a>
          <nav className="mg-nav">
            <a href="#about">על הדר</a>
            <a href="#inside">מה בפנים</a>
            <a href="#cta" className="mg-pill">הורידי בחינם</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="mg-hero">
        <div className="mg-hero-copy">
          <div className="mg-eyebrow">חוברת חינמית · להורדה מיידית</div>
          <h1 className="mg-h1">
            מה באמת<br />
            קורה <em>ביניכם?</em>
          </h1>
          <p className="mg-lede">
            חמש שאלות שיעזרו לך לקרוא את הילד שלך מחדש. ללא ציון, ביניך לבין עצמך. חלון לרגעים שאת מפספסת בלי לשים לב.
          </p>
          <div className="mg-meta">
            <span>16 עמודים</span>
            <span className="mg-dot" />
            <span>קריאה של 12 דקות</span>
            <span className="mg-dot" />
            <span>PDF להדפסה</span>
          </div>
        </div>

        <aside className="mg-card">
          <div className="mg-booklet">
            <div className="mg-thumb">
              <div className="t-top">חוברת מס׳ 01</div>
              <div className="t-ttl">מה באמת<br />קורה ביניכם?</div>
              <div className="t-num">מעבדת הגשר</div>
            </div>
            <div>
              <div className="mg-meta-kicker">קבלי לתיבה</div>
              <div className="mg-meta-ttl">החוברת שמתחילה<br />את השיחה.</div>
              <div className="mg-meta-sub">בלי ספאם, בלי הרצאות מכירה. רק החוברת.</div>
            </div>
          </div>
          <LeadForm
            id="hero"
            form={form1}
            setForm={setForm1}
            status={status1}
            onSubmit={(e) => { e.preventDefault(); submit(form1, setStatus1); }}
          />
        </aside>
      </section>

      {/* FOR YOU IF */}
      <section className="mg-section" id="foryou">
        <div className="mg-wrap mg-foryou">
          <div className="mg-foryou-intro">
            <div className="mg-section-eyebrow">בשבילך אם</div>
            <h2 className="mg-section-title">את מרגישה שמשהו השתנה בילד שלך</h2>
            <p>
              גיל הגשר (7–11) מערבב את הקלפים, ואת מוצאת את עצמך מגיבה אחרת ממה שהיה מתאים עד אתמול. החוברת הזו לא תגיד לך מה לעשות. היא תעזור לך לראות מה כבר קורה ביניכם — ומשם להבין מה צריך אחרת.
            </p>
          </div>
          <div className="mg-foryou-list">
            {[
              "הילד שלך בן 8 עד 12, ופתאום הוא נראה לך זר.",
              "השיחות בבית הפכו לעדכוני סטטוס. שאלת, ענה, סוף.",
              "את חוששת שהוא מספר לחברים דברים שלא יספר לך.",
              "קראת ספרי הורות, האזנת לפודקאסטים, וזה עדיין לא ממש זז.",
              "את לא רוצה תוכנית טיפולית. את רוצה את הילד שלך בחזרה.",
            ].map((t, i) => (
              <div className="mg-row" key={i}>
                <div className="mg-row-n">0{i + 1}</div>
                <div className="mg-row-t">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE THE GUIDE */}
      <section className="mg-section mg-inside" id="inside">
        <div className="mg-wrap">
          <div className="mg-inside-top">
            <div>
              <div className="mg-section-eyebrow">מה יש בפנים</div>
              <h2 className="mg-section-title">לא טיפים. סקרנות מחדש.</h2>
            </div>
            <p className="mg-inside-lede">
              החוברת בנויה משלושה חלקים: הסיפור שמאחורי הגישה, ההסבר המדעי לתקופה הזו של הילד, וחמש שאלות פשוטות שאת יכולה לשאול את עצמך אחרי שהוא חוזר הביתה.
            </p>
          </div>
          <div className="mg-grid">
            <article className="mg-cell">
              <div className="mg-cell-num">01</div>
              <div className="mg-cell-ttl">הסיפור<br />של הדר.</div>
              <div className="mg-cell-body">איך התחלתי לראות שהילדה שלי לא מקושרת אליי, ומה למדתי כשהפסקתי לחפש מתכון מוכן.</div>
              <div className="mg-cell-tag">סיפור אישי</div>
            </article>
            <article className="mg-cell">
              <div className="mg-cell-num">02</div>
              <div className="mg-cell-ttl">קצת מדע על<br />גיל הגשר.</div>
              <div className="mg-cell-body">שלוש דינמיקות נוירולוגיות והתפתחותיות שעוברות עליו עכשיו. הן לא קשורות אלייך, הן קשורות לגיל.</div>
              <div className="mg-cell-tag">נוירולוגיה</div>
            </article>
            <article className="mg-cell">
              <div className="mg-cell-num">03</div>
              <div className="mg-cell-ttl">חמש שאלות<br />פשוטות.</div>
              <div className="mg-cell-body">חמש שאלות שאת שואלת את עצמך, לא אותו. שאלות שמחזירות לך את היכולת לקרוא את מה שקורה בלי להסיק מסקנות מוקדמות.</div>
              <div className="mg-cell-tag">תרגול</div>
            </article>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mg-section" id="about">
        <div className="mg-wrap mg-about">
          <div
            className="mg-portrait"
            style={{ backgroundImage: "url('/hadar-portrait.png')" }}
            role="img"
            aria-label="הדר ארקדש"
          />
          <div>
            <div className="mg-section-eyebrow">מי כותבת לך</div>
            <h2 className="mg-about-h2">אני הדר.<br />נעים מאוד.</h2>
            <p className="mg-about-p">
              אני מלווה אמהות בגיל הגשר — התקופה שבה הילד עובר מילד לנער, והקרקע מתחת לרגליים שלך זזה. הגעתי לכאן מהמקום ההוא — הייתי אמא שהיתה בטוחה שהיא עושה הכול נכון, וגיליתי שהילדה שלי נוסעת ממני. החלטתי להפסיק להיות עיוורת — ומאז המלאכה הזו הפכה לליבה שלי.
            </p>
            <p className="mg-about-p">
              אני לא מאמינה במתכונים. אני מאמינה שכשמחזירים לאמא את היכולת לקרוא את הילד שלה, היא יודעת מה לעשות. החוברת הזו היא הצעד הראשון.
            </p>
            <div className="mg-sig">
              <div className="mg-signature">נשיקות, הדר</div>
              <div className="mg-role">
                מדריכת הורים בגישה ההתפתחותית-היקשרותית<br />
                יועצת זוגית EFT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mg-final" id="cta">
        <div className="mg-wrap mg-final-wrap">
          <div>
            <div className="mg-section-eyebrow">החוברת מחכה לך</div>
            <h2 className="mg-final-h2">
              חמש שאלות.<br />
              רגע אחד <em>של שקט.</em>
            </h2>
            <p className="mg-final-lede">
              משאירה את המייל ומקבלת את החוברת לתיבה תוך דקה. אם תרצי, מצרפת אותך גם לאתגר קוד הגשר — שלושה ימים חינמיים שבהם נלמד איך להתנהל בשעות הקשות. זה בידיים שלך.
            </p>
          </div>
          <div className="mg-final-card">
            <div className="mg-final-card-title">קבלי את החוברת עכשיו.</div>
            <LeadForm
              id="cta"
              form={form2}
              setForm={setForm2}
              status={status2}
              onSubmit={(e) => { e.preventDefault(); submit(form2, setStatus2); }}
              dark
              legalText={<>בלחיצה את מאשרת קבלת החוברת ועדכונים מעבדת הגשר. אפשר להסיר את עצמך בכל רגע.{" "}<a href="/privacy">מדיניות פרטיות</a></>}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mg-footer">
        <div className="mg-footer-inner">
          <div>© מעבדת הגשר · הדר ארקדש</div>
          <div className="mg-footer-links">
            <a href="/privacy">מדיניות ותקנון</a>
            <a href="mailto:hadararkadash@gmail.com">צרי קשר</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
