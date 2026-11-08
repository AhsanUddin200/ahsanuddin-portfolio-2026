import { lazy, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// IMPORTANT: Do not import the portfolio App.jsx, Navbar, Hero, SiteMotion,
// homepage styling or marketing widgets into the standalone family app.
const FamilyJournal = lazy(() => import('./pages/TrackMe.jsx'));
const PHOTO = '/track-me-splash-fast.webp';
const APP_ICON = '/track-me-icon-maskable-512.png';

function isInstalledMode() {
  return window.matchMedia?.('(display-mode: standalone)')?.matches ||
    window.navigator.standalone === true;
}

function isMobileBrowser() {
  return window.navigator.userAgentData?.mobile ??
    /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent);
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
  return <div className="tm-startup-screen" role="status" aria-label="Loading family updates">
    <div className="tm-startup-content">
      <img src={APP_ICON} width="110" height="110" alt="Ahsan" />
      <small>Opening family updates…</small>
    </div>
  </div>;
}

function PrivateEntry() {
  const installed = isInstalledMode();
  const [skipInstall, setSkipInstall] = useState(() => {
    try { return sessionStorage.getItem('tm-install-skipped') === 'yes'; }
    catch { return false; }
  });

  useEffect(() => {
    const cover = document.getElementById('tm-launch-cover');
    if (!cover) return undefined;
    if (!installed) {
      // Browser visitors see the existing install-first experience, not a splash.
      cover.remove();
      return undefined;
    }

    // React mounts *behind* the original static splash, rather than replacing it.
    // Minimum of 3 seconds of web splash; retain cover if private session load
    // takes longer, so no loading-spinner flash is exposed to family members.
    void import('./pages/TrackMe.jsx').catch(() => {});
    const root = document.getElementById('root');
    let appReady = false;
    let threeSecondsPassed = false;
    let closing = false;
    let exitTimer = 0;

    const finishIfReady = () => {
      if (!appReady || !threeSecondsPassed || closing) return;
      closing = true;
      cover.classList.add('tm-launch-cover--leaving');
      exitTimer = window.setTimeout(() => cover.remove(), 220);
    };
    const checkAppReady = () => {
      // TrackMe's initial API request shows .tm-loading. Do not reveal it.
      appReady = Boolean(root?.querySelector('main.tm-page:not(.tm-loading)'));
      finishIfReady();
    };
    const observer = new MutationObserver(checkAppReady);
    if (root) observer.observe(root, {childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    checkAppReady();

    const elapsed = performance.now() - (window.__tmSplashVisibleSince || performance.now());
    const minTimer = window.setTimeout(() => {
      threeSecondsPassed = true;
      finishIfReady();
    }, Math.max(0, 3000 - elapsed));
    // Avoid a permanent splash if the private app fails to initialize.
    const failSafe = window.setTimeout(() => {
      threeSecondsPassed = true;
      appReady = true;
      finishIfReady();
    }, 9000);
    return () => {
      observer.disconnect();
      window.clearTimeout(minTimer);
      window.clearTimeout(failSafe);
      window.clearTimeout(exitTimer);
    };
  }, [installed]);

  if (!installed && isMobileBrowser() && !skipInstall) {
    return <InstallFirst onContinue={() => {
      try { sessionStorage.setItem('tm-install-skipped', 'yes'); }
      catch { /* Browsers may block storage; page still works. */ }
      setSkipInstall(true);
    }} />;
  }

  return <Suspense fallback={<JournalFallback/>}><FamilyJournal/></Suspense>;
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
