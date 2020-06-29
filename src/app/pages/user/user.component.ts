import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

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
    public userService: UserService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.modalUploadService.notification.subscribe(resp => {
      this.loadUsers();
    });
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
    if (!((this.from === 0 && f < 0) || ((this.from + f) > this.totalRecords && f > 0))) {
      this.from += f;
      this.loadUsers();
    }
  }

  searchUser(term: string) {
    if (term.length > 3) {
      this.userService.searchUser(term).subscribe((users: User[]) => {
        this.users = users;
      });
    }
    else if (term.length === 0) {
      this.loadUsers();
    }
  }

  removeUser(usr: User) {
    if (usr._id === this.userService.user._id) {
      swal('You cannot delete this user', 'You are not able to delete yourself', 'error');
    }
    else {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this information!',
        icon: 'warning',
        buttons: ['Cancel', 'Accept'],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            this.userService.removeUser(usr._id).subscribe((user: User) => {
              this.loadUsers();
              swal('User deleted successfully', user.name, 'success');
            });
          } else {
            swal('Don\'t worry, the record was not deleted', 'Excellent, everything is as usual', 'success');
          }
        });
    }
  }

  updateUser(usr: User) {
    this.userService.updateUser(usr).subscribe();
  }

  showModal(id: string) {
    this.modalUploadService.showModal('user', id);
  }

}
