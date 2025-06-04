// src/app/services/browser.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  getLocalStorageItem(key: string): string | null {
    return this.isBrowser() ? localStorage.getItem(key) : null;
  }

  setLocalStorageItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  removeLocalStorageItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }
}
