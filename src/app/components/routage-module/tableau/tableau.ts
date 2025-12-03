import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../theme.service';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tableau.html',
  styleUrl: './tableau.css',
})
export class Tableau implements OnInit, OnDestroy {
  numbers: number[] = [2, 3, 8, 5, 1];
  indice: number = 0;
  nombre: number = 0;
  private routeSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.indice = +params['indice'];
      this.updateNombre();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  updateNombre(): void {
    if (this.indice >= 0 && this.indice < this.numbers.length) {
      this.nombre = this.numbers[this.indice];
    } else {
      this.nombre = 0;
    }
  }

  suivant(): void {
    const nextIndice = (this.indice + 1) % this.numbers.length;
    this.router.navigate(['/tableau', nextIndice]);
  }

  precedent(): void {
    const prevIndice = (this.indice - 1 + this.numbers.length) % this.numbers.length;
    this.router.navigate(['/tableau', prevIndice]);
  }
}
