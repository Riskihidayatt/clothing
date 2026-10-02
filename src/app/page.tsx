import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { LimitedDrop } from "@/components/sections/LimitedDrop";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { Lookbook } from "@/components/sections/Lookbook";
import { BrandStory } from "@/components/sections/BrandStory";
import { Community } from "@/components/sections/Community";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <div className="relative z-10 -my-2 overflow-hidden py-8">
          <Marquee
            variant="ink"
            reverse
            duration={40}
            items={["Kalcer Club", "Early Access", "Only 100 pcs", "Wear the noise"]}
            className="rotate-2 scale-105"
          />
          <Marquee className="relative z-10 -mt-2 -rotate-2 scale-105 md:-mt-10" />
        </div>
        <LimitedDrop />
        <FeaturedCollection />
        <Lookbook />
        <BrandStory />
        <Community />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
