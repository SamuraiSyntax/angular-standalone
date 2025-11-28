import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Calculette } from '../../models/calculette';
import { CommonModule } from '@angular/common';

interface CalculResult {
  displayString: string;
  isError: boolean;
  isInfo?: boolean;
  isErrorMsg?: string;
  isInfoMsg?: string;
}

@Component({
  selector: 'app-calculette',
  imports: [FormsModule, CommonModule],
  templateUrl: './calculette.html',
  styleUrl: './calculette.css',
})
export class CalculetteComponent {
  calculette: Calculette = { nombre1: 0, nombre2: 0 };
  resultat: number | string | undefined;
  resultats: CalculResult[] = [];
  operations: string[][] = [
    ['plus', '+'],
    ['moins', '-'],
    ['fois', '*'],
    ['div', '/'],
  ];

  onSubmit(formulaire: NgForm, operation: string): void {
    if (formulaire.valid) {
      this.calculer(operation);
      const opSymbol = this.operations.find((op) => op[0] === operation)![1];
      const displayString = `${this.calculette.nombre1} ${opSymbol} ${this.calculette.nombre2} = ${this.resultat}`;
      let isError = false;
      let isInfo = false;
      let isErrorMsg: string | undefined;
      let isInfoMsg: string | undefined;

      if (typeof this.resultat === 'string') {
        isError = true;
        isErrorMsg = "Division par zéro impossible";
      } else if (operation === 'div' && this.calculette.nombre1 === 0 && this.calculette.nombre2 !== 0 && this.resultat === 0) {
        isInfo = true;
        isInfoMsg = "0 divisé par n'importe quel nombre non nul est 0";
      }

      this.resultats.push({
        displayString: displayString,
        isError: isError,
        isInfo: isInfo,
        isErrorMsg: isErrorMsg,
        isInfoMsg: isInfoMsg,
      });
    }
  }

  calculer(operation: string): void {
    const n1 = this.calculette.nombre1 || 0;
    const n2 = this.calculette.nombre2 || 0;

    switch (operation) {
      case 'plus':
        this.resultat = n1 + n2;
        break;
      case 'moins':
        this.resultat = n1 - n2;
        break;
      case 'fois':
        this.resultat = n1 * n2;
        break;
      case 'div':
        if (n2 !== 0) {
          this.resultat = n1 / n2;
        } else {
          this.resultat = 'Erreur';
        }
        break;
      default:
        this.resultat = 'Opération non reconnue';
    }
  }

  isInvalid(control: any): boolean {
    return (
      (control.invalid && control.touched && control.pristine && control.value === '') ||
      (control.invalid && control.touched && control.dirty)
    );
  }

  isValid(control: any): boolean {
    return control.valid && control.dirty && control.value !== '';
  }
}
