import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Domains } from "@/components/landing/Domains";
import { PreviewSection } from "@/components/landing/PreviewSection";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Domains />
      <PreviewSection />
      <CTA />
      <Footer />
    </main>
  );
}
