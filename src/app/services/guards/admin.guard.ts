import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public userService: UserService
  ) { }

  canActivate(): boolean {

    if (this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Locked by the Admin Guard');
      this.userService.logOut();
    }

    return true;
  }

}
