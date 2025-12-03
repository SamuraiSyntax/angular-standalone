import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Personne } from '../../../models/personne';

@Component({
  selector: 'app-formulaire-simple',
  imports: [FormsModule],
  templateUrl: './formulaire-simple.html',
  styleUrl: './formulaire-simple.css',
})
export class FormulaireSimpleComponent {
  personne: Personne = {
    nom: '',
    prenom: '',
    age: 0,
  };
  personnes: Personne[] = [];

  onSubmit(formulaire: NgForm): void {
    if (formulaire.valid) {
      const formData: Personne = { ...this.personne };
      this.personnes.push(formData);
      console.log('Données du formulaire :', formData);
      this.personne = {
        nom: '',
        prenom: '',
        age: 0,
      };
      formulaire.reset();
    }
  }
}
