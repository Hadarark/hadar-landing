"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/fbpixel";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const icons = {
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  monitor: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  video: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  map: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  ),
  message: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  quote: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  plus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  minus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
};

// ─── Floating Orbs ────────────────────────────────────────────────────────────

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="animate-float-slow absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,149,108,0.18) 0%, transparent 70%)" }} />
      <div className="animate-float-medium absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(160,82,45,0.12) 0%, transparent 70%)", animationDelay: "3s" }} />
      <div className="animate-float-slow absolute -bottom-20 -left-20 w-[280px] h-[280px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,149,108,0.10) 0%, transparent 70%)", animationDelay: "1.5s" }} />
    </div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

const MARQUEE = ["גיל הגשר","·","הורות מתוך חיבור","·","גיל 7-11","·","חלון ההזדמנויות","·","מעבדת גיל הגשר","·","ליווי אמיתי","·","הורות מתוך ידע","·"];

function Marquee() {
  const doubled = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden bg-[#A0522D] py-3 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-white/90 text-sm font-semibold tracking-widest uppercase mx-6">{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Reveal ───────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "", from = "bottom" }: { children: React.ReactNode; delay?: number; className?: string; from?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const variants = {
    bottom: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  } as const;
  const v = variants[from as keyof typeof variants] ?? variants.bottom;
  return (
    <motion.div ref={ref} variants={v} initial="hidden"
      animate={inView ? "visible" : "hidden"} transition={{ duration: 0.65, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({ children, bg = "bg-[#F5F4F2]", className = "" }: { children: React.ReactNode; bg?: string; className?: string }) {
  return (
    <section className={`${bg} py-20 lg:py-28 px-5 lg:px-16 ${className}`}>
      <div className="max-w-3xl mx-auto">{children}</div>
    </section>
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${light ? "text-[#C8956C]" : "text-[#A0522D]"}`}>
      <span className="inline-block w-8 h-px bg-current" />
      <span className="text-xs font-bold tracking-[0.22em] uppercase">{children}</span>
    </div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────

function CTAButton({ text = "אני רוצה להצטרף", dark = false, full = true }: { text?: string; dark?: boolean; full?: boolean }) {
  const cls = `relative inline-flex items-center justify-center gap-3 font-bold cursor-pointer overflow-hidden group ${full ? "w-full lg:w-auto" : ""} px-10 py-5 text-xl`;
  return (
    <motion.a href="#register"
      whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
      className={`${cls} ${dark ? "bg-white text-[#2C3E5A]" : "bg-[#A0522D] text-white"}`}
      style={!dark ? { boxShadow: "0 4px 32px rgba(160,82,45,0.4)" } : {}}>
      <span className="relative z-10">{text}</span>
      <motion.span className="relative z-10 opacity-70" initial={{ x: 0 }} whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
        {icons.arrow}
      </motion.span>
      {!dark && (
        <motion.div className="absolute inset-0 bg-[#8B4513]"
          initial={{ x: "100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
      )}
    </motion.a>
  );
}

// ─── Sticky CTA ───────────────────────────────────────────────────────────────

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#2C3E5A] border-t border-white/10 px-5 py-3 lg:hidden">
          <a href="#register" className="block w-full bg-[#A0522D] text-white font-bold text-center py-4 text-lg"
            style={{ boxShadow: "0 4px 24px rgba(160,82,45,0.5)" }}>
            אני רוצה להצטרף
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-right text-navy font-bold text-lg hover:text-[#A0522D] transition-colors">
        <span>{q}</span>
        <span className="flex-shrink-0 text-[#A0522D]">{open ? icons.minus : icons.plus}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden">
            <p className="text-navy/65 text-lg leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      localStorage.setItem("registeredEmail", formData.email);
      if (data?.smooveId) localStorage.setItem("smooveId", String(data.smooveId));
      setSubmitted(true);
      trackEvent("InitiateCheckout", {
        value: 299,
        currency: "ILS",
        content_name: "workshop_signup",
      });
      setTimeout(() => {
        window.location.href = "https://secure.cardcom.solutions/EA/EA5/lpskTbNqVUGzncHXQmNZA/PaymentSP";
      }, 1500);
    } catch {
      setError("משהו השתבש, נסי שוב.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="font-assistant text-navy overflow-x-hidden">
      <StickyCTA />

      {/* ══ HEADER ════════════════════════════════════════════════════════════ */}
      <header className="bg-[#2C3E5A] px-5 lg:px-16 pt-7 pb-0 relative z-20">
        <div className="max-w-3xl mx-auto">
          <motion.img src="/logo.svg" alt="הדר ארקדש" className="h-14 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} />
        </div>
      </header>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="bg-[#2C3E5A] hero-grid text-white min-h-[92vh] flex flex-col justify-center px-5 lg:px-16 py-24 relative overflow-hidden">
        <FloatingOrbs />
        <div className="animate-spin-slow absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full border border-[#C8956C]/8 pointer-events-none" aria-hidden="true" />

        <motion.div className="max-w-3xl mx-auto w-full relative z-10" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div className="flex items-center gap-3 mb-8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <span className="h-px flex-1 max-w-[60px] bg-[#C8956C]/50" />
            <p className="text-[#C8956C] text-sm font-bold tracking-[0.2em] uppercase">מילדות להתבגרות</p>
          </motion.div>

          <motion.h1 className="text-4xl lg:text-[3.75rem] font-extrabold leading-[1.15] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25 }}>
            יש לך ילד שהשתנה.
            <br />
            <span className="gradient-text">לא בן לילה — אבל מהר.</span>
          </motion.h1>

          <motion.div className="text-xl text-white/70 mb-10 leading-relaxed space-y-2 max-w-xl"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}>
            <p>פחות חיבוקים. יותר דלתות טרוקות.</p>
            <p>החברים קודם. את — אחר כך.</p>
            <p className="text-white/90 font-semibold">וכל שיחה פשוטה הופכת איכשהו למאבק.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.58 }}>
            <CTAButton dark />
          </motion.div>

          <motion.div className="flex flex-wrap gap-3 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78 }}>
            {["מתחילים 23.05.26", "10 מקומות בלבד", "גוגל מיט · ימי ראשון", "297 ש\"ח בלבד"].map((tag, i) => (
              <span key={i} className="glass text-white/80 text-sm font-medium px-4 py-2 rounded-full">{tag}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <span className="text-white/30 text-xs tracking-widest">גוללים</span>
          <motion.div className="w-px h-8 bg-gradient-to-b from-[#C8956C]/50 to-transparent"
            animate={{ scaleY: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.6, repeat: Infinity }} />
        </motion.div>
      </section>

      {/* ══ MARQUEE ═══════════════════════════════════════════════════════════ */}
      <Marquee />

      {/* ══ PAIN / HOOK ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-white">
        <Reveal>
          <p className="text-2xl lg:text-3xl font-bold leading-relaxed text-navy mb-6">
            ניסית לדבר. הסברת. נסוגת. חיכית.
          </p>
          <p className="text-lg lg:text-xl text-navy/65 leading-relaxed mb-6">
            אולי קראת ספר. אולי שמעת פודקאסט.
            <br />
            אבל הלופ חוזר.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative border-r-4 border-[#C8956C] pr-7 my-10 py-2">
            <span className="absolute -top-3 right-5 text-[#C8956C]/25">{icons.quote}</span>
            <p className="text-navy/55 italic text-xl lg:text-2xl leading-relaxed">
              ואת מתחילה לשאול את עצמך —
              <br />
              מה אני עושה לא נכון?
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-navy font-bold text-xl">לפני שאת עונה על השאלה הזו — רגע.</p>
          <p className="text-[#A0522D] font-bold text-2xl mt-2">
            מה אם מה שצריך להשתנות — מתחיל בך?
          </p>
        </Reveal>
      </Section>

      {/* ══ HADAR'S STORY ════════════════════════════════════════════════════ */}
      <Section bg="bg-[#F5F4F2]">
        <Label>הסיפור שלי</Label>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          <Reveal from="left" className="flex-shrink-0">
            <div className="w-44 h-44 lg:w-56 lg:h-56 overflow-hidden mx-auto lg:mx-0 rounded-full"
              style={{ boxShadow: "0 0 0 4px #C8956C, 0 0 0 8px rgba(200,149,108,0.15)" }}>
              <Image src="/hadar.jpg" alt="הדר ארקדש" width={224} height={224}
                className="w-full h-full object-cover object-top" priority />
            </div>
          </Reveal>

          <div className="flex-1">
            <Reveal>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-navy mb-1">אני הדר ארקדש</h2>
              <p className="text-navy/45 text-base mb-6">אמא לדור, עומר וארי.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-navy/68 text-lg leading-relaxed">
                <p>
                  לפני כמה שנים, בלילה שאני לא שוכחת —
                  עמדתי מול בתי הגדולה, מותשת ומרוקנת,
                  ומשהו בי פשוט... נשבר.
                </p>
                <p>
                  לא צרחתי עליה כי היא עשתה משהו נורא.
                  צרחתי כי <span className="text-navy font-semibold">לא היה לי יותר.</span>
                  כי לא הבנתי מה קורה בינינו.
                  כי כל כלי שניסיתי — לא עבד.
                </p>
                <p>
                  אותו רגע נשא אותי הרבה זמן.
                  לא מרגשות אשמה — אלא מהשאלה:
                  למה אני מגיבה ככה? ומה עושים עם זה?
                </p>
                <p>
                  יצאתי למסע. למדתי מדעי מוח, היקשרות, EFT.
                  הבנתי מה קורה בגיל 7-11 — הגיל שאף אחד לא מסביר באמת.
                  ועבדתי. ועדיין עובדת. כל יום.
                </p>
                <p className="text-[#A0522D] font-bold text-xl">
                  ואת מה שלמדתי — אני מעבירה לך.
                  כדי שייקח לך הרבה פחות זמן.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ══ WHO IT'S FOR ══════════════════════════════════════════════════════ */}
      <Section bg="bg-white">
        <Reveal>
          <Label>למי זה מתאים</Label>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-8">
            המעבדה הזו בשבילך אם:
          </h2>
        </Reveal>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-4 mb-10">
          {[
            "יש לך ילד בגיל 7-11 שמרגיש \"אחר\" ממה שהיה",
            "את חוזרת על אותם קונפליקטים שוב ושוב — ולא מבינה למה",
            "קשה לך לראות את הטוב בו, במיוחד כשיש ילדים קטנים יותר בבית",
            "כבר התחלת תהליך מודעות — ואת מוכנה להסתכל פנימה, לא רק על הילד",
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
              <span className="flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-[#A0522D]/10 flex items-center justify-center text-[#A0522D]">
                {icons.check}
              </span>
              <p className="text-navy text-lg leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <div className="bg-[#F5F4F2] border-r-4 border-navy/20 pr-6 py-5 pl-5">
            <p className="text-navy/50 font-bold text-base mb-2">המעבדה הזו לא בשבילך אם:</p>
            <p className="text-navy/55 text-lg">
              את מחפשת מישהי שתגיד לך מה לעשות עם הילד.
              <br />
              כאן אנחנו מסתכלות עלייך.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ══ MECHANISM / גיל הגשר ════════════════════════════════════════════ */}
      <Section bg="bg-[#F5F4F2]">
        <Reveal>
          <Label>מה באמת קורה</Label>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-navy leading-tight mb-6">
            גיל 7-11 הוא לא גיל ההתבגרות מוקדם.
            <br />
            <span className="text-[#A0522D]">זה גיל הגשר.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4 text-navy/65 text-xl leading-relaxed mb-8">
            <p>
              גיל 0-6? יש המון.
              גיל 12 ומעלה? גיל התבגרות — כולם מכירים.
              <span className="text-navy font-semibold"> אבל גיל 7-11?</span>
            </p>
            <p>
              זה הגיל שבו המוח עובר שינוי ביולוגי אמיתי.
              הילד מתחיל לחפש שייכות מחוץ לבית.
              הקול שלך מתחיל &ldquo;להחליש&rdquo; — לא כי הוא לא אוהב אותך,
              אלא כי המוח שלו עושה בדיוק מה שהוא אמור לעשות.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="bg-[#2C3E5A] text-white p-8 lg:p-10 relative overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(44,62,90,0.25)" }}>
            <div className="animate-breathe absolute -top-10 -left-10 w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(200,149,108,0.2) 0%, transparent 70%)" }} aria-hidden="true" />
            <p className="text-[#C8956C] font-extrabold text-2xl lg:text-3xl mb-4 relative">
              וזה גם חלון ההזדמנויות הכי גדול שיש לך.
            </p>
            <p className="text-white/75 text-lg leading-relaxed relative">
              לפני שמאחר. לפני שהמרחק גדל.
              עבודת עומק שתעשי עכשיו על מערכת היחסים שלכם
              יכולה לשנות את כל מה שיקרה בעשור הקרוב.
            </p>
            <p className="mt-4 text-[#C8956C]/50 text-sm font-medium tracking-wide relative">לא דרמה — מחקר.</p>
          </div>
        </Reveal>
      </Section>

      {/* ══ 4 SESSIONS ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-white">
        <Reveal>
          <Label>מה קורה שם</Label>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-3">
            מעבדת גיל הגשר
          </h2>
          <p className="text-navy/50 text-lg mb-10">4 מפגשים · זום · 75 דקות כל אחד · עד 10 נשים</p>
        </Reveal>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-4">
          {[
            {
              num: "01", title: "מה קורה שם",
              tag: "מפגש 1",
              text: "הביולוגיה של גיל הגשר בשפה פשוטה. למה זה לא גיל התבגרות. למה זה חלון הזדמנויות. ושינוי שפה אחד שמשנה את כל הדינמיקה בבית.",
            },
            {
              num: "02", title: "מה אני מביאה",
              tag: "מפגש 2",
              text: "את הלופ שחוזר — ואת הצורך שמתחתיו. הורה תגובתית מול הורה מובילה. לא לשפוט — להבין.",
            },
            {
              num: "03", title: "מחזירות את הניצוץ",
              tag: "מפגש 3",
              text: "להביא סרטון של הילד מגיל קטן — ולחזור לשם. לספר את הקונפליקט האחרון מהזווית שלו. להתאהב בילד שלך מחדש — עם עיניים אחרות.",
            },
            {
              num: "04", title: "הסביבה שמתחרה בנו",
              tag: "מפגש 4",
              text: "מוכוונות חברים — מה זה באמת אומר ומה זה לא אומר. איך נשארות הדמות המשמעותית כשכולם מושכים לכיוונים אחרים. 3 כלים שעובדים בגיל הזה ספציפית.",
            },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp}
              className="card-hover bg-[#F5F4F2] p-6 lg:p-8 flex gap-6 items-start">
              <div className="flex-shrink-0">
                <span className="block text-5xl lg:text-6xl font-extrabold leading-none"
                  style={{ color: "rgba(200,149,108,0.2)", fontVariantNumeric: "tabular-nums" }}>
                  {item.num}
                </span>
              </div>
              <div className="flex-1 pt-1">
                <span className="text-[#A0522D] text-xs font-bold tracking-widest uppercase mb-2 block">{item.tag}</span>
                <h3 className="font-extrabold text-navy text-xl lg:text-2xl mb-3">{item.title}</h3>
                <p className="text-navy/60 text-base lg:text-lg leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══ BONUS ════════════════════════════════════════════════════════════ */}
      <Section bg="bg-[#2C3E5A]" className="relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50 pointer-events-none" aria-hidden="true" />

        <Reveal>
          <Label light>לפני שמתחילים</Label>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            מפת שורשים אישית
          </h2>
          <p className="text-[#C8956C] font-semibold text-lg mb-6">כלול בחינם · ערך 197 ש&quot;ח</p>
          <p className="text-white/72 text-xl leading-relaxed mb-8 max-w-2xl">
            לפני שמתחילים — תקבלי מפת שורשים אישית של הילד שבחרת.
            כלי שפיתחתי שממפה את שורשי ההיקשרות שלו —
            איפה הקשר זורם, ואיפה הוא חסום.
          </p>
          <p className="text-white/55 text-lg">
            כדי שתגיעי למפגש 1 עם תמונה ברורה — לא עם ניחוש.
          </p>
        </Reveal>
      </Section>

      {/* ══ BETWEEN SESSIONS ═════════════════════════════════════════════════ */}
      <Section bg="bg-[#F5F4F2]">
        <Reveal>
          <Label>בין מפגש למפגש</Label>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-navy mb-8">הליווי לא נגמר כשהזום נסגר</h2>
        </Reveal>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-4">
          {[
            { icon: icons.check, title: "משימה קצרה ומשוב אישי ממני", text: "שליחה בין מפגש למפגש — ומשוב אמיתי, לא גנרי." },
            { icon: icons.message, title: "וואטסאפ פתוח לשיתופים", text: "שאלות ישירות אלי, שיתוף מה קורה בשטח, ותמיכה בזמן אמת." },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="card-hover bg-white p-6 lg:p-7 flex gap-4 items-start">
              <span className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-[#A0522D]/10 flex items-center justify-center text-[#A0522D]">
                {item.icon}
              </span>
              <div>
                <p className="font-bold text-navy text-lg mb-1">{item.title}</p>
                <p className="text-navy/55 text-base">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══ OUTCOME ══════════════════════════════════════════════════════════ */}
      <Section bg="bg-white">
        <Reveal>
          <Label>מה תצאי איתו</Label>
          <p className="text-navy/60 text-xl mb-4">את נכנסת עם:</p>
          <p className="text-2xl font-bold text-navy/70 italic mb-10">
            &ldquo;מה אני עושה לא נכון עם הילד הזה?&rdquo;
          </p>
          <p className="text-navy/60 text-xl mb-4">את יוצאת עם:</p>
          <p className="text-2xl lg:text-3xl font-extrabold text-[#A0522D] leading-relaxed mb-8">
            &ldquo;זה לא הוא — זו אני. אני מבינה מה קורה בי. אני המובילה.&rdquo;
          </p>
          <p className="text-navy/65 text-lg leading-relaxed">
            ועם עיניים שרואות את הילד שלך אחרת —
            את מי שהוא, לא את מה שהוא עושה.
          </p>
        </Reveal>
      </Section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════════════ */}
      <Section bg="bg-[#F5F4F2]">
        <Reveal>
          <Label>בקולן שלהן</Label>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-10">
            מה אומרות אמהות שעבדו איתי
          </h2>
        </Reveal>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-6">
          {[
            { name: "סיון", text: "התהליך איתך לא היה דומה לשום תהליך שעשיתי בעבר. הרגשתי שמרימים אותי, רואים אותי, מכילים אותי ונותנים לי כלים פרקטיים מעולים שאני מרגישה בטוח ליישם. השינוי היה מאוד ניכר." },
            { name: "נועה", text: "מהדד לי המשפט בראש \"הוא רק בן 3\" ואני נותנת לזה להוביל אותי. אני מרגישה שאני מצליחה לקבל יותר עם הומור ולמצוא את הניצוץ בילד החכם שלנו!" },
            { name: "עינב", text: "תודה על הליווי, מההתחלה היית לנו כמו כפפה ליד." },
            { name: "רגינה", text: "על הליווי מהרגע הראשון ועד הרגע האחרון, אין מילים להודות לך. אנחנו מרגישים שהדברים שינו אותנו." },
          ].map((t, i) => (
            <motion.div key={i} variants={fadeUp} className="card-hover bg-white p-6 lg:p-8 relative">
              <span className="absolute top-4 right-4 text-[#C8956C]/20">{icons.quote}</span>
              <p className="text-navy/68 leading-relaxed text-lg mb-4 pt-2">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#C8956C]" />
                <p className="text-[#A0522D] font-bold text-base">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══ LOGISTICS ════════════════════════════════════════════════════════ */}
      <Section bg="bg-white">
        <Reveal>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-navy mb-8">הלוגיסטיקה</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: icons.calendar, text: "מתחילים 23.05.26" },
              { icon: icons.clock, text: "ימי ראשון, 20:45 עד 22:00" },
              { icon: icons.monitor, text: "זום — נוח מהבית" },
              { icon: icons.video, text: "כל המפגשים מוקלטים" },
              { icon: icons.users, text: "10 מקומות בלבד" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-center bg-[#F5F4F2] p-5 card-hover">
                <span className="text-[#A0522D] flex-shrink-0">{item.icon}</span>
                <p className="text-navy text-base font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ══ PRICE ════════════════════════════════════════════════════════════ */}
      <Section bg="bg-[#1E2D42]" className="relative overflow-hidden">
        <div className="animate-breathe absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,149,108,0.15) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
          aria-hidden="true" />
        <Reveal>
          <div className="relative glass p-8 lg:p-12 text-center" style={{ maxWidth: 480, margin: "0 auto" }}>
            <p className="text-white/45 text-base mb-1">ערך המעבדה</p>
            <p className="text-white/30 text-3xl font-bold line-through mb-2">797 ש&quot;ח</p>
            <p className="text-[#C8956C] text-base mb-4 font-medium">מחזור פיילוט · 10 מקומות בלבד</p>
            <div className="animate-pulse-glow inline-block rounded-2xl px-10 py-6 mb-4 bg-[#A0522D]">
              <p className="text-white text-8xl font-extrabold leading-none">297</p>
              <p className="text-white/80 text-2xl font-bold">ש&quot;ח</p>
            </div>
            <p className="text-[#C8956C]/70 text-sm mb-4">מחזור הבא — 497 ש&quot;ח</p>
            <p className="text-white/68 text-lg leading-relaxed mb-4">
              כולל: 4 מפגשי זום + מפת שורשים אישית + ליווי בוואטסאפ + משוב אישי על המשימות.
            </p>
            <p className="text-[#C8956C] font-bold text-lg mb-8">המחיר הזה לא יחזור.</p>
            <CTAButton dark />
          </div>
        </Reveal>
      </Section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <Section bg="bg-white">
        <Reveal>
          <Label>שאלות נפוצות</Label>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-navy mb-8">יש לך שאלה?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-navy/10 border-t border-navy/10">
            <FAQItem q="זה מתאים גם לאבות?" a="כן. כל הורה שרוצה להבין מה קורה בו מוזמן." />
            <FAQItem q="מה אם פספסתי מפגש?" a="יהיה רישום של כל מפגש, מחכה לך." />
            <FAQItem q="יש החזר כספי?" a="אין — אבל יש אחריות שלי לתת לך ערך אמיתי בכל מפגש." />
            <FAQItem q="מה ההבדל בינך לבין ספר של נויפלד?" a="ספר נותן ידע. אני עובדת על המיינדסט שלך — עם כלי אימון, תרגילים חיים, ומשוב אישי. זה שונה לגמרי." />
          </div>
        </Reveal>
      </Section>

      {/* ══ CLOSING QUOTE ════════════════════════════════════════════════════ */}
      <Section bg="bg-[#F5F4F2]">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="block text-[#C8956C]/30 mb-4 mx-auto w-fit">{icons.quote}</span>
          <p className="text-navy text-2xl lg:text-3xl font-bold leading-relaxed italic mb-6">
            בהורות אין ערובות. אבל יש דרך.
            <br />
            בואי נמצא אותה ביחד.
          </p>
        </Reveal>
      </Section>

      {/* ══ REGISTER FORM ════════════════════════════════════════════════════ */}
      <Section bg="bg-[#2C3E5A]" className="relative overflow-hidden">
        <div className="animate-float-slow absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,149,108,0.1) 0%, transparent 70%)" }} aria-hidden="true" />

        <div id="register" className="relative">
          <Reveal>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">הדר, אני בפנים!</h2>
            <p className="text-white/55 text-lg mb-8">שרייני לי מקום במעבדה</p>
          </Reveal>

          {submitted ? (
            <Reveal>
              <div className="glass p-8 text-center">
                <p className="text-3xl font-extrabold text-white mb-3">קיבלתי!</p>
                <p className="text-white/65 text-lg mb-6">השלב האחרון — תשלום להבטחת המקום שלך.</p>
                <a href="https://secure.cardcom.solutions/EA/EA5/lpskTbNqVUGzncHXQmNZA/PaymentSP"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-[#A0522D] text-white font-bold px-10 py-4 text-xl hover:opacity-90 transition-opacity"
                  style={{ boxShadow: "0 4px 32px rgba(160,82,45,0.4)" }}>
                  לתשלום מאובטח ←
                </a>
                <p className="text-white/25 text-sm mt-5">297 ש&quot;ח · קארדקום מאובטח</p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { type: "text", placeholder: "שם מלא", key: "name" },
                  { type: "email", placeholder: "מייל", key: "email" },
                  { type: "tel", placeholder: "נייד", key: "phone" },
                ].map(({ type, placeholder, key }) => (
                  <input key={key} type={type} placeholder={placeholder} required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    dir={key === "phone" ? "ltr" : undefined}
                    className="w-full border border-white/15 bg-white/8 backdrop-blur-sm px-5 py-4 text-white text-lg placeholder:text-white/35 focus:border-[#C8956C] focus:outline-none transition-colors" />
                ))}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 flex-shrink-0 accent-[#C8956C]" />
                  <span className="text-white/45 text-sm leading-relaxed">
                    קראתי ואני מסכימה ל<a href="/privacy" target="_blank" className="underline text-[#C8956C]">מדיניות הפרטיות</a> ולקבלת עדכונים ותכנים במייל מהדר ארקדש.
                  </span>
                </label>

                <motion.button type="submit" disabled={loading || !consent}
                  whileHover={{ scale: loading || !consent ? 1 : 1.02, y: loading || !consent ? 0 : -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#A0522D] text-white font-extrabold py-5 text-xl transition-all disabled:opacity-50"
                  style={{ boxShadow: consent ? "0 4px 32px rgba(160,82,45,0.45)" : "none" }}>
                  {loading ? "שולחת..." : "אני רוצה להצטרף"}
                </motion.button>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <p className="text-white/30 text-sm text-center">10 מקומות בלבד. המחיר הזה לא יחזור.</p>
              </form>
            </Reveal>
          )}
        </div>
      </Section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-[#1A2535] text-center py-10 px-5">
        <img src="/logo.svg" alt="הדר ארקדש" className="h-11 w-auto mx-auto mb-4 opacity-40"
          style={{ filter: "brightness(0) invert(1)" }} />
        <p className="text-white/30 text-sm">הורות. זוגיות. התפתחות.</p>
        <p className="text-white/15 text-xs mt-2">© 2026 הדר ארקדש</p>
      </footer>
    </main>
  );
}
