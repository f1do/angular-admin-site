import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public usuarioService: UserService,
    public router: Router
    ) { }

  canActivate(): boolean {
    if (this.usuarioService.isLogedIn()){
      console.log('Passed GUARD');
    } else{
      this.router.navigate(['/login']);
    }
    return true;
  }

}
