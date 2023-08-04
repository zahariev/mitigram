import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModeSwitcherService {
  darkMode!: boolean;

  public isDarkMode = signal(false);

  constructor(@Inject(DOCUMENT) private document: Document) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (localStorage.getItem('dark-theme')) {
      this.darkMode = localStorage.getItem('dark-theme') === 'true';
    } else {
      this.darkMode = prefersDark.matches;
    }

    this.isDarkMode.set(this.darkMode);

    this.setBodyClass(this.darkMode);
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    this.setBodyClass(this.darkMode);

    this.isDarkMode.set(this.darkMode);
  }

  setBodyClass(isDark?: boolean): void {
    this.document.body.classList.toggle('theme-dark', isDark);
    localStorage.setItem('dark-theme', (isDark || false).toString());
  }
}
