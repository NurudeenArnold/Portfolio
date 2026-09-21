import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '../lib/firebase-admin';

const MAX_MESSAGES = 200;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'DELETE') {
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

  if (req.method === 'DELETE') {
    const id = typeof req.query.id === 'string' ? req.query.id : '';
    if (!id) {
      res.status(400).json({ error: 'id query parameter is required' });
      return;
    }

    // Soft delete: mark it hidden instead of removing the document, so it's
    // recoverable directly in Firestore if a message is deleted by mistake.
    await db.collection('contactMessages').doc(id).update({
      deleted: true,
      deletedAt: new Date(),
    });
    res.status(200).json({ ok: true });
    return;
  }

  const snapshot = await db
    .collection('contactMessages')
    .orderBy('createdAt', 'desc')
    .limit(MAX_MESSAGES)
    .get();

  const messages = snapshot.docs
    .filter((doc) => !doc.data()['deleted'])
    .map((doc) => {
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
