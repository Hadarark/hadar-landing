import type { Metadata } from "next";

// Per-route metadata: overrides the site-wide title ("מילדות להתבגרות…") from the
// root layout so the browser tab / PDF header reads "מסמך הסכמות". This is an
// internal tool (a per-client agreement), so keep it out of search engines.
export const metadata: Metadata = {
  title: "מסמך הסכמות · הדר ארקדש",
  description: "מסמך הסכמות לתהליך ליווי הורי וזוגי — הדר ארקדש",
  robots: { index: false, follow: false },
};

export default function AgreementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
