import { Component, signal } from '@angular/core';
import { ThemeService } from '../../../../theme.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { LoginLogoutService } from '../../../services/login-logout';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class HeaderComponent {
  title = 'angular-standalone';
  isConnected = signal(!!localStorage.getItem('tokens'));

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private logService: LoginLogoutService
  ) {
    this.logService.getSubject().subscribe((v) => this.isConnected.set(v));
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  login() {
    this.router.navigateByUrl('/auth');
  }
  logout() {
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    this.logService.isConnected(false);
    this.router.navigateByUrl('/');
  }
}
