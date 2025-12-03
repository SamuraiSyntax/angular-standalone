import { Component } from '@angular/core';
import { VilleComponent } from '../ville/ville';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pays',
  standalone: true,
  imports: [VilleComponent, CommonModule],
  templateUrl: './pays.html',
  styleUrl: './pays.css',
})
export class PaysComponent {
  villes = [
    { nom: 'Marseille', population: 885134 },
    { nom: 'Bordeaux', population: 272557 },
    { nom: 'Saint-Étienne', population: 173087 },
    { nom: 'Toulouse', population: 530327 },
    { nom: 'Nantes', population: 325070 },
    { nom: 'Paris', population: 2075886 },
  ];

  formatPopulation(population: number): string {
    return population.toLocaleString('fr-FR');
  }

  trierParPopulationAscendant() {
    this.villes.sort((a, b) => a.population - b.population);
  }
  trierParPopulationDescendant() {
    this.villes.sort((a, b) => b.population - a.population);
  }
}
