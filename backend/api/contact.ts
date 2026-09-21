import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { adminApp } from '../lib/firebase-admin';
import { getClientIp, isRateLimited } from '../lib/rate-limit';

const REASONS = ['job', 'collaboration', 'hi', 'other'] as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 100,
  email: 200,
  otherReason: 200,
  message: 2000,
} as const;

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function isValidOptionalString(value: unknown, maxLength: number): boolean {
  return value === undefined || value === null || (typeof value === 'string' && value.length <= maxLength);
}

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

  const ip = getClientIp(req);
  if (await isRateLimited(`contact_${ip}`, 5)) {
    res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
    return;
  }

  const { name, email, reason, otherReason, message, honeypot } = req.body ?? {};

  // Honeypot: real visitors never see or fill this field. Anything that
  // does gets a fake success response so scripted submitters don't learn
  // they were blocked and try to adapt.
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!isNonEmptyString(name, LIMITS.name)) {
    res.status(400).json({ error: `name is required and must be ${LIMITS.name} characters or fewer` });
    return;
  }

  if (!isNonEmptyString(email, LIMITS.email) || !EMAIL_PATTERN.test(email.trim())) {
    res.status(400).json({ error: 'email is required and must be a valid email address' });
    return;
  }

  if (typeof reason !== 'string' || !REASONS.includes(reason as (typeof REASONS)[number])) {
    res.status(400).json({ error: `reason must be one of: ${REASONS.join(', ')}` });
    return;
  }

  if (reason === 'other' && !isNonEmptyString(otherReason, LIMITS.otherReason)) {
    res.status(400).json({ error: `otherReason is required when reason is "other" and must be ${LIMITS.otherReason} characters or fewer` });
    return;
  }

  if (!isValidOptionalString(message, LIMITS.message)) {
    res.status(400).json({ error: `message must be ${LIMITS.message} characters or fewer` });
    return;
  }

  const resolvedReason = reason === 'other' ? (otherReason as string).trim() : reason;
  const resolvedMessage = typeof message === 'string' ? message.trim() : '';

  const db = getFirestore(adminApp);

  const docRef = await db.collection('contactMessages').add({
    name: (name as string).trim(),
    email: (email as string).trim(),
    reason: resolvedReason,
    message: resolvedMessage,
    createdAt: new Date(),
  });

  const tokensSnapshot = await db.collection('deviceTokens').get();
  const tokens = tokensSnapshot.docs.map((doc) => doc.id);

  if (tokens.length > 0) {
    await getMessaging(adminApp).sendEachForMulticast({
      tokens,
      notification: {
        title: 'New portfolio contact message',
        body: resolvedMessage
          ? `${name} (${resolvedReason}): ${resolvedMessage}`
          : `${name} (${resolvedReason}) reached out`,
      },
      data: { messageId: docRef.id },
    });
  }

  res.status(200).json({ ok: true });
}
