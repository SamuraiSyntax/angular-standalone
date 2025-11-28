import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly DATA_BS_THEME_ATTRIBUTE = 'data-bs-theme';
  private readonly THEME_STORAGE_KEY = 'user-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }
  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    if (savedTheme) {
      this.setTheme(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark);
    }
  }
  private setTheme(isDark: boolean): void {
    const theme = isDark ? 'dark' : 'light';
    this.renderer.setAttribute(document.documentElement, this.DATA_BS_THEME_ATTRIBUTE, theme);
  }
  toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute(this.DATA_BS_THEME_ATTRIBUTE);
    const isDark = currentTheme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(!isDark);
    localStorage.setItem(this.THEME_STORAGE_KEY, newTheme);
  }
  isDarkTheme(): boolean {
    return document.documentElement.getAttribute(this.DATA_BS_THEME_ATTRIBUTE) === 'dark';
  }
}
