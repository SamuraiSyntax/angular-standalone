import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { filter, interval, map, Observable, Observer, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-observable',
  imports: [],
  templateUrl: './observable.html',
  styleUrl: './observable.css',
})
export class ObservableComponent implements OnInit, OnDestroy {
  valeurs = signal<number[]>([]);
  state = signal<string>('En attente');
  subscription: Subscription = new Subscription();
  ngOnInit(): void {
    const observable$: Observable<number> = interval(1000).pipe(
      take(10),
      filter((v) => v % 2 == 0),
      map((v) => v * 2)
    );

    this.subscription = observable$.subscribe({
      next: (v) => {
        this.valeurs.update((arr) => [...arr, v]);
        this.state.set('En cours');
      },
      error: (err) => this.state.set(err),
      complete: () => this.state.set('Fin'),
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
