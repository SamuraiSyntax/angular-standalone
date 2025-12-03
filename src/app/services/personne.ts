import { Injectable } from '@angular/core';
import { Personne } from '../models/personne';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  private url = `http://localhost:8080/ws/personnes`;
  private personnes: Personne[] = [];

  constructor(private http: HttpClient) {}

  findAll(): Observable<Personne[]> {
    return this.http.get<Personne[]>(this.url);
  }
  
  findById(id: number): Observable<Personne> {
    return this.http.get<Personne>(`${this.url}/${id}`);
  }
  
  put(p: Personne): Observable<Personne> {
    return this.http.put<Personne>(`${this.url}/${p.id}`, p);
  }

  save(p: Personne): Observable<Personne> {
    return this.http.post<Personne>(this.url, p);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
