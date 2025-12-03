import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private subject = new Subject<string>();

  sendMessage(msg: string) {
    this.subject.next(msg);
  }

  getMessage() {
    return this.subject;
  }
}
