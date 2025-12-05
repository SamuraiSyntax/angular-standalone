import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('AuthGuard activated for URL:', state.url);
  const user = localStorage.getItem('user');
  const router = inject(Router);

  if (user) {
    console.log('User found in localStorage, allowing access.');
    // si user est différent de null, on autorise l'accès à la route demandée
    return true;
  }

  console.log('No user found in localStorage.');
  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée,
  // rediriger vers la page de connexion (/auth).
  // Ne pas rediriger si la route actuelle est déjà /auth pour éviter une boucle.
  if (state.url !== '/auth') {
    console.log('Redirecting to /auth from:', state.url);
    return router.createUrlTree(['/auth']);
  }

  // Si l'utilisateur n'est pas authentifié et est déjà sur /auth, autoriser l'accès à /auth.
  console.log('User not authenticated but already on /auth, allowing access.');
  return true;
};
