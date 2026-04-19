"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// ─── Palette ─────────────────────────────────────────────────────────────────
// Terracotta: #A0522D  |  Gold: #C8956C  |  Olive: #6B7A5A  |  Navy: #2C3E5A

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useReveal(margin = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: margin as any });
  return { ref, inView };
}

function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const Icon = {
  calendar: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  monitor: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  video: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  ),
  users: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  map: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  ),
  message: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  arrow: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

// ─── Floating Orb ─────────────────────────────────────────────────────────────

function Orb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  return (
    <motion.p
      className="text-[#A0522D] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block w-8 h-px bg-[#A0522D]" />
      {text}
    </motion.p>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────

function CTAButton({ text, size = "lg" }: { text: string; size?: "sm" | "lg" }) {
  return (
    <motion.a
      href="#register"
      className={`group relative inline-flex items-center justify-center gap-3 bg-[#A0522D] text-white font-bold overflow-hidden cursor-pointer ${
        size === "lg" ? "px-10 py-5 text-xl w-full lg:w-auto" : "px-7 py-4 text-lg"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Shimmer */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative">{text}</span>
      <motion.span
        className="relative"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Icon.arrow />
      </motion.span>
    </motion.a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PremiumPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeWeek, setActiveWeek] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const count8 = useCounter(8, statsInView);
  const count4 = useCounter(4, statsInView);
  const count10 = useCounter(10, statsInView);

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
      // Brief pause so the user sees the success message, then redirect to payment
      setTimeout(() => {
        window.location.href =
          "https://secure.cardcom.solutions/EA/EA5/lpskTbNqVUGzncHXQmNZA/PaymentSP";
      }, 1500);
    } catch {
      setError("משהו השתבש, נסי שוב.");
    } finally {
      setLoading(false);
    }
  }

  const weeks = [
    {
      num: "01",
      title: "לפתוח את הקלפים",
      text: 'נבחן ציפיות מול מציאות. נכיר את הלופ שנוצר ביניכם ונבין למה כשהוא אומר "תעופי מפה" זה מפעיל אצלך זעם של 10 מתוך 10. נלמד להפסיק לקחת את זה אישית, כי זה לא אישי.',
    },
    {
      num: "02",
      title: "מתחת לקצה הקרחון",
      text: "מה באמת עובר עליו? נלמד לקרוא את הרגש שמסתתר מאחורי ההתנהגות המעצבנת ביותר. נפרק את הפלונטר הספציפי שחוזר ביניכם ונתיר אותו בלי מאבקי כוח.",
    },
    {
      num: "03",
      title: "כשהחברים הפכו להיות הכל",
      text: "למה פתאום אנחנו לא קיימים? נלמד את המנגנון הביולוגי שעומד מאחורי זה, ואיך את מחזירה את עצמך להיות המצפן שלו.",
    },
    {
      num: "04",
      title: "חוזרים לחזר",
      text: "איך מחזרים אחרי הילד שלך? צעדים פרקטיים שמתאימים לגיל הזה. לחזור להוביל מתוך חיבור ולא מתוך מאבק.",
    },
  ];

  return (
    <main dir="rtl" className="font-assistant bg-[#FAFAF8] text-[#2C3E5A] overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Animated gradient background — warm beige/gold feminine palette */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(150deg, #3b2e24 0%, #6b4c35 35%, #c8956c 70%, #e8d5b0 100%)",
          }}
          animate={{
            background: [
              "linear-gradient(150deg, #3b2e24 0%, #6b4c35 35%, #c8956c 70%, #e8d5b0 100%)",
              "linear-gradient(150deg, #2e2318 0%, #7a5540 35%, #c8956c 65%, #dfc99a 100%)",
              "linear-gradient(150deg, #3b2e24 0%, #6b4c35 35%, #c8956c 70%, #e8d5b0 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbs */}
        <Orb className="w-96 h-96 bg-[#e8d5b0] top-10 left-10" delay={0} />
        <Orb className="w-80 h-80 bg-[#C8956C] bottom-20 right-20" delay={2} />
        <Orb className="w-64 h-64 bg-[#a07850] top-1/2 right-1/3" delay={4} />

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo */}
        <div className="absolute top-6 right-6 lg:right-16 z-20">
          <img src="/logo.svg" alt="הדר ארקדש" className="h-12 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-3xl mx-auto px-6 lg:px-16 w-full pt-24"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#C8956C] animate-pulse" />
            <span className="text-white/90 text-sm font-medium">מחזור פיילוט · 10 מקומות בלבד</span>
          </motion.div>

          <motion.h1
            className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            מרגישה שאתם
            <br />
            <span className="text-[#C8956C]">בגיל ההתבגרות,</span>
            <br />
            אבל הילד רק בן 9?
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-white/75 leading-relaxed mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            זה לא גיל ההתבגרות מוקדם.
            <br />
            זה משהו אחר לגמרי. ויש לו שם.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <CTAButton text="אני בפנים, שרייני לי מקום" />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-x-8 gap-y-3 mt-10 text-white/90 text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span>23.05.26</span>
            <span>·</span>
            <span>ימי ראשון 20:45–22:00</span>
            <span>·</span>
            <span>גוגל מיט</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/30 text-xs tracking-widest">גלי למטה</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div ref={statsRef} className="bg-[#2C3E5A] py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 gap-6 text-center">
          {[
            { value: count4, suffix: "", label: "מפגשי עומק" },
            { value: count10, suffix: "", label: "מקומות בפיילוט" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-4xl lg:text-5xl font-extrabold text-[#C8956C]">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-white/50 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PAIN ─────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label text="מה שאת חווה עכשיו" />

          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] leading-tight mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            כל מילה של חבר קובעת
            <br />
            <span className="text-[#A0522D]">יותר מהמילה שלך בבית.</span>
          </motion.h2>

          <div className="space-y-6">
            {[
              "התשובות הפכו לקצרות. פרצופים. דלתות שנטרקות.",
              'ואת הולכת על ביצים בבית שלך, רק כדי לא לייצר עוד פיצוץ.',
              '"זה הגיל, זה נורמלי", כולם אומרים לך. אבל בפנים? את מפחדת שאם ככה זה נראה עכשיו, אז מה עוד מחכה לנו בגיל 14.',
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-xl text-[#2C3E5A]/70 leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="mt-12 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#A0522D]/10 to-[#C8956C]/5 rounded-none" />
            <div className="relative border-r-4 border-[#A0522D] pr-8 py-6 pl-6">
              <p className="text-2xl font-bold text-[#2C3E5A] leading-relaxed">
                הדריכות שלך מובנת לגמרי.
              </p>
              <p className="text-2xl font-bold text-[#A0522D] mt-1">
                אבל יש כאן חדשות טובות מאוד.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MECHANISM ────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#F5F4F2] relative overflow-hidden">
        <Orb className="w-[500px] h-[500px] bg-[#C8956C] -top-40 -left-40" delay={1} />

        <div className="max-w-3xl mx-auto relative z-10">
          <Label text="מה באמת קורה" />

          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] leading-tight mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            גיל 7-11 הוא לא גיל
            <br />
            ההתבגרות מוקדם.
          </motion.h2>

          <motion.p
            className="text-3xl lg:text-4xl font-extrabold text-[#A0522D] mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            זה גיל הגשר.
          </motion.p>

          <div className="space-y-5 mb-12">
            {[
              "כן, זה יכול להתחיל כבר בגיל 7. ובגיל 12 כבר יש שינויים ביולוגיים שמשנים את התמונה לגמרי.",
              "המוח שלהם בגיל הזה עדיין לא בתוך הסערה ההורמונלית האמיתית. יש שינויים ביולוגיים ורגשיים ספציפיים, אבל המערכת עדיין גמישה. עדיין פתוחה לך.",
            ].map((t, i) => (
              <motion.p
                key={i}
                className="text-xl text-[#2C3E5A]/70 leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {t}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="relative bg-[#2C3E5A] p-8 lg:p-10 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A0522D] via-[#C8956C] to-[#6B7A5A]" />
            <p className="text-[#C8956C] text-2xl font-bold mb-3">
              חלון ההזדמנויות הגדול ביותר שיש לך.
            </p>
            <p className="text-white/75 text-lg leading-relaxed">
              עבודת עומק שתעשי עכשיו על מערכת היחסים שלכם
              יכולה לשנות את כל מה שיקרה בעשור הקרוב.
            </p>
            <p className="mt-4 text-white/35 text-sm tracking-wider">לא דרמה. מחקר.</p>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label text="המעבדה" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] leading-tight mb-3">
              מילדות להתבגרות:
              <br />
              <span className="text-[#A0522D]">מעבדת גיל הגשר</span>
            </h2>
            <p className="text-[#2C3E5A]/40 text-lg mb-10">
              4 מפגשים · ליווי אישי · 10 אמהות בלבד
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-[#2C3E5A]/70 leading-relaxed">
              לא עוד &ldquo;5 טיפים לילד מתנגד&rdquo;.
              לא תיאוריות שנשמעות טוב ולא עובדות בבית.
            </p>
            <p className="text-xl font-bold text-[#2C3E5A]">
              זאת עבודה אמיתית. על מערכת היחסים ביניכם שאת מובילה אותה.
            </p>
            <p className="text-xl text-[#2C3E5A]/70">
              כי השינוי לא מתחיל מהילד.{" "}
              <span className="text-[#A0522D] font-bold">הוא מתחיל ממך.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4 WEEKS — INTERACTIVE ────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#2C3E5A] relative overflow-hidden">
        <Orb className="w-96 h-96 bg-[#A0522D] bottom-0 left-0" delay={0} />

        <div className="max-w-3xl mx-auto relative z-10">
          <Label text="4 שבועות של עבודה" />
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            מה עושים כל שבוע
          </motion.h2>

          {/* Tab headers */}
          <div className="flex gap-2 mb-0 flex-wrap">
            {weeks.map((w, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveWeek(i)}
                className={`px-5 py-3 text-base font-bold transition-all ${
                  activeWeek === i
                    ? "bg-[#A0522D] text-white"
                    : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {w.num}
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWeek}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 lg:p-10"
            >
              <p className="text-[#C8956C] text-sm font-semibold tracking-widest mb-2">
                שבוע {weeks[activeWeek].num}
              </p>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-5">
                {weeks[activeWeek].title}
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                {weeks[activeWeek].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── OUTCOMES ─────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label text="עם מה יוצאים" />
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            עם מה את יוצאת מהמעבדה
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[
              {
                title: "משקפיים חדשות על הילד שלך",
                text: "תביני למה הוא מתנהג ככה, ותפסיקי להרגיש שאת הולכת על ביצים",
                color: "bg-[#A0522D]",
              },
              {
                title: "מפת הלופ שלך",
                text: "תדעי לזהות מה מפעיל אותך ואיך לעצור את כדור השלג לפני הפיצוץ",
                color: "bg-[#b8916a]",
              },
              {
                title: "ארגז כלים של חיזור",
                text: "צעדים פרקטיים שמושכים את הילד שלך בחזרה אלייך",
                color: "bg-[#2C3E5A]",
              },
              {
                title: "ביטחון פנימי",
                text: "ידע הוא כוח. הידיעה שאת יודעת מה לעשות, זה ביטחון אחר לגמרי",
                color: "bg-[#8a7560]",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className={`${item.color} p-6 lg:p-7`}>
                  <div className="text-white/40 mb-3">
                    <Icon.check />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white/75 text-base leading-relaxed">{item.text}</p>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-white/30 w-0 group-hover:w-full"
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONUSES ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#F5F4F2] relative overflow-hidden">
        <Orb className="w-96 h-96 bg-[#6B7A5A] top-0 right-0" delay={3} />

        <div className="max-w-3xl mx-auto relative z-10">
          <Label text="הבונוסים" />
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            מה כלול בתוך ה-299 ש"ח
          </motion.h2>

          <div className="space-y-5">
            {[
              {
                Icon: Icon.video,
                title: "4 לייבים שבועיים של 75 דקות",
                tag: "עבודה אמיתית, לא רק להקשיב",
                text: "כל מפגש בנוי עם זמני עבודה של ממש שזורים בתוכו. לא הרצאה שאת יושבת ומקשיבה, אלא מרחב שבו את עובדת, מנתחת, ומיישמת כבר בזמן אמת.",
              },
              {
                Icon: Icon.map,
                title: "מיפוי היקשרותי אישי דיגיטלי",
                tag: 'ערך: 197 ש"ח · חינם',
                text: "כלי אבחון שבניתי שיוצר עבורך מפת דרכים של מערכת היחסים. הוא יראה לך בדיוק איזה שורש היקשרותי חסום ומייצר את ההתנגדויות, עם צעד ראשון ליישום כבר באותו רגע.",
              },
              {
                Icon: Icon.message,
                title: "ליווי צמוד בוואטסאפ 24/6",
                tag: "4 שבועות",
                text: "המקום לנתח סיטואציות בזמן אמת, לשאול, לקבל כלים, ולהחיל בשטח. עם ליווי אקטיבי שלי לאורך כל הדרך.",
              },
              {
                Icon: Icon.heart,
                title: "קהילה של אמהות שמבינות",
                tag: "מרחב בטוח",
                text: "קומץ אמהות שחולקות בדיוק את אותם אתגרים. מרחב בטוח, לא שיפוטי.",
              },
            ].map((bonus, i) => (
              <motion.div
                key={i}
                className="group bg-white border border-[#2C3E5A]/10 p-6 lg:p-8 flex gap-6 items-start hover:border-[#A0522D]/40 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-[#A0522D] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                  <bonus.Icon />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-bold text-[#2C3E5A] text-xl">{bonus.title}</h3>
                    <span className="text-[#A0522D] text-xs font-semibold border border-[#A0522D]/30 px-2 py-0.5">
                      {bonus.tag}
                    </span>
                  </div>
                  <p className="text-[#2C3E5A]/60 text-base leading-relaxed">{bonus.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <Label text="מה אומרות אמהות שעבדו איתי" />
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            בקולן שלהן
          </motion.h2>

          <div className="space-y-6">
            {[
              {
                name: "סיון",
                text: "התהליך איתך לא היה דומה לשום תהליך שעשיתי בעבר. הרגשתי שמרימים אותי, רואים אותי, מכילים אותי ונותנים לי כלים פרקטיים מעולים שאני מרגישה בטוח ליישם. השינוי היה מאוד ניכר ואין ספק שהוא יגדל ככל שאתמיד.",
                accent: "bg-[#A0522D]",
              },
              {
                name: "נועה",
                text: 'מהדד לי המשפט בראש "הוא רק בן 3" ואני נותנת לזה להוביל אותי. אני מרגישה שאני מצליחה לקבל יותר את מה ש█████ בהומור ולמצוא את הניצוץ בילד החכם שלנו!',
                accent: "bg-[#6B7A5A]",
              },
              {
                name: "עינב",
                text: "תודה על הליווי, מההתחלה היית לנו כמו כפפה ליד.",
                accent: "bg-[#C8956C]",
              },
              {
                name: "רגינה",
                text: "על הליווי מהרגע הראשון ועד הרגע האחרון, אין מילים להודות לך. אנחנו מרגישים שהדברים שינו אותנו.",
                accent: "bg-[#2C3E5A]",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="flex gap-5 items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`flex-shrink-0 w-10 h-10 ${t.accent} flex items-center justify-center text-white font-bold text-lg`}>
                  {t.name[0]}
                </div>
                <div className="flex-1 border-b border-[#2C3E5A]/10 pb-6">
                  <p className="text-[#2C3E5A]/70 text-lg leading-relaxed mb-3">{t.text}</p>
                  <p className="text-[#A0522D] font-bold text-sm">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#F5F4F2] relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <Label text="על הדר" />

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            {/* Photo */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 mx-auto lg:mx-0">
                <div className="absolute -inset-2 bg-gradient-to-br from-[#A0522D] to-[#C8956C] opacity-20 rounded-full blur-lg" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#C8956C]/30">
                  <Image
                    src="/hadar.jpg"
                    alt="הדר ארקדש"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <motion.h2
                className="text-3xl lg:text-4xl font-extrabold text-[#2C3E5A] mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                נעים להכיר, אני הדר
              </motion.h2>
              <motion.p
                className="text-[#2C3E5A]/40 text-base mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                נשואה לאוראל, ואמא לדור (9.5), עומר (7.5) וארי (3.5).
              </motion.p>
              <motion.p
                className="text-[#2C3E5A] font-semibold text-base mb-6 border-r-2 border-[#A0522D] pr-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                מדריכת הורים מוסמכת בגישה ההיקשרותית-התפתחותית ויועצת זוגית, בוגרת אוניברסיטת בר-אילן.
              </motion.p>

              <motion.div
                className="space-y-4 text-[#2C3E5A]/65 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p>
                  לפני כמה שנים התחלתי לחוות את זה בעצמי. קונפליקטים חוזרים עם דור, תחושה שהיא מוכוונת לחברות ולא אלינו, חוסר אונים אמיתי. התחלתי לחפש, ועולם נפתח.
                </p>
                <p>
                  הקונפליקטים לא נעלמו לגמרי. אני עדיין חווה אותם.
                  אבל יש לי כיום כלים, ידע, והבנה שמשנה את כל מה שקורה בינינו. זה לא שהכל נהיה פתאום קל, זה שאני כבר לא לבד בתוך זה.
                </p>
                <p>
                  אני לא מאמינה באילוף ילדים, בטבלאות התנהגות, בעונשים שרק מרחיקים. אני מאמינה שכשהילד מרגיש בטוח בקשר, ההתנהגות מתיישרת מעצמה.
                </p>
                <p className="text-[#A0522D] font-semibold text-xl">מחכה לראות אותך.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGISTICS ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { Icon: Icon.calendar, label: "מועד", value: "ימי ראשון, 20:45–22:00" },
              { Icon: Icon.monitor, label: "פלטפורמה", value: "גוגל מיט" },
              { Icon: Icon.video, label: "הקלטות", value: "כל מפגש מוקלט ומחכה לך" },
              { Icon: Icon.calendar, label: "תחילה", value: "23.05.26" },
              { Icon: Icon.users, label: "קבוצה", value: "10 אמהות בלבד" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="bg-[#F5F4F2] p-5 flex gap-4 items-start"
              >
                <span className="text-[#A0522D] flex-shrink-0 mt-0.5">
                  <item.Icon />
                </span>
                <div>
                  <p className="text-[#2C3E5A]/40 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-[#2C3E5A] font-semibold text-base">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICE ────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-[#2C3E5A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E5A] via-[#2C3E5A] to-[#A0522D]/40" />
        <Orb className="w-[600px] h-[600px] bg-[#A0522D] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={0} />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-white/40 text-base mb-1">ערך המעבדה</p>
            <p className="text-white/30 text-3xl font-bold line-through mb-6">799 ש"ח</p>

            <p className="text-white/70 text-xl mb-3">במחזור הפיילוט, 10 מקומות בלבד:</p>

            <motion.p
              className="text-white font-extrabold mb-4"
              style={{ fontSize: "clamp(4rem, 15vw, 8rem)", lineHeight: 1 }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            >
              299 <span className="text-[#C8956C] text-4xl lg:text-5xl align-middle">ש"ח</span>
            </motion.p>

            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              פחות מעלות פגישת ייעוץ אחת בקליניקה,
              עבור חודש שלם של ליווי צמוד, 4 מפגשים וכלי האבחון האישי.
            </p>

            <div className="inline-block border border-[#C8956C]/40 text-[#C8956C] px-4 py-2 text-sm font-semibold mb-10">
              המחיר הזה לא יחזור
            </div>

            <br />
            <CTAButton text="אני בפנים, שרייני לי מקום" />
          </motion.div>
        </div>
      </section>

      {/* ── OBJECTION ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="border-r-4 border-[#A0522D] pr-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#2C3E5A] mb-5">
              מה אם זה לא יעבוד אצלי?
            </h2>
            <p className="text-[#2C3E5A]/70 text-xl leading-relaxed mb-4">
              בדיוק בגלל שזה מחזור פיילוט, המחיר משקף את זה.
              299 ש"ח זה לא הימור. זו הזדמנות לבדוק עם אפס סיכון.
            </p>
            <p className="text-[#2C3E5A]/70 text-xl leading-relaxed mb-6">
              הדרך לשינוי בבית לא דורשת קסמים.
              היא דורשת הבנה, סקרנות, וקצת אומץ.
            </p>
            <p className="text-[#A0522D] font-bold text-2xl">בואי לחקור יחד.</p>
          </motion.div>
        </div>
      </section>

      {/* ── REGISTER ─────────────────────────────────────────────────────── */}
      <section id="register" className="py-20 lg:py-32 px-6 lg:px-16 bg-[#F5F4F2]">
        <div className="max-w-xl mx-auto text-center">
          <Label text="הרשמה" />
          <motion.h2
            className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            הדר, אני בפנים!
          </motion.h2>
          <motion.p
            className="text-[#2C3E5A]/50 text-xl mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            שרייני לי מקום במעבדה
          </motion.p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-[#6B7A5A]/30 p-8 text-center"
              >
                <p className="text-4xl mb-4">🎉</p>
                <p className="text-2xl font-bold text-[#2C3E5A] mb-2">נרשמת בהצלחה!</p>
                <p className="text-[#2C3E5A]/60 text-lg mb-6">ממשיכים לתשלום...</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4 text-right"
              >
                <input
                  type="text"
                  placeholder="שם מלא"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-[#2C3E5A]/20 bg-white px-5 py-4 text-[#2C3E5A] text-lg focus:outline-none focus:border-[#A0522D] transition-colors"
                  dir="rtl"
                />
                <input
                  type="email"
                  placeholder="כתובת מייל"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-[#2C3E5A]/20 bg-white px-5 py-4 text-[#2C3E5A] text-lg focus:outline-none focus:border-[#A0522D] transition-colors"
                  dir="ltr"
                />
                <input
                  type="tel"
                  placeholder="מספר נייד"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-[#2C3E5A]/20 bg-white px-5 py-4 text-[#2C3E5A] text-lg focus:outline-none focus:border-[#A0522D] transition-colors"
                  dir="ltr"
                />

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 flex-shrink-0 accent-[#A0522D]"
                  />
                  <span className="text-[#2C3E5A]/60 text-sm leading-relaxed">
                    אני מאשרת קבלת עדכונים, תכנים ומבצעים במייל מהדר ארקדש. ניתן להסיר את עצמך בכל עת.
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={loading || !consent}
                  className="group relative w-full inline-flex items-center justify-center gap-3 bg-[#A0522D] text-white font-bold overflow-hidden px-10 py-5 text-xl disabled:opacity-60"
                  whileHover={{ scale: loading || !consent ? 1 : 1.02 }}
                  whileTap={{ scale: loading || !consent ? 1 : 0.97 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative">
                    {loading ? "שולחת..." : "הדר, אני בפנים! שרייני לי מקום"}
                  </span>
                  {!loading && (
                    <motion.span
                      className="relative"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Icon.arrow />
                    </motion.span>
                  )}
                </motion.button>

                <p className="text-[#2C3E5A]/30 text-sm">
                  10 מקומות בלבד · המחיר הזה לא יחזור
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#2C3E5A] py-10 px-6 text-center">
        <img src="/logo.svg" alt="הדר ארקדש" className="h-12 w-auto mx-auto mb-4" style={{ filter: "brightness(0) invert(1) opacity(0.5)" }} />
        <p className="text-white/30 text-sm">הורות. זוגיות. התפתחות.</p>
      </footer>
    </main>
  );
}
