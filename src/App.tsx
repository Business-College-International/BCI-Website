import { useState } from 'react';
import { useSnapAssist } from './hooks/useSnapAssist';
import { Intro } from './components/Intro';
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
  const [introComplete, setIntroComplete] = useState(false);
  useSnapAssist();

  const replayIntro = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setIntroComplete(false);
  };

  return (
    <div className={'snap-root ' + (introComplete ? 'site-ready' : 'site-awaiting')}>
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav introComplete={introComplete} onReplayIntro={replayIntro} />
      <main id="main-content" tabIndex={-1}>
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
