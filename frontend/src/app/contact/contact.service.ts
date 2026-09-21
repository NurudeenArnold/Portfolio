import { Injectable } from '@angular/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../core/firebase';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  async send(payload: ContactMessage): Promise<void> {
    await addDoc(collection(firestore, 'contactMessages'), {
      ...payload,
      createdAt: serverTimestamp(),
    });
  }
}
