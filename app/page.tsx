import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { StorySection } from "@/components/landing/StorySection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { MenuPreview } from "@/components/landing/MenuPreview";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StorySection />
      <FeaturesSection />
      <MenuPreview />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
