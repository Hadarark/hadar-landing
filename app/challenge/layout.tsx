import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "קוד הקשר · אתגר חינמי 3 ימים | הדר ארקדש",
  description:
    "אתגר חינמי בן 3 ימים לאמהות לילדים בגיל הגשר (8-11). 17-19 במאי. שעות מדויקות שיהפכו את הקשר שלכם.",
};

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
