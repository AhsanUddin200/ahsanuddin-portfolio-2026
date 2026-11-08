import { lazy, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// IMPORTANT: Do not import the portfolio App.jsx, Navbar, Hero, SiteMotion,
// homepage styling or marketing widgets into the standalone family app.
const FamilyJournal = lazy(() => import('./pages/TrackMe.jsx'));
const PHOTO = '/track-me-splash-fast.webp';

function isInstalledMode() {
  return window.matchMedia?.('(display-mode: standalone)')?.matches ||
    window.navigator.standalone === true;
}

function isMobileBrowser() {
  return window.navigator.userAgentData?.mobile ??
    /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent);
}

function StartupSplash() {
  return <div className="tm-startup-screen" role="status" aria-label="Opening Ahsan's Updates">
    <div className="tm-startup-content">
      <img src={PHOTO} alt="Ahsan" width="148" height="148" decoding="async" fetchPriority="high" />
      <strong><em>Ahsan</em> Updates</strong>
      <small>Private family journal</small>
      <span className="tm-startup-progress" aria-hidden="true" />
    </div>
  </div>;
}

function InstallFirst({ onContinue }) {
  const [promptEvent, setPromptEvent] = useState(() => window.__trackMeInstallEvent || null);
  const [instructions, setInstructions] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const handlePrompt = () => setPromptEvent(window.__trackMeInstallEvent || null);
    const handleInstalled = () => { setAccepted(true); setPromptEvent(null); };
    window.addEventListener('trackmeinstallready', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);
    handlePrompt();
    return () => {
      window.removeEventListener('trackmeinstallready', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  async function requestInstall() {
    const event = promptEvent || window.__trackMeInstallEvent;
    if (!event) {
      // Browsers do not permit forcing install when beforeinstallprompt is unavailable.
      setInstructions(true);
      return;
    }
    // Must be called directly in a real user gesture (this click).
    try {
      await event.prompt();
      const result = await event.userChoice;
      window.__trackMeInstallEvent = null;
      setPromptEvent(null);
      if (result?.outcome === 'accepted') setAccepted(true);
      else setInstructions(true);
    } catch {
      setInstructions(true);
    }
  }

  return <main className="tm-install-screen">
    <section className="tm-install-card" aria-label="Install Ahsan's Updates">
      <img className="tm-install-photo" src={PHOTO} alt="Ahsan" width="90" height="90" />
      <p className="tm-install-kicker">PRIVATE FAMILY JOURNAL</p>
      <h1><em>Ahsan</em>'s Updates</h1>
      {accepted ? <>
        <p className="tm-install-description">Installation accepted. Open <strong>Ahsan's Updates</strong> from your phone's Home Screen to use the app without a Chrome tab.</p>
        <p className="tm-install-urdu" lang="ur" dir="rtl">ایپ انسٹال ہونے کے بعد اپنے فون کی ہوم اسکرین سے کھولیں۔</p>
      </> : <>
        <p className="tm-install-description">Keep Ahsan's daily updates on your Home Screen. Install once, then open the app directly.</p>
        <p className="tm-install-urdu" lang="ur" dir="rtl">احسن کی روزانہ کی اپڈیٹس اپنے فون کی ہوم اسکرین پر رکھیں۔</p>
        <button type="button" className="tm-install-primary" onClick={requestInstall}>Install Ahsan's Updates <span aria-hidden="true">↗</span></button>
      </>}
      {instructions && !accepted && <div className="tm-install-help" role="status">
        <strong>How to install</strong>
        <p><b>Android:</b> Open this link in Chrome, tap ⋮ → Add to Home Screen → <b>Install app</b>, when available. Avoid “Create shortcut” if you want standalone app mode.</p>
        <p><b>iPhone:</b> Safari → Share → Add to Home Screen.</p>
        <small>Some phones only offer a browser shortcut. The install method is controlled by Android / iOS and your browser.</small>
      </div>}
      <button type="button" className="tm-install-skip" onClick={onContinue}>{accepted ? 'Continue in browser' : 'Continue without installing'}</button>
      <small className="tm-install-secure">Password required · Your saved updates remain private</small>
    </section>
  </main>;
}

function JournalFallback() {
  return <div className="tm-startup-screen" role="status">
    <div className="tm-startup-content"><img src={PHOTO} width="148" height="148" alt="Ahsan"/><small>Opening family updates…</small></div>
  </div>;
}

function PrivateEntry() {
  const installed = isInstalledMode();
  const [startDone, setStartDone] = useState(() => !installed);
  const [skipInstall, setSkipInstall] = useState(() => {
    try { return sessionStorage.getItem('tm-install-skipped') === 'yes'; }
    catch { return false; }
  });

  useEffect(() => {
    if (!installed) return;
    // Fetch actual family app while the branded splash is visible.
    import('./pages/TrackMe.jsx');
    // Android/Chrome briefly shows its own OS-controlled PWA splash first.
    // Show ONE consistent, branded WEB splash for three seconds after React's
    // first painted frame, then reveal the already-loading family journal.
    // Do not change any task, API, authentication or welcome flow.
    let paintFrame = 0;
    let nextFrame = 0;
    let timer = 0;
    paintFrame = window.requestAnimationFrame(() => {
      nextFrame = window.requestAnimationFrame(() => {
        timer = window.setTimeout(() => setStartDone(true), 3000);
      });
    });
    return () => {
      window.cancelAnimationFrame(paintFrame);
      window.cancelAnimationFrame(nextFrame);
      window.clearTimeout(timer);
    };
  }, [installed]);

  if (!installed && isMobileBrowser() && !skipInstall) {
    return <InstallFirst onContinue={() => {
      try { sessionStorage.setItem('tm-install-skipped', 'yes'); }
      catch { /* Browsers may block storage; page still works. */ }
      setSkipInstall(true);
    }} />;
  }
  // Mount the family app BEHIND the 2s splash so private-data loading starts
  // during the splash instead of only after it disappears.
  return <>
    <Suspense fallback={<JournalFallback/>}><FamilyJournal/></Suspense>
    {installed && !startDone && <div className="tm-startup-overlay"><StartupSplash/></div>}
  </>;
}

function OpenPortfolio() {
  useEffect(() => { window.location.replace('/'); }, []);
  return <JournalFallback/>;
}

// Register early while showing the install screen. Some Chromium versions
// check for a service worker before offering the native install prompt.
// This worker does not intercept requests or cache any private content.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/track-me-sw.js', { scope: '/track-me' }).catch(() => {});
}

// Prevent the private page from loading the portfolio router/layout at startup.
window.__trackMeDedicatedEntry = true;
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/track-me" element={<PrivateEntry/>}/>
      <Route path="/" element={<OpenPortfolio/>}/>
      <Route path="*" element={<PrivateEntry/>}/>
    </Routes>
  </BrowserRouter>
);
