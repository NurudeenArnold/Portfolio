import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

initializeApp();

const db = getFirestore();

// Fires when a visitor submits the portfolio contact form (writes to the
// `contactMessages` collection from the Angular app). Pushes a notification
// to every registered device in `deviceTokens` via FCM, for the companion
// Android app to receive.
export const notifyOnContactMessage = onDocumentCreated(
  'contactMessages/{messageId}',
  async (event) => {
    const message = event.data?.data();
    if (!message) {
      return;
    }

    const tokensSnapshot = await db.collection('deviceTokens').get();
    const tokens = tokensSnapshot.docs.map((doc) => doc.id);

    if (tokens.length === 0) {
      return;
    }

    await getMessaging().sendEachForMulticast({
      tokens,
      notification: {
        title: 'New portfolio contact message',
        body: `${message['name']}: ${message['message']}`,
      },
      data: {
        messageId: event.params.messageId,
      },
    });
  },
);
