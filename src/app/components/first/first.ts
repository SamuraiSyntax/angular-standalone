import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message';

@Component({
  selector: 'app-first',
  imports: [FormsModule],
  templateUrl: './first.html',
  styleUrl: './first.css',
})
export class FirstComponent {
  msg = '';
  constructor(private ms: MessageService) {}
  envoyer() {
    this.ms.sendMessage(this.msg);
    this.msg = '';
  }
}
