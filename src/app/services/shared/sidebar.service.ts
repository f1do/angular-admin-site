import { Injectable } from '@angular/core';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];

  constructor(
    public userService: UserService
  ) {
    this.menu = this.userService.menu;
  }
}
