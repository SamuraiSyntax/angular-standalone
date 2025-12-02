import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitComponent } from '../produit/produit';
import { Produit } from '../../models/produit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-primeur',
  standalone: true,
  imports: [CommonModule, ProduitComponent, FormsModule],
  templateUrl: './primeur.html',
  styleUrl: './primeur.css',
})
export class PrimeurComponent {
  produits = signal<Produit[]>([
    { nom: 'banane', prix: 3, quantite: 10 },
    { nom: 'fraise', prix: 10, quantite: 20 },
    { nom: 'poivron', prix: 5, quantite: 10 },
  ]);

  totalStock = computed(() => {
    return this.produits().reduce((sum, produit) => sum + produit.prix * produit.quantite, 0);
  });

  chosenQuantities = signal<{ [nom: string]: number }>({});
  subtotalChosenItems = computed(() => {
    return this.produits().reduce((sum, produit) => {
      const chosenQuantity = this.chosenQuantities()[produit.nom] || 0;
      return sum + produit.prix * chosenQuantity;
    }, 0);
  });

  cartItems = signal<{ [nom: string]: { prix: number, quantite: number } }>({});

  cartTotal = computed(() => {
    const items = this.cartItems();
    let total = 0;
    for (const nom in items) {
      if (items.hasOwnProperty(nom)) {
        total += items[nom].prix * items[nom].quantite;
      }
    }
    return total;
  });

  nouveauProduit = {
    nom: '',
    prix: 0,
    quantite: 0,
  };

  ajouterProduit() {
    if (
      this.nouveauProduit.nom &&
      this.nouveauProduit.prix > 0 &&
      this.nouveauProduit.quantite > 0
    ) {
      this.produits.update((currentProduits) => [...currentProduits, { ...this.nouveauProduit }]);
      this.nouveauProduit = { nom: '', prix: 0, quantite: 0 };
    } else {
      this.produits.update((currentProduits) => [
        ...currentProduits,
        {
          nom: 'Produit random ' + (currentProduits.length + 1),
          prix: parseFloat((Math.random() * (Math.random() * 10)).toFixed(2)),
          quantite: parseFloat(((Math.random() + 1) * (Math.random() * 10)).toFixed(0)),
        },
      ]);
    }
  }

  onProduitAchete(event: { nom: string; quantiteAchetee: number }) {
    this.produits.update((currentProduits) =>
      currentProduits.map((p) =>
        p.nom === event.nom ? { ...p, quantite: p.quantite - event.quantiteAchetee } : p
      )
    );
    this.chosenQuantities.update((quantities) => {
      const newQuantities = { ...quantities };
      newQuantities[event.nom] = 0;
      return newQuantities;
    });

    const produitOriginal = this.produits().find(p => p.nom === event.nom);
    if (produitOriginal) {
      this.cartItems.update(currentCartItems => {
        const newCartItems = { ...currentCartItems };
        const existingItem = newCartItems[event.nom];
        newCartItems[event.nom] = {
          prix: produitOriginal.prix,
          quantite: (existingItem ? existingItem.quantite : 0) + event.quantiteAchetee
        };
        return newCartItems;
      });
    }
  }

  onProduitSupprime(nomProduit: string) {
    // Supprimer le produit de la liste principale
    this.produits.update(currentProduits => currentProduits.filter(p => p.nom !== nomProduit));

    // Supprimer le produit des quantités choisies
    this.chosenQuantities.update(quantities => {
      const newQuantities = { ...quantities };
      delete newQuantities[nomProduit];
      return newQuantities;
    });

    // Supprimer le produit du panier
    this.cartItems.update(cart => {
      const newCart = { ...cart };
      delete newCart[nomProduit];
      return newCart;
    });
  }

  onQuantiteChoisieChange(event: { nom: string; quantite: number }) {
    this.chosenQuantities.update((quantities) => ({
      ...quantities,
      [event.nom]: event.quantite,
    }));
  }
}
