import Navbar       from "@/components/Navbar";
import Hero         from "@/components/sections/Hero";
import FeaturedProject from "@/components/sections/FeaturedProject";
import About        from "@/components/sections/About";
import Projects     from "@/components/sections/Projects";
import Skills       from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Contact      from "@/components/sections/Contact";
import Footer       from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedProject />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}