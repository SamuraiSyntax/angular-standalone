import {
  Component,
  signal,
  computed,
  ViewContainerRef,
  ViewChild,
  ViewChildren,
  QueryList,
  ComponentRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitComponent } from '../produit/produit';
import { Produit } from '../../models/produit';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-primeur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './primeur.html',
  styleUrl: './primeur.css',
})
export class PrimeurComponent implements AfterViewInit, OnDestroy {
  _products: Produit[] = [
    { nom: 'banane', prix: 3, quantite: 10 },
    { nom: 'fraise', prix: 10, quantite: 20 },
    { nom: 'poivron', prix: 5, quantite: 10 },
  ];

  constructor(private viewContainerRef: ViewContainerRef) {}

  @ViewChild('productContainer', { read: ViewContainerRef }) productContainer!: ViewContainerRef;
  @ViewChildren(ProduitComponent) productComponents!: QueryList<ProduitComponent>;

  productDataChanged = signal(0);
  private productComponentsChangesSubscription!: Subscription;
  private productComponentRefs: Map<string, ComponentRef<ProduitComponent>> = new Map();

  totalStock = computed(() => {
    this.productDataChanged(); // Dépend du signal de déclenchement
    return this.productComponents.reduce((sum, component) => {
      const produit = component.produit();
      return sum + produit.prix * produit.quantite;
    }, 0);
  });

  chosenQuantities = signal<{ [nom: string]: number }>({});
  subtotalChosenItems = computed(() => {
    return this.productComponents.reduce((sum, component) => {
      const produit = component.produit();
      const chosenQuantity = this.chosenQuantities()[produit.nom] || 0;
      return sum + produit.prix * chosenQuantity;
    }, 0);
  });

  cartItems = signal<{ [nom: string]: { prix: number; quantite: number } }>({});

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

  ngAfterViewInit(): void {
    this._products.forEach((produit) => this.createProductComponent(produit));
    this.productComponentsChangesSubscription = this.productComponents.changes.subscribe(() => {
      this.productDataChanged.update((val) => val + 1);
    });
  }

  ngOnDestroy(): void {
    if (this.productComponentsChangesSubscription) {
      this.productComponentsChangesSubscription.unsubscribe();
    }
  }

  private createProductComponent(produitData: Produit): ComponentRef<ProduitComponent> {
    const componentRef = this.productContainer.createComponent(ProduitComponent);
    componentRef.setInput('produit', produitData);
    this.productComponentRefs.set(produitData.nom, componentRef);

    componentRef.instance.produitAchete.subscribe((event) => this.onProduitAchete(event));
    componentRef.instance.quantiteChoisieChangee.subscribe((event) =>
      this.onQuantiteChoisieChange(event)
    );
    componentRef.instance.produitSupprime.subscribe((nomProduit) =>
      this.onProduitSupprime(nomProduit)
    );

    return componentRef;
  }

  ajouterProduit() {
    let newProduct: Produit;
    if (
      this.nouveauProduit.nom &&
      this.nouveauProduit.prix > 0 &&
      this.nouveauProduit.quantite > 0
    ) {
      newProduct = { ...this.nouveauProduit };
      this._products.push(newProduct);
      this.createProductComponent(newProduct);
      this.nouveauProduit = { nom: '', prix: 0, quantite: 0 };
    } else {
      newProduct = {
        nom: 'Produit random ' + (this._products.length + 1),
        prix: parseFloat((Math.random() * (Math.random() * 10)).toFixed(2)),
        quantite: Math.floor(Math.random() * 10) + 1,
      };
    }
    this._products.push(newProduct);
    this.createProductComponent(newProduct);
  }

  onProduitAchete(event: { nom: string; quantiteAchetee: number }) {
    const componentRef = this.productComponentRefs.get(event.nom);
    if (!componentRef) return;

    const produitActuel = componentRef.instance.produit();
    const quantite = event.quantiteAchetee;

    if (quantite > 0 && quantite <= produitActuel.quantite) {
      componentRef.setInput('produit', {
        ...produitActuel,
        quantite: produitActuel.quantite - quantite,
      });
      this.productDataChanged.update((val) => val + 1);

      this.chosenQuantities.update((quantities) => {
        const newQuantities = { ...quantities };
        newQuantities[event.nom] = 0;
        return newQuantities;
      });

      this.cartItems.update((currentCartItems) => {
        const newCartItems = { ...currentCartItems };
        const existingItem = newCartItems[event.nom];
        newCartItems[event.nom] = {
          prix: produitActuel.prix,
          quantite: (existingItem ? existingItem.quantite : 0) + quantite,
        };
        return newCartItems;
      });
    } else {
      alert('Veuillez entrer une quantité valide et disponible en stock.');
    }
  }

  onProduitSupprime(nomProduit: string) {
    const componentRef = this.productComponentRefs.get(nomProduit);
    if (componentRef) {
      componentRef.destroy();
      this.productComponentRefs.delete(nomProduit);
    }
    this._products = this._products.filter((p) => p.nom !== nomProduit);
    this.chosenQuantities.update((quantities) => {
      const newQuantities = { ...quantities };
      delete newQuantities[nomProduit];
      return newQuantities;
    });
    this.cartItems.update((cart) => {
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
