import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Personne } from '../../../models/personne';
import { checkNomValidator } from '../../../validators/string.validators';

@Component({
  selector: 'app-formulaire-builder',
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire-builder.html',
  styleUrl: './formulaire-builder.css',
})
export class FormulaireBuilderComponent {
  personnes: Personne[] = []
  personneForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.personneForm = this.fb.group({
      nom: ['', [Validators.required, checkNomValidator]],
      prenom: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-z ]{2,29}$/)]],
      age: [0, Validators.required],
      adresse: this.fb.group({
        ville: ['', Validators.required],
        codePostal: ['', Validators.required],
      }),
      sports: this.fb.array([])
    })
  }

  get nom() {
    return this.personneForm.controls['nom']
  }
  get prenom() {
    return this.personneForm.controls['prenom']
  }
  get age() {
    return this.personneForm.controls['age']
  }
  get sports() {
    return this.personneForm.controls['sports'] as FormArray
  }

  afficher() {
    console.log(this.personneForm);
    console.log(this.personneForm.get('nom'));
    console.log(this.personneForm.controls['nom']);
    console.log(this.personneForm.value);
    this.personnes.push(this.personneForm.value as Personne)
    this.personneForm.reset()
    this.sports.clear()
  }
  ajouterSport() {
    this.sports.push(this.fb.control(''))
    // this.sports.push([''])
  }
  supprimerSport(index: number) {
    this.sports.removeAt(index)
  }
}
