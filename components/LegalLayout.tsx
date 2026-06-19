import Link from "next/link";
import Footer from "./Footer";

// Shared chrome for the /privacy and /terms pages: back-link, heading,
// "last updated" line, the styled long-form article (see .legal in
// globals.css), and the global footer.
export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-20 sm:py-24">
        <Link
          href="/"
          className="text-sm text-fg-dim transition hover:text-gold"
        >
          ← Taffy
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-fg sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-fg-faint">Last updated {updated}</p>
        <article className="legal mt-10">{children}</article>
      </main>
      <Footer />
    </>
  );
}
