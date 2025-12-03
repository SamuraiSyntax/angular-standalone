import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importez CommonModule

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule], // Ajoutez CommonModule ici
  templateUrl: './menu.html',
})
export class MenuComponent {
  currentRoute: string = '';
  currentQueryParams: { [key: string]: string | null } = {};
  firstname = 'Kostas';
  lastname = 'Mitroglou';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.split('?')[0]; // Récupère seulement le chemin
        const queryParamsString = event.urlAfterRedirects.split('?')[1];
        this.currentQueryParams = this.parseQueryParams(queryParamsString);
      }
    });
  }

  private parseQueryParams(queryString: string | undefined): { [key: string]: string | null } {
    const params: { [key: string]: string | null } = {};
    if (queryString) {
      queryString.split('&').forEach((param) => {
        const parts = param.split('=');
        params[decodeURIComponent(parts[0])] = parts[1] ? decodeURIComponent(parts[1]) : null;
      });
    }
    return params;
  }

  isActive(link: string | any[], queryParams: { [key: string]: string | null } = {}): boolean {
    let targetPath: string;

    if (Array.isArray(link)) {
      targetPath = link.join('/');
    } else {
      targetPath = link;
    }
    
    if (targetPath.startsWith('/tableau/') && this.currentRoute.startsWith('/tableau/')) {
      return true;
    }

    // Pour les correspondances exactes (routes non paramétrées ou routes paramétrées spécifiques)
    if (this.currentRoute === targetPath) {
      // Compare les queryParams s'ils existent
      const currentKeys = Object.keys(this.currentQueryParams);
      const targetKeys = Object.keys(queryParams);

      if (currentKeys.length !== targetKeys.length) {
        return false;
      }

      for (const key of targetKeys) {
        if (this.currentQueryParams[key] !== queryParams[key]) {
          return false;
        }
      }
      return true;
    }

    return false;
  }
}
