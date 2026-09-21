import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '../lib/firebase-admin';

const MAX_MESSAGES = 200;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const expectedKey = process.env.MESSAGES_API_KEY;
  if (!expectedKey) {
    res.status(500).json({ error: 'Server misconfigured' });
    return;
  }

  const authHeader = req.headers.authorization ?? '';
  const providedKey = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : '';

  if (providedKey !== expectedKey) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const db = getFirestore(adminApp);

  const snapshot = await db
    .collection('contactMessages')
    .orderBy('createdAt', 'desc')
    .limit(MAX_MESSAGES)
    .get();

  const messages = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data['name'] ?? '',
      email: data['email'] ?? '',
      reason: data['reason'] ?? '',
      message: data['message'] ?? '',
      createdAt: data['createdAt']?.toDate?.().toISOString() ?? null,
    };
  });

  res.status(200).json({ messages });
}
