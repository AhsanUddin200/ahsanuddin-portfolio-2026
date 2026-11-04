import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, CalendarDays, Check,
  CheckCircle2, ChevronLeft, ChevronRight, Clock3, Edit3, Eye, EyeOff,
  GraduationCap, Heart, KeyRound, LockKeyhole, LogOut, Plus, Search,
  Send, ShieldAlert, ShieldCheck, Sparkles, Trash2, TrendingUp, X,
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
    <div className="tm-access-screen">
      <div className="tm-access-card">
        <div className="tm-lock-icon"><LockKeyhole size={27} /></div>
        <p className="tm-eyebrow">PRIVATE WORKSPACE / OWNER ACCESS</p>
        <h1>Your work.<br /><em>Your space.</em></h1>
        <p className="tm-access-copy">Every project, every goal and every meaningful day — in one private place.</p>
        <form onSubmit={onSubmit} className="tm-stack">
          <label className="tm-field"><span>Access password</span>
            <div className="tm-input-icon"><KeyRound size={17} /><input required maxLength={200} autoComplete="current-password" type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Your private password" />
              <button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
            </div>
          </label>
          {error && <div className="tm-error" role="alert">{error}</div>}
          <button className="tm-primary tm-wide" disabled={busy} type="submit">{busy ? 'Verifying...' : 'Unlock Track Me'} <ArrowRight size={18} /></button>
        </form>
        <p className="tm-footnote"><ShieldCheck size={14} /> Private, server-verified access</p>
      </div>
      <Link className="tm-return" to="/"><ArrowLeft size={17} /> Back to portfolio</Link>
    </div>
  );
}

function CautionWelcome({ onContinue }) {
  const message = 'You are tracking your man.\nYou are tracking your son.\nSo keep attention.';
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTyped(message.slice(0, index));
      if (index >= message.length) clearInterval(interval);
    }, 44);
    return () => clearInterval(interval);
  }, []);
  const complete = typed.length === message.length;
  return (
    <div className="tm-welcome-screen" role="dialog" aria-modal="true" aria-label="Tracking caution">
      <div className="tm-welcome-card">
        <div className="tm-warning-icon"><ShieldAlert size={31} /></div>
        <span className="tm-eyebrow">ACCESS GRANTED · A PERSONAL REMINDER</span>
        <h2>Every day matters.</h2>
        <div className="tm-typing" aria-live="polite">{typed}<span className={complete ? 'tm-caret tm-caret-done' : 'tm-caret'}>▌</span></div>
        <p>This is your space to stay consistent, accountable and focused on what matters.</p>
        <button className="tm-primary tm-wide" disabled={!complete} onClick={onContinue}>Continue to My Tracker <ArrowRight size={18} /></button>
      </div>
    </div>
  );
}

function PinModal({ busy, onVerify, onClose, error }) {
  const [pin, setPin] = useState('');
  const [show, setShow] = useState(false);
  return (
    <div className="tm-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section className="tm-modal tm-pin-modal" role="dialog" aria-modal="true" aria-label="Authorize new task">
        <button className="tm-close" type="button" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className="tm-lock-icon"><LockKeyhole size={25} /></div>
        <p className="tm-eyebrow">OWNER-ONLY ACTION</p>
        <h2>New Task is locked.</h2>
        <p className="tm-muted">Enter your separate task creation code. Without it, no new task can be created.</p>
        <form onSubmit={e => { e.preventDefault(); onVerify(pin); }} className="tm-stack">
          <label className="tm-field"><span>Task creation code</span><div className="tm-input-icon"><KeyRound size={16} /><input autoFocus autoComplete="off" type={show ? 'text' : 'password'} value={pin} onChange={e => setPin(e.target.value)} placeholder="Enter secret code" required maxLength={200}/><button type="button" onClick={() => setShow(!show)} aria-label="Toggle code visibility">{show ? <EyeOff size={16}/> : <Eye size={16}/>}</button></div></label>
          {error && <div className="tm-error" role="alert">{error}</div>}
          <button type="submit" disabled={busy} className="tm-primary tm-wide">{busy ? 'Checking code...' : 'Authorize New Task'} <ArrowRight size={17}/></button>
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
      <section className="tm-modal tm-editor" role="dialog" aria-modal="true" aria-label={initial.id ? 'Edit activity' : 'Create activity'}>
        <div className="tm-modal-heading"><div><span className="tm-eyebrow">WORKSPACE / PRIVATE</span><h2>{initial.id ? 'Edit Activity' : 'Create New Task'}</h2></div><button className="tm-close" onClick={onClose} type="button" aria-label="Close"><X size={20}/></button></div>
        <form className="tm-stack" onSubmit={e => { e.preventDefault(); onSave(form); }}>
          <label className="tm-field"><span>Section</span><select value={form.section} onChange={e => change('section', e.target.value)}>{WORK_SECTIONS.map(s => <option value={s.key} key={s.key}>{s.name}</option>)}</select></label>
          {form.section === 'office' && <label className="tm-field"><span>Project name</span><input value={form.meta?.project || ''} maxLength={120} onChange={e => changeMeta('project', e.target.value)} placeholder="e.g. ERP implementation / Client project" /></label>}
          {form.section === 'university' && <>
            <div className="tm-fields-two"><label className="tm-field"><span>University / Institute</span><input value={form.meta?.university || ''} onChange={e => changeMeta('university', e.target.value)} placeholder="University name" maxLength={140}/></label><label className="tm-field"><span>Program / Degree</span><input value={form.meta?.program || ''} onChange={e => changeMeta('program', e.target.value)} placeholder="Program" maxLength={140}/></label></div>
            <label className="tm-field"><span>Application status</span><select value={form.meta?.applicationStatus || 'planning'} onChange={e => changeMeta('applicationStatus', e.target.value)}>{Object.entries(APP_STATUS).map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select></label>
            <div className="tm-fields-two"><label className="tm-field"><span>Date applied</span><input type="date" value={form.meta?.applicationDate || ''} onChange={e => changeMeta('applicationDate', e.target.value)}/></label><label className="tm-field"><span>Upcoming exam / interview / deadline</span><input type="date" value={form.meta?.upcomingDate || ''} onChange={e => changeMeta('upcomingDate', e.target.value)}/></label></div>
          </>}
          {form.section === 'personal' && <label className="tm-field"><span>Personal area</span><select value={form.meta?.area || 'general'} onChange={e => changeMeta('area', e.target.value)}>{AREAS.map(s => <option value={s} key={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}</select></label>}
          <label className="tm-field"><span>{form.section === 'office' ? 'Task name' : form.section === 'university' ? 'Application / task title' : 'Personal goal / task'}</span><input autoFocus required maxLength={140} value={form.title} onChange={e => change('title', e.target.value)} placeholder={form.section === 'office' ? 'What is the task?' : form.section === 'university' ? 'e.g. Application for BS Computer Science' : 'What do you want to achieve?'}/></label>
          <label className="tm-field"><span>{form.section === 'office' ? 'Task details / what needs to be done' : 'Details / notes'}</span><textarea rows={3} maxLength={1800} value={form.detail} onChange={e => change('detail', e.target.value)} placeholder="Add more context..."/></label>
          <div className="tm-fields-two"><label className="tm-field"><span>Progress</span><select value={form.status} onChange={e => change('status', e.target.value)}>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label><label className="tm-field"><span>Priority</span><select value={form.priority} onChange={e => change('priority', e.target.value)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label></div>
          <label className="tm-field"><span>Target date (optional)</span><input type="date" value={form.dueDate || ''} onChange={e => change('dueDate', e.target.value)}/></label>
          <div className="tm-form-actions"><button type="button" onClick={onClose} className="tm-quiet-btn">Cancel</button><button className="tm-primary" type="submit" disabled={saving}><Check size={17}/>{saving ? 'Saving...' : initial.id ? 'Save Changes' : 'Create Task'}</button></div>
        </form>
      </section>
    </div>
  );
}

function SummaryModal({ section, busy, result, onGenerate, onClose }) {
  const [period, setPeriod] = useState('week');
  const [scope, setScope] = useState(section);
  const [language, setLanguage] = useState('roman');
  return (
    <div className="tm-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section className="tm-modal tm-summary-modal" role="dialog" aria-modal="true" aria-label="AI progress summary">
        <div className="tm-modal-heading"><div><span className="tm-eyebrow">YOUR WEEK, IN CONTEXT</span><h2><Sparkles size={24}/> AI Progress Summary</h2></div><button className="tm-close" onClick={onClose} aria-label="Close"><X size={20}/></button></div>
        <p className="tm-muted">Summarize only what you actually recorded: work, university, Prayer and Quran.</p>
        <div className="tm-summary-fields"><label className="tm-field"><span>Period</span><select value={period} onChange={e => setPeriod(e.target.value)}><option value="today">Last 24 hours</option><option value="week">Last 7 days</option><option value="all">All time</option></select></label><label className="tm-field"><span>Category</span><select value={scope} onChange={e => setScope(e.target.value)}><option value="all">All categories</option>{ALL_SECTIONS.map(s => <option key={s.key} value={s.key}>{s.name}</option>)}</select></label><label className="tm-field"><span>Language</span><select value={language} onChange={e => setLanguage(e.target.value)}><option value="roman">Roman Urdu</option><option value="en">English</option></select></label></div>
        <button type="button" className="tm-primary tm-wide" disabled={busy} onClick={() => onGenerate({ period, section: scope, language })}><Sparkles size={18}/>{busy ? 'Preparing summary...' : 'Summarize My Progress'}</button>
        <p className="tm-footnote"><LockKeyhole size={13}/> Selected tracker entries are shared with Groq when you click Summarize.</p>
        {result && <div className={result.error ? 'tm-error tm-summary-result' : 'tm-summary-result'}>{result.error || result.summary}</div>}
      </section>
    </div>
  );
}

function TaskCard({ item, expanded, onExpand, note, setNote, busy, onNote, onEdit, onDelete, onStatus }) {
  const meta = item.meta || {};
  const logName = item.section === 'office' ? 'What did you do today on this project?' : item.section === 'university' ? 'What changed in this application today?' : 'What progress did you make today?';
  return (
    <article className="tm-task-card">
      <div className="tm-task-tags"><span className="tm-chip">{item.section === 'office' ? meta.project || 'Office Project' : item.section === 'university' ? meta.university || 'University' : (meta.area || 'Personal').toUpperCase()}</span><span className={`tm-chip tm-chip-${item.status}`}>{STATUS[item.status] || 'To Do'}</span>{item.priority === 'high' && <span className="tm-chip tm-chip-high">HIGH PRIORITY</span>}</div>
      <h3>{item.title}</h3>
      {item.detail && <p className="tm-task-detail">{item.detail}</p>}
      {item.section === 'university' && <div className="tm-university-detail"><span>Application: <strong>{APP_STATUS[meta.applicationStatus] || 'Planning'}</strong></span>{meta.program && <span>Program: {meta.program}</span>}{meta.upcomingDate && <span>Upcoming: {prettyDate(meta.upcomingDate)}</span>}</div>}
      <div className="tm-task-meta"><span><Clock3 size={14}/> Updated {prettyDate(item.updatedAt)}</span>{item.dueDate && <span><CalendarDays size={14}/> Target {prettyDate(item.dueDate)}</span>}<span><TrendingUp size={14}/> {(item.logs || []).length} daily updates</span></div>
      <div className="tm-task-actions"><select aria-label="Task status" value={item.status} disabled={busy} onChange={e => onStatus(item, e.target.value)}>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select><button type="button" className="tm-icon-btn" onClick={() => onEdit(item)} aria-label="Edit task"><Edit3 size={17}/></button><button type="button" className="tm-icon-btn tm-danger" onClick={() => onDelete(item)} aria-label="Delete task"><Trash2 size={17}/></button><button type="button" className="tm-expand" onClick={() => onExpand(item.id)}>{expanded ? 'Hide updates' : 'Daily updates'} <ChevronRight size={16} className={expanded ? 'tm-rotate' : ''}/></button></div>
      {expanded && <div className="tm-note-panel"><h4>Daily progress log</h4>{(item.logs || []).length ? <div className="tm-note-list">{(item.logs || []).slice().reverse().map(l => <div className="tm-note-row" key={l.id}><time>{prettyDate(l.createdAt)}</time><p>{l.note}</p></div>)}</div> : <p className="tm-muted">No updates yet. Start recording your progress.</p>}<form className="tm-note-form" onSubmit={e => { e.preventDefault(); onNote(item.id); }}><input maxLength={1000} required value={note} onChange={e => setNote(e.target.value)} placeholder={logName}/><button className="tm-primary" type="submit" disabled={busy || !note.trim()}><Send size={16}/> Save</button></form></div>}
    </article>
  );
}

function PrayerPanel({ date, setDate, days, busy, onToggle }) {
  const record = days[date] || { group: {}, makeup: {} };
  const groupCount = PRAYERS.filter(([k]) => record.group?.[k]).length;
  const makeupCount = PRAYERS.filter(([k]) => record.makeup?.[k]).length;
  const lastSeven = Array.from({ length: 7 }, (_, i) => shiftDay(dayISO(), i - 6));
  return (
    <div className="tm-panel tm-prayer-panel">
      <div className="tm-panel-head"><div><span className="tm-eyebrow">DAILY PRACTICE</span><h2>Prayer Tracker</h2><p>Choose a date and tick the prayer you performed in group or as a make-up prayer.</p></div><div className="tm-date-controls"><button onClick={() => setDate(shiftDay(date, -1))} aria-label="Previous day"><ChevronLeft size={17}/></button><input aria-label="Prayer date" type="date" value={date} onChange={e => setDate(e.target.value)}/><button onClick={() => setDate(shiftDay(date, 1))} aria-label="Next day"><ChevronRight size={17}/></button></div></div>
      <div className="tm-mini-stats"><div><span>Group Prayer</span><strong>{groupCount} / 5</strong></div><div><span>Make-up Prayer</span><strong>{makeupCount} / 5</strong></div><div><span>Recorded Today</span><strong>{groupCount + makeupCount} / 5</strong></div></div>
      <div className="tm-prayer-table"><div className="tm-prayer-heading"><span>Prayer</span><span>Group Prayer<br/><small>(Jamaat)</small></span><span>Make-up Prayer<br/><small>(Qaza)</small></span></div>{PRAYERS.map(([key, label]) => <div className="tm-prayer-row" key={key}><strong>{label}</strong><label className="tm-prayer-check"><input type="checkbox" disabled={busy} checked={Boolean(record.group?.[key])} onChange={e => onToggle({ date, prayer: key, kind: 'group', checked: e.target.checked })}/><span><Check size={19}/></span></label><label className="tm-prayer-check"><input type="checkbox" disabled={busy} checked={Boolean(record.makeup?.[key])} onChange={e => onToggle({ date, prayer: key, kind: 'makeup', checked: e.target.checked })}/><span><Check size={19}/></span></label></div>)}</div>
      <p className="tm-muted tm-helper">A tick is saved immediately. For each prayer, Group and Make-up are mutually exclusive. An empty box simply means “not recorded”.</p>
      <h3 className="tm-subtitle">Last 7 days</h3><div className="tm-week-strip">{lastSeven.map(d => { const r = days[d] || {}; const count = PRAYERS.filter(([k]) => r.group?.[k] || r.makeup?.[k]).length; return <button type="button" key={d} onClick={() => setDate(d)} className={date === d ? 'tm-week-day tm-selected' : 'tm-week-day'}><span>{new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' })}</span><strong>{d.slice(8)}</strong><small>{count}/5</small></button>; })}</div>
    </div>
  );
}

function QuranPanel({ quran, busy, onAdd, onDelete }) {
  const [form, setForm] = useState({ date: dayISO(), para: '1', pagesRead: '1', fromPage: '', toPage: '', note: '' });
  const change = (k, v) => setForm(old => ({ ...old, [k]: v }));
  const total = quran.reduce((sum, x) => sum + Number(x.pagesRead || 0), 0);
  const today = quran.filter(x => x.date === dayISO()).reduce((sum, x) => sum + Number(x.pagesRead || 0), 0);
  const paras = new Set(quran.map(x => Number(x.para))).size;
  const sorted = [...quran].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
  return (
    <div className="tm-panel"><div className="tm-panel-head"><div><span className="tm-eyebrow">15-LINE MUSHAF / PERSONAL READING</span><h2>Quran Tracker</h2><p>Record the para number and how many pages you read. Each entry saves under its date.</p></div><div className="tm-section-symbol"><BookOpen size={29}/></div></div>
      <div className="tm-mini-stats"><div><span>Pages Read (All Time)</span><strong>{total}</strong></div><div><span>Pages Read Today</span><strong>{today}</strong></div><div><span>Paras Recorded</span><strong>{paras} / 30</strong></div></div>
      <form className="tm-quran-form" onSubmit={async e => { e.preventDefault(); const success = await onAdd(form); if (success) setForm(old => ({ ...old, pagesRead: '1', fromPage: '', toPage: '', note: '' })); }}>
        <div className="tm-fields-four"><label className="tm-field"><span>Date</span><input type="date" required value={form.date} onChange={e => change('date', e.target.value)}/></label><label className="tm-field"><span>Para (1–30)</span><select value={form.para} onChange={e => change('para', e.target.value)}>{Array.from({ length: 30 }, (_, i) => <option value={i + 1} key={i + 1}>Para {i + 1}</option>)}</select></label><label className="tm-field"><span>Pages read</span><input type="number" required min="1" max="200" value={form.pagesRead} onChange={e => change('pagesRead', e.target.value)}/></label><div className="tm-field tm-quran-label"><span>Edition</span><strong>15 lines / page</strong></div></div>
        <div className="tm-fields-two"><label className="tm-field"><span>From printed page (optional)</span><input type="number" min="1" value={form.fromPage} onChange={e => change('fromPage', e.target.value)} placeholder="Page number"/></label><label className="tm-field"><span>To printed page (optional)</span><input type="number" min="1" value={form.toPage} onChange={e => change('toPage', e.target.value)} placeholder="Page number"/></label></div>
        <label className="tm-field"><span>Note (optional)</span><input maxLength={350} value={form.note} onChange={e => change('note', e.target.value)} placeholder="e.g. Revision or new reading"/></label>
        <button type="submit" disabled={busy} className="tm-primary"><Plus size={17}/>{busy ? 'Saving...' : 'Save Quran Reading'}</button>
      </form>
      <p className="tm-muted tm-helper">15-line Quran editions can have different printed page numbering. Progress counts only the pages you enter; no fixed pages-per-para assumption.</p>
      <h3 className="tm-subtitle">Reading history</h3>
      <div className="tm-reading-list">{sorted.length ? sorted.map(item => <div className="tm-reading-item" key={item.id}><div className="tm-reading-icon"><BookOpen size={19}/></div><div><strong>Para {item.para} · {item.pagesRead} {Number(item.pagesRead) === 1 ? 'page' : 'pages'}</strong><p>{prettyDate(item.date)}{item.fromPage ? ` · Pg ${item.fromPage}${item.toPage ? `–${item.toPage}` : ''}` : ''}{item.note ? ` · ${item.note}` : ''}</p></div><button type="button" aria-label="Delete reading" className="tm-icon-btn tm-danger" disabled={busy} onClick={() => onDelete(item)}><Trash2 size={16}/></button></div>) : <div className="tm-empty">No Quran sessions recorded yet. Add your first reading above.</div>}</div>
    </div>
  );
}

function WorkPanel({ section, entries, busy, search, setSearch, filter, setFilter, expanded, setExpanded, note, setNote, onNew, onNote, onEdit, onDelete, onStatus }) {
  const info = WORK_SECTIONS.find(x => x.key === section);
  const items = entries.filter(x => x.section === section);
  const filtered = items.filter(x => (filter === 'all' || x.status === filter) && `${x.title} ${x.detail} ${x.meta?.project || ''} ${x.meta?.university || ''} ${(x.logs || []).map(l => l.note).join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  const nextEvents = items.filter(x => x.meta?.upcomingDate || x.dueDate).map(x => ({ ...x, eventDate: x.meta?.upcomingDate || x.dueDate })).filter(x => x.eventDate >= dayISO()).sort((a, b) => a.eventDate.localeCompare(b.eventDate)).slice(0, 5);
  return <div className="tm-panel">
    <div className="tm-panel-head"><div><span className="tm-eyebrow">WORKSPACE / {info.name.toUpperCase()}</span><h2>{info.name}</h2><p>{section === 'office' ? 'Project → Task → What did I do today?' : section === 'university' ? 'Your university applications, statuses and upcoming dates.' : 'Personal goals, routines and daily progress.'}</p></div><button type="button" className="tm-primary" onClick={() => onNew(section)}><LockKeyhole size={16}/> New Task</button></div>
    {section === 'university' && <div className="tm-upcoming-box"><div className="tm-upcoming-head"><CalendarDays size={19}/> Upcoming Dates</div>{nextEvents.length ? nextEvents.map(x => <div className="tm-upcoming-row" key={x.id}><div><strong>{x.meta?.university || x.title}</strong><span>{x.meta?.program || x.title}</span></div><time>{prettyDate(x.eventDate)}</time></div>) : <p>No upcoming application dates recorded.</p>}</div>}
    {section === 'office' && <div className="tm-guidance"><BriefcaseBusiness size={19}/><span>Create a project task once, then open <strong>Daily updates</strong> to record “What did you do today?” without creating another task each day.</span></div>}
    {section === 'personal' && <div className="tm-guidance"><Heart size={19}/><span>Organize personal goals by health, learning, family, finance or any other area. Add daily progress as you go.</span></div>}
    <div className="tm-toolbar"><label className="tm-search"><Search size={17}/><input aria-label="Search tasks" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks, projects and progress..."/></label><select aria-label="Filter tasks" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All statuses</option>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
    <p className="tm-count-label">{filtered.length} {filtered.length === 1 ? 'activity' : 'activities'} · {items.filter(x => x.status === 'done').length} completed</p>
    <div className="tm-task-list">{filtered.length ? filtered.map(item => <TaskCard key={item.id} item={item} expanded={expanded === item.id} onExpand={id => { setExpanded(expanded === id ? null : id); setNote(''); }} note={expanded === item.id ? note : ''} setNote={setNote} onNote={onNote} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus} busy={busy}/>) : <div className="tm-empty"><CheckCircle2 size={34}/><h3>Nothing here yet.</h3><p>Add a task, or adjust your search.</p><button type="button" className="tm-primary" onClick={() => onNew(section)}><LockKeyhole size={16}/> New Task</button></div>}</div>
  </div>;
}

function Overview({ entries, days, quran, onSection, onNew }) {
  const today = dayISO();
  const todayDay = days[today] || {};
  const prayerCount = PRAYERS.filter(([k]) => todayDay.group?.[k] || todayDay.makeup?.[k]).length;
  const quranToday = quran.filter(x => x.date === today).reduce((sum, x) => sum + Number(x.pagesRead || 0), 0);
  const upcoming = entries.filter(x => x.section === 'university').map(x => ({ ...x, eventDate: x.meta?.upcomingDate || x.dueDate })).filter(x => x.eventDate && x.eventDate >= today).sort((a, b) => a.eventDate.localeCompare(b.eventDate)).slice(0, 3);
  const officeProgress = entries.filter(x => x.section === 'office' && x.status === 'in_progress').length;
  const done = entries.filter(x => x.status === 'done').length;
  return <div className="tm-overview">
    <div className="tm-overview-metrics"><div><span>Activities</span><strong>{entries.length}</strong><small>Across your workspace</small></div><div><span>Currently Working</span><strong>{entries.filter(x => x.status === 'in_progress').length}</strong><small>In progress</small></div><div><span>Completed</span><strong>{done}</strong><small>Finished work</small></div><div><span>Today’s Prayer Record</span><strong>{prayerCount}/5</strong><small>Marked in tracker</small></div></div>
    <div className="tm-section-grid">{ALL_SECTIONS.map(info => { const Icon = info.icon; const count = info.key === 'prayer' ? `${prayerCount}/5 today` : info.key === 'quran' ? `${quranToday} pages today` : `${entries.filter(x => x.section === info.key).length} activities`; return <button type="button" key={info.key} className="tm-section-card" onClick={() => onSection(info.key)}><span className={`tm-section-icon tm-section-${info.key}`}><Icon size={22}/></span><span className="tm-section-card-text"><strong>{info.name}</strong><small>{info.description}</small><em>{count}</em></span><ArrowRight size={18} className="tm-section-arrow"/></button>; })}</div>
    <div className="tm-overview-bottom"><div className="tm-overview-note"><span className="tm-eyebrow">TODAY’S SNAPSHOT</span><h3>Stay consistent.</h3><p>{officeProgress} office tasks in progress, {quranToday} Quran pages recorded today, and {prayerCount} prayers marked for today.</p><button className="tm-quiet-btn" onClick={() => onNew('office')}><LockKeyhole size={16}/> Add Work Task</button></div><div className="tm-overview-note"><span className="tm-eyebrow">UPCOMING UNIVERSITY</span><h3>Your next dates</h3>{upcoming.length ? upcoming.map(x => <div className="tm-small-event" key={x.id}><span>{x.meta?.university || x.title}</span><time>{prettyDate(x.eventDate)}</time></div>) : <p>No upcoming university date recorded yet.</p>}<button className="tm-quiet-btn" onClick={() => onSection('university')}>Open University <ArrowRight size={16}/></button></div></div>
  </div>;
}

export default function TrackMe() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [welcome, setWelcome] = useState(false);
  const [entries, setEntries] = useState([]);
  const [prayerDays, setPrayerDays] = useState({});
  const [quranEntries, setQuranEntries] = useState([]);
  const [section, setSection] = useState('overview');
  const [prayerDate, setPrayerDate] = useState(dayISO());
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [pinOpen, setPinOpen] = useState(false);
  const [pinError, setPinError] = useState('');
  const [creationPin, setCreationPin] = useState('');
  const [creationSection, setCreationSection] = useState('office');
  const [editor, setEditor] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryResult, setSummaryResult] = useState(null);

  useEffect(() => {
    let mounted = true;
    api().then(result => { if (mounted) { setAuthenticated(Boolean(result.authenticated)); setEntries(result.entries || []); setPrayerDays(result.prayerDays || {}); setQuranEntries(result.quranEntries || []); } })
      .catch(err => { if (mounted) setLoginError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  function fail(err) {
    setNotice(err.message || 'Request failed.');
    if (err.status === 401 && err.message?.toLowerCase().includes('session')) {
      setAuthenticated(false); setEntries([]); setPrayerDays({}); setQuranEntries([]); setLoginError('Session expired. Please sign in again.');
    }
  }
  async function signIn(e) {
    e.preventDefault(); setBusy(true); setLoginError('');
    try {
      await api({ action: 'login', password });
      const data = await api();
      setEntries(data.entries || []); setPrayerDays(data.prayerDays || {}); setQuranEntries(data.quranEntries || []);
      setAuthenticated(true); setPassword(''); setWelcome(true);
    } catch (err) { setLoginError(err.message); }
    finally { setBusy(false); }
  }
  async function signOut() {
    try { await api({ action: 'logout' }); setAuthenticated(false); setEntries([]); setPrayerDays({}); setQuranEntries([]); setWelcome(false); setEditor(null); setNotice(''); }
    catch (err) { fail(err); }
  }
  function newTask(target = 'office') { setPinError(''); setCreationSection(target); setCreationPin(''); setPinOpen(true); }
  async function verifyPin(pin) {
    setBusy(true); setPinError('');
    try { await api({ action: 'verify_create_pin', pin }); setCreationPin(pin); setPinOpen(false); setEditor(initialTask(creationSection)); }
    catch (err) { setPinError(err.message); }
    finally { setBusy(false); }
  }
  async function saveTask(form) {
    setBusy(true); setNotice('');
    try {
      const editing = Boolean(editor?.id);
      const data = await api({ action: editing ? 'update' : 'create', ...(editing ? { id: editor.id } : { pin: creationPin }), item: form });
      setEntries(list => editing ? list.map(x => x.id === data.item.id ? data.item : x) : [data.item, ...list]);
      setEditor(null); setCreationPin(''); setNotice(editing ? 'Activity updated.' : 'New task created securely.');
    } catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function updateTask(item, status) {
    setBusy(true);
    try { const data = await api({ action: 'update', id: item.id, item: { ...item, status } }); setEntries(list => list.map(x => x.id === item.id ? data.item : x)); }
    catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function addNote(id) {
    if (!note.trim()) return;
    setBusy(true);
    try { const data = await api({ action: 'note', id, note }); setEntries(list => list.map(x => x.id === id ? data.item : x)); setNote(''); setNotice('Daily update saved.'); }
    catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function deleteTask(item) {
    if (!window.confirm(`Delete “${item.title}” and all its progress notes?`)) return;
    setBusy(true);
    try { await api({ action: 'delete', id: item.id }); setEntries(list => list.filter(x => x.id !== item.id)); setNotice('Task deleted.'); }
    catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function togglePrayer(payload) {
    setBusy(true);
    try { const data = await api({ action: 'prayer_update', ...payload }); setPrayerDays(old => ({ ...old, [data.date]: data.day })); setNotice(`${payload.prayer[0].toUpperCase() + payload.prayer.slice(1)} updated for ${prettyDate(payload.date)}.`); }
    catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function addQuran(form) {
    setBusy(true);
    try { const data = await api({ action: 'quran_add', ...form }); setQuranEntries(list => [...list, data.entry]); setNotice('Quran reading saved.'); return true; }
    catch (err) { fail(err); return false; } finally { setBusy(false); }
  }
  async function deleteQuran(item) {
    if (!window.confirm(`Delete Para ${item.para} reading for ${prettyDate(item.date)}?`)) return;
    setBusy(true);
    try { await api({ action: 'quran_delete', id: item.id }); setQuranEntries(list => list.filter(x => x.id !== item.id)); setNotice('Quran reading deleted.'); }
    catch (err) { fail(err); } finally { setBusy(false); }
  }
  async function makeSummary(settings) {
    setBusy(true); setSummaryResult(null);
    try { const data = await api({ action: 'summary', ...settings }); setSummaryResult({ summary: data.summary }); }
    catch (err) { setSummaryResult({ error: err.message }); if (err.status === 401) fail(err); }
    finally { setBusy(false); }
  }
  function navigate(key) { setSection(key); setExpanded(null); setNote(''); setSearch(''); setFilter('all'); setNotice(''); }
  const heading = section === 'overview' ? 'Your day, in focus.' : ALL_SECTIONS.find(x => x.key === section)?.name || 'Track Me';
  const sectionCount = useMemo(() => Object.fromEntries(WORK_SECTIONS.map(x => [x.key, entries.filter(t => t.section === x.key).length])), [entries]);

  if (loading) return <div className="tm-page tm-loading"><div className="tm-spinner"/><p>Opening your private workspace...</p></div>;
  if (!authenticated) return <main className="tm-page"><LoginScreen password={password} setPassword={setPassword} onSubmit={signIn} busy={busy} error={loginError}/></main>;
  if (welcome) return <div className="tm-page"><CautionWelcome onContinue={() => setWelcome(false)}/></div>;

  return <main className="tm-page"><div className="tm-shell">
    <div className="tm-topbar"><Link to="/" className="tm-return"><ArrowLeft size={16}/> Portfolio</Link><span><ShieldCheck size={15}/> Owner workspace</span><button type="button" onClick={signOut}><LogOut size={16}/> Lock Workspace</button></div>
    <div className="tm-hero"><div><p className="tm-eyebrow">PERSONAL COMMAND CENTER · {prettyDate(dayISO()).toUpperCase()}</p><h1>Track <em>Me.</em></h1><p className="tm-hero-desc">Plan deliberately. Record your progress. Stay focused on what matters.</p></div><div className="tm-hero-actions"><button className="tm-outline-btn" type="button" onClick={() => { setSummaryOpen(true); setSummaryResult(null); }}><Sparkles size={19}/> AI Summary</button><button className="tm-primary" type="button" onClick={() => newTask(WORK_SECTIONS.some(x => x.key === section) ? section : 'office')}><LockKeyhole size={17}/> New Task</button></div></div>
    <div className="tm-body"><aside className="tm-sidebar"><p className="tm-nav-label">MY DASHBOARD</p><button className={`tm-nav-item ${section === 'overview' ? 'tm-active' : ''}`} onClick={() => navigate('overview')}><TrendingUp size={19}/><span>Overview</span></button><p className="tm-nav-label">WORK & LIFE</p>{WORK_SECTIONS.map(s => { const Icon = s.icon; return <button key={s.key} className={`tm-nav-item ${section === s.key ? 'tm-active' : ''}`} onClick={() => navigate(s.key)}><Icon size={19}/><span>{s.name}</span><b>{sectionCount[s.key]}</b></button>; })}<p className="tm-nav-label">DAILY PRACTICES</p>{PRACTICE_SECTIONS.map(s => { const Icon = s.icon; return <button key={s.key} className={`tm-nav-item ${section === s.key ? 'tm-active' : ''}`} onClick={() => navigate(s.key)}><Icon size={19}/><span>{s.name}</span></button>; })}<div className="tm-sidebar-foot"><ShieldCheck size={17}/><span>Your private personal log</span></div></aside>
      <div className="tm-content-area"><div className="tm-content-title"><span className="tm-eyebrow">{section === 'overview' ? 'OVERVIEW' : 'YOUR PRIVATE SECTION'}</span><h2>{heading}</h2></div>{notice && <div className="tm-notice" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss"><X size={16}/></button></div>}
        {section === 'overview' && <Overview entries={entries} days={prayerDays} quran={quranEntries} onSection={navigate} onNew={newTask}/>} 
        {WORK_SECTIONS.some(x => x.key === section) && <WorkPanel section={section} entries={entries} busy={busy} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} expanded={expanded} setExpanded={setExpanded} note={note} setNote={setNote} onNew={newTask} onNote={addNote} onEdit={task => setEditor({ ...task })} onDelete={deleteTask} onStatus={updateTask}/>}
        {section === 'prayer' && <PrayerPanel date={prayerDate} setDate={setPrayerDate} days={prayerDays} busy={busy} onToggle={togglePrayer}/>}
        {section === 'quran' && <QuranPanel quran={quranEntries} busy={busy} onAdd={addQuran} onDelete={deleteQuran}/>}
      </div>
    </div><footer className="tm-footer"><span>TRACK ME · YOUR PERSONAL SPACE</span><span>Consistency is built one day at a time.</span></footer>
  </div>
  {pinOpen && <PinModal busy={busy} onVerify={verifyPin} onClose={() => setPinOpen(false)} error={pinError}/>}
  {editor && <TaskEditor key={editor.id || `new-${editor.section}`} initial={editor} saving={busy} onClose={() => { setEditor(null); setCreationPin(''); }} onSave={saveTask}/>}
  {summaryOpen && <SummaryModal section={section === 'overview' ? 'all' : section} busy={busy} result={summaryResult} onGenerate={makeSummary} onClose={() => setSummaryOpen(false)}/>}
  </main>;
}
