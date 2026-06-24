import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import ImgSection from "@/components/sections/ImgSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-(--sds-color-background-default-secondary)">
        <Hero />
        <ImgSection />
        <TestimonialsSection />
      </main>
    </>
  );
}
