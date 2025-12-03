import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonneService } from '../../services/personne';
import { Personne } from '../../models/personne';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personne',
  imports: [FormsModule],
  templateUrl: './personne.html',
  styleUrl: './personne.css',
})
export class PersonneComponent implements OnInit {
  personnes = signal<Personne[]>([]);
  personne: Personne = { nom: '', prenom: '', age: 0 };

  // constructor(private ps: PersonneService) { }
  ps = inject(PersonneService);
  router = inject(Router);
  ngOnInit(): void {
    this.ps.findAll().subscribe((res) => {
      this.personnes.set(res);
    });
  }

  ajouter() {
    this.ps.save(this.personne).pipe(
      switchMap(() => {
        this.personne = { nom: '', prenom: '', age: 0 };
        return this.ps.findAll();
      })
    ).subscribe((res) => {
      this.personnes.set(res);
    });
  }

  modifier(id: number) {
    this.ps.findById(id).subscribe((res) => {
      this.personne = res;
    });
  }
  
  supprimer(id: number) {
    this.ps.remove(id).pipe(
      switchMap(() => this.ps.findAll())
    ).subscribe((res) => {
      this.personnes.set(res);
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/personne', id]);
  }
}
