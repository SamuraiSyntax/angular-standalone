// src/app/components/chat/chat.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  currentUser: string = 'Utilisateur Actuel';

  private messagesSubscription: Subscription | undefined;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messagesSubscription = this.chatService.chatMessages$.subscribe(
      (message) => {
        this.messages.push(message);
        this.scrollToBottom();
      },
      (error) => console.error('Erreur lors de la réception des messages:', error)
    );
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.currentUser, this.newMessage.trim());
      this.newMessage = '';
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-messages-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
  }
}
