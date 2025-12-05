import { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';
import { Token } from '../models/token';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { switchMap } from 'rxjs/operators';
import { catchError, throwError } from 'rxjs';

const AUTH_URL = `${environment.BACKEND_URL}/authenticate`;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  //  Pas de jeton pour la requête d'authentification
  if (req.url == AUTH_URL) {
    return next(req);
  }

  const tokensString: string = localStorage.getItem('tokens') ?? '';
  // Pas de jeton dans localstorage => envoie la requête dans l'état
  if (!tokensString) {
    return next(req);
  }
  let tokens: Token = JSON.parse(tokensString);
  // Jeton non expiré
  if (!authService.isExpired(tokens.accessToken)) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${tokens.accessToken}` },
    });
    return next(cloned);
  }

  // Jeotn expiré
  return authService
    .getTokensUsingRefreshToken({
      grantType: 'REFRESH_TOKEN',
      refreshToken: tokens.refreshToken,
    })
    .pipe(
      switchMap((res) => {
        localStorage.setItem('tokens', JSON.stringify(res));

        const cloned = req.clone({
          setHeaders: { Authorization: `Bearer ${res.accessToken}` },
        });
        return next(cloned);
      }),
      catchError((err) => {
        localStorage.removeItem('tokens');
        localStorage.removeItem('user');
        console.log(err);
        return throwError(() => err);
      })
    );
};
