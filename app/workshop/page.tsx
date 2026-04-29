"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// ─── Counter Hook ─────────────────────────────────────────────────────────────

function useCounter(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const inc = target / (duration / 16);
    const t = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return count;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const Icon = {
  calendar: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>),
  monitor: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>),
  video: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>),
  users: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  map: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>),
  message: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
  check: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>),
  arrow: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
  quote: () => (<svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>),
  plus: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
  minus: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>),
};

// ─── Floating Orb ─────────────────────────────────────────────────────────────

function Orb({ size = 400, color, top, right, bottom, left, delay = 0, opacity = 0.18 }:
  { size?: number; color: string; top?: string; right?: string; bottom?: string; left?: string; delay?: number; opacity?: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, top, right, bottom, left, filter: "blur(2px)" }}
      animate={{ scale: [1, 1.12, 1], opacity: [opacity * 0.8, opacity, opacity * 0.8] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }} />
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.div className={`flex items-center gap-3 mb-5 ${light ? "text-[#C8956C]" : "text-[#A0522D]"}`}
      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
      <span className="inline-block w-8 h-px bg-current" />
      <span className="text-xs font-bold tracking-[0.22em] uppercase">{children}</span>
    </motion.div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────

function CTAButton({ text = "אני רוצה להצטרף", variant = "dark", full = true }:
  { text?: string; variant?: "dark" | "light"; full?: boolean }) {
  return (
    <motion.a href="#register"
      className={`group relative inline-flex items-center justify-center gap-3 font-bold overflow-hidden cursor-pointer px-10 py-5 text-xl ${full ? "w-full lg:w-auto" : ""} ${variant === "dark" ? "bg-[#A0522D] text-white" : "bg-white text-[#2C3E5A]"}`}
      style={variant === "dark" ? { boxShadow: "0 6px 36px rgba(160,82,45,0.4)" } : {}}
      whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
      <motion.span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/15 to-transparent -skew-x-12"
        initial={{ x: "-120%" }} whileHover={{ x: "220%" }} transition={{ duration: 0.55 }} />
      <span className="relative z-10">{text}</span>
      <motion.span className="relative z-10 opacity-70"
        animate={{ x: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
        <Icon.arrow />
      </motion.span>
    </motion.a>
  );
}

// ─── Sticky CTA ───────────────────────────────────────────────────────────────

function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-[#2C3E5A]/95 backdrop-blur-sm px-4 py-3 border-t border-white/10"
          initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ duration: 0.3 }}>
          <a href="#register" className="block w-full bg-[#A0522D] text-white font-extrabold text-center py-4 text-lg"
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
    <div className="border-b border-[#2C3E5A]/10 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-right text-[#2C3E5A] font-bold text-lg hover:text-[#A0522D] transition-colors">
        <span>{q}</span>
        <span className="flex-shrink-0 text-[#A0522D]">{open ? <Icon.minus /> : <Icon.plus />}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="text-[#2C3E5A]/65 text-lg leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkshopPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeWeek, setActiveWeek] = useState(0);

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const priceRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const priceInView = useInView(priceRef, { once: true });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const c4 = useCounter(4, statsInView);
  const c12 = useCounter(12, statsInView);
  const c75 = useCounter(75, statsInView, 1100);
  const c497 = useCounter(497, priceInView, 1400);

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
      setTimeout(() => {
        window.location.href = "https://secure.cardcom.solutions/EA/EA5/lpskTbNqVUGzncHXQmNZA/PaymentSP";
      }, 1500);
    } catch {
      setError("משהו השתבש, נסי שוב.");
    } finally {
      setLoading(false);
    }
  }

  const weeks = [
    { num: "01", tag: "מפגש 1", title: "החלל שנוצר", text: "מה קורה ביולוגית בגיל 8–11. הוואקום של הצהריים הריקים. ולמה 17:00 הוא השעה שבה הכי הרבה ריבים פורצים — ואיך שוברים את זה." },
    { num: "02", tag: "מפגש 2", title: "לא אשמים, אבל כן אחראיים", text: "ויסות הורי — כי כשאתם מאבדים את זה, הוא מאבד אתכם. נצלול לאהבה. ונכיר כלי מנצח." },
    { num: "03", tag: "מפגש 3", title: "גבולות — איך עושים את זה נכון?", text: "למה ילד שאין לו גבולות הוא ילד בחרדה. דמעות חוסר תוחלת — ולמה הן בעצם חדשות טובות. וניהול מסכים בלי להפוך כל ערב למלחמה." },
    { num: "04", tag: "מפגש 4", title: "אמנות התיקון", text: "כולנו מתפוצצים. המפגש הזה על מה קורה אחרי — כי שם, בדיוק שם, נבנה הקשר האמיתי." },
  ];

  return (
    <main dir="rtl" className="font-assistant bg-[#FAFAF8] text-[#2C3E5A] overflow-x-hidden">
      <StickyBar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div className="absolute inset-0"
          animate={{ background: [
            "linear-gradient(145deg, #2a1e14 0%, #5c3520 30%, #a0522d 60%, #c8956c 80%, #e8d5b0 100%)",
            "linear-gradient(145deg, #1e1810 0%, #6b3d22 30%, #b06030 60%, #c8956c 80%, #dfc99a 100%)",
            "linear-gradient(145deg, #2a1e14 0%, #5c3520 30%, #a0522d 60%, #c8956c 80%, #e8d5b0 100%)",
          ]}} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "55px 55px" }} />

        <Orb color="rgba(232,213,176,0.8)" size={520} top="-80px" right="-80px" delay={0} opacity={0.22} />
        <Orb color="rgba(200,149,108,0.9)" size={380} bottom="60px" right="20px" delay={3} opacity={0.2} />
        <Orb color="rgba(160,82,45,0.8)" size={300} top="40%" left="-60px" delay={1.5} opacity={0.15} />

        <div className="absolute top-6 right-6 lg:right-16 z-20">
          <motion.img src="/logo.svg" alt="הדר ארקדש" className="h-12 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-3xl mx-auto px-6 lg:px-16 w-full pt-24 pb-16">

          <motion.div className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm border border-white/20 px-4 py-2 mb-9"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="w-2 h-2 rounded-full bg-[#C8956C] animate-pulse" />
            <span className="text-white/90 text-sm font-semibold tracking-wide">מחזור ראשון · 12 מקומות בלבד · 497 ש&quot;ח</span>
          </motion.div>

          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="h-px w-10 bg-[#C8956C]/70" />
            <span className="text-[#C8956C] text-xs font-bold tracking-[0.22em] uppercase">מילדות להתבגרות</span>
          </motion.div>

          <motion.h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-7 tracking-tight"
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}>
            יש לך ילד שהשתנה.
            <br />
            <span style={{ background: "linear-gradient(135deg, #C8956C 0%, #E8C49A 50%, #C8956C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              לא בן לילה — אבל מהר.
            </span>
          </motion.h1>

          <motion.div className="text-xl lg:text-2xl text-white/70 mb-10 space-y-2 max-w-lg"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.52 }}>
            <p>פחות חיבוקים. יותר דלתות טרוקות.</p>
            <p>החברים קודם. את — אחר כך.</p>
            <p className="text-white font-semibold">וכל שיחה פשוטה הופכת איכשהו למאבק.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68 }}>
            <CTAButton variant="light" />
          </motion.div>

          <motion.div className="flex flex-wrap gap-x-7 gap-y-2 mt-10 text-white/70 text-sm font-medium"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }}>
            <span>23.05.26</span><span className="text-white/30">|</span>
            <span>ימי ראשון 20:45–22:00</span><span className="text-white/30">|</span>
            <span>זום</span>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <span className="text-white/25 text-xs tracking-[0.2em]">גלי למטה</span>
          <motion.div className="w-px h-9 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </motion.div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <div ref={statsRef} className="bg-[#2C3E5A] py-10 px-6 border-b border-white/5">
        <div className="max-w-3xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { val: c4, label: "מפגשי עומק" },
            { val: c12, label: "מקומות בלבד" },
            { val: c75, label: "דקות כל מפגש" },
            { val: c497, label: 'ש"ח' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <p className="text-4xl lg:text-5xl font-extrabold text-[#C8956C] leading-none mb-1">{s.val}</p>
              <p className="text-white/45 text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══ PAIN / HOOK ═══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label>מה שאת חווה עכשיו</Label>

          <motion.h2 className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] leading-tight mb-10"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            ניסית לדבר. הסברת. נסוגת.
            <br />
            <span className="text-[#A0522D]">אבל הלופ חוזר.</span>
          </motion.h2>

          <motion.div className="relative bg-gradient-to-br from-[#A0522D]/8 to-[#C8956C]/4 border-r-4 border-[#A0522D] pr-8 py-7 pl-6 mb-10"
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <p className="text-[#2C3E5A]/60 italic text-xl lg:text-2xl leading-relaxed mb-3">
              ואת מתחילה לשאול את עצמך — מה אני עושה לא נכון?
            </p>
            <div className="mt-4">
              <p className="text-[#2C3E5A] font-bold text-xl">לפני שאת עונה על השאלה הזו — רגע.</p>
              <p className="text-[#A0522D] font-bold text-2xl mt-1">מה אם מה שצריך להשתנות — מתחיל בך?</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ HOOK — לא מאוחר מדי ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 px-6 lg:px-16 bg-[#2C3E5A] relative overflow-hidden">
        <Orb color="rgba(160,82,45,0.9)" size={400} top="-60px" right="-60px" delay={0} opacity={0.18} />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            זה לא מאוחר מדי.
          </motion.h2>
          <motion.p className="text-2xl lg:text-3xl font-extrabold leading-tight mb-0"
            style={{ background: "linear-gradient(135deg, #C8956C 0%, #E8C49A 50%, #C8956C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}>
            ההיפך — זה בדיוק הזמן.
          </motion.p>
        </div>
      </section>

      {/* ══ HADAR'S STORY ════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#F5F4F2] relative overflow-hidden">
        <Orb color="rgba(200,149,108,0.6)" size={400} top="-80px" left="-80px" delay={1} opacity={0.12} />
        <div className="max-w-3xl mx-auto relative z-10">
          <Label>הסיפור שלי</Label>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            <motion.div className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 mx-auto lg:mx-0">
                <div className="absolute -inset-3 bg-gradient-to-br from-[#A0522D]/20 to-[#C8956C]/10 rounded-full blur-xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden"
                  style={{ boxShadow: "0 0 0 3px #C8956C, 0 0 0 8px rgba(200,149,108,0.12)" }}>
                  <Image src="/hadar.jpg" alt="הדר ארקדש" fill className="object-cover object-top" priority />
                </div>
              </div>
            </motion.div>

            <div className="flex-1">
              <motion.h2 className="text-3xl lg:text-4xl font-extrabold text-[#2C3E5A] mb-1"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                אני הדר ארקדש
              </motion.h2>
              <motion.p className="text-[#2C3E5A]/40 text-base mb-6"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                אמא לדור, עומר וארי.
              </motion.p>
              <motion.div className="space-y-4 text-[#2C3E5A]/68 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                <p>לפני כמה שנים, בלילה שאני לא שוכחת — עמדתי מול בתי הגדולה, מותשת ומרוקנת, ומשהו בי פשוט... נשבר.</p>
                <p>לא צרחתי עליה כי היא עשתה משהו נורא. צרחתי כי <span className="text-[#2C3E5A] font-semibold">לא היה לי יותר.</span> כי לא הבנתי מה קורה בינינו. כי כל כלי שניסיתי — לא עבד.</p>
                <p>יצאתי למסע. למדתי מדעי מוח, היקשרות, EFT. הבנתי מה קורה בגיל 7-11 — הגיל שאף אחד לא מסביר באמת.</p>
                <p className="text-[#A0522D] font-bold text-xl">ואת מה שלמדתי — אני מעבירה לך. כדי שייקח לך הרבה פחות זמן.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHO IT'S FOR ══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label>למי זה מתאים</Label>
          <motion.h2 className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            המעבדה הזו בשבילך אם:
          </motion.h2>

          <div className="space-y-4 mb-10">
            {[
              "יש לך ילד בגיל 7-11 שמרגיש \"אחר\" ממה שהיה",
              "את חוזרת על אותם קונפליקטים שוב ושוב — ולא מבינה למה",
              "קשה לך לראות את הטוב בו, במיוחד כשיש ילדים קטנים יותר בבית",
              "כבר התחלת תהליך מודעות — ואת מוכנה להסתכל פנימה, לא רק על הילד",
            ].map((item, i) => (
              <motion.div key={i} className="flex items-start gap-4"
                initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <span className="flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-[#A0522D]/10 flex items-center justify-center text-[#A0522D]">
                  <Icon.check />
                </span>
                <p className="text-[#2C3E5A] text-lg leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="bg-[#F5F4F2] border-r-4 border-[#2C3E5A]/20 pr-6 py-5 pl-5"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <p className="text-[#2C3E5A]/50 font-bold text-base mb-1">המעבדה הזו לא בשבילך אם:</p>
            <p className="text-[#2C3E5A]/55 text-lg">את מחפשת מישהי שתגיד לך מה לעשות עם הילד. כאן אנחנו מסתכלות עלייך.</p>
          </motion.div>
        </div>
      </section>

      {/* ══ MECHANISM ════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#F5F4F2] relative overflow-hidden">
        <Orb color="rgba(200,149,108,0.6)" size={500} top="-100px" left="-100px" delay={1} opacity={0.12} />
        <div className="max-w-3xl mx-auto relative z-10">
          <Label>מה באמת קורה</Label>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] leading-tight mb-3">
              גיל 7-11 הוא לא גיל ההתבגרות מוקדם.
            </h2>
            <p className="text-4xl lg:text-5xl font-extrabold text-[#A0522D] mb-10">זה גיל הגשר.</p>
          </motion.div>

          <div className="space-y-5 mb-10">
            {[
              "גיל 0-6? יש המון. גיל 12 ומעלה? גיל התבגרות — כולם מכירים. אבל גיל 7-11?",
              "זה הגיל שבו המוח עובר שינוי ביולוגי אמיתי. הילד מתחיל לחפש שייכות מחוץ לבית. הקול שלך מתחיל \"להחליש\" — לא כי הוא לא אוהב אותך, אלא כי המוח שלו עושה בדיוק מה שהוא אמור לעשות.",
            ].map((t, i) => (
              <motion.p key={i} className="text-xl text-[#2C3E5A]/68 leading-relaxed"
                initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}>{t}</motion.p>
            ))}
          </div>

          {/* ── Ferrari Reframe ── */}
          <motion.div className="relative bg-[#2C3E5A] p-8 lg:p-10 overflow-hidden mb-8"
            style={{ boxShadow: "0 24px 60px rgba(44,62,90,0.22)" }}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A0522D] via-[#C8956C] to-[#6B7A5A]" />
            <p className="text-[#C8956C] text-2xl lg:text-3xl font-extrabold mb-5">מנוע של פרארי. ברקסים של אופניים.</p>
            <div className="space-y-2 text-white/72 text-lg leading-relaxed mb-5">
              <p>הוא מרגיש רגשות בעוצמה שהוא לא יכול לעצור — כי החלק במוח שאמור לעצור אותם עדיין בפיגומים.</p>
              <p>הוא לא בוחר להתפוצץ. הוא לא עושה לך את זה. הוא מוצף — ואתם המקום הכי בטוח שלו לשפוך.</p>
            </div>
            <p className="text-white font-bold text-xl">כשמבינים את זה — לא מגיבים מהמקום הנעלב.</p>
            <p className="text-[#C8956C] font-bold text-xl">מגיבים מהמקום שיודע.</p>
          </motion.div>

          <motion.div className="relative bg-[#2C3E5A] p-8 lg:p-10 overflow-hidden"
            style={{ boxShadow: "0 24px 60px rgba(44,62,90,0.22)" }}
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A0522D] via-[#C8956C] to-[#6B7A5A]" />
            <p className="text-[#C8956C] text-2xl lg:text-3xl font-extrabold mb-4">וזה גם חלון ההזדמנויות הכי גדול שיש לך.</p>
            <p className="text-white/72 text-lg leading-relaxed">לפני שמאחר. לפני שהמרחק גדל. עבודת עומק שתעשי עכשיו יכולה לשנות את כל מה שיקרה בעשור הקרוב.</p>
            <p className="mt-4 text-white/30 text-sm tracking-wider">לא דרמה — מחקר.</p>
          </motion.div>
        </div>
      </section>

      {/* ══ 4 SESSIONS — INTERACTIVE TABS ═══════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#2C3E5A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(200,149,108,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,149,108,0.6) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <Orb color="rgba(160,82,45,0.9)" size={440} bottom="-80px" left="-80px" delay={0} opacity={0.2} />

        <div className="max-w-3xl mx-auto relative z-10">
          <Label light>מה קורה שם</Label>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-3">מעבדת גיל הגשר</h2>
            <p className="text-white/45 text-lg mb-12">4 מפגשים · זום · 75 דקות · עד 12 נשים</p>
          </motion.div>

          <div className="flex gap-2 mb-0 flex-wrap">
            {weeks.map((w, i) => (
              <motion.button key={i} onClick={() => setActiveWeek(i)}
                className={`relative px-5 py-3 text-sm font-bold tracking-wider transition-all overflow-hidden ${activeWeek === i ? "bg-[#A0522D] text-white" : "bg-white/8 text-white/50 hover:bg-white/16 hover:text-white/80"}`}
                whileTap={{ scale: 0.96 }}>
                {w.tag}
                {activeWeek === i && <motion.span className="absolute bottom-0 left-0 h-0.5 bg-[#C8956C] w-full" layoutId="tab-line" />}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeWeek}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="bg-white/8 backdrop-blur-sm border border-white/10 p-8 lg:p-10">
              <div className="flex items-start gap-5">
                <span className="flex-shrink-0 text-6xl font-extrabold leading-none text-[#C8956C]/20"
                  style={{ fontVariantNumeric: "tabular-nums" }}>{weeks[activeWeek].num}</span>
                <div className="flex-1 pt-1">
                  <p className="text-[#C8956C] text-sm font-bold tracking-widest mb-3">{weeks[activeWeek].tag}</p>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-5">{weeks[activeWeek].title}</h3>
                  <p className="text-white/68 text-lg leading-relaxed">{weeks[activeWeek].text}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-5">
            {weeks.map((_, i) => (
              <button key={i} onClick={() => setActiveWeek(i)}
                className={`h-2 rounded-full transition-all ${activeWeek === i ? "bg-[#C8956C] w-6" : "bg-white/25 w-2"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ BONUS ════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label>לפני שמתחילים</Label>
          <motion.div className="relative bg-[#F5F4F2] p-8 lg:p-10 overflow-hidden"
            style={{ boxShadow: "0 8px 40px rgba(44,62,90,0.08)" }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A0522D] via-[#C8956C] to-transparent" />
            <div className="flex items-start gap-4 mb-4">
              <span className="text-[#A0522D] flex-shrink-0 mt-1"><Icon.map /></span>
              <div>
                <h3 className="text-[#2C3E5A] font-extrabold text-2xl mb-1">מפת שורשים אישית</h3>
                <span className="text-[#A0522D] text-sm font-bold border border-[#A0522D]/35 px-2 py-0.5">כלול בחינם · ערך 197 ש&quot;ח</span>
              </div>
            </div>
            <p className="text-[#2C3E5A]/68 text-lg leading-relaxed mb-3">
              לפני שמתחילים — תקבלי מפת שורשים אישית של הילד שבחרת.
              כלי שפיתחתי שממפה את שורשי ההיקשרות שלו — איפה הקשר זורם, ואיפה הוא חסום.
            </p>
            <p className="text-[#2C3E5A]/55 text-lg font-semibold">כדי שתגיעי למפגש 1 עם תמונה ברורה — לא עם ניחוש.</p>
          </motion.div>
        </div>
      </section>

      {/* ══ BETWEEN SESSIONS ═════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 px-6 lg:px-16 bg-[#F5F4F2]">
        <div className="max-w-3xl mx-auto">
          <Label>בין מפגש למפגש</Label>
          <motion.h2 className="text-2xl lg:text-3xl font-extrabold text-[#2C3E5A] mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            הליווי לא נגמר כשהזום נסגר
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { Icon: Icon.check, title: "משימה קצרה ומשוב אישי", text: "שליחה בין מפגש למפגש — ומשוב אמיתי, לא גנרי." },
              { Icon: Icon.message, title: "וואטסאפ פתוח + שעה קבועה", text: "שאלות ישירות אלי ותמיכה בזמן אמת." },
              { Icon: Icon.video, title: "סיכום כתוב לכל מפגש", text: "לא תצטרכי לרשום — הכל מסוכם ומחכה לך אחרי כל מפגש." },
              { Icon: Icon.check, title: "KIT משימות שבועי", text: "כלי קצר לעבודה בבית בין מפגש למפגש." },
            ].map((item, i) => (
              <motion.div key={i} className="bg-white border border-[#2C3E5A]/10 p-6 flex gap-4 items-start hover:border-[#A0522D]/40 transition-all duration-300"
                initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A0522D]/10 flex items-center justify-center text-[#A0522D]"><item.Icon /></span>
                <div>
                  <p className="font-bold text-[#2C3E5A] text-lg mb-1">{item.title}</p>
                  <p className="text-[#2C3E5A]/55 text-base">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUTCOME ══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label>מה תצאי איתו</Label>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#2C3E5A]/55 text-xl mb-3">את נכנסת עם:</p>
            <p className="text-2xl font-bold text-[#2C3E5A]/65 italic mb-10">&ldquo;מה אני עושה לא נכון עם הילד הזה?&rdquo;</p>
            <p className="text-[#2C3E5A]/55 text-xl mb-4">את יוצאת עם:</p>
            <p className="text-2xl lg:text-3xl font-extrabold text-[#A0522D] leading-relaxed mb-6">
              &ldquo;אני מבינה מה קורה לו. ויש לי כלים להגיב אחרת — גם כשזה קשה, גם אחרי פיצוץ.&rdquo;
            </p>
            <p className="text-[#2C3E5A]/65 text-lg leading-relaxed">
              ועם עיניים שרואות את הילד שלך אחרת — את מי שהוא, לא את מה שהוא עושה.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#F5F4F2]">
        <div className="max-w-3xl mx-auto">
          <Label>בקולן שלהן</Label>
          <motion.h2 className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            מה אומרות אמהות שעבדו איתי
          </motion.h2>

          <div className="space-y-7">
            {[
              { name: "סיון", color: "bg-[#A0522D]", text: "התהליך איתך לא היה דומה לשום תהליך שעשיתי בעבר. הרגשתי שמרימים אותי, רואים אותי, מכילים אותי ונותנים לי כלים פרקטיים מעולים שאני מרגישה בטוח ליישם. השינוי היה מאוד ניכר." },
              { name: "עינב", color: "bg-[#C8956C]", text: "תודה על הליווי, מההתחלה היית לנו כמו כפפה ליד." },
              { name: "רגינה", color: "bg-[#2C3E5A]", text: "על הליווי מהרגע הראשון ועד הרגע האחרון, אין מילים להודות לך. אנחנו מרגישים שהדברים שינו אותנו." },
            ].map((t, i) => (
              <motion.div key={i} className="flex gap-4 items-start"
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className={`flex-shrink-0 w-10 h-10 ${t.color} flex items-center justify-center text-white font-extrabold text-lg rounded-sm`}>
                  {t.name[0]}
                </div>
                <div className="flex-1 border-b border-[#2C3E5A]/10 pb-7">
                  <div className="text-[#C8956C]/30 mb-3"><Icon.quote /></div>
                  <p className="text-[#2C3E5A]/70 text-lg leading-relaxed mb-3">{t.text}</p>
                  <p className="text-[#A0522D] font-bold text-sm">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LOGISTICS ════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { Icon: Icon.calendar, label: "מועד", value: "ימי ראשון, 20:45–22:00" },
              { Icon: Icon.monitor, label: "פלטפורמה", value: "זום — נוח מהבית" },
              { Icon: Icon.video, label: "הקלטות", value: "כל מפגש מוקלט ומחכה לך" },
              { Icon: Icon.calendar, label: "תחילה", value: "23.05.26" },
              { Icon: Icon.users, label: "קבוצה", value: "12 אמהות בלבד" },
            ].map((item, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                className="bg-[#F5F4F2] p-5 flex gap-4 items-start hover:bg-[#ede9e4] transition-colors">
                <span className="text-[#A0522D] flex-shrink-0 mt-0.5"><item.Icon /></span>
                <div>
                  <p className="text-[#2C3E5A]/40 text-xs font-bold uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-[#2C3E5A] font-semibold text-base">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ PRICE ════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#2C3E5A] relative overflow-hidden">
        <motion.div className="absolute inset-0"
          animate={{ background: ["linear-gradient(150deg, #2C3E5A 0%, #3a4f6e 50%, #2a3a52 100%)", "linear-gradient(150deg, #243348 0%, #2C3E5A 50%, #3a4f6e 100%)", "linear-gradient(150deg, #2C3E5A 0%, #3a4f6e 50%, #2a3a52 100%)"] }}
          transition={{ duration: 10, repeat: Infinity }} />
        <Orb color="rgba(160,82,45,0.9)" size={600} top="50%" left="50%" delay={0} opacity={0.22} />

        <div ref={priceRef} className="max-w-2xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/35 text-base mb-1">ערך המעבדה</p>
            <p className="text-white/28 text-3xl font-bold line-through mb-5">797 ש&quot;ח</p>
            <p className="text-[#C8956C] text-lg font-medium mb-4">מחזור ראשון · 12 מקומות בלבד</p>

            <motion.div className="inline-block mb-4"
              initial={{ scale: 0.75, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }} transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.3 }}>
              <div className="px-12 py-8 relative"
                style={{ background: "rgba(160,82,45,0.15)", border: "1px solid rgba(200,149,108,0.3)", backdropFilter: "blur(12px)" }}>
                <p className="text-white font-extrabold leading-none" style={{ fontSize: "clamp(5rem, 16vw, 9rem)" }}>{c497}</p>
                <p className="text-[#C8956C] text-3xl font-bold mt-1">ש&quot;ח</p>
              </div>
            </motion.div>

            <p className="text-white/65 text-lg leading-relaxed mb-4 max-w-lg mx-auto">
              כולל: 4 מפגשי זום + מפת שורשים אישית + ליווי בוואטסאפ + משוב אישי על המשימות + סיכומים כתובים + KIT משימות שבועי.
            </p>
            <div className="inline-block border border-[#C8956C]/40 text-[#C8956C] text-sm font-bold px-5 py-2 tracking-wider mb-10">המחיר הזה לא יחזור</div>
            <br />
            <CTAButton variant="light" />
          </motion.div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label>שאלות נפוצות</Label>
          <motion.h2 className="text-3xl lg:text-4xl font-extrabold text-[#2C3E5A] mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            יש לך שאלה?
          </motion.h2>
          <div className="border-t border-[#2C3E5A]/10">
            <FAQItem q="זה מתאים גם לאבות?" a="כן. כל הורה שרוצה להבין מה קורה בו מוזמן." />
            <FAQItem q="מה אם פספסתי מפגש?" a="יהיה רישום של כל מפגש, מחכה לך." />
            <FAQItem q="יש החזר כספי?" a="אין — אבל יש אחריות שלי לתת לך ערך אמיתי בכל מפגש." />
            <FAQItem q="מה ההבדל בינך לבין ספר של נויפלד?" a="ספר נותן ידע. אני עובדת על המיינדסט שלך — עם כלי אימון, תרגילים חיים, ומשוב אישי. זה שונה לגמרי." />
          </div>
        </div>
      </section>

      {/* ══ CLOSING QUOTE ════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-[#F5F4F2]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-[#C8956C]/30 mb-6 mx-auto w-fit"><Icon.quote /></div>
            <p className="text-[#2C3E5A] text-2xl lg:text-3xl font-bold leading-relaxed italic mb-6">
              בהורות אין ערובות. אבל יש דרך.
              <br />
              בואי נמצא אותה ביחד.
            </p>
            <div className="mt-8">
              <CTAButton full={false} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ REGISTER FORM ════════════════════════════════════════════════════ */}
      <section id="register" className="py-20 lg:py-32 px-6 lg:px-16 bg-white relative">
        <div className="max-w-xl mx-auto">
          <Label>הרשמה</Label>
          <motion.h2 className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] mb-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            הדר, אני בפנים!
          </motion.h2>
          <motion.p className="text-[#2C3E5A]/45 text-xl mb-10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            שרייני לי מקום במעבדה
          </motion.p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-[#2C3E5A] p-8 lg:p-10 text-center">
                <p className="text-3xl font-extrabold text-white mb-3">קיבלתי!</p>
                <p className="text-white/65 text-lg mb-7">השלב האחרון — תשלום להבטחת המקום שלך.</p>
                <a href="https://secure.cardcom.solutions/EA/EA5/lpskTbNqVUGzncHXQmNZA/PaymentSP"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-[#A0522D] text-white font-bold px-10 py-4 text-xl hover:opacity-90 transition-opacity"
                  style={{ boxShadow: "0 4px 32px rgba(160,82,45,0.4)" }}>
                  לתשלום מאובטח ←
                </a>
                <p className="text-white/25 text-sm mt-5">497 ש&quot;ח · קארדקום מאובטח</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.15 }} className="space-y-4">
                {[
                  { type: "text", placeholder: "שם מלא", key: "name" },
                  { type: "email", placeholder: "מייל", key: "email" },
                  { type: "tel", placeholder: "נייד", key: "phone" },
                ].map(({ type, placeholder, key }) => (
                  <input key={key} type={type} placeholder={placeholder} required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    dir={key === "phone" ? "ltr" : undefined}
                    className="w-full border border-[#2C3E5A]/18 bg-[#FAFAF8] px-5 py-4 text-[#2C3E5A] text-lg placeholder:text-[#2C3E5A]/35 focus:outline-none focus:border-[#A0522D] focus:bg-white transition-colors" />
                ))}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 flex-shrink-0 accent-[#A0522D]" />
                  <span className="text-[#2C3E5A]/55 text-sm leading-relaxed">
                    קראתי ואני מסכימה ל<a href="/privacy" target="_blank" className="underline text-[#A0522D]">מדיניות הפרטיות</a> ולקבלת עדכונים ותכנים במייל מהדר ארקדש.
                  </span>
                </label>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <motion.button type="submit" disabled={loading || !consent}
                  className="group relative w-full inline-flex items-center justify-center gap-3 bg-[#A0522D] text-white font-extrabold overflow-hidden py-5 text-xl disabled:opacity-55"
                  style={consent ? { boxShadow: "0 6px 36px rgba(160,82,45,0.38)" } : {}}
                  whileHover={{ scale: loading || !consent ? 1 : 1.02, y: loading || !consent ? 0 : -2 }}
                  whileTap={{ scale: loading || !consent ? 1 : 0.97 }}>
                  <motion.span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/15 to-transparent -skew-x-12"
                    initial={{ x: "-120%" }} whileHover={{ x: "220%" }} transition={{ duration: 0.55 }} />
                  <span className="relative">{loading ? "שולחת..." : "אני רוצה להצטרף"}</span>
                  {!loading && (
                    <motion.span className="relative opacity-70"
                      animate={{ x: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                      <Icon.arrow />
                    </motion.span>
                  )}
                </motion.button>

                <p className="text-[#2C3E5A]/28 text-sm text-center">12 מקומות בלבד · המחיר הזה לא יחזור</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-[#2C3E5A] py-10 px-6 text-center">
        <img src="/logo.svg" alt="הדר ארקדש" className="h-11 w-auto mx-auto mb-4 opacity-40"
          style={{ filter: "brightness(0) invert(1)" }} />
        <p className="text-white/28 text-sm">הורות. זוגיות. התפתחות.</p>
        <p className="text-white/15 text-xs mt-2">© 2026 הדר ארקדש</p>
      </footer>
    </main>
  );
}
