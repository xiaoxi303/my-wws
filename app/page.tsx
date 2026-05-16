import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ProjectsHorizontal from "@/components/ProjectsHorizontal";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="relative z-10 min-h-[500vh] overflow-x-hidden bg-transparent text-white">
      <HeroSection />
      <ProjectsHorizontal />
      <ManifestoSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
