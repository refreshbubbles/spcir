import { ChaptersSection } from "@/components/home/chapters-section";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { Highlights } from "@/components/home/highlights";
import { MembershipBand } from "@/components/home/membership-band";
import { NewsAndEvents } from "@/components/home/news-and-events";
import { PublicationsStrip } from "@/components/home/publications-strip";
import { QuickAccess } from "@/components/home/quick-access";
import { TrainingSection } from "@/components/home/training-section";
import { getHeroSlides } from "@/lib/data/home";

export default async function HomePage() {
  const slides = await getHeroSlides();
  return (
    <>
      <h1 className="sr-only">Sociedade Portuguesa de Cirurgia</h1>
      <HeroCarousel slides={slides} />
      <QuickAccess />
      <Highlights />
      <NewsAndEvents />
      <TrainingSection />
      <ChaptersSection />
      <PublicationsStrip />
      <MembershipBand />
    </>
  );
}
