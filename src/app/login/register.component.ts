import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(public userService: UserService, public router: Router) { }

  sameValueFields(field1: string, field2: string) {
    return (grp: FormGroup) => {
      const pwd1 = grp.controls[field1].value;
      const pwd2 = grp.controls[field2].value;

      if (pwd1 === pwd2) {
        return null;
      }

      return {
        equals: true
      };
    };
  }

  ngOnInit(): void {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false)
    }, { validators: this.sameValueFields('password', 'password2') });

    // this.form.setValue({
    //   name: 'Test',
    //   email: 'test@test.com',
    //   password: '123123',
    //   password2: '123123',
    //   conditions: true
    // });
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.form.value.conditions) {
        swal('Important!', 'You must accept the terms and conditions.', 'warning');
        return;
      }

      const user = new User(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password
      );

      this.userService.createUser(user)
        .subscribe(res => this.router.navigate(['/login']));

    }
  }

}
