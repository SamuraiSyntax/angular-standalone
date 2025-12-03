import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonneService } from '../../../services/personne';
import { Personne } from '../../../models/personne';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PersonneForm } from '../personne-form/personne-form';

@Component({
  selector: 'app-personne',
  imports: [PersonneForm],
  templateUrl: './personne.html',
  styleUrl: './personne.css',
})
export class PersonneComponent implements OnInit {
  personnes = signal<Personne[]>([]);
  erreur = signal<string | null>(null);
  personneToAdd: Personne = { nom: '', prenom: '', age: 0 };

  ps = inject(PersonneService);
  router = inject(Router);
  ngOnInit(): void {
    this.ps.findAll().subscribe({
      next: (res) => {
        this.personnes.set(res);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des personnes', err);
        this.erreur.set('Erreur lors du chargement des personnes');
      },
    });
  }

  onSaveNewPersonne(personne: Personne) {
    this.ps
      .save(personne)
      .pipe(
        switchMap(() => {
          this.personneToAdd = { nom: '', prenom: '', age: 0 };
          return this.ps.findAll();
        })
      )
      .subscribe({
        next: (res) => {
          this.personnes.set(res);
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la personne", err);
          this.erreur.set("Erreur lors de l'ajout de la personne");
        },
      });
  }

  supprimer(id: number) {
    this.ps
      .remove(id)
      .pipe(switchMap(() => this.ps.findAll()))
      .subscribe({
        next: (res) => {
          this.personnes.set(res);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la personne', err);
          this.erreur.set('Erreur lors de la suppression de la personne');
        },
      });
  }

  goToDetails(id: number) {
    this.router.navigate(['/personne', id]);
  }
}
