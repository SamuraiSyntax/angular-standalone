import { Component, signal } from '@angular/core';
import { Personne } from '../../../models/personne';
import { form, Field } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulaire-signal',
  imports: [Field, FormsModule],
  templateUrl: './formulaire-signal.html',
  styleUrl: './formulaire-signal.css',
})
export class FormulaireSignalComponent {
  // objet contenant les données du formulaire
  personneModel = signal<Personne>({
    nom: '',
    prenom: '',
    age: 0,
  });
  // assurer le binding
  personneForm = form(this.personneModel);

  afficher() {
    console.log(this.personneModel());
    this.personneModel.set({
      nom: '',
      prenom: '',
      age: 0,
    });
  }
  // afficher(event: SubmitEvent) {
  //   event.preventDefault()
  //   console.log(this.personneModel());

  // }
}
// x = signal(0)
