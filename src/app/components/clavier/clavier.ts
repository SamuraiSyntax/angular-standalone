import { Component } from '@angular/core';
import { Touche } from '../touche/touche';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clavier',
  imports: [Touche, FormsModule, CommonModule],
  templateUrl: './clavier.html',
  styleUrl: './clavier.css',
})
export class Clavier {
  // lettres = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  lettres: string[][] = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['w', 'x', 'c', 'v', 'b', 'n'],
    [' '],
  ];
  textOutput: string = '';

  onToucheClick(lettre: string) {
    if (lettre === 'Enter') {
      this.textOutput += '\n';
    } else {
      this.textOutput += lettre;
    }
  }
}
