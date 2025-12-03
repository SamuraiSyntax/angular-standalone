import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

interface Message {
  senderId: number;
  senderName: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TchatService {
  private messageSubject = new Subject<Message>();
  private clearMessagesSubject = new Subject<void>();

  constructor() {}

  sendMessage(senderId: number, senderName: string, content: string, timestamp: Date) {
    this.messageSubject.next({ senderId, senderName, content, timestamp });
  }

  getMessages(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  clearAllMessages() {
    this.clearMessagesSubject.next();
  }

  getClearMessagesEvent(): Observable<void> {
    return this.clearMessagesSubject.asObservable();
  }

  generateParticipants(): { name: string; id: number }[] {
    const names = [
      'Marie', 'Thales', 'Baptiste', 'Geoffroy', 'Nanard', 'Melanie', 'Celine', 'Armand',
      'Saynabou', 'Adrien', 'Elodie', 'Valoche'
    ];
    const numParticipants = Math.floor(Math.random() * 7) + 2;
    const participants = [];
    for (let i = 0; i < numParticipants; i++) {
      const randomIndex = Math.floor(Math.random() * names.length);
      const name = names.splice(randomIndex, 1)[0];
      participants.push({ name, id: i + 1 });
    }
    return participants;
  }
}
