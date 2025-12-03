import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Personne } from '../../../models/personne';

@Component({
  selector: 'app-personne-form',
  imports: [FormsModule],
  templateUrl: './personne-form.html',
  styleUrl: './personne-form.css',
})
export class PersonneForm {
  @Input() personne: Personne = { nom: '', prenom: '', age: 0 };
  @Input() titre: string = 'Formulaire Personne';
  @Output() save = new EventEmitter<Personne>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.personne);
  }

  onCancel() {
    this.cancel.emit();
  }
}
