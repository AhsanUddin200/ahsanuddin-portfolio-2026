import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, CalendarDays, Check,
  CheckCircle2, ChevronLeft, ChevronRight, Clock3, Edit3, Eye, EyeOff,
  GraduationCap, Heart, KeyRound, LockKeyhole, LogOut, Plus, Search,
  Send, ShieldAlert, ShieldCheck, Sparkles, Trash2, TrendingUp, X, Home, Menu, MessageSquareText,
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
            <button type="submit" className="tm-primary tm-wide" disabled={busy}>{busy ? 'Signing in…' : 'View daily updates'} <ArrowRight size={18}/></button>
          </form>
          <p className="tmv-signin-note"><ShieldCheck size={16} strokeWidth={1.8}/> Private and password protected</p>
        </div>
      </div>
      <Link className="tm-return" to="/"><ArrowLeft size={16}/> Back to website</Link>
    </div>
  );
}

function CautionWelcome({ onContinue }) {
  // Greeting only: no changes to authentication, permissions, API or saved data.
  // No selection within 4 seconds => show both partner lines immediately.
  const [relationChoice, setRelationChoice] = useState(null);
  useEffect(() => {
    if (relationChoice !== null) return undefined;
    const timer = window.setTimeout(() => {
      setRelationChoice(current => current === null ? 'partner-auto' : current);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [relationChoice]);

  const isPartner = relationChoice === 'partner' || relationChoice === 'partner-auto';
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
          {relationChoice === null && (
            <div className="tmv-relation-prompt">
              <p className="tmv-relation-question">Are you <AhsanName/>’s parents?</p>
              <div className="tmv-relation-actions" role="group" aria-label="Are you Ahsan's parents?">
                <button type="button" className="tmv-relation-option"
                  onClick={() => setRelationChoice('parents')}>Yes</button>
                <button type="button" className="tmv-relation-option"
                  onClick={() => setRelationChoice('partner')}>No</button>
              </div>
            </div>
          )}
          {relationChoice !== null && (
            <div className="tm-typing tmv-relation-message" role="status" aria-live="polite">
              {relationChoice === 'parents'
                ? 'You are tracking your son.'
                : isPartner && <>
                    <span>You are Ahsan's favorite woman and life partner happa❤️</span>
                    <span className="tmv-partner-followup">You are tracking your man.</span>
                  </>}
            </div>
          )}
          <p>A private look into the moments, effort and progress <AhsanName/> shares with you.</p>
          <button className="tm-primary tm-wide" type="button" onClick={onContinue}>
            Continue to updates <ArrowRight size={18}/>
          </button>
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
  en: 'Hi! I can summarize Ahsan’s updates. Which period should I look at?',
  ur: 'السلام علیکم! میں احسن کی اپڈیٹس کا خلاصہ بتا سکتا ہوں۔ کتنے دنوں کی سمری چاہیے؟',
};

function parseChatPeriod(raw) {
  const s = String(raw || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (!s) return null;
  if (/^(1|۱|١)$/.test(s) || /today|to day|24\s*(hour|hr)|aaj|^aj$|aaj ki|aj ki|abhi|آج|اج|آج کی|آج کا/.test(s)) return 'today';
  if (/^(2|۲|٢)$/.test(s) || /week|7\s*(days|day|din)|seven days|hafta|haftay|hafty|ہفت|سات دن|۷\s*دن|٧\s*دن/.test(s)) return 'week';
  if (/^(3|۳|٣)$/.test(s) || /month|30\s*(days|day|din)|thirty days|mahina|maheena|mahine|maheen|مہین|ماہ|تیس دن|۳۰\s*دن|٣٠\s*دن/.test(s)) return 'month';
  return null;
}
function parseChatTopic(raw) {
  const s = String(raw || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (!s) return null;
  if (/^(1|۱|١)$/.test(s) || /everything|all details|all topics|sab kuch|sari|saari|sab|puri|poori|تمام|سب کچھ|ساری|سارے|مکمل|ہر چیز|سب کی|تمام تفصیلات|^all$/.test(s)) return 'all';
  if (/^(2|۲|٢)$/.test(s) || /prayer|namaz|namaaz|salah|salat|jamaat|qaza|نماز|جماعت|قضا/.test(s)) return 'prayer';
  if (/^(3|۳|٣)$/.test(s) || /quran|quraan|qur'an|para|parah|قرآن|قران|پارہ|سپارہ|تلاوت/.test(s)) return 'quran';
  if (/^(4|۴|٤)$/.test(s) || /office|project|job|client|kaam|kam|work|دفتر|کام|پروجیکٹ/.test(s)) return 'office';
  if (/^(5|۵|٥)$/.test(s) || /university|uni\b|college|admission|application|interview|یونیورسٹی|داخلہ|کالج|انٹرویو/.test(s)) return 'university';
  if (/^(6|۶|٦)$/.test(s) || /personal|family|life|ghar|routine|myself|ذاتی|گھر|خاندانی/.test(s)) return 'personal';
  return null;
}

// Clear bilingual family updates based on saved records only.
// Give the actual task, what changed, the university/program and next date.
// A current status without a note is never described as work done today.
// This uses only existing data and does not change the API or database.
function buildFamilyReport({ entries, prayerDays, quranEntries, period, topic }) {
  const days = CHAT_PERIODS.find(x => x.id === period)?.days || 7;
  const end = dayISO();
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

  // Clear language for Office and Personal: prioritize real progress notes,
  // otherwise show actual task titles and status as a *current snapshot*.
  const explainWork = (section, labelEn, labelUr) => {
    const items = bySection(section);
    if (!items.length) return { recorded:false, en:`${labelEn}: No tasks saved.`, ur:`${labelUr}: کوئی کام درج نہیں۔` };
    const updates = items.flatMap(task => allNotes(task).map(note => ({ task, note })))
      .sort((a,b) => String(b.note.createdAt).localeCompare(String(a.note.createdAt)));
    if (updates.length) {
      const first = updates[0];
      const text = `${taskLabel(first.task)}: ${brief(first.note.note, 140)}`;
      const suffix = updates.length > 1 ? ` (+${updates.length - 1} more update${updates.length > 2 ? 's' : ''})` : '';
      return {
        recorded:true,
        en:`${labelEn}: ${text}${suffix}.`,
        ur:`${labelUr}: ${text}${updates.length > 1 ? ` (مزید ${updates.length - 1} اپڈیٹس)` : ''}۔`,
      };
    }
    const active = [...items].sort((a,b) => {
      const priority = x => x.status === 'in_progress' ? 0 : x.status === 'planned' ? 1 : 2;
      return priority(a) - priority(b) || newest(a,b);
    }).slice(0,2);
    const statusText = item => statusLabels[item.status] || ['recorded','درج'];
    const en = active.map(task => `${taskLabel(task)} (${statusText(task)[0]})`).join('; ');
    const ur = active.map(task => `${taskLabel(task)} (${statusText(task)[1]})`).join('؛ ');
    return {
      recorded:true,
      en:`${labelEn} — current tasks: ${en}. No new progress note ${days === 1 ? 'today' : 'in this period'}.`,
      ur:`${labelUr} — موجودہ کام: ${ur}۔ ${days === 1 ? 'آج کی' : 'اس مدت کی'} نئی پیش رفت درج نہیں ہوئی۔`,
    };
  };
  const office = explainWork('office','Office','دفتر');
  const personal = explainWork('personal','Personal','ذاتی کام');

  const universities = bySection('university');
  const bestUniversity = [...universities].sort((a,b) => {
    const score = task => {
      const latest = allNotes(task).length > 0;
      const upcoming = task.meta?.upcomingDate && task.meta.upcomingDate >= end;
      const recent = inPeriod(task.updatedAt) || inPeriod(task.createdAt);
      return (latest ? 6 : 0) + (upcoming ? 3 : 0) + (recent ? 2 : 0);
    };
    return score(b) - score(a) || newest(a,b);
  })[0];
  let university = { recorded:false, en:'University: No application saved.', ur:'یونیورسٹی: کوئی درخواست درج نہیں۔' };
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
      en:`University: ${place} — ${status[0]}.${enAction}${upcoming ? ` Important date: ${upcoming}.` : ''}${enNote}`,
      ur:`یونیورسٹی: ${place} — ${status[1]}۔${urAction}${upcoming ? ` اہم تاریخ: ${upcoming}۔` : ''}${urNote}`,
    };
  }

  if (topic === 'prayer') add(prayerEn, prayerUr);
  else if (topic === 'quran') add(quranEn, quranUr);
  else if (topic === 'office') add(office.en, office.ur);
  else if (topic === 'university') add(university.en, university.ur);
  else if (topic === 'personal') add(personal.en, personal.ur);
  else {
    if (checked.length || readings.length) add(
      [checked.length ? prayerEn : '', readings.length ? quranEn : ''].filter(Boolean).join(' '),
      [checked.length ? prayerUr : '', readings.length ? quranUr : ''].filter(Boolean).join(' ')
    );
    if (office.recorded) add(office.en, office.ur);
    if (university.recorded) add(university.en, university.ur);
    if (personal.recorded) add(personal.en, personal.ur);
    if (!rows.length) add('No updates or current activities are saved yet.', 'ابھی کوئی اپڈیٹ یا موجودہ سرگرمی محفوظ نہیں۔');
  }
  return rows;
}

function SummaryChat({ entries, prayerDays, quranEntries, onClose, onSessionError }) {
  const [messages, setMessages] = useState([BOT_INTRO]);
  const [step, setStep] = useState('period');
  const [period, setPeriod] = useState(null);
  const [topic, setTopic] = useState(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [aiError, setAiError] = useState('');
  const [aiRequested, setAiRequested] = useState(false);
  const scrollRef = useRef(null);
  const reportRef = useRef(null);

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
    setStep('period'); setPeriod(null); setTopic(null); setText(''); setBusy(false);
    setAiInsight(''); setAiError(''); setAiRequested(false); setMessages([BOT_INTRO]);
  }
  async function showReport(selectedPeriod, selectedTopic, seedMessages) {
    setTopic(selectedTopic);
    setStep('done');
    setAiInsight(''); setAiError(''); setAiRequested(false);
    const p = CHAT_PERIODS.find(x => x.id === selectedPeriod);
    const s = CHAT_TOPICS.find(x => x.id === selectedTopic);
    const lines = buildFamilyReport({ entries, prayerDays, quranEntries, period: selectedPeriod, topic: selectedTopic });
    setMessages([...seedMessages, {
      role: 'bot',
      en: `${p.en} · ${s.en} — quick update.`,
      ur: `${p.ur} · ${s.ur} — مختصر اپڈیٹ:`,
      lines,
    }]);
  }
  // Optional short Groq insight is fetched only if the family asks to see it.
  // The main English/Urdu summary above always uses the existing saved records.
  async function requestAiInsight() {
    if (busy || aiRequested || step !== 'done') return;
    setAiRequested(true);
    if (period === 'month') {
      setAiError('30-day summary uses saved records. / ۳۰ دن کی سمری محفوظ ریکارڈ سے بنتی ہے۔');
      return;
    }
    setBusy(true);
    try {
      const data = await api({ action:'summary', period, section: topic, language:'en' });
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
    if (!value || busy || step === 'done') return;
    setText('');
    const next = [...messages, { role: 'user', text: value }];
    if (step === 'period') {
      const selected = parseChatPeriod(value);
      if (!selected) {
        setMessages([...next, { role: 'bot', en: 'Please select Today, 7 days or 30 days.', ur: 'براہِ کرم آج، ۷ دن یا ۳۰ دن منتخب کریں۔' }]);
        return;
      }
      setPeriod(selected);
      const together = /^(?:[123۱۲۳١٢٣])$/.test(value) ? null : parseChatTopic(value);
      if (together) { showReport(selected, together, next); return; }
      setStep('topic');
      setMessages([...next, { role: 'bot', en: 'What would you like to know about?', ur: 'آپ کس چیز کی سمری چاہتے ہیں؟' }]);
      return;
    }
    const selected = parseChatTopic(value);
    if (!selected) {
      setMessages([...next, { role: 'bot', en: 'Choose an option below, or type its name or number.', ur: 'نیچے موجود آپشن منتخب کریں، یا نام یا نمبر لکھیں۔' }]);
      return;
    }
    showReport(period, selected, next);
  }
  const options = step === 'period' ? CHAT_PERIODS : step === 'topic' ? CHAT_TOPICS : [];
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
            {options.map(option => <button type="button" key={option.id} onClick={() => submit(step === 'topic' ? option.number : option.id === 'today' ? '1' : option.id === 'week' ? '2' : '3')}>
              {step === 'topic' && <span className="tmv-chat-choice-num">{option.number}.</span>}
              <span>{option.en}</span><span className="tmv-chat-choice-urdu" lang="ur" dir="rtl">{option.ur}</span>
            </button>)}
          </div>}
          {step === 'done' && <div className="tmv-chat-optional">
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
            <input aria-label="Type in English, Urdu or Roman Urdu" value={text} onChange={event => setText(event.target.value)} placeholder={step === 'done' ? 'Start another summary above' : 'Type a message / اپنا پیغام لکھیں'} maxLength={250} disabled={step === 'done' || busy}/>
            <button type="submit" disabled={!text.trim() || step === 'done' || busy} aria-label="Send message"><Send size={18}/></button>
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
  const isToday = value === dayISO();
  return <div className="tmv-day-nav" aria-label="Choose a day">
    <button type="button" onClick={() => setValue(shiftDay(value, -1))} aria-label="Previous day"><ChevronLeft size={23}/></button>
    <div className="tmv-day-center"><span>{isToday ? 'TODAY' : 'DAILY UPDATE'}</span><strong>{new Date(`${value}T12:00:00`).toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })}</strong></div>
    <button type="button" onClick={() => setValue(shiftDay(value, 1))} disabled={isToday} aria-label="Next day"><ChevronRight size={23}/></button>
  </div>;
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

function FamilyToday({ entries, days, quran, viewDate, setViewDate, onOpen, onOpenSummary, ownerMode, onNew }) {
  const read = quran.filter(item => item.date === viewDate).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  const lastQuranReading = read.length ? null : [...quran]
    .filter(item => item.date && item.date < viewDate)
    .sort((a,b) => String(b.date).localeCompare(String(a.date)) || String(b.createdAt).localeCompare(String(a.createdAt)))[0];
  const pages = read.reduce((n,item)=>n+Number(item.pagesRead||0),0);
  const noteCount = entries.reduce((sum,item)=>sum+(item.logs||[]).filter(log=>dayISO(log.createdAt)===viewDate).length,0);
  const prayer = days[viewDate] || {};
  const recorded = PRAYERS.filter(([key])=>prayer.group?.[key]||prayer.makeup?.[key]).length;
  const hasAny = noteCount || pages || recorded;
  return <div className="tmv-family-view">
    <div className="tmv-intro"><span className="tmv-intro-kicker">THE DAILY JOURNAL</span><h1><AhsanName/>’s daily updates.</h1><p>His day, his progress, and everything he has shared with you.</p></div>
    <DayNavigator value={viewDate} setValue={setViewDate}/>
    <section className="tmv-summary-entry" aria-label="Ask for a summary">
      <div className="tmv-summary-entry-text"><span className="tmv-summary-symbol"><MessageSquareText size={20} strokeWidth={1.9}/></span><div><h2>Understand his day in seconds.</h2><p lang="ur" dir="rtl">احسن کی روزانہ کی تفصیلات آسانی سے جانیں۔</p></div></div>
      <button type="button" onClick={onOpenSummary}><span>Summarize all details</span><span lang="ur" dir="rtl">تمام تفصیلات کی سمری</span><ArrowRight size={18}/></button>
    </section>
    {!hasAny && <div className="tmv-empty-day" role="status"><Clock3 size={21}/><span>No new daily note for this date. Current projects and university applications are still shown below.</span></div>}
    <div className="tmv-group-title"><h2>Daily Life</h2><span>Actual saved updates</span></div>
    <section className="tmv-story-card tmv-prayer-card">
      <FamilyCardVideo key={`prayer-${viewDate}`} category="prayer" date={viewDate} />
      <div className="tmv-card-heading"><span className="tmv-card-icon"><CategoryArtwork type="prayer"/></span><h2>Prayer</h2></div>
      <PrayerReadout date={viewDate} days={days}/>
      <button type="button" className="tmv-read-more" onClick={() => onOpen('prayer')}>See prayer history <ArrowRight size={17}/></button>
    </section>
    <section className="tmv-story-card tmv-quran-card">
      <FamilyCardVideo key={`quran-${viewDate}`} category="quran" date={viewDate} />
      <div className="tmv-card-heading"><span className="tmv-card-icon"><CategoryArtwork type="quran"/></span><h2>Quran Reading</h2></div>
      {read.length ? <><div className="tmv-reading-number"><strong>{pages}</strong><span>{pages === 1 ? 'page' : 'pages'} read</span></div>
        <div className="tmv-reading-list">{read.map(item=><div className="tmv-reading-line" key={item.id}><BookOpen size={16}/><span>Para {item.para} · {item.pagesRead} {Number(item.pagesRead)===1?'page':'pages'}{item.note?` · ${item.note}`:''}</span></div>)}</div></>
        : <div className="tmv-quran-last-update">
          <p className="tmv-current-caption">{viewDate === dayISO() ? 'No Quran reading today yet' : 'No reading recorded for this date'}</p>
          {lastQuranReading ? <>
            <p className="tmv-last-update-date">Last reading · {prettyDate(lastQuranReading.date)}</p>
            <strong>Para {lastQuranReading.para} · {lastQuranReading.pagesRead} {Number(lastQuranReading.pagesRead) === 1 ? 'page' : 'pages'} read</strong>
            {lastQuranReading.note && <p>{lastQuranReading.note}</p>}
          </> : <p className="tmv-empty-note">No earlier reading recorded yet.</p>}
        </div>}
      <button type="button" className="tmv-read-more" onClick={() => onOpen('quran')}>See reading history <ArrowRight size={17}/></button>
    </section>
    <div className="tmv-group-title"><h2>Work & Plans</h2><span>In <AhsanName/>’s own words</span></div>
    <DailyEntries entries={entries} date={viewDate} section="office" onOpen={onOpen}/>
    <DailyEntries entries={entries} date={viewDate} section="university" onOpen={onOpen}/>
    <DailyEntries entries={entries} date={viewDate} section="personal" onOpen={onOpen}/>
    {ownerMode && <button className="tmv-owner-quick" type="button" onClick={()=>onNew('office')}><Plus size={18}/> Add a new work task</button>}
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
  const [loading,setLoading]=useState(true);
  const [authenticated,setAuthenticated]=useState(false);
  const [password,setPassword]=useState('');
  const [loginError,setLoginError]=useState('');
  const [welcome,setWelcome]=useState(false);
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
  useEffect(()=>{
    let mounted=true;
    api().then(data=>{if(mounted){setAuthenticated(Boolean(data.authenticated));setEntries(data.entries||[]);setPrayerDays(data.prayerDays||{});setQuranEntries(data.quranEntries||[]);}})
      .catch(err=>{if(mounted)setLoginError(err.message);}).finally(()=>{if(mounted)setLoading(false);});
    return ()=>{mounted=false;};
  },[]);
  function fail(err){
    setNotice(err.message||'Request failed.');
    if(err.status===401&&err.message?.toLowerCase().includes('session')){
      setAuthenticated(false);setOwnerMode(false);setCreationPin('');setEntries([]);setPrayerDays({});setQuranEntries([]);setLoginError('Please sign in again.');
    }
  }
  async function signIn(e){e.preventDefault();setBusy(true);setLoginError('');try{await api({action:'login',password});const data=await api();setEntries(data.entries||[]);setPrayerDays(data.prayerDays||{});setQuranEntries(data.quranEntries||[]);setAuthenticated(true);setPassword('');setWelcome(true);}catch(err){setLoginError(err.message);}finally{setBusy(false);}}
  async function signOut(){try{await api({action:'logout'});setAuthenticated(false);setOwnerMode(false);setCreationPin('');setEntries([]);setPrayerDays({});setQuranEntries([]);setWelcome(false);setEditor(null);setNotice('');setSection('overview');}catch(err){fail(err);}}
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
  if(loading)return <main className="tm-page tm-loading" role="status"><div className="tm-spinner"/><p>Opening family updates…</p></main>;
  if(!authenticated)return <main className="tm-page"><LoginScreen password={password} setPassword={setPassword} onSubmit={signIn} busy={busy} error={loginError}/></main>;
  if(welcome)return <main className="tm-page"><CautionWelcome onContinue={()=>setWelcome(false)}/></main>;
  return <main className="tm-page tmv-family"><div className="tm-shell tmv-shell">
    <header className="tmv-header"><button type="button" className="tmv-brand" onClick={()=>go('overview')} aria-label="Go to Ahsan's daily updates"><AhsanAvatar className="tmv-avatar-header"/><span><strong><AhsanName/>’s Updates</strong><small>Family journal</small></span></button><button type="button" className="tmv-logout" onClick={signOut}><LogOut size={18}/><span>Log out</span></button></header>
    {section!=='overview'&&<button type="button" className="tmv-back" onClick={()=>go('overview')}><ArrowLeft size={20}/> Back to daily updates</button>}
    {notice&&<div className="tmv-notice" role="status"><CheckCircle2 size={19}/><span>{notice}</span><button type="button" onClick={()=>setNotice('')} aria-label="Dismiss"><X size={17}/></button></div>}
    {ownerMode&&<div className="tmv-owner-banner"><span><LockKeyhole size={16}/> Owner mode · all sections unlocked</span><button type="button" onClick={lockOwner}>Finish editing</button></div>}
    {section==='overview'&&<FamilyToday entries={entries} days={prayerDays} quran={quranEntries} viewDate={viewDate} setViewDate={setViewDate} onOpen={go} ownerMode={ownerMode} onNew={newTask} onOpenSummary={()=>setSummaryOpen(true)}/>}
    {['office','personal','university'].includes(section)&&<WorkPanel section={section} ownerMode={ownerMode} entries={entries} busy={busy} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} expanded={expanded} setExpanded={setExpanded} note={note} setNote={setNote} onNew={newTask} onNote={addNote} onEdit={item=>setEditor({...item})} onDelete={deleteTask} onStatus={updateTask}/>}
    {section==='prayer'&&<PrayerPanel ownerMode={ownerMode} date={prayerDate} setDate={setPrayerDate} days={prayerDays} busy={busy} onToggle={togglePrayer}/>}
    {section==='quran'&&<QuranPanel ownerMode={ownerMode} quran={quranEntries} busy={busy} onAdd={addQuran} onDelete={deleteQuran}/>}
    <div className="tmv-bottom"><button type="button" className="tmv-owner-link" onClick={ownerMode?lockOwner:openOwner}><LockKeyhole size={16}/>{ownerMode?'Finish owner updates':'Owner updates (private code)'}</button><p>Only for <AhsanName/>’s family.</p></div>
  </div>
  {pinOpen&&<PinModal busy={busy} onVerify={verifyPin} onClose={()=>setPinOpen(false)} error={pinError}/>}
  {editor&&<TaskEditor key={editor.id||`new-${editor.section}`} initial={editor} saving={busy} onClose={()=>setEditor(null)} onSave={saveTask}/>}
  {summaryOpen&&<SummaryChat entries={entries} prayerDays={prayerDays} quranEntries={quranEntries} onClose={()=>setSummaryOpen(false)} onSessionError={fail}/>}
  </main>;
}
