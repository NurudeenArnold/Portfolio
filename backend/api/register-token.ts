import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '../lib/firebase-admin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { token } = req.body ?? {};
  if (typeof token !== 'string' || !token.trim()) {
    res.status(400).json({ error: 'token is required' });
    return;
  }

  const db = getFirestore(adminApp);

  if (req.method === 'POST') {
    await db.collection('deviceTokens').doc(token).set({ registeredAt: new Date() });
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method === 'DELETE') {
    await db.collection('deviceTokens').doc(token).delete();
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
