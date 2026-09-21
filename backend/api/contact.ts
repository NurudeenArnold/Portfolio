import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { adminApp } from '../lib/firebase-admin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body ?? {};

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    res.status(400).json({ error: 'name, email, and message are required strings' });
    return;
  }

  const db = getFirestore(adminApp);

  const docRef = await db.collection('contactMessages').add({
    name,
    email,
    message,
    createdAt: new Date(),
  });

  const tokensSnapshot = await db.collection('deviceTokens').get();
  const tokens = tokensSnapshot.docs.map((doc) => doc.id);

  if (tokens.length > 0) {
    await getMessaging(adminApp).sendEachForMulticast({
      tokens,
      notification: {
        title: 'New portfolio contact message',
        body: `${name}: ${message}`,
      },
      data: { messageId: docRef.id },
    });
  }

  res.status(200).json({ ok: true });
}
