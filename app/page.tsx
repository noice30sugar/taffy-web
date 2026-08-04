import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MeshBackground from "@/components/MeshBackground";
import { structuredDataJson } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      {/* SoftwareApplication + FAQPage JSON-LD. The FAQPage node is generated
          from the same FAQS array that <Faq /> renders, so the markup always
          matches the visible content. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
      <MeshBackground />
      <Nav />
      {/* relative z-[1] keeps content above the fixed mesh canvas (z-0) */}
      <main className="relative z-[1] flex-1">
        <Hero />
        <Features />
        <Faq />
        <FinalCta />
      </main>
      <div className="relative z-[1]">
        <Footer />
      </div>
    </>
  );
}
