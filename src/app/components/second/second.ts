import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../services/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-second',
  imports: [],
  templateUrl: './second.html',
  styleUrl: './second.css',
})
export class SecondComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  subscription: Subscription | undefined;
  constructor(private ms: MessageService) {}
  ngOnInit() {
    this.subscription = this.ms.getMessage().subscribe((text) => {
      this.messages.push(text);
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
