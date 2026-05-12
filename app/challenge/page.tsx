"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/fbpixel";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&family=Frank+Ruhl+Libre:wght@400;500;700;900&display=swap');

  .ch-root *{box-sizing:border-box;}
  .ch-root{
    font-family:"Heebo",sans-serif;
    direction:rtl;
    -webkit-font-smoothing:antialiased;
    line-height:1.55;
    color:#233349;
  }
  .ch-root a{color:inherit;text-decoration:none;}

  /* ── BLOCK 1 · HERO ────────────────────────────────────────────────── */
  .ch-hero{
    background:#233349;
    color:#e5e2de;
    padding:88px 24px 96px;
    text-align:center;
    position:relative;
    overflow:hidden;
  }
  .ch-hero::before{
    content:"";
    position:absolute;
    top:-200px;left:50%;transform:translateX(-50%);
    width:760px;height:760px;
    background:radial-gradient(circle at center,rgba(221,169,106,.14) 0%,rgba(221,169,106,.04) 35%,transparent 65%);
    pointer-events:none;
    animation:ch-glow 8s ease-in-out infinite;
  }
  .ch-hero::after{
    content:"";
    position:absolute;
    bottom:-160px;right:-120px;
    width:380px;height:380px;
    border-radius:50%;
    background:radial-gradient(circle,rgba(177,96,57,.18) 0%,transparent 70%);
    pointer-events:none;
    animation:ch-float 11s ease-in-out infinite;
  }
  @keyframes ch-glow{
    0%,100%{opacity:.8;transform:translateX(-50%) scale(1);}
    50%{opacity:1;transform:translateX(-50%) scale(1.05);}
  }
  @keyframes ch-float{
    0%,100%{transform:translate(0,0);}
    50%{transform:translate(-30px,-20px);}
  }
  @keyframes ch-shimmer{
    0%{background-position:-200% center;}
    100%{background-position:200% center;}
  }

  .ch-hero-inner{max-width:640px;margin:0 auto;position:relative;z-index:1;}
  .ch-logo{
    height:54px;width:auto;display:block;margin:0 auto 40px;
    filter:brightness(0) invert(1);
    opacity:.92;
  }
  @media(max-width:560px){
    .ch-logo{height:44px;margin-bottom:32px;}
  }
  .ch-eyebrow{
    font-size:11px;letter-spacing:.36em;text-transform:uppercase;
    color:#dda96a;font-weight:500;margin-bottom:32px;
    display:inline-flex;align-items:center;gap:14px;
  }
  .ch-eyebrow::before,
  .ch-eyebrow::after{
    content:"";width:28px;height:1px;background:#dda96a;opacity:.6;
  }
  .ch-h1{
    font-family:"Frank Ruhl Libre",serif;
    font-weight:500;
    font-size:clamp(40px,7vw,64px);
    line-height:1.08;
    letter-spacing:-.015em;
    color:#e5e2de;
    margin:0 0 28px;
  }
  .ch-h1 em{font-style:italic;font-weight:400;color:#dda96a;}
  .ch-hero-lede{
    font-size:18px;
    line-height:1.7;
    font-weight:300;
    color:rgba(229,226,222,.85);
    margin:0 auto 16px;
    max-width:520px;
  }
  .ch-hero-lede strong{font-weight:500;color:#e5e2de;}

  .ch-hero-gold{
    font-family:"Frank Ruhl Libre",serif;
    font-weight:500;
    font-size:clamp(22px,3.8vw,30px);
    line-height:1.2;
    margin:28px 0 14px;
    letter-spacing:-.005em;
    background:linear-gradient(90deg,#dda96a 0%,#fff5ea 50%,#dda96a 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:ch-shimmer 6s linear infinite;
  }
  .ch-hero-promise{
    font-size:17px;
    line-height:1.7;
    font-weight:300;
    color:rgba(229,226,222,.7);
    margin:0 auto 44px;
    max-width:500px;
    padding-top:24px;
    border-top:1px solid rgba(229,226,222,.15);
  }

  /* HERO FORM CARD */
  .ch-hero-card{
    background:rgba(255,255,255,.04);
    border:1px solid rgba(229,226,222,.2);
    padding:32px 28px 30px;
    margin:0 auto;
    max-width:440px;
    text-align:right;
    backdrop-filter:blur(10px);
    -webkit-backdrop-filter:blur(10px);
    position:relative;
  }
  .ch-hero-card::before{
    content:"";
    position:absolute;
    inset:-1px;
    border:1px solid rgba(221,169,106,.25);
    pointer-events:none;
    transform:translate(6px,6px);
    z-index:-1;
  }
  .ch-hero-card-title{
    font-family:"Frank Ruhl Libre",serif;
    font-size:18px;font-weight:500;
    color:#dda96a;text-align:center;
    margin:0 0 22px;letter-spacing:.02em;
  }

  /* ── BLOCK 2 · DAYS ────────────────────────────────────────────────── */
  .ch-days{
    background:#e5e2de;
    color:#233349;
    padding:96px 24px;
    position:relative;
    overflow:hidden;
  }
  .ch-days::before{
    content:"";
    position:absolute;
    top:-100px;left:-100px;
    width:300px;height:300px;
    border-radius:50%;
    background:radial-gradient(circle,rgba(177,96,57,.06) 0%,transparent 70%);
    pointer-events:none;
  }
  .ch-days-inner{max-width:640px;margin:0 auto;position:relative;z-index:1;}
  .ch-days-eyebrow{
    font-size:11px;letter-spacing:.32em;text-transform:uppercase;
    color:#b16039;font-weight:500;text-align:center;margin-bottom:18px;
  }
  .ch-days-title{
    font-family:"Frank Ruhl Libre",serif;
    font-weight:500;
    font-size:clamp(32px,5.5vw,46px);
    line-height:1.1;
    letter-spacing:-.01em;
    text-align:center;
    margin:0 0 16px;
    color:#233349;
  }
  .ch-days-title em{font-style:italic;color:#b16039;font-weight:400;}
  .ch-days-dates{
    text-align:center;
    font-size:13px;letter-spacing:.18em;text-transform:uppercase;
    color:#6b6f74;font-weight:500;margin-bottom:14px;
  }
  .ch-days-intro{
    font-size:16px;line-height:1.75;font-weight:300;
    color:#233349;text-align:center;
    max-width:520px;margin:0 auto 56px;
  }
  .ch-days-intro strong{font-weight:500;color:#b16039;}

  .ch-day{
    border-top:1px solid rgba(35,51,73,.18);
    padding:36px 0;
    display:grid;
    grid-template-columns:auto 1fr;
    gap:24px;
    align-items:start;
    transition:padding-right .3s ease;
  }
  .ch-day:last-of-type{border-bottom:1px solid rgba(35,51,73,.18);}
  .ch-day:hover{padding-right:8px;}
  .ch-day-time{
    font-family:"Frank Ruhl Libre",serif;
    font-size:clamp(36px,7vw,48px);
    line-height:1;
    color:#b16039;
    font-weight:500;
    letter-spacing:-.01em;
    font-feature-settings:"tnum";
    min-width:108px;
    transition:transform .3s ease;
  }
  .ch-day:hover .ch-day-time{transform:scale(1.05);}
  .ch-day-meta{
    font-size:11px;letter-spacing:.22em;text-transform:uppercase;
    color:#6b6f74;font-weight:500;margin-bottom:8px;
  }
  .ch-day-title{
    font-family:"Frank Ruhl Libre",serif;
    font-size:22px;line-height:1.3;font-weight:500;
    color:#233349;margin:0 0 10px;
  }
  .ch-day-body{
    font-size:15px;line-height:1.7;font-weight:300;
    color:#233349;margin:0;
  }

  .ch-bonus{
    margin-top:40px;
    padding:24px 26px;
    background:rgba(177,96,57,.08);
    border-right:3px solid #b16039;
    font-size:15px;line-height:1.65;font-weight:300;
  }
  .ch-bonus strong{font-weight:500;color:#b16039;}

  /* ── MICRO BLOCK · ABOUT ──────────────────────────────────────────── */
  .ch-about{
    background:#f1ece2;
    color:#233349;
    padding:80px 24px;
    text-align:center;
    border-top:1px solid rgba(177,96,57,.12);
    position:relative;
    overflow:hidden;
  }
  .ch-about-inner{max-width:540px;margin:0 auto;position:relative;z-index:1;}
  .ch-about-portrait{
    width:120px;height:120px;
    margin:0 auto 24px;
    border-radius:50%;
    overflow:hidden;
    border:3px solid #dda96a;
    box-shadow:0 8px 24px rgba(35,51,73,.12);
  }
  .ch-about-portrait img{width:100%;height:100%;object-fit:cover;object-position:top;}
  .ch-about-title{
    font-family:"Frank Ruhl Libre",serif;
    font-size:clamp(26px,4.8vw,34px);
    font-weight:500;
    color:#233349;
    margin:0 0 22px;
    letter-spacing:-.005em;
  }
  .ch-about-body{
    font-size:16px;line-height:1.85;font-weight:300;
    color:#233349;margin:0 0 14px;
  }
  .ch-about-body strong{font-weight:500;color:#b16039;}
  .ch-about-cta{
    font-family:"Frank Ruhl Libre",serif;
    font-size:19px;line-height:1.5;
    color:#b16039;font-weight:500;
    margin:18px 0 24px;font-style:italic;
  }
  .ch-signature{
    height:64px;width:auto;display:block;margin:8px auto 0;
    filter:contrast(1.3) brightness(0.85);
    opacity:.85;
  }

  /* ── BLOCK 3 · FINAL CTA + FORM ────────────────────────────────────── */
  .ch-final{
    background:#b16039;
    color:#e5e2de;
    padding:96px 24px 104px;
    text-align:center;
    position:relative;
    overflow:hidden;
  }
  .ch-final::before{
    content:"";
    position:absolute;
    top:-180px;right:-180px;
    width:500px;height:500px;
    border-radius:50%;
    background:radial-gradient(circle,rgba(221,169,106,.22) 0%,transparent 70%);
    pointer-events:none;
    animation:ch-float 13s ease-in-out infinite;
  }
  .ch-final-inner{max-width:600px;margin:0 auto;position:relative;z-index:1;}
  .ch-final-kicker{
    font-size:11px;letter-spacing:.32em;text-transform:uppercase;
    color:#dda96a;font-weight:500;margin-bottom:24px;
  }
  .ch-final-title{
    font-family:"Frank Ruhl Libre",serif;
    font-weight:500;
    font-size:clamp(32px,5.6vw,46px);
    line-height:1.15;
    letter-spacing:-.01em;
    color:#e5e2de;
    margin:0 0 28px;
  }
  .ch-final-title em{font-style:italic;color:#fff5ea;}

  .ch-meta-row{
    display:flex;justify-content:center;flex-wrap:wrap;
    gap:10px 12px;margin:0 auto 36px;
  }
  .ch-meta-pill{
    padding:8px 20px;
    border:1px solid rgba(229,226,222,.4);
    border-radius:999px;
    font-size:13px;letter-spacing:.14em;text-transform:uppercase;
    color:rgba(229,226,222,.9);font-weight:500;
    background:rgba(255,255,255,.04);
  }

  /* FORM (shared) */
  .ch-form{
    display:flex;flex-direction:column;gap:16px;
    text-align:right;max-width:440px;margin:0 auto;
  }
  .ch-field{display:flex;flex-direction:column;gap:6px;}
  .ch-field label{
    font-size:11px;letter-spacing:.18em;text-transform:uppercase;
    color:rgba(229,226,222,.65);font-weight:500;
  }
  .ch-field input{
    background:transparent;border:none;
    border-bottom:1px solid rgba(229,226,222,.35);
    padding:10px 0 12px;
    font-size:15px;font-family:"Heebo",sans-serif;
    color:#fff5ea;direction:rtl;outline:none;
    transition:border-color .2s;width:100%;
  }
  .ch-field input:focus{border-bottom-color:#dda96a;}
  .ch-field input::placeholder{color:rgba(229,226,222,.4);}

  .ch-consent{
    display:flex;align-items:flex-start;gap:10px;margin-top:6px;
  }
  .ch-consent input[type="checkbox"]{
    width:16px;height:16px;flex-shrink:0;margin-top:3px;
    accent-color:#dda96a;cursor:pointer;
  }
  .ch-consent label{
    font-size:12px;line-height:1.55;
    color:rgba(229,226,222,.7);cursor:pointer;
  }
  .ch-consent label a{color:#dda96a;text-decoration:underline;}

  .ch-submit{
    margin-top:14px;
    background:#dda96a;color:#233349;
    border:none;padding:20px 28px;
    font-family:"Heebo",sans-serif;font-weight:600;
    font-size:16px;letter-spacing:.04em;
    cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:14px;
    transition:background .2s, transform .2s, box-shadow .2s;
    width:100%;position:relative;overflow:hidden;
  }
  .ch-submit::before{
    content:"";position:absolute;inset:0;
    background:linear-gradient(120deg,transparent 30%,rgba(255,245,234,.5) 50%,transparent 70%);
    transform:translateX(-100%);
    transition:transform .6s;
  }
  .ch-submit:hover:not(:disabled){
    background:#fff5ea;transform:translateY(-2px);
    box-shadow:0 12px 32px rgba(35,51,73,.25);
  }
  .ch-submit:hover:not(:disabled)::before{transform:translateX(100%);}
  .ch-submit:disabled{opacity:.5;cursor:not-allowed;}
  .ch-submit-arrow{font-family:"Frank Ruhl Libre",serif;font-size:22px;line-height:1;position:relative;}
  .ch-error{font-size:13px;color:#fff5ea;text-align:center;margin:6px 0 0;}

  .ch-success{
    text-align:center;
    border:1px solid rgba(229,226,222,.2);
    padding:36px 28px;
    background:rgba(255,255,255,.04);
  }
  .ch-success-title{
    font-family:"Frank Ruhl Libre",serif;
    font-size:28px;color:#fff5ea;
    margin:0 0 14px;font-weight:500;
  }
  .ch-success-body{
    font-size:15px;line-height:1.7;font-weight:300;
    color:rgba(229,226,222,.85);margin:0 0 24px;
  }
  .ch-whatsapp-cta{
    display:inline-flex;align-items:center;justify-content:center;gap:12px;
    background:#25D366;color:#fff;
    padding:18px 32px;
    font-family:"Heebo",sans-serif;font-weight:600;
    font-size:16px;letter-spacing:.04em;
    text-decoration:none;
    transition:background .2s, transform .2s, box-shadow .2s;
    box-shadow:0 8px 24px rgba(37,211,102,.35);
  }
  .ch-whatsapp-cta:hover{
    background:#1ebe57;transform:translateY(-2px);
    box-shadow:0 12px 32px rgba(37,211,102,.45);
  }
  .ch-whatsapp-cta svg{flex-shrink:0;}

  /* FOOTER */
  .ch-footer{
    background:#1a2535;
    padding:36px 24px;
    text-align:center;
    color:rgba(229,226,222,.5);
    font-size:12px;letter-spacing:.14em;
  }
  .ch-footer-name{
    color:#dda96a;font-weight:500;letter-spacing:.18em;
    text-transform:uppercase;
  }
  .ch-footer-sep{margin:0 8px;opacity:.4;}
  .ch-footer a:hover{color:#fff5ea;}

  /* RESPONSIVE */
  @media(max-width:560px){
    .ch-hero{padding:64px 22px 72px;}
    .ch-days{padding:72px 22px;}
    .ch-about{padding:64px 22px;}
    .ch-final{padding:72px 22px 88px;}
    .ch-day{grid-template-columns:1fr;gap:8px;padding:30px 0;}
    .ch-day-time{min-width:0;}
    .ch-eyebrow::before,.ch-eyebrow::after{width:18px;}
    .ch-hero-card{padding:26px 22px;}
    .ch-hero-card::before{display:none;}
    .ch-about-portrait{width:100px;height:100px;}
  }
`;

type Status = "idle" | "loading" | "success" | "error";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export default function ChallengePage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/challenge-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      trackEvent("Lead", { content_name: "challenge_signup" });
    } catch {
      setStatus("error");
    }
  }

  function renderForm(idPrefix: string) {
    if (status === "success") {
      return (
        <div className="ch-success">
          <p className="ch-success-title">קיבלתי!</p>
          <p className="ch-success-body">
            השלב האחרון — הצטרפי לקבוצת הוואטסאפ של האתגר.<br />
            שם תקבלי את ההודעה הראשונה ביום ראשון בבוקר.
          </p>
          <a
            href="https://chat.whatsapp.com/KCxJIyHGc4qIegQW2vwYgY"
            target="_blank"
            rel="noopener noreferrer"
            className="ch-whatsapp-cta"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>להצטרפות לקבוצה</span>
            <span className="ch-submit-arrow">←</span>
          </a>
        </div>
      );
    }
    return (
      <form className="ch-form" onSubmit={onSubmit}>
        <div className="ch-field">
          <label htmlFor={`${idPrefix}-name`}>השם הפרטי שלך</label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="מאיה"
          />
        </div>
        <div className="ch-field">
          <label htmlFor={`${idPrefix}-email`}>כתובת מייל</label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@example.com"
          />
        </div>
        <div className="ch-consent">
          <input
            id={`${idPrefix}-consent`}
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label htmlFor={`${idPrefix}-consent`}>
            קראתי ואני מסכימה ל
            <a href="/privacy" target="_blank">מדיניות הפרטיות</a> ולקבלת
            עדכונים ותכנים במייל ובוואטסאפ. ניתן להסיר את עצמך בכל עת.
          </label>
        </div>
        <motion.button
          type="submit"
          className="ch-submit"
          disabled={status === "loading" || !consent}
          whileTap={{ scale: 0.98 }}
        >
          <span>
            {status === "loading"
              ? "שולחת..."
              : idPrefix === "hero"
                ? "אני בפנים"
                : "אני נכנסת לאתגר"}
          </span>
          <span className="ch-submit-arrow">←</span>
        </motion.button>
        {status === "error" && (
          <p className="ch-error">משהו השתבש, נסי שוב.</p>
        )}
      </form>
    );
  }

  return (
    <div className="ch-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ══ BLOCK 1 · HERO ════════════════════════════════════════════ */}
      <section className="ch-hero">
        <motion.div
          className="ch-hero-inner"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.img
            src="/logo.svg"
            alt="הדר ארקדש"
            className="ch-logo"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          />

          <motion.div className="ch-eyebrow" variants={fadeUp} transition={{ duration: 0.6 }}>
            אתגר חינמי · 3 ימים
          </motion.div>

          <motion.h1 className="ch-h1" variants={fadeUp} transition={{ duration: 0.7 }}>
            גיל הגשר.<br />
            זה <em>לא</em> גיל ההתבגרות.<br />
            עדיין.
          </motion.h1>

          <motion.p className="ch-hero-lede" variants={fadeUp} transition={{ duration: 0.6 }}>
            זה הגיל שבו הילד שלך כבר לא ילד —<br />
            אבל עדיין לא מתבגר.
          </motion.p>
          <motion.p className="ch-hero-lede" variants={fadeUp} transition={{ duration: 0.6 }}>
            זה ה־<strong>MONEY TIME</strong> שלך.<br />
            לשפר. לשקם. לתקן. לחבר.
          </motion.p>

          <motion.p className="ch-hero-gold" variants={fadeUp} transition={{ duration: 0.7 }}>
            זאת הזדמנות הזהב שלך
          </motion.p>

          <motion.p className="ch-hero-promise" variants={fadeUp} transition={{ duration: 0.6 }}>
            ככה, כשהוא יכנס לגיל ההתבגרות<br />
            מערכת היחסים שלכם תהיה המקום הבטוח שלו.
          </motion.p>

          <motion.div
            className="ch-hero-card"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="ch-hero-card-title">אני נכנסת לאתגר ←</p>
            {renderForm("hero")}
          </motion.div>
        </motion.div>
      </section>

      {/* ══ BLOCK 2 · 3 DAYS ══════════════════════════════════════════ */}
      <section className="ch-days">
        <div className="ch-days-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="ch-days-eyebrow">מה יקרה ב־3 הימים</div>
            <h2 className="ch-days-title">
              קוד <em>הקשר</em>
            </h2>
            <p className="ch-days-dates">24–26 במאי</p>
            <p className="ch-days-intro">
              כל יום, בשעה אחת מדויקת ביום, תקבלי <strong>הודעת וואטסאפ</strong> ממני —
              בדיוק ברגע שהקשר נשבר.
            </p>
          </motion.div>

          {[
            {
              time: "13:00",
              meta: "יום 1 · אחר הצהריים",
              title: "הוואקום של אחר הצהריים",
              body: "את בעבודה. הוא בבית. הנייד רוטט בלי סוף.",
            },
            {
              time: "16:00",
              meta: "יום 2 · החזרה הביתה",
              title: "התנגשות חזיתית",
              body: "10 הדקות הראשונות במפגש המחודש שלכם (כשאת חוזרת מהעבודה) יקבעו הכל.",
            },
            {
              time: "21:00",
              meta: "יום 3 · לפני השינה",
              title: "לתת לו לנצח",
              body: "הקוד שמשנה את הדינמיקה — לתמיד.",
            },
          ].map((d, i) => (
            <motion.div
              key={i}
              className="ch-day"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
            >
              <div className="ch-day-time">{d.time}</div>
              <div>
                <div className="ch-day-meta">{d.meta}</div>
                <h3 className="ch-day-title">{d.title}</h3>
                <p className="ch-day-body">{d.body}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="ch-bonus"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <strong>בנוסף:</strong> מייל בוקר שמכין אותך לקוד של אותו היום —
            שתביני למה את עושה את זה.
          </motion.div>
        </div>
      </section>

      {/* ══ MICRO · ABOUT ═════════════════════════════════════════════ */}
      <section className="ch-about">
        <motion.div
          className="ch-about-inner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="ch-about-portrait">
            <img src="/hadar.jpg" alt="הדר ארקדש" />
          </div>
          <h2 className="ch-about-title">אני הדר. נעים להכיר ♡</h2>
          <p className="ch-about-body">
            מדריכת הורים, יועצת זוגית ואמא ל־3 —
            הבכורה <strong>בעיצומה של גיל הגשר</strong> (9.5).
          </p>
          <p className="ch-about-body">
            אני מאמינה במערכות יחסים, ושקשר זה הבסיס להכל.
          </p>
          <p className="ch-about-cta">
            תצטרפי אלי להבין את הילד.ה שלך יותר!
          </p>
          <img src="/signature.png" alt="הדר" className="ch-signature" />
        </motion.div>
      </section>

      {/* ══ BLOCK 3 · FINAL CTA + FORM ════════════════════════════════ */}
      <section className="ch-final" id="register">
        <motion.div
          className="ch-final-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div className="ch-final-kicker" variants={fadeUp} transition={{ duration: 0.6 }}>
            מתחילים יום ראשון · 24 במאי
          </motion.div>
          <motion.h2 className="ch-final-title" variants={fadeUp} transition={{ duration: 0.7 }}>
            רק את, אני,<br />
            ו־3 רגעים שאת הולכת<br />
            להפוך אותם <em>לאחרים.</em>
          </motion.h2>

          <motion.div className="ch-meta-row" variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="ch-meta-pill">חינמי</span>
            <span className="ch-meta-pill">קצר</span>
            <span className="ch-meta-pill">פרקטי</span>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.7 }}>
            {renderForm("final")}
          </motion.div>
        </motion.div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════ */}
      <footer className="ch-footer">
        <div>
          <span className="ch-footer-name">הדר ארקדש</span>
          <span className="ch-footer-sep">|</span>
          <span>הורות. זוגיות. התפתחות.</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 11, opacity: 0.7 }}>
          © 2026 · <a href="/privacy">מדיניות פרטיות</a>
        </div>
      </footer>
    </div>
  );
}
