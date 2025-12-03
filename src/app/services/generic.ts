import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';

export abstract class GenericService<T> {
  private headers: HttpHeaders;
  constructor(protected http: HttpClient, protected path: string) {
    const user: User = JSON.parse(localStorage.getItem('user') ?? '');
    const authorization = btoa(user.username + ':' + user.password);
    this.headers = new HttpHeaders().set('Authorization', 'Basic ' + authorization);
  }
  findAll(): Observable<T[]> {
    return this.http.get<T[]>(environment.BACKEND_URL + this.path, {
      headers: this.headers,
    });
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${environment.BACKEND_URL}${this.path}/${id}`, {
      headers: this.headers,
    });
  }

  save(obj: T): Observable<T> {
    return this.http.post<T>(environment.BACKEND_URL + this.path, obj, {
      headers: this.headers,
    });
  }

  update(id: number, obj: T): Observable<T> {
    return this.http.put<T>(`${environment.BACKEND_URL}${this.path}/${id}`, obj, {
      headers: this.headers,
    });
  }

  remove(id: number) {
    return this.http.delete<void>(`${environment.BACKEND_URL}${this.path}/${id}`, {
      headers: this.headers,
    });
  }
}
