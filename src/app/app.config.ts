import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { counterReducer } from './stores/counter/counter.reducer';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor])),
    provideStore(),
    provideState({
      name: 'counter',
      reducer: counterReducer,
    }),
  ],
};
