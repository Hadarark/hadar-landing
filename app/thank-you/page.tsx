"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ThankYouPage() {
  useEffect(() => {
    const email = localStorage.getItem("registeredEmail");
    if (email) {
      fetch("/api/add-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).finally(() => {
        localStorage.removeItem("registeredEmail");
      });
    }
  }, []);

  return (
    <main
      dir="rtl"
      className="font-assistant min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6"
    >
      <motion.div
        className="max-w-xl w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          🎉
        </motion.div>

        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#2C3E5A] mb-4">
          YOU'RE IN!
        </h1>

        <p className="text-xl text-[#2C3E5A]/70 leading-relaxed mb-6">
          עשית את הצעד הראשון להצטרף ל
          <span className="font-bold text-[#A0522D]">
            מעבדת גיל הגשר
          </span>
          .
          <br />
          פרטים נוספים יגיעו אלייך במייל תוך מספר דקות.
        </p>

        <div className="bg-white border border-[#A0522D]/20 p-6 text-right space-y-3">
          <p className="font-bold text-[#2C3E5A] text-lg">מה עכשיו?</p>
          <p className="text-[#2C3E5A]/70">
            1. בדקי את תיבת המייל שלך — שלחתי לך את כל הפרטים
          </p>
          <p className="text-[#2C3E5A]/70">
            2. הצטרפי לקבוצת הווטסאפ השקטה שלנו
          </p>
          <p className="text-[#2C3E5A]/70">
            3. מלאי את כלי המיפוי — הלינק במייל
          </p>
        </div>

        <p className="mt-8 text-[#A0522D] font-bold text-xl">
          מחכה לראות אותך 🤍
        </p>
        <p className="text-[#2C3E5A]/40 text-base mt-1">הדר</p>
      </motion.div>
    </main>
  );
}
