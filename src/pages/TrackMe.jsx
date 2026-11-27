import { createPortal as myLifePortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, CalendarDays, Check,
  CheckCircle2, ChevronLeft, ChevronRight, Clock3, Edit3, Eye, EyeOff,
  GraduationCap, Heart, Camera, Image as ImageIcon, MessageCircleQuestion, ArrowLeftRight, KeyRound, LockKeyhole, LogOut, Plus, Search,
  Bell, Play, Pause, Send, ShieldAlert, ShieldCheck, Sparkles, Trash2, TrendingUp, X, Home, Menu, MessageSquareText, Sun, Moon, Volume2, VolumeX, Smartphone, UserRound, MapPinned, MapPin, Globe2, Radio, Navigation,
} from 'lucide-react';
import './TrackMe.css';
/* V47 Single Login UI */

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
  const person = viewer === 'owner' ? {name:'Ahsan',gender:'male'} : (FAMILY_IDENTITY[viewer] || {name: 'Family', gender: 'other'});
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
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:9}}>
              <label className="tm-field"><span>Country (optional)</span><input maxLength={72} value={form.meta?.country||''} onChange={e=>changeMeta('country',e.target.value)} placeholder="e.g. UK, UAE, USA"/></label>
              <label className="tm-field"><span>Degree level</span><select value={form.meta?.level||'masters'} onChange={e=>changeMeta('level',e.target.value)}><option value="masters">Master's</option><option value="bachelors">Bachelor's</option><option value="phd">PhD</option></select></label>
              
            </div>
            <label className="tm-field"><span>Intake year/term (optional)</span><input maxLength={24} value={form.meta?.intake||''} onChange={e=>changeMeta('intake',e.target.value)} placeholder="e.g. Fall 2027"/></label>
            
            <small style={{fontSize:11,color:'#728675'}}>Actual requirements differ by degree and intake. We'll check official pages and show only verifiable criteria.</small>
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

/* V50: Date-by-date complete summaries for the requested 7/30-day window.
   Reads existing saved entries only; never guesses that unmarked prayers
   were missed or that an old task's current status is today's work. */
function buildCompleteWindowReport({entries, prayerDays, quranEntries, period, topic}) {
  const length = period === 'week' ? 7 : 30;
  const today = dayISO();
  const tasks = Array.isArray(entries) ? entries : [];
  const readings = Array.isArray(quranEntries) ? quranEntries : [];
  const prayers = prayerDays || {};
  const lines = [];
  const wants = type => topic === 'all' || topic === type;
  const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();
  const dateOf = value => {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return String(value);
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? '' : dayISO(parsed);
  };
  const label = task => {
    const title = clean(task.title || 'Untitled task');
    const project = clean(task.meta?.project);
    return project && project.toLowerCase() !== title.toLowerCase() ? `${project} — ${title}` : title;
  };
  const add = (en, ur, noUpdates = false) => lines.push({en,ur,...(noUpdates ? {noUpdates:true} : {})});
  const prayersUr = {fajr:'فجر',dhuhr:'ظہر',asr:'عصر',maghrib:'مغرب',isha:'عشاء'};
  const categories = [
    {key:'office',en:'Office',ur:'دفتر'},
    {key:'university',en:'University',ur:'یونیورسٹی'},
    {key:'personal',en:'Personal',ur:'ذاتی کام'},
  ];
  const currentStatus = {planned:'To do',in_progress:'In progress',done:'Completed'};
  for (let offset = 0; offset < length; offset += 1) {
    const date = shiftDay(today,-offset);
    const heading = prettyDate(date);
    const dayLines = [];
    const recordedCategories = new Set();
    const addDay = (en,ur) => dayLines.push({en:`${heading} · ${en}`,ur:`${heading} · ${ur}`});
    if (wants('prayer')) {
      const saved = prayers[date] || {};
      const group = PRAYERS.filter(([key]) => saved.group?.[key]).map(([key]) => key);
      const makeup = PRAYERS.filter(([key]) => !saved.group?.[key] && saved.makeup?.[key]).map(([key]) => key);
      if (group.length || makeup.length) {
        const enParts = [];
        const urParts = [];
        if (group.length) {
          enParts.push(`Jamaat: ${group.map(k => PRAYERS.find(([id]) => id === k)?.[1] || k).join(', ')}`);
          urParts.push(`جماعت: ${group.map(k => prayersUr[k]).join('، ')}`);
        }
        if (makeup.length) {
          enParts.push(`Qaza: ${makeup.map(k => PRAYERS.find(([id]) => id === k)?.[1] || k).join(', ')}`);
          urParts.push(`قضا: ${makeup.map(k => prayersUr[k]).join('، ')}`);
        }
        const notRecorded = PRAYERS.filter(([key]) => !group.includes(key) && !makeup.includes(key)).map(([key]) => key);
        if (notRecorded.length) {
          enParts.push(`Not recorded: ${notRecorded.map(k => PRAYERS.find(([id]) => id === k)?.[1] || k).join(', ')}`);
          urParts.push(`ریکارڈ نہیں: ${notRecorded.map(k => prayersUr[k]).join('، ')}`);
        }
        addDay(`Prayer — ${enParts.join('; ')}.`,`نماز — ${urParts.join('؛ ')}۔`);
        recordedCategories.add('prayer');
      }
    }
    if (wants('quran')) {
      const daily = readings.filter(reading => dateOf(reading.date) === date)
        .sort((a,b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
      if (daily.length) recordedCategories.add('quran');
      for (const reading of daily) {
        const para = clean(reading.para) || 'not specified';
        const pages = Number(reading.pagesRead) || 0;
        const pageRange = reading.fromPage || reading.toPage ? ` (pages ${clean(reading.fromPage) || '?'}–${clean(reading.toPage) || '?'})` : '';
        const note = clean(reading.note);
        addDay(`Quran — Para ${para}, ${pages} page${pages === 1 ? '' : 's'}${pageRange}${note ? `; note: ${note}` : ''}.`,
          `قرآن — پارہ ${para}، ${pages} صفحات${pageRange}${note ? `؛ نوٹ: ${note}` : ''}۔`);
      }
    }
    for (const category of categories) {
      if (!wants(category.key)) continue;
      for (const task of tasks.filter(row => row.section === category.key)) {
        const notes = (Array.isArray(task.logs) ? task.logs : [])
          .filter(note => dateOf(note.createdAt) === date)
          .sort((a,b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
        const created = dateOf(task.createdAt) === date;
        const updated = dateOf(task.updatedAt) === date;
        if (!created && !updated && !notes.length) continue;
        recordedCategories.add(category.key);
        const taskName = label(task);
        const m = task.meta || {};
        const uniName = clean(m.university);
        const program = clean(m.program);
        const country = clean(m.country);
        const uniDetails = category.key === 'university'
          ? [uniName && `University: ${uniName}`,program && `Program: ${program}`,country && `Country: ${country}`].filter(Boolean).join('; ')
          : '';
        const head = `${category.en} — ${taskName}${uniDetails ? ` (${uniDetails})` : ''}`;
        const urHead = `${category.ur} — ${taskName}${uniDetails ? ` (${uniDetails})` : ''}`;
        // Metadata and descriptions are current saved values, not a historic snapshot.
        const savedDetails = [
          clean(task.detail) && `current details: ${clean(task.detail)}`,
          clean(task.dueDate) && `target date: ${clean(task.dueDate)}`,
          category.key === 'university' && clean(m.applicationStatus) && `current application status: ${clean(m.applicationStatus)}`,
          category.key === 'university' && clean(m.applicationDate) && `application date: ${clean(m.applicationDate)}`,
          category.key === 'university' && clean(m.upcomingDate) && `next date: ${clean(m.upcomingDate)}`,
        ].filter(Boolean).join('; ');
        const detailSuffix = savedDetails ? ` (${savedDetails})` : '';
        if (created) addDay(`${head}: new task/record created${detailSuffix}.`, `${urHead}: نیا ریکارڈ بنایا گیا${detailSuffix}۔`);
        // If there are saved notes, show every one, not only the newest two.
        for (const note of notes) {
          const content = clean(note.note);
          if (content) addDay(`${head}: progress note — ${content}`, `${urHead}: پیش رفت — ${content}`);
        }
        // This can mean a field was edited; it does not prove work was performed.
        if (updated && !created && !notes.length) {
          const state = currentStatus[task.status] || 'Recorded';
          addDay(`${head}: record edited (current status: ${state})${detailSuffix}.`,
            `${urHead}: ریکارڈ میں تبدیلی (موجودہ حیثیت: ${state})${detailSuffix}۔`);
        }
      }
    }
    if (dayLines.length) {
      // A brief missing-category note completes the picture without five empty cards.
      if (topic === 'all') {
        const names = {prayer:'Prayer',quran:'Quran',office:'Office',university:'University',personal:'Personal'};
        const missing = Object.keys(names).filter(key => !recordedCategories.has(key)).map(key => names[key]);
        if (missing.length) dayLines.push({en:`${heading} · No saved record under: ${missing.join(', ')}.`,
          ur:`${heading} · ان حصوں میں نئی اپڈیٹ محفوظ نہیں: ${missing.join('، ')}۔`,noUpdates:true});
      }
      lines.push(...dayLines);
    }
    else add(`${heading} · No ${topic === 'all' ? 'updates' : topic + ' updates'} saved for this day.`,
      `${heading} · اس دن ${topic === 'all' ? 'کوئی اپڈیٹ' : 'اس موضوع کی کوئی اپڈیٹ'} محفوظ نہیں ہوئی۔`, true);
  }
  return lines;
}

// Clear bilingual family updates based on saved records only.
// Give the actual task, what changed, the university/program and next date.
// A current status without a note is never described as work done today.
// This uses only existing data and does not change the API or database.
function buildFamilyReport({ entries, prayerDays, quranEntries, period, topic, selectedDate }) {
  if (period === 'week' || period === 'month')
    return buildCompleteWindowReport({entries,prayerDays,quranEntries,period,topic});
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

/* V52: Urdu Voice Reading — existing family buttons, browser speech only. */
function trackVoiceChunks(value, limit = 170) {
  let remaining = String(value || '').replace(/\s+/g, ' ').trim();
  const result = [];
  while (remaining.length > limit) {
    const punctuation = ['۔','؟','.','!','?',',','،','؛'].reduce((pos,mark) =>
      Math.max(pos, remaining.lastIndexOf(mark, limit)), -1);
    let cut = punctuation >= Math.round(limit * 0.55) ? punctuation + 1 : remaining.lastIndexOf(' ', limit);
    if (cut < Math.round(limit * 0.4)) cut = limit;
    const part = remaining.slice(0,cut).trim();
    if (part) result.push(part);
    remaining = remaining.slice(cut).trim();
  }
  if (remaining) result.push(remaining);
  return result;
}
function trackFindSpeechVoice(voices, language) {
  const list = Array.isArray(voices) ? voices : Array.from(voices || []);
  const urdu = language === 'ur';
  const filtered = list.filter(voice => urdu
    ? /^ur(?:[-_]|$)/i.test(voice.lang || '') || /\burdu\b/i.test(voice.name || '')
    : /^en(?:[-_]|$)/i.test(voice.lang || ''));
  return filtered.sort((a,b) => {
    const score = voice =>
      (urdu && /^ur[-_]PK$/i.test(voice.lang || '') ? 30 : 0) +
      (urdu && /^ur[-_]IN$/i.test(voice.lang || '') ? 20 : 0) +
      (!urdu && /^en[-_]US$/i.test(voice.lang || '') ? 10 : 0) +
      (/natural|neural|google/i.test(voice.name || '') ? 3 : 0);
    return score(b) - score(a);
  })[0] || null;
}
/* V54: No-key Urdu voice, generated by the existing server API. */
function trackStartNoKeyUrdu(value,onFinished,onFailure) {
  if(typeof window==='undefined'||!(window.AudioContext||window.webkitAudioContext))
    return {error:'This browser cannot play online audio. / اس براؤزر میں آن لائن آواز نہیں چل سکتی۔',stop:()=>{}};
  const chunks=trackVoiceChunks(value,850);
  if(!chunks.length)return {error:'No saved updates to read. / پڑھنے کے لیے کوئی اپڈیٹ نہیں۔',stop:()=>{}};
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  let context;
  try{context=new AudioContext();}catch(_){return {error:'Audio could not start. / آواز شروع نہیں ہو سکی۔',stop:()=>{}};}
  const ready=context.resume();
  let stopped=false,playing=null,index=0;
  const stop=()=>{
    if(stopped)return;
    stopped=true;
    if(playing){playing.onended=null;try{playing.stop(0);}catch(_){};playing.disconnect();playing=null;}
    try{const pending=context.close();pending?.catch?.(()=>{});}catch(_){}
  };
  const fail=message=>{if(stopped)return;stop();onFailure?.(message);};
  const finish=()=>{if(stopped)return;stop();onFinished?.();};
  async function next(){
    if(stopped)return;
    if(index>=chunks.length){finish();return;}
    try{
      const answer=await api({action:'urdu_cloud_voice',text:chunks[index]});
      if(stopped)return;
      if(answer?.format!=='audio/mpeg'||!answer.audio)throw Error('Invalid voice response');
      const raw=window.atob(answer.audio);
      const bytes=new Uint8Array(raw.length);
      for(let k=0;k<raw.length;k++)bytes[k]=raw.charCodeAt(k);
      const decoded=await context.decodeAudioData(bytes.buffer);
      if(stopped)return;
      const source=context.createBufferSource();
      source.buffer=decoded;
      source.connect(context.destination);
      playing=source;
      source.onended=()=>{
        if(stopped||playing!==source)return;
        playing=null;source.disconnect();index++;next();
      };
      source.start(0);
    }catch(_){fail('Online Urdu voice is temporarily unavailable. / آن لائن اردو آواز فی الحال دستیاب نہیں۔');}
  }
  Promise.resolve(ready).then(next).catch(()=>fail('Tap speaker again to enable audio. / آواز کے لیے دوبارہ دبائیں۔'));
  return {stop};
}

function trackStartSpeech(text, language, onFinished, onFailure) {
  if (language === 'ur') return trackStartNoKeyUrdu(text, onFinished, onFailure);
  const unsupported = 'Voice reading is not supported by this browser. / اس براؤزر میں آواز کی سہولت دستیاب نہیں۔';
  if (typeof window === 'undefined' || !('speechSynthesis' in window) ||
      typeof window.SpeechSynthesisUtterance !== 'function') {
    return {error:unsupported,stop:()=>{}};
  }
  const synth = window.speechSynthesis;
  const parts = trackVoiceChunks(text);
  if (!parts.length) return {error:'No saved updates to read. / پڑھنے کے لیے کوئی اپڈیٹ موجود نہیں۔',stop:()=>{}};
  let stopped = false;
  let index = 0;
  let utterance = null;
  let loadTimer = null;
  let selectedVoice = null;
  const clearVoiceWait = () => {
    if (loadTimer !== null) { window.clearTimeout(loadTimer); loadTimer = null; }
    if (typeof synth.removeEventListener === 'function')
      synth.removeEventListener('voiceschanged', tryVoice);
  };
  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearVoiceWait();
    if (utterance) { utterance.onend = null; utterance.onerror = null; utterance = null; }
    try { synth.cancel(); } catch (_) { /* Do not disrupt the app if audio was stopped by the OS. */ }
  };
  const finish = () => {if (stopped) return;stop();onFinished?.();};
  const fail = message => {if (stopped) return;stop();onFailure?.(message);};
  const speakNext = () => {
    if (stopped) return;
    if (index >= parts.length) { finish(); return; }
    const current = new window.SpeechSynthesisUtterance(parts[index++]);
    utterance = current; // Keep a live reference for Chrome and mobile browsers.
    current.lang = language === 'ur' ? (selectedVoice?.lang || 'ur-PK') : (selectedVoice?.lang || 'en-US');
    if (selectedVoice) current.voice = selectedVoice;
    current.rate = language === 'ur' ? 0.87 : 0.93;
    current.pitch = 1;
    current.onend = () => {if (!stopped && utterance === current) speakNext();};
    current.onerror = event => {
      if (stopped || utterance !== current) return;
      if (event?.error === 'canceled' || event?.error === 'interrupted') {finish(); return;}
      fail('Voice playback was interrupted. / آواز بند ہو گئی، دوبارہ کوشش کریں۔');
    };
    try { synth.speak(current); }
    catch (_) { fail('Unable to play voice on this device. / اس ڈیوائس پر آواز نہیں چل سکی۔'); }
  };
  function tryVoice() {
    if (stopped) return false;
    const voice = trackFindSpeechVoice(synth.getVoices(), language);
    if (language === 'ur' && !voice) return false;
    selectedVoice = voice;
    clearVoiceWait();
    speakNext();
    return true;
  }
  try { synth.cancel(); }
  catch (_) { return {error:unsupported,stop:()=>{}}; }
  if (!tryVoice()) {
    // Some browsers populate their voice list a moment after the first request.
    if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged',tryVoice);
    loadTimer = window.setTimeout(() => {
      if (!tryVoice()) fail('Urdu voice is not installed on this device. Add an Urdu voice in your phone or computer speech settings. / اس ڈیوائس میں اردو آواز موجود نہیں، براہِ کرم اردو آواز انسٹال کریں۔');
    }, 1200);
  }
  return {stop};
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

  const trackChatSpeech = useRef(null);
  useEffect(() => () => {
    // Speech must stop when private family summaries are closed.
    trackChatSpeech.current?.stop();
    trackChatSpeech.current = null;
  }, []);
  function stopReading() {
    trackChatSpeech.current?.stop();
    trackChatSpeech.current = null;
    setSpeaking('');
  }
  function readAloud(language) {
    setVoiceError('');
    if (speaking === language) { stopReading(); return; }
    stopReading();
    const report = spokenTextRef.current;
    if (!report) return;
    const content = [language === 'ur' ? report.ur : report.en,
      ...(report.lines || []).map(line => language === 'ur' ? line.ur : line.en)]
      .filter(value => typeof value === 'string' && value.trim())
      .join(language === 'ur' ? '۔ ' : ' ');
    const controller = trackStartSpeech(content, language,
      () => { trackChatSpeech.current = null; setSpeaking(''); },
      message => { trackChatSpeech.current = null; setSpeaking(''); setVoiceError(message); });
    if (controller.error) { setVoiceError(controller.error); return; }
    trackChatSpeech.current = controller;
    setSpeaking(language);
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
    setReportEmpty(lines.length === 0 || lines.every(line => line.noUpdates));
    const range = p.days && p.days > 1 ? ` (${prettyDate(shiftDay(dayISO(),-(p.days-1)))} – ${prettyDate(dayISO())})` : '';
    const report = {role:'bot',en:`${p.en}${range} · ${s.en} — saved updates.`,ur:`${p.ur}${range} · ${s.ur} — محفوظ شدہ اپڈیٹس:`,lines};
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
    const dateInfo = (step === 'period' || !isSingleOption) ? parseChatDate(value, selectedDate) : null;
    const topicInfo = (step === 'period' && isSingleOption) ? null : parseChatTopic(value);

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
      const chosenLabel = CHAT_PERIODS.find(x => x.id === dateInfo.period);
      setMessages([...next, {role:'bot',en:`${chosenLabel?.en || prettyDate(dateInfo.date || selectedDate)} selected. What would you like to know about?`,ur:`${chosenLabel?.ur || 'منتخب تاریخ'} منتخب۔ آپ کس چیز کی سمری چاہتے ہیں؟`}]);
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
              {step === 'period' && option.id !== 'selected' && <span className="tmv-chat-choice-num">{option.id === 'today' ? '1.' : option.id === 'week' ? '2.' : '3.'}</span>}
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

/* V41 — One optional private photo for a selected journal day. No external assets. */
function compressMomentPhoto(file) {
  if (!file || !file.type.startsWith('image/')) return Promise.reject(new Error('Please select an image.'));
  if (file.size > 12 * 1024 * 1024) return Promise.reject(new Error('Please choose an image under 12 MB.'));
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      try {
        let side = 720;
        let data = '';
        while (side >= 320) {
          const scale = Math.min(1, side / Math.max(image.naturalWidth, image.naturalHeight));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
          const ctx = canvas.getContext('2d', {alpha:false});
          if (!ctx) throw new Error('Image processing is unavailable.');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0,0,canvas.width,canvas.height);
          ctx.drawImage(image,0,0,canvas.width,canvas.height);
          for (const quality of [0.72,0.58,0.43]) {
            data = canvas.toDataURL('image/jpeg',quality);
            if (data.length <= 90000) { resolve(data); return; }
          }
          side = Math.floor(side * 0.75);
        }
        reject(new Error('This photo cannot be compressed enough. Please choose another.'));
      } catch (err) { reject(err); }
    };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('This image could not be opened.')); };
    image.src = url;
  });
}

function FamilyMoment({date, ownerMode, ownerPin}) {
  const [photo, setPhoto] = useState(null);
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState(false);
  const [error, setError] = useState('');
  const uploadInput = useRef(null);
  const liveDate = useRef(date);
  liveDate.current = date;
  useEffect(() => {
    let alive = true;
    setPhoto(null);
    setView(false);
    setError('');
    api({action:'moment_get',date})
      .then(data => {if(alive) setPhoto(data.photo || null);})
      .catch(() => {if(alive) setError('Photo unavailable.');});
    return () => {alive=false;};
  },[date]);
  async function upload(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !ownerMode || !ownerPin) return;
    setBusy(true);setError('');
    try {
      const image = await compressMomentPhoto(file);
      const result = await api({action:'moment_save',date,pin:ownerPin,image});
      if (liveDate.current === date) {setPhoto(result.photo);setView(false);}
    } catch (err) {setError(err.message || 'Could not save photo.');}
    finally {setBusy(false);}
  }
  async function remove() {
    if (!ownerMode || !ownerPin || !window.confirm('Remove the photo for this date?')) return;
    setBusy(true);setError('');
    try {await api({action:'moment_delete',date,pin:ownerPin});if (liveDate.current === date) {setPhoto(null);setView(false);}}
    catch (err) {setError(err.message || 'Could not remove photo.');}
    finally {setBusy(false);}
  }
  if (!photo && !ownerMode) return null;
  return <div className="tmv-v41-moment">
    {ownerMode && <input ref={uploadInput} className="tmv-v41-photo-input" type="file" accept="image/*"
      aria-label="Choose a photo for the selected date" onChange={upload} disabled={busy}/>}
    {photo ? <button className="tmv-v41-moment-thumb" type="button" onClick={()=>setView(true)}
      aria-label={`View Ahsan's moment from ${prettyDate(date)}`} title="Today's Moment">
      <img src={photo} alt={`A moment from ${prettyDate(date)}`}/><span>Moment</span>
    </button> : <button className="tmv-v41-moment-add" type="button" onClick={()=>uploadInput.current?.click()} disabled={busy}
      aria-label="Add today's moment photo" title="Add a photo"><Camera size={15}/><span>{busy?'Saving…':'Add moment'}</span></button>}
    {error && <span className="tmv-v41-moment-error" role="status">{error}</span>}
    {view && photo && <div className="tm-modal-backdrop tmv-v41-photo-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setView(false);}}>
      <section className="tmv-v41-photo-modal" role="dialog" aria-modal="true" aria-label="Today's moment">
        <button type="button" className="tmv-v41-photo-close" onClick={()=>setView(false)} aria-label="Close photo"><X size={19}/></button>
        <img src={photo} alt={`Ahsan's moment from ${prettyDate(date)}`}/>
        <div className="tmv-v41-photo-caption"><span><ImageIcon size={16}/> {prettyDate(date)} · Ahsan's moment</span>
        {ownerMode && <span className="tmv-v41-photo-tools"><button onClick={()=>uploadInput.current?.click()} disabled={busy} type="button">Replace</button><button onClick={remove} disabled={busy} type="button">Remove</button></span>}
        </div>
      </section>
    </div>}
  </div>;
}

/* V42 — Life Map. Lazy-load map tiles only when the family opens this popup.
   Geolocation only starts after the owner explicitly presses Start Live. */
let lifeMapLeafletPromise;
function loadLifeMapLeaflet() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Map requires a browser.'));
  if (window.L?.map) return Promise.resolve(window.L);
  if (!lifeMapLeafletPromise) lifeMapLeafletPromise = new Promise((resolve,reject) => {
    if (!document.querySelector('link[data-tmv-life-map]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
      css.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      css.crossOrigin = 'anonymous';
      css.dataset.tmvLifeMap = 'true';
      document.head.appendChild(css);
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = () => window.L?.map ? resolve(window.L) : reject(new Error('Map could not initialize.'));
    script.onerror = () => reject(new Error('Map tiles are unavailable. Check your internet connection.'));
    document.head.appendChild(script);
  }).catch(err => {lifeMapLeafletPromise = null;throw err;});
  return lifeMapLeafletPromise;
}

function LifeMapModal({mapData, tracking, ownerMode, busy, error, onClose, onStart, onStop, onMark, onClear}) {
  const mapHolder = useRef(null);
  const instance = useRef(null);
  const layers = useRef(null);
  const firstFocus = useRef(false);
  const followLive = useRef(true);
  const lastFocus = useRef(null);
  const [ready,setReady] = useState(false);
  const [mapError,setMapError] = useState('');
  const [countryFilter,setCountryFilter] = useState('All');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [formBusy,setFormBusy] = useState(false);
  const visits = Array.isArray(mapData.visited) ? mapData.visited : [];
  const countries = [...new Set(visits.map(v => v.country).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  const displayed = countryFilter === 'All' ? visits : visits.filter(v => v.country === countryFilter);
  const live = mapData.live && Number.isFinite(mapData.live.lat) && Number.isFinite(mapData.live.lng) ? mapData.live : null;
  const sharing = Boolean(mapData.sharing);
  const fresh = Boolean(live && mapData.isFresh);
  const accuracy = live && Number.isFinite(live.accuracy) ? Math.round(live.accuracy) : null;
  const gpsZoom = accuracy !== null && accuracy <= 70 ? 17 : accuracy !== null && accuracy <= 220 ? 16 : 15;
  const address = live?.address && typeof live.address === 'string' ? live.address : '';
  const locationLabel = fresh ? 'Current GPS location' : 'Last shared GPS location';
  useEffect(() => {if (!visits.length) setCountryFilter('All');},[visits.length]);

  useEffect(() => {
    const key = e => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown',key);
    return () => document.removeEventListener('keydown',key);
  },[onClose]);

  useEffect(() => {
    let alive = true;
    loadLifeMapLeaflet().then(L => {
      if (!alive || !mapHolder.current) return;
      const map = L.map(mapHolder.current,{zoomControl:false,scrollWheelZoom:false,worldCopyJump:true,
        attributionControl:true}).setView([20,10],2);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
      }).addTo(map);
      L.control.zoom({position:'bottomright'}).addTo(map);
      instance.current = map;
      layers.current = L.layerGroup().addTo(map);
      setReady(true);
      window.setTimeout(() => {if(alive) map.invalidateSize();},100);
    }).catch(e => {if(alive) setMapError(e.message || 'Map unavailable.');});
    return () => {alive=false;instance.current?.remove();instance.current=null;layers.current=null;};
  },[]);

  useEffect(() => {
    if (!ready || !instance.current || !window.L) return;
    const map=instance.current;
    const L=window.L;
    layers.current?.clearLayers();
    const bounds=[];
    displayed.forEach(place => {
      if (!Number.isFinite(place.lat) || !Number.isFinite(place.lng)) return;
      const point=[place.lat,place.lng];
      const marker=L.circleMarker(point,{radius:6,color:'#fff',weight:2,
        fillColor:'#d3a166',fillOpacity:.97}).addTo(layers.current);
      const label=document.createElement('span');
      label.textContent=`Visited: ${place.city}, ${place.country}`;
      marker.bindPopup(label);
      bounds.push(point);
    });
    if (live && countryFilter === 'All') {
      const point=[live.lat,live.lng];
      if (accuracy !== null && accuracy > 0) {
        L.circle(point,{radius:accuracy,color:'#338b6c',weight:1,fillColor:'#4fac80',
          fillOpacity:.10,opacity:.45,interactive:false}).addTo(layers.current);
      }
      const marker=L.marker(point,{
        icon:L.divIcon({className:`tmv-v42-current-pin${fresh?'':' is-old'}`,
          html:'<span class="tmv-v42-pin-pulse"><i></i></span>',iconSize:[28,28],iconAnchor:[14,14]}),
        title:locationLabel,
      }).addTo(layers.current);
      const popup=document.createElement('div');
      const title=document.createElement('strong');title.textContent=locationLabel;
      const detail=document.createElement('div');detail.textContent=address || `${live.lat.toFixed(6)}, ${live.lng.toFixed(6)}`;
      popup.append(title,detail);marker.bindPopup(popup);
      const movedFar=!lastFocus.current || map.distance(lastFocus.current,point)>35;
      if (followLive.current && (!firstFocus.current || movedFar)) {
        map.setView(point,gpsZoom,{animate:firstFocus.current && map.distance(map.getCenter(),point)<6000});
        lastFocus.current=point;
        firstFocus.current=true;
      }
    } else if (!firstFocus.current && bounds.length) {
      if (bounds.length===1) map.setView(bounds[0],12);
      else map.fitBounds(L.latLngBounds(bounds),{padding:[40,40],maxZoom:12});
      firstFocus.current=true;
    }
  },[ready,visits,live,countryFilter,fresh,accuracy,address,gpsZoom,locationLabel]);

  function focusOnGPS() {
    if (!live || !instance.current) return;
    followLive.current=true;
    lastFocus.current=[live.lat,live.lng];
    instance.current.flyTo([live.lat,live.lng],gpsZoom,{duration:.55});
  }
  function selectCountry(next) {setCountryFilter(next);firstFocus.current=false;followLive.current=next==='All';}
  function focusVisited(place) {
    if (!instance.current || !Number.isFinite(place.lat) || !Number.isFinite(place.lng)) return;
    followLive.current=false;
    instance.current.flyTo([place.lat,place.lng],13,{duration:.55});
  }
  async function markCity(event) {
    event.preventDefault();
    if (!city.trim() || !country.trim() || formBusy) return;
    setFormBusy(true);
    try {if(await onMark(city.trim(),country.trim())){setCity('');setCountry('');}}
    finally {setFormBusy(false);}
  }
  return <div className="tmv-v42-overlay" onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <section className="tmv-v42-panel" role="dialog" aria-modal="true" aria-label="Ahsan's Life Map">
      <div className="tmv-v42-header">
        <span className="tmv-v42-title-icon"><MapPinned size={20}/></span>
        <div className="tmv-v42-heading"><span className="tmv-v43-eyebrow">PRIVATE FAMILY MAP</span><h2>Ahsan's Life Map</h2><p>Where Ahsan is &amp; where he's been</p></div>
        <button type="button" className="tmv-v42-close" onClick={onClose} aria-label="Close Life Map"><X size={19}/></button>
      </div>
      <div className="tmv-v42-summary">
        <span className={`tmv-v42-live-status${fresh?' is-live':''}`}><span className="tmv-v42-live-dot"/>{fresh?'Live now':sharing?(tracking?'Finding GPS':'Last shared'):'Not sharing'}</span>
        <span><MapPin size={13}/> {visits.length} {visits.length===1?'city':'cities'}</span>
        <span><Globe2 size={13}/> {countries.length} {countries.length===1?'country':'countries'}</span>
      </div>
      <div className="tmv-v42-map-wrap">
        <div ref={mapHolder} className="tmv-v42-map" role="application" aria-label="World map with current GPS marker and visited city markers"/>
        {!ready && <div className="tmv-v42-map-loading"><Globe2 size={22}/>{mapError || 'Opening your map…'}</div>}
        {ready && live && <button type="button" className="tmv-v43-locate" onClick={focusOnGPS} title="Center map on Ahsan's latest GPS position" aria-label="Center on Ahsan's location"><Navigation size={15}/> <span>My location</span></button>}
        <div className="tmv-v43-map-key" aria-label="Map legend"><i className="tmv-v43-key-live"/>GPS <i className="tmv-v43-key-city"/>Visited</div>
      </div>
      <div className="tmv-v43-address" aria-live="polite">
        <span className="tmv-v43-address-icon"><MapPin size={18}/></span>
        <div className="tmv-v43-address-copy">
          <div className="tmv-v43-address-top"><strong>{live?locationLabel:'Shared location'}</strong>{live && <small>{fresh?'Live GPS':'Last reported'}</small>}</div>
          {live ? <>
            <p>{address || 'Street address not available yet — showing GPS coordinates.'}</p>
            <div className="tmv-v43-address-meta">
              <span>{live.lat.toFixed(6)}, {live.lng.toFixed(6)}</span>
              <span>Accuracy {accuracy === null ? 'unknown' : `±${accuracy} m`}</span>
              <span>Updated {new Date(live.seenAt).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
            </div>
          </> : <p>{sharing ? 'Waiting for a GPS update from Ahsan’s device.' : 'Ahsan can share his location using Start Live.'}</p>}
        </div>
      </div>
      <div className="tmv-v42-actions">
        {ownerMode ? <>
          {!tracking && <button type="button" className="tmv-v42-start" onClick={onStart} disabled={busy}><Navigation size={15}/> {sharing?'Update my location':'Start Live'}</button>}
          {(tracking || sharing) && <button type="button" className="tmv-v42-stop" onClick={onStop} disabled={busy}><Radio size={15}/> Stop sharing</button>}
        </> : <span className="tmv-v42-viewer-note">Shared privately by Ahsan</span>}
        <span className="tmv-v42-hint">GPS refreshes while Ahsan's app is open. The last shared position stays visible until he stops; background GPS isn't available in this web app.</span>
      </div>
      {error && <p className="tmv-v42-error" role="status">{error}</p>}
      {live && accuracy !== null && accuracy > 100 && <p className="tmv-v43-accuracy-tip"><Navigation size={12}/> Approximate GPS (±{accuracy} m). For greater precision, open Track Me on a GPS-enabled phone and allow Precise Location.</p>}
      <div className="tmv-v42-city-heading"><strong>Places visited</strong><span>City history, separate from live GPS</span></div>
      {countries.length > 1 && <div className="tmv-v42-country-filters" aria-label="Filter visited countries">
        {['All',...countries].map(name=><button type="button" className={countryFilter===name?'is-active':''} key={name} onClick={()=>selectCountry(name)}>{name}</button>)}
      </div>}
      <div className="tmv-v42-city-list">
        {displayed.length ? [...displayed].reverse().map(place=><button type="button" key={place.key} className="tmv-v42-city-chip"
          onClick={()=>focusVisited(place)} title={`View visited ${place.city}, ${place.country}`}>
          <MapPin size={12}/><span>{place.city}</span><small>{place.country}</small>
        </button>):<p className="tmv-v42-empty">No cities visited yet.</p>}
      </div>
      {ownerMode && <details className="tmv-v43-manage">
        <summary>Manage visited places</summary>
        <div className="tmv-v42-owner-extra">
          <form className="tmv-v42-mark-form" onSubmit={markCity}>
            <span className="tmv-v42-mark-label">Save current city</span>
            <input aria-label="Current city" placeholder="City" maxLength={72} value={city} onChange={e=>setCity(e.target.value)}/>
            <input aria-label="Country" placeholder="Country" maxLength={72} value={country} onChange={e=>setCountry(e.target.value)}/>
            <button type="submit" disabled={formBusy||!sharing||!live||!city.trim()||!country.trim()} title="Save this city using the last shared GPS position"><Plus size={14}/> Save</button>
          </form>
          <button className="tmv-v42-clear" type="button" onClick={onClear} disabled={busy||(!visits.length&&!sharing)}><Trash2 size={13}/> Erase map history</button>
        </div>
      </details>}
      <p className="tmv-v42-privacy"><LockKeyhole size={12}/> Visible only to signed-in family. GPS and approximate street names use OpenStreetMap services; an address may describe the nearest mapped road, not an exact building.</p>
    </section>
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
  /* V41: Countdown for saved important dates only; never assume an application failed. */
  const importantDate = section === 'university' && item ? (meta.upcomingDate || item.dueDate || '') : '';
  const daysUntilImportant = /^\d{4}-\d{2}-\d{2}$/.test(importantDate)
    ? Math.round((Date.parse(`${importantDate}T12:00:00Z`) - Date.parse(`${dayISO()}T12:00:00Z`)) / 86400000)
    : null;
  const needsAction = ['planning','upcoming'].includes(meta.applicationStatus || '') && item?.status !== 'done';
  const deadlineInfo = daysUntilImportant === null ? ''
    : daysUntilImportant === 0 ? 'Today'
    : daysUntilImportant === 1 ? 'Tomorrow'
    : daysUntilImportant > 1 && daysUntilImportant <= 14 ? `${daysUntilImportant} days left`
    : daysUntilImportant < 0 && needsAction ? 'Date passed · check status' : '';
  const extra = section === 'university' && item
    ? [meta.program && !todayNotes.length ? meta.program : '', importantDate ? `Important: ${prettyDate(importantDate)}` : '', deadlineInfo].filter(Boolean).join(' · ')
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
  const [compareOpen, setCompareOpen] = useState(false);
  const model = useMemo(() => buildMonthlyProgress({entries, days, quran, selectedDate}),
    [entries, days, quran, selectedDate.slice(0,7)]);
  const comparison = useMemo(() => {
    const today = dayISO();
    const yesterday = shiftDay(today, -1);
    const nowModel = buildMonthlyProgress({entries, days, quran, selectedDate: today});
    const beforeModel = today.slice(0,7) === yesterday.slice(0,7)
      ? nowModel : buildMonthlyProgress({entries, days, quran, selectedDate: yesterday});
    const todayScore = nowModel.calendar.find(item => item.date === today)?.score ?? null;
    const yesterdayScore = beforeModel.calendar.find(item => item.date === yesterday)?.score ?? null;
    return { todayScore, yesterdayScore,
      difference: todayScore === null || yesterdayScore === null ? null : todayScore - yesterdayScore };
  }, [entries, days, quran]);
  const chosen = model.calendar.find(d => d.date === selectedDate);
  const active = chosen?.score !== null && !chosen?.future ? chosen : null;
  return <section className="tmv-v39-month-progress" aria-label={`Monthly recorded progress for ${model.monthName}`}>
    <div className="tmv-v39-month-header">
      <div className="tmv-v39-month-title"><TrendingUp size={16} aria-hidden="true"/>
        <h2>{model.monthName} Progress</h2>
        <span>Day 1–{model.numDays}</span>
      </div>
      <span className="tmv-v44-graph-actions">
        <span className="tmv-v39-month-recorded">{model.recorded} days recorded</span>
        <button className={`tmv-v44-compare-toggle${compareOpen ? ' is-on' : ''}`} type="button"
          onClick={() => setCompareOpen(value => !value)} aria-expanded={compareOpen}
          aria-label="Compare today with yesterday" title="Today vs Yesterday">
          <ArrowLeftRight size={14}/><span>Aaj vs Kal</span>
        </button>
      </span>
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
    {compareOpen && <div className="tmv-v44-compare-result" role="status" aria-label="Today versus yesterday recorded progress">
      <span><small>Yesterday</small><b>{comparison.yesterdayScore === null ? 'No data' : `${comparison.yesterdayScore}%`}</b></span>
      <ArrowLeftRight size={15} aria-hidden="true"/>
      <span><small>Today</small><b>{comparison.todayScore === null ? 'No data' : `${comparison.todayScore}%`}</b></span>
      <strong>{comparison.difference === null ? 'Not enough data' : comparison.difference === 0 ? 'Same score' : `${comparison.difference > 0 ? '+' : ''}${comparison.difference} points`}</strong>
    </div>}
  </section>;
}


/* V48: Weekly Seen by — Ahsan only */
const SEEN_NAMES={nasir:'Nasir',talat:'Talat',happa:'Happa',yamna:'Yamna'};
const seenTimeFmt = at => new Intl.DateTimeFormat('en-PK',{
  timeZone:'Asia/Karachi',hour:'numeric',minute:'2-digit',hour12:true}).format(new Date(at));
const seenDayFmt = at => new Intl.DateTimeFormat('en-PK',{
  timeZone:'Asia/Karachi',weekday:'short',day:'numeric',month:'short'}).format(new Date(at));
function SeenByWeekModal({onClose}) {
  const [data,setData]=useState(null);
  const [busy,setBusy]=useState(true);
  const [problem,setProblem]=useState('');
  useEffect(()=>{
    let active=true;
    api({action:'seen_get'}).then(value=>{if(active)setData(value);})
      .catch(error=>{if(active)setProblem(error?.message||'Could not load visits.');})
      .finally(()=>{if(active)setBusy(false);});
    const onKey=event=>{if(event.key==='Escape')onClose();};
    document.addEventListener('keydown',onKey);
    return ()=>{active=false;document.removeEventListener('keydown',onKey);};
  },[onClose]);
  const visits=Array.isArray(data?.visits)?data.visits:[];
  const grouped=Object.entries(visits.reduce((rows,v)=>{
    if(!SEEN_NAMES[v.viewer])return rows;
    (rows[v.viewer] ||= []).push(v);
    return rows;
  },{})).sort(([a],[b])=>Object.keys(SEEN_NAMES).indexOf(a)-Object.keys(SEEN_NAMES).indexOf(b));
  return <div className="tmv-v44-question-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <section className="tmv-v44-question-panel" role="dialog" aria-modal="true" aria-label="Seen by this week">
      <header className="tmv-v44-question-head">
        <span className="tmv-v44-question-mark"><Eye size={20}/></span>
        <span className="tmv-v44-question-heading"><strong>Seen by</strong><small>This week's family visits</small></span>
        <button type="button" className="tmv-v44-question-close" onClick={onClose} aria-label="Close Seen by"><X size={19}/></button>
      </header>
      {data && <div className="tmv-v44-questions-summary"><span>{data.weekStart} – {data.weekEnd}</span><span>Resets every Monday</span></div>}
      <div className="tmv-v44-question-body">
        {busy && <p className="tmv-v44-question-empty">Loading visits…</p>}
        {!busy && problem && <p className="tmv-v44-question-error" role="alert">{problem}</p>}
        {!busy && !problem && !visits.length && <p className="tmv-v44-question-empty">No visits recorded this week yet.</p>}
        {grouped.map(([viewer,rows])=><article className="tmv-v44-question-item" key={viewer}>
          <div className="tmv-v44-question-meta"><strong>{SEEN_NAMES[viewer]}</strong><span>{rows.length} visit{rows.length===1?'':'s'} this week</span></div>
          {rows.map((visit,i)=><p key={visit.at+'-'+i} style={{fontSize:'12px',margin:'5px 0'}}>{seenDayFmt(visit.at)} · {seenTimeFmt(visit.at)}</p>)}
        </article>)}
      </div>
    </section>
  </div>;
}

/* V49: compact family greeting and 30-second daily recap */
function FamilyTimeGreeting({viewer}) {
  const [hour,setHour]=useState(()=>new Date().getHours());
  useEffect(()=>{
    const refresh=()=>setHour(new Date().getHours());
    const timer=window.setInterval(refresh,60000);
    window.addEventListener('focus',refresh);
    document.addEventListener('visibilitychange',refresh);
    return ()=>{window.clearInterval(timer);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);};
  },[]);
  const greeting=hour<5?'Good night':hour<12?'Good morning':hour<17?'Good afternoon':hour<21?'Good evening':'Good night';
  return <>{greeting}, {FAMILY_IDENTITY[viewer]?.name || 'Family'}!</>;
}

/* No new API or storage: recap uses already-loaded, real daily records.
   Six slides x five seconds cover Today's Moment and each journal category. */
function AhsanToday30Modal({entries,prayerDays,quran,onClose}) {
  const [date]=useState(()=>dayISO());
  const [slide,setSlide]=useState(0);
  const [playing,setPlaying]=useState(true);
  const [finished,setFinished]=useState(false);
  const [photo,setPhoto]=useState(null);
  useEffect(()=>{
    let active=true;
    api({action:'moment_get',date}).then(result=>{
      if(active && typeof result.photo==='string' && result.photo.startsWith('data:image/jpeg;base64,'))setPhoto(result.photo);
    }).catch(()=>{});
    return ()=>{active=false;};
  },[date]);
  const slides=useMemo(()=>{
    const saved=Array.isArray(entries)?entries:[];
    const prayer=prayerDays?.[date]||{};
    const count=PRAYERS.filter(([key])=>prayer.group?.[key]||prayer.makeup?.[key]).length;
    const readings=(quran||[]).filter(item=>item.date===date);
    const pages=readings.reduce((sum,item)=>sum+Math.max(0,Number(item.pagesRead)||0),0);
    const changed=saved.filter(item=>
      (item.createdAt&&dayISO(item.createdAt)===date)||
      (item.updatedAt&&dayISO(item.updatedAt)===date)||
      (item.logs||[]).some(note=>note.createdAt&&dayISO(note.createdAt)===date)).length;
    const getReport=topic=>buildFamilyReport({entries:saved,prayerDays,quranEntries:quran||[],
      period:'selected',topic,selectedDate:date}).map(row=>row.en).filter(Boolean).join(' ');
    return [
      {title:'Ahsan’s Today',eyebrow:'THE DAILY SNAPSHOT',text:`${count} of 5 prayers recorded · ${pages} Quran pages · ${changed} work/life records updated today. Here is the complete section-by-section recap.`},
      {title:'Prayer',eyebrow:'01 / PRAYER',text:getReport('prayer')},
      {title:'Quran Reading',eyebrow:'02 / QURAN',text:getReport('quran')},
      {title:'Office Work',eyebrow:'03 / OFFICE',text:getReport('office')},
      {title:'University',eyebrow:'04 / UNIVERSITY',text:getReport('university')},
      {title:'Personal Life',eyebrow:'05 / PERSONAL',text:getReport('personal')},
    ];
  },[entries,prayerDays,quran,date]);
  useEffect(()=>{
    if(!playing)return undefined;
    const timer=window.setTimeout(()=>{
      if(slide>=slides.length-1){setPlaying(false);setFinished(true);}
      else setSlide(value=>value+1);
    },5000);
    return ()=>window.clearTimeout(timer);
  },[playing,slide,slides.length]);
  useEffect(()=>{
    const onKey=event=>{
      if(event.key==='Escape')onClose();
      if(event.key==='ArrowRight')setSlide(i=>Math.min(slides.length-1,i+1));
      if(event.key==='ArrowLeft')setSlide(i=>Math.max(0,i-1));
    };
    const onVisibility=()=>{if(document.visibilityState==='hidden')setPlaying(false);};
    document.addEventListener('keydown',onKey);
    document.addEventListener('visibilitychange',onVisibility);
    return ()=>{document.removeEventListener('keydown',onKey);document.removeEventListener('visibilitychange',onVisibility);};
  },[onClose,slides.length]);
  const current=slides[slide]||slides[0];
  const navButton={display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,
    border:'1px solid #d6e7db',borderRadius:9,background:'#f5faf6',color:'#245c43',
    padding:'8px 12px',minHeight:34,fontSize:12,fontWeight:600};
  return <div className="tmv-v44-question-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <section className="tmv-v44-question-panel" role="dialog" aria-modal="true" aria-label="Ahsan's Today in 30 Seconds">
      <header className="tmv-v44-question-head">
        <span className="tmv-v44-question-mark"><Play size={18}/></span>
        <span className="tmv-v44-question-heading"><strong>Today in 30 seconds</strong><small>{prettyDate(date)} · 6 short chapters</small></span>
        <button type="button" className="tmv-v44-question-close" onClick={onClose} aria-label="Close recap"><X size={19}/></button>
      </header>
      <div className="tmv-v44-question-body" style={{padding:'14px 16px 16px'}}>
        <div style={{display:'flex',gap:4,marginBottom:14}} aria-label={`Chapter ${slide+1} of ${slides.length}`}>
          {slides.map((item,i)=><span key={item.title} style={{height:4,flex:1,borderRadius:8,
            background:i<=slide?'#337e5b':'#e0ebe3'}}/>) }
        </div>
        <div style={{height:225,display:'flex',flexDirection:'column',justifyContent:'center',gap:12,overflow:'hidden'}}>
          <small style={{color:'#518063',fontWeight:750,fontSize:10,letterSpacing:'.10em'}}>{current.eyebrow}</small>
          <h2 style={{fontSize:22,fontWeight:750,margin:0,color:'#173c2d'}}>{current.title}</h2>
          {slide===0&&photo&&<img src={photo} alt="Today's Moment" style={{width:67,height:67,objectFit:'cover',borderRadius:11}}/>}
          <p style={{fontSize:13,lineHeight:1.65,color:'#46594d',margin:0,overflowY:'auto',overflowWrap:'anywhere'}}>
            {current.text}
          </p>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,marginTop:12}}>
          <button type="button" style={navButton} onClick={()=>{setSlide(i=>Math.max(0,i-1));setFinished(false);}} disabled={slide===0} aria-label="Previous chapter"><ChevronLeft size={16}/></button>
          <button type="button" style={navButton} onClick={()=>{
            if(finished){setSlide(0);setFinished(false);setPlaying(true);}
            else setPlaying(value=>!value);
          }} aria-label={finished?'Replay recap':playing?'Pause recap':'Play recap'}>
            {finished?<><Play size={15}/> Replay</>:playing?<><Pause size={15}/> Pause</>:<><Play size={15}/> Play</>}
          </button>
          <button type="button" style={navButton} onClick={()=>{setSlide(i=>Math.min(slides.length-1,i+1));setFinished(false);}} disabled={slide===slides.length-1} aria-label="Next chapter"><ChevronRight size={16}/></button>
        </div>
        <p style={{fontSize:10,color:'#799082',textAlign:'center',marginTop:9}}>Only today's saved updates · Pause or use arrows for details</p>
      </div>
    </section>
  </div>;
}

/* V51: Family-only language and automatic plain-language display.
   Original React records, editor fields and the underlying saved values remain untouched. */
const FAMILY_SCREEN_URDU = Object.freeze({
  'Family journal':'خاندانی روزنامچہ', 'Log out':'لاگ آؤٹ', 'Back to daily updates':'روزانہ کی اپڈیٹس پر واپس',
  'DAILY JOURNAL':'روزانہ کا احوال', 'THE DAILY JOURNAL':'روزانہ کا احوال',
  'Just the important moments, in one place.':'دن کی تمام اہم باتیں ایک جگہ۔',
  'Daily Life':'روزمرہ زندگی', 'Simple daily overview':'آج کا مختصر احوال',
  'Prayer':'نماز', 'Prayer Record':'نماز کا ریکارڈ', 'See prayer history':'نماز کی تاریخ دیکھیں',
  'Life & Progress':'زندگی اور پیش رفت', 'Life and progress':'زندگی اور پیش رفت',
  'Only what matters':'صرف اہم باتیں', 'Quran Reading':'قرآن کی تلاوت', 'Quran':'قرآن',
  'Office Work':'دفتر کا کام', 'Office':'دفتر', 'University':'یونیورسٹی',
  'Personal Life':'ذاتی زندگی', 'Personal Work':'ذاتی کام', 'Personal':'ذاتی',
  'Quick AI summary':'آسان خلاصہ', 'Daily summary assistant':'روزانہ کی معلومات کا معاون',
  'FAMILY UPDATE ASSISTANT':'خاندانی اپڈیٹس کا معاون',
  'English':'انگریزی', 'Today':'آج', 'Last 7 days':'پچھلے سات دن',
  'Last 30 days':'پچھلے تیس دن', 'Everything':'سب کچھ', 'Prayer today':'آج کی نماز',
  'Office work':'دفتری کام', 'Personal work':'ذاتی کام',
  'Listen in English':'انگریزی میں سنیں', 'Stop':'روکیں', 'Optional short AI note':'AI سے مختصر وضاحت',
  'Start another summary':'دوسرا خلاصہ دیکھیں', 'Privacy note':'رازداری کی معلومات',
  'Type a message':'پیغام لکھیں', 'Send message':'پیغام بھیجیں',
  'Ahsan’s day':'احسن کا دن', 'Ahsan’s Today':'احسن کا آج',
  'Today in 30 seconds':'آج کا احوال ۳۰ سیکنڈ میں',
  'THE DAILY SNAPSHOT':'آج کی مختصر جھلک',
  'No update':'نئی اپڈیٹ نہیں', 'Recorded':'درج شدہ',
  'Read more':'مزید پڑھیں', 'Read less':'کم دکھائیں',
  'Daily prayers, as recorded by':'روزانہ کی نمازیں، جیسا کہ درج ہیں',
  'Past 7 days':'گزشتہ سات دن', 'Jamaat':'جماعت', 'Qaza':'قضا',
  'Fajr':'فجر', 'Dhuhr':'ظہر', 'Asr':'عصر', 'Maghrib':'مغرب', 'Isha':'عشاء',
  'Progress in the 15-line Quran, saved by':'پندرہ سطری قرآن کی محفوظ تلاوت، درج کی گئی',
  'Reading history':'تلاوت کی تاریخ', 'pages recorded in total':'کل ریکارڈ شدہ صفحات',
  'Para':'پارہ', 'Page':'صفحہ', 'Pages':'صفحات',
  'Projects, daily work and progress.':'پروجیکٹس، روزانہ کا کام اور پیش رفت۔',
  'Applications, interviews and important dates.':'درخواستیں، انٹرویوز اور اہم تاریخیں۔',
  'Personal goals and updates.':'ذاتی مقاصد اور اپڈیٹس۔',
  'No activities saved here yet.':'یہاں ابھی کوئی سرگرمی محفوظ نہیں ہوئی۔',
  'No Quran readings have been recorded yet.':'ابھی قرآن کی کوئی تلاوت محفوظ نہیں ہوئی۔',
  'Find a specific activity':'کوئی خاص سرگرمی تلاش کریں',
  'Search':'تلاش', 'Progress':'پیش رفت', 'All':'تمام',
  'To Do':'کرنا باقی ہے', 'In Progress':'کام جاری ہے', 'Completed':'مکمل',
  'Planning':'منصوبہ بندی', 'Applied':'درخواست جمع ہو گئی',
  'Interview':'انٹرویو', 'Waiting':'انتظار',
  'Latest update':'تازہ اپڈیٹ', 'More details (optional)':'مزید تفصیل (اختیاری)',
  'No updates yet today':'آج ابھی کوئی اپڈیٹ نہیں ہوئی',
  'No updates recorded for this date':'اس تاریخ کے لیے کوئی اپڈیٹ محفوظ نہیں',
  'Family Questions':'گھر والوں کے سوالات', 'Ask Ahsan':'احسن سے پوچھیں',
  'Your private family inbox':'خاندان کے سوالات',
  'One little question, every day':'ہر روز ایک چھوٹا سا سوال',
  'Reply to question':'سوال کا جواب دیں', 'Edit reply':'جواب میں تبدیلی',
  'Send question':'سوال بھیجیں', 'Your question has been sent to Ahsan.':'آپ کا سوال احسن کو بھیج دیا گیا ہے۔',
  'Awaiting Ahsan’s reply':'احسن کے جواب کا انتظار',
  'Send love':'محبت بھیجیں', 'Remove love':'محبت واپس لیں',
  'Life Map':'زندگی کا نقشہ', 'Visited places':'دیکھی ہوئی جگہیں',
  'Live location':'موجودہ مقام', 'Current location':'موجودہ مقام',
  'Show more':'مزید دکھائیں', 'Close':'بند کریں',
  'Good morning':'صبح بخیر', 'Good afternoon':'دوپہر بخیر',
  'Good evening':'شام بخیر', 'Good night':'شب بخیر',
  'Today’s Moment':'آج کی یاد', "Today's Moment":'آج کی یاد',
  'Date':'تاریخ', 'No data':'کوئی معلومات نہیں',
  'Yesterday':'کل', 'Today vs Yesterday':'آج اور کل کا موازنہ',
  'A private family journal':'ایک نجی خاندانی روزنامچہ',
  'Family sign in':'خاندان کا لاگ اِن', 'Welcome back.':'واپسی پر خوش آمدید',
  'Save':'محفوظ کریں', 'Cancel':'منسوخ کریں', 'Delete':'حذف کریں',
  'Pause':'روکیں', 'Play':'چلائیں', 'Replay':'دوبارہ چلائیں',
  'Previous chapter':'پچھلا حصہ', 'Next chapter':'اگلا حصہ',
  '30s':'۳۰ ثانیے'
});
const FAMILY_TECH_TERMS = Object.freeze([
  ['ERP','business management software','کاروبار چلانے والا سافٹ ویئر'],
  ['SaaS','software used through the internet','انٹرنیٹ کے ذریعے استعمال ہونے والا سافٹ ویئر'],
  ['API','a way for two software systems to exchange information','دو سافٹ ویئر کے درمیان معلومات پہنچانے کا طریقہ'],
  ['webhook','an automatic message between systems','سسٹمز کے درمیان خودکار اطلاع'],
  ['deployment','making an app available to use','ایپ کو استعمال کے لیے جاری کرنا'],
  ['deploy','make the app live','ایپ کو آن لائن چلانا'],
  ['migration','moving software or data to a new system','پرانے نظام سے نئے نظام میں منتقلی'],
  ['database','a place where information is stored','معلومات محفوظ کرنے کی جگہ'],
  ['server','a computer that runs an online service','آن لائن سروس چلانے والا کمپیوٹر'],
  ['backend','the part of an app that works behind the scenes','ایپ کا پس منظر میں کام کرنے والا حصہ'],
  ['frontend','the part of an app that users see','ایپ کا نظر آنے والا حصہ'],
  ['UI','the app screen and controls','ایپ کی سکرین اور بٹن'],
  ['UX','how easy an app is to use','ایپ استعمال کرنے کی سہولت'],
  ['authentication','checking who is signing in','لاگ اِن کرنے والے کی شناخت کی جانچ'],
  ['authorization','checking what a user is allowed to do','صارف کو کس کام کی اجازت ہے اس کی جانچ'],
  ['OAuth','secure sign-in through another service','دوسری سروس کے ذریعے محفوظ لاگ اِن'],
  ['SSL','security that protects information sent online','انٹرنیٹ پر معلومات کو محفوظ رکھنے کا نظام'],
  ['HTTPS','a secure connection to a website','ویب سائٹ کا محفوظ رابطہ'],
  ['DNS','the system that finds websites by their names','ویب سائٹ کے نام سے اس کا پتہ تلاش کرنے کا نظام'],
  ['domain','the web address name','ویب سائٹ کا نام یا پتہ'],
  ['hosting','keeping a website available online','ویب سائٹ کو انٹرنیٹ پر چلانے کی سہولت'],
  ['GitHub','a service for storing and managing code','پروگرام کا کوڈ محفوظ رکھنے کی سروس'],
  ['Git','a way to track code changes','کوڈ میں تبدیلیوں کا ریکارڈ'],
  ['repository','a project code collection','پروجیکٹ کے کوڈ کا ذخیرہ'],
  ['commit','a saved code change','کوڈ میں محفوظ کردہ تبدیلی'],
  ['pull request','a request to review a code change','کوڈ میں تبدیلی کی منظوری کی درخواست'],
  ['bug','a software problem','سافٹ ویئر کی خرابی'],
  ['debug','find and fix a software problem','سافٹ ویئر کی خرابی تلاش کرکے درست کرنا'],
  ['integration','connecting two systems','دو سسٹمز کو آپس میں ملانا'],
  ['automation','making repeated tasks happen automatically','کام کا خود بخود ہونا'],
  ['cloud','computers and services available on the internet','انٹرنیٹ پر دستیاب کمپیوٹر اور سروسز'],
  ['CRM','software for managing customer relationships','گاہکوں کے ریکارڈ اور رابطے کا نظام'],
  ['SDK','tools for building software','سافٹ ویئر بنانے کے اوزار'],
  ['JSON','a structured way to share data','معلومات کو ترتیب سے لکھنے کا طریقہ'],
  ['CSV','a simple spreadsheet-style data file','جدول کی شکل میں ڈیٹا کی فائل'],
  ['AI','software that can help understand or generate information','معلومات سمجھنے میں مدد دینے والی مصنوعی ذہانت'],
  ['LLM','an AI system that understands and writes text','متن سمجھنے اور لکھنے والا AI نظام'],
  ['algorithm','a set of steps for completing a task','کام مکمل کرنے کے مرحلہ وار اصول'],
  ['cache','temporarily saved information for faster use','تیز استعمال کے لیے عارضی محفوظ معلومات'],
  ['sync','keeping information matched between places','دو جگہوں کی معلومات ایک جیسی رکھنا'],
  ['analytics','understanding results using data','ڈیٹا سے نتائج سمجھنے کا طریقہ'],
  ['dashboard','a screen showing important information','اہم معلومات دکھانے والی سکرین'],
  ['module','an individual feature or part of a system','سسٹم کا الگ حصہ یا سہولت'],
  ['customization','changing software for a specific need','ضرورت کے مطابق سافٹ ویئر میں تبدیلی'],
  ['framework','basic tools used to build an app','ایپ بنانے کا بنیادی ڈھانچہ'],
  ['codebase','all the code that makes up the app','ایپ کا مکمل کوڈ'],
  ['build','preparing software to run','سافٹ ویئر چلانے کے لیے تیار کرنا'],
  ['runtime','when a software program is running','جب پروگرام چل رہا ہو'],
  ['Vite','a tool for building web applications','ویب ایپ تیار کرنے کا اوزار'],
  ['React','a tool for making website screens','ویب سائٹ کی سکرینیں بنانے والا ٹول'],
  ['Odoo','business management software','کاروباری انتظام کا سافٹ ویئر'],
]);
const FAMILY_TECH_RE = /\b(?:ERP|SaaS|API|webhook|deployment|deploy|migration|database|server|backend|frontend|UI|UX|authentication|authorization|OAuth|SSL|HTTPS|DNS|domain|hosting|GitHub|Git|repository|commit|pull request|bug|debug|integration|automation|cloud|CRM|SDK|JSON|CSV|AI|LLM|algorithm|cache|sync|analytics|dashboard|module|customization|framework|codebase|build|runtime|Vite|React|Odoo)\b/i;
const FAMILY_TEXT_CACHE = new Map();
const FAMILY_TEXT_PENDING = new Map();
let familyQueue = [];
let familyQueueTimer = null;
function familySimplifyKnown(source,language){
  const terms=[];
  for(const [term,en,ur] of FAMILY_TECH_TERMS){
    const esc=term.replace(/[.*+?^${}()|[\]\\]/g,'\\/* V44 — family question inbox. Uses existing individual family logins and owner PIN. */');
    if(new RegExp('(^|[^a-z0-9])'+esc+'(?=$|[^a-z0-9])','i').test(source)) terms.push(`${term}: ${language==='ur'?ur:en}`);
    if(terms.length===2)break;
  }
  if(!terms.length)return source;
  // Compact inline explanation: no extra cards, popups or additional layout sections.
  return source+' ('+terms.join('; ')+')';
}
function familyQueueRewrite(source,language){
  const key=language+'\u0000'+source;
  if(FAMILY_TEXT_CACHE.has(key))return Promise.resolve(FAMILY_TEXT_CACHE.get(key));
  if(FAMILY_TEXT_PENDING.has(key))return FAMILY_TEXT_PENDING.get(key);
  const promise=new Promise(resolve=>{
    familyQueue.push({key,source,language,resolve});
    if(familyQueueTimer===null)familyQueueTimer=window.setTimeout(async()=>{
      familyQueueTimer=null;
      const queued=familyQueue;familyQueue=[];
      for(let k=0;k<queued.length;){
        const batch=[];
        let chars=0;
        while(k<queued.length&&batch.length<7&&(chars+queued[k].source.length<=2600||!batch.length)){
          batch.push(queued[k]);chars+=queued[k].source.length;k+=1;
        }
        const groups=new Map();
        batch.forEach(item=>{const arr=groups.get(item.language)||[];arr.push(item);groups.set(item.language,arr);});
        await Promise.all([...groups.entries()].map(async([lang,items])=>{
          try {
            const result=await api({action:'family_text',language:lang,texts:items.map(x=>x.source)});
            const translated=Array.isArray(result.texts)?result.texts:[];
            items.forEach((item,index)=>{
              const value=typeof translated[index]==='string'&&translated[index].trim()?translated[index]:item.source;
              FAMILY_TEXT_CACHE.set(item.key,value);item.resolve(value);FAMILY_TEXT_PENDING.delete(item.key);
            });
          }catch(_){items.forEach(item=>{item.resolve(item.source);FAMILY_TEXT_PENDING.delete(item.key);});}
        }));
      }
    },120);
  });
  FAMILY_TEXT_PENDING.set(key,promise);
  return promise;
}
function familyScreenTransform(root,language){
  const seen=new WeakMap();
  const touched=new Set();
  const hidden=[];
  const attributes=new Map();
  let active=true;
  const excluded='script,style,noscript,textarea,input,select,option,[contenteditable="true"],[data-family-lang-ignore="true"]';
  const shouldExplain=(value,el)=>isDynamic(el)&&value.length>3&&FAMILY_TECH_RE.test(value);
  const isDynamic=(el)=>Boolean(el?.closest('.tmv-task-title,.tmv-task-description,.tmv-task-meta,.tmv-task-update,.tmv-log-entry,.tmv-v32-row,.tmv-v32-life,.tmv-ai-insight,.tmv-chat-report-line,.tmv-v44-question-item,.tmv-reading-history'));
  function convertNode(node){
    if(!active||!node?.parentElement||node.parentElement.closest(excluded))return;
    const element=node.parentElement;
    const originalValue=node.nodeValue||'';
    const previous=seen.get(node);
    if(previous&&originalValue===previous.applied)return;
    const source=previous&&originalValue===previous.source?previous.source:originalValue;
    const trimmed=source.trim();
    if(!trimmed||!/[A-Za-z\u0600-\u06ff]/.test(trimmed))return;
    if(trimmed.length>3500)return;
    const isUrdu=/[\u0600-\u06ff]/.test(trimmed);
    const leading=source.match(/^\s*/)?.[0]||'';
    const trailing=source.match(/\s*$/)?.[0]||'';
    let base=trimmed;
    if(language==='ur'&&FAMILY_SCREEN_URDU[trimmed])base=FAMILY_SCREEN_URDU[trimmed];
    else if(language==='en'&&shouldExplain(trimmed,element))base=familySimplifyKnown(trimmed,'en');
    else if(language==='ur'&&isUrdu&&FAMILY_TECH_RE.test(trimmed))base=familySimplifyKnown(trimmed,'ur');
    const entry={source,applied:leading+base+trailing};
    seen.set(node,entry);touched.add(node);
    if(node.nodeValue!==entry.applied)node.nodeValue=entry.applied;
    // Full Urdu translation of new/free-form content and English jargon simplification.
    const needsAI=(language==='ur'&&!isUrdu&&!FAMILY_SCREEN_URDU[trimmed]) ||
      (language==='en'&&isDynamic(element)&&!isUrdu&&!FAMILY_SCREEN_URDU[trimmed]&&trimmed.length>=8);
    if(!needsAI||trimmed.length<4)return;
    const chunks=[];
    let remaining=trimmed;
    while(remaining.length>950){
      let split=remaining.lastIndexOf(' ',900);
      if(split<500)split=900;
      chunks.push(remaining.slice(0,split).trim());
      remaining=remaining.slice(split).trim();
    }
    if(remaining)chunks.push(remaining);
    Promise.all(chunks.map(chunk=>familyQueueRewrite(chunk,language))).then(parts=>{
      const output=parts.join(' ');
      if(!active||!node.isConnected||seen.get(node)!==entry||node.nodeValue!==entry.applied)return;
      let next=String(output||trimmed).trim();
      if(!next||next===trimmed){if(language==='en')next=familySimplifyKnown(trimmed,'en');}
      entry.applied=leading+next+trailing;
      node.nodeValue=entry.applied;
    });
  }
  function scan(base){
    if(!base)return;
    if(base.nodeType===3){convertNode(base);return;}
    if(base.nodeType!==1)return;
    if(base.closest?.(excluded))return;
    const walker=document.createTreeWalker(base,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode()))convertNode(node);
  }
  function scanAttributes(base){
    const list=base.nodeType===1 ? [base,...base.querySelectorAll('[placeholder],[title],[aria-label]')] : [];
    for(const el of list){
      if(el.closest('[data-family-lang-ignore="true"],[contenteditable="true"]'))continue;
      for(const field of ['placeholder','title','aria-label']){
        if(!el.hasAttribute(field))continue;
        const current=el.getAttribute(field);
        const key=field+'::'+current;
        const prior=attributes.get(el)?.[field];
        if(prior && prior.applied===current)continue;
        const source=current||'';
        if(!source.trim()||source.length>160)continue;
        const base=FAMILY_SCREEN_URDU[source]||source;
        const next=language==='ur'?base:source;
        if(!attributes.has(el))attributes.set(el,{});
        attributes.get(el)[field]={source,applied:next};
        if(next!==source)el.setAttribute(field,next);
        if(language==='ur'&&next===source&&/[A-Za-z]/.test(source)&&source.length>=4){
          const tracked=attributes.get(el)[field];
          familyQueueRewrite(source,'ur').then(value=>{
            if(!active||!el.isConnected||attributes.get(el)?.[field]!==tracked||el.getAttribute(field)!==tracked.applied)return;
            if(typeof value==='string'&&value.trim()){tracked.applied=value.trim();el.setAttribute(field,tracked.applied);}
          });
        }
      }
    }
  }
  // The existing bilingual AI chat keeps its data unchanged, but shows only the chosen language.
  function applyChatLanguage(){
    root.querySelectorAll('.tmv-chat-message .tmv-chat-bubble > p[lang],.tmv-chat-report-line > p[lang]').forEach(el=>{
      const expected=el.getAttribute('lang')===language;
      if(!hidden.some(x=>x.el===el))hidden.push({el,display:el.style.display});
      el.style.display=expected?'':'none';
    });
  }
  scan(root);scanAttributes(root);applyChatLanguage();
  let scheduled=false;
  let queuedMutations=[];
  const observer=new MutationObserver(mutations=>{
    if(!active)return;
    queuedMutations.push(...mutations);
    if(scheduled)return;
    scheduled=true;
    window.requestAnimationFrame(()=>{
      scheduled=false;
      if(!active)return;
      const batch=queuedMutations;queuedMutations=[];
      for(const m of batch){
        if(m.type==='characterData')convertNode(m.target);
        else for(const node of m.addedNodes){scan(node);if(node.nodeType===1)scanAttributes(node);}
      }
      applyChatLanguage();
    });
  });
  observer.observe(root,{subtree:true,childList:true,characterData:true});
  return ()=>{
    active=false;observer.disconnect();
    for(const node of touched){const record=seen.get(node);if(record&&node.isConnected&&node.nodeValue===record.applied)node.nodeValue=record.source;}
    for(const row of hidden){if(row.el.isConnected)row.el.style.display=row.display;}
    for(const [el,fields] of attributes)if(el.isConnected)for(const [key,record] of Object.entries(fields)){if(el.getAttribute(key)===record.applied)el.setAttribute(key,record.source);}
  };
}

/* V44 — family question inbox. Uses existing individual family logins and owner PIN. */
function FamilyQuestionsModal({ viewer, ownerMode, ownerPin, onPendingChange, onClose, love }) {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState('');
  const [replyDraft, setReplyDraft] = useState('');
  const [replyId, setReplyId] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');
  const canAsk = ['nasir','talat','happa','yamna'].includes(viewer) && !ownerMode;
  const today = dayISO();
  const askedToday = items.some(item => item.date === today && item.viewer === viewer);
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await api({action:'family_questions_get', ...(ownerMode ? {pin:ownerPin} : {})});
        if (!active) return;
        setItems(data.items || []);
        setErrorMessage('');
        if (ownerMode) onPendingChange(Number(data.pending) || 0);
      } catch (error) { if (active) setErrorMessage(error.message || 'Could not load questions.'); }
      finally { if (active) setLoading(false); }
    };
    load();
    const timer = window.setInterval(() => { if (document.visibilityState === 'visible') load(); }, 45000);
    const onKey = event => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { active = false; window.clearInterval(timer); document.removeEventListener('keydown', onKey); };
  }, [ownerMode, ownerPin]);
  async function send(event) {
    event.preventDefault();
    if (!canAsk || askedToday || draft.trim().length < 3 || busy) return;
    setBusy(true); setErrorMessage(''); setNotice('');
    try {
      const {item} = await api({action:'family_questions_ask',date:today,question:draft.trim()});
      setItems(old => [item, ...old]); setDraft(''); setNotice('Your question has been sent to Ahsan.');
    } catch(error) { setErrorMessage(error.message || 'Could not send your question.'); }
    finally { setBusy(false); }
  }
  async function answer(event) {
    event.preventDefault();
    if (!ownerMode || !ownerPin || !replyId || replyDraft.trim().length < 2 || busy) return;
    setBusy(true); setErrorMessage(''); setNotice('');
    try {
      const {item} = await api({action:'family_questions_reply', pin:ownerPin, id:replyId, reply:replyDraft.trim()});
      setItems(old => old.map(row => row.id === item.id ? item : row));
      onPendingChange(items.reduce((n,row)=>n+(row.id===item.id ? 0 : !row.reply ? 1 : 0),0));
      setReplyId(''); setReplyDraft(''); setNotice('Reply saved. Family can see it in their inbox.');
    } catch(error) { setErrorMessage(error.message || 'Could not save reply.'); }
    finally { setBusy(false); }
  }
  return <div className="tmv-v44-question-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="tmv-v44-question-panel" role="dialog" aria-modal="true" aria-label="Family Question of the Day">
      <header className="tmv-v44-question-head">
        <span className="tmv-v44-question-mark"><MessageCircleQuestion size={21}/></span>
        <span className="tmv-v44-question-heading"><strong>{ownerMode ? 'Family Questions' : 'Ask Ahsan'}</strong><small>{ownerMode ? 'Your private family inbox' : 'One little question, every day'}</small></span>
        <button className="tmv-v44-question-close" type="button" onClick={onClose} aria-label="Close questions"><X size={19}/></button>
      </header>
      {ownerMode && <div className="tmv-v44-questions-summary">
        <span>{items.filter(item => !item.reply).length} awaiting reply</span>
        {love?.names?.length > 0 && <span>❤️ Loved by {love.names.map(name => FAMILY_IDENTITY[name]?.name || name).join(', ')}</span>}
      </div>}
      <div className="tmv-v44-question-body">
        {loading && <p className="tmv-v44-question-empty">Loading questions…</p>}
        {!loading && items.length === 0 && <p className="tmv-v44-question-empty">{ownerMode ? 'No family questions yet.' : 'You have not asked a question yet.'}</p>}
        {items.map(item => <article key={item.id} className="tmv-v44-question-item">
          <div className="tmv-v44-question-meta"><strong>{FAMILY_IDENTITY[item.viewer]?.name || 'Family'}</strong><span>{prettyDate(item.date)} · {item.askedAt ? new Date(item.askedAt).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}) : ''}</span>{ownerMode && !item.reply && <i title="Awaiting reply"/>}</div>
          <p>{item.question}</p>
          {item.reply ? <div className="tmv-v44-question-answer"><b>Ahsan replied</b><span>{item.reply}</span></div> : !ownerMode ? <small className="tmv-v44-question-waiting">Awaiting Ahsan's reply</small> : null}
          {ownerMode && <>
            {replyId === item.id ? <form className="tmv-v44-reply-form" onSubmit={answer}>
              <textarea value={replyDraft} onChange={event=>setReplyDraft(event.target.value)} maxLength={500} rows={2} placeholder="Write a personal reply…" required/>
              <div><button type="button" onClick={()=>{setReplyId('');setReplyDraft('');}}>Cancel</button><button type="submit" disabled={busy || replyDraft.trim().length < 2}>{busy ? 'Saving…' : 'Send reply'}</button></div>
            </form> : <button type="button" className="tmv-v44-reply-link" onClick={()=>{setReplyId(item.id);setReplyDraft(item.reply || '');}}>{item.reply ? 'Edit reply' : 'Reply to question'} <ArrowRight size={14}/></button>}
          </>}
        </article>)}
      </div>
      {canAsk && !askedToday && <form className="tmv-v44-ask-form" onSubmit={send}>
        <label htmlFor="tmv-v44-question-text">Your question for {prettyDate(today)}</label>
        <textarea id="tmv-v44-question-text" value={draft} onChange={event=>setDraft(event.target.value)} maxLength={280} rows={2} placeholder="What would you like to ask Ahsan?" required/>
        <button type="submit" disabled={busy || draft.trim().length < 3}><Send size={15}/>{busy ? 'Sending…' : 'Send question'}</button>
      </form>}
      {!ownerMode && !canAsk && <p className="tmv-v44-question-muted">Use your individual family password to send a question.</p>}
      {canAsk && askedToday && <p className="tmv-v44-question-muted">Today's question sent. You can ask another one tomorrow.</p>}
      {errorMessage && <p className="tmv-v44-question-error" role="alert">{errorMessage}</p>}
      {notice && <p className="tmv-v44-question-notice" role="status">{notice}</p>}
    </section>
  </div>;
}

/* V55: a single compact reflection strip. Family-only, no new card or stylesheet. */
function DailyInspiration({language='en'}) {
  const pakistanDay=()=>{
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const part=type=>parts.find(p=>p.type===type)?.value||'00';
    return `${part('year')}-${part('month')}-${part('day')}`;
  };
  const [date,setDate]=useState(pakistanDay);
  const [entry,setEntry]=useState(null);
  const [expanded,setExpanded]=useState(false);
  const [quoteUrdu,setQuoteUrdu]=useState('');
  useEffect(()=>{
    const refresh=()=>setDate(pakistanDay());
    const ticker=window.setInterval(refresh,60000);
    document.addEventListener('visibilitychange',refresh);
    window.addEventListener('focus',refresh);
    return ()=>{window.clearInterval(ticker);document.removeEventListener('visibilitychange',refresh);window.removeEventListener('focus',refresh);};
  },[]);
  useEffect(()=>{
    let active=true;
    setEntry(null);setExpanded(false);setQuoteUrdu('');
    api({action:'daily_inspiration'})
      .then(data=>{if(active&&data?.date===date)setEntry(data);})
      .catch(()=>{if(active)setEntry({date,kind:'unavailable',unavailable:true});});
    return ()=>{active=false;};
  },[date]);
  useEffect(()=>{
    if(language!=='ur'||entry?.kind!=='quote'||!entry.text)return undefined;
    let active=true;
    setQuoteUrdu('');
    api({action:'family_text',language:'ur',texts:[entry.text]})
      .then(result=>{if(active&&typeof result?.texts?.[0]==='string'&&result.texts[0].trim()!==entry.text)setQuoteUrdu(result.texts[0].trim());})
      .catch(()=>{});
    return ()=>{active=false;};
  },[language,entry?.date,entry?.kind,entry?.text]);
  if(!entry)return <div data-family-lang-ignore="true" role="status" aria-label="Loading today's reflection" style={{height:54,margin:'0 0 11px',border:'1px solid #e7eee8',borderRadius:11,display:'flex',alignItems:'center',gap:9,padding:'7px 10px',background:'#f8fbf7',color:'#81988a',fontSize:11}}><Sparkles size={15}/>{language==='ur'?'آج کی بات آ رہی ہے…':'Loading today’s reflection…'}</div>;
  const ur=language==='ur';
  const ayah=entry.kind==='ayah';
  const available=!entry.unavailable;
  const heading=ayah?(ur?'آج کی آیت':'A verse for today'):(ur?'آج کا خیال':'Thought for today');
  const text=ayah?entry.arabic:entry.text;
  const translation=ayah?(ur?entry.urdu:entry.english):(ur?quoteUrdu:'');
  const source=ayah?`${ur?'سورۃ':'Surah'} ${entry.reference||''}`:`— ${entry.author||''}`;
  const sourceLink=typeof entry.sourceUrl==='string'&&/^https:\/\/(quran\.com|zenquotes\.io)\//.test(entry.sourceUrl)?entry.sourceUrl:'';
  return <section data-family-lang-ignore="true" aria-label="Daily inspiration" style={{maxWidth:'100%',minWidth:0,
    border:'1px solid #e0eae3',background:'linear-gradient(115deg,#f8fbf7,#fff)',borderRadius:11,
    padding:'7px 10px',margin:'0 0 11px',boxShadow:'0 1px 3px rgba(15,53,34,.03)'}}>
    <div style={{display:'flex',alignItems:'center',gap:10,minWidth:0}}>
      <span aria-hidden="true" style={{display:'grid',placeItems:'center',width:28,height:28,flexShrink:0,
        borderRadius:8,background:'#eaf3ec',color:'#2c7553'}}>{ayah?<BookOpen size={15}/>:<Sparkles size={15}/>}</span>
      <div style={{flex:'1 1 auto',minWidth:0,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:6,minWidth:0}}>
          <span style={{fontSize:10,color:'#468263',fontWeight:750,whiteSpace:'nowrap',letterSpacing:'.025em'}}>{heading}</span>
          {source&&<small style={{fontSize:10,color:'#8b9f91',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{source}</small>}
          {!ayah&&entry.source==='ZenQuotes'&&<a href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer" style={{color:'#5b876f',fontSize:9,whiteSpace:'nowrap',textDecoration:'underline'}}>ZenQuotes</a>}
        </div>
        {available ? <>
          <div lang={ayah?'ar':'en'} dir={ayah?'rtl':'ltr'} style={{fontSize:ayah?14:12.5,fontWeight:ayah?550:600,
            fontFamily:ayah?"'Noto Naskh Arabic','Noto Sans Arabic',serif":'inherit',color:'#243d30',
            lineHeight:1.5,whiteSpace:expanded?'normal':'nowrap',overflow:'hidden',textOverflow:'ellipsis',minWidth:0}}>{text}</div>
          {translation&&<div lang={ur?'ur':'en'} dir={ur?'rtl':'ltr'} style={{fontSize:11,color:'#698271',lineHeight:1.55,
            fontFamily:ur?"'Noto Naskh Arabic','Noto Sans Arabic',serif":'inherit',
            whiteSpace:expanded?'normal':'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{translation}</div>}
        </> : <small style={{color:'#809488',fontSize:11}}>{ur?'آج کی آیت ابھی دستیاب نہیں۔':'Today’s reflection is temporarily unavailable.'}</small>}
      </div>
      <button type="button" aria-label={expanded?'Collapse daily reflection':'Expand daily reflection'} aria-expanded={expanded}
        onClick={()=>setExpanded(x=>!x)} style={{flex:'0 0 auto',height:30,width:30,border:'none',borderRadius:8,
          display:'grid',placeItems:'center',background:'transparent',color:'#7c9785',cursor:'pointer'}}>
        <ChevronRight size={16} style={{transform:expanded?'rotate(90deg)':'none',transition:'transform .18s'}}/>
      </button>
    </div>
    {expanded&&available&&<div style={{padding:'5px 0 1px 38px',display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',
      fontSize:10,color:'#8a9c91'}}>
      {ayah?<span>{ur?'اردو: فتح محمد جالندھری · English: Saheeh International':'Urdu: F. M. Jalandhry · English: Saheeh International'}</span>:null}
      {sourceLink&&<a href={sourceLink} target="_blank" rel="noopener noreferrer" style={{color:'#36765b',textDecoration:'underline'}}>
        {ayah?(ur?'آیت کا حوالہ':'Verse source'):'Quotes by ZenQuotes'}</a>}
    </div>}
  </section>;
}

/* V60 MY LIFE — separate full-screen dashboard; no external dependencies. */
const MY_LIFE_SECTIONS={finance:['Finance','مالیات','Income, expenses and savings','آمدنی، اخراجات اور بچت','◈'],plans:['Future Plans','مستقبل کے منصوبے','Goals and milestones','اہداف اور کامیابیاں','◎'],books:['Book Reading','کتابیں','Reading progress and lessons','مطالعہ اور سیکھنے کا سفر','▤'],travel:['Travel History','سفر کی تاریخ','Places, trips and memories','مقامات، سفر اور یادیں','✈']};
function MyLifeLauncher({ownerMode}){
  const [open,setOpen]=useState(false);
  return <><button type="button" onClick={()=>setOpen(true)} title="My Life" style={{border:'1px solid #c6ded0',borderRadius:9,background:'#f3faf5',color:'#255c43',fontSize:11,fontWeight:750,padding:'6px 10px',cursor:'pointer',whiteSpace:'nowrap'}}>My Life</button>{open&&myLifePortal(<MyLifeScreen ownerMode={ownerMode} onClose={()=>setOpen(false)}/>,document.body)}</>;
}
function MyLifeScreen({ownerMode,onClose}){
  const [lang,setLang]=useState('en');
  const t=(en,ur)=>lang==='ur'?ur:en;
  const [section,setSection]=useState('');
  const [data,setData]=useState(null),[busy,setBusy]=useState(false),[message,setMessage]=useState('');
  const [form,setForm]=useState(null);
  const [month,setMonth]=useState(()=>dayISO().slice(0,7));
  const today=dayISO();
  const request=async(payload)=>{setBusy(true);setMessage('');try{const result=await api(payload);setData(result);return true;}catch(e){setMessage(e?.message||'Could not load My Life. Please try again.');return false;}finally{setBusy(false);}};
  useEffect(()=>{let active=true;setBusy(true);api({action:'my_life_get'}).then(v=>{if(active)setData(v);}).catch(e=>{if(active)setMessage(e?.message||'Could not load My Life.');}).finally(()=>{if(active)setBusy(false);});return ()=>{active=false;};},[ownerMode]);
  useEffect(()=>{const old=document.body.style.overflow;document.body.style.overflow='hidden';const key=e=>{if(e.key==='Escape')onClose();};window.addEventListener('keydown',key);return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',key);};},[]);
  const allowed=Array.isArray(data?.sections)?data.sections:[];
  useEffect(()=>{if(data&&section&&!allowed.includes(section)){setSection('');setForm(null);}},[data,section]);
  const records=data?.records||{};
  const list=records[section]||[];
  const labels=MY_LIFE_SECTIONS[section];
  const card={background:'#fff',border:'1px solid #dce9df',borderRadius:16,padding:16,minWidth:0};
  const btn={border:'1px solid #cedfd3',borderRadius:9,background:'#fff',color:'#235a41',padding:'8px 12px',fontWeight:650,cursor:'pointer',fontSize:13};
  const primary={...btn,background:'#245a40',borderColor:'#245a40',color:'#fff'};
  const input={boxSizing:'border-box',width:'100%',padding:'10px 12px',border:'1px solid #cddfd3',borderRadius:9,background:'#fff',color:'#183f2d',fontSize:14};
  const grid={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,205px),1fr))',gap:12};
  const money=n=>new Intl.NumberFormat(lang==='ur'?'ur-PK':'en-PK',{style:'currency',currency:'PKR',maximumFractionDigits:2}).format(n);
  const days=(a,b)=>Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000);
  const sum=(arr,kind)=>arr.filter(x=>x.kind===kind).reduce((n,x)=>n+x.amount,0);
  const finance=records.finance||[];
  const monthly=finance.filter(x=>x.date?.startsWith(month));
  const income=sum(monthly,'income'),expenses=sum(monthly,'expense'),balance=sum(finance,'income')-sum(finance,'expense');
  const target=sum(finance,'target');
  const planList=records.plans||[],bookList=records.books||[],travelList=records.travel||[];
  const visited=travelList.filter(x=>x.status==='visited');
  const countries=new Set(visited.map(x=>x.country.trim().toLowerCase())).size;
  const cities=new Set(visited.map(x=>x.country.trim().toLowerCase()+'|'+x.city.trim().toLowerCase())).size;
  const counts={finance:finance.length,plans:planList.length,books:bookList.length,travel:travelList.length};
  const stat=(label,value)=><div style={{...card,padding:13}}><div style={{fontSize:12,color:'#557664'}}>{label}</div><div style={{fontSize:23,fontWeight:750,marginTop:5,overflowWrap:'anywhere'}}>{value}</div></div>;
  const bar=p=><div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.max(0,Math.min(100,p))} style={{height:7,background:'#e5eee7',borderRadius:10,overflow:'hidden',margin:'9px 0'}}><div style={{height:'100%',width:Math.max(0,Math.min(100,p))+'%',background:'#3b8c60'}}/></div>;
  const empty=()=>({title:'',notes:'',date:today,kind:'expense',amount:'',category:'',target:today,progress:0,horizon:'short',author:'',total:'',pages:0,start:today,end:today,country:'',city:'',status:'visited'});
  const field=(key,label,type='text',props={})=><label style={{display:'grid',gap:5,fontSize:12,fontWeight:650}}>{label}<input {...props} style={input} type={type} value={form?.[key]??''} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}/></label>;
  const select=(key,label,options)=><label style={{display:'grid',gap:5,fontSize:12,fontWeight:650}}>{label}<select style={input} value={form?.[key]??''} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}>{options.map(([v,en,ur])=><option key={v} value={v}>{t(en,ur)}</option>)}</select></label>;
  const save=async e=>{e.preventDefault();const record={...form};for(const k of ['amount','progress','total','pages'])if(record[k]!==undefined&&record[k]!=='')record[k]=Number(record[k]);if(await request({action:'my_life_save',section,record}))setForm(null);};
  const back=()=>{setSection('');setForm(null);setMessage('');};
  const show=s=>{setSection(s);setForm(null);setMessage('');};
  const note=(x)=>x.notes&&<p style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',fontSize:13,color:'#496957',margin:'8px 0 0'}}>{x.notes}</p>;
  const bookEstimate=x=>{const elapsed=Math.max(1,days(x.start,today)+1);const avg=x.pages/elapsed;return avg>0&&x.pages<x.total?Math.ceil((x.total-x.pages)/avg):null;};
  const displayList=section==='finance'?list.filter(x=>x.date?.startsWith(month)||x.kind==='target'):list;
  const expenseGroups=Object.entries(monthly.filter(x=>x.kind==='expense').reduce((a,x)=>{const k=x.category||t('Other','دیگر');a[k]=(a[k]||0)+x.amount;return a;},Object.create(null))).sort((a,b)=>b[1]-a[1]);
  const pastMonths=[...new Set(finance.filter(x=>x.kind!=='target'&&x.date.slice(0,7)<today.slice(0,7)).map(x=>x.date.slice(0,7)))];
  const historic=finance.filter(x=>pastMonths.includes(x.date.slice(0,7)));
  const pace=pastMonths.length?(sum(historic,'income')-sum(historic,'expense'))/pastMonths.length:0;
  return <div role="dialog" aria-modal="true" aria-label="My Life" dir={lang==='ur'?'rtl':'ltr'} style={{position:'fixed',inset:0,zIndex:2147483000,overflowY:'auto',background:'#f4f8f4',color:'#234b36',fontFamily:'inherit',lineHeight:1.5}}>
    <main style={{maxWidth:960,margin:'0 auto',padding:'20px 14px 48px'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:14}}><button type="button" style={btn} onClick={onClose}>← {t('Back to Track Me','ٹریک می پر واپس')}</button><div style={{display:'flex',gap:6}}><button type="button" style={btn} onClick={()=>setLang(l=>l==='en'?'ur':'en')}>{lang==='en'?'اردو':'English'}</button><button type="button" style={btn} disabled={busy} onClick={()=>request({action:'my_life_get'})}>{t('Refresh','تازہ کریں')}</button></div></header>
      <div style={{background:'linear-gradient(125deg,#153f30,#286345)',color:'#fff',borderRadius:20,padding:'22px 24px',marginBottom:16}}><div style={{fontSize:11,letterSpacing:2,color:'#b9d8c6'}}>{t('LIFE OPERATING SYSTEM','زندگی کا نظام')}</div><h1 style={{fontSize:30,margin:'4px 0',color:'#fff'}}>{t('My Life','میری زندگی')}</h1><div style={{color:'#d7e9dd',fontSize:14}}>{t('Manage today. Build tomorrow. Remember the journey.','آج کو سنواریں، کل بنائیں، سفر یاد رکھیں۔')}</div></div>
      {message&&<div role="alert" style={{...card,color:'#a23d32',marginBottom:12}}>{message}</div>}
      {busy&&<p role="status">{t('Loading…','لوڈ ہو رہا ہے…')}</p>}
      {!section&&data&&<><div style={grid}>{allowed.map(s=>{const v=MY_LIFE_SECTIONS[s];return <button key={s} type="button" onClick={()=>show(s)} style={{...card,textAlign:lang==='ur'?'right':'left',cursor:'pointer',color:'#214b34'}}><div style={{fontSize:25,color:'#34845a'}}>{v[4]}</div><h2 style={{fontSize:19,margin:'7px 0'}}>{t(v[0],v[1])}</h2><p style={{fontSize:13,color:'#567461',margin:0}}>{t(v[2],v[3])}</p><div style={{fontSize:13,marginTop:12,fontWeight:650}}>{counts[s]} {t('records','ریکارڈز')} →</div></button>;})}</div>{!allowed.length&&<p>{t('No My Life sections have been shared yet.','ابھی کوئی حصہ شیئر نہیں کیا گیا۔')}</p>}
        {ownerMode&&<div style={{...card,marginTop:16}}><h3 style={{margin:'0 0 4px'}}>{t('Family visibility','خاندان کی رسائی')}</h3><p style={{fontSize:12,color:'#577461'}}>{t('Sharing a section allows family to read all its records, including notes. All sections are private by default.','شیئر کرنے پر خاندان تمام ریکارڈ اور نوٹس دیکھ سکتا ہے۔ شروع میں تمام حصے نجی ہیں۔')}</p>{Object.entries(MY_LIFE_SECTIONS).map(([s,v])=><label key={s} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0'}}><input type="checkbox" checked={!!data.visibility?.[s]} disabled={busy} onChange={e=>{const visible=e.target.checked;if(!visible||window.confirm(t('Share all records and notes in this section with family?','کیا تمام ریکارڈ اور نوٹس خاندان کے ساتھ شیئر کریں؟')))request({action:'my_life_visibility',section:s,visible});}}/>{t(v[0],v[1])}</label>)}</div>}</>}
      {section&&labels&&allowed.includes(section)&&<><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:12}}><div><button type="button" style={btn} onClick={back}>← {t('All sections','تمام حصے')}</button><h2 style={{margin:'10px 0 0',fontSize:23}}>{t(labels[0],labels[1])}</h2></div>{ownerMode&&<button type="button" style={primary} onClick={()=>setForm(empty())}>+ {t('Add record','ریکارڈ شامل کریں')}</button>}</div>
        {section==='finance'&&<><label style={{display:'block',fontSize:13,marginBottom:12}}>{t('Month','مہینہ')} <input type="month" value={month} onChange={e=>setMonth(e.target.value)} style={{...input,width:'auto'}}/></label><div style={grid}>{stat(t('Income','آمدنی'),money(income))}{stat(t('Expenses','اخراجات'),money(expenses))}{stat(t('Monthly savings','ماہانہ بچت'),money(income-expenses))}{stat(t('Recorded balance','ریکارڈ شدہ بیلنس'),money(balance))}</div><div style={{...card,marginTop:12}}><strong>{t('Savings target','بچت کا ہدف')}</strong>{target>0?<>{bar(balance/target*100)}<div>{money(balance)} / {money(target)}</div>{balance<target&&pace>0&&<small>{t('At your average recorded monthly savings: about','اوسط ماہانہ بچت کے حساب سے تقریباً')} {Math.ceil((target-balance)/pace)} {t('months to reach target.','مہینے باقی ہیں۔')}</small>}</>:<p>{t('Add a savings target to track your progress.','بچت کا ہدف شامل کریں۔')}</p>}<p style={{fontSize:12,marginBottom:0}}>{t('Based on recorded transactions only. Currency: PKR. Targets do not change balance.','صرف درج شدہ لین دین پر مبنی۔ کرنسی پاکستانی روپیہ ہے۔ اہداف بیلنس تبدیل نہیں کرتے۔')}</p></div>{expenseGroups.length>0&&<div style={{...card,marginTop:12}}><strong>{t('Expense breakdown','اخراجات کی تفصیل')}</strong>{expenseGroups.map(([k,v])=><div key={k} style={{marginTop:8,fontSize:13}}>{k} · {money(v)}{bar(v/expenses*100)}</div>)}<small>{t('Largest recorded expense category:','سب سے زیادہ درج شدہ اخراجات:')} {expenseGroups[0][0]}</small></div>}</>}
        {section==='plans'&&<div style={grid}>{stat(t('Active plans','جاری منصوبے'),planList.filter(x=>x.progress<100).length)}{stat(t('Completed','مکمل'),planList.filter(x=>x.progress===100).length)}{stat(t('Overdue','تاخیر'),planList.filter(x=>x.progress<100&&x.target<today).length)}</div>}
        {section==='books'&&<div style={grid}>{stat(t('Reading now','زیر مطالعہ'),bookList.filter(x=>x.pages>0&&x.pages<x.total).length)}{stat(t('Books completed','مکمل کتابیں'),bookList.filter(x=>x.pages===x.total).length)}{stat(t('Pages read','پڑھے گئے صفحات'),bookList.reduce((n,x)=>n+x.pages,0))}</div>}
        {section==='travel'&&<div style={grid}>{stat(t('Countries visited','ممالک'),countries)}{stat(t('Cities visited','شہر'),cities)}{stat(t('Completed trips','مکمل سفر'),visited.length)}{stat(t('Wish list','خواہشات'),travelList.filter(x=>x.status==='wish').length)}</div>}
        {ownerMode&&form&&<form onSubmit={save} style={{...card,marginTop:14,display:'grid',gap:12}}><h3 style={{margin:0}}>{form.id?t('Edit record','ریکارڈ تبدیل کریں'):t('New record','نیا ریکارڈ')}</h3>{field('title',t('Title','عنوان'),'text',{required:true,maxLength:120})}<div style={grid}>
          {section==='finance'&&<>{select('kind',t('Type','قسم'),[['income','Income','آمدنی'],['expense','Expense','اخراجات'],['target','Savings target','بچت کا ہدف']])}{field('amount',t('Amount (PKR)','رقم (روپے)'),'number',{required:true,min:0.01,max:1e10,step:'0.01'})}{field('date',t('Date','تاریخ'),'date',{required:true})}{field('category',t('Category','زمرہ'),'text',{maxLength:60})}</>}
          {section==='plans'&&<>{select('horizon',t('Plan type','منصوبے کی قسم'),[['short','Short-term','مختصر مدت'],['long','Long-term','طویل مدت']])}{field('target',t('Target date','ہدف کی تاریخ'),'date',{required:true})}{field('progress',t('Progress (%)','پیش رفت (%)'),'number',{required:true,min:0,max:100,step:1})}</>}
          {section==='books'&&<>{field('author',t('Author','مصنف'),'text',{maxLength:120})}{field('start',t('Reading start date','مطالعہ شروع کرنے کی تاریخ'),'date',{required:true,max:today})}{field('total',t('Total pages','کل صفحات'),'number',{required:true,min:1,max:100000,step:1})}{field('pages',t('Pages read so far','اب تک پڑھے گئے صفحات'),'number',{required:true,min:0,max:Number(form.total)||100000,step:1})}</>}
          {section==='travel'&&<>{select('status',t('Status','حیثیت'),[['visited','Visited','سفر ہو چکا'],['wish','Wish list','خواہش']])}{field('country',t('Country','ملک'),'text',{required:true,maxLength:100})}{field('city',t('City','شہر'),'text',{required:true,maxLength:100})}{field('start',t('Start date','آغاز'),'date',{required:true})}{field('end',t('End date','اختتام'),'date',{required:true,min:form.start})}</>}
        </div><label style={{display:'grid',gap:5,fontSize:12,fontWeight:650}}>{t('Notes / lessons / memories','نوٹس / اسباق / یادیں')}<textarea rows={3} maxLength={1000} style={input} value={form.notes||''} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></label><div style={{display:'flex',gap:8}}><button style={primary} disabled={busy} type="submit">{t('Save','محفوظ کریں')}</button><button style={btn} type="button" onClick={()=>setForm(null)}>{t('Cancel','منسوخ')}</button></div></form>}
        <h3 style={{margin:'18px 0 9px'}}>{t('History','ریکارڈز')}</h3>{!displayList.length&&<p style={{...card,color:'#64816e'}}>{t('No records yet.','ابھی کوئی ریکارڈ نہیں۔')}</p>}
        <div style={{display:'grid',gap:10}}>{displayList.map(x=><article key={x.id} style={card}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10,flexWrap:'wrap'}}><strong style={{fontSize:16,overflowWrap:'anywhere'}}>{x.title}</strong>{ownerMode&&<div style={{display:'flex',gap:6}}><button type="button" style={btn} disabled={busy} onClick={()=>setForm({...empty(),...x})}>{t('Edit','تبدیل')}</button><button type="button" style={{...btn,color:'#a33f32'}} disabled={busy} onClick={()=>{if(window.confirm(t('Delete this record?','ریکارڈ حذف کریں؟')))request({action:'my_life_delete',section,id:x.id});}}>{t('Delete','حذف')}</button></div>}</div>
          {section==='finance'&&<p style={{margin:'6px 0',fontSize:13}}>{x.kind==='income'?t('Income','آمدنی'):x.kind==='expense'?t('Expense','اخراجات'):t('Savings target','بچت کا ہدف')} · <b>{money(x.amount)}</b> · {x.date}{x.category?' · '+x.category:''}</p>}
          {section==='plans'&&<>{bar(x.progress)}<div style={{fontSize:13}}>{x.progress}% · {x.progress===100?t('Completed','مکمل'):days(today,x.target)<0?t('Overdue','تاخیر'):days(today,x.target)+' '+t('days left','دن باقی')} · {x.target}</div></>}
          {section==='books'&&<>{bar(x.pages/x.total*100)}<div style={{fontSize:13}}>{x.author?x.author+' · ':''}{x.pages}/{x.total} {t('pages','صفحات')} · {x.pages===x.total?t('Completed','مکمل'):x.pages===0?t('Reading list','مطالعہ کی فہرست'):t('Reading','زیر مطالعہ')}{bookEstimate(x)!==null?' · '+t('About','تقریباً')+' '+bookEstimate(x)+' '+t('days left','دن باقی'):''}</div>{Array.isArray(x.reading)&&x.reading.length>0&&<details style={{marginTop:8,fontSize:12}}><summary>{t('Daily reading history','روزانہ مطالعے کی تاریخ')}</summary>{[...x.reading].reverse().map(y=><div key={y.date}>{y.date} · {y.pages>0?'+':''}{y.pages} {t('pages','صفحات')}</div>)}</details>}{ownerMode&&x.pages<x.total&&<button type="button" style={{...btn,marginTop:8}} onClick={()=>{setForm({...empty(),...x,pages:Math.min(x.total,x.pages+1)});}}>{t('Update reading pages','مطالعہ اپڈیٹ کریں')}</button>}</>}
          {section==='travel'&&<div style={{fontSize:13,marginTop:6}}>{x.city}, {x.country} · {x.status==='visited'?t('Visited','سفر ہو چکا'):t('Wish list','خواہش')}<br/>{x.start} – {x.end} · {days(x.start,x.end)+1} {t('days','دن')} · <a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(x.city+', '+x.country)} target="_blank" rel="noopener noreferrer" style={{color:'#286547'}}>{t('View map','نقشہ دیکھیں')}</a></div>}{note(x)}</article>)}</div>
      </>}
    </main>
  </div>;
}

function FamilyToday({ entries, days, quran, viewDate, setViewDate, onOpen, onOpenSummary, ownerMode, onNew, love, loveBusy, onLove, ownerPin, onOpenLifeMap, onOpenQuestions, questionsPending, onOpenSeen, viewer, onOpenToday30, language = 'en' }) {
  const [expanded, setExpanded] = useState(null);
  const hifzStats = hifzProgress(quran);
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
      activeSpeech.current?.stop();
      activeSpeech.current = null;
    };
  }, [viewDate, language]);
  function readSelectedDay() {
    window.clearTimeout(listenTimer.current);
    setListenError('');
    if (activeSpeech.current) {
      activeSpeech.current.stop();
      activeSpeech.current = null;
      setReadingDay(false);
      return;
    }
    const readLanguage = !ownerMode && language === 'ur' ? 'ur' : 'en';
    const lines = buildFamilyReport({entries, prayerDays: days, quranEntries: quran,
      period:'selected', topic:'everything', selectedDate:viewDate});
    const title = readLanguage === 'ur'
      ? `احسن کی ${prettyDate(viewDate)} کی روزانہ اپڈیٹس۔`
      : `Ahsan's updates for ${prettyDate(viewDate)}.`;
    const content = [title,...lines.map(line => readLanguage === 'ur' ? line.ur : line.en)]
      .filter(value => typeof value === 'string' && value.trim())
      .join(readLanguage === 'ur' ? '۔ ' : ' ');
    const controller = trackStartSpeech(content, readLanguage,
      () => { activeSpeech.current = null; setReadingDay(false); },
      message => {
        activeSpeech.current = null;
        setReadingDay(false);
        setListenError(message);
        window.clearTimeout(listenTimer.current);
        listenTimer.current = window.setTimeout(() => setListenError(''), 7500);
      });
    if (controller.error) {
      setListenError(controller.error);
      listenTimer.current = window.setTimeout(() => setListenError(''), 7500);
      return;
    }
    activeSpeech.current = controller;
    setReadingDay(true);
  }

  return <div className="tmv-family-view tmv-v32-home">
    <div className="tmv-v32-intro">
      <span className="tmv-v32-kicker" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:7}}>
        <MyLifeLauncher ownerMode={ownerMode}/>
        {ownerMode ? 'THE DAILY JOURNAL' : <FamilyTimeGreeting viewer={viewer}/>}
        {!ownerMode&&<button type="button" onClick={onOpenToday30} title="Ahsan's Today in 30 Seconds"
          aria-label="Watch Ahsan's Today in 30 Seconds" style={{display:'inline-flex',alignItems:'center',gap:3,
            background:'transparent',border:0,padding:'2px 4px',color:'#27684d',fontSize:11,fontWeight:750,
            letterSpacing:0,whiteSpace:'nowrap',cursor:'pointer'}}><Play size={12}/>30s</button>}
      </span>
      <div className="tmv-v32-titleline">
        <div><h1 className="tmv-v33-script-title">Ahsan’s day<span className="tmv-v32-dot">.</span></h1><p>Just the important moments, in one place.</p></div>
        <div className="tmv-v37-quick-actions">
          <button type="button" className={`tmv-v37-icon-action tmv-v37-love${love?.liked ? ' is-loved' : ''}`}
            onClick={onLove} disabled={loveBusy} aria-pressed={Boolean(love?.liked)}
            aria-label={love?.liked ? 'Remove love for this day' : 'Send love for this day'}
            title={ownerMode && love?.names?.length ? `Loved by ${love.names.map(name => FAMILY_IDENTITY[name]?.name || name).join(', ')}` : love?.liked ? 'Remove love' : 'Send love'}>
            <Heart size={17} fill={love?.liked ? 'currentColor' : 'none'} strokeWidth={1.8}/>
            {love?.count > 0 && <span className="tmv-v37-love-count">{love.count}</span>}
          </button>
          {ownerMode && <button type="button" className="tmv-v37-icon-action" onClick={onOpenSeen}
            title="Seen by · this week" aria-label="Who viewed this week"><Eye size={17}/></button>}
          <button type="button" className="tmv-v37-icon-action tmv-v44-question-trigger"
            onClick={onOpenQuestions} title={ownerMode ? 'Open family questions' : 'Ask Ahsan a question'}
            aria-label={ownerMode ? `Family questions, ${questionsPending} awaiting reply` : 'Ask Ahsan a question'}>
            <MessageCircleQuestion size={17}/>
            {ownerMode && questionsPending > 0 && <span className="tmv-v44-question-count">{Math.min(questionsPending,99)}</span>}
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
    {!ownerMode&&<DailyInspiration language={language}/>}
    {listenError && <div className="tmv-mini-toast" role="status">{listenError}</div>}
    {ownerMode && love?.names?.length > 0 && <small className="tmv-v37-owner-love">❤️ Loved by {love.names.map(name => FAMILY_IDENTITY[name]?.name || name).join(', ')}</small>}
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
    <div className="tmv-v32-sectiontitle tmv-v32-life-title"><h2>Life &amp; Progress</h2><div className="tmv-v41-life-tray"><span className="tmv-v41-life-hint">Only what matters</span><button type="button" className="tmv-v42-open-map" onClick={onOpenLifeMap} aria-label="Open Ahsan's Life Map" title="Life Map"><MapPinned size={15}/><span>Life Map</span></button><FamilyMoment date={viewDate} ownerMode={ownerMode} ownerPin={ownerPin}/></div></div>
    <section className="tmv-v32-life" aria-label="Life and progress">
      <V32LifeItem type="quran" date={viewDate} title="Quran Reading" summary={quranSummary}
        status={read.length ? 'Recorded' : 'No update'} extra={[quranExtra, hifzStats.sessions ? `Hifz: ${hifzStats.newPages} learning page${hifzStats.newPages===1?'':'s'} · ${hifzStats.revisionPages} revision page${hifzStats.revisionPages===1?'':'s'}` : 'Hifz: no practice logged yet'].filter(Boolean).join(' · ')}
        expanded={expanded === 'quran'} onToggle={() => toggle('quran')} onOpen={onOpen}>
        <p style={{margin:'0 0 8px',fontSize:12,color:'#315c44'}}>
          <strong>Hifz · Learning & Revision:</strong>{' '}
          {hifzStats.sessions
            ? `${hifzStats.newPages} learning pages · ${hifzStats.revisionPages} revision pages · Mistakes ${hifzStats.newMistakes}/${hifzStats.revisionMistakes}`
            : 'No structured Hifz practice saved yet. Older normal Quran readings are kept separate.'}
        </p>
        {read.length ? read.map(item => <p key={item.id || item.createdAt}>
          <strong>{item.hifz ? `${item.hifz.newPages} learning · ${item.hifz.revisionPages} revision · Mistakes ${item.hifz.newMistakes}/${item.hifz.revisionMistakes}` : `Para ${item.para} · ${item.pagesRead} ${Number(item.pagesRead)===1?'page':'pages'}`}</strong>
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
    <MonthlyProgress entries={entries} days={days} quran={quran} selectedDate={viewDate} onSelectDate={setViewDate}/>
  </div>;
}

/* V56.1 HIDE APPLICANT SCORES: family sees official requirements only. */
/* V56.2 HIFZ OVERVIEW AND ADMISSION AUTO-CHECK */
/* V56 ADMISSIONS: compact official evidence, never a fabricated percentage or guaranteed offer. */
function AdmissionInsight({item,ownerMode}) {
  const [report,setReport]=useState(null);
  const [checked,setChecked]=useState(false);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState('');
  useEffect(()=>{
    let active=true;
    setChecked(false);setReport(null);setMessage('');
    (async()=>{
      try{
        const stored=await api({action:'admission_get',taskId:item.id});
        if(!active)return;
        if(stored.report){setReport(stored.report);return;}
        // For legacy entries, the first visit by Ahsan starts automatic
        // research. Family users can read cached public results only.
        if(ownerMode){
          setBusy(true);
          try{
            const result=await api({action:'admission_research',taskId:item.id});
            if(active)setReport(result.report||null);
          }catch(error){if(active)setMessage(error.message||'Official criteria check is unavailable.');}
          finally{if(active)setBusy(false);}
        }
      }catch(error){if(active)setMessage(error.message||'Could not load admission insight.');}
      finally{if(active)setChecked(true);}
    })();
    return ()=>{active=false;};
  },[item.id,item.updatedAt,ownerMode]);
  // The research starts automatically on save. Briefly re-check cached findings
  // so a family member opening the card can see the result without reloading.
  useEffect(()=>{
    if(!checked||report)return undefined;
    let attempts=0,active=true;
    const timer=window.setInterval(()=>{
      if(++attempts>5){window.clearInterval(timer);return;}
      api({action:'admission_get',taskId:item.id}).then(data=>{
        if(active&&data.report){setReport(data.report);window.clearInterval(timer);}
      }).catch(()=>{});
    },4000);
    return ()=>{active=false;window.clearInterval(timer);};
  },[checked,report,item.id]);
  const reload=async()=>{
    if(!ownerMode||busy)return;
    setBusy(true);setMessage('');
    try{const result=await api({action:'admission_research',taskId:item.id,force:true});setReport(result.report||null);setChecked(true);}
    catch(error){setMessage(error.message||'Could not check admission criteria right now.');}
    finally{setBusy(false);}
  };
  const small={fontSize:11,color:'#637b6b',lineHeight:1.65};
  const row={display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,flexWrap:'wrap',fontSize:12,padding:'5px 0'};
  const tag=(match)=>({display:'inline-block',fontWeight:650,color:match?'#236647':'#9d5b32',background:match?'#edf8f0':'#fff5ed',borderRadius:7,padding:'2px 6px'});
  const sources=Array.isArray(report?.sources)?report.sources:[];
  return <details style={{marginTop:9,padding:'8px 10px',background:'#f8fbf9',border:'1px solid #e2ebe4',borderRadius:10}}>
    <summary style={{fontSize:12,color:'#285d43',cursor:'pointer',fontWeight:700}}>
      Admission criteria check
    </summary>
    <div style={{padding:'8px 1px 3px'}}>
      <div style={{fontSize:11,fontWeight:700,color:report?.verified?'#26714a':'#927045'}}>
        {report?.status || (busy?'Checking official criteria…':checked?(ownerMode?'Criteria not confirmed yet':'Criteria check pending'):'Loading criteria…')}
      </div>
      {report?.programFound && <p style={{...small,margin:'5px 0',color:'#286e52'}}>Official programme page located. Specific admission criteria are checked separately.</p>}
      {report?.verified && <>
        <div style={row}><span>Required CGPA</span>{report.gpa
          ? <span style={tag(true)}>Minimum {report.gpa.minimum.toFixed(2)}</span>
          : <span style={small}>Not verified</span>}</div>
        <div style={row}><span>Required IELTS</span>{report.ielts
          ? <span style={tag(true)}>Minimum {report.ielts.minimum.toFixed(1)}</span>
          : <span style={small}>Not verified</span>}</div>
      </>}
      {Array.isArray(report?.requirements)&&report.requirements.length>0&&<div style={{margin:'8px 0'}}><strong style={{fontSize:11,color:'#315a44'}}>Other requirements</strong>{report.requirements.map((r,i)=><p key={i} style={small}><strong>{r.label}: </strong>{r.evidence} <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a></p>)}</div>}
      <div style={row}><span>Deadline</span><strong style={{fontSize:11,color:'#315a44'}}>{report?.deadline?.date||'Not officially verified'}</strong></div>
      <p style={small}>{report?.notes||'Enter the university and programme only. The system checks the admission criteria automatically.'}</p>
      {sources.length>0&&<div style={{display:'flex',gap:7,flexWrap:'wrap',marginTop:8}}>
        {sources.slice(0,3).map(src=><a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer"
          style={{fontSize:11,color:'#286e52',textDecoration:'underline'}} title={src.title}>Official source</a>)}
      </div>}
      {report?.checkedAt&&<small style={{display:'block',...small,marginTop:6}}>Checked {prettyDate(report.checkedAt)} · Final admission still depends on the university's full process.</small>}
      {ownerMode&&<button type="button" onClick={reload} disabled={busy} style={{marginTop:9,border:'1px solid #cee4d4',borderRadius:8,background:'#eff8f1',color:'#226748',fontSize:11,fontWeight:700,padding:'7px 10px'}}>
        {busy?'Checking official criteria…':'Refresh criteria'}
      </button>}
      {message&&<p role="status" style={{...small,color:'#9b563d'}}>{message}</p>}
      <small style={{display:'block',...small,marginTop:8}}>This is a short criteria summary from official pages when available. Final admission depends on the university.</small>
    </div>
  </details>;
}

function TaskCard({ item, ownerMode, expanded, onExpand, note, setNote, busy, onNote, onEdit, onDelete, onStatus }) {
  const meta = item.meta || {};
  const logs = [...(item.logs||[])].sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  return <article className="tmv-task-card">
    <div className="tmv-task-title"><h3>{item.title}</h3><span className={`tmv-task-status tmv-status-${item.status}`}>{STATUS[item.status]||'To Do'}</span></div>
    {(meta.project || meta.university || meta.program) && <p className="tmv-task-meta">{[meta.project,meta.university,meta.program].filter(Boolean).join(' · ')}</p>}
    {item.detail && <p className="tmv-task-description">{item.detail}</p>}
    {item.section === 'university' && <p className="tmv-task-description"><strong>{APP_STATUS[meta.applicationStatus]||'Planning'}</strong>{meta.upcomingDate ? ` · Upcoming: ${prettyDate(meta.upcomingDate)}` : ''}</p>}
    {item.section === 'university' && <AdmissionInsight item={item} ownerMode={ownerMode}/>}
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
    {ownerMode ? <div className="tmv-owner-section"><p className="tmv-owner-label">Changes save immediately</p><div className="tmv-prayer-edit-list">{PRAYERS.map(([key,label])=>{
       const group=Boolean(record.group?.[key]), makeup=Boolean(record.makeup?.[key]);
       return <div className="tmv-edit-prayer-row" key={key}><strong>{label}</strong><button type="button" className={group?'tmv-selected':''} disabled={busy} aria-pressed={group} onClick={()=>onToggle({date,prayer:key,kind:'group',checked:!group})}>{group?<Check size={18}/>:null} Jamaat</button><button type="button" className={makeup?'tmv-selected':''} disabled={busy} aria-pressed={makeup} onClick={()=>onToggle({date,prayer:key,kind:'makeup',checked:!makeup})}>{makeup?<Check size={18}/>:null} Qaza</button></div>;
    })}</div></div> : <PrayerReadout date={date} days={days}/>}
    <p className="tmv-reassurance">{marked} of 5 prayers recorded. A blank entry means no update was posted, not necessarily that a prayer was missed.</p>
    <h3 className="tmv-subheading">Past 7 days</h3>
    <div className="tmv-week-list">{Array.from({length:7},(_,i)=>shiftDay(dayISO(),-i)).map(d=>{const x=days[d]||{};const count=PRAYERS.filter(([key])=>x.group?.[key]||x.makeup?.[key]).length;return <button key={d} type="button" onClick={()=>setDate(d)} className={date===d?'tmv-active-day':''}><strong>{prettyDate(d)}</strong><span>{count}/5 updated <ChevronRight size={16}/></span></button>;})}</div>
  </section>;
}

/* V56 HIFZ: a conservative learning-versus-revision progress calculation. */
function hifzProgress(entries) {
  const allSessions=(Array.isArray(entries)?entries:[]).filter(x=>['madani-604','indopak-610'].includes(x?.hifz?.layout));
  const latest=[...allSessions].sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))||String(b.createdAt||'').localeCompare(String(a.createdAt||'')))[0];
  const layout=latest?.hifz?.layout||'indopak-610';
  const total=layout==='indopak-610'?610:604;
  const sessions=allSessions.filter(x=>x.hifz.layout===layout);
  const pages=new Map();
  const dates=new Set();
  let newPages=0,revisionPages=0,newMistakes=0,revisionMistakes=0;
  const today=dayISO();
  const since=shiftDay(today,-29);
  let recentRevision=0;
  let recentNew=0;
  const daily=new Set();
  const recorded=(page)=>{if(!pages.has(page))pages.set(page,{learned:false,reviews:new Map()});return pages.get(page);};
  const addRange=(from,to,callback)=>{
    if(!Number.isInteger(from)||!Number.isInteger(to)||from<1||to>total||to<from)return;
    for(let p=from;p<=to;p++)callback(p);
  };
  for(const entry of sessions){
    const h=entry.hifz,date=String(entry.date||'');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>today)continue;
    dates.add(date);
    newPages+=Number(h.newPages)||0;
    revisionPages+=Number(h.revisionPages)||0;
    newMistakes+=Number(h.newMistakes)||0;
    revisionMistakes+=Number(h.revisionMistakes)||0;
    if(date>=since){recentNew+=Number(h.newPages)||0;recentRevision+=Number(h.revisionPages)||0;daily.add(date);}
    addRange(h.newFrom,h.newTo,page=>{recorded(page).learned=true;});
    addRange(h.revisionFrom,h.revisionTo,page=>{
      const record=recorded(page);
      const previous=record.reviews.get(date);
      // A daily session with any mistakes cannot certify every page as error-free.
      const clean=Number(h.revisionMistakes)===0;
      record.reviews.set(date,previous===false?false:clean);
    });
  }
  let learnedUnique=0,reviewedUnique=0,strong=0;
  for(const value of pages.values()){
    if(value.learned)learnedUnique++;
    if(value.reviews.size)reviewedUnique++;
    const reviews=[...value.reviews.entries()].sort(([a],[b])=>a.localeCompare(b));
    const clean=reviews.filter(([,okay])=>okay).map(([date])=>date);
    const span=clean.length>=3 ? Math.round((Date.parse(clean.at(-1)+'T12:00:00Z')-Date.parse(clean[0]+'T12:00:00Z'))/86400000):0;
    if(reviews.length>=3 && clean.length>=3 && span>=7 && reviews.at(-1)[1] && reviews.at(-2)[1])strong++;
  }
  const earliestRecent=[...dates].filter(date=>date>=since).sort()[0];
  const windowDays=earliestRecent?Math.min(30,Math.max(1,Math.floor((Date.parse(today+'T12:00:00Z')-Date.parse(earliestRecent+'T12:00:00Z'))/86400000)+1)):30;
  const recentDaily=recentRevision/windowDays;
  const daysLogged=dates.size;
  // A workload estimate, NOT a prediction of complete or certified Hifz.
  const expectedDays=daysLogged>=5 && recentDaily>=1
    ? Math.ceil((total-strong)*3/recentDaily):null;
  /* V57 HIFZ PAGE ROUND FORECAST */
  // Round counts are based on recorded page volume; the counters wrap automatically
  // at the current Mushaf page count, while completed round totals are retained.
  // These are workload rounds, not proof that all unique pages were mastered.
  const learningRounds=Math.floor(newPages/total);
  const revisionRounds=Math.floor(revisionPages/total);
  const learningCurrent=newPages%total;
  const revisionCurrent=revisionPages%total;
  const avgNew=recentNew/windowDays;
  const avgRevision=recentRevision/windowDays;
  const remainingLearning=learningCurrent===0 && newPages>0?total:total-learningCurrent;
  const remainingRevision=revisionCurrent===0 && revisionPages>0?total:total-revisionCurrent;
  const learningDays=avgNew>0?Math.ceil(remainingLearning/avgNew):null;
  const revisionDays=avgRevision>0?Math.ceil(remainingRevision/avgRevision):null;
  const projectedDate=days=>days!==null?shiftDay(today,days):null;
  return {learningRounds,revisionRounds,learningCurrent,revisionCurrent,
    learningDays,revisionDays,learningDate:projectedDate(learningDays),revisionDate:projectedDate(revisionDays),
    learningRemaining:remainingLearning,revisionRemaining:remainingRevision,forecastSampleDays:windowDays,
    learningAvg:avgNew,revisionAvg:avgRevision,
    sessions:sessions.length,newPages,revisionPages,newMistakes,revisionMistakes,
    learnedUnique,reviewedUnique,strong,total,layout,expectedDays,
    avgDailyNew:recentNew/windowDays,avgDailyRevision:recentDaily,
    newErrorRate:newPages?newMistakes/newPages:null,
    revisionErrorRate:revisionPages?revisionMistakes/revisionPages:null};
}

function HifzOverview({quran,ownerMode}){
  /* V59 FRIENDLIER UI COPY */
  const [forecastDay,setForecastDay]=useState(dayISO());
  const [forecastRefresh,setForecastRefresh]=useState(0);
  useEffect(()=>{const timer=window.setInterval(()=>setForecastDay(dayISO()),60000);return ()=>window.clearInterval(timer);},[]);
  const stats=useMemo(()=>hifzProgress(quran),[quran,forecastDay,forecastRefresh]);
  if(!stats.sessions)return <p style={{fontSize:12,color:'#7c9285',margin:'10px 0 0'}}>
    {ownerMode?'No Hifz practice logged yet. Use Hifz practice below to enter new pages, revision pages, mistakes and printed page ranges. Existing normal readings are unchanged.':'No Hifz practice logged yet. Older normal readings do not count toward mastered Hifz pages.'}
  </p>;
  const value=Math.min(100,stats.strong/stats.total*100);
  const tile={minWidth:105,flex:'1 1 105px',border:'1px solid #e2ebe4',background:'#f9fcfa',borderRadius:9,padding:'9px 10px'};
  return <section aria-label="Hifz learning and revision progress" style={{margin:'10px 0 13px',padding:'12px 13px',border:'1px solid #dcebe1',borderRadius:13,background:'#fff'}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}>
      <strong style={{fontSize:13,color:'#244b37'}}>Hifz · Learning & Revision</strong>
      {ownerMode&&<button type="button" onClick={()=>{setForecastDay(dayISO());setForecastRefresh(x=>x+1);}} style={{fontSize:11,border:'1px solid #cee4d4',borderRadius:8,padding:'5px 8px',background:'#eff8f1',color:'#226748'}}>Refresh progress</button>}<small style={{fontSize:10,color:'#718b7b'}}>{stats.layout==='indopak-610'?'IndoPak 15-line · 610 pages':'Madani · 604 pages'}</small>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',gap:6,margin:'9px 0'}}>
      <div style={tile}><div style={{fontSize:19,fontWeight:750,color:'#246044'}}>{stats.newPages}</div><small>New-page practice</small></div>
      <div style={tile}><div style={{fontSize:19,fontWeight:750,color:'#246044'}}>{stats.revisionPages}</div><small>Revision pages</small></div>
      <div style={tile}><div style={{fontSize:19,fontWeight:750,color:'#246044'}}>{stats.newMistakes} / {stats.revisionMistakes}</div><small>New / Revision mistakes</small></div>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',gap:8,margin:'10px 0',fontSize:11}}>
      {[{name:'Learning',rounds:stats.learningRounds,current:stats.learningCurrent,avg:stats.learningAvg,
         remaining:stats.learningRemaining,days:stats.learningDays,date:stats.learningDate},
        {name:'Revision',rounds:stats.revisionRounds,current:stats.revisionCurrent,avg:stats.revisionAvg,
         remaining:stats.revisionRemaining,days:stats.revisionDays,date:stats.revisionDate}].map(item=><div key={item.name}
        style={{...tile,flex:'1 1 200px'}}>
        <strong style={{color:'#285b41'}}>{item.name} progress</strong>
        <div style={{marginTop:4}}>This round: {item.current}/{stats.total} pages · Completed: {item.rounds} full Quran {item.rounds===1?'round':'rounds'}</div>
        <div style={{height:5,background:'#e5eee8',borderRadius:9,overflow:'hidden',margin:'6px 0'}}>
          <div style={{width:(item.current/stats.total*100)+'%',height:'100%',background:'#3b9369'}}/>
        </div>
        <div>Average: {item.avg.toFixed(2)} pages/day · Remaining: {item.remaining} pages</div>
        <div>{item.days!==null?('At this pace: about '+item.days+' days left · Expected by '+item.date):'Add a few more page entries to estimate completion time'}</div>
      </div>)}
    </div>
    <small style={{fontSize:10,color:'#748779',display:'block',marginBottom:8}}>The estimate updates automatically from your saved page entries. One full Mushaf page count completes one Quran round. History and mistakes stay saved. This is a helper estimate only, not a final Hifz judgement.</small>
    <div style={{display:'flex',justifyContent:'space-between',gap:8,fontSize:11,color:'#4b715a'}}>
      <span>{stats.strong}/{stats.total} well reviewed pages*</span><span>{value.toFixed(1)}%</span>
    </div>
    <div role="progressbar" aria-valuenow={stats.strong} aria-valuemin={0} aria-valuemax={stats.total} aria-label="Pages meeting review rule"
      style={{height:6,borderRadius:99,overflow:'hidden',background:'#eaf0eb',margin:'6px 0 7px'}}>
      <div style={{width:value+'%',height:'100%',background:'linear-gradient(90deg,#58ac7a,#1e6446)',borderRadius:99}}/>
    </div>
    <p style={{fontSize:11,lineHeight:1.6,color:'#607c69',margin:0}}>
      Tracked unique pages: {stats.learnedUnique} learning · {stats.reviewedUnique} revision.
      {stats.expectedDays?` Revision strength may improve in about ${stats.expectedDays} more days at the recent pace.`:
       ' Add a few more daily entries to improve the estimate.'}
    </p>
    <small style={{fontSize:10,color:'#8b9c8e',lineHeight:1.5,display:'block',marginTop:5}}>
      *Well reviewed means a page was revised cleanly at least 3 times across 7 or more days, including the last 2 reviews. This is only a helper indicator. Pages without exact page ranges cannot be counted here.
    </small>
  </section>;
}

function QuranPanel({ ownerMode, quran, busy, onAdd, onDelete }) {
  const [form, setForm]=useState({date:dayISO(),para:'1',pagesRead:'1',fromPage:'',toPage:'',note:''});
  const [hifzMode,setHifzMode]=useState(true);
  const [hifzError,setHifzError]=useState('');
  const [hifzForm,setHifzForm]=useState({date:dayISO(),para:'1',layout:'indopak-610',newPages:'0',revisionPages:'0',newMistakes:'0',revisionMistakes:'0',newFrom:'',newTo:'',revisionFrom:'',revisionTo:'',note:''});
  const updateHifz=(key,value)=>setHifzForm(old=>({...old,[key]:value}));
  const update=(key,value)=>setForm(old=>({...old,[key]:value}));
  const total=quran.reduce((s,x)=>s+Number(x.pagesRead||0),0);
  const sorted=[...quran].sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b.createdAt).localeCompare(String(a.createdAt)));
  return <section className="tmv-detail-view"><div className="tmv-detail-heading"><CategoryArtwork type="quran"/><div><h2>Quran Reading</h2><p>Progress in the 15-line Quran, saved by <AhsanName/>.</p></div></div>
    <div className="tmv-quran-stat"><strong>{total}</strong><span>pages recorded in total</span></div>
    <HifzOverview quran={quran} ownerMode={ownerMode}/>
    {ownerMode&&<div style={{display:'flex',alignItems:'center',gap:7,margin:'9px 0',flexWrap:'wrap'}}>
      <button type="button" onClick={()=>setHifzMode(true)} aria-pressed={hifzMode} style={{fontSize:12,border:'1px solid #cfe4d4',borderRadius:9,padding:'6px 10px',background:hifzMode?'#eaf6ee':'#fff',color:'#276144',fontWeight:hifzMode?750:500}}>Hifz practice</button>
      <button type="button" onClick={()=>setHifzMode(false)} aria-pressed={!hifzMode} style={{fontSize:12,border:'1px solid #cfe4d4',borderRadius:9,padding:'6px 10px',background:!hifzMode?'#eaf6ee':'#fff',color:'#276144',fontWeight:!hifzMode?750:500}}>Normal reading</button>
    </div>}
    {ownerMode&&hifzMode&&<form className="tmv-owner-quran tm-stack" onSubmit={async e=>{
      e.preventDefault();
      const total=Number(hifzForm.newPages||0)+Number(hifzForm.revisionPages||0);
      if(total<1){setHifzError('Enter at least one learning or revision page.');return;}
      setHifzError('');
      const result=await onAdd({date:hifzForm.date,para:hifzForm.para,pagesRead:total,
        fromPage:'',toPage:'',note:hifzForm.note,hifz:{
          newPages:Number(hifzForm.newPages||0),revisionPages:Number(hifzForm.revisionPages||0),
          newMistakes:Number(hifzForm.newMistakes||0),revisionMistakes:Number(hifzForm.revisionMistakes||0),
          newFrom:hifzForm.newFrom,newTo:hifzForm.newTo,layout:hifzForm.layout,
          revisionFrom:hifzForm.revisionFrom,revisionTo:hifzForm.revisionTo}});
      if(result)setHifzForm(old=>({...old,newPages:'0',revisionPages:'0',newMistakes:'0',revisionMistakes:'0',
        newFrom:'',newTo:'',revisionFrom:'',revisionTo:'',note:''}));
    }}>
      <h3 style={{margin:0,fontSize:14}}>Today's Hifz practice</h3>
      <p style={{fontSize:11,color:'#718776',margin:0}}>Learning (sabaq) and revision (manzil) are tracked separately. Enter mistakes for each.</p>
      <label className="tm-field"><span>Your Mushaf layout</span><select value={hifzForm.layout} onChange={e=>updateHifz('layout',e.target.value)}>
        <option value="indopak-610">IndoPak 15-line · 610 pages</option>
        <option value="madani-604">Madani · 604 pages</option>
      </select></label>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:9}}>
        <label className="tm-field"><span>Date</span><input type="date" required value={hifzForm.date} onChange={e=>updateHifz('date',e.target.value)}/></label>
        <label className="tm-field"><span>Para</span><select value={hifzForm.para} onChange={e=>updateHifz('para',e.target.value)}>{Array.from({length:30},(_,i)=><option key={i+1} value={i+1}>Para {i+1}</option>)}</select></label>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))',gap:10}}>
        <div style={{padding:9,borderRadius:10,border:'1px solid #dcece0',background:'#f7fbf8'}}>
          <strong style={{fontSize:12,color:'#1d6844'}}>New learning</strong>
          <label className="tm-field"><span>New pages</span><input type="number" required min="0" max="50" value={hifzForm.newPages} onChange={e=>updateHifz('newPages',e.target.value)}/></label>
          <label className="tm-field"><span>Learning mistakes</span><input type="number" required min="0" max="200" value={hifzForm.newMistakes} onChange={e=>updateHifz('newMistakes',e.target.value)}/></label>
          <label className="tm-field"><span>Mushaf page from</span><input type="number" min="1" max={hifzForm.layout==='indopak-610'?610:604} placeholder="Optional" value={hifzForm.newFrom} onChange={e=>updateHifz('newFrom',e.target.value)}/></label>
          <label className="tm-field"><span>To page</span><input type="number" min="1" max={hifzForm.layout==='indopak-610'?610:604} placeholder="Optional" value={hifzForm.newTo} onChange={e=>updateHifz('newTo',e.target.value)}/></label>
        </div>
        <div style={{padding:9,borderRadius:10,border:'1px solid #dcece0',background:'#f7fbf8'}}>
          <strong style={{fontSize:12,color:'#1d6844'}}>Revision</strong>
          <label className="tm-field"><span>Revision pages</span><input type="number" required min="0" max="100" value={hifzForm.revisionPages} onChange={e=>updateHifz('revisionPages',e.target.value)}/></label>
          <label className="tm-field"><span>Revision mistakes</span><input type="number" required min="0" max="200" value={hifzForm.revisionMistakes} onChange={e=>updateHifz('revisionMistakes',e.target.value)}/></label>
          <label className="tm-field"><span>Mushaf page from</span><input type="number" min="1" max={hifzForm.layout==='indopak-610'?610:604} placeholder="Optional" value={hifzForm.revisionFrom} onChange={e=>updateHifz('revisionFrom',e.target.value)}/></label>
          <label className="tm-field"><span>To page</span><input type="number" min="1" max={hifzForm.layout==='indopak-610'?610:604} placeholder="Optional" value={hifzForm.revisionTo} onChange={e=>updateHifz('revisionTo',e.target.value)}/></label>
        </div>
      </div>
      <label className="tm-field"><span>Practice note (optional)</span><input maxLength={350} value={hifzForm.note} onChange={e=>updateHifz('note',e.target.value)} placeholder="What needs more revision?"/></label>
      {hifzError&&<small role="alert" style={{color:'#b44737'}}>{hifzError}</small>}
      <small style={{fontSize:10,color:'#7d9283'}}>If you add ranges, each range must match the entered page count. Without ranges, practice is saved but unique mastered-page credit is not awarded.</small>
      <button className="tm-primary tm-wide" type="submit" disabled={busy}>Save Hifz practice</button>
    </form>}
    {ownerMode && !hifzMode && <form className="tmv-owner-quran tm-stack" onSubmit={async e=>{e.preventDefault();const ok=await onAdd(form);if(ok)setForm(old=>({...old,pagesRead:'1',fromPage:'',toPage:'',note:''}));}}>
      <h3>Add a reading</h3><label className="tm-field"><span>Para</span><select value={form.para} onChange={e=>update('para',e.target.value)}>{Array.from({length:30},(_,i)=><option key={i+1} value={i+1}>Para {i+1}</option>)}</select></label>
      <label className="tm-field"><span>Pages read</span><input type="number" inputMode="numeric" min="1" max="200" required value={form.pagesRead} onChange={e=>update('pagesRead',e.target.value)}/></label>
      <label className="tm-field"><span>Date</span><input type="date" required value={form.date} onChange={e=>update('date',e.target.value)}/></label>
      <details className="tm-details"><summary>More details (optional)</summary><label className="tm-field"><span>From printed page</span><input type="number" min="1" value={form.fromPage} onChange={e=>update('fromPage',e.target.value)}/></label><label className="tm-field"><span>To printed page</span><input type="number" min="1" value={form.toPage} onChange={e=>update('toPage',e.target.value)}/></label><label className="tm-field"><span>Note</span><input value={form.note} onChange={e=>update('note',e.target.value)} maxLength={350}/></label></details>
      <button className="tm-primary tm-wide" type="submit" disabled={busy}>Save reading</button>
    </form>}
    <h3 className="tmv-subheading">Reading history</h3>
    {sorted.length ? <div className="tmv-history-items">{sorted.map(item=><div className="tmv-reading-history" key={item.id}><span className="tmv-book-symbol"><BookOpen size={19}/></span><div><strong>{item.hifz ? `Hifz · ${item.hifz.newPages} learning · ${item.hifz.revisionPages} revision · Mistakes ${item.hifz.newMistakes}/${item.hifz.revisionMistakes}` : `Para ${item.para} · ${item.pagesRead} ${Number(item.pagesRead)===1?'page':'pages'}`}</strong><small>{prettyDate(item.date)}{item.fromPage ? ` · Page ${item.fromPage}${item.toPage?`–${item.toPage}`:''}` : ''}</small>{item.note&&<p>{item.note}</p>}</div>{ownerMode&&<button type="button" disabled={busy} aria-label="Delete reading" onClick={()=>onDelete(item)}><Trash2 size={18}/></button>}</div>)}</div>:<p className="tmv-empty-note">No Quran readings have been recorded yet.</p>}
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
  const [creationPin,setCreationPin]=useState('');
  const [ownerMode,setOwnerMode]=useState(false);
  const [questionOpen,setQuestionOpen]=useState(false);
  const [seenOpen,setSeenOpen]=useState(false);
  const [today30Open,setToday30Open]=useState(false);
  const [questionsPending,setQuestionsPending]=useState(0);
  /* V42: Owner-initiated GPS, scoped to this open browser tab only. */
  const [lifeMapOpen,setLifeMapOpen] = useState(false);
  const [lifeMapTracking,setLifeMapTracking] = useState(false);
  const [lifeMapToken,setLifeMapToken] = useState('');
  const [lifeMapData,setLifeMapData] = useState({live:null,sharing:false,visited:[]});
  const [lifeMapBusy,setLifeMapBusy] = useState(false);
  const [lifeMapError,setLifeMapError] = useState('');
  useEffect(() => {
    if (!lifeMapOpen || !authenticated) return undefined;
    let alive=true;
    let busy=false;
    const fetchMap = async () => {
      if (busy || document.visibilityState === 'hidden') return;
      busy=true;
      try {const data=await api({action:'life_map_get'});if(alive) {setLifeMapData(data);setLifeMapError('');}}
      catch(err) {if(alive)setLifeMapError(err.message||'Could not load the private map.');}
      finally {busy=false;}
    };
    fetchMap();
    const timer=window.setInterval(fetchMap,25000);
    return ()=>{alive=false;window.clearInterval(timer);};
  },[lifeMapOpen,authenticated]);
  useEffect(() => {
    if (!lifeMapTracking || !ownerMode || !authenticated || !creationPin || !lifeMapToken) return undefined;
    if (!navigator.geolocation || !window.isSecureContext) {
      setLifeMapError('GPS requires HTTPS and a device with location access.');
      setLifeMapTracking(false);
      return undefined;
    }
    let active=true, inFlight=false, lastAt=0, lastLat=null, lastLng=null, lastAccuracy=Infinity;
    const sendPosition = async position => {
      if (!active || document.visibilityState === 'hidden' || inFlight) return;
      const {latitude:lat,longitude:lng,accuracy} = position.coords || {};
      if (![lat,lng,accuracy].every(Number.isFinite)) return;
      if (accuracy > 1500) {
        setLifeMapError(`GPS is too approximate (±${Math.round(accuracy)} m). Enable precise location on your phone.`);
        return;
      }
      if (Date.now() - Number(position.timestamp || 0) > 30000) return;
      const currentTime=Date.now();
      const distance=lastLat === null ? Infinity : Math.hypot((lat-lastLat)*111000,(lng-lastLng)*111000*Math.cos(lat*Math.PI/180));
      const significantlyBetter=accuracy < lastAccuracy * 0.62;
      if (!significantlyBetter && ((currentTime-lastAt < 10000) || (distance < 25 && currentTime-lastAt < 55000))) return;
      inFlight=true;
      try {
        const data=await api({action:'life_map_update',pin:creationPin,token:lifeMapToken,lat,lng,accuracy});
        if (active) {lastAt=Date.now();lastLat=lat;lastLng=lng;lastAccuracy=accuracy;setLifeMapData(data);setLifeMapError('');}
      } catch(err) {if(active) setLifeMapError(err.message||'Could not share the location.');}
      finally {inFlight=false;}
    };
    const onError = error => {
      if (!active) return;
      setLifeMapError(error?.code===1?'Location permission denied. Allow precise location in your browser settings.':
        error?.code===2?'Device location unavailable. Turn on GPS and try again.':'Waiting for a reliable GPS signal…');
      if (error?.code === 1) setLifeMapTracking(false);
    };
    const options={enableHighAccuracy:true,maximumAge:0,timeout:25000};
    const watchId=navigator.geolocation.watchPosition(sendPosition,onError,options);
    const timer=window.setInterval(()=>{
      if(active && document.visibilityState === 'visible') navigator.geolocation.getCurrentPosition(sendPosition,onError,options);
    },45000);
    return ()=>{active=false;window.clearInterval(timer);navigator.geolocation.clearWatch(watchId);};
  },[lifeMapTracking,ownerMode,authenticated,creationPin,lifeMapToken]);

  async function startLifeMap() {
    if (!ownerMode || !creationPin) {setLifeMapError('Sign in to manage live location.');return;}
    if (!navigator.geolocation || !window.isSecureContext) {setLifeMapError('HTTPS and a GPS-enabled browser are required.');return;}
    setLifeMapError('');setLifeMapBusy(true);
    try {
      const {token,...data}=await api({action:'life_map_start',pin:creationPin});
      if (!token) throw Error('Could not start a private location session.');
      setLifeMapData(data);setLifeMapToken(token);setLifeMapTracking(true);
    } catch(err) {setLifeMapError(err.message||'Unable to start live sharing.');}
    finally {setLifeMapBusy(false);}
  }
  async function stopLifeMap() {
    setLifeMapTracking(false);setLifeMapToken('');
    setLifeMapData(state=>({...state,live:null,sharing:false}));
    if (!creationPin || !authenticated) return;
    try {const data=await api({action:'life_map_stop',pin:creationPin});setLifeMapData(data);}
    catch(err) {setLifeMapError(err.message||'Could not stop sharing on the server. It will expire shortly.');}
  }
  async function lifeMapMarkCity(city,country) {
    if (!creationPin || !ownerMode) return;
    setLifeMapBusy(true);setLifeMapError('');
    try {setLifeMapData(await api({action:'life_map_mark_city',pin:creationPin,city,country}));return true;}
    catch(err) {setLifeMapError(err.message||'Could not save the city.');return false;}
    finally {setLifeMapBusy(false);}
  }
  async function lifeMapClear() {
    if (!creationPin || !ownerMode || !window.confirm('Erase all visited cities and the shared location? This cannot be undone.')) return;
    setLifeMapTracking(false);setLifeMapToken('');setLifeMapBusy(true);setLifeMapError('');
    try {setLifeMapData(await api({action:'life_map_clear',pin:creationPin}));}
    catch(err) {setLifeMapError(err.message||'Could not erase map history.');}
    finally {setLifeMapBusy(false);}
  }

  const [editor,setEditor]=useState(null);
  const [expanded,setExpanded]=useState(null);
  const [note,setNote]=useState('');
  const [search,setSearch]=useState('');
  const [filter,setFilter]=useState('all');
  const [summaryOpen,setSummaryOpen]=useState(false);
  const [familyLang,setFamilyLang]=useState(()=>{
    try{return window.localStorage.getItem('tm-family-language')==='ur'?'ur':'en';}catch(_){return 'en';}
  });
  const familySmartRootRef=useRef(null);
  useEffect(()=>{
    if(!authenticated||ownerMode||welcome||!familySmartRootRef.current)return undefined;
    return familyScreenTransform(familySmartRootRef.current,familyLang);
  },[authenticated,ownerMode,welcome,familyLang,section,summaryOpen,questionOpen,lifeMapOpen,today30Open]);
  useEffect(()=>{
    if(!authenticated||ownerMode)return;
    try{window.localStorage.setItem('tm-family-language',familyLang);}catch(_){}
  },[authenticated,ownerMode,familyLang]);
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
  /* Record a verified family visit when the app opens or returns to foreground.
     Redis discards the week's records at the Monday boundary. */
  useEffect(()=>{
    if(loading||!authenticated||!['nasir','talat','happa','yamna'].includes(familyViewer))return undefined;
    const record=()=>{if(document.visibilityState==='visible')api({action:'seen_record'}).catch(()=>{});};
    record();
    document.addEventListener('visibilitychange',record);
    return ()=>document.removeEventListener('visibilitychange',record);
  },[loading,authenticated,familyViewer]);
  /* V44: tiny owner inbox badge; no background polling for ordinary family visitors. */
  useEffect(() => {
    if (!authenticated || !ownerMode || !creationPin) { setQuestionsPending(0); return undefined; }
    let active = true;
    const check = () => {
      if (document.visibilityState === 'hidden') return;
      api({action:'family_questions_get',pin:creationPin})
        .then(data=>{if(active)setQuestionsPending(Number(data.pending)||0);})
        .catch(()=>{});
    };
    check();
    const timer = window.setInterval(check,60000);
    window.addEventListener('focus',check);
    return () => { active = false;window.clearInterval(timer);window.removeEventListener('focus',check); };
  }, [authenticated,ownerMode,creationPin]);
  useEffect(()=>{
    let mounted=true;
    api().then(data=>{if(mounted){setAuthenticated(Boolean(data.authenticated));setFamilyViewer(data.viewer||'family');setOwnerMode(data.viewer==='owner');setCreationPin(data.viewer==='owner'?'verified-session':'');setEntries(data.entries||[]);setPrayerDays(data.prayerDays||{});setQuranEntries(data.quranEntries||[]);}})
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
      setAuthenticated(false);setFamilyViewer('family');setOwnerMode(false);setCreationPin('');setQuestionOpen(false);setEntries([]);setPrayerDays({});setQuranEntries([]);setLoginError('Please sign in again.');
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
      setAuthenticated(true);setFamilyViewer(data.viewer||'family');setOwnerMode(data.viewer==='owner');setCreationPin(data.viewer==='owner'?'verified-session':'');setPassword('');setWelcome(data.viewer!=='owner');
    } catch(err) {
      // Do not show an error for an older, incomplete input if typing resumed.
      if (latestPasswordRef.current === suppliedPassword) setLoginError(err.message);
    } finally {
      loginAttemptRef.current.pending=false;
      setBusy(false);
    }
  }
  async function signOut(){setSeenOpen(false);setToday30Open(false);try{if(lifeMapTracking&&creationPin){setLifeMapTracking(false);setLifeMapToken('');await api({action:'life_map_stop',pin:creationPin}).catch(()=>{});}await api({action:'logout'});loginAttemptRef.current.last='';setAuthenticated(false);setFamilyViewer('family');setOwnerMode(false);setCreationPin('');setQuestionOpen(false);setEntries([]);setPrayerDays({});setQuranEntries([]);setWelcome(false);setEditor(null);setNotice('');setSection('overview');}catch(err){fail(err);}}
  function newTask(target='office'){if(!ownerMode)return;setEditor(initialTask(target));}
  async function saveTask(form){setBusy(true);setNotice('');try{const editing=Boolean(editor?.id);const data=await api({action:editing?'update':'create',...(editing?{id:editor.id}:{pin:creationPin}),item:form});setEntries(list=>editing?list.map(x=>x.id===data.item.id?data.item:x):[data.item,...list]);setEditor(null);setNotice(editing?'Updated successfully.':'New task saved.');if(data.item.section==='university')api({action:'admission_research',taskId:data.item.id}).catch(()=>{});}catch(err){fail(err);}finally{setBusy(false);}}
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
  return <main ref={familySmartRootRef} className="tm-page tmv-family"><div className="tm-shell tmv-shell">
    <header className="tmv-header"><button type="button" className="tmv-brand" onClick={()=>go('overview')} aria-label="Go to Ahsan's daily updates"><AhsanAvatar className="tmv-avatar-header"/><span><strong><AhsanName/>’s Updates</strong><small>Family journal</small></span></button><div className="tmv-mini-header-actions">{!ownerMode&&<div data-family-lang-ignore="true" role="group" aria-label="Family language" style={{display:'inline-flex',alignItems:'center',gap:2,whiteSpace:'nowrap',padding:'2px 4px',border:'1px solid #d9e8df',borderRadius:8,background:'#f5faf6',fontSize:10}}>
      <button type="button" aria-pressed={familyLang==='en'} onClick={()=>setFamilyLang('en')} style={{border:0,background:'transparent',color:familyLang==='en'?'#145b3d':'#88998d',fontWeight:familyLang==='en'?800:500,padding:'3px 2px',cursor:'pointer'}}>EN</button>
      <span aria-hidden="true" style={{color:'#9aa99f'}}>|</span>
      <button type="button" lang="ur" aria-pressed={familyLang==='ur'} onClick={()=>setFamilyLang('ur')} style={{border:0,background:'transparent',color:familyLang==='ur'?'#145b3d':'#88998d',fontWeight:familyLang==='ur'?800:500,padding:'3px 2px',cursor:'pointer'}}>اردو</button>
      </div>}<FamilySevenDayReminder viewer={familyViewer}/><FamilyIdentity viewer={familyViewer}/><button type="button" className="tmv-logout" onClick={signOut}><LogOut size={18}/><span>Log out</span></button></div></header>
    {section!=='overview'&&<button type="button" className="tmv-back" onClick={()=>go('overview')}><ArrowLeft size={20}/> Back to daily updates</button>}
    {notice&&<div className="tmv-notice" role="status"><CheckCircle2 size={19}/><span>{notice}</span><button type="button" onClick={()=>setNotice('')} aria-label="Dismiss"><X size={17}/></button></div>}
    {section==='overview'&&<FamilyToday entries={entries} days={prayerDays} quran={quranEntries} viewDate={viewDate} setViewDate={setViewDate} onOpen={go} ownerMode={ownerMode} onNew={newTask} onOpenSummary={()=>setSummaryOpen(true)}
      love={love.date === viewDate ? love : {date:viewDate,liked:false,count:0,names:[]}} loveBusy={loveBusy} onLove={toggleLove} ownerPin={creationPin} onOpenLifeMap={()=>{setLifeMapError('');setLifeMapOpen(true);}}
      onOpenQuestions={()=>setQuestionOpen(true)} questionsPending={questionsPending} onOpenSeen={()=>setSeenOpen(true)}
      viewer={familyViewer} onOpenToday30={()=>setToday30Open(true)} language={ownerMode ? 'en' : familyLang}/>}
    {['office','personal','university'].includes(section)&&<WorkPanel section={section} ownerMode={ownerMode} entries={entries} busy={busy} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} expanded={expanded} setExpanded={setExpanded} note={note} setNote={setNote} onNew={newTask} onNote={addNote} onEdit={item=>setEditor({...item})} onDelete={deleteTask} onStatus={updateTask}/>}
    {section==='prayer'&&<PrayerPanel ownerMode={ownerMode} date={prayerDate} setDate={setPrayerDate} days={prayerDays} busy={busy} onToggle={togglePrayer}/>}
    {section==='quran'&&<QuranPanel ownerMode={ownerMode} quran={quranEntries} busy={busy} onAdd={addQuran} onDelete={deleteQuran}/>}
    <div className="tmv-bottom"><p>Only for <AhsanName/>’s family.</p></div>
    <div className="tmv-install-footer"><InstallShortcut/></div>
  </div>
  {seenOpen && ownerMode && <SeenByWeekModal onClose={()=>setSeenOpen(false)}/>}
  {today30Open && !ownerMode && <AhsanToday30Modal entries={entries} prayerDays={prayerDays} quran={quranEntries} onClose={()=>setToday30Open(false)}/>}
  {questionOpen&&<FamilyQuestionsModal viewer={familyViewer} ownerMode={ownerMode} ownerPin={creationPin}
    love={love.date===viewDate?love:null} onPendingChange={setQuestionsPending} onClose={()=>setQuestionOpen(false)}/>}
  {lifeMapOpen&&<LifeMapModal mapData={lifeMapData} tracking={lifeMapTracking} ownerMode={ownerMode}
    busy={lifeMapBusy} error={lifeMapError} onClose={()=>setLifeMapOpen(false)}
    onStart={startLifeMap} onStop={stopLifeMap} onMark={lifeMapMarkCity} onClear={lifeMapClear}/>}
  {editor&&<TaskEditor key={editor.id||`new-${editor.section}`} initial={editor} saving={busy} onClose={()=>setEditor(null)} onSave={saveTask}/>}
  {summaryOpen&&<SummaryChat entries={entries} prayerDays={prayerDays} quranEntries={quranEntries} selectedDate={viewDate} onClose={()=>setSummaryOpen(false)} onSessionError={fail}/>}
  </main>;
}
