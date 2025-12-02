import { Component } from '@angular/core';
import { ChildComponent } from '../child/child';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class ParentComponent {
  noms = ['Linus', 'Ford', 'Dupont'];
  moyenne = 0;
  somme = 0;
  nombreNotes = 0;
  calculerMoyenne(note: number) {
    this.somme += note;
    this.nombreNotes++;
    this.moyenne = Number((this.somme / this.nombreNotes).toFixed(2));
  }
}
