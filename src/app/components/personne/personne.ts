import { Component, inject, OnInit } from '@angular/core';
import { PersonneService } from '../../services/personne';
import { Personne } from '../../models/personne';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personne',
  imports: [FormsModule],
  templateUrl: './personne.html',
  styleUrl: './personne.css',
})
export class PersonneComponent implements OnInit {
  personnes: Personne[] = [];
  personne: Personne = { nom: '', prenom: '', age: 0 };

  // constructor(private ps: PersonneService) { }
  ps = inject(PersonneService);
  ngOnInit(): void {
    this.personnes = this.ps.findAll();
  }

  ajouter() {
    this.ps.save(this.personne);
    this.personne = { nom: '', prenom: '', age: 0 };
  }

  supprimer(personneASupprimer: Personne) {
    this.ps.delete(personneASupprimer);
    this.personnes = this.ps.findAll();
  }
}
