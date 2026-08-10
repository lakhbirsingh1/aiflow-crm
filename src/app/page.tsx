import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import LandingCta from "@/components/landing/LandingCta";
import AISalesAgent from "@/components/landing/AISalesAgent";
import AIRadar from "@/components/landing/AIRadar";
import Footer from "@/components/landing/Footer";
import BgDots from "@/BgDots";


export default function Home(){
  return(
    <main>
      <BgDots />
      <Navbar />
      <HeroSection />
      <Features />
      <AISalesAgent />
      <HowItWorks />
      <AIRadar />
      <Pricing />
      <LandingCta />
      <Footer />
    </main>
  );
}