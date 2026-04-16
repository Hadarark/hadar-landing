import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "מילדות להתבגרות: מעבדת גיל הגשר | הדר ארקדש",
  description:
    "4 מפגשים לאמהות לילדים בגילאי 7-11. עבודה אמיתית על מערכת היחסים. מתחילים 23.05.26.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
