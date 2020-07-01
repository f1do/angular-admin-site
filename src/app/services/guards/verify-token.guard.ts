import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {

    const token = this.userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (this.expired(payload.exp)) {
      this.router.navigate(['/login']);
      return false;
    }


    return this.verifyRenewal(payload.exp);
  }

  verifyRenewal(date: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dateToken = new Date(date * 1000);
      const now = new Date();
      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (dateToken.getTime() > now.getTime()) {
        resolve(true);
      } else {
        return this.userService.tokenRenewal().subscribe(() => {
          resolve(true);
        }, () => {
          reject(false);
          this.router.navigate(['/login']);
        });
      }

      resolve(true);
    });
  }

  expired(date: number) {
    const now = new Date().getTime() / 1000;
    if (date < now) {
      return true;
    } else {
      return false;
    }
  }

}
