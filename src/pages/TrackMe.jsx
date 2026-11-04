
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Edit3,
  Eye,
  EyeOff,
  GraduationCap,
  Heart,
  KeyRound,
  LockKeyhole,
  LogOut,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";

import "./TrackMe.css";

/* =========================================================
   TRACK ME - PERSONAL WORKSPACE

   Features:
   - Password protected login
   - Office Work
   - Personal Work
   - University
   - Prayer
   - Quran
   - Create / Edit / Delete Tasks
   - Daily Progress Updates
   - Task Status Management
   - AI Progress Summary
========================================================= */

/* =========================================================
   WORKSPACE SECTIONS
========================================================= */

const GROUPS = [
  {
    title: "Work & Life",
    items: [
      {
        key: "office",
        label: "Office Work",
        icon: BriefcaseBusiness,
      },
      {
        key: "personal",
        label: "Personal Work",
        icon: Heart,
      },
      {
        key: "university",
        label: "University",
        icon: GraduationCap,
      },
    ],
  },
  {
    title: "Practices",
    items: [
      {
        key: "prayer",
        label: "Prayer",
        icon: Clock3,
      },
      {
        key: "quran",
        label: "Quran",
        icon: BookOpen,
      },
    ],
  },
];

const CATEGORIES = GROUPS.flatMap(
  (group) => group.items
);

const LABEL = Object.fromEntries(
  CATEGORIES.map((item) => [
    item.key,
    item.label,
  ])
);

/* =========================================================
   TASK STATUSES
========================================================= */

const STATUS_LABEL = {
  planned: "To Do",
  in_progress: "In Progress",
  done: "Completed",
};

const STATUS_ORDER = [
  "planned",
  "in_progress",
  "done",
];

/* =========================================================
   DEFAULT TASK DATA
========================================================= */

const blankTask = (
  category = "office"
) => ({
  title: "",
  detail: "",
  section: category,
  status: "planned",
  priority: "medium",
  dueDate: "",
});

/* =========================================================
   BACKEND API HELPER

   Backend Endpoint:
   /api/track

   Authentication, database storage, and AI summaries
   are handled by the server-side API.
========================================================= */

async function trackAPI(data) {
  const request = data
    ? {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    : {
        method: "GET",
      };

  const response = await fetch(
    "/api/track",
    {
      ...request,
      credentials: "same-origin",
      cache: "no-store",
    }
  );

  let payload;

  try {
    payload = await response.json();
  } catch {
    throw new Error(
      "Track Me API is unavailable. Please check the backend configuration."
    );
  }

  if (!response.ok) {
    const error = new Error(
      payload.error ||
        "Something went wrong."
    );

    error.status = response.status;

    throw error;
  }

  return payload;
}

/* =========================================================
   DATE FORMATTING
========================================================= */

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date =
    value.length === 10
      ? new Date(
          `${value}T12:00:00`
        )
      : new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function formatDateTime(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

/* =========================================================
   ICON HELPER
========================================================= */

function Mark({
  icon: Icon,
  size = 18,
}) {
  return (
    <Icon
      size={size}
      strokeWidth={1.8}
    />
  );
}

/* =========================================================
   PASSWORD SCREEN
========================================================= */

function PasswordScreen({
  onLogin,
  loading,
  error,
  password,
  setPassword,
}) {
  const [
    passwordVisible,
    setPasswordVisible,
  ] = useState(false);

  return (
    <div className="tm-lock-layout">

      <div className="tm-lock-glow" />

      <div className="tm-lock-card">

        <div className="tm-lock-icon">
          <LockKeyhole
            size={28}
          />
        </div>

        <span className="tm-kicker">
          PRIVATE WORKSPACE / RESTRICTED
        </span>

        <h1>
          Your work. Your space.
        </h1>

        <p>
          A private place to manage
          your office projects,
          university work,
          personal activities,
          and daily practices.
        </p>

        <form
          className="tm-login-form"
          onSubmit={onLogin}
        >

          <label htmlFor="trackPassword">
            Access Password
          </label>

          <div className="tm-password-wrap">

            <KeyRound
              size={19}
            />

            <input
              id="trackPassword"
              type={
                passwordVisible
                  ? "text"
                  : "password"
              }
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter your private password"
              maxLength={200}
              required
            />

            <button
              type="button"
              aria-label={
                passwordVisible
                  ? "Hide password"
                  : "Show password"
              }
              onClick={() =>
                setPasswordVisible(
                  !passwordVisible
                )
              }
            >
              {passwordVisible ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {error && (
            <div
              className="tm-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="tm-primary tm-login-button"
            disabled={loading}
          >
            {loading
              ? "Verifying..."
              : "Unlock Track Me"}

            <ArrowRight
              size={18}
            />
          </button>

        </form>

        <div className="tm-lock-foot">
          <ShieldCheck
            size={15}
          />

          Secure server-side authentication
        </div>

      </div>

      <Link
        to="/"
        className="tm-back"
      >
        <ArrowLeft
          size={17}
        />

        Back to Portfolio
      </Link>

    </div>
  );
}

/* =========================================================
   CREATE / EDIT TASK MODAL
========================================================= */

function TaskEditor({
  initial,
  onClose,
  onSave,
  saving,
}) {
  const [
    form,
    setForm,
  ] = useState({
    ...initial,
  });

  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    onSave(form);
  };

  return (
    <div
      className="tm-modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <section
        className="tm-modal tm-edit-modal"
        role="dialog"
        aria-modal="true"
        aria-label={
          initial.id
            ? "Edit Task"
            : "Create Task"
        }
      >

        <div className="tm-modal-header">

          <div>
            <span className="tm-kicker">
              WORK TRACKER
            </span>

            <h2>
              {initial.id
                ? "Edit Your Task"
                : "Add Something to Track"}
            </h2>
          </div>

          <button
            type="button"
            className="tm-icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>

        </div>

        <form
          className="tm-form"
          onSubmit={handleSubmit}
        >

          {/* TASK NAME */}

          <label>
            Task / Activity Name

            <input
              autoFocus
              type="text"
              value={form.title}
              maxLength={140}
              required
              placeholder="What are you working on?"
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value
                )
              }
            />
          </label>

          {/* CATEGORY */}

          <label>
            Section

            <select
              value={form.section}
              onChange={(event) =>
                updateField(
                  "section",
                  event.target.value
                )
              }
            >
              {CATEGORIES.map(
                (item) => (
                  <option
                    key={item.key}
                    value={item.key}
                  >
                    {item.label}
                  </option>
                )
              )}
            </select>
          </label>

          {/* DETAILS */}

          <label>
            Details / Next Steps

            <textarea
              value={form.detail}
              maxLength={1800}
              rows={4}
              placeholder="Write your plan, goal, or notes..."
              onChange={(event) =>
                updateField(
                  "detail",
                  event.target.value
                )
              }
            />
          </label>

          {/* STATUS + PRIORITY */}

          <div className="tm-form-grid">

            <label>
              Status

              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value
                  )
                }
              >
                {STATUS_ORDER.map(
                  (key) => (
                    <option
                      key={key}
                      value={key}
                    >
                      {STATUS_LABEL[key]}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Priority

              <select
                value={form.priority}
                onChange={(event) =>
                  updateField(
                    "priority",
                    event.target.value
                  )
                }
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>
            </label>

          </div>

          {/* TARGET DATE */}

          <label>
            Target Date (Optional)

            <input
              type="date"
              value={form.dueDate}
              onChange={(event) =>
                updateField(
                  "dueDate",
                  event.target.value
                )
              }
            />
          </label>

          {/* ACTION BUTTONS */}

          <div className="tm-modal-actions">

            <button
              type="button"
              className="tm-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="tm-primary"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : initial.id
                  ? "Save Changes"
                  : "Create Task"}

              <Check size={17} />
            </button>

          </div>

        </form>

      </section>
    </div>
  );
}

/* =========================================================
   AI SUMMARY MODAL
========================================================= */

function SummaryModal({
  onClose,
  onGenerate,
  busy,
  result,
  section,
}) {
  const [
    period,
    setPeriod,
  ] = useState("week");

  const [
    scope,
    setScope,
  ] = useState(section);

  const [
    language,
    setLanguage,
  ] = useState("roman");

  return (
    <div
      className="tm-modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <section
        className="tm-modal tm-summary-modal"
        role="dialog"
        aria-modal="true"
        aria-label="AI Progress Summary"
      >

        <div className="tm-modal-header">

          <div>
            <span className="tm-kicker">
              INTELLIGENT RECAP
            </span>

            <h2>
              <Sparkles size={26} />

              AI Progress Summary
            </h2>
          </div>

          <button
            type="button"
            className="tm-icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>

        </div>

        <p className="tm-modal-subtitle">
          Generate an AI summary of your
          daily activities, completed tasks,
          ongoing projects, and future priorities.
        </p>

        {/* SUMMARY FILTERS */}

        <div className="tm-summary-controls">

          <label>
            Time Period

            <select
              value={period}
              onChange={(event) =>
                setPeriod(
                  event.target.value
                )
              }
            >
              <option value="today">
                Last 24 Hours
              </option>

              <option value="week">
                Last 7 Days
              </option>

              <option value="all">
                All Time
              </option>
            </select>
          </label>

          <label>
            Section

            <select
              value={scope}
              onChange={(event) =>
                setScope(
                  event.target.value
                )
              }
            >
              <option value="all">
                All Sections
              </option>

              {CATEGORIES.map(
                (item) => (
                  <option
                    key={item.key}
                    value={item.key}
                  >
                    {item.label}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            Language

            <select
              value={language}
              onChange={(event) =>
                setLanguage(
                  event.target.value
                )
              }
            >
              <option value="roman">
                Roman Urdu
              </option>

              <option value="en">
                English
              </option>
            </select>
          </label>

        </div>

        {/* GENERATE BUTTON */}

        <button
          type="button"
          className="tm-primary tm-generate"
          disabled={busy}
          onClick={() =>
            onGenerate({
              period,
              section: scope,
              language,
            })
          }
        >
          <Sparkles size={18} />

          {busy
            ? "Summarizing Your Updates..."
            : "Summarize My Progress"}
        </button>

        <p className="tm-ai-privacy">
          <LockKeyhole size={13} />
          Your selected work updates
          are sent to the AI provider only
          when you request a summary.
        </p>

        {/* SUMMARY RESULT */}

        {result && (
          <div
            className={
              result.error
                ? "tm-error tm-summary-output"
                : "tm-summary-output"
            }
          >
            {result.error ? (
              result.error
            ) : (
              <div className="tm-summary-text">
                {result.summary}
              </div>
            )}
          </div>
        )}

      </section>
    </div>
  );
}

/* =========================================================
   TASK CARD COMPONENT
========================================================= */

function TaskCard({
  item,
  expanded,
  noteDraft,
  setNoteDraft,
  onExpand,
  onNote,
  onEdit,
  onDelete,
  onStatus,
  saving,
}) {
  const notes = item.logs || [];

  return (
    <article className="tm-task-card">

      {/* TASK INFORMATION */}

      <div className="tm-task-main">

        <div className="tm-task-top">

          <span
            className={`tm-category tm-cat-${item.section}`}
          >
            {LABEL[item.section]}
          </span>

          <span
            className={`tm-status tm-status-${item.status}`}
          >
            {STATUS_LABEL[item.status]}
          </span>

          {item.priority === "high" && (
            <span className="tm-high-priority">
              HIGH PRIORITY
            </span>
          )}

        </div>

        <h3>
          {item.title}
        </h3>

        {item.detail && (
          <p className="tm-task-desc">
            {item.detail}
          </p>
        )}

        <div className="tm-task-meta">

          {item.dueDate && (
            <span>
              <CalendarDays size={14} />

              Target:{" "}
              {formatDate(item.dueDate)}
            </span>
          )}

          <span>
            <Clock3 size={14} />

            Updated:{" "}
            {formatDate(item.updatedAt)}
          </span>

          <span>
            <TrendingUp size={14} />

            {notes.length}{" "}
            {notes.length === 1
              ? "Progress Update"
              : "Progress Updates"}
          </span>

        </div>

      </div>

      {/* TASK ACTIONS */}

      <div className="tm-task-actions">

        <select
          className="tm-quick-status"
          aria-label={`Change ${item.title} status`}
          value={item.status}
          onChange={(event) =>
            onStatus(
              item,
              event.target.value
            )
          }
          disabled={saving}
        >
          {STATUS_ORDER.map(
            (key) => (
              <option
                key={key}
                value={key}
              >
                {STATUS_LABEL[key]}
              </option>
            )
          )}
        </select>

        {/* EDIT */}

        <button
          type="button"
          className="tm-icon-btn"
          onClick={() =>
            onEdit(item)
          }
          aria-label={`Edit ${item.title}`}
          title="Edit Task"
        >
          <Edit3 size={17} />
        </button>

        {/* DELETE */}

        <button
          type="button"
          className="tm-icon-btn tm-trash"
          onClick={() =>
            onDelete(item)
          }
          aria-label={`Delete ${item.title}`}
          title="Delete Task"
        >
          <Trash2 size={17} />
        </button>

        {/* PROGRESS */}

        <button
          type="button"
          className={`tm-expand ${
            expanded
              ? "tm-expand-open"
              : ""
          }`}
          onClick={() =>
            onExpand(item.id)
          }
        >
          Progress

          <ChevronDown
            size={16}
          />
        </button>

      </div>

      {/* PROGRESS LOG */}

      {expanded && (
        <div className="tm-progress-panel">

          <div className="tm-progress-heading">
            Progress Log

            <span>
              {notes.length} updates
            </span>
          </div>

          {notes.length > 0 ? (

            <div className="tm-timeline">

              {notes
                .slice()
                .reverse()
                .map((note) => (
                  <div
                    key={note.id}
                    className="tm-timeline-item"
                  >

                    <span className="tm-timeline-dot" />

                    <div>

                      <time>
                        {formatDateTime(
                          note.createdAt
                        )}
                      </time>

                      <p>
                        {note.note}
                      </p>

                    </div>

                  </div>
                ))}

            </div>

          ) : (

            <p className="tm-empty-notes">
              Your progress updates
              will appear here.
            </p>

          )}

          {/* ADD PROGRESS UPDATE */}

          <form
            className="tm-note-form"
            onSubmit={(event) => {
              event.preventDefault();

              onNote(item.id);
            }}
          >

            <input
              type="text"
              value={noteDraft}
              maxLength={1000}
              placeholder="What did you accomplish today?"
              aria-label="Write Progress Update"
              required
              onChange={(event) =>
                setNoteDraft(
                  event.target.value
                )
              }
            />

            <button
              type="submit"
              className="tm-primary"
              disabled={
                saving ||
                !noteDraft.trim()
              }
            >
              <Send size={16} />

              Save Update
            </button>

          </form>

        </div>
      )}

    </article>
  );
}

/* =========================================================
   MAIN TRACK ME DASHBOARD
========================================================= */

export default function TrackMe() {

  /* ==============================
      AUTHENTICATION STATES
  ============================== */

  const [
    booting,
    setBooting,
  ] = useState(true);

  const [
    authenticated,
    setAuthenticated,
  ] = useState(false);

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  /* ==============================
      TASK DATA
  ============================== */

  const [
    entries,
    setEntries,
  ] = useState([]);

  const [
    busy,
    setBusy,
  ] = useState(false);

  /* ==============================
      FILTER STATES
  ============================== */

  const [
    section,
    setSection,
  ] = useState("all");

  const [
    status,
    setStatus,
  ] = useState("all");

  const [
    search,
    setSearch,
  ] = useState("");

  /* ==============================
      TASK MODALS
  ============================== */

  const [
    editor,
    setEditor,
  ] = useState(null);

  const [
    expanded,
    setExpanded,
  ] = useState(null);

  const [
    noteDraft,
    setNoteDraft,
  ] = useState("");

  /* ==============================
      AI SUMMARY
  ============================== */

  const [
    summaryOpen,
    setSummaryOpen,
  ] = useState(false);

  const [
    summaryResult,
    setSummaryResult,
  ] = useState(null);

  const [
    notice,
    setNotice,
  ] = useState("");

  /* =========================================================
     CHECK EXISTING LOGIN SESSION
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    trackAPI()
      .then((result) => {
        if (!cancelled) {
          setAuthenticated(
            Boolean(
              result.authenticated
            )
          );

          setEntries(
            result.entries || []
          );
        }
      })
      .catch((failure) => {
        if (!cancelled) {
          setError(
            failure.message
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setBooting(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     LOGIN
  ========================================================= */

  async function signIn(
    event
  ) {
    event.preventDefault();

    setError("");
    setBusy(true);

    try {
      await trackAPI({
        action: "login",
        password,
      });

      const result =
        await trackAPI();

      setEntries(
        result.entries || []
      );

      setAuthenticated(true);

      setPassword("");

    } catch (failure) {

      setError(
        failure.message
      );

    } finally {

      setBusy(false);

    }
  }

  /* =========================================================
     LOGOUT
  ========================================================= */

  async function signOut() {
    try {
      await trackAPI({
        action: "logout",
      });

      setAuthenticated(false);
      setEntries([]);
      setEditor(null);
      setSummaryOpen(false);
      setNotice("");

    } catch (failure) {

      setNotice(
        `Unable to lock workspace: ${failure.message}`
      );

    }
  }

  /* =========================================================
     API ERROR HANDLER
  ========================================================= */

  function handleError(
    failure
  ) {
    setNotice(
      failure.message
    );

    if (
      failure.status === 401
    ) {
      setAuthenticated(false);

      setEntries([]);

      setError(
        "Session expired. Please log in again."
      );
    }
  }

  /* =========================================================
     CREATE / UPDATE TASK
  ========================================================= */

  async function saveTask(
    form
  ) {
    setBusy(true);
    setNotice("");

    try {

      const editing =
        Boolean(editor?.id);

      const response =
        await trackAPI({
          action: editing
            ? "update"
            : "create",

          ...(editing
            ? {
                id: editor.id,
              }
            : {}),

          item: form,
        });

      setEntries(
        (current) =>
          editing
            ? current.map(
                (entry) =>
                  entry.id ===
                  response.item.id
                    ? response.item
                    : entry
              )
            : [
                response.item,
                ...current,
              ]
      );

      setEditor(null);

      setNotice(
        editing
          ? "Task updated successfully."
          : "New task created successfully."
      );

    } catch (failure) {

      handleError(failure);

    } finally {

      setBusy(false);

    }
  }

  /* =========================================================
     CHANGE TASK STATUS
  ========================================================= */

  async function setTaskStatus(
    item,
    nextStatus
  ) {
    setBusy(true);
    setNotice("");

    try {

      const response =
        await trackAPI({
          action: "update",
          id: item.id,

          item: {
            ...item,
            status: nextStatus,
          },
        });

      setEntries(
        (current) =>
          current.map(
            (entry) =>
              entry.id === item.id
                ? response.item
                : entry
          )
      );

    } catch (failure) {

      handleError(failure);

    } finally {

      setBusy(false);

    }
  }

  /* =========================================================
     SAVE DAILY PROGRESS UPDATE
  ========================================================= */

  async function addNote(
    id
  ) {
    if (
      !noteDraft.trim()
    ) {
      return;
    }

    setBusy(true);
    setNotice("");

    try {

      const response =
        await trackAPI({
          action: "note",
          id,
          note: noteDraft,
        });

      setEntries(
        (current) =>
          current.map(
            (entry) =>
              entry.id === id
                ? response.item
                : entry
          )
      );

      setNoteDraft("");

      setNotice(
        "Progress update saved successfully."
      );

    } catch (failure) {

      handleError(failure);

    } finally {

      setBusy(false);

    }
  }

  /* =========================================================
     DELETE TASK
  ========================================================= */

  async function deleteTask(
    item
  ) {
    const confirmed =
      window.confirm(
        `Permanently delete "${item.title}" and all its progress notes?`
      );

    if (
      !confirmed
    ) {
      return;
    }

    setBusy(true);
    setNotice("");

    try {

      await trackAPI({
        action: "delete",
        id: item.id,
      });

      setEntries(
        (current) =>
          current.filter(
            (entry) =>
              entry.id !== item.id
          )
      );

      if (
        expanded === item.id
      ) {
        setExpanded(null);
      }

      setNotice(
        "Task deleted successfully."
      );

    } catch (failure) {

      handleError(failure);

    } finally {

      setBusy(false);

    }
  }

  /* =========================================================
     GENERATE AI SUMMARY
  ========================================================= */

  async function generateSummary(
    options
  ) {
    setBusy(true);

    setSummaryResult(null);

    try {

      const response =
        await trackAPI({
          action: "summary",
          ...options,
        });

      setSummaryResult({
        summary:
          response.summary,
      });

    } catch (failure) {

      setSummaryResult({
        error:
          failure.message,
      });

      if (
        failure.status === 401
      ) {
        handleError(failure);
      }

    } finally {

      setBusy(false);

    }
  }

  /* =========================================================
     DASHBOARD STATISTICS
  ========================================================= */

  const stats = useMemo(
    () => ({
      total:
        entries.length,

      doing:
        entries.filter(
          (entry) =>
            entry.status ===
            "in_progress"
        ).length,

      done:
        entries.filter(
          (entry) =>
            entry.status ===
            "done"
        ).length,

      planned:
        entries.filter(
          (entry) =>
            entry.status ===
            "planned"
        ).length,
    }),
    [entries]
  );

  /* =========================================================
     SEARCH + FILTER ACTIVITIES
  ========================================================= */

  const visible = useMemo(
    () =>
      entries
        .filter(
          (item) =>
            (
              section === "all" ||
              item.section ===
                section
            ) &&
            (
              status === "all" ||
              item.status ===
                status
            ) &&
            (
              !search.trim() ||
              `${item.title} ${item.detail} ${
                (item.logs || [])
                  .map(
                    (log) =>
                      log.note
                  )
                  .join(" ")
              }`
                .toLowerCase()
                .includes(
                  search
                    .toLowerCase()
                    .trim()
                )
            )
        )
        .sort(
          (a, b) =>
            b.updatedAt.localeCompare(
              a.updatedAt
            )
        ),

    [
      entries,
      section,
      status,
      search,
    ]
  );

  /* =========================================================
     SECTION TASK COUNT
  ========================================================= */

  const sectionCount = (
    key
  ) =>
    entries.filter(
      (entry) =>
        entry.section === key
    ).length;

  /* =========================================================
     CURRENT PAGE HEADING
  ========================================================= */

  const title =
    section === "all"
      ? "All Your Activities"
      : LABEL[section];

  /* =========================================================
     INITIAL LOADING SCREEN
  ========================================================= */

  if (booting) {
    return (
      <div className="tm-page tm-center">

        <div className="tm-spinner" />

        <p>
          Opening your private workspace...
        </p>

      </div>
    );
  }

  /* =========================================================
     PASSWORD PROTECTION
  ========================================================= */

  if (
    !authenticated
  ) {
    return (
      <div className="tm-page">

        <PasswordScreen
          onLogin={signIn}
          loading={busy}
          error={error}
          password={password}
          setPassword={setPassword}
        />

      </div>
    );
  }

  /* =========================================================
     MAIN DASHBOARD RENDER
  ========================================================= */

  return (
    <div className="tm-page">

      <div className="tm-dashboard container">

        {/* =================================================
            TOP NAVIGATION
        ================================================== */}

        <div className="tm-page-top">

          <Link
            to="/"
            className="tm-home-link"
          >
            <ArrowLeft size={16} />

            Portfolio
          </Link>

          <button
            type="button"
            className="tm-signout"
            onClick={signOut}
          >
            <LogOut size={17} />

            Lock Workspace
          </button>

        </div>

        {/* =================================================
            DASHBOARD HERO
        ================================================== */}

        <header className="tm-hero">

          <div>

            <span className="tm-kicker">

              <span className="tm-live-dot" />

              YOUR PERSONAL COMMAND CENTER

            </span>

            <h1>
              Track <em>Me.</em>
            </h1>

            <p>
              One place to record your work,
              track your growth, and never
              lose sight of what matters.
            </p>

          </div>

          <div className="tm-hero-buttons">

            {/* AI SUMMARY */}

            <button
              type="button"
              className="tm-secondary tm-ai-button"
              onClick={() => {
                setSummaryResult(null);
                setSummaryOpen(true);
              }}
            >
              <Sparkles size={19} />

              AI Summary
            </button>

            {/* NEW TASK */}

            <button
              type="button"
              className="tm-primary"
              onClick={() =>
                setEditor(
                  blankTask(
                    section === "all"
                      ? "office"
                      : section
                  )
                )
              }
            >
              <Plus size={20} />

              New Task
            </button>

          </div>

        </header>

        {/* =================================================
            STATS CARDS
        ================================================== */}

        <div className="tm-stats">

          {/* TOTAL */}

          <div className="tm-stat">

            <span>
              Total Activities
            </span>

            <strong>
              {stats.total}
            </strong>

            <small>
              All your tracked work
            </small>

          </div>

          {/* IN PROGRESS */}

          <div className="tm-stat">

            <span>
              In Progress
            </span>

            <strong>
              {stats.doing}
            </strong>

            <small>
              Currently working on
            </small>

          </div>

          {/* COMPLETED */}

          <div className="tm-stat">

            <span>
              Completed
            </span>

            <strong>
              {stats.done}
            </strong>

            <small>
              Goals achieved
            </small>

          </div>

          {/* TO DO */}

          <div className="tm-stat">

            <span>
              To Do
            </span>

            <strong>
              {stats.planned}
            </strong>

            <small>
              Coming up next
            </small>

          </div>

        </div>

        {/* =================================================
            DASHBOARD LAYOUT
        ================================================== */}

        <div className="tm-layout">

          {/* ===============================================
              LEFT SIDEBAR
          ================================================ */}

          <aside className="tm-sidebar">

            <span className="tm-side-heading">
              WORKSPACE
            </span>

            {/* OVERVIEW */}

            <button
              type="button"
              className={`tm-side-link ${
                section === "all"
                  ? "is-active"
                  : ""
              }`}
              onClick={() =>
                setSection("all")
              }
            >
              <Mark
                icon={TrendingUp}
              />

              <span>
                Overview
              </span>

              <b>
                {entries.length}
              </b>
            </button>

            {/* ALL CATEGORIES */}

            {GROUPS.map(
              (group) => (
                <div
                  className="tm-side-group"
                  key={group.title}
                >

                  <span className="tm-side-heading">
                    {group.title.toUpperCase()}
                  </span>

                  {group.items.map(
                    ({
                      key,
                      label,
                      icon,
                    }) => (
                      <button
                        type="button"
                        key={key}
                        className={`tm-side-link ${
                          section === key
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          setSection(key)
                        }
                      >
                        <Mark
                          icon={icon}
                        />

                        <span>
                          {label}
                        </span>

                        <b>
                          {sectionCount(
                            key
                          )}
                        </b>

                      </button>
                    )
                  )}

                </div>
              )
            )}

            {/* PRIVACY TEXT */}

            <div className="tm-side-footer">

              <ShieldCheck size={18} />

              <span>
                Private &amp; password protected
              </span>

            </div>

          </aside>

          {/* ===============================================
              MAIN CONTENT
          ================================================ */}

          <section className="tm-content">

            {/* CONTENT HEADER */}

            <div className="tm-content-header">

              <div>

                <span className="tm-kicker">
                  YOUR PROGRESS
                </span>

                <h2>
                  {title}
                </h2>

                <p>
                  {visible.length}{" "}
                  {visible.length === 1
                    ? "activity"
                    : "activities"}{" "}
                  found
                </p>

              </div>

              {/* ADD TASK */}

              <button
                type="button"
                className="tm-add-mini"
                onClick={() =>
                  setEditor(
                    blankTask(
                      section === "all"
                        ? "office"
                        : section
                    )
                  )
                }
              >
                <Plus size={16} />

                Add Task
              </button>

            </div>

            {/* ===========================================
                SEARCH + STATUS FILTER
            ============================================ */}

            <div className="tm-filters">

              <label className="tm-search">

                <Search size={17} />

                <input
                  type="search"
                  value={search}
                  placeholder="Search your work and updates..."
                  aria-label="Search Activities"
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />

              </label>

              <select
                aria-label="Filter By Task Status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value
                  )
                }
              >
                <option value="all">
                  All Statuses
                </option>

                {STATUS_ORDER.map(
                  (key) => (
                    <option
                      key={key}
                      value={key}
                    >
                      {STATUS_LABEL[key]}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* ===========================================
                NOTIFICATIONS
            ============================================ */}

            {notice && (
              <div
                className="tm-notice"
                role="status"
              >

                {notice}

                <button
                  type="button"
                  aria-label="Dismiss Notice"
                  onClick={() =>
                    setNotice("")
                  }
                >
                  <X size={15} />
                </button>

              </div>
            )}

            {/* ===========================================
                TASK LIST
            ============================================ */}

            <div className="tm-task-list">

              {visible.length > 0 ? (

                visible.map(
                  (item) => (
                    <TaskCard
                      key={item.id}
                      item={item}
                      expanded={
                        expanded === item.id
                      }
                      noteDraft={
                        expanded === item.id
                          ? noteDraft
                          : ""
                      }
                      setNoteDraft={
                        setNoteDraft
                      }
                      saving={busy}
                      onExpand={(id) => {
                        setExpanded(
                          expanded === id
                            ? null
                            : id
                        );

                        setNoteDraft("");
                      }}
                      onNote={
                        addNote
                      }
                      onEdit={(entry) =>
                        setEditor({
                          ...entry,
                        })
                      }
                      onDelete={
                        deleteTask
                      }
                      onStatus={
                        setTaskStatus
                      }
                    />
                  )
                )

              ) : (

                /* EMPTY STATE */

                <div className="tm-empty">

                  <div>
                    <CheckCircle2
                      size={33}
                    />
                  </div>

                  <h3>
                    Nothing to Show Yet.
                  </h3>

                  <p>
                    {entries.length > 0
                      ? "Try a different filter, or add an activity in this section."
                      : "Start with your first task. Add updates as you make progress."}
                  </p>

                  <button
                    type="button"
                    className="tm-primary"
                    onClick={() =>
                      setEditor(
                        blankTask(
                          section === "all"
                            ? "office"
                            : section
                        )
                      )
                    }
                  >
                    <Plus size={18} />

                    Add a Task
                  </button>

                </div>

              )}

            </div>

          </section>

        </div>

        {/* =================================================
            FOOTER
        ================================================== */}

        <footer className="tm-footer">

          <span>
            TRACK ME / PERSONAL DASHBOARD
          </span>

          <span>
            Little progress every day adds up.
          </span>

        </footer>

      </div>

      {/* ===================================================
          TASK CREATE / EDIT MODAL
      ==================================================== */}

      {editor && (
        <TaskEditor
          key={
            editor.id || "new"
          }
          initial={editor}
          onClose={() =>
            setEditor(null)
          }
          onSave={
            saveTask
          }
          saving={
            busy
          }
        />
      )}

      {/* ===================================================
          AI SUMMARY MODAL
      ==================================================== */}

      {summaryOpen && (
        <SummaryModal
          onClose={() =>
            setSummaryOpen(false)
          }
          onGenerate={
            generateSummary
          }
          busy={busy}
          result={
            summaryResult
          }
          section={
            section
          }
        />
      )}

    </div>
  );
}
