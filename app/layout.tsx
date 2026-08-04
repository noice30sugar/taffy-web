import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/structured-data";

// Brand typography (Gold v3 redesign): editorial serif headings (Newsreader) +
// Schibsted Grotesk body. Plus Jakarta Sans + DM Sans are retained for the
// in-app transaction-card UI mirrored on the page, so the cards match the app.
const newsreader = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// App-card UI fonts (match the iOS Theme: Plus Jakarta Sans + DM Sans).
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-card",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-card-meta",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Taffy — Bucket your spending.",
  description:
    "Spending awareness without the homework. Connect your bank, tap each transaction into a bucket, and see where your money went. No budget required.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Taffy — Bucket your spending.",
    description:
      "Sort, don't budget. Tap each transaction into a bucket and see where your money went — in under a minute.",
    url: SITE_URL,
    siteName: "Taffy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taffy — Bucket your spending.",
    description:
      "Sort, don't budget. Tap each transaction into a bucket and see where your money went.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${schibsted.variable} ${jakarta.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
