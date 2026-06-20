import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MeshBackground from "@/components/MeshBackground";

export default function Home() {
  return (
    <>
      <MeshBackground />
      <Nav />
      {/* relative z-[1] keeps content above the fixed mesh canvas (z-0) */}
      <main className="relative z-[1] flex-1">
        <Hero />
        <Features />
        <FinalCta />
      </main>
      <div className="relative z-[1]">
        <Footer />
      </div>
    </>
  );
}
