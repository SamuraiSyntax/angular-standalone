import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TchatService } from '../../services/tchat';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './participant.html',
  styleUrl: './participant.css',
})
export class ParticipantComponent implements OnInit, OnDestroy {
  @Input() name: string = '';
  @Input() id: number = 0;
  message: string = '';
  timestamp: Date = new Date();  
  receivedMessages: { sender: string; content: string; isSelf: boolean; timestamp: Date }[] = [];
  private messageSubscription: Subscription | undefined;
  private clearMessagesSubscription: Subscription | undefined;

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private tchatService: TchatService) {}

  ngOnInit() {
    this.messageSubscription = this.tchatService.getMessages().subscribe((msg) => {
      if (msg.senderId === this.id) {
        this.receivedMessages.push({ sender: 'Moi', content: msg.content, isSelf: true, timestamp: msg.timestamp });
      } else {
        this.receivedMessages.push({ sender: msg.senderName, content: msg.content, isSelf: false, timestamp: msg.timestamp });
      }
      this.scrollToBottom();
    });
    
    this.clearMessagesSubscription = this.tchatService.getClearMessagesEvent().subscribe(() => {
      this.receivedMessages = [];
    });
  }

  ngOnDestroy() {
    this.messageSubscription?.unsubscribe();
    this.clearMessagesSubscription?.unsubscribe();
  }

  sendMessage() {
    if (this.message.trim()) {
      this.tchatService.sendMessage(this.id, this.name, this.message, new Date());
      this.message = '';
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      } catch (err) { }
    }, 0);
  }
}
