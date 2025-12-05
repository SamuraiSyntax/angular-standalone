import { Component } from '@angular/core';
import Stagiaire from '../../classes/stagiere';
import { CommonModule } from '@angular/common';
import { GetCharPipe } from '../../pipes/get-char-pipe';
import { EvenValuePipe } from '../../pipes/even-value-pipe';
import { Router, RouterModule } from '@angular/router';
import { CompteurComponent } from '../intteraction-module/compteur/compteur';

@Component({
  selector: 'app-about',
  imports: [CommonModule, GetCharPipe, EvenValuePipe, RouterModule, CompteurComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  title = 'angular-standalone';
  isFirstButtonActive: boolean = true;
  stagiaire = new Stagiaire(100, 'Wick', 'John');
  stagiaires: Stagiaire[] = [
    new Stagiaire(1, 'Doe', 'John'),
    new Stagiaire(2, 'Doe', 'Jane'),
    new Stagiaire(3, 'Christ', 'Jesus'),
    new Stagiaire(4, 'Macron'),
  ];
  numbers = [2, 3, 8, 5, 1];
  couleur = 'white';
  bgCouleur = 'tomato';
  padding = '10px 20px';
  style = {
    color: this.couleur,
    backgroundColor: 'dodgerblue',
    padding: this.padding,
  };
  moyennes: number[] = [18, 5, 11, 15];
  currentRoute: string = '';
  lastname = 'Mitroglou';
  firstname = 'John';
  codePostal = '31000';
  ville = 'Toulouse';
  aujourdhui = new Date();

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }

  afficherBonjour(): string {
    return 'Bonjour!';
  }
  alertBonjour(): void {
    alert(this.afficherBonjour());
  }

  toggleButtons(): void {
    this.isFirstButtonActive = !this.isFirstButtonActive;
  }
  afficherTexte(event: Event) {
    console.log((event as InputEvent).data);
    console.log((event.target as HTMLInputElement).value);
  }
  goToStagiaire() {
    this.router.navigate(['/stagiaire', this.lastname, this.firstname]);
  }
  goToAdresse() {
    this.router.navigate(['/adresse'], {
      queryParams: {
        cp: this.codePostal,
        ville: this.ville,
      },
    });
  }
}
