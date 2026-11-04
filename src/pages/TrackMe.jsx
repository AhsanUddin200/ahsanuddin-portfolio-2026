import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, CalendarDays, Check,
  CheckCircle2, ChevronLeft, ChevronRight, Clock3, Edit3, Eye, EyeOff,
  GraduationCap, Heart, KeyRound, LockKeyhole, LogOut, Plus, Search,
  Send, ShieldAlert, ShieldCheck, Sparkles, Trash2, TrendingUp, X, Home, Menu,
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
        <div className="tm-lock-icon"><LockKeyhole size={28}/></div>
        <h1>Track Me</h1>
        <p className="tm-access-copy">Apna roz ka kaam aur progress yahan dekhein.</p>
        <form onSubmit={onSubmit} className="tm-stack">
          <label className="tm-field"><span>Your password / Password dalein</span>
            <div className="tm-input-icon"><KeyRound size={18}/><input required type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" maxLength={200}/>
              <button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(x => !x)}>{show ? <EyeOff size={19}/> : <Eye size={19}/>}</button>
            </div>
          </label>
          {error && <div role="alert" className="tm-error">{error}</div>}
          <button type="submit" className="tm-primary tm-wide" disabled={busy}>{busy ? 'Opening...' : 'Open My Tracker'} <ArrowRight size={19}/></button>
        </form>
        <p className="tm-footnote"><ShieldCheck size={16}/> Private and protected</p>
      </div>
      <Link className="tm-return" to="/"><ArrowLeft size={18}/> Back to website</Link>
    </div>
  );
}

function CautionWelcome({ onContinue }) {
  const message = 'You are tracking your man.\nYou are tracking your son.\nSo keep attention.';
  const [typed, setTyped] = useState('');
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTyped(message); return; }
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setTyped(message.slice(0, index));
      if (index >= message.length) clearInterval(timer);
    }, 34);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="tm-welcome-screen" role="dialog" aria-modal="true" aria-label="Welcome to Track Me">
      <div className="tm-welcome-card">
        <div className="tm-warning-icon"><ShieldAlert size={29}/></div>
        <p className="tm-eyebrow">PRIVATE REMINDER / CAUTION</p>
        <h2>Every day matters.</h2>
        <div className="tm-typing" aria-label={message}>{typed}<span aria-hidden="true" className="tm-caret">▌</span></div>
        <p>Roz thora sa progress bhi important hai.</p>
        <button className="tm-primary tm-wide" type="button" onClick={onContinue}>Continue <ArrowRight size={19}/></button>
      </div>
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
        <h2>New Task Code</h2>
        <p className="tm-muted">Sirf owner new task bana sakta hai. Apna secret code dalein.</p>
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

function SummaryModal({ section, busy, result, onGenerate, onClose }) {
  const [period, setPeriod] = useState('week');
  const [scope, setScope] = useState(section);
  const [language, setLanguage] = useState('roman');
  return (
    <div className="tm-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section className="tm-modal tm-summary-modal" role="dialog" aria-modal="true" aria-label="AI summary">
        <div className="tm-modal-heading"><h2><Sparkles size={22}/> My Progress Summary</h2><button type="button" className="tm-close" aria-label="Close" onClick={onClose}><X size={21}/></button></div>
        <p className="tm-muted">Apni saved progress ka short summary dekhein.</p>
        <div className="tm-stack">
          <label className="tm-field"><span>Which days?</span><select value={period} onChange={e => setPeriod(e.target.value)}><option value="today">Today</option><option value="week">Last 7 days</option><option value="all">All days</option></select></label>
          <label className="tm-field"><span>Which section?</span><select value={scope} onChange={e => setScope(e.target.value)}><option value="all">Everything</option>{ALL_SECTIONS.map(x => <option key={x.key} value={x.key}>{x.name}</option>)}</select></label>
          <details className="tm-details"><summary>Language (optional)</summary><label className="tm-field"><span>Language</span><select value={language} onChange={e => setLanguage(e.target.value)}><option value="roman">Roman Urdu</option><option value="en">English</option></select></label></details>
          <button type="button" disabled={busy} className="tm-primary tm-wide" onClick={() => onGenerate({period, section:scope, language})}><Sparkles size={18}/>{busy ? 'Preparing...' : 'Show My Summary'}</button>
          <p className="tm-footnote"><LockKeyhole size={14}/> Summary ke liye selected data Groq AI ko send hota hai.</p>
          {result && <div className={result.error ? 'tm-error' : 'tm-summary-result'} role="status">{result.error || result.summary}</div>}
        </div>
      </section>
    </div>
  );
}

function TaskCard({ item, expanded, onExpand, note, setNote, busy, onNote, onEdit, onDelete, onStatus }) {
  const meta = item.meta || {};
  const project = item.section === 'office' ? meta.project : item.section === 'university' ? meta.university : (meta.area || '');
  const question = item.section === 'office' ? 'Aaj is project mein kya kiya?' : item.section === 'university' ? 'Application ke baare mein kya update hai?' : 'Aaj kya progress hui?';
  return (
    <article className="tm-task-card">
      <div className="tm-task-top"><h3>{item.title}</h3><span className={`tm-state tm-state-${item.status}`}>{STATUS[item.status] || 'To Do'}</span></div>
      {project && <p className="tm-task-project">{project}</p>}
      {item.detail && <p className="tm-task-detail">{item.detail}</p>}
      {item.section === 'university' && <p className="tm-task-detail"><strong>{APP_STATUS[meta.applicationStatus] || 'Planning'}</strong>{meta.upcomingDate ? ` · Next date: ${prettyDate(meta.upcomingDate)}` : ''}</p>}
      {item.dueDate && <p className="tm-task-detail"><CalendarDays size={15}/> Due: {prettyDate(item.dueDate)}</p>}
      <button type="button" className="tm-update-button" aria-expanded={expanded} onClick={() => onExpand(item.id)}><Send size={18}/>{expanded ? 'Close Daily Update' : 'Aaj kya kiya? / Add Update'}<ChevronRight size={19} className={expanded ? 'tm-rotate' : ''}/></button>
      {expanded && <div className="tm-note-panel">
        <form className="tm-stack" onSubmit={e => { e.preventDefault(); onNote(item.id); }}>
          <label className="tm-field"><span>{question}</span><textarea required rows={3} maxLength={1000} value={note} onChange={e => setNote(e.target.value)} placeholder="Write your update here..."/></label>
          <button type="submit" className="tm-primary tm-wide" disabled={busy || !note.trim()}>{busy ? 'Saving...' : 'Save Today’s Update'} <Check size={18}/></button>
        </form>
        {!!(item.logs || []).length && <details className="tm-details"><summary>Previous updates ({item.logs.length})</summary><div className="tm-note-list">{item.logs.slice().reverse().map(l => <div className="tm-note-row" key={l.id}><time>{prettyDate(l.createdAt)}</time><p>{l.note}</p></div>)}</div></details>}
        <div className="tm-task-settings"><label className="tm-field"><span>Task status</span><select value={item.status} disabled={busy} onChange={e => onStatus(item, e.target.value)}>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label><button className="tm-quiet-btn" type="button" onClick={() => onEdit(item)}><Edit3 size={17}/> Edit Task</button><button className="tm-delete" type="button" onClick={() => onDelete(item)}><Trash2 size={17}/> Delete Task</button></div>
      </div>}
    </article>
  );
}

function PrayerPanel({ date, setDate, days, busy, onToggle }) {
  const record = days[date] || {group:{}, makeup:{}};
  const completed = PRAYERS.filter(([k]) => record.group?.[k] || record.makeup?.[k]).length;
  const lastSeven = Array.from({length:7}, (_,i) => shiftDay(dayISO(), i - 6));
  return (
    <section className="tm-panel tm-prayer-panel">
      <div className="tm-panel-head"><div><h2>Namaz / Prayer</h2><p>Namaz par tap karein. Tick automatic save hoga.</p></div></div>
      <div className="tm-day-picker"><button type="button" aria-label="Previous day" onClick={() => setDate(shiftDay(date,-1))}><ChevronLeft size={22}/></button><label className="tm-date-label"><span>Date / Tareekh</span><input type="date" value={date} onChange={e => setDate(e.target.value)} aria-label="Prayer date"/></label><button type="button" aria-label="Next day" onClick={() => setDate(shiftDay(date,1))}><ChevronRight size={22}/></button></div>
      <div className="tm-prayer-progress"><strong>{completed} / 5</strong><span>prayers recorded for {prettyDate(date)}</span>{date !== dayISO() && <button type="button" className="tm-today" onClick={() => setDate(dayISO())}>Go to Today</button>}</div>
      <div className="tm-prayer-legend"><span>Prayer</span><span>Jamaat</span><span>Qaza</span></div>
      <div className="tm-prayer-list">{PRAYERS.map(([key,label]) => {
        const group = Boolean(record.group?.[key]);
        const makeup = Boolean(record.makeup?.[key]);
        return <div className="tm-prayer-row" key={key}>
          <strong>{label}</strong>
          <button type="button" aria-pressed={group} aria-label={`${label} Jamaat ${group ? 'recorded' : 'not recorded'}`} className={`tm-prayer-choice ${group ? 'tm-picked' : ''}`} disabled={busy} onClick={() => onToggle({date,prayer:key,kind:'group',checked:!group})}>{group && <Check size={18}/>}<span>{group ? 'Done' : 'Jamaat'}</span></button>
          <button type="button" aria-pressed={makeup} aria-label={`${label} Qaza ${makeup ? 'recorded' : 'not recorded'}`} className={`tm-prayer-choice ${makeup ? 'tm-picked' : ''}`} disabled={busy} onClick={() => onToggle({date,prayer:key,kind:'makeup',checked:!makeup})}>{makeup && <Check size={18}/>}<span>{makeup ? 'Done' : 'Qaza'}</span></button>
        </div>;
      })}</div>
      <p className="tm-helper">Sirf ek option select hoga. Dobara tap karein to tick remove ho jayega. Khali option ka matlab record nahi hua.</p>
      <details className="tm-details tm-history"><summary>See last 7 days</summary><div className="tm-week-strip">{lastSeven.map(d => {const r=days[d]||{};const n=PRAYERS.filter(([k]) => r.group?.[k]||r.makeup?.[k]).length;return <button key={d} type="button" className={`tm-week-day ${d===date?'tm-selected':''}`} onClick={() => setDate(d)}><span>{new Date(`${d}T12:00:00`).toLocaleDateString('en-US',{weekday:'short'})}</span><strong>{d.slice(8)}</strong><small>{n}/5</small></button>;})}</div></details>
    </section>
  );
}

function QuranPanel({ quran, busy, onAdd, onDelete }) {
  const [form, setForm] = useState({date:dayISO(), para:'1', pagesRead:'1', fromPage:'', toPage:'', note:''});
  const change = (k,v) => setForm(old => ({...old,[k]:v}));
  const total = quran.reduce((sum,x) => sum + Number(x.pagesRead||0),0);
  const today = quran.filter(x => x.date === dayISO()).reduce((sum,x) => sum + Number(x.pagesRead||0),0);
  const sorted = [...quran].sort((a,b) => b.date.localeCompare(a.date)||b.createdAt.localeCompare(a.createdAt));
  return (
    <section className="tm-panel tm-quran-panel">
      <div className="tm-panel-head"><div><h2>Quran Reading</h2><p>Para select karein, jitne pages parhe hain likhein, phir Save.</p></div></div>
      <div className="tm-reading-count"><BookOpen size={24}/><div><strong>{today} pages</strong><span>Today · {total} pages total</span></div></div>
      <form className="tm-quran-form tm-stack" onSubmit={async e => {e.preventDefault();const ok=await onAdd(form);if(ok)setForm(old=>({...old,pagesRead:'1',fromPage:'',toPage:'',note:''}));}}>
        <label className="tm-field"><span>1. Which Para?</span><select value={form.para} onChange={e => change('para',e.target.value)}>{Array.from({length:30},(_,i)=><option key={i+1} value={i+1}>Para {i+1}</option>)}</select></label>
        <label className="tm-field"><span>2. How many pages read?</span><input type="number" inputMode="numeric" min="1" max="200" required value={form.pagesRead} onChange={e => change('pagesRead',e.target.value)}/></label>
        <label className="tm-field"><span>3. Reading date</span><input type="date" required value={form.date} onChange={e => change('date',e.target.value)}/></label>
        <details className="tm-details"><summary>More details (optional)</summary>
          <label className="tm-field"><span>From printed page</span><input type="number" min="1" value={form.fromPage} onChange={e=>change('fromPage',e.target.value)} placeholder="Page number"/></label>
          <label className="tm-field"><span>To printed page</span><input type="number" min="1" value={form.toPage} onChange={e=>change('toPage',e.target.value)} placeholder="Page number"/></label>
          <label className="tm-field"><span>Note</span><input maxLength={350} value={form.note} onChange={e=>change('note',e.target.value)} placeholder="Optional note"/></label>
        </details>
        <button className="tm-primary tm-wide" type="submit" disabled={busy}><Check size={20}/>{busy ? 'Saving...' : 'Save Reading'}</button>
      </form>
      <p className="tm-helper">15-line Quran: page numbering can be different in different editions.</p>
      <details className="tm-details tm-history"><summary>Reading history ({sorted.length})</summary><div className="tm-reading-list">{sorted.length ? sorted.map(item=><div key={item.id} className="tm-reading-item"><div><strong>Para {item.para} · {item.pagesRead} pages</strong><p>{prettyDate(item.date)}{item.fromPage ? ` · Pg ${item.fromPage}${item.toPage?`–${item.toPage}`:''}`:''}{item.note?` · ${item.note}`:''}</p></div><button type="button" className="tm-icon-btn tm-danger" aria-label="Delete reading" disabled={busy} onClick={()=>onDelete(item)}><Trash2 size={19}/></button></div>) : <p>No reading recorded yet.</p>}</div></details>
    </section>
  );
}

function WorkPanel({ section, entries, busy, search, setSearch, filter, setFilter, expanded, setExpanded, note, setNote, onNew, onNote, onEdit, onDelete, onStatus }) {
  const info = WORK_SECTIONS.find(x => x.key === section);
  const items = entries.filter(x => x.section === section);
  const filtered = items.filter(x => (filter === 'all' || x.status === filter) && `${x.title} ${x.detail} ${x.meta?.project||''} ${x.meta?.university||''} ${(x.logs||[]).map(l=>l.note).join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  const upcoming = items.filter(x => x.meta?.upcomingDate || x.dueDate).map(x => ({...x,eventDate:x.meta?.upcomingDate||x.dueDate})).filter(x => x.eventDate>=dayISO()).sort((a,b)=>a.eventDate.localeCompare(b.eventDate)).slice(0,5);
  return <section className="tm-panel tm-work-panel">
    <div className="tm-panel-head"><div><h2>{info.name}</h2><p>{section === 'office' ? 'Apna project kholein aur aaj ka kaam likhein.' : section === 'university' ? 'University applications aur important dates yahan hain.' : 'Personal goals aur roz ki progress yahan likhein.'}</p></div></div>
    <button type="button" className="tm-primary tm-wide tm-add-task" onClick={()=>onNew(section)}><Plus size={20}/> Add New Task <LockKeyhole size={16}/></button>
    {section === 'university' && upcoming.length>0 && <div className="tm-upcoming-box"><h3><CalendarDays size={19}/> Upcoming dates</h3>{upcoming.map(x=><div key={x.id} className="tm-upcoming-row"><strong>{x.meta?.university||x.title}</strong><time>{prettyDate(x.eventDate)}</time></div>)}</div>}
    {items.length>3 && <details className="tm-details tm-history"><summary>Search or filter tasks</summary><div className="tm-toolbar"><label className="tm-field"><span>Search</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a task..."/></label><label className="tm-field"><span>Show</span><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All tasks</option>{Object.entries(STATUS).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label></div></details>}
    <p className="tm-count-label">{items.length} {items.length === 1 ? 'task' : 'tasks'}</p>
    <div className="tm-task-list">{filtered.length ? filtered.map(item=><TaskCard key={item.id} item={item} expanded={expanded===item.id} onExpand={id=>{setExpanded(expanded===id?null:id);setNote('');}} note={expanded===item.id?note:''} setNote={setNote} busy={busy} onNote={onNote} onEdit={onEdit} onDelete={onDelete} onStatus={onStatus}/>) : <div className="tm-empty"><CheckCircle2 size={32}/><h3>No tasks yet</h3><p>Use the Add New Task button above.</p></div>}</div>
  </section>;
}

function Overview({ entries, days, quran, onSection }) {
  const today = dayISO();
  const r = days[today] || {};
  const prayerCount = PRAYERS.filter(([k])=>r.group?.[k]||r.makeup?.[k]).length;
  const quranToday = quran.filter(x=>x.date===today).reduce((a,x)=>a+Number(x.pagesRead||0),0);
  const counts = Object.fromEntries(WORK_SECTIONS.map(x=>[x.key,entries.filter(t=>t.section===x.key).length]));
  const upcoming = entries.filter(x=>x.section==='university').map(x=>({...x,eventDate:x.meta?.upcomingDate||x.dueDate})).filter(x=>x.eventDate && x.eventDate>=today).sort((a,b)=>a.eventDate.localeCompare(b.eventDate)).slice(0,3);
  const shortcuts = [
    {key:'prayer',title:'Namaz / Prayer',sub:'5 waqt ki namaz tick karein',count:`${prayerCount}/5 today`,icon:Clock3},
    {key:'quran',title:'Quran Reading',sub:'Aaj kitne pages parhe?',count:`${quranToday} pages today`,icon:BookOpen},
    {key:'office',title:'Office Work',sub:'Aaj project par kya kaam kiya?',count:`${counts.office} tasks`,icon:BriefcaseBusiness},
    {key:'personal',title:'Personal Work',sub:'Apne personal goals update karein',count:`${counts.personal} tasks`,icon:Heart},
    {key:'university',title:'University',sub:'Applications aur next dates',count:`${counts.university} items`,icon:GraduationCap},
  ];
  return <div className="tm-overview">
    <div className="tm-welcome-intro"><p>{prettyDate(today)}</p><h2>Aaj kya record karna hai?</h2><span>Bas apna section select karein.</span></div>
    <div className="tm-simple-choices">{shortcuts.map(x=>{const Icon=x.icon;return <button key={x.key} type="button" className="tm-choice" onClick={()=>onSection(x.key)}><span className={`tm-choice-icon tm-choice-${x.key}`}><Icon size={24}/></span><span className="tm-choice-text"><strong>{x.title}</strong><small>{x.sub}</small></span><span className="tm-choice-trailing"><em>{x.count}</em><ChevronRight size={20}/></span></button>;})}</div>
    {upcoming.length>0 && <div className="tm-home-upcoming"><h3><CalendarDays size={18}/> Upcoming University Dates</h3>{upcoming.map(x=><div className="tm-home-event" key={x.id}><span>{x.meta?.university||x.title}</span><strong>{prettyDate(x.eventDate)}</strong></div>)}<button type="button" onClick={()=>onSection('university')}>Open University <ArrowRight size={18}/></button></div>}
    <p className="tm-home-hint"><ShieldCheck size={17}/> Your progress saves to your private workspace.</p>
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
  const sectionCount = useMemo(() => Object.fromEntries(WORK_SECTIONS.map(x=>[x.key,entries.filter(t=>t.section===x.key).length])), [entries]);
  const activeNav = ['overview','prayer','quran','office'].includes(section) ? section : 'more';
  const go = key => { navigate(key); if (typeof window !== 'undefined') window.scrollTo({top:0,behavior:'instant'}); };
  const showSummary = () => { setSummaryOpen(true); setSummaryResult(null); };

  if (loading) return <main className="tm-page tm-loading" role="status"><div className="tm-spinner"/><p>Opening Track Me...</p></main>;
  if (!authenticated) return <main className="tm-page"><LoginScreen password={password} setPassword={setPassword} onSubmit={signIn} busy={busy} error={loginError}/></main>;
  if (welcome) return <main className="tm-page"><CautionWelcome onContinue={()=>setWelcome(false)}/></main>;

  const basicNav = [{key:'overview',label:'Home',icon:Home},{key:'prayer',label:'Prayer',icon:Clock3},{key:'quran',label:'Quran',icon:BookOpen},{key:'office',label:'Work',icon:BriefcaseBusiness},{key:'more',label:'More',icon:Menu}];
  return <main className="tm-page tm-easy"><div className="tm-shell">
    <header className="tm-topbar"><button className="tm-brand" type="button" onClick={()=>go('overview')}><span className="tm-brand-mark"><Check size={20}/></span><strong>Track Me</strong></button><button type="button" className="tm-topbar-lock" onClick={signOut}><LogOut size={18}/> <span>Log out</span></button></header>
    <div className="tm-body">
      <aside className="tm-sidebar" aria-label="Sections">
        <p className="tm-nav-label">YOUR TRACKER</p>
        {[{key:'overview',name:'Home',icon:Home},...PRACTICE_SECTIONS,...WORK_SECTIONS].map(x=>{const Icon=x.icon;return <button type="button" key={x.key} className={`tm-nav-item ${section===x.key?'tm-active':''}`} onClick={()=>go(x.key)}><Icon size={21}/><span>{x.name}</span>{sectionCount[x.key]!=null && <small>{sectionCount[x.key]}</small>}</button>;})}
        <button type="button" className="tm-nav-item tm-nav-secondary" onClick={showSummary}><Sparkles size={20}/><span>My Summary</span></button>
        <Link className="tm-nav-item tm-nav-secondary" to="/"><ArrowLeft size={20}/><span>Website</span></Link>
      </aside>
      <div className="tm-content-area">
        {section !== 'overview' && <button type="button" className="tm-back-home" onClick={()=>go('overview')}><ArrowLeft size={18}/> Back to Home</button>}
        {notice && <div className="tm-notice" role="status"><CheckCircle2 size={18}/><span>{notice}</span><button type="button" onClick={()=>setNotice('')} aria-label="Dismiss message"><X size={19}/></button></div>}
        {section==='overview' && <Overview entries={entries} days={prayerDays} quran={quranEntries} onSection={go}/>}
        {WORK_SECTIONS.some(x=>x.key===section) && <WorkPanel section={section} entries={entries} busy={busy} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} expanded={expanded} setExpanded={setExpanded} note={note} setNote={setNote} onNew={newTask} onNote={addNote} onEdit={item=>setEditor({...item})} onDelete={deleteTask} onStatus={updateTask}/>}
        {section==='prayer' && <PrayerPanel date={prayerDate} setDate={setPrayerDate} days={prayerDays} busy={busy} onToggle={togglePrayer}/>}
        {section==='quran' && <QuranPanel quran={quranEntries} busy={busy} onAdd={addQuran} onDelete={deleteQuran}/>}
        {section==='more' && <section className="tm-more-panel"><h2>More options</h2><p>Apko kya dekhna hai?</p>
          <button type="button" onClick={()=>go('personal')}><Heart size={24}/><span>Personal Work</span><ChevronRight size={20}/></button>
          <button type="button" onClick={()=>go('university')}><GraduationCap size={24}/><span>University</span><ChevronRight size={20}/></button>
          <button type="button" onClick={showSummary}><Sparkles size={24}/><span>My AI Summary</span><ChevronRight size={20}/></button>
          <button type="button" onClick={()=>newTask('office')}><LockKeyhole size={24}/><span>Add New Task (Code)</span><ChevronRight size={20}/></button>
          <Link to="/"><ArrowLeft size={24}/><span>Back to Website</span><ChevronRight size={20}/></Link>
        </section>}
      </div>
    </div>
    <footer className="tm-footer">Track Me · One day at a time</footer>
  </div>
  <nav className="tm-mobile-nav" aria-label="Quick sections">{basicNav.map(x=>{const Icon=x.icon;return <button type="button" key={x.key} aria-current={activeNav===x.key?'page':undefined} className={activeNav===x.key?'tm-current':''} onClick={()=>go(x.key)}><Icon size={22}/><span>{x.label}</span></button>;})}</nav>
  {pinOpen && <PinModal busy={busy} onVerify={verifyPin} onClose={()=>setPinOpen(false)} error={pinError}/>}
  {editor && <TaskEditor key={editor.id||`new-${editor.section}`} initial={editor} saving={busy} onClose={()=>{setEditor(null);setCreationPin('');}} onSave={saveTask}/>}
  {summaryOpen && <SummaryModal section={section==='overview'||section==='more'?'all':section} busy={busy} result={summaryResult} onGenerate={makeSummary} onClose={()=>setSummaryOpen(false)}/>}
  </main>;
}
