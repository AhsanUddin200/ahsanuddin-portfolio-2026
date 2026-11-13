import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, CalendarDays, Check,
  CheckCircle2, ChevronLeft, ChevronRight, Clock3, Edit3, Eye, EyeOff,
  GraduationCap, Heart, KeyRound, LockKeyhole, LogOut, Plus, Search,
  Bell, Send, ShieldAlert, ShieldCheck, Sparkles, Trash2, TrendingUp, X, Home, Menu, MessageSquareText, Sun, Moon, Volume2, VolumeX, Smartphone, UserRound,
} from 'lucide-react';
import './TrackMe.css';

// Real family photo supplied by the owner (stored in /public).
const PROFILE_PHOTO = '/ahsan-family-photo.png';

// Reuse the same photograph for all three private screens.
function AhsanAvatar({ className = '' }) {
  return <img className={`tmv-profile-photo ${className}`} src={PROFILE_PHOTO} alt="Ahsan" loading="eager" decoding="async" />;
}

function AhsanName() {
  return <span className="tmv-handwritten-name">Ahsan</span>;
}

// Branded 2-second in-app splash for a *standalone installed* PWA launch.
// The OS native splash is controlled by Android/iOS and may appear briefly first.
function FamilyAppSplash() {
  return <div className="tmv-launch-splash" role="status" aria-label="Opening Ahsan's Updates">
    <div className="tmv-launch-splash-content">
      <img src="/track-me-splash-photo.png" className="tmv-launch-splash-photo" alt="Ahsan" decoding="sync" fetchPriority="high" />
      <strong className="tmv-launch-splash-name"><AhsanName/> <span>Updates</span></strong>
      <span className="tmv-launch-splash-subtitle">Private family journal</span>
      <span className="tmv-launch-splash-progress" aria-hidden="true" />
    </div>
  </div>;
}

// Optional home-screen shortcut. No offline cache and no private record storage.
function InstallShortcut() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    const isInstalled = window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone === true;
    setInstalled(Boolean(isInstalled));
    const capture = event => { event.preventDefault(); setPromptEvent(event); };
    const onInstalled = () => { setInstalled(true); setHelpOpen(false); setPromptEvent(null); };
    window.addEventListener('beforeinstallprompt', capture);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', capture);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);
  if (installed) return null;
  async function install() {
    if (promptEvent) {
      try { await promptEvent.prompt(); await promptEvent.userChoice; }
      catch { setHelpOpen(true); }
      setPromptEvent(null);
      return;
    }
    setHelpOpen(value => !value);
  }
  return <div className="tmv-install-helper">
    <button className="tmv-install-trigger" type="button" onClick={install} aria-expanded={helpOpen}>
      <Smartphone size={16} aria-hidden="true"/> Install Ahsan's Updates <span lang="ur" dir="rtl">ایپ انسٹال کریں</span>
    </button>
    {helpOpen && <div className="tmv-install-instructions" role="status">
      <p><strong>iPhone:</strong> Open in Safari → Share → Add to Home Screen.</p>
      <p lang="ur" dir="rtl">آئی فون: سفاری میں کھولیں ← شیئر ← ہوم اسکرین میں شامل کریں۔</p>
      <p><strong>Android:</strong> Open this page in Chrome (not inside WhatsApp) → ⋮ → Add to Home screen → <strong>Install app</strong>. Choose <strong>Install</strong> rather than Create shortcut if shown.</p>
      <p lang="ur" dir="rtl">اینڈرائیڈ: لنک کروم میں کھولیں، پھر ⋮ ← ہوم اسکرین پر شامل کریں ← ایپ انسٹال کریں۔</p>
      <small>Some phones/browsers only offer a Chrome shortcut. Installing as a standalone app depends on Android, Chrome and Google Play services. Private data needs internet and your family password.</small>
    </div>}
  </div>;
}

// Consistent professional line icon system — minimal, precise, and monochrome.
// Custom prayer and Quran symbols remain semantically recognizable.
// No emojis, gradients, cartoon shading, or external icon/image dependencies.
function CategoryArtwork({ type }) {
  const common = {
    className: 'tmv-category-artwork',
    'data-category': type,
    viewBox: '0 0 48 48',
    width: 32,
    height: 32,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.85,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
  };
  switch (type) {
    case 'prayer':
      return <svg {...common}>
        <path d="M7 40h34M11 40V23m26 17V23" />
        <path d="M15 40V25c0-5.9 3.3-9.6 9-12.2C29.7 15.4 33 19.1 33 25v15" />
        <path d="M20 40v-9a4 4 0 0 1 8 0v9" />
        <path d="M24 12.8v-3" />
        <path d="M27 3.5a5.2 5.2 0 1 0 4.7 7.4A5.1 5.1 0 0 1 27 3.5Z" />
        <path d="M8 20h6m20 0h6" />
      </svg>;
    case 'quran':
      return <svg {...common}>
        <path d="M24 14c-5.7-4.5-11.6-5.6-18-3.4V36c7.5-2.2 13.3-.5 18 3.5" />
        <path d="M24 14c5.7-4.5 11.6-5.6 18-3.4V36c-7.5-2.2-13.3-.5-18 3.5" />
        <path d="M24 14v25.5M11 17.5c3-.4 5.5.1 8 1.2m-8 4c3-.4 5.5.1 8 1.2m10-5.2c2.5-1.1 5-1.6 8-1.2m-8 6.4c2.5-1.1 5-1.6 8-1.2" />
      </svg>;
    case 'office':
      return <svg {...common}>
        <rect x="6.5" y="15" width="35" height="26" rx="3.6" />
        <path d="M17 15v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" />
        <path d="M6.5 25c9.5 5.8 25.5 5.8 35 0" />
        <rect x="21" y="26" width="6" height="6" rx="1.2" fill="white" />
      </svg>;
    case 'university':
      return <svg {...common}>
        <path d="m5 18.5 19-9 19 9-19 9-19-9Z" />
        <path d="M12.5 22.3v11c6.5 5.4 16.5 5.4 23 0v-11" />
        <path d="M43 18.5v14" />
        <path d="M40.5 37h5L43 31.8 40.5 37Z" />
      </svg>;
    case 'personal':
    default:
      return <svg {...common}>
        <path d="M24 40s-16-9.7-17.9-19.3C4.4 12 13.4 6.5 20.2 13.2L24 17l3.8-3.8C34.6 6.5 43.6 12 41.9 20.7 40 30.3 24 40Z" />
        <path d="M16 25h5l3-5 3 9 2.3-4H33" />
      </svg>;
  }
}


// Seven different videos per category: Monday to Sunday, then repeat weekly.
// Each selected day's weekday chooses its own clip. Second source is a fallback
// for the SAME video, never another weekday's footage.
// Muted, lazy-loaded, looped, with data-saver and reduced-motion safeguards.
const FAMILY_CARD_VIDEO_SOURCES = {
  prayer: [
    [
      'https://assets.mixkit.co/videos/preview/mixkit-men-praying-inside-a-mosque-on-the-floor-34223-large.mp4',
      'https://assets.mixkit.co/videos/34223/34223-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-drone-flying-above-a-mosque-11922-large.mp4',
      'https://assets.mixkit.co/videos/11922/11922-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-huge-living-room-with-a-carpet-inside-a-mosque-34251-large.mp4',
      'https://assets.mixkit.co/videos/34251/34251-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-elegant-living-room-inside-a-mosque-39179-large.mp4',
      'https://assets.mixkit.co/videos/39179/39179-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-inside-a-mosque-in-istanbul-15694-large.mp4',
      'https://assets.mixkit.co/videos/15694/15694-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-mosque-in-the-top-of-a-cloudy-hill-9595-large.mp4',
      'https://assets.mixkit.co/videos/9595/9595-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-big-mosque-in-the-middle-of-a-city-from-the-top-34295-large.mp4',
      'https://assets.mixkit.co/videos/34295/34295-720.mp4',
    ],
  ],
  quran: [
    [
      'https://assets.mixkit.co/videos/preview/mixkit-person-turning-the-sheets-of-the-quran-35441-large.mp4',
      'https://assets.mixkit.co/videos/35441/35441-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-the-book-of-the-quran-close-up-view-34189-large.mp4',
      'https://assets.mixkit.co/videos/34189/34189-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-religious-man-looking-at-the-pages-of-the-quran-34186-large.mp4',
      'https://assets.mixkit.co/videos/34186/34186-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-quran-resting-on-a-plinth-11924-large.mp4',
      'https://assets.mixkit.co/videos/11924/11924-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-man-reading-coral-inside-a-mosque-34208-large.mp4',
      'https://assets.mixkit.co/videos/34208/34208-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-man-running-his-finger-on-the-pages-of-the-quran-34188-large.mp4',
      'https://assets.mixkit.co/videos/34188/34188-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-closeup-of-the-quran-11921-large.mp4',
      'https://assets.mixkit.co/videos/11921/11921-720.mp4',
    ],
  ],
  office: [
    [
      'https://assets.mixkit.co/videos/preview/mixkit-laptop-screen-showing-software-code-1732-large.mp4',
      'https://assets.mixkit.co/videos/1732/1732-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
      'https://assets.mixkit.co/videos/1728/1728-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-a-software-developer-working-and-drinking-coffee-1749-large.mp4',
      'https://assets.mixkit.co/videos/1749/1749-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-computer-hacker-logging-a-website-with-code-47321-large.mp4',
      'https://assets.mixkit.co/videos/47321/47321-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-programming-and-coding-new-technologies-46635-large.mp4',
      'https://assets.mixkit.co/videos/46635/46635-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-numeric-code-on-screen-close-up-34838-large.mp4',
      'https://assets.mixkit.co/videos/34838/34838-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-green-computer-code-scrolling-22760-large.mp4',
      'https://assets.mixkit.co/videos/22760/22760-720.mp4',
    ],
  ],
  university: [
    [
      'https://assets.mixkit.co/videos/preview/mixkit-girl-doing-homework-in-a-library-4531-large.mp4',
      'https://assets.mixkit.co/videos/4531/4531-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-4519-large.mp4',
      'https://assets.mixkit.co/videos/4519/4519-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-reverse-tour-of-a-library-full-of-books-21595-large.mp4',
      'https://assets.mixkit.co/videos/21595/21595-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-students-walking-on-a-university-campus-4503-large.mp4',
      'https://assets.mixkit.co/videos/4503/4503-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-concentrated-boy-studying-at-home-4761-large.mp4',
      'https://assets.mixkit.co/videos/4761/4761-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-students-in-a-cafeteria-discussing-an-assignment-4794-large.mp4',
      'https://assets.mixkit.co/videos/4794/4794-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-panning-shot-of-college-study-desk-101309-large.mp4',
      'https://assets.mixkit.co/videos/101309/101309-720.mp4',
    ],
  ],
  personal: [
    [
      'https://assets.mixkit.co/videos/preview/mixkit-man-texting-on-whatsapp-41173-large.mp4',
      'https://assets.mixkit.co/videos/41173/41173-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-man-answering-a-whatsapp-41165-large.mp4',
      'https://assets.mixkit.co/videos/41165/41165-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-typing-on-a-cell-phone-4915-large.mp4',
      'https://assets.mixkit.co/videos/4915/4915-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-hands-shown-texting-on-a-smartphone-144-large.mp4',
      'https://assets.mixkit.co/videos/144/144-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-woman-typing-on-her-cell-phone-43270-large.mp4',
      'https://assets.mixkit.co/videos/43270/43270-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-black-phone-on-laptop-247-large.mp4',
      'https://assets.mixkit.co/videos/247/247-720.mp4',
    ],
    [
      'https://assets.mixkit.co/videos/preview/mixkit-person-answering-a-message-41166-large.mp4',
      'https://assets.mixkit.co/videos/41166/41166-720.mp4',
    ],
  ],
};

function FamilyCardVideo({ category, date }) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [clipIndex, setClipIndex] = useState(0);
  // Noon avoids off-by-one dates when the visitor views older journal days.
  const weekday = /^\d{4}-\d{2}-\d{2}$/.test(date || '')
    ? (new Date(`${date}T12:00:00`).getDay() + 6) % 7
    : (new Date().getDay() + 6) % 7;
  const sources = FAMILY_CARD_VIDEO_SOURCES[category]?.[weekday] || [];

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof window === 'undefined') return;

    // Respect mobile data saver and the user's reduced-motion preference.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
        navigator.connection?.saveData) return;

    let inView = false;
    const check = () => {
      if (inView && document.visibilityState === 'visible') {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) setShouldLoad(true);
      check();
    }, { rootMargin: '90px 0px', threshold: 0.05 });
    observer.observe(video);
    document.addEventListener('visibilitychange', check);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', check);
      video.pause();
    };
  }, []);

  if (!sources.length) return null;

  return <video
    ref={ref}
    className={`tmv-card-video tmv-card-video-${category}`}
    src={shouldLoad && clipIndex < sources.length ? sources[clipIndex] : undefined}
    muted
    loop
    autoPlay
    playsInline
    preload="none"
    aria-hidden="true"
    tabIndex={-1}
    onError={() => setClipIndex(i => i + 1)}
  />;
}

const PRAYERS = [
  ['fajr', 'Fajr'], ['dhuhr', 'Dhuhr'], ['asr', 'Asr'],
  ['maghrib', 'Maghrib'], ['isha', 'Isha'],
];
const WORK_SECTIONS = [
  { key: 'office', name: 'Office Work', icon: BriefcaseBusiness, description: 'Projects and today’s work' },
  { key: 'personal', name: 'Personal Work', icon: Heart, description: 'Goals, habits and life' },
  { key: 'university', name: 'University', icon: GraduationCap, description: 'Applications and upcoming dates' },
];
const PRACTICE_SECTIONS = [
  { key: 'prayer', name: 'Prayer', icon: Clock3, description: 'Group and make-up prayers' },
  { key: 'quran', name: 'Quran', icon: BookOpen, description: '15-line Quran reading log' },
];
const ALL_SECTIONS = [...WORK_SECTIONS, ...PRACTICE_SECTIONS];
const STATUS = { planned: 'To Do', in_progress: 'In Progress', done: 'Completed' };
const APP_STATUS = {
  planning: 'Planning', applied: 'Applied', upcoming: 'Upcoming', interview: 'Interview',
  waiting: 'Waiting', offer: 'Offer Received', accepted: 'Accepted', rejected: 'Not Selected',
};
const AREAS = ['general', 'health', 'learning', 'family', 'finance', 'other'];

const dayISO = (date = new Date()) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
function shiftDay(date, offset) {
  const d = new Date(`${date}T12:00:00`);
  d.setDate(d.getDate() + offset);
  return dayISO(d);
}
function prettyDate(value) {
  if (!value) return 'No date';
  const date = value.length === 10 ? new Date(`${value}T12:00:00`) : new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}
function initialTask(section = 'office') {
  return {
    title: '', detail: '', section: WORK_SECTIONS.some(x => x.key === section) ? section : 'office',
    status: 'planned', priority: 'medium', dueDate: '',
    meta: { project: '', university: '', program: '', applicationStatus: 'planning', applicationDate: dayISO(), upcomingDate: '', area: 'general' },
  };
}
async function api(body) {
  const res = await fetch('/api/track', {
    method: body ? 'POST' : 'GET',
    credentials: 'same-origin', cache: 'no-store',
    ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
  });
  let data;
  try { data = await res.json(); }
  catch { throw new Error('Track Me server is not responding. Please check the deployment.'); }
  if (!res.ok) { const err = new Error(data.error || 'Something went wrong.'); err.status = res.status; throw err; }
  return data;
}


/* V31: Friendly opt-in reminder. No automatic notification prompt. */
/* Track Me V31.5 - one-tap mini bell */
function FamilySevenDayReminder({ viewer = 'family' }) {
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const isIndividual = ['nasir', 'talat', 'happa', 'yamna'].includes(viewer);

  function flash(message) {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(''), 2000);
  }
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return undefined;
    let active = true;
    navigator.serviceWorker.getRegistration('/track-me')
      .then(reg => reg ? reg.pushManager.getSubscription() : null)
      .then(sub => { if (active) setEnabled(Boolean(sub)); })
      .catch(() => { if (active) setEnabled(false); });
    return () => { active = false; };
  }, [viewer]);

  async function handleBell() {
    if (busy) return;
    if (!isIndividual) {
      flash('Sign in with your individual family password.');
      return;
    }
    if (!('Notification' in window) || !('PushManager' in window) || !('serviceWorker' in navigator)) {
      flash('Notifications are not available on this device.');
      return;
    }
    setBusy(true);
    try {
      // Must happen directly after a real tap, before another asynchronous operation.
      if (!enabled) {
        if (Notification.permission === 'denied') throw Error('Allow notifications in phone settings first.');
        if (Notification.permission !== 'granted') {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') throw Error('Notification permission not allowed.');
        }
      }
      const reg = await navigator.serviceWorker.register('/track-me-sw.js', { scope: '/track-me' });
      const existing = await reg.pushManager.getSubscription();
      if (enabled) {
        if (existing) {
          await api({ action: 'reminder_unsubscribe', endpoint: existing.endpoint });
          await existing.unsubscribe();
        }
        setEnabled(false);
        flash('7-day reminders turned off.');
      } else {
        const config = await api({ action: 'reminder_config' });
        if (!config.publicKey) throw Error('Notifications are not configured yet.');
        const base64 = config.publicKey.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
        const key = Uint8Array.from(atob(padded), c => c.charCodeAt(0));
        const subscription = existing || await reg.pushManager.subscribe({
          userVisibleOnly: true, applicationServerKey: key,
        });
        try {
          await api({ action: 'reminder_subscribe', subscription: subscription.toJSON() });
        } catch (err) {
          if (!existing) await subscription.unsubscribe().catch(() => {});
          throw err;
        }
        setEnabled(true);
        flash("Get a gentle notification if you haven't opened Ahsan's Updates for 7 days.");
      }
    } catch (err) {
      flash(err?.message || 'Could not update notifications.');
    } finally {
      setBusy(false);
    }
  }

  return <>
    <button type="button" className="tmv-mini-bell" aria-label="Toggle 7-day notifications"
      title={enabled ? 'Turn off 7-day reminders' : 'Turn on 7-day reminders'}
      aria-pressed={enabled} aria-busy={busy} disabled={busy} onClick={handleBell}>
      <Bell size={17} strokeWidth={1.8} aria-hidden="true" />
      {enabled && isIndividual && <span className="tmv-mini-bell-dot" aria-hidden="true" />}
    </button>
    {toast && <div className="tmv-mini-toast" role="status" aria-live="polite">{toast}</div>}
  </>;
}

/* V38: Compact, rounded male/female silhouette above the signed-in name.
   Pure inline SVG: no new image files, dependencies, or login changes. */
const FAMILY_IDENTITY = {
  nasir: {name: 'Nasir', gender: 'male'},
  talat: {name: 'Talat', gender: 'female'},
  happa: {name: 'Happa', gender: 'female'},
  yamna: {name: 'Yamna', gender: 'female'},
};
function FamilyProfileSilhouette({ gender }) {
  if (gender === 'female') return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
    <path d="M9.6 23.6C8.4 21 8.1 17.3 8.7 13.1 9.5 7.8 11.9 5.7 16 5.7s6.5 2.1 7.3 7.4c.6 4.2.3 7.9-.9 10.5l-3.1-1.3.7-6.9c-.6-2-1.6-3.1-4-3.9-2.4.8-3.4 1.9-4 3.9l.7 6.9-3.1 1.3Z" fill="currentColor"/>
    <path d="M11.4 15.5c0 4.4 1.9 6.7 4.6 6.7s4.6-2.3 4.6-6.7" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/>
    <path d="M5.7 27.8c.5-2.8 2.9-4.7 6.5-5.5l3.8 2.3 3.8-2.3c3.6.8 6 2.7 6.5 5.5" fill="currentColor"/>
  </svg>;
  if (gender === 'male') return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
    <path d="M10.3 13.6V10c0-3.2 2.3-5.2 5.7-5.2s5.7 2 5.7 5.2v3.6l-2.3-1.8-.7-1.6-2.4 1.2-3.4-1.1-2.6 3.3Z" fill="currentColor"/>
    <path d="M10.8 13.6v3.1c0 3.4 2.1 5.8 5.2 5.8s5.2-2.4 5.2-5.8v-3.1" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/>
    <path d="M5.8 27.8c.5-3.2 2.8-4.7 6.6-5.5l3.6 2.3 3.6-2.3c3.8.8 6.1 2.3 6.6 5.5" fill="currentColor"/>
  </svg>;
  return <UserRound size={22} strokeWidth={1.7} aria-hidden="true"/>;
}
function FamilyIdentity({ viewer }) {
  const person = FAMILY_IDENTITY[viewer] || {name: 'Family', gender: 'other'};
  return <span className="tmv-v37-identity" role="img" title={`Signed in: ${person.name}`} aria-label={`Signed in as ${person.name}`}>
    <span className="tmv-v38-avatar"><FamilyProfileSilhouette gender={person.gender}/></span>
    <span className="tmv-v38-name">{person.name}</span>
  </span>;
}

function LoginScreen({ password, setPassword, onSubmit, busy, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="tm-access-screen tmv-signin">
      <div className="tmv-auth-frame">
        <div className="tmv-auth-aside" aria-hidden="true">
          <div className="tmv-auth-brand"><AhsanAvatar className="tmv-avatar-auth"/><span><AhsanName/> / DAILY UPDATES</span></div>
          <div className="tmv-auth-brief">
            <span className="tmv-auth-label">A PRIVATE FAMILY JOURNAL</span>
            <h2>Closer to the moments that matter.</h2>
            <p>One simple place to follow his day, his work and his progress.</p>
          </div>
          <div className="tmv-auth-aside-footer"><span className="tmv-pulse-dot"/> SECURE FAMILY ACCESS</div>
        </div>
        <div className="tm-access-card tmv-auth-form-panel">
          <div className="tmv-auth-mobile-brand"><AhsanAvatar className="tmv-avatar-mobile"/><strong><AhsanName/>’s Updates</strong></div>
          <p className="tmv-login-eyebrow">FAMILY SIGN IN</p>
          <h1>Welcome back.</h1>
          <p className="tm-access-copy">Enter the family password to view <AhsanName/>’s latest updates.</p>
          <form onSubmit={onSubmit} className="tm-stack">
            <label className="tm-field"><span>Family password</span>
              <div className="tm-input-icon"><LockKeyhole size={18} strokeWidth={1.9}/><input required type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" maxLength={200}/>
                <button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(x => !x)}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
              </div>
            </label>
            {error && <div role="alert" className="tm-error">{error}</div>}
            <p id="tmv-password-autocheck" className="tmv-password-autocheck" role="status" aria-live="polite">
              {busy ? 'Checking password…' : 'Sign in automatically after you finish typing. You can also press Enter.'}
            </p>
          </form>
          <p className="tmv-signin-note"><ShieldCheck size={16} strokeWidth={1.8}/> Private and password protected</p>
          <InstallShortcut/>
        </div>
      </div>
      <Link className="tm-return" to="/"><ArrowLeft size={16}/> Back to website</Link>
    </div>
  );
}

/* V30 PERSONALIZED FAMILY WELCOME */
const FAMILY_WELCOME_MESSAGES = {
  nasir: ["You are Ahsan's father.", 'You are tracking your son.'],
  talat: ["You are Ahsan's mother.", 'You are tracking your son.'],
  happa: ["You are Happa Ahsan's favorite person and future life partner, InshaAllah ", 'You are tracking your man.'],
  yamna: ["You are Ahsan's sister.", 'You are tracking your brother.'],
  family: ["Welcome to Ahsan's private family journal.", "You are following Ahsan's updates."],
};
function CautionWelcome({ viewer = 'family', onContinue }) {
  const [secondsLeft, setSecondsLeft] = useState(4);
  const continueRef = useRef(onContinue);
  useEffect(() => { continueRef.current = onContinue; }, [onContinue]);
  useEffect(() => {
    const tick = window.setInterval(() => setSecondsLeft(n => Math.max(0, n - 1)), 1000);
    const finish = window.setTimeout(() => continueRef.current(), 4000);
    return () => { window.clearInterval(tick); window.clearTimeout(finish); };
  }, []);
  const lines = FAMILY_WELCOME_MESSAGES[viewer] || FAMILY_WELCOME_MESSAGES.family;
  return (
    <div className="tm-welcome-screen" role="dialog" aria-modal="true" aria-label="Welcome to Ahsan's daily updates">
      <section className="tm-welcome-card tmv-welcome-panel">
        <div className="tmv-welcome-portrait" aria-hidden="true" />
        <div className="tmv-welcome-header">
          <AhsanAvatar className="tmv-avatar-welcome"/>
          <span><AhsanName/>’S UPDATES</span>
          <ShieldCheck size={20}/>
        </div>
        <div className="tmv-welcome-body">
          <span className="tmv-welcome-kicker">A PERSONAL REMINDER</span>
          <h1>Every day tells a story.</h1>
          <div className="tm-typing tmv-relation-message" role="status" aria-live="polite">
            <span>{lines[0]}</span>
            <span className="tmv-partner-followup">{lines[1]}</span>
          </div>
          <p className="tmv-welcome-auto-status" role="status" aria-live="polite">
            Opening daily updates in <strong>{secondsLeft}s</strong>…
            <span>آپ کی اپڈیٹس {secondsLeft} سیکنڈ میں کھل جائیں گی۔</span>
          </p>
          <p>A private look into the moments, effort and progress <AhsanName/> shares with you.</p>
        </div>
        <div className="tmv-welcome-footer">PRIVATE FAMILY JOURNAL <span>·</span> MADE TO KEEP YOU CONNECTED</div>
      </section>
    </div>
  );
}
function PinModal({ busy, onVerify, onClose, error }) {
  const [pin, setPin] = useState('');
  const [show, setShow] = useState(false);
  return (
    <div className="tm-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section className="tm-modal tm-pin-modal" role="dialog" aria-modal="true" aria-label="New task secret code">
        <button className="tm-close" type="button" onClick={onClose} aria-label="Close"><X size={21}/></button>
        <div className="tm-lock-icon"><LockKeyhole size={26}/></div>
        <h2>Owner Access Code</h2>
        <p className="tm-muted">Only Ahsan can update this page. Enter the private owner code to edit daily records.</p>
        <form className="tm-stack" onSubmit={e => {e.preventDefault(); onVerify(pin);}}>
          <label className="tm-field"><span>Secret code</span><div className="tm-input-icon"><KeyRound size={18}/><input required autoFocus maxLength={200} autoComplete="off" type={show ? 'text' : 'password'} value={pin} onChange={e => setPin(e.target.value)} placeholder="Enter code"/><button type="button" onClick={() => setShow(x => !x)} aria-label="Show or hide code">{show ? <EyeOff size={20}/> : <Eye size={20}/>}</button></div></label>
          {error && <div className="tm-error" role="alert">{error}</div>}
          <button type="submit" disabled={busy} className="tm-primary tm-wide">{busy ? 'Checking...' : 'Continue'} <ArrowRight size={19}/></button>
          <button className="tm-text-button" type="button" onClick={onClose}>Cancel</button>
        </form>
      </section>
    </div>
  );
}

function TaskEditor({ initial, saving, onClose, onSave }) {
  const [form, setForm] = useState({ ...initial, meta: { ...initial.meta } });
  const change = (k, v) => setForm(old => ({ ...old, [k]: v }));
  const changeMeta = (k, v) => setForm(old => ({ ...old, meta: { ...(old.meta || {}), [k]: v } }));
  return (
    <div className="tm-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section className="tm-modal tm-editor" role="dialog" aria-modal="true" aria-label={initial.id ? 'Edit task' : 'Create task'}>
        <div className="tm-modal-heading"><h2>{initial.id ? 'Edit Task' : 'Add New Task'}</h2><button className="tm-close" type="button" aria-label="Close" onClick={onClose}><X size={21}/></button></div>
        <form className="tm-stack" onSubmit={e => {e.preventDefault(); onSave(form);}}>
          <label className="tm-field"><span>Where does this belong?</span><select value={form.section} onChange={e => change('section', e.target.value)}>{WORK_SECTIONS.map(x => <option key={x.key} value={x.key}>{x.name}</option>)}</select></label>
          {form.section === 'office' && <label className="tm-field"><span>Project name</span><input maxLength={120} value={form.meta?.project || ''} onChange={e => changeMeta('project', e.target.value)} placeholder="e.g. Client project"/></label>}
          {form.section === 'university' && <>
            <label className="tm-field"><span>University name</span><input maxLength={140} value={form.meta?.university || ''} onChange={e => changeMeta('university', e.target.value)} placeholder="e.g. XYZ University"/></label>
            <label className="tm-field"><span>Program / Degree</span><input maxLength={140} value={form.meta?.program || ''} onChange={e => changeMeta('program', e.target.value)} placeholder="e.g. BS Computer Science"/></label>
            <label className="tm-field"><span>Application status</span><select value={form.meta?.applicationStatus || 'planning'} onChange={e => changeMeta('applicationStatus', e.target.value)}>{Object.entries(APP_STATUS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
            <label className="tm-field"><span>Next interview / test / deadline</span><input type="date" value={form.meta?.upcomingDate || ''} onChange={e => changeMeta('upcomingDate', e.target.value)}/></label>
          </>}
          {form.section === 'personal' && <label className="tm-field"><span>Personal area</span><select value={form.meta?.area || 'general'} onChange={e => changeMeta('area', e.target.value)}>{AREAS.map(x => <option key={x} value={x}>{x[0].toUpperCase() + x.slice(1)}</option>)}</select></label>}
          <label className="tm-field"><span>{form.section === 'university' ? 'Application / Task name' : 'Task name'}</span><input required maxLength={140} value={form.title} onChange={e => change('title', e.target.value)} placeholder="What do you need to do?"/></label>
          <label className="tm-field"><span>Details (optional)</span><textarea rows={2} maxLength={1800} value={form.detail} onChange={e => change('detail', e.target.value)} placeholder="Write a short detail..."/></label>
          <details className="tm-details"><summary>More options (optional)</summary>
            <label className="tm-field"><span>Progress</span><select value={form.status} onChange={e => change('status', e.target.value)}>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
            <label className="tm-field"><span>Priority</span><select value={form.priority} onChange={e => change('priority', e.target.value)}><option value="low">Low</option><option value="medium">Normal</option><option value="high">Important</option></select></label>
            <label className="tm-field"><span>Target date</span><input type="date" value={form.dueDate || ''} onChange={e => change('dueDate', e.target.value)}/></label>
            {form.section === 'university' && <label className="tm-field"><span>Date applied</span><input type="date" value={form.meta?.applicationDate || ''} onChange={e => changeMeta('applicationDate', e.target.value)}/></label>}
          </details>
          <button type="submit" disabled={saving} className="tm-primary tm-wide"><Check size={19}/>{saving ? 'Saving...' : initial.id ? 'Save Changes' : 'Save New Task'}</button>
          <button type="button" className="tm-text-button" onClick={onClose}>Cancel</button>
        </form>
      </section>
    </div>
  );
}

/* ============================================================
   FAMILY SUMMARY CHAT — frontend only.
   Every scripted assistant message is English + Urdu script.
   The existing API is used unchanged for optional AI insight
   (today/week only). Month is computed from saved records.
============================================================ */

const CHAT_PERIODS = [
  { id: 'today', en: 'Today', ur: 'آج', days: 1 },
  { id: 'week', en: 'Last 7 days', ur: 'پچھلے ۷ دن', days: 7 },
  { id: 'month', en: 'Last 30 days', ur: 'پچھلے ۳۰ دن', days: 30 },
];
const CHAT_TOPICS = [
  { id: 'all', number: '1', en: 'Everything', ur: 'سب کچھ' },
  { id: 'prayer', number: '2', en: 'Prayer', ur: 'نماز' },
  { id: 'quran', number: '3', en: 'Quran', ur: 'قرآن' },
  { id: 'office', number: '4', en: 'Office work', ur: 'دفتر کا کام' },
  { id: 'university', number: '5', en: 'University', ur: 'یونیورسٹی' },
  { id: 'personal', number: '6', en: 'Personal', ur: 'ذاتی کام' },
];
const BOT_INTRO = {
  role: 'bot',
  en: 'Hi! Ask about Ahsan’s day, or choose a period below. Example: “Office on 3 Nov”.',
  ur: 'السلام علیکم! احسن کی اپڈیٹس کے بارے میں سوال لکھیں یا نیچے دن منتخب کریں۔ مثال: ۳ نومبر کا دفتری کام۔',
};

function parseChatPeriod(raw) {
  const s = String(raw || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (!s) return null;
  if (/^(1|۱|١)$/.test(s) || /today|to day|24\s*(hour|hr)|aaj|^aj$|aaj ki|aj ki|abhi|آج|اج|آج کی|آج کا/.test(s)) return 'today';
  if (/^(2|۲|٢)$/.test(s) || /week|7\s*(days|day|din)|seven days|hafta|haftay|hafty|ہفت|سات دن|۷\s*دن|٧\s*دن/.test(s)) return 'week';
  if (/^(3|۳|٣)$/.test(s) || /month|30\s*(days|day|din)|thirty days|mahina|maheena|mahine|maheen|مہین|ماہ|تیس دن|۳۰\s*دن|٣٠\s*دن/.test(s)) return 'month';
  return null;
}
// Resolve natural questions to a date without altering the server API.
// Past dates are never sent to the API's current-day-only AI endpoint.
function parseChatDate(raw, selectedDate) {
  const original = String(raw || '').trim();
  const digitMap = {'۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9','٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
  const s = original.toLowerCase().replace(/[۰-۹٠-٩]/g, x => digitMap[x]);
  const today = dayISO();
  const isValid = date => /^20\d{2}-\d{2}-\d{2}$/.test(date) && date <= today &&
    dayISO(new Date(`${date}T12:00:00`)) === date;
  const makeDate = (year, month, day) => {
    const value = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return isValid(value) ? value : null;
  };
  // Named dates take priority over free-text shortcuts and chosen calendar date.
  const iso = /\b(20\d{2})-(\d{2})-(\d{2})\b/.exec(s);
  if (iso && isValid(iso[0])) return {period:'selected',date:iso[0]};
  const monthNames = {
    jan:1,january:1, feb:2,february:2,mar:3,march:3,apr:4,april:4,may:5,
    jun:6,june:6,jul:7,july:7,aug:8,august:8,sep:9,sept:9,september:9,
    oct:10,october:10,nov:11,november:11,dec:12,december:12,
    'جنوری':1,'فروری':2,'مارچ':3,'اپریل':4,'مئی':5,'جون':6,'جولائی':7,
    'اگست':8,'ستمبر':9,'اکتوبر':10,'نومبر':11,'دسمبر':12,
  };
  const mn = '(?:january|february|september|november|december|october|august|march|april|june|july|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|جنوری|فروری|مارچ|اپریل|مئی|جون|جولائی|اگست|ستمبر|اکتوبر|نومبر|دسمبر)';
  const dayFirst = new RegExp(`(?:^|\\s)(\\d{1,2})(?:st|nd|rd|th)?\\s+(${mn})(?:\\s*,?\\s*(20\\d{2}))?(?=$|[\\s?!.,])`,'i').exec(s);
  const monthFirst = !dayFirst && new RegExp(`(?:^|\\s)(${mn})\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:\\s*,?\\s*(20\\d{2}))?(?=$|[\\s?!.,])`,'i').exec(s);
  const matched = dayFirst || monthFirst;
  if (matched) {
    const month = monthNames[dayFirst ? matched[2].toLowerCase() : matched[1].toLowerCase()];
    const day = Number(dayFirst ? matched[1] : matched[2]);
    let year = Number(matched[3] || new Date().getFullYear());
    let parsed = makeDate(year, month, day);
    if (!matched[3] && !parsed) parsed = makeDate(year - 1, month, day);
    if (parsed) return {period:'selected',date:parsed};
  }
  // Natural phrases and periods after explicit dates.
  if (/\byesterday\b|\bkal\b|\bguzishta\s*kal\b|گزشتہ\s*کل|کل\s*کی|کل\s*کا/i.test(s))
    return {period:'selected',date:shiftDay(today,-1)};
  if (/selected\s*(day|date)|chosen\s*(day|date)|this\s*date|\bselected\b|منتخب\s*تاریخ|یہ\s*تاریخ|\bis\s*date\b|\bisi\s*din\b|\bjis\s*din\b/i.test(s))
    return {period:'selected',date:selectedDate};
  const defaultPeriod = parseChatPeriod(s);
  return defaultPeriod ? {period:defaultPeriod,date:defaultPeriod==='today'?today:null} : null;
}
function parseChatTopic(raw) {
  const s = String(raw || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (!s) return null;
  if (/^(1|۱|١)$/.test(s) || /everything|all details|all topics|sab kuch|sari|saari|sab|puri|poori|تمام|سب کچھ|ساری|سارے|مکمل|ہر چیز|سب کی|تمام تفصیلات|^all$/.test(s)) return 'all';
  if (/^(2|۲|٢)$/.test(s) || /prayer|namaz|namaaz|salah|salat|jamaat|qaza|نماز|جماعت|قضا/.test(s)) return 'prayer';
  if (/^(3|۳|٣)$/.test(s) || /quran|quraan|qur'an|para|parah|قرآن|قران|پارہ|سپارہ|تلاوت/.test(s)) return 'quran';
  if (/^(5|۵|٥)$/.test(s) || /university|uni\b|college|admission|application|interview|یونیورسٹی|داخلہ|کالج|انٹرویو/.test(s)) return 'university';
  if (/^(6|۶|٦)$/.test(s) || /personal|family|life|ghar|routine|myself|ذاتی|گھر|خاندانی/.test(s)) return 'personal';
  if (/^(4|۴|٤)$/.test(s) || /office|project|job|client|kaam|kam|work|دفتر|کام|پروجیکٹ/.test(s)) return 'office';
  return null;
}

// A task is a daily update only if it was actually added, edited,
// or given a progress note in the requested date range. A saved old
// status/next date alone must NEVER appear as a new update.
function hasTaskEventInPeriod(task, inPeriod) {
  return inPeriod(task?.createdAt) || inPeriod(task?.updatedAt) ||
    (task?.logs || []).some(note => inPeriod(note.createdAt));
}

// Clear bilingual family updates based on saved records only.
// Give the actual task, what changed, the university/program and next date.
// A current status without a note is never described as work done today.
// This uses only existing data and does not change the API or database.
function buildFamilyReport({ entries, prayerDays, quranEntries, period, topic, selectedDate }) {
  const days = period === 'selected' ? 1 : (CHAT_PERIODS.find(x => x.id === period)?.days || 7);
  const end = period === 'selected' ? selectedDate : dayISO();
  const start = shiftDay(end, -(days - 1));
  const inPeriod = value => {
    if (!value) return false;
    const date = String(value).length === 10 ? String(value) : dayISO(value);
    return date >= start && date <= end;
  };
  const brief = (value, max = 115) => {
    const text = String(value ?? '').replace(/\s+/g, ' ').trim();
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
  };
  const rows = [];
  const add = (en, ur) => rows.push({ en, ur });
  const bySection = key => (entries || []).filter(item => item.section === key);
  const urPrayer = { fajr:'فجر', dhuhr:'ظہر', asr:'عصر', maghrib:'مغرب', isha:'عشاء' };
  const prayerDaysInRange = Object.entries(prayerDays || {}).filter(([date]) => inPeriod(date));
  const checked = [];
  prayerDaysInRange.forEach(([date, record]) => PRAYERS.forEach(([key, label]) => {
    if (record?.group?.[key]) checked.push({ date, key, label, type:'Jamaat' });
    else if (record?.makeup?.[key]) checked.push({ date, key, label, type:'Qaza' });
  }));

  let prayerEn = 'Prayer: No entry saved for this period.';
  let prayerUr = 'نماز: اس مدت کی کوئی انٹری نہیں ہے۔';
  if (checked.length && days === 1) {
    const groups = checked.filter(p => p.type === 'Jamaat');
    const makeups = checked.filter(p => p.type === 'Qaza');
    const enParts = [];
    const urParts = [];
    if (groups.length) {
      enParts.push(`${groups.map(p => p.label).join(', ')} — done (Jamaat)`);
      urParts.push(`${groups.map(p => urPrayer[p.key]).join('، ')} — جماعت کے ساتھ ادا`);
    }
    if (makeups.length) {
      enParts.push(`${makeups.map(p => p.label).join(', ')} — done (Qaza)`);
      urParts.push(`${makeups.map(p => urPrayer[p.key]).join('، ')} — قضا ادا`);
    }
    prayerEn = `Prayer: ${enParts.join('; ')}.`;
    prayerUr = `نماز: ${urParts.join('؛ ')}۔`;
  } else if (checked.length) {
    const jamaat = checked.filter(p => p.type === 'Jamaat').length;
    const qaza = checked.length - jamaat;
    prayerEn = `Prayer: ${jamaat} Jamaat${qaza ? `, ${qaza} Qaza` : ''} recorded in ${days} days.`;
    prayerUr = `نماز: ${days} دن میں ${jamaat} جماعت${qaza ? `، ${qaza} قضا` : ''} درج ہیں۔`;
  }

  const readings = (quranEntries || []).filter(item => inPeriod(item.date));
  const pages = readings.reduce((sum, item) => sum + Math.max(0, Number(item.pagesRead) || 0), 0);
  const paras = [...new Set(readings.map(item => Number(item.para)).filter(Number.isFinite))].sort((a,b) => a - b);
  const paraListEn = paras.slice(0, 4).join(', ') + (paras.length > 4 ? '…' : '');
  const paraListUr = paras.slice(0, 4).join('، ') + (paras.length > 4 ? '…' : '');
  const quranEn = readings.length ? `Quran: Para ${paraListEn} — ${pages} pages read.` : 'Quran: No new reading saved.';
  const quranUr = readings.length ? `قرآن: پارہ ${paraListUr}، ${pages} صفحات پڑھے۔` : 'قرآن: نئی تلاوت درج نہیں ہوئی۔';

  const statusLabels = {
    planned: ['to do','کرنا باقی ہے'],
    in_progress: ['in progress','کام جاری ہے'],
    done: ['completed','مکمل ہو گیا'],
  };
  const allNotes = task => (task.logs || []).filter(note => inPeriod(note.createdAt))
    .sort((a,b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const newest = (a,b) => String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || ''));
  const taskLabel = task => {
    const parent = brief(task.meta?.project || '', 38);
    const title = brief(task.title || '', 68);
    return parent && parent.toLowerCase() !== title.toLowerCase() ? `${parent} — ${title}` : (title || parent);
  };

  // Real entries only. A previous task status is NOT today's progress.
  // A newly created/edited task counts as a recorded task event, but it is
  // labelled as such rather than incorrectly described as work completed.
  const explainWork = (section, labelEn, labelUr) => {
    const items = bySection(section);
    const updates = items.flatMap(task => allNotes(task).map(note => ({ task, note })))
      .sort((a,b) => String(b.note.createdAt).localeCompare(String(a.note.createdAt)));
    if (updates.length) {
      const recent = updates.slice(0, 2);
      const text = recent.map(({task,note}) => `${taskLabel(task)} — ${brief(note.note, 105)}`).join('; ');
      const more = Math.max(0, updates.length - recent.length);
      return {
        recorded:true,
        en:`${labelEn} progress: ${text}${more ? ` (+${more} earlier updates)` : ''}.`,
        ur:`${labelUr} کی پیش رفت: ${text}${more ? ` (مزید ${more} اپڈیٹس)` : ''}۔`,
      };
    }
    const recentlyChanged = items
      .filter(task => inPeriod(task.createdAt) || inPeriod(task.updatedAt))
      .sort(newest);
    if (recentlyChanged.length) {
      const task = recentlyChanged[0];
      const newlyAdded = inPeriod(task.createdAt);
      const state = statusLabels[task.status] || ['recorded', 'درج'];
      const itemName = taskLabel(task);
      return {
        recorded:true,
        en:`${labelEn}: ${newlyAdded ? 'Task created' : 'Task details changed'} — ${itemName} (current status: ${state[0]}).`,
        ur:`${labelUr}: ${newlyAdded ? 'نیا کام درج ہوا' : 'کام کی معلومات بدلی گئیں'} — ${itemName} (موجودہ حالت: ${state[1]})۔`,
      };
    }
    return {
      recorded:false,
      en:`${labelEn}: No new update in this period.`,
      ur:`${labelUr}: اس مدت میں کوئی نئی اپڈیٹ درج نہیں ہوئی۔`,
    };
  };
  const office = explainWork('office','Office','دفتر');
  const personal = explainWork('personal','Personal','ذاتی کام');

  const universities = bySection('university');
  // The current application is not a new daily entry unless the
  // application or one of its notes was changed in the chosen period.
  const recentUniversities = universities.filter(task => hasTaskEventInPeriod(task, inPeriod));
  const bestUniversity = [...recentUniversities].sort((a,b) => {
    const score = task => (allNotes(task).length ? 6 : 0) +
      (inPeriod(task.updatedAt) ? 3 : 0) + (inPeriod(task.createdAt) ? 2 : 0);
    return score(b) - score(a) || newest(a,b);
  })[0];
  let university = { recorded:false, en:'University: No new update in this period.', ur:'یونیورسٹی: اس مدت میں کوئی نئی اپڈیٹ درج نہیں ہوئی۔' };
  if (bestUniversity) {
    const m = bestUniversity.meta || {};
    const universityName = brief(m.university || bestUniversity.title, 60);
    const program = brief(m.program || '', 48);
    const countryMatch = /(?:^|[\n,;])\s*country\s*[:：-]\s*([^\n,;]+)/i.exec(String(bestUniversity.detail || ''));
    const country = brief(m.country || countryMatch?.[1] || '', 30);
    const place = `${universityName}${country ? `, ${country}` : ''}${program ? ` (${program})` : ''}`;
    const status = {
      planning:['planning to apply','درخواست دینے کی تیاری'],
      applied:['applied','درخواست جمع ہو گئی'],
      upcoming:['upcoming application','درخواست کی تاریخ آنے والی ہے'],
      interview:['interview stage','انٹرویو کا مرحلہ'],
      waiting:['waiting','انتظار'],
      offer:['offer received','آفر موصول ہوئی'],
      accepted:['accepted','داخلہ منظور ہوا'],
      rejected:['not selected','منتخب نہیں ہوئے'],
    }[m.applicationStatus] || ['status not set','حالت درج نہیں'];
    const upcoming = m.upcomingDate && m.upcomingDate >= end ? prettyDate(m.upcomingDate) : '';
    const recentNote = allNotes(bestUniversity)[0];
    const action = bestUniversity.title && bestUniversity.title.toLowerCase() !== universityName.toLowerCase() ? brief(bestUniversity.title, 55) : '';
    const enAction = action ? ` Next step: ${action}.` : '';
    const urAction = action ? ` اگلا کام: ${action}۔` : '';
    const enNote = recentNote ? ` Latest update: ${brief(recentNote.note, 125).replace(/[.!؟۔]+$/, '')}.` : '';
    const urNote = recentNote ? ` نئی اپڈیٹ: ${brief(recentNote.note, 125).replace(/[.!؟۔]+$/, '')}۔` : '';
    university = {
      recorded:true,
      en:`University: ${place}.${enNote || (inPeriod(bestUniversity.createdAt) ? ' Application record added.' : ' Application record updated.')} Current status: ${status[0]}.${enAction}${upcoming ? ` Next date: ${upcoming}.` : ''}`,
      ur:`یونیورسٹی: ${place}۔${urNote || (inPeriod(bestUniversity.createdAt) ? ' درخواست کا ریکارڈ شامل ہوا۔' : ' درخواست کی معلومات بدلی گئیں۔')} موجودہ حالت: ${status[1]}۔${urAction}${upcoming ? ` اگلی تاریخ: ${upcoming}۔` : ''}`,
    };
  }

  if (topic === 'prayer') { if (checked.length) add(prayerEn, prayerUr); else rows.push({en:prayerEn,ur:prayerUr,noUpdates:true}); }
  else if (topic === 'quran') { if (readings.length) add(quranEn, quranUr); else rows.push({en:quranEn,ur:quranUr,noUpdates:true}); }
  else if (topic === 'office') rows.push({...office,noUpdates:!office.recorded});
  else if (topic === 'university') rows.push({...university,noUpdates:!university.recorded});
  else if (topic === 'personal') rows.push({...personal,noUpdates:!personal.recorded});
  else {
    if (checked.length || readings.length) add(
      [checked.length ? prayerEn : '', readings.length ? quranEn : ''].filter(Boolean).join(' '),
      [checked.length ? prayerUr : '', readings.length ? quranUr : ''].filter(Boolean).join(' ')
    );
    if (office.recorded) add(office.en, office.ur);
    if (university.recorded) add(university.en, university.ur);
    if (personal.recorded) add(personal.en, personal.ur);
    if (!rows.length) rows.push({
      en: days === 1 ? (end === dayISO() ? 'No updates yet today.' : `No updates recorded on ${prettyDate(end)}.`) : 'No updates recorded for this period.',
      ur: days === 1 ? (end === dayISO() ? 'آج ابھی کوئی نئی اپڈیٹ نہیں ہے۔' : `${prettyDate(end)} کو کوئی اپڈیٹ درج نہیں ہوئی۔`) : 'اس مدت میں کوئی اپڈیٹ درج نہیں ہوئی۔',
      noUpdates: true,
    });
  }
  return rows;
}

function SummaryChat({ entries, prayerDays, quranEntries, selectedDate, onClose, onSessionError }) {
  const [messages, setMessages] = useState([BOT_INTRO]);
  const [step, setStep] = useState('period');
  const [period, setPeriod] = useState(null);
  const [reportDate, setReportDate] = useState(selectedDate);
  const [topic, setTopic] = useState(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [aiError, setAiError] = useState('');
  const [aiRequested, setAiRequested] = useState(false);
  const [reportEmpty, setReportEmpty] = useState(false);
  const [speaking, setSpeaking] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const spokenTextRef = useRef(null);
  const scrollRef = useRef(null);
  const reportRef = useRef(null);

  useEffect(() => () => {
    // Never continue reading private updates after the chatbot closes.
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);
  function stopReading() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking('');
  }
  function readAloud(language) {
    setVoiceError('');
    if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance === 'undefined') {
      setVoiceError('Read aloud is not supported on this browser. / اس براؤزر میں آواز کی سہولت دستیاب نہیں۔');
      return;
    }
    if (speaking === language) { stopReading(); return; }
    stopReading();
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => language === 'ur' ? /^ur(?:-|$)/i.test(v.lang) : /^en(?:-|$)/i.test(v.lang));
    if (language === 'ur' && !voice) {
      setVoiceError('An Urdu voice is not available on this device. Please install an Urdu speech voice in your phone settings. / اس فون میں اردو آواز موجود نہیں ہے۔');
      return;
    }
    const report = spokenTextRef.current;
    if (!report) return;
    const content = [language === 'ur' ? report.ur : report.en, ...report.lines.map(line => language === 'ur' ? line.ur : line.en)].join('. ');
    const utter = new window.SpeechSynthesisUtterance(content);
    utter.lang = language === 'ur' ? 'ur-PK' : 'en-US';
    if (voice) utter.voice = voice;
    utter.rate = language === 'ur' ? 0.86 : 0.92;
    utter.onend = () => setSpeaking('');
    utter.onerror = () => { setSpeaking(''); setVoiceError('Unable to play audio on this device. / اس فون پر آواز نہیں چل سکی۔'); };
    setSpeaking(language);
    window.speechSynthesis.speak(utter);
  }
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    if (step === 'done' && reportRef.current) {
      // A long report must open at its beginning, not at its last line.
      const top = reportRef.current.offsetTop - container.offsetTop - 15;
      container.scrollTop = Math.max(0, top);
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, step]);

  function beginAgain() {
    stopReading(); setReportDate(selectedDate); setStep('period'); setPeriod(null); setTopic(null); setText(''); setBusy(false);
    setAiInsight(''); setAiError(''); setVoiceError(''); setAiRequested(false); setReportEmpty(false); spokenTextRef.current=null; setMessages([BOT_INTRO]);
  }
  async function showReport(selectedPeriod, selectedTopic, seedMessages, exactDate = reportDate) {
    stopReading();
    setTopic(selectedTopic);
    setPeriod(selectedPeriod);
    setReportDate(exactDate);
    setStep('done');
    setAiInsight(''); setAiError(''); setVoiceError(''); setAiRequested(false);
    const p = selectedPeriod === 'selected'
      ? { en: prettyDate(exactDate), ur: `منتخب تاریخ ${prettyDate(exactDate)}` }
      : CHAT_PERIODS.find(x => x.id === selectedPeriod);
    const s = CHAT_TOPICS.find(x => x.id === selectedTopic);
    const lines = buildFamilyReport({ entries, prayerDays, quranEntries, period: selectedPeriod, topic: selectedTopic, selectedDate: exactDate });
    setReportEmpty(lines.some(line => line.noUpdates));
    const report = {role:'bot',en:`${p.en} · ${s.en} — saved updates.`,ur:`${p.ur} · ${s.ur} — محفوظ شدہ اپڈیٹس:`,lines};
    spokenTextRef.current = report;
    setMessages([...seedMessages, report]);
  }
  // Optional short Groq insight is fetched only if the family asks to see it.
  // The main English/Urdu summary above always uses the existing saved records.
  async function requestAiInsight() {
    if (busy || aiRequested || reportEmpty || step !== 'done') return;
    setAiRequested(true);
    if (period === 'selected' && reportDate !== dayISO()) {
      setAiError('The extra AI endpoint only supports the current day. The dated summary above uses saved records. / پرانی تاریخ کی سمری محفوظ ریکارڈ سے تیار ہوئی ہے۔');
      return;
    }
    if (period === 'month') {
      setAiError('30-day summary uses saved records. / ۳۰ دن کی سمری محفوظ ریکارڈ سے بنتی ہے۔');
      return;
    }
    setBusy(true);
    try {
      const data = await api({ action:'summary', period: period === 'selected' ? 'today' : period, section: topic, language:'en' });
      // Keep two brief actionable lines, stripping headings and markdown noise.
      const summary = String(data.summary || '').replace(/\*\*/g, '').replace(/^#{1,4}\s*/gm, '');
      const parts = summary.split(/\n+/).map(s=>s.trim()).filter(s=>s && !/^(overall progress|completed work|currently in progress|pending tasks|recommended next focus|highlights|prayer and quran|next focus|1\.|2\.|3\.|4\.|5\.)\s*:?$/i.test(s));
      setAiInsight(parts.slice(0, 2).join(' · ').slice(0, 250) || 'No extra note available.');
    } catch(err) {
      if (err.status === 401) onSessionError(err);
      setAiError('Extra AI note unavailable. / اضافی AI نوٹ دستیاب نہیں۔');
    } finally { setBusy(false); }
  }

  function submit(raw) {
    const value = String(raw || '').trim().slice(0, 250);
    if (!value || busy) return;
    setText('');
    const next = [...messages, {role:'user', text:value}];
    const isSingleOption = /^[1-6۱-۶١-٦]$/.test(value);
    const dateInfo = parseChatDate(value, selectedDate);
    const topicInfo = parseChatTopic(value);

    // At the initial period step, a *natural question* with a category
    // goes directly to the matching dated report. It never asks for a
    // numerical menu first (e.g. "office on 3 Nov").
    if (step === 'period') {
      if (topicInfo && !isSingleOption) {
        const chosen = dateInfo || {period:'selected',date:selectedDate};
        showReport(chosen.period, topicInfo, next, chosen.date || selectedDate);
        return;
      }
      if (!dateInfo) {
        setMessages([...next, {
          role:'bot',
          en:'Ask about his day, or choose Today / 7 days / 30 days. For example: “Office on 3 Nov”.',
          ur:'آپ کوئی سوال لکھ سکتے ہیں، یا آج، ۷ دن، یا ۳۰ دن منتخب کریں۔ مثال: ۳ نومبر کا دفتری کام۔',
        }]);
        return;
      }
      setPeriod(dateInfo.period);
      setReportDate(dateInfo.date || selectedDate);
      if (/what|which|show|tell|kya|kia|batao|bataye|how|summary|report|updates|ہوا|کیا|بتاؤ|بتائیں|اپڈیٹ/i.test(value) && !isSingleOption) {
        showReport(dateInfo.period, 'all', next, dateInfo.date || selectedDate);
        return;
      }
      setStep('topic');
      setMessages([...next, {role:'bot',en:'What would you like to know about?',ur:'آپ کس چیز کی سمری چاہتے ہیں؟'}]);
      return;
    }

    // A normal chat can continue after a summary. New questions never
    // require closing/restarting the assistant or reselecting the menus.
    if (step === 'done') {
      if (!topicInfo && !dateInfo) {
        setMessages([...next, {role:'bot',en:'What would you like to know? Try “Office on 3 Nov” or “Prayer today”.',ur:'آپ کیا جاننا چاہتے ہیں؟ مثال: ۳ نومبر کا دفتری کام یا آج کی نماز۔'}]);
        return;
      }
      const chosen = dateInfo || {period:period || 'selected',date:reportDate || selectedDate};
      showReport(chosen.period, topicInfo || 'all', next, chosen.date || reportDate || selectedDate);
      return;
    }

    if (step === 'topic') {
      const chosen = dateInfo || {period, date:reportDate};
      if (!topicInfo) {
        // A new question containing a date but no topic asks for all updates.
        if (dateInfo && !isSingleOption && /what|show|tell|kya|kia|ہوا|کیا/i.test(value)) {
          showReport(chosen.period, 'all', next, chosen.date || selectedDate);
          return;
        }
        setMessages([...next, {role:'bot',en:'Choose an option or ask directly, e.g. “Office on 3 Nov”.',ur:'نیچے آپشن منتخب کریں یا سیدھا سوال لکھیں، مثلاً ۳ نومبر کا دفتری کام۔'}]);
        return;
      }
      showReport(chosen.period, topicInfo, next, chosen.date || selectedDate);
    }
  }
  const options = step === 'period' ? (selectedDate === dayISO() ? CHAT_PERIODS : [{id:'selected', en:`Selected: ${prettyDate(selectedDate)}`, ur:'منتخب تاریخ', days:1}, ...CHAT_PERIODS]) : step === 'topic' ? CHAT_TOPICS : [];
  return (
    <div className="tm-modal-backdrop tmv-chat-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={`tmv-chat ${step === 'done' ? 'tmv-chat-has-report' : 'tmv-chat-compact'}`} role="dialog" aria-modal="true" aria-label="Bilingual family summary assistant">
        <header className="tmv-chat-head">
          <div className="tmv-chat-avatar"><MessageSquareText size={20} strokeWidth={1.8}/></div>
          <div className="tmv-chat-heading"><strong>Daily summary assistant</strong><span>English <span aria-hidden="true">·</span> <span lang="ur" dir="rtl">اردو</span></span></div>
          <button type="button" className="tmv-chat-close" onClick={onClose} aria-label="Close chat"><X size={20}/></button>
        </header>
        <div className="tmv-chat-scroll" ref={scrollRef} aria-live="polite" aria-relevant="additions text">
          <div className="tmv-chat-date-label">FAMILY UPDATE ASSISTANT</div>
          {messages.map((m, idx) => <div key={idx} ref={m.lines ? reportRef : undefined} className={`tmv-chat-message tmv-chat-${m.role}`}>
            {m.role === 'user' ? <div className="tmv-chat-bubble"><p>{m.text}</p></div> : <div className="tmv-chat-bubble">
              <p lang="en">{m.en}</p><p className="tmv-chat-urdu" lang="ur" dir="rtl">{m.ur}</p>
              {m.lines && <div className="tmv-chat-report">{m.lines.map((line, i) => <div className="tmv-chat-report-line" key={i}>
                <p lang="en">{line.en}</p><p className="tmv-chat-urdu" lang="ur" dir="rtl">{line.ur}</p>
              </div>)}</div>}
            </div>}
          </div>)}
          {step !== 'done' && <div className="tmv-chat-quick" aria-label="Suggested replies">
            {options.map(option => <button type="button" key={option.id} onClick={() => submit(step === 'topic' ? option.number : option.id === 'selected' ? 'selected date' : option.id === 'today' ? '1' : option.id === 'week' ? '2' : '3')}>
              {step === 'topic' && <span className="tmv-chat-choice-num">{option.number}.</span>}
              <span>{option.en}</span><span className="tmv-chat-choice-urdu" lang="ur" dir="rtl">{option.ur}</span>
            </button>)}
          </div>}
          {step === 'done' && <div className="tmv-chat-speech" aria-label="Read the summary aloud">
            <button type="button" onClick={() => readAloud('en')} aria-pressed={speaking === 'en'}>
              {speaking === 'en' ? <VolumeX size={16}/> : <Volume2 size={16}/>} {speaking === 'en' ? 'Stop' : 'Listen in English'}
            </button>
            <button type="button" onClick={() => readAloud('ur')} aria-pressed={speaking === 'ur'}>
              {speaking === 'ur' ? <VolumeX size={16}/> : <Volume2 size={16}/>} <span lang="ur" dir="rtl">{speaking === 'ur' ? 'روکیں' : 'اردو میں سنیں'}</span>
            </button>
            {voiceError && <p role="status" className="tmv-speech-error">{voiceError}</p>}
          </div>}
          {step === 'done' && !reportEmpty && <div className="tmv-chat-optional">
            <button type="button" disabled={busy || aiRequested} onClick={requestAiInsight}>
              {busy ? 'Preparing short note…' : aiRequested ? 'Extra AI note' : 'Optional short AI note'}
              <span lang="ur" dir="rtl">{busy ? 'مختصر نوٹ تیار ہو رہا ہے…' : 'اختیاری مختصر AI نوٹ'}</span>
            </button>
            {aiInsight && <p className="tmv-ai-insight">{aiInsight}</p>}
            {aiError && <p className="tmv-ai-error">{aiError}</p>}
            {aiInsight && <small>AI note is in English. / AI نوٹ انگریزی میں ہے۔</small>}
          </div>}
          {step === 'done' && <button type="button" className="tmv-chat-again" onClick={beginAgain}>Start another summary <span lang="ur" dir="rtl">دوبارہ سمری لیں</span><ArrowRight size={17}/></button>}
        </div>
        <div className="tmv-chat-controls">
          <form className="tmv-chat-inputbar" onSubmit={event => { event.preventDefault(); submit(text); }}>
            <input aria-label="Type in English, Urdu or Roman Urdu" value={text} onChange={event => setText(event.target.value)} placeholder={step === 'done' ? 'Ask another question / مزید سوال لکھیں' : 'Type a message / اپنا پیغام لکھیں'} maxLength={250} disabled={busy}/>
            <button type="submit" disabled={!text.trim() || busy} aria-label="Send message"><Send size={18}/></button>
          </form>
          <details className="tmv-chat-privacy"><summary>Privacy note / رازداری</summary><p>Answers use saved records. For AI insights, relevant records are sent to Groq.</p><p lang="ur" dir="rtl">جوابات محفوظ شدہ ریکارڈ سے تیار ہوتے ہیں۔ AI کے لیے متعلقہ معلومات Groq کو بھیجی جاتی ہیں۔</p></details>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   FAMILY READING VIEW — every screen starts with information,
   not buttons. Editing is available only after owner PIN in UI.
   The backend is not modified in this version.
============================================================ */

function DayNavigator({ value, setValue }) {
  // Only the calendar presentation changes. FamilyToday still uses viewDate to
  // read Prayer, Quran, Office, University and Personal records for that date.
  const [clock, setClock] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const today = dayISO(clock);
  const isToday = value === today;
  const selectedDate = new Date(`${value}T12:00:00`);
  const fullDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
  const shortDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
  const clockText = clock.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
  const isDaytime = clock.getHours() >= 6 && clock.getHours() < 18;

  // Keep today visible alongside a recently selected day. For older dates,
  // slide the strip back so the selected day remains visible on a phone.
  // Data itself always comes from `value`, never from the displayed week end.
  const dayDistance = Math.round((new Date(`${today}T12:00:00`) - selectedDate) / 86400000);
  const endOfStrip = dayDistance >= 0 && dayDistance <= 4 ? today : value;
  const visibleDays = Array.from({ length: 7 }, (_, i) => shiftDay(endOfStrip, i - 6));
  const nextDate = shiftDay(value, 1);

  return <section className="tmv-date-selector" aria-label="Browse daily updates by date">
    <div className="tmv-date-top">
      <div className="tmv-date-title">
        <span className="tmv-date-eyebrow">DAILY JOURNAL <span aria-hidden="true">/</span> {isToday ? 'TODAY' : 'SELECTED DATE'}</span>
        <strong className="tmv-date-full" aria-live="polite">{fullDate}</strong>
        <strong className="tmv-date-short" aria-hidden="true">{shortDate}</strong>
        <span className={`tmv-date-clock ${isDaytime ? 'tmv-date-clock--sun' : 'tmv-date-clock--moon'}`} aria-label={`${isDaytime ? 'Daytime' : 'Nighttime'} local time: ${clockText}`}>
          {isDaytime ? <Sun size={14} strokeWidth={1.9} aria-hidden="true" /> : <Moon size={14} strokeWidth={1.9} aria-hidden="true" />}
          <span>{clockText}</span><small>local time</small>
        </span>
      </div>
      <div className="tmv-date-actions">
        {!isToday && <button type="button" className="tmv-date-today" onClick={() => setValue(today)} aria-label="Jump to today">Today</button>}
        <label className="tmv-date-calendar" title="Choose a date from the calendar">
          <CalendarDays size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>Calendar</span>
          <input type="date" aria-label="Choose a date" value={value} max={today} onChange={event => {
            const date = event.target.value;
            if (date && date <= today) setValue(date);
          }} />
        </label>
      </div>
    </div>
    <div className="tmv-date-strip">
      <button type="button" className="tmv-date-step" onClick={() => setValue(shiftDay(value, -1))} aria-label="Previous day"><ChevronLeft size={19} aria-hidden="true" /></button>
      <div className="tmv-date-days" role="group" aria-label="Choose a day to see its updates">
        {visibleDays.map((date, index) => {
          const day = new Date(`${date}T12:00:00`);
          const selected = date === value;
          const todayInStrip = date === today;
          return <button
            key={date}
            type="button"
            className={`tmv-date-day${selected ? ' tmv-date-day--active' : ''}${todayInStrip ? ' tmv-date-day--today' : ''}${index < 2 ? ' tmv-date-day--outer' : ''}`}
            onClick={() => setValue(date)}
            aria-pressed={selected}
            aria-current={todayInStrip ? 'date' : undefined}
            aria-label={`${day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}${todayInStrip ? ', today' : ''}${selected ? ', selected' : ''}`}
          >
            <span>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
            <strong>{day.getDate()}</strong>
            <small className="tmv-date-day-indicator" aria-hidden="true">{todayInStrip ? 'TODAY' : ' '}</small>
          </button>;
        })}
      </div>
      <button type="button" className="tmv-date-step" onClick={() => setValue(nextDate)} disabled={isToday} aria-label="Next day"><ChevronRight size={19} aria-hidden="true" /></button>
    </div>
    {!isToday && <p className="tmv-date-selected-hint" role="status">Showing saved updates for {shortDate} — not today's entries.</p>}
  </section>;
}

function PrayerReadout({ date, days }) {
  const record = days[date] || {};
  const done = PRAYERS.filter(([key]) => record.group?.[key] || record.makeup?.[key]).length;
  return <div className="tmv-prayer-readout">
    <div className="tmv-prayer-head"><strong>{done} of 5 recorded</strong><span>{done === 0 ? 'No prayer entries yet' : 'Jamaat / Make-up'}</span></div>
    <div className="tmv-prayer-five">{PRAYERS.map(([key, label]) => {
      const kind = record.group?.[key] ? 'Jamaat' : record.makeup?.[key] ? 'Qaza' : null;
      return <div className="tmv-prayer-one" key={key}><span className={kind ? 'tmv-prayer-mark tmv-yes' : 'tmv-prayer-mark'}>{kind ? <Check size={20}/> : <span>—</span>}</span><strong>{label}</strong><small>{kind || 'No entry'}</small></div>;
    })}</div>
  </div>;
}

function DailyEntries({ entries, date, section, onOpen }) {
  const items = entries.filter(item => item.section === section);
  const name = section === 'office' ? 'Office Work' : section === 'university' ? 'University' : 'Personal Life';
  const notes = items.flatMap(item => (item.logs || []).map(log => ({ item, log })))
    .filter(({ log }) => log?.createdAt && dayISO(log.createdAt) <= date)
    .sort((a, b) => String(b.log.createdAt).localeCompare(String(a.log.createdAt)));

  const todaysNotes = notes.filter(({log}) => dayISO(log.createdAt) === date);
  const lastPreviousNote = todaysNotes.length ? null : notes.find(({log}) => dayISO(log.createdAt) < date);
  // If no note was ever recorded, show only the most recently saved task
  // known at the selected date. Do not describe a task as work done today.
  const lastSavedTask = todaysNotes.length || lastPreviousNote ? null : [...items]
    .filter(item => {
      const firstSaved = item.createdAt || item.updatedAt;
      return firstSaved && dayISO(firstSaved) <= date;
    })
    .sort((a, b) => String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || '')))[0];

  const friendlyStatus = status => ({ planned:'To do', in_progress:'In progress', done:'Completed' }[status] || 'Recorded');
  const intro = date === dayISO() ? 'No recent work today yet' : 'No update recorded for this date';
  const renderRecord = (item, latestNote = null) => <div className="tmv-current-record" key={latestNote?.id || item.id}>
    <strong>{item.meta?.project || item.meta?.university || item.title}</strong>
    {(item.meta?.project || item.meta?.university) && <p>{item.title}{item.meta?.program ? ` · ${item.meta.program}` : ''}</p>}
    {latestNote ? <p>{latestNote.note}</p> : item.detail && <p>{item.detail}</p>}
    {!latestNote && <small>{section === 'university'
      ? (APP_STATUS[item.meta?.applicationStatus] || friendlyStatus(item.status))
      : friendlyStatus(item.status)}</small>}
  </div>;

  return <section className={`tmv-story-card tmv-story-${section}`} aria-label={name}>
    <FamilyCardVideo key={`${section}-${date}`} category={section} date={date} />
    <div className="tmv-card-heading"><span className="tmv-card-icon"><CategoryArtwork type={section}/></span><h2>{name}</h2></div>
    {todaysNotes.length ? <div className="tmv-update-list">
      {todaysNotes.slice(0,3).map(({item,log}) => <div className="tmv-daily-note" key={`${item.id}-${log.id}`}>
        <strong>{item.meta?.project || item.meta?.university || item.title}</strong>
        {(item.meta?.project || item.meta?.university) && <small>{item.title}{item.meta?.program ? ` · ${item.meta.program}` : ''}</small>}
        <p>{log.note}</p>
      </div>)}
      {todaysNotes.length > 3 && <p className="tmv-more-count">+{todaysNotes.length - 3} more updates</p>}
    </div> : <div className="tmv-current-records">
      <p className="tmv-current-caption">{intro}</p>
      {lastPreviousNote ? <>
        <p className="tmv-last-update-date">Last update · {prettyDate(lastPreviousNote.log.createdAt)}</p>
        {renderRecord(lastPreviousNote.item, lastPreviousNote.log)}
      </> : lastSavedTask ? <>
        <p className="tmv-last-update-date">Last saved task · {prettyDate(lastSavedTask.updatedAt || lastSavedTask.createdAt)}</p>
        {renderRecord(lastSavedTask)}
      </> : <p className="tmv-empty-note">No earlier updates recorded yet.</p>}
    </div>}
    <button type="button" className="tmv-read-more" onClick={() => onOpen(section)}>See all {section === 'university' ? 'applications' : section === 'office' ? 'projects' : 'activities'} <ArrowRight size={17}/></button>
  </section>;
}
function xDate(x) { return x.meta?.upcomingDate || x.dueDate || ''; }

/* Track Me V32: Compact family home. Existing detail panels and backend are unchanged. */
function V32DateNavigator({ value, setValue }) {
  const today = dayISO();
  // Clock is always the viewer's *current local time*, not the selected historical date.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const hour = now.getHours();
  const isDay = hour >= 6 && hour < 18;
  const PartIcon = isDay ? Sun : Moon;
  const timeText = now.toLocaleTimeString(undefined, {hour:'numeric', minute:'2-digit'});
  const selectedDate = new Date(`${value}T12:00:00`);
  const readable = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  return <div className={`tmv-v32-datebar tmv-v33-datebar tmv-v35-datebar ${isDay ? 'tmv-v35-day' : 'tmv-v35-night'}`} aria-label="Daily updates date selection">
    {/* V36: quiet, static sun/moon accent only; no cartoon traffic or motion. */}
    <div className="tmv-v36-ambient" aria-hidden="true">
      <PartIcon className="tmv-v36-ambient-icon" size={40} strokeWidth={1.15}/>
    </div>
    <button type="button" className="tmv-v32-datearrow" onClick={() => setValue(shiftDay(value, -1))} aria-label="Previous day"><ChevronLeft size={20}/></button>
    <label className="tmv-v32-datecenter">
      <span className="tmv-v36-full-eyebrow">{value === today ? 'TODAY' : 'SELECTED DATE · TAP TO CHANGE'}</span>
      <span className="tmv-v36-mobile-eyebrow">{value === today ? 'TODAY' : 'SELECTED DAY'}</span>
      <strong className="tmv-v36-full-date">{readable}</strong>
      <strong className="tmv-v36-mobile-date">
        <span className="tmv-v36-date-number">{selectedDate.getDate()}</span>
        <span className="tmv-v36-month-year">{selectedDate.toLocaleDateString('en-US', {month:'short', year:'numeric'})}</span>
        <span className="tmv-v36-weekday">{selectedDate.toLocaleDateString('en-US', {weekday:'long'})}</span>
      </strong>
      <small className="tmv-v33-date-meta" aria-label={`Current local time ${timeText}, ${isDay ? 'day' : 'night'}`}>
        <Clock3 size={12} strokeWidth={1.8} aria-hidden="true" />
        <span>{timeText}</span>
        <span className="tmv-v33-date-separator" aria-hidden="true">·</span>
        <PartIcon size={13} strokeWidth={1.8} aria-hidden="true" />
        <span>{isDay ? 'Day' : 'Night'}</span>
      </small>
      <input type="date" value={value} max={today} onChange={e => {
        if (e.target.value && e.target.value <= today) setValue(e.target.value);
      }} aria-label="Choose a day to see its saved updates" />
    </label>
    <button type="button" className="tmv-v32-datearrow" onClick={() => setValue(shiftDay(value, 1))} disabled={value >= today} aria-label="Next day"><ChevronRight size={20}/></button>
  </div>;
}

function V32LifeItem({ type, date, title, summary, status, extra, expanded, onToggle, onOpen, children }) {
  const label = {quran:'See reading history',office:'See all projects',university:'See all applications',personal:'See all activities'}[type];
  const displayStatus = String(status || 'No update');
  return <div className={`tmv-v32-item tmv-v32-item-${type}`}>
    <button type="button" className="tmv-v32-row" onClick={onToggle} aria-expanded={expanded} aria-controls={`tmv-v32-detail-${type}`}>
      <span className="tmv-v32-icon"><CategoryArtwork type={type}/></span>
      <span className="tmv-v32-rowcopy">
        <strong>{title}</strong>
        <span className="tmv-v32-summarytext">{summary}</span>
        {extra && <small className="tmv-v32-extra">{extra}</small>}
      </span>
      <span className={`tmv-v32-state${displayStatus === 'No update' ? ' tmv-v32-state-muted' : ''}`}>{displayStatus}</span>
      <ChevronRight className={`tmv-v32-chevron${expanded ? ' tmv-v32-chevron-open' : ''}`} size={19} aria-hidden="true" />
    </button>
    {expanded && <div id={`tmv-v32-detail-${type}`} className="tmv-v32-expanded">
      <FamilyCardVideo key={`${type}-${date}`} category={type} date={date}/>
      <div className="tmv-v32-expanded-content">
        {children}
        <button type="button" className="tmv-v32-full-link" onClick={() => onOpen(type)}>{label}<ArrowRight size={16}/></button>
      </div>
    </div>}
  </div>;
}

function V32WorkItem({ section, entries, date, expanded, onToggle, onOpen }) {
  const title = section === 'office' ? 'Office Work' : section === 'university' ? 'University' : 'Personal Life';
  const items = entries.filter(item => item.section === section &&
    (!item.createdAt && !item.updatedAt || dayISO(item.createdAt || item.updatedAt) <= date));
  const notes = items.flatMap(item => (item.logs || [])
    .filter(log => log?.createdAt && dayISO(log.createdAt) <= date)
    .map(log => ({item, log})))
    .sort((a,b) => String(b.log.createdAt).localeCompare(String(a.log.createdAt)));
  const todayNotes = notes.filter(x => dayISO(x.log.createdAt) === date);
  const lastNote = notes[0] || null;
  const sortedItems = [...items].sort((a,b) =>
    String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || '')));
  // University should show its saved application stage even if there is no fresh note.
  const item = todayNotes[0]?.item || lastNote?.item || sortedItems[0] || null;
  const meta = item?.meta || {};
  const statusName = !item ? 'No update' : section === 'university'
    ? (APP_STATUS[meta.applicationStatus] || STATUS[item.status] || 'Saved')
    : (STATUS[item.status] || 'Saved');
  const mainName = item ? (section === 'university' ? (meta.university || item.title)
    : section === 'office' ? (meta.project || item.title) : item.title) : '';
  const todayLabel = date === dayISO() ? 'today' : 'on this date';
  const savedAt = lastNote?.log.createdAt ||
    (item?.updatedAt && dayISO(item.updatedAt) <= date ? item.updatedAt : item?.createdAt) || '';
  const sourceDate = savedAt ? prettyDate(savedAt) : '';
  let summary;
  if (!item) summary = section === 'university' ? 'No applications recorded yet' : `No ${section === 'office' ? 'work' : 'personal'} updates recorded`;
  else if (todayNotes.length) summary = section === 'university'
    ? [meta.university || item.title, meta.program].filter(Boolean).join(' · ')
    : [mainName, section === 'office' && meta.project ? item.title : ''].filter(Boolean).join(' · ');
  else summary = `No new daily note ${todayLabel} · Last: ${mainName}`;
  const extra = section === 'university' && item
    ? [meta.program && !todayNotes.length ? meta.program : '', meta.upcomingDate ? `Important date: ${prettyDate(meta.upcomingDate)}` : ''].filter(Boolean).join(' · ')
    : (!todayNotes.length && sourceDate ? `Last saved: ${sourceDate}` : '');
  // On historical dates, statuses are today's saved statuses; the old stage cannot be reconstructed.
  const detail = item ? <>
      {!todayNotes.length && <p className="tmv-v32-muted">No new {title.toLowerCase()} update was recorded {todayLabel}.</p>}
      <strong>{mainName}</strong>
      {section === 'university' && meta.program && <p>{meta.program}</p>}
      {section === 'university' && <p>Application status: <b>{statusName}</b>{date !== dayISO() ? ' (current saved status)' : ''}</p>}
      {section === 'university' && meta.upcomingDate && <p>Important date: {prettyDate(meta.upcomingDate)}</p>}
      {section !== 'university' && <p>Current status: <b>{statusName}</b></p>}
      {todayNotes.length ? todayNotes.slice(0,3).map(({item:noteItem, log}) => <p key={log.id || log.createdAt}>
        {todayNotes.length > 1 ? <b>{noteItem.meta?.project || noteItem.meta?.university || noteItem.title}: </b> : null}{log.note}
      </p>) : lastNote ? <p><b>Last recorded note · {prettyDate(lastNote.log.createdAt)}:</b> {lastNote.log.note}</p>
        : item.detail ? <p>{item.detail}</p> : null}
      {todayNotes.length > 3 && <p>+{todayNotes.length - 3} more saved updates in the full section.</p>}
    </> : <p className="tmv-v32-muted">There are no saved records for this section yet.</p>;
  return <V32LifeItem type={section} date={date} title={title}
    summary={summary} extra={extra} status={statusName}
    expanded={expanded} onToggle={onToggle} onOpen={onOpen}>{detail}</V32LifeItem>;
}


/* V39 — Read-only, lightweight progress from REAL saved entries; no extra API/data. */
function buildMonthlyProgress({ entries, days, quran, selectedDate }) {
  const [yearText, monthText] = String(selectedDate || dayISO()).slice(0, 7).split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const numDays = new Date(year, month, 0).getDate();
  const today = dayISO();
  const prefix = `${yearText}-${monthText}`;
  const validEventDate = raw => {
    if (!raw) return '';
    const value = String(raw);
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : dayISO(date);
  };
  const calendar = Array.from({ length: numDays }, (_, i) => {
    const d = i + 1;
    const date = `${prefix}-${String(d).padStart(2, '0')}`;
    return {
      date, day: d, future: date > today, jamaat: 0, qaza: 0,
      quranPages: 0, quranEntries: 0, officeEvents: 0,
      universityEvents: 0, universityDates: 0, personalEvents: 0,
      score: null, notes: [],
    };
  });
  const byDate = new Map(calendar.map(item => [item.date, item]));
  for (const [date, record] of Object.entries(days || {})) {
    const day = byDate.get(date);
    if (!day || day.future || !record) continue;
    for (const [key] of PRAYERS) {
      if (record.group?.[key]) day.jamaat += 1;
      else if (record.makeup?.[key]) day.qaza += 1;
    }
  }
  for (const reading of quran || []) {
    const day = byDate.get(validEventDate(reading.date));
    if (!day || day.future) continue;
    day.quranEntries++;
    day.quranPages += Math.max(0, Number(reading.pagesRead) || 0);
  }
  for (const task of entries || []) {
    const section = task?.section;
    if (!['office','university','personal'].includes(section)) continue;
    // Count a task at most once per date. Status is NOT retroactively inferred.
    const eventDates = new Set([
      validEventDate(task.createdAt), validEventDate(task.updatedAt),
      ...(task.logs || []).map(log => validEventDate(log.createdAt)),
    ].filter(Boolean));
    for (const eventDate of eventDates) {
      const day = byDate.get(eventDate);
      if (!day || day.future) continue;
      if (section === 'office') day.officeEvents++;
      if (section === 'university') day.universityEvents++;
      if (section === 'personal') day.personalEvents++;
    }
    if (section === 'university') {
      const scheduled = validEventDate(task.meta?.upcomingDate || task.dueDate);
      const day = byDate.get(scheduled);
      if (day) day.universityDates++;
    }
  }
  for (const d of calendar) {
    // "No entry" is unknown, NOT "missed prayer" or "failed university application".
    const hasEntries = d.jamaat + d.qaza + d.quranEntries + d.officeEvents + d.universityEvents + d.personalEvents > 0;
    if (d.future || !hasEntries) continue;
    // Transparent logged-activity indicator, not a grade of Ahsan as a person.
    // Prayer 40, Quran 25, Office 20, University up to 15, Personal bonus up to 3.
    const prayer = Math.min(40, d.jamaat * 8 + d.qaza * 4);
    const reading = d.quranEntries ? 10 + Math.min(15, d.quranPages * 2.5) : 0;
    const office = d.officeEvents ? Math.min(20, 8 + d.officeEvents * 6) : 0;
    const university = d.universityEvents ? 15 : 0;
    const personal = d.personalEvents ? 3 : 0;
    // No university action is expected on ordinary days. Its weight is
    // included only on days with a dated university update.
    const possible = d.universityEvents ? 100 : 85;
    d.score = Math.min(100, Math.round(100 * (prayer + reading + office + university + personal) / possible));
  }
  // Exclude today (an unfinished day) from weakest-day comparisons.
  const finished = calendar.filter(d => d.date < today && d.score !== null);
  const best = [...finished].sort((a,b) => b.score - a.score || a.day - b.day)[0] || null;
  const least = finished.length > 1 ? [...finished].sort((a,b) => a.score - b.score || a.day - b.day)[0] : null;
  const recorded = calendar.filter(d => d.score !== null).length;
  const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month:'long', year:'numeric' });
  const isMonthComplete = `${prefix}-${String(numDays).padStart(2, '0')}` < today;
  return { calendar, best, least, recorded, monthName, numDays, isMonthComplete };
}

function MonthlyProgress({ entries, days, quran, selectedDate, onSelectDate }) {
  const model = useMemo(() => buildMonthlyProgress({entries, days, quran, selectedDate}),
    [entries, days, quran, selectedDate.slice(0,7)]);
  const chosen = model.calendar.find(d => d.date === selectedDate);
  const active = chosen?.score !== null && !chosen?.future ? chosen : null;
  return <section className="tmv-v39-month-progress" aria-label={`Monthly recorded progress for ${model.monthName}`}>
    <div className="tmv-v39-month-header">
      <div className="tmv-v39-month-title"><TrendingUp size={16} aria-hidden="true"/>
        <h2>{model.monthName} Progress</h2>
        <span>Day 1–{model.numDays}</span>
      </div>
      <span className="tmv-v39-month-recorded">{model.recorded} days recorded</span>
    </div>
    <div className="tmv-v39-month-graph" role="group" aria-label="Tap a day to view its saved daily updates">
      {model.calendar.map(d => {
        const score = d.score;
        const recorded = score !== null;
        const selected = d.date === selectedDate;
        const label = d.future ? 'upcoming' : recorded ? `${score}% recorded progress` : 'no saved entries';
        return <button key={d.date} type="button"
          className={`tmv-v39-month-day${selected ? ' is-selected' : ''}${recorded ? ' has-data' : ''}${d.future ? ' is-future' : ''}`}
          onClick={() => { if (!d.future) onSelectDate(d.date); }}
          disabled={d.future}
          aria-current={selected ? 'date' : undefined}
          aria-label={`${prettyDate(d.date)}: ${label}${d.universityDates ? ', university important date' : ''}`}
          title={`${prettyDate(d.date)} · ${label}${d.universityDates ? ' · University date' : ''}`}>
          <span className="tmv-v39-month-bar-track">
            {recorded && <span className="tmv-v39-month-bar" style={{ height:`${Math.max(7,score)}%` }}/>}
            {!recorded && <span className="tmv-v39-month-empty" />}
            {d.universityDates > 0 && <span className="tmv-v39-month-due" aria-hidden="true"/>}
          </span>
          <span className="tmv-v39-month-daynum">{d.day}</span>
        </button>;
      })}
    </div>
    <div className="tmv-v39-month-info">
      <div className="tmv-v39-month-metrics">
        <span><b>Best</b> {model.best ? `${model.best.day} · ${model.best.score}%` : '—'}</span>
        <span><b>Lowest</b> {model.least ? `${model.least.day} · ${model.least.score}%` : '—'}</span>
        <span><b>Selected</b> {active ? `${active.day} · ${active.score}%` : 'No data'}</span>
      </div>
      <p>{active
        ? `${active.jamaat} Jamaat · ${active.qaza} Qaza · ${active.quranPages} Quran pages · ${active.officeEvents} office updates${active.universityEvents ? ` · ${active.universityEvents} university updates` : ''}${active.universityDates ? ' · University date' : ''}`
        : chosen?.universityDates ? 'University important date saved; action not confirmed by a daily update.'
          : 'Select a recorded day to see its progress.'}</p>
      <small>{model.isMonthComplete ? 'Monthly comparison' : 'Month in progress'} · Scores reflect saved records, not unrecorded or missed activities.</small>
    </div>
  </section>;
}

function FamilyToday({ entries, days, quran, viewDate, setViewDate, onOpen, onOpenSummary, ownerMode, onNew, love, loveBusy, onLove }) {
  const [expanded, setExpanded] = useState(null);
  useEffect(() => { setExpanded(null); }, [viewDate]);
  const read = quran.filter(item => item.date === viewDate)
    .sort((a,b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const lastQuranReading = read.length ? null : [...quran]
    .filter(item => item.date && item.date < viewDate)
    .sort((a,b) => String(b.date).localeCompare(String(a.date)) ||
      String(b.createdAt).localeCompare(String(a.createdAt)))[0];
  const pages = read.reduce((sum, item) => sum + Number(item.pagesRead || 0), 0);
  const noteCount = entries.reduce((sum, item) => sum + (item.logs || [])
    .filter(log => dayISO(log.createdAt) === viewDate).length, 0);
  const prayer = days[viewDate] || {};
  const recorded = PRAYERS.filter(([key]) => prayer.group?.[key] || prayer.makeup?.[key]).length;
  const recentlyChangedTask = entries.some(item =>
    (item.createdAt && dayISO(item.createdAt) === viewDate) ||
    (item.updatedAt && dayISO(item.updatedAt) === viewDate));
  const hasAny = Boolean(noteCount || pages || recorded || recentlyChangedTask);
  const [showEmptyDayToast, setShowEmptyDayToast] = useState(false);
  useEffect(() => {
    if (hasAny) { setShowEmptyDayToast(false); return undefined; }
    setShowEmptyDayToast(true);
    const timer = setTimeout(() => setShowEmptyDayToast(false), 4800);
    return () => clearTimeout(timer);
  }, [viewDate, hasAny]);
  const toggle = key => setExpanded(value => value === key ? null : key);
  // Always show the saved Para number(s), even for multiple Quran sessions.
  // Never invent Para information when no number is recorded.
  const paraNumbers = [...new Set(read.map(item => String(item.para ?? '').trim()).filter(Boolean))];
  const paraSummary = paraNumbers.length ? `Para ${paraNumbers.join(', ')}` : `${read.length} reading${read.length === 1 ? '' : 's'}`;
  const quranSummary = read.length
    ? `${paraSummary} · ${pages} ${pages === 1 ? 'page' : 'pages'} read`
    : `No Quran reading recorded ${viewDate === dayISO() ? 'today' : 'for this date'}`;
  const quranExtra = !read.length && lastQuranReading
    ? `Last reading: Para ${lastQuranReading.para} · ${lastQuranReading.pagesRead} ${Number(lastQuranReading.pagesRead) === 1 ? 'page' : 'pages'} · ${prettyDate(lastQuranReading.date)}` : '';
  /* V37: Listen to the saved updates for the SELECTED date, not older task statuses. */
  const [readingDay, setReadingDay] = useState(false);
  const [listenError, setListenError] = useState('');
  const listenTimer = useRef(null);
  const activeSpeech = useRef(null);
  useEffect(() => {
    setReadingDay(false);
    return () => {
    window.clearTimeout(listenTimer.current);
    if (activeSpeech.current && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    activeSpeech.current = null;
    };
  }, [viewDate]);
  function readSelectedDay() {
    if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance === 'undefined') {
      setListenError('Read aloud is not available on this device.');
      window.clearTimeout(listenTimer.current);
      listenTimer.current = window.setTimeout(() => setListenError(''), 2500);
      return;
    }
    if (activeSpeech.current) {
      window.speechSynthesis.cancel();
      activeSpeech.current = null;
      setReadingDay(false);
      return;
    }
    const lines = buildFamilyReport({entries, prayerDays: days, quranEntries: quran,
      period:'selected', topic:'everything', selectedDate:viewDate});
    const content = [`Ahsan's updates for ${prettyDate(viewDate)}.`, ...lines.map(line => line.en)].join(' ');
    const utter = new window.SpeechSynthesisUtterance(content);
    utter.lang = 'en-US';
    utter.rate = 0.93;
    const voice = window.speechSynthesis.getVoices().find(item => /^en(?:-|$)/i.test(item.lang));
    if (voice) utter.voice = voice;
    utter.onend = () => { if (activeSpeech.current === utter) { activeSpeech.current = null; setReadingDay(false); } };
    utter.onerror = event => {
      if (activeSpeech.current !== utter) return;
      activeSpeech.current = null;
      setReadingDay(false);
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        setListenError('Audio is unavailable. Please try again.');
        window.clearTimeout(listenTimer.current);
        listenTimer.current = window.setTimeout(() => setListenError(''), 2500);
      }
    };
    activeSpeech.current = utter;
    setReadingDay(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
  return <div className="tmv-family-view tmv-v32-home">
    <div className="tmv-v32-intro">
      <span className="tmv-v32-kicker">THE DAILY JOURNAL</span>
      <div className="tmv-v32-titleline">
        <div><h1 className="tmv-v33-script-title">Ahsan’s day<span className="tmv-v32-dot">.</span></h1><p>Just the important moments, in one place.</p></div>
        <div className="tmv-v37-quick-actions">
          <button type="button" className={`tmv-v37-icon-action tmv-v37-love${love?.liked ? ' is-loved' : ''}`}
            onClick={onLove} disabled={loveBusy} aria-pressed={Boolean(love?.liked)}
            aria-label={love?.liked ? 'Remove love for this day' : 'Send love for this day'}
            title={love?.liked ? 'Remove love' : 'Send love'}>
            <Heart size={17} fill={love?.liked ? 'currentColor' : 'none'} strokeWidth={1.8}/>
            {love?.count > 0 && <span className="tmv-v37-love-count">{love.count}</span>}
          </button>
          <button type="button" className={`tmv-v37-icon-action${readingDay ? ' is-reading' : ''}`}
            onClick={readSelectedDay} aria-pressed={readingDay}
            aria-label={readingDay ? 'Stop listening to Ahsan’s day' : 'Listen to Ahsan’s day'}
            title={readingDay ? 'Stop listening' : 'Listen to this day'}>
            {readingDay ? <VolumeX size={17}/> : <Volume2 size={17}/>}
          </button>
          <button type="button" className="tmv-v32-summarybtn" onClick={onOpenSummary} aria-label="Open daily summary assistant"><Sparkles size={17}/><span>Quick AI summary</span></button>
        </div>
      </div>
    </div>
    {listenError && <div className="tmv-mini-toast" role="status">{listenError}</div>}
    {ownerMode && love?.names?.length > 0 && <small className="tmv-v37-owner-love">❤️ Loved by {love.names.map(name => FAMILY_IDENTITY[name]?.name || name).join(', ')}</small>}
    <MonthlyProgress entries={entries} days={days} quran={quran} selectedDate={viewDate} onSelectDate={setViewDate}/>
    <div className="tmv-v32-sectiontitle tmv-v34-sectiontitle"><h2>Daily Life</h2><span>Simple daily overview</span></div>
    <div className="tmv-v34-day-prayer">
      <div className="tmv-v34-date-slot">
        <V32DateNavigator value={viewDate} setValue={setViewDate}/>
      </div>
      <section className="tmv-story-card tmv-prayer-card" aria-label="Prayer">
        <FamilyCardVideo key={`prayer-${viewDate}`} category="prayer" date={viewDate}/>
        <div className="tmv-card-heading"><span className="tmv-card-icon"><CategoryArtwork type="prayer"/></span><h2>Prayer</h2></div>
        <PrayerReadout date={viewDate} days={days}/>
        <button type="button" className="tmv-read-more" onClick={() => onOpen('prayer')}>See prayer history <ArrowRight size={17}/></button>
      </section>
    </div>
    {showEmptyDayToast && !hasAny && <div className="tmv-day-toast" role="status" aria-live="polite">
      <span className="tmv-day-toast-icon"><Clock3 size={19}/></span>
      <span className="tmv-day-toast-copy"><strong>{viewDate === dayISO() ? 'No updates yet today' : 'No updates recorded for this date'}</strong>
        <small lang="ur" dir="rtl">{viewDate === dayISO() ? 'آج ابھی کوئی نئی اپڈیٹ نہیں ہے۔' : 'اس تاریخ کی کوئی اپڈیٹ درج نہیں ہوئی۔'}</small>
      </span>
      <button type="button" onClick={() => setShowEmptyDayToast(false)} aria-label="Dismiss notification"><X size={17}/></button>
    </div>}
    <div className="tmv-v32-sectiontitle tmv-v32-life-title"><h2>Life &amp; Progress</h2><span>Only what matters</span></div>
    <section className="tmv-v32-life" aria-label="Life and progress">
      <V32LifeItem type="quran" date={viewDate} title="Quran Reading" summary={quranSummary}
        status={read.length ? 'Recorded' : 'No update'} extra={quranExtra}
        expanded={expanded === 'quran'} onToggle={() => toggle('quran')} onOpen={onOpen}>
        {read.length ? read.map(item => <p key={item.id || item.createdAt}>
          <strong>Para {item.para} · {item.pagesRead} {Number(item.pagesRead) === 1 ? 'page' : 'pages'}</strong>
          {item.note ? ` — ${item.note}` : ''}
        </p>) : lastQuranReading ? <p>No reading was recorded for this selected day. Last reading: <strong>Para {lastQuranReading.para}, {lastQuranReading.pagesRead} pages</strong> on {prettyDate(lastQuranReading.date)}.</p>
          : <p>No Quran readings recorded for this day yet.</p>}
      </V32LifeItem>
      <V32WorkItem section="office" entries={entries} date={viewDate}
        expanded={expanded === 'office'} onToggle={() => toggle('office')} onOpen={onOpen}/>
      <V32WorkItem section="university" entries={entries} date={viewDate}
        expanded={expanded === 'university'} onToggle={() => toggle('university')} onOpen={onOpen}/>
      <V32WorkItem section="personal" entries={entries} date={viewDate}
        expanded={expanded === 'personal'} onToggle={() => toggle('personal')} onOpen={onOpen}/>
    </section>
    {ownerMode && <button className="tmv-owner-quick" type="button" onClick={() => onNew('office')}><Plus size={18}/> Add a new work task</button>}
    <p className="tmv-end-note">A family connection, one day at a time. <Heart size={14}/></p>
  </div>;
}

function TaskCard({ item, ownerMode, expanded, onExpand, note, setNote, busy, onNote, onEdit, onDelete, onStatus }) {
  const meta = item.meta || {};
  const logs = [...(item.logs||[])].sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  return <article className="tmv-task-card">
    <div className="tmv-task-title"><h3>{item.title}</h3><span className={`tmv-task-status tmv-status-${item.status}`}>{STATUS[item.status]||'To Do'}</span></div>
    {(meta.project || meta.university || meta.program) && <p className="tmv-task-meta">{[meta.project,meta.university,meta.program].filter(Boolean).join(' · ')}</p>}
    {item.detail && <p className="tmv-task-description">{item.detail}</p>}
    {item.section === 'university' && <p className="tmv-task-description"><strong>{APP_STATUS[meta.applicationStatus]||'Planning'}</strong>{meta.upcomingDate ? ` · Upcoming: ${prettyDate(meta.upcomingDate)}` : ''}</p>}
    {item.dueDate && <p className="tmv-task-description">Due: {prettyDate(item.dueDate)}</p>}
    {logs.length > 0 && <div className="tmv-task-update"><small>Latest update · {prettyDate(logs[0].createdAt)}</small><p>{logs[0].note}</p></div>}
    {logs.length > 1 && <details className="tm-details tmv-log-history"><summary>Read {logs.length-1} earlier updates</summary>{logs.slice(1).map(log=><div className="tmv-log-entry" key={log.id}><small>{prettyDate(log.createdAt)}</small><p>{log.note}</p></div>)}</details>}
    {ownerMode && <div className="tmv-owner-card-actions"><button type="button" className="tmv-write-update" onClick={()=>onExpand(expanded ? null : item.id)}><Send size={16}/>{expanded?'Close editor':'Add daily update'}</button>
      <button type="button" onClick={()=>onEdit(item)} aria-label={`Edit ${item.title}`}><Edit3 size={18}/></button>
      <button type="button" onClick={()=>onDelete(item)} aria-label={`Delete ${item.title}`}><Trash2 size={18}/></button></div>}
    {ownerMode && expanded && <div className="tmv-note-editor"><form onSubmit={e=>{e.preventDefault();onNote(item.id);}}><label className="tm-field"><span>What did you do today?</span><textarea required rows={3} maxLength={1000} value={note} onChange={e=>setNote(e.target.value)} placeholder="Write today's progress…"/></label><button className="tm-primary tm-wide" type="submit" disabled={busy||!note.trim()}>Save update</button></form>
      <label className="tm-field"><span>Progress status</span><select value={item.status} disabled={busy} onChange={e=>onStatus(item,e.target.value)}>{Object.entries(STATUS).map(([k,label])=><option key={k} value={k}>{label}</option>)}</select></label></div>}
  </article>;
}

function PrayerPanel({ ownerMode, date, setDate, days, busy, onToggle }) {
  const record = days[date] || {group:{},makeup:{}};
  const marked=PRAYERS.filter(([key])=>record.group?.[key]||record.makeup?.[key]).length;
  return <section className="tmv-detail-view"><div className="tmv-detail-heading"><CategoryArtwork type="prayer"/><div><h2>Prayer Record</h2><p>Daily prayers, as recorded by <AhsanName/>.</p></div></div>
    <DayNavigator value={date} setValue={setDate}/>
    {ownerMode ? <div className="tmv-owner-section"><p className="tmv-owner-label">OWNER EDITING · Changes save immediately</p><div className="tmv-prayer-edit-list">{PRAYERS.map(([key,label])=>{
       const group=Boolean(record.group?.[key]), makeup=Boolean(record.makeup?.[key]);
       return <div className="tmv-edit-prayer-row" key={key}><strong>{label}</strong><button type="button" className={group?'tmv-selected':''} disabled={busy} aria-pressed={group} onClick={()=>onToggle({date,prayer:key,kind:'group',checked:!group})}>{group?<Check size={18}/>:null} Jamaat</button><button type="button" className={makeup?'tmv-selected':''} disabled={busy} aria-pressed={makeup} onClick={()=>onToggle({date,prayer:key,kind:'makeup',checked:!makeup})}>{makeup?<Check size={18}/>:null} Qaza</button></div>;
    })}</div></div> : <PrayerReadout date={date} days={days}/>}
    <p className="tmv-reassurance">{marked} of 5 prayers recorded. A blank entry means no update was posted, not necessarily that a prayer was missed.</p>
    <h3 className="tmv-subheading">Past 7 days</h3>
    <div className="tmv-week-list">{Array.from({length:7},(_,i)=>shiftDay(dayISO(),-i)).map(d=>{const x=days[d]||{};const count=PRAYERS.filter(([key])=>x.group?.[key]||x.makeup?.[key]).length;return <button key={d} type="button" onClick={()=>setDate(d)} className={date===d?'tmv-active-day':''}><strong>{prettyDate(d)}</strong><span>{count}/5 updated <ChevronRight size={16}/></span></button>;})}</div>
  </section>;
}

function QuranPanel({ ownerMode, quran, busy, onAdd, onDelete }) {
  const [form, setForm]=useState({date:dayISO(),para:'1',pagesRead:'1',fromPage:'',toPage:'',note:''});
  const update=(key,value)=>setForm(old=>({...old,[key]:value}));
  const total=quran.reduce((s,x)=>s+Number(x.pagesRead||0),0);
  const sorted=[...quran].sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b.createdAt).localeCompare(String(a.createdAt)));
  return <section className="tmv-detail-view"><div className="tmv-detail-heading"><CategoryArtwork type="quran"/><div><h2>Quran Reading</h2><p>Progress in the 15-line Quran, saved by <AhsanName/>.</p></div></div>
    <div className="tmv-quran-stat"><strong>{total}</strong><span>pages recorded in total</span></div>
    {ownerMode && <form className="tmv-owner-quran tm-stack" onSubmit={async e=>{e.preventDefault();const ok=await onAdd(form);if(ok)setForm(old=>({...old,pagesRead:'1',fromPage:'',toPage:'',note:''}));}}>
      <h3>Add a reading</h3><label className="tm-field"><span>Para</span><select value={form.para} onChange={e=>update('para',e.target.value)}>{Array.from({length:30},(_,i)=><option key={i+1} value={i+1}>Para {i+1}</option>)}</select></label>
      <label className="tm-field"><span>Pages read</span><input type="number" inputMode="numeric" min="1" max="200" required value={form.pagesRead} onChange={e=>update('pagesRead',e.target.value)}/></label>
      <label className="tm-field"><span>Date</span><input type="date" required value={form.date} onChange={e=>update('date',e.target.value)}/></label>
      <details className="tm-details"><summary>More details (optional)</summary><label className="tm-field"><span>From printed page</span><input type="number" min="1" value={form.fromPage} onChange={e=>update('fromPage',e.target.value)}/></label><label className="tm-field"><span>To printed page</span><input type="number" min="1" value={form.toPage} onChange={e=>update('toPage',e.target.value)}/></label><label className="tm-field"><span>Note</span><input value={form.note} onChange={e=>update('note',e.target.value)} maxLength={350}/></label></details>
      <button className="tm-primary tm-wide" type="submit" disabled={busy}>Save reading</button>
    </form>}
    <h3 className="tmv-subheading">Reading history</h3>
    {sorted.length ? <div className="tmv-history-items">{sorted.map(item=><div className="tmv-reading-history" key={item.id}><span className="tmv-book-symbol"><BookOpen size={19}/></span><div><strong>Para {item.para} · {item.pagesRead} {Number(item.pagesRead)===1?'page':'pages'}</strong><small>{prettyDate(item.date)}{item.fromPage ? ` · Page ${item.fromPage}${item.toPage?`–${item.toPage}`:''}` : ''}</small>{item.note&&<p>{item.note}</p>}</div>{ownerMode&&<button type="button" disabled={busy} aria-label="Delete reading" onClick={()=>onDelete(item)}><Trash2 size={18}/></button>}</div>)}</div>:<p className="tmv-empty-note">No Quran readings have been recorded yet.</p>}
  </section>;
}

function WorkPanel({ ownerMode, section, entries, busy, search, setSearch, filter, setFilter, expanded, setExpanded, note, setNote, onNew, onNote, onEdit, onDelete, onStatus }) {
  const info=WORK_SECTIONS.find(x=>x.key===section);
  const items=entries.filter(x=>x.section===section);
  const filtered=items.filter(x=>(filter==='all'||x.status===filter)&&`${x.title} ${x.detail} ${x.meta?.project||''} ${x.meta?.university||''} ${(x.logs||[]).map(l=>l.note).join(' ')}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt)));
  return <section className="tmv-detail-view"><div className="tmv-detail-heading"><CategoryArtwork type={section}/><div><h2>{info.name}</h2><p>{section==='office'?'Projects, daily work and progress.':section==='university'?'Applications, interviews and important dates.':'Personal goals and updates.'}</p></div></div>
    {ownerMode&&<button type="button" className="tmv-add-task" onClick={()=>onNew(section)}><Plus size={19}/> Add new {section==='university'?'application':'task'}</button>}
    {items.length>5&&<details className="tm-details tmv-filter-details"><summary>Find a specific activity</summary><label className="tm-field"><span>Search</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search activities"/></label><label className="tm-field"><span>Progress</span><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All</option>{Object.entries(STATUS).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label></details>}
    {filtered.length ? <div className="tmv-task-list">{filtered.map(item=><TaskCard key={item.id} item={item} ownerMode={ownerMode} expanded={expanded===item.id} onExpand={id=>{setExpanded(id);setNote('');}} note={expanded===item.id?note:''} setNote={setNote} busy={busy} onNote={onNote} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus}/>)}</div>:<p className="tmv-empty-note">No activities saved here yet.</p>}
  </section>;
}

export default function TrackMe() {
  const [showStandaloneSplash, setShowStandaloneSplash] = useState(() =>
    typeof window !== 'undefined' && !window.__trackMeDedicatedEntry && (
      window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone === true
    )
  );
  useEffect(() => {
    if (!showStandaloneSplash) return undefined;
    const timer = window.setTimeout(() => setShowStandaloneSplash(false), 2000);
    return () => window.clearTimeout(timer);
  }, [showStandaloneSplash]);
  // Minimal, non-caching service worker for better install compatibility on older Chrome.
  // It never intercepts API requests and never stores private journal records.
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/track-me-sw.js', {scope:'/track-me'}).catch(() => {});
  }, []);
  const [loading,setLoading]=useState(true);
  const [authenticated,setAuthenticated]=useState(false);
  const [password,setPassword]=useState('');
  const [loginError,setLoginError]=useState('');
  // Auto-submit only after typing stops. Keep one request in flight and
  // never try the same incorrect candidate repeatedly on every render.
  const loginAttemptRef = useRef({ pending:false, last:'' });
  const latestPasswordRef = useRef('');
  latestPasswordRef.current = password;
  const [welcome,setWelcome]=useState(false);
  const [familyViewer,setFamilyViewer]=useState('family');
  const [entries,setEntries]=useState([]);
  const [prayerDays,setPrayerDays]=useState({});
  const [quranEntries,setQuranEntries]=useState([]);
  const [section,setSection]=useState('overview');
  const [viewDate,setViewDate]=useState(dayISO());
  const [prayerDate,setPrayerDate]=useState(dayISO());
  const [busy,setBusy]=useState(false);
  const [notice,setNotice]=useState('');
  const [pinOpen,setPinOpen]=useState(false);
  const [pinError,setPinError]=useState('');
  const [creationPin,setCreationPin]=useState('');
  const [ownerMode,setOwnerMode]=useState(false);
  const [editor,setEditor]=useState(null);
  const [expanded,setExpanded]=useState(null);
  const [note,setNote]=useState('');
  const [search,setSearch]=useState('');
  const [filter,setFilter]=useState('all');
  const [summaryOpen,setSummaryOpen]=useState(false);
  /* V37: One saved heart per family member and selected calendar day. */
  const [love, setLove] = useState({date:null, liked:false, count:0, names:[]});
  const [loveBusy, setLoveBusy] = useState(false);
  const latestLoveDate = useRef(viewDate);
  latestLoveDate.current = viewDate;
  useEffect(() => {
    if (loading || !authenticated || welcome) return undefined;
    let mounted = true;
    setLove({date:viewDate,liked:false,count:0,names:[]});
    api({action:'love_get', date:viewDate})
      .then(data => { if (mounted) setLove({...data,date:viewDate}); })
      .catch(() => { if (mounted) setLove({date:viewDate,liked:false,count:0,names:[]}); });
    return () => { mounted = false; };
  }, [authenticated, loading, welcome, viewDate, familyViewer]);
  async function toggleLove() {
    if (loveBusy) return;
    if (!FAMILY_IDENTITY[familyViewer]) {
      setNotice('Sign in with your personal family password to send love.');
      return;
    }
    const date = viewDate;
    const liked = !Boolean(love.date === date && love.liked);
    setLoveBusy(true);
    try {
      const data = await api({action:'love_set',date,liked});
      if (date === latestLoveDate.current) setLove({...data,date});
    } catch (err) { fail(err); }
    finally { setLoveBusy(false); }
  }
  /* V31: Update this person's last-open timestamp only after consent has been saved. */
  useEffect(() => {
    if (loading || !authenticated || !['nasir','talat','happa','yamna'].includes(familyViewer)) return undefined;
    let lastSent = 0;
    const touch = () => {
      if (document.visibilityState === 'hidden' || Date.now() - lastSent < 60 * 60 * 1000) return;
      lastSent = Date.now();
      api({action:'reminder_touch'}).catch(() => {});
    };
    touch();
    document.addEventListener('visibilitychange', touch);
    window.addEventListener('focus', touch);
    return () => { document.removeEventListener('visibilitychange', touch); window.removeEventListener('focus', touch); };
  }, [loading,authenticated,familyViewer]);
  useEffect(()=>{
    let mounted=true;
    api().then(data=>{if(mounted){setAuthenticated(Boolean(data.authenticated));setFamilyViewer(data.viewer||'family');setEntries(data.entries||[]);setPrayerDays(data.prayerDays||{});setQuranEntries(data.quranEntries||[]);}})
      .catch(err=>{if(mounted)setLoginError(err.message);}).finally(()=>{if(mounted)setLoading(false);});
    return ()=>{mounted=false;};
  },[]);
  useEffect(() => {
    if (loading || authenticated || welcome || busy || !password.trim()) return undefined;
    if (loginAttemptRef.current.last === password) return undefined;
    // 1.8s quiet time prevents an API request for every typed character.
    // Vercel's existing 8-attempt/15-minute limit remains unchanged.
    const timer = window.setTimeout(() => {
      if (!loginAttemptRef.current.pending && loginAttemptRef.current.last !== password) {
        signIn(undefined, password);
      }
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [password, loading, authenticated, welcome, busy]);

  function fail(err){
    setNotice(err.message||'Request failed.');
    if(err.status===401&&err.message?.toLowerCase().includes('session')){
      setAuthenticated(false);setFamilyViewer('family');setOwnerMode(false);setCreationPin('');setEntries([]);setPrayerDays({});setQuranEntries([]);setLoginError('Please sign in again.');
    }
  }
  async function signIn(e, suppliedPassword = password){
    e?.preventDefault?.();
    if (loginAttemptRef.current.pending || !suppliedPassword.trim()) return;
    loginAttemptRef.current.pending=true;
    loginAttemptRef.current.last=suppliedPassword;
    setBusy(true);setLoginError('');
    try {
      await api({action:'login',password:suppliedPassword});
      const data=await api();
      setEntries(data.entries||[]);setPrayerDays(data.prayerDays||{});setQuranEntries(data.quranEntries||[]);
      setAuthenticated(true);setFamilyViewer(data.viewer||'family');setPassword('');setWelcome(true);
    } catch(err) {
      // Do not show an error for an older, incomplete input if typing resumed.
      if (latestPasswordRef.current === suppliedPassword) setLoginError(err.message);
    } finally {
      loginAttemptRef.current.pending=false;
      setBusy(false);
    }
  }
  async function signOut(){try{await api({action:'logout'});loginAttemptRef.current.last='';setAuthenticated(false);setFamilyViewer('family');setOwnerMode(false);setCreationPin('');setEntries([]);setPrayerDays({});setQuranEntries([]);setWelcome(false);setEditor(null);setNotice('');setSection('overview');}catch(err){fail(err);}}
  function openOwner(){if(ownerMode)return;setPinError('');setPinOpen(true);}
  async function verifyPin(pin){setBusy(true);setPinError('');try{await api({action:'verify_create_pin',pin});setCreationPin(pin);setOwnerMode(true);setPinOpen(false);setNotice('Owner mode is on. You can update every section without entering the code again. Select Finish editing when done.');}catch(err){setPinError(err.message);}finally{setBusy(false);}}
  function lockOwner(){setOwnerMode(false);setCreationPin('');setEditor(null);setExpanded(null);setNotice('Owner editing is off.');}
  function newTask(target='office'){if(!ownerMode){openOwner();return;}setEditor(initialTask(target));}
  async function saveTask(form){setBusy(true);setNotice('');try{const editing=Boolean(editor?.id);const data=await api({action:editing?'update':'create',...(editing?{id:editor.id}:{pin:creationPin}),item:form});setEntries(list=>editing?list.map(x=>x.id===data.item.id?data.item:x):[data.item,...list]);setEditor(null);setNotice(editing?'Updated successfully.':'New task saved.');}catch(err){fail(err);}finally{setBusy(false);}}
  async function updateTask(item,status){setBusy(true);try{const data=await api({action:'update',id:item.id,item:{...item,status}});setEntries(list=>list.map(x=>x.id===item.id?data.item:x));}catch(err){fail(err);}finally{setBusy(false);}}
  async function addNote(id){if(!note.trim())return;setBusy(true);try{const data=await api({action:'note',id,note});setEntries(list=>list.map(x=>x.id===id?data.item:x));setNote('');setNotice('Daily update saved.');}catch(err){fail(err);}finally{setBusy(false);}}
  async function deleteTask(item){if(!window.confirm(`Delete “${item.title}” and its updates?`))return;setBusy(true);try{await api({action:'delete',id:item.id});setEntries(list=>list.filter(x=>x.id!==item.id));setNotice('Task deleted.');}catch(err){fail(err);}finally{setBusy(false);}}
  async function togglePrayer(payload){setBusy(true);try{const data=await api({action:'prayer_update',...payload});setPrayerDays(old=>({...old,[data.date]:data.day}));setNotice('Prayer updated.');}catch(err){fail(err);}finally{setBusy(false);}}
  async function addQuran(form){setBusy(true);try{const data=await api({action:'quran_add',...form});setQuranEntries(list=>[...list,data.entry]);setNotice('Quran reading saved.');return true;}catch(err){fail(err);return false;}finally{setBusy(false);}}
  async function deleteQuran(item){if(!window.confirm(`Delete this Para ${item.para} reading?`))return;setBusy(true);try{await api({action:'quran_delete',id:item.id});setQuranEntries(list=>list.filter(x=>x.id!==item.id));setNotice('Reading deleted.');}catch(err){fail(err);}finally{setBusy(false);}}
  function go(key){setSection(key);setExpanded(null);setNote('');setSearch('');setFilter('all');setNotice('');if(typeof window!=='undefined')window.scrollTo({top:0,behavior:'instant'});}
  if(showStandaloneSplash)return <main className="tm-page"><FamilyAppSplash/></main>;
  if(loading)return <main className="tm-page tm-loading" role="status"><div className="tm-spinner"/><p>Opening family updates…</p></main>;
  if(!authenticated)return <main className="tm-page"><LoginScreen password={password} setPassword={setPassword} onSubmit={signIn} busy={busy} error={loginError}/></main>;
  if(welcome)return <main className="tm-page"><CautionWelcome viewer={familyViewer} onContinue={()=>setWelcome(false)}/></main>;
  return <main className="tm-page tmv-family"><div className="tm-shell tmv-shell">
    <header className="tmv-header"><button type="button" className="tmv-brand" onClick={()=>go('overview')} aria-label="Go to Ahsan's daily updates"><AhsanAvatar className="tmv-avatar-header"/><span><strong><AhsanName/>’s Updates</strong><small>Family journal</small></span></button><div className="tmv-mini-header-actions"><FamilySevenDayReminder viewer={familyViewer}/><FamilyIdentity viewer={familyViewer}/><button type="button" className="tmv-logout" onClick={signOut}><LogOut size={18}/><span>Log out</span></button></div></header>
    {section!=='overview'&&<button type="button" className="tmv-back" onClick={()=>go('overview')}><ArrowLeft size={20}/> Back to daily updates</button>}
    {notice&&<div className="tmv-notice" role="status"><CheckCircle2 size={19}/><span>{notice}</span><button type="button" onClick={()=>setNotice('')} aria-label="Dismiss"><X size={17}/></button></div>}
    {ownerMode&&<div className="tmv-owner-banner"><span><LockKeyhole size={16}/> Owner mode · all sections unlocked</span><button type="button" onClick={lockOwner}>Finish editing</button></div>}
    {section==='overview'&&<FamilyToday entries={entries} days={prayerDays} quran={quranEntries} viewDate={viewDate} setViewDate={setViewDate} onOpen={go} ownerMode={ownerMode} onNew={newTask} onOpenSummary={()=>setSummaryOpen(true)}
      love={love.date === viewDate ? love : {date:viewDate,liked:false,count:0,names:[]}} loveBusy={loveBusy} onLove={toggleLove}/>}
    {['office','personal','university'].includes(section)&&<WorkPanel section={section} ownerMode={ownerMode} entries={entries} busy={busy} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} expanded={expanded} setExpanded={setExpanded} note={note} setNote={setNote} onNew={newTask} onNote={addNote} onEdit={item=>setEditor({...item})} onDelete={deleteTask} onStatus={updateTask}/>}
    {section==='prayer'&&<PrayerPanel ownerMode={ownerMode} date={prayerDate} setDate={setPrayerDate} days={prayerDays} busy={busy} onToggle={togglePrayer}/>}
    {section==='quran'&&<QuranPanel ownerMode={ownerMode} quran={quranEntries} busy={busy} onAdd={addQuran} onDelete={deleteQuran}/>}
    <div className="tmv-bottom"><button type="button" className="tmv-owner-link" onClick={ownerMode?lockOwner:openOwner}><LockKeyhole size={16}/>{ownerMode?'Finish owner updates':'Owner updates (private code)'}</button><p>Only for <AhsanName/>’s family.</p></div>
    <div className="tmv-install-footer"><InstallShortcut/></div>
  </div>
  {pinOpen&&<PinModal busy={busy} onVerify={verifyPin} onClose={()=>setPinOpen(false)} error={pinError}/>}
  {editor&&<TaskEditor key={editor.id||`new-${editor.section}`} initial={editor} saving={busy} onClose={()=>setEditor(null)} onSave={saveTask}/>}
  {summaryOpen&&<SummaryChat entries={entries} prayerDays={prayerDays} quranEntries={quranEntries} selectedDate={viewDate} onClose={()=>setSummaryOpen(false)} onSessionError={fail}/>}
  </main>;
}
