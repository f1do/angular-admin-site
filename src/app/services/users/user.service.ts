import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SweetAlert } from 'sweetalert/typings/core';
import { LoadFileService } from '../load-file/load-file.service';
const swal: SweetAlert = require('sweetalert');

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = null;
  token: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    public uploadFileService: LoadFileService
    ) {
    this.loadStorage();
   }

   logOut() {
     this.user = null;
     this.token = '';

     localStorage.removeItem('user');
     localStorage.removeItem('token');

     const auth2 = gapi.auth2?.getAuthInstance();

     if (auth2){
        auth2.signOut().then(() => {
          console.log('User signed out.');
          window.location.href = '/login';
        });
      } else {
        window.location.href = '/login';
      }
   }

  login(user: User, remember: boolean){

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, user)
    .pipe(map((res: any) => {
      this.storeUser(res);
      return true;
    }));
  }

  storeUser(resp: any) {
    localStorage.setItem('id', resp.user._id);
    localStorage.setItem('user', JSON.stringify(resp.user));

    this.user = resp.user;
    if (resp.token && resp.token.length > 5) {
      localStorage.setItem('token', resp.token);
      this.token = resp.token;
    }
  }

  googleLogin(token: string){

    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {}, {headers: {token}})
    .pipe(map((res: any) => {
      this.storeUser(res);
      return true;
    }));
  }

  createUser(user: User) {
    const url = URL_SERVICIOS + '/user';
    return this.http.post(url, user)
    .pipe(map((res: any) => {
      swal('User created successfully!', user.email, 'success');
      return res.user;
    }));
  }

  isLogedIn() {
    return this.token.length > 5;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
    }
  }

  updateUser(user: User) {
    const url = URL_SERVICIOS + '/user/' + user._id;

    return this.http.put(url, user,  {headers: {token: this.token}})
    .pipe(map((res: any) => {
      this.storeUser(res);
      swal('User updated successfully!', user.name, 'success');
      return res.user;
    }));
  }

  changeImage(file: File, id: string) {
    this.uploadFileService.uploadFile(file, 'user', id)
    .then((resp: any) => {
      this.user.img = resp.user.img;
      swal('Image uploaded successfully!', resp.user.name, 'success');
      this.storeUser({user: this.user});
    })
    .catch(err => {
      console.log(err);
    });
  }
}