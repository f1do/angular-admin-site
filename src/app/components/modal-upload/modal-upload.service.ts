import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;

  public hide: string = 'hide-element';

  public notification = new EventEmitter<any>();

  constructor() {
  }

  hideModal() {
    this.hide = 'hide-element';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string) {
    this.hide = '';
    this.type = type;
    this.id = id;
  }
}
