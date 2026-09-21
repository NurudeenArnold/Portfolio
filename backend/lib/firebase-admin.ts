import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';

function getAdminApp(): App {
  const existing = getApps();
  if (existing.length) {
    return existing[0];
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable');
  }

  return initializeApp({ credential: cert(JSON.parse(raw)) });
}

export const adminApp = getAdminApp();
