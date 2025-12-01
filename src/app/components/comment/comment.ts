import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { checkNomValidator } from '../../validators/string.validators';
import { PersonneCommentaire } from '../../models/personne-commentaire';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class CommentComponent {
  commentForm: FormGroup;
  submittedData: PersonneCommentaire[] = [];

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      nom: ['', [Validators.required, checkNomValidator]],
      prenom: ['', [Validators.required, checkNomValidator]],
      commentaires: this.fb.array([]),
    });
  }

  get nom() {
    return this.commentForm.controls['nom'] as FormControl;
  }

  get prenom() {
    return this.commentForm.controls['prenom'] as FormControl;
  }

  get commentaires() {
    return this.commentForm.controls['commentaires'] as FormArray;
  }

  ajouterCommentaire() {
    this.commentaires.push(
      this.fb.group({
        titre: ['', Validators.required],
        contenu: ['', Validators.required],
        categorie: ['', Validators.required],
      })
    );
  }

  supprimerCommentaire(index: number) {
    this.commentaires.removeAt(index);
  }
  
  afficher() {
    if (this.commentForm.valid) {
      this.submittedData.push(this.commentForm.value as PersonneCommentaire);
      this.commentForm.reset();
      this.commentaires.clear();
    }
  }

  supprimerDonnee(index: number) {
    this.submittedData.splice(index, 1);
  }
}
