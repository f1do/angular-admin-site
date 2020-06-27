import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    urlTheme: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(
    @Inject(DOCUMENT) private _docuemnt
  ) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    const prevSettings = localStorage.getItem('settings');
    if (prevSettings) {
      this.settings = JSON.parse(prevSettings);
    }
    this.applyTheme(this.settings.theme);
  }

  applyTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this._docuemnt.getElementById('customTheme').setAttribute('href', url);

    this.settings.theme = theme;
    this.settings.urlTheme = url;

    this.saveSettings();
  }
}

interface Settings {
  urlTheme: string;
  theme: string;
}
