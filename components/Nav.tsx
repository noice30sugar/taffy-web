"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="Taffy home" className="flex items-center">
          <Image
            src="/brand/taffy-wordmark-light.svg"
            alt="Taffy"
            width={92}
            height={52}
            priority
            className="h-6 w-auto"
          />
        </a>
        <a
          href="#join"
          className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition hover:brightness-105 active:scale-[0.98]"
        >
          Join the waitlist
        </a>
      </nav>
    </header>
  );
}
