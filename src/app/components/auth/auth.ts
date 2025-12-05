import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth';
import { LoginLogoutService } from '../../services/login-logout';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  host: { class: 'd-flex justify-content-center align-items-center w-100' },
})
export class AuthComponent {
  erreur = signal<string | null>(null);
  user: User = { username: '', password: '', grantType: 'PASSWORD' };

  constructor(
    private router: Router,
    private authService: AuthService,
    private logService: LoginLogoutService
  ) {}

  seConnecter() {
    this.authService.findByUsernameAndPassword(this.user).subscribe({
      next: (res) => {
        console.log('Authentification réussie. Réponse:', res);
        localStorage.setItem('tokens', JSON.stringify(res));
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log('Tokens et utilisateur stockés dans localStorage.');
        this.logService.isConnected(true);
        console.log('Appel de isConnected(true).');
        this.router.navigateByUrl('/personne');
        console.log('Navigation vers /personne.');
      },
      error: (err) => {
        console.log("Erreur d'authentification:", err);
        this.erreur.set('Identifiants incorrects');
      },
    });
  }
}
