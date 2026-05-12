import type { Metadata } from "next";

const TITLE = "קוד הקשר · אתגר חינמי 3 ימים | הדר ארקדש";
const DESCRIPTION =
  "אתגר חינמי בן 3 ימים לאמהות לילדים בגיל הגשר (7-11). 24-26 במאי. שעות מדויקות שיהפכו את הקשר שלכם.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "he_IL",
    siteName: "הדר ארקדש",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
