import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  totalRecords: number = 0;
  loading: boolean = true;
  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from)
    .subscribe((resp: any) => {
      this.users = resp.user;
      // this.from += resp.user.length ? Number(resp.user.length) : 0;
      this.totalRecords = resp.total ? Number(resp.total) : 0;
      this.loading = false;
    });
  }

  changeFrom(f: number) {
    console.log('from', this.from);
    console.log('f', f);
    if (!(this.from === 0 && f < 0)) {
      this.from += f;
      this.loadUsers();
    }
  }

}
