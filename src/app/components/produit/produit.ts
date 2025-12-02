import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../models/produit';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit.html',
  styleUrl: './produit.css',
})
export class ProduitComponent {
  produit = input.required<Produit>();
  produitAchete = output<{ nom: string; quantiteAchetee: number }>();
  quantiteChoisieChangee = output<{ nom: string; quantite: number }>();
  produitSupprime = output<string>();

  quantiteAchetee = signal(0);

  onQuantiteAcheteeChange() {
    this.quantiteChoisieChangee.emit({ nom: this.produit().nom, quantite: this.quantiteAchetee() });
  }

  acheterProduit() {
    const produitActuel = this.produit();
    const quantite = this.quantiteAchetee();

    if (quantite > 0 && quantite <= produitActuel.quantite) {
      this.produitAchete.emit({ nom: produitActuel.nom, quantiteAchetee: quantite });
      this.quantiteAchetee.set(0);
      this.onQuantiteAcheteeChange();
    } else {
      alert('Veuillez entrer une quantité valide et disponible en stock.');
    }
  }

  supprimerProduit() {
    this.produitSupprime.emit(this.produit().nom);
    this.quantiteAchetee.set(0);
    this.onQuantiteAcheteeChange();
  }
}
