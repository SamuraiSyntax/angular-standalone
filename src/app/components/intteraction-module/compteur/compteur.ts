import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addBy, decrement, increment } from '../../../stores/counter/counter.action';
import { selectValeur } from '../../../stores/counter/counter.selector';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compteur',
  imports: [CommonModule, FormsModule],
  templateUrl: './compteur.html',
  styleUrl: './compteur.css',
})
export class CompteurComponent {
  valeur: number = 0;
  addValue: number = 0;
  // valeur$: Observable<number>;
  constructor(private store: Store) {
    store.select(selectValeur).subscribe((v) => (this.valeur = v));
    // this.valeur$ = store.select(selectValeur);
  }
  incrementer() {
    this.store.dispatch(increment());
  }
  decrementer() {
    this.store.dispatch(decrement());
  }

  addByValue() {
    this.store.dispatch(addBy({ value: this.addValue }));
    this.addValue = 0;
  }
}
