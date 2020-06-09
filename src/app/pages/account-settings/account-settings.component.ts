import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settings: SettingsService) { }

  ngOnInit(): void {
    this.placeCheck();
  }

  changeColor(theme: string, link: any){
    this.applyCheck(link);
    this._settings.applyTheme(theme)
  }

  applyCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  placeCheck(){
    let selectores: any = document.getElementsByClassName('selector');
    let theme = this._settings.settings.theme;

    for (const selector of selectores) {
      if(selector.getAttribute('data-theme') === theme){
        selector.classList.add('working');
        break;
      }
    }
  }
}
