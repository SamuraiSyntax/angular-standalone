import { Component, signal, computed, WritableSignal, Signal, effect } from '@angular/core';

@Component({
  selector: 'app-computed',
  imports: [],
  templateUrl: './computed.html',
  styleUrl: './computed.css',
})
export class ComputedComponent {
  value1: WritableSignal<number> = signal(2);
  value2: WritableSignal<number> = signal(5);
  resultat: Signal<number> = signal(0);
  constructor() {
    const intervalId = setInterval(() => {
      if (this.value1() <= 50) {
        this.value1.set(this.value1() + 10);
      } else {
        clearInterval(intervalId);
      }
    }, 2000);
    this.resultat = computed(() => this.value1() + this.value2());
    effect(() => console.log('Changement de valeur :', this.value1(), this.value2()));
  }
}
