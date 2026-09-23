import { useCallback, useState } from 'react';
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
  const [introActive, setIntroActive] = useState(true);
  const [siteReady, setSiteReady] = useState(false);

  const replayIntro = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setSiteReady(false);
    setIntroActive(true);
  }, []);

  const handleHandoff = useCallback(() => {
    setSiteReady(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroActive(false);
  }, []);

  return (
    <div className={'snap-root ' + (siteReady ? 'site-ready' : 'site-awaiting')}>
      {introActive && (
        <Intro
          onHandoff={handleHandoff}
          onComplete={handleIntroComplete}
        />
      )}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav introComplete={siteReady} onReplayIntro={replayIntro} />
      <main id="main-content" tabIndex={-1}>
        <Hero introComplete={siteReady} />
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
