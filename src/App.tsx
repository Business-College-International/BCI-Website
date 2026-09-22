import { useSnapAssist } from './hooks/useSnapAssist';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Pathway } from './components/Pathway';
import { Routes } from './components/Routes';
import { Programmes } from './components/Programmes';
import { Gallery } from './components/Gallery';
import { Motto } from './components/Motto';
import { Apply } from './components/Apply';
import { Track } from './components/Track';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useSnapAssist();

  return (
    <div className="snap-root">
      <Nav />
      <main>
        <Hero />
        <About />
        <Pathway />
        <Routes />
        <Programmes />
        <Gallery />
        <Motto />
        <Apply />
        <Track />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
