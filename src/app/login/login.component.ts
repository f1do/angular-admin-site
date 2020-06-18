import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import {CLIENT_ID} from '../config/config';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  rememberme: boolean = false;

  constructor( public router: Router, public userService: UserService ) { }

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    this.rememberme = this.email.length > 0;

    this.googleInit();
  }

/**********************************************************************************
 * Calls startAuth after Sign in V2 finishes setting up.
 ***********************************************************************************/
  googleInit(){
    gapi.load('auth2', () => {
      gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 50,
        height: 50,
        longtitle: false,
        theme: 'dark',
        cookiepolicy: 'single_host_origin',
        onsuccess: (googleUsr: any) => {
          gapi.auth2.init();
          const token = googleUsr.getAuthResponse().id_token;
          this.userService.googleLogin(token)
          // .subscribe(() => this.router.navigate(['/dashboard']));
          .subscribe(() => window.location.href = '#/dashboard');
        },
        onfailure: (err) => { console.log(err); }
      });
    });
  }

  onSubmit(form: NgForm){
    if (form.valid){
      const user = new User(null, form.value.email, form.value.password);
      this.userService.login(user, form.value.rememberme)
      // .subscribe(() => this.router.navigate(['/dashboard']));
      .subscribe(() => window.location.href = '#/dashboard');
    }
  }

}
