import { Injectable } from '@angular/core';
import { Personne } from '../models/personne';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  personnes: Personne[];
  constructor() {
    this.personnes = [
      { nom: 'Wick', prenom: 'John', age: 45 },
      { nom: 'Dalton', prenom: 'Jack', age: 55 },
      { nom: 'Maggio', prenom: 'Candice', age: 27 },
      { nom: 'Linus', prenom: 'Sophie', age: 67 },
    ];
  }

  findAll() {
    return this.personnes;
  }

  delete(p: Personne) {
    this.personnes = this.personnes.filter((personne) => personne !== p);
  }

  save(p: Personne) {
    this.personnes.push(p);
  }
}
