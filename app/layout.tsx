import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

// Brand typography (docs/brand.md §6): Plus Jakarta Sans headings, DM Sans body.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://taffybuckets.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Taffy — Bucket your spending.",
  description:
    "Spending awareness without the homework. Connect your bank, swipe each transaction into a bucket, and see where your money went. No budget required.",
  openGraph: {
    title: "Taffy — Bucket your spending.",
    description:
      "Sort, don't budget. Swipe each transaction into a bucket and see where your money went — in under a minute.",
    url: SITE_URL,
    siteName: "Taffy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taffy — Bucket your spending.",
    description:
      "Sort, don't budget. Swipe each transaction into a bucket and see where your money went.",
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
      className={`${jakarta.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
