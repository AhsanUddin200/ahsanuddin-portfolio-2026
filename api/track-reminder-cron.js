/**
 * Track Me V31: daily inactive-family reminder. No journal data is sent in push.
 * Called by Vercel Cron with Authorization: Bearer <CRON_SECRET>.
 */
import { createHash, timingSafeEqual } from 'node:crypto';
import webpush from 'web-push';

const MEMBERS = ['nasir', 'talat', 'happa', 'yamna'];
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const prefix = 'ahsan:track:family-reminders:v1:';
const redisURL = () => process.env.UPSTASH_REDIS_KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
const redisToken = () => process.env.UPSTASH_REDIS_KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';

function safeEqual(a, b) {
  const x = createHash('sha256').update(String(a)).digest();
  const y = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(x, y);
}

async function redis(...cmd) {
  const r = await fetch(redisURL().replace(/\/$/, ''), {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + redisToken(), 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
    signal: AbortSignal.timeout(12000),
  });
  if (!r.ok) throw Error('Reminder Redis status ' + r.status);
  const body = await r.json();
  if (body.error) throw Error('Reminder Redis operation failed');
  return body.result;
}

async function readJSON(key, fallback) {
  try {
    const value = await redis('GET', key);
    if (!value) return fallback;
    const parsed = JSON.parse(value);
    return Array.isArray(fallback) ? Array.isArray(parsed) ? parsed : fallback : parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : fallback;
  } catch (err) { throw err; }
}

async function remindOne(viewer) {
  const key = prefix + viewer;
  const state = await readJSON(key, {});
  const subs = Array.isArray(state.subscriptions) ? state.subscriptions : [];
  if (!subs.length) return { viewer, sent: 0, reason: 'no_subscriptions' };
  const seen = Date.parse(state.lastSeenAt || '');
  const reminded = Date.parse(state.lastReminderAt || '');
  const now = Date.now();
  // After seven days without opening the app, at most one reminder a week.
  if (!Number.isFinite(seen) || now - seen < SEVEN_DAYS || (Number.isFinite(reminded) && now - reminded < SEVEN_DAYS)) {
    return { viewer, sent: 0, reason: 'not_due' };
  }
  // Duplicate scheduler invocations should never send twice.
  const lockKey = key + ':send-lock';
  const locked = await redis('SET', lockKey, String(now), 'NX', 'EX', 1800);
  if (locked !== 'OK') return { viewer, sent: 0, reason: 'already_running' };
  let sent = 0;
  let invalidEndpoints = [];
  try {
    const notifications = await Promise.all(subs.slice(0, 5).map(async subscription => {
      try {
        await webpush.sendNotification(subscription, JSON.stringify({
          title: "Ahsan's Updates",
          body: "It's been a week! ❤️ Catch up on Ahsan's updates whenever you're free.",
          url: '/track-me',
          icon: '/track-me-icon-v29-192.png',
        }), { TTL: 43200, urgency: 'normal' });
        return { ok: true };
      } catch (err) {
        const code = Number(err.statusCode || 0);
        if (code === 404 || code === 410) invalidEndpoints.push(subscription.endpoint);
        return { ok: false, code };
      }
    }));
    sent = notifications.filter(x => x.ok).length;
    if (sent || invalidEndpoints.length) {
      const latest = await readJSON(key, {});
      const newList = (latest.subscriptions || []).filter(s => !invalidEndpoints.includes(s.endpoint));
      await redis('SET', key, JSON.stringify({ ...latest, subscriptions: newList, ...(sent ? { lastReminderAt: new Date().toISOString() } : {}) }));
    }
    return { viewer, sent, invalidRemoved: invalidEndpoints.length };
  } finally {
    // If no push was accepted, allow future scheduled retry.
    if (!sent) await redis('DEL', lockKey);
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });
  const secret = process.env.CRON_SECRET;
  if (!secret || !safeEqual(req.headers.authorization || '', 'Bearer ' + secret)) return res.status(401).json({ error: 'Unauthorized' });
  if (!redisURL() || !redisToken() || !process.env.TRACK_PUSH_PUBLIC_KEY || !process.env.TRACK_PUSH_PRIVATE_KEY) {
    return res.status(503).json({ error: 'Reminder service not configured' });
  }
  webpush.setVapidDetails('https://ahsannasir.runs-on.dev', process.env.TRACK_PUSH_PUBLIC_KEY, process.env.TRACK_PUSH_PRIVATE_KEY);
  try {
    const results = await Promise.all(MEMBERS.map(remindOne));
    return res.status(200).json({ checked: MEMBERS.length, notifiedDevices: results.reduce((n, r) => n + r.sent, 0), results });
  } catch (err) {
    console.error('Track Me reminder cron failed:', err?.message || String(err));
    return res.status(500).json({ error: 'Reminder check failed' });
  }
}
