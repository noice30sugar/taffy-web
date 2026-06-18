import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center sm:items-start">
          <Image
            src="/brand/taffy-wordmark-light.svg"
            alt="Taffy"
            width={84}
            height={48}
            className="h-6 w-auto"
          />
          <p className="mt-3 text-sm text-fg-faint">Bucket your spending.</p>
        </div>

        <nav className="flex flex-col items-center gap-3 text-sm sm:items-end">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-fg-dim transition hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="text-fg-dim transition hover:text-gold">
              Terms
            </Link>
            <a
              href="mailto:support@taffybuckets.com"
              className="text-fg-dim transition hover:text-gold"
            >
              Contact
            </a>
          </div>
          <p className="text-fg-faint">
            © {new Date().getFullYear()} Taffy · 🇨🇦 Built for Canadian banks
          </p>
        </nav>
      </div>
    </footer>
  );
}
