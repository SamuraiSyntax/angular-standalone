import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonneService } from '../../../services/personne';
import { Personne } from '../../../models/personne';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PersonneForm } from '../personne-form/personne-form';

@Component({
  selector: 'app-personne-details',
  imports: [PersonneForm],
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

  enregistrer(personneToSave: Personne) {
    if (personneToSave) {
      this.ps.update(personneToSave.id!, personneToSave).subscribe(() => {
        this.router.navigate(['/personne']);
      });
    }
  }

  annuler() {
    this.router.navigate(['/personne']);
  }
}