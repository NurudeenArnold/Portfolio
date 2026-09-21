import { getFirestore } from 'firebase-admin/firestore';
import type { VercelRequest } from '@vercel/node';
import { adminApp } from './firebase-admin';

const WINDOW_MS = 60_000;

export function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const ip = first?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  return ip.replace(/[^a-zA-Z0-9]/g, '_');
}

// Fixed-window counter stored in Firestore. Not perfectly atomic under heavy
// concurrent load, but that's fine here: the goal is stopping a scripted
// flood, not precise accounting.
export async function isRateLimited(key: string, maxRequests: number): Promise<boolean> {
  const db = getFirestore(adminApp);
  const docRef = db.collection('rateLimits').doc(key);
  const now = Date.now();

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    const data = snap.data() as { windowStart: number; count: number } | undefined;

    if (!data || now - data.windowStart > WINDOW_MS) {
      tx.set(docRef, { windowStart: now, count: 1 });
      return false;
    }

    if (data.count >= maxRequests) {
      return true;
    }

    tx.update(docRef, { count: data.count + 1 });
    return false;
  });
}
