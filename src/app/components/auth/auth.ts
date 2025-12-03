import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  host: { class: 'd-block w-100' },
})
export class AuthComponent {
  user: User = { username: '', password: '' };
  users: User[] = [
    { username: 'user', password: 'user' },
    { username: 'admin', password: 'admin' },
    { username: 'sadmin', password: 'sadmin' },
  ];
  erreur = signal<string | null>(null)
  private backendUrl: string = environment.BACKEND_URL;

  constructor(private router: Router) {}

  login() {
    if (
      this.users.some((u) => u.password == this.user.password && u.username == this.user.username)
    ) {
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigateByUrl('/personne');
    } else {
      this.erreur.set('Identifiants incorrects');
    }
  }
}
