import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, CalendarDays, Check,
  CheckCircle2, ChevronLeft, ChevronRight, Clock3, Edit3, Eye, EyeOff,
  GraduationCap, Heart, KeyRound, LockKeyhole, LogOut, Plus, Search,
  Send, ShieldAlert, ShieldCheck, Sparkles, Trash2, TrendingUp, X, Home, Menu, MessageSquareText,
} from 'lucide-react';
import './TrackMe.css';

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
          <div className="tmv-auth-brand"><span className="tmv-auth-monogram">A</span><span>AHSAN / DAILY UPDATES</span></div>
          <div className="tmv-auth-brief">
            <span className="tmv-auth-label">A PRIVATE FAMILY JOURNAL</span>
            <h2>Closer to the moments that matter.</h2>
            <p>One simple place to follow his day, his work and his progress.</p>
          </div>
          <div className="tmv-auth-aside-footer"><span className="tmv-pulse-dot"/> SECURE FAMILY ACCESS</div>
        </div>
        <div className="tm-access-card tmv-auth-form-panel">
          <div className="tmv-auth-mobile-brand"><span className="tmv-auth-monogram">A</span><strong>Ahsan's Updates</strong></div>
          <p className="tmv-login-eyebrow">FAMILY SIGN IN</p>
          <h1>Welcome back.</h1>
          <p className="tm-access-copy">Enter the family password to view Ahsan's latest updates.</p>
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
  const message = "You're following his journey as a son and as a man.\nStay informed. Stay connected.";
  const [typed, setTyped] = useState('');
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTyped(message); return; }
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setTyped(message.slice(0, index));
      if (index >= message.length) clearInterval(timer);
    }, 27);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="tm-welcome-screen" role="dialog" aria-modal="true" aria-label="Welcome to Ahsan's daily updates">
      <section className="tm-welcome-card tmv-welcome-panel">
        <div className="tmv-welcome-header"><span className="tmv-auth-monogram">A</span><span>AHSAN'S UPDATES</span><ShieldCheck size={20}/></div>
        <div className="tmv-welcome-body">
          <span className="tmv-welcome-kicker">A PERSONAL REMINDER</span>
          <h1>Every day tells a story.</h1>
          <div className="tm-typing" aria-label={message}>{typed}<span aria-hidden="true" className="tm-caret">▌</span></div>
          <p>A private look into the moments, effort and progress Ahsan shares with you.</p>
          <button className="tm-primary tm-wide" type="button" onClick={onContinue}>Continue to updates <ArrowRight size={18}/></button>
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

function buildFamilyReport({ entries, prayerDays, quranEntries, period, topic }) {
  const days = CHAT_PERIODS.find(x => x.id === period)?.days || 7;
  const start = shiftDay(dayISO(), -(days - 1));
  const end = dayISO();
  const within = date => Boolean(date && date >= start && date <= end);
  const withinTime = time => {
    if (!time) return false;
    const date = new Date(time);
    return !Number.isNaN(date.getTime()) && within(dayISO(date));
  };
  const rows = [];
  let hasData = false;
  const push = (en, ur) => rows.push({ en, ur });
  const include = section => topic === 'all' || topic === section;

  if (include('prayer')) {
    const selected = Object.entries(prayerDays || {}).filter(([date]) => within(date));
    let group = 0, makeup = 0, activeDays = 0;
    for (const [, day] of selected) {
      let marked = 0;
      for (const [key] of PRAYERS) {
        if (day?.group?.[key]) { group++; marked++; }
        else if (day?.makeup?.[key]) { makeup++; marked++; }
      }
      if (marked) activeDays++;
    }
    hasData ||= group + makeup > 0;
    push(`Prayer: ${group} Jamaat and ${makeup} Qaza entries on ${activeDays} day${activeDays === 1 ? '' : 's'}.`,
      `نماز: ${activeDays} دنوں میں ${group} جماعت اور ${makeup} قضا کی انٹریاں محفوظ ہیں۔`);
    if (period === 'today' && activeDays) {
      const p = prayerDays?.[end] || {};
      const en = [], ur = [];
      const urNames = { fajr: 'فجر', dhuhr: 'ظہر', asr: 'عصر', maghrib: 'مغرب', isha: 'عشاء' };
      for (const [key, label] of PRAYERS) {
        if (p?.group?.[key]) { en.push(`${label}: Jamaat`); ur.push(`${urNames[key]}: جماعت`); }
        else if (p?.makeup?.[key]) { en.push(`${label}: Qaza`); ur.push(`${urNames[key]}: قضا`); }
      }
      if (en.length) push(en.join(' · '), ur.join(' · '));
    }
    push('Unmarked prayers mean no record, not necessarily a missed prayer.',
      'جس نماز کی انٹری نہیں، اس کا مطلب نماز چھوٹنا نہیں؛ صرف ریکارڈ موجود نہیں۔');
  }
  if (include('quran')) {
    const readings = (quranEntries || []).filter(x => within(x.date));
    const pages = readings.reduce((sum, x) => sum + (Number(x.pagesRead) || 0), 0);
    const paras = [...new Set(readings.map(x => x.para))].sort((a, b) => a - b);
    hasData ||= readings.length > 0;
    push(`Quran: ${pages} page${pages === 1 ? '' : 's'} recorded in ${readings.length} reading session${readings.length === 1 ? '' : 's'}.`,
      `قرآن: ${readings.length} نشستوں میں ${pages} صفحات کی تلاوت درج ہے۔`);
    if (paras.length) push(`Para: ${paras.join(', ')}.`, `پارہ: ${paras.join('، ')}۔`);
  }
  const categoryNames = {
    office: ['Office work', 'دفتر کا کام'],
    university: ['University', 'یونیورسٹی'],
    personal: ['Personal', 'ذاتی کام'],
  };
  for (const section of ['office', 'university', 'personal']) {
    if (!include(section)) continue;
    const matching = (entries || []).filter(x => x.section === section);
    const notes = matching.flatMap(x => (x.logs || []).filter(log => withinTime(log.createdAt))
      .map(log => ({ task: x.title, note: log.note, at: log.createdAt })));
    const active = matching.filter(x => withinTime(x.updatedAt) || withinTime(x.createdAt) || notes.some(n => n.task === x.title));
    const done = active.filter(x => x.status === 'done').length;
    const [enName, urName] = categoryNames[section];
    hasData ||= notes.length > 0 || active.length > 0;
    push(`${enName}: ${notes.length} daily update${notes.length === 1 ? '' : 's'}; ${done} recorded task${done === 1 ? '' : 's'} currently marked completed.`,
      `${urName}: ${notes.length} روزانہ اپڈیٹس ہیں، ${done} کام مکمل نشان زد ہیں۔`);
    const latest = notes.sort((a,b) => String(b.at).localeCompare(String(a.at))).slice(0, 2);
    for (const item of latest) push(`${item.task}: ${String(item.note || '').slice(0, 220)}`,
      `محفوظ شدہ نوٹ (${item.task}): ${String(item.note || '').slice(0, 220)}`);
    if (section === 'university') {
      const upcoming = matching.filter(x => x.meta?.upcomingDate && x.meta.upcomingDate >= end)
        .sort((a,b)=>String(a.meta.upcomingDate).localeCompare(String(b.meta.upcomingDate))).slice(0, 2);
      for (const x of upcoming) push(`Upcoming: ${x.meta?.university || x.title} — ${prettyDate(x.meta.upcomingDate)}.`,
        `آنے والی تاریخ: ${x.meta?.university || x.title} — ${prettyDate(x.meta.upcomingDate)}۔`);
      hasData ||= upcoming.length > 0;
    }
  }
  if (!hasData) return [{
    en: 'No saved updates were found for this selection. It does not mean nothing happened.',
    ur: 'اس انتخاب کے لیے کوئی محفوظ شدہ اپڈیٹ نہیں ملی۔ اس کا مطلب یہ نہیں کہ کوئی کام نہیں ہوا۔',
  }];
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
    setAiInsight(''); setAiError(''); setMessages([BOT_INTRO]);
  }
  async function showReport(selectedPeriod, selectedTopic, seedMessages) {
    setTopic(selectedTopic);
    setStep('done');
    setAiInsight(''); setAiError('');
    const p = CHAT_PERIODS.find(x => x.id === selectedPeriod);
    const s = CHAT_TOPICS.find(x => x.id === selectedTopic);
    const lines = buildFamilyReport({ entries, prayerDays, quranEntries, period: selectedPeriod, topic: selectedTopic });
    setMessages([...seedMessages, {
      role: 'bot',
      en: `${p.en} · ${s.en} — here is what Ahsan recorded.`,
      ur: `${p.ur} · ${s.ur} — احسن کے محفوظ کردہ ریکارڈ کی سمری:`,
      lines,
    }]);
    if (selectedPeriod === 'month') {
      // No backend change: existing API supports only 'today', 'week', 'all'.
      setAiError('The 30-day view uses recorded entries, not an AI-generated monthly report. / پچھلے ۳۰ دن کا خلاصہ محفوظ شدہ ریکارڈ پر مبنی ہے، AI کی ماہانہ رپورٹ نہیں۔');
      return;
    }
    setBusy(true);
    try {
      const data = await api({ action: 'summary', period: selectedPeriod, section: selectedTopic, language: 'en' });
      setAiInsight(String(data.summary || ''));
    } catch (err) {
      if (err.status === 401) onSessionError(err);
      setAiError('AI insight is unavailable. The saved-record summary above is still available. / اضافی AI وضاحت دستیاب نہیں، لیکن محفوظ شدہ ریکارڈ کی سمری اوپر موجود ہے۔');
    } finally {
      setBusy(false);
    }
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
          {busy && <div className="tmv-chat-message tmv-chat-bot"><div className="tmv-chat-bubble tmv-chat-processing"><span className="tmv-chat-loading-dot"/> <span>Checking AI insight…</span><span className="tmv-chat-urdu" lang="ur" dir="rtl">اضافی AI تفصیل تیار ہو رہی ہے…</span></div></div>}
          {step === 'done' && aiInsight && <details className="tmv-chat-ai-details"><summary>View additional AI insight <span lang="ur" dir="rtl">مزید AI تفصیل دیکھیں</span><ChevronRight size={17}/></summary><p className="tmv-ai-insight">{aiInsight}</p><small>This extra AI insight is in English. / یہ اضافی AI وضاحت انگریزی میں ہے۔</small></details>}
          {step === 'done' && aiError && <div className="tmv-chat-hint"><span>{aiError.split(' / ')[0]}</span><span lang="ur" dir="rtl">{aiError.split(' / ')[1]}</span></div>}
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
  const items = entries.filter(x => x.section === section);
  const notes = items.flatMap(item => (item.logs || []).filter(log => dayISO(log.createdAt) === date).map(log => ({ item, log })))
    .sort((a,b) => String(b.log.createdAt).localeCompare(String(a.log.createdAt)));
  const icon = section === 'office' ? BriefcaseBusiness : section === 'university' ? GraduationCap : Heart;
  const Icon = icon;
  const name = section === 'office' ? 'Office Work' : section === 'university' ? 'University' : 'Personal Life';
  const upcoming = section === 'university' ? items
    .filter(x => x.meta?.upcomingDate && x.meta.upcomingDate >= date)
    .sort((a,b) => xDate(a).localeCompare(xDate(b))).slice(0,2) : [];
  return <section className={`tmv-story-card tmv-story-${section}`} aria-label={name}>
    <div className="tmv-card-heading"><span className="tmv-card-icon"><Icon size={21}/></span><h2>{name}</h2></div>
    {notes.length ? <div className="tmv-update-list">{notes.slice(0,3).map(({item,log}) => <div className="tmv-daily-note" key={`${item.id}-${log.id}`}>
      <strong>{item.meta?.project || item.meta?.university || item.title}</strong>
      {item.meta?.project && <small>{item.title}</small>}
      <p>{log.note}</p>
    </div>)}{notes.length > 3 && <p className="tmv-more-count">+{notes.length - 3} more updates</p>}</div>
    : <p className="tmv-empty-note">No update has been posted for this day yet.</p>}
    {section === 'university' && upcoming.length > 0 && <div className="tmv-upcoming"><strong>Coming up</strong>{upcoming.map(item => <p key={item.id}><CalendarDays size={16}/><span>{item.meta?.university || item.title} · {prettyDate(xDate(item))}</span></p>)}</div>}
    <button type="button" className="tmv-read-more" onClick={() => onOpen(section)}>See all {section === 'university' ? 'applications' : section === 'office' ? 'projects' : 'activities'} <ArrowRight size={17}/></button>
  </section>;
}
function xDate(x) { return x.meta?.upcomingDate || x.dueDate || ''; }

function FamilyToday({ entries, days, quran, viewDate, setViewDate, onOpen, onOpenSummary, ownerMode, onNew }) {
  const read = quran.filter(item => item.date === viewDate).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  const pages = read.reduce((n,item)=>n+Number(item.pagesRead||0),0);
  const noteCount = entries.reduce((sum,item)=>sum+(item.logs||[]).filter(log=>dayISO(log.createdAt)===viewDate).length,0);
  const prayer = days[viewDate] || {};
  const recorded = PRAYERS.filter(([key])=>prayer.group?.[key]||prayer.makeup?.[key]).length;
  const hasAny = noteCount || pages || recorded;
  return <div className="tmv-family-view">
    <div className="tmv-intro"><span className="tmv-intro-kicker">THE DAILY JOURNAL</span><h1>Ahsan’s daily updates.</h1><p>His day, his progress, and everything he has shared with you.</p></div>
    <DayNavigator value={viewDate} setValue={setViewDate}/>
    <section className="tmv-summary-entry" aria-label="Ask for a summary">
      <div className="tmv-summary-entry-text"><span className="tmv-summary-symbol"><MessageSquareText size={20} strokeWidth={1.9}/></span><div><h2>Understand his day in seconds.</h2><p lang="ur" dir="rtl">احسن کی روزانہ کی تفصیلات آسانی سے جانیں۔</p></div></div>
      <button type="button" onClick={onOpenSummary}><span>Summarize all details</span><span lang="ur" dir="rtl">تمام تفصیلات کی سمری</span><ArrowRight size={18}/></button>
    </section>
    {!hasAny && <div className="tmv-empty-day" role="status"><Clock3 size={21}/><span>No daily update has been posted for this date yet. You can still see current projects and upcoming university dates below.</span></div>}
    <div className="tmv-group-title"><h2>Daily Life</h2><span>Actual saved updates</span></div>
    <section className="tmv-story-card tmv-prayer-card">
      <div className="tmv-card-heading"><span className="tmv-card-icon"><Clock3 size={21}/></span><h2>Prayer</h2></div>
      <PrayerReadout date={viewDate} days={days}/>
      <button type="button" className="tmv-read-more" onClick={() => onOpen('prayer')}>See prayer history <ArrowRight size={17}/></button>
    </section>
    <section className="tmv-story-card tmv-quran-card">
      <div className="tmv-card-heading"><span className="tmv-card-icon"><BookOpen size={21}/></span><h2>Quran Reading</h2></div>
      {read.length ? <><div className="tmv-reading-number"><strong>{pages}</strong><span>{pages === 1 ? 'page' : 'pages'} read</span></div>
        <div className="tmv-reading-list">{read.map(item=><div className="tmv-reading-line" key={item.id}><BookOpen size={16}/><span>Para {item.para} · {item.pagesRead} {Number(item.pagesRead)===1?'page':'pages'}{item.note?` · ${item.note}`:''}</span></div>)}</div></>
        : <p className="tmv-empty-note">No reading update has been posted for this day yet.</p>}
      <button type="button" className="tmv-read-more" onClick={() => onOpen('quran')}>See reading history <ArrowRight size={17}/></button>
    </section>
    <div className="tmv-group-title"><h2>Work & Plans</h2><span>In Ahsan’s own words</span></div>
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
  return <section className="tmv-detail-view"><div className="tmv-detail-heading"><Clock3 size={25}/><div><h2>Prayer Record</h2><p>Daily prayers, as recorded by Ahsan.</p></div></div>
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
  return <section className="tmv-detail-view"><div className="tmv-detail-heading"><BookOpen size={25}/><div><h2>Quran Reading</h2><p>Progress in the 15-line Quran, saved by Ahsan.</p></div></div>
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
  return <section className="tmv-detail-view"><div className="tmv-detail-heading">{(()=>{const Icon=info.icon;return <Icon size={25}/>;})()}<div><h2>{info.name}</h2><p>{section==='office'?'Projects, daily work and progress.':section==='university'?'Applications, interviews and important dates.':'Personal goals and updates.'}</p></div></div>
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
  function openOwner(){setPinError('');setPinOpen(true);}
  async function verifyPin(pin){setBusy(true);setPinError('');try{await api({action:'verify_create_pin',pin});setCreationPin(pin);setOwnerMode(true);setPinOpen(false);setNotice('Owner editing is now on.');}catch(err){setPinError(err.message);}finally{setBusy(false);}}
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
    <header className="tmv-header"><button type="button" className="tmv-brand" onClick={()=>go('overview')} aria-label="Go to Ahsan's daily updates"><span className="tmv-logo" aria-hidden="true">A</span><span><strong>Ahsan’s Updates</strong><small>Family journal</small></span></button><button type="button" className="tmv-logout" onClick={signOut}><LogOut size={18}/><span>Log out</span></button></header>
    {section!=='overview'&&<button type="button" className="tmv-back" onClick={()=>go('overview')}><ArrowLeft size={20}/> Back to daily updates</button>}
    {notice&&<div className="tmv-notice" role="status"><CheckCircle2 size={19}/><span>{notice}</span><button type="button" onClick={()=>setNotice('')} aria-label="Dismiss"><X size={17}/></button></div>}
    {ownerMode&&<div className="tmv-owner-banner"><span><LockKeyhole size={16}/> Owner editing is ON</span><button type="button" onClick={lockOwner}>Finish editing</button></div>}
    {section==='overview'&&<FamilyToday entries={entries} days={prayerDays} quran={quranEntries} viewDate={viewDate} setViewDate={setViewDate} onOpen={go} ownerMode={ownerMode} onNew={newTask} onOpenSummary={()=>setSummaryOpen(true)}/>}
    {['office','personal','university'].includes(section)&&<WorkPanel section={section} ownerMode={ownerMode} entries={entries} busy={busy} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} expanded={expanded} setExpanded={setExpanded} note={note} setNote={setNote} onNew={newTask} onNote={addNote} onEdit={item=>setEditor({...item})} onDelete={deleteTask} onStatus={updateTask}/>}
    {section==='prayer'&&<PrayerPanel ownerMode={ownerMode} date={prayerDate} setDate={setPrayerDate} days={prayerDays} busy={busy} onToggle={togglePrayer}/>}
    {section==='quran'&&<QuranPanel ownerMode={ownerMode} quran={quranEntries} busy={busy} onAdd={addQuran} onDelete={deleteQuran}/>}
    <div className="tmv-bottom"><button type="button" className="tmv-owner-link" onClick={ownerMode?lockOwner:openOwner}><LockKeyhole size={16}/>{ownerMode?'Finish owner updates':'Owner updates (private code)'}</button><p>Only for Ahsan’s family.</p></div>
  </div>
  {pinOpen&&<PinModal busy={busy} onVerify={verifyPin} onClose={()=>setPinOpen(false)} error={pinError}/>}
  {editor&&<TaskEditor key={editor.id||`new-${editor.section}`} initial={editor} saving={busy} onClose={()=>setEditor(null)} onSave={saveTask}/>}
  {summaryOpen&&<SummaryChat entries={entries} prayerDays={prayerDays} quranEntries={quranEntries} onClose={()=>setSummaryOpen(false)} onSessionError={fail}/>}
  </main>;
}
