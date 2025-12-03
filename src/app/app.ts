import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/shared-module/menu/menu'; 
import { HeaderComponent } from './components/shared-module/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {}
