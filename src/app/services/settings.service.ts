import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Settings {
  showImages: boolean;
  selectedCategories: string[];
  facebookAccessToken?: string; // ✅ Added this property
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<Settings>({
    showImages: true,
    selectedCategories: [],
  });

  settings$ = this.settingsSubject.asObservable();

  updateShowImages(show: boolean): void {
    const currentSettings = this.settingsSubject.value;
    this.settingsSubject.next({ ...currentSettings, showImages: show });
  }

  updateSelectedCategories(categories: string[]): void {
    const currentSettings = this.settingsSubject.value;
    this.settingsSubject.next({ ...currentSettings, selectedCategories: categories });
  }

  updateFacebookAccessToken(accessToken: string): void { // ✅ Added this method
    const currentSettings = this.settingsSubject.value;
    this.settingsSubject.next({ ...currentSettings, facebookAccessToken: accessToken });
  }

  getFacebookAccessToken(): string | undefined { // New method to retrieve access token
    return this.settingsSubject.value.facebookAccessToken;
  }
}