import { Component } from '@angular/core';
import { ThemeService } from '../../../../theme.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  // styleUrl: './header.css', // Commenté ou supprimé si non nécessaire
})
export class HeaderComponent {
  title = 'angular-standalone';
  currentRoute: string = '';
  constructor(public themeService: ThemeService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
