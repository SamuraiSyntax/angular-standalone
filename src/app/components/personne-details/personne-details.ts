import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonneService } from '../../services/personne';
import { Personne } from '../../models/personne';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-personne-details',
  imports: [FormsModule],
  templateUrl: './personne-details.html',
  styleUrl: './personne-details.css',
})
export class PersonneDetailsComponent implements OnInit {
  personne = signal<Personne | undefined>(undefined);
  ps = inject(PersonneService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        if (id) {
          return this.ps.findById(id);
        } else {
          return of(undefined);
        }
      })
    ).subscribe(res => {
      this.personne.set(res);
    });
  }

  enregistrer() {
    if (this.personne()) {
      this.ps.put(this.personne()!).subscribe(() => {
        this.router.navigate(['/personne']);
      });
    }
  }

  annuler() {
    this.router.navigate(['/personne']);
  }
}