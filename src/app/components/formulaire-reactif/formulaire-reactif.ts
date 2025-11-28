import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulaire-reactif',
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire-reactif.html',
  styleUrl: './formulaire-reactif.css',
})
export class FormulaireReactifComponent {
  nom = new FormControl()
  afficher() {
    console.log(this.nom);
    console.log(this.nom.value);
  }
}
