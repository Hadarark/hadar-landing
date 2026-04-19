"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ─── Elegant Icons (SVG) ──────────────────────────────────────────────────────

const icons = {
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  monitor: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  video: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  map: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  ),
  message: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  diamond: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 9 18 21 6 21 2 9 12 2" />
    </svg>
  ),
  quote: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  ),
};

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  children,
  bg = "bg-bg-warm",
  className = "",
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) {
  return (
    <section className={`${bg} py-16 lg:py-24 px-5 lg:px-16 ${className}`}>
      <div className="max-w-3xl mx-auto">{children}</div>
    </section>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────

function CTAButton({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <motion.a
      href="#register"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-block bg-[#A0522D] text-white font-bold text-center cursor-pointer transition-shadow hover:shadow-[0_4px_24px_rgba(160,82,45,0.35)] ${
        small
          ? "px-6 py-3 text-base"
          : "w-full lg:w-auto px-10 py-4 text-xl"
      }`}
    >
      {text}
    </motion.a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        window.location.href =
          "https://secure.cardcom.solutions/EA/EA5/lpskTbNqVUGzncHXQmNZA/PaymentSP";
      }, 1500);
    } catch {
      setError("משהו השתבש, נסי שוב.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="font-assistant text-navy">

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header className="bg-[#2C3E5A] px-5 lg:px-16 pt-8 pb-0">
        <div className="max-w-3xl mx-auto">
          <img src="/logo.svg" alt="הדר ארקדש" className="h-14 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#2C3E5A] text-white min-h-[90vh] flex flex-col justify-center px-5 lg:px-16 py-20">
        <div className="max-w-3xl mx-auto w-full">
          <motion.p
            className="text-[#C8956C] text-sm font-semibold tracking-widest uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            מילדות להתבגרות
          </motion.p>

          <motion.h1
            className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            מרגישה שאתם בגיל ההתבגרות,
            <br />
            <span className="text-[#C8956C]">אבל הילד רק בן 9?</span>
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-white/80 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            זה לא גיל ההתבגרות מוקדם.
            <br />
            זה משהו אחר לגמרי. ויש לו שם.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <CTAButton text="אני בפנים, שרייני לי מקום" />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-6 mt-10 text-white/90 text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <span>מתחילים 23.05.26</span>
            <span>·</span>
            <span>10 מקומות בלבד</span>
            <span>·</span>
            <span>גוגל מיט · ימי ראשון</span>
          </motion.div>
        </div>
      </section>

      {/* ── PAIN ─────────────────────────────────────────────────────────── */}
      <Section bg="bg-white">
        <Reveal>
          <p className="text-2xl lg:text-3xl font-bold leading-relaxed text-navy mb-6">
            כל מילה של חבר קובעת יותר מהחוקים שלך בבית.
          </p>
          <p className="text-lg lg:text-xl text-navy/70 leading-relaxed mb-6">
            התשובות הפכו לקצרות. פרצופים. דלתות שנטרקות.
            <br />
            ואת הולכת על ביצים בבית שלך, רק כדי לא לייצר עוד פיצוץ.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-r-4 border-[#C8956C] pr-6 my-8">
            <p className="text-navy/60 italic text-xl leading-relaxed">
              &ldquo;זה הגיל, זה נורמלי&rdquo;, כולם אומרים לך.
              <br />
              אבל בפנים? את מפחדת שאם ככה זה נראה עכשיו,
              <br />
              אז מה עוד מחכה לנו בגיל 14.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-navy font-semibold text-xl">
            הדריכות שלך מובנת לגמרי.
          </p>
          <p className="text-[#A0522D] font-bold text-xl mt-1">
            אבל גם, יש כאן חדשות טובות מאוד.
          </p>
        </Reveal>
      </Section>

      {/* ── MECHANISM ────────────────────────────────────────────────────── */}
      <Section bg="bg-[#F5F4F2]">
        <Reveal>
          <p className="text-[#A0522D] text-sm font-semibold tracking-widest uppercase mb-4">
            מה באמת קורה כאן
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy leading-tight mb-6">
            גיל 7-11 הוא לא גיל ההתבגרות מוקדם.
            <br />
            <span className="text-[#A0522D]">זה גיל הגשר.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-navy/70 text-xl leading-relaxed mb-4">
            כן, זה יכול להתחיל כבר בגיל 7.
            ובגיל 12 כבר יש שינויים ביולוגיים שמשנים את התמונה לגמרי.
          </p>
          <p className="text-navy/70 text-xl leading-relaxed mb-6">
            המוח שלהם בגיל הזה עדיין לא בתוך הסערה ההורמונלית האמיתית.
            יש שינויים ביולוגיים ורגשיים ספציפיים, אבל המערכת עדיין גמישה.
            עדיין פתוחה לך.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="bg-[#2C3E5A] text-white p-6 lg:p-8">
            <p className="text-[#C8956C] font-bold text-2xl mb-3">
              חלון ההזדמנויות הגדול ביותר שיש לך.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              עבודת עומק שתעשי עכשיו על מערכת היחסים שלכם
              יכולה לשנות את כל מה שיקרה בעשור הקרוב.
            </p>
            <p className="mt-3 text-white/50 text-base">לא דרמה. מחקר.</p>
          </div>
        </Reveal>
      </Section>

      {/* ── PRODUCT ──────────────────────────────────────────────────────── */}
      <Section bg="bg-white">
        <Reveal>
          <p className="text-[#A0522D] text-sm font-semibold tracking-widest uppercase mb-3">
            המעבדה
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-3">
            מילדות להתבגרות:
            <br />
            מעבדת גיל הגשר
          </h2>
          <p className="text-navy/80 text-lg font-semibold mb-6">
            4 מפגשים · ליווי אישי · 10 אמהות בלבד
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-navy/70 text-xl leading-relaxed mb-4">
            לא עוד &ldquo;5 טיפים לילד מתנגד&rdquo;.
            <br />
            לא תיאוריות שנשמעות טוב ולא עובדות בבית.
          </p>
          <p className="text-navy font-bold text-xl mb-2">
            זאת עבודה אמיתית. על מערכת היחסים ביניכם שאת מובילה אותה.
          </p>
          <p className="text-navy/60 text-lg leading-relaxed">
            כי השינוי לא מתחיל מהילד.
            <br />
            <span className="font-semibold text-[#A0522D]">הוא מתחיל ממך.</span>
          </p>
        </Reveal>
      </Section>

      {/* ── 4 WEEKS ──────────────────────────────────────────────────────── */}
      <Section bg="bg-[#F5F4F2]">
        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-10">
            4 שבועות של עבודה
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {[
            {
              week: "שבוע 1",
              title: "לפתוח את הקלפים",
              text: 'נבחן ציפיות מול מציאות. נכיר את הלופ שנוצר ביניכם ונבין למה כשהוא אומר "תעופי מפה" זה מפעיל אצלך זעם של 10 מתוך 10. נלמד להפסיק לקחת את זה אישית, כי זה לא אישי.',
            },
            {
              week: "שבוע 2",
              title: "מתחת לקצה הקרחון",
              text: "מה באמת עובר עליו? נלמד לקרוא את הרגש שמסתתר מאחורי ההתנהגות המעצבנת ביותר. נפרק את הפלונטר הספציפי שחוזר ביניכם ונתיר אותו בלי מאבקי כוח.",
            },
            {
              week: "שבוע 3",
              title: "כשהחברים הפכו להיות הכל",
              text: "למה פתאום אנחנו לא קיימים? נלמד את המנגנון הביולוגי שעומד מאחורי זה, ואיך את מחזירה את עצמך להיות המצפן שלו.",
            },
            {
              week: "שבוע 4",
              title: "חוזרים לחזר",
              text: "איך מחזרים אחרי הילד שלך? צעדים פרקטיים שמתאימים לגיל הזה. לחזור להוביל מתוך חיבור ולא מתוך מאבק.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex gap-5 bg-white p-6 lg:p-7"
            >
              <div className="flex-shrink-0 w-20 pt-1">
                <span className="text-[#C8956C] font-semibold text-base">
                  {item.week}
                </span>
              </div>
              <div className="flex-1 border-r border-[#C8956C]/30 pr-5">
                <h3 className="font-bold text-navy text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-navy/60 text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── OUTCOMES ─────────────────────────────────────────────────────── */}
      <Section bg="bg-white">
        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-8">
            עם מה את יוצאת מהמעבדה
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {[
            {
              title: "משקפיים חדשות על הילד שלך",
              text: "תביני למה הוא מתנהג ככה, ותפסיקי להרגיש שאת הולכת על ביצים",
            },
            {
              title: "מפת הלופ שלך",
              text: "תדעי לזהות מה מפעיל אותך ואיך לעצור את כדור השלג לפני הפיצוץ",
            },
            {
              title: "ארגז כלים של חיזור",
              text: "צעדים פרקטיים שמושכים את הילד שלך בחזרה אלייך",
            },
            {
              title: "ביטחון פנימי",
              text: "ידע הוא כוח. הידיעה שאת יודעת מה לעשות, זה ביטחון אחר לגמרי",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex gap-4 items-start"
            >
              <span className="text-[#A0522D] mt-1 flex-shrink-0">
                {icons.diamond}
              </span>
              <div>
                <p className="font-bold text-navy text-lg">{item.title}</p>
                <p className="text-navy/60 text-base mt-1">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── BONUSES ──────────────────────────────────────────────────────── */}
      <Section bg="bg-[#2C3E5A]">
        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-8">
            הבונוסים
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {[
            {
              icon: icons.map,
              title: "מיפוי היקשרותי אישי דיגיטלי",
              value: 'ערך: 197 ש"ח · כלול בחינם',
              text: "כלי אבחון שבניתי שיוצר עבורך מפת דרכים של מערכת היחסים. הוא יראה לך בדיוק איזה שורש היקשרותי חסום ומייצר את ההתנגדויות, עם צעד ראשון ליישום כבר באותו רגע. לא מתחילות באוויר.",
            },
            {
              icon: icons.message,
              title: "ליווי צמוד בוואטסאפ 24/6",
              value: "4 שבועות",
              text: "המקום לנתח סיטואציות בזמן אמת, לשאול, לקבל כלים, ולהחיל בשטח. עם ליווי אקטיבי שלי לאורך כל הדרך.",
            },
            {
              icon: icons.heart,
              title: "קהילה של אמהות שמבינות",
              value: "מרחב בטוח ולא שיפוטי",
              text: "קומץ אמהות שחולקות בדיוק את אותם אתגרים. מרחב בטוח, לא שיפוטי.",
            },
          ].map((bonus, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white/10 border border-white/20 p-6 lg:p-7"
            >
              <div className="flex items-center gap-3 mb-2 text-[#C8956C]">
                {bonus.icon}
                <h3 className="text-white font-bold text-lg">{bonus.title}</h3>
              </div>
              <p className="text-[#C8956C] text-sm mb-3">{bonus.value}</p>
              <p className="text-white/70 text-base leading-relaxed">{bonus.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Section bg="bg-white">
        <Reveal>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-10">
            מה אומרות אמהות שעבדו איתי
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {[
            {
              name: "סיון",
              text: "התהליך איתך לא היה דומה לשום תהליך שעשיתי בעבר. הרגשתי שמרימים אותי, רואים אותי, מכילים אותי ונותנים לי כלים פרקטיים מעולים שאני מרגישה בטוח ליישם. השינוי היה מאוד ניכר ואין ספק שהוא יגדל ככל שאתמיד.",
            },
            {
              name: "נועה",
              text: 'מהדד לי המשפט בראש "הוא רק בן 3" ואני נותנת לזה להוביל אותי. אני מרגישה שאני מצליחה לקבל יותר את מה ש█████ בהומור ולמצוא את הניצוץ בילד החכם שלנו!',
            },
            {
              name: "עינב",
              text: "תודה על הליווי, מההתחלה היית לנו כמו כפפה ליד.",
            },
            {
              name: "רגינה",
              text: "על הליווי מהרגע הראשון ועד הרגע האחרון, אין מילים להודות לך. אנחנו מרגישים שהדברים שינו אותנו.",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative pr-8 py-2"
            >
              <span className="absolute top-0 right-0 text-[#C8956C]/30">
                {icons.quote}
              </span>
              <p className="text-navy/70 leading-relaxed text-lg mb-3 pt-4">
                {t.text}
              </p>
              <p className="text-[#A0522D] font-bold text-base">{t.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <Section bg="bg-[#F5F4F2]">
        <Reveal>
          <p className="text-[#A0522D] text-sm font-semibold tracking-widest uppercase mb-6">
            על הדר
          </p>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Photo */}
          <Reveal className="flex-shrink-0">
            <div className="w-48 h-48 lg:w-56 lg:h-56 overflow-hidden mx-auto lg:mx-0 rounded-full">
              <Image
                src="/hadar.jpg"
                alt="הדר ארקדש"
                width={224}
                height={224}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
          </Reveal>

          {/* Content */}
          <div className="flex-1">
            <Reveal>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-navy mb-2">
                נעים להכיר, אני הדר
              </h2>
              <p className="text-navy/50 text-base mb-4">
                נשואה לאוראל, ואמא לדור (9.5), עומר (7.5) וארי (3.5).
              </p>
              <p className="text-navy font-semibold text-base mb-6">
                מדריכת הורים מוסמכת בגישה ההיקשרותית-התפתחותית ויועצת זוגית, בוגרת אוניברסיטת בר-אילן.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4 text-navy/70 text-base lg:text-lg leading-relaxed">
                <p>
                  לפני כמה שנים התחלתי לחוות את זה בעצמי.
                  קונפליקטים חוזרים עם דור, תחושה שהיא מוכוונת לחברות ולא אלינו, חוסר אונים אמיתי.
                  התחלתי לחפש, ועולם נפתח.
                </p>
                <p>
                  הקונפליקטים לא נעלמו לגמרי. אני עדיין חווה אותם.
                  אבל יש לי כיום כלים, ידע, והבנה שמשנה את כל מה שקורה בינינו.
                  זה לא שהכל נהיה פתאום קל, זה שאני כבר לא לבד בתוך זה.
                </p>
                <p>
                  אני לא מאמינה באילוף ילדים, בטבלאות התנהגות, בעונשים שרק מרחיקים.
                  אני מאמינה שכשהילד מרגיש בטוח בקשר, ההתנהגות מתיישרת מעצמה.
                </p>
                <p className="text-[#A0522D] font-semibold text-lg">מחכה לראות אותך.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── LOGISTICS ────────────────────────────────────────────────────── */}
      <Section bg="bg-white">
        <Reveal>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-navy mb-8">הלוגיסטיקה</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: icons.clock, text: "ימי ראשון, 20:45 עד 22:00" },
              { icon: icons.monitor, text: "גוגל מיט" },
              { icon: icons.video, text: "כל המפגשים מוקלטים. אם לא הגעת, ההקלטה מחכה לך" },
              { icon: icons.calendar, text: "מתחילים 23.05.26" },
              { icon: icons.users, text: "10 מקומות בלבד" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-[#F5F4F2] p-5">
                <span className="text-[#A0522D] flex-shrink-0 mt-0.5">{item.icon}</span>
                <p className="text-navy text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── PRICE ────────────────────────────────────────────────────────── */}
      <Section bg="bg-[#A0522D]">
        <Reveal>
          <p className="text-white/70 text-base mb-1">ערך המעבדה</p>
          <p className="text-white/50 text-3xl font-bold line-through mb-4">799 ש"ח</p>
          <p className="text-white text-lg mb-2">במחזור הפיילוט, 10 מקומות בלבד:</p>
          <p className="text-white text-7xl font-extrabold mb-3">299 ש"ח</p>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            פחות מעלות פגישת ייעוץ אחת בקליניקה,
            עבור חודש שלם של ליווי צמוד, 4 מפגשים וכלי האבחון האישי.
          </p>
          <p className="text-white font-bold text-xl mb-8">המחיר הזה לא יחזור.</p>
          <CTAButton text="אני בפנים, שרייני לי מקום" />
        </Reveal>
      </Section>

      {/* ── OBJECTION ────────────────────────────────────────────────────── */}
      <Section bg="bg-white">
        <Reveal>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-navy mb-5">
            מה אם זה לא יעבוד אצלי?
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4">
            בדיוק בגלל שזה מחזור פיילוט, המחיר משקף את זה.
            299 ש"ח זה לא הימור. זו הזדמנות לבדוק עם אפס סיכון.
          </p>
          <p className="text-navy/70 text-lg leading-relaxed">
            הדרך לשינוי בבית לא דורשת קסמים.
            היא דורשת הבנה, סקרנות, וקצת אומץ.
          </p>
          <p className="text-[#A0522D] font-bold text-xl mt-5">בואי לחקור יחד.</p>
        </Reveal>
      </Section>

      {/* ── REGISTER FORM ────────────────────────────────────────────────── */}
      <Section bg="bg-[#F5F4F2]">
        <div id="register">
          <Reveal>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-2">
              הדר, אני בפנים!
            </h2>
            <p className="text-navy/60 text-lg mb-8">שרייני לי מקום במעבדה</p>
          </Reveal>

          {submitted ? (
            <Reveal>
              <div className="bg-[#2C3E5A] text-white p-8 text-center">
                <p className="text-3xl font-bold mb-3">קיבלתי!</p>
                <p className="text-white/70 text-lg mb-6">
                  השלב האחרון - תשלום להבטחת המקום שלך.
                </p>
                <a
                  href="https://secure.cardcom.solutions/EA/EA5/lpskTbNqVUGzncHXQmNZA/PaymentSP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#A0522D] text-white font-bold px-10 py-4 text-xl hover:opacity-90 transition-opacity"
                >
                  לתשלום מאובטח ←
                </a>
                <p className="text-white/30 text-sm mt-4">299 ש"ח · קארדקום מאובטח</p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="שם מלא"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-navy/20 bg-white px-5 py-4 text-navy text-lg placeholder:text-navy/40 focus:border-[#A0522D] focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="מייל"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-navy/20 bg-white px-5 py-4 text-navy text-lg placeholder:text-navy/40 focus:border-[#A0522D] focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="נייד"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  dir="ltr"
                  className="w-full border border-navy/20 bg-white px-5 py-4 text-navy text-lg placeholder:text-navy/40 focus:border-[#A0522D] focus:outline-none transition-colors text-right"
                />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 flex-shrink-0 accent-[#A0522D]"
                  />
                  <span className="text-navy/60 text-sm leading-relaxed">
                    קראתי ואני מסכימה ל<a href="/privacy" target="_blank" className="underline text-[#A0522D]">מדיניות הפרטיות ותנאי השימוש</a> ולקבלת עדכונים ותכנים במייל מהדר ארקדש. ניתן להסיר את עצמך בכל עת.
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={loading || !consent}
                  whileHover={{ scale: loading || !consent ? 1 : 1.02 }}
                  whileTap={{ scale: loading || !consent ? 1 : 0.97 }}
                  className="w-full bg-[#A0522D] text-white font-bold py-5 text-xl transition-shadow hover:shadow-[0_4px_24px_rgba(160,82,45,0.35)] disabled:opacity-70"
                >
                  {loading ? "שולחת..." : "הדר, אני בפנים! שרייני לי מקום"}
                </motion.button>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <p className="text-navy/40 text-sm text-center">
                  10 מקומות בלבד. המחיר הזה לא יחזור.
                </p>
              </form>
            </Reveal>
          )}
        </div>
      </Section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#2C3E5A] text-white/40 text-center py-10 text-sm">
        <img src="/logo.svg" alt="הדר ארקדש" className="h-12 w-auto mx-auto mb-4" style={{ filter: "brightness(0) invert(1) opacity(0.5)" }} />
        <p>הורות. זוגיות. התפתחות.</p>
      </footer>
    </main>
  );
}
