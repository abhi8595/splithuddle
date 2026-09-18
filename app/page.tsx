import Features from "@/components/Features";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import RealLife from "@/components/RealLife";
import SplitLinkBanner from "@/components/SplitLinkBanner";
import DownloadCta from "@/components/DownloadCta";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-base text-slate-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-[#1A5FE8]"
      >
        Skip to content
      </a>

      {/* 1. Sticky nav */}
      <Navbar />

      <main id="main">
        {/* 2. Hero */}
        <Hero />

        

        {/* 4. How it works */}
        <HowItWorks />

        {/* 4. Features */}
        <Features />

        {/* 5. No-app friend spotlight */}
        <Spotlight />

        {/* 5b. Built for real life */}
        <RealLife />

        {/* 6. FAQ */}
        <Faq />

        {/* 7. Download CTA */}
        <DownloadCta />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
