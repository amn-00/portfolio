import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Perks from "./components/Perks";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import { profile } from "./data/portfolio";

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Perks />
        <Projects />
        <Stats />
        <Contact />
        <footer className="py-7 text-center text-[12.5px] uppercase tracking-[.1em] text-muted">
          © {new Date().getFullYear()} {profile.name} · built pixel by pixel
        </footer>
      </main>
    </>
  );
}
