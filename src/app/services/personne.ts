import { Injectable } from '@angular/core';
import { Personne } from '../models/personne';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic';

@Injectable({
  providedIn: 'root',
})
export class PersonneService extends GenericService<Personne> {
  constructor(http: HttpClient) {
    super(http, '/personnes');
  }
}
