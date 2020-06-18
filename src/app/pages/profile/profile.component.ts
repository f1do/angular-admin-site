import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: User;
  imageUpload: File;
  imageTmp: string | ArrayBuffer;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  onSubmit(usr: User){

    this.user.name = usr.name;
    if (!this.user.google){
      this.user.email = usr.email;
    }

    this.userService.updateUser(this.user)
    .subscribe((u: User) => this.user = u);
  }

  selectedImage(file?: File) {
    if (file) {
      this.imageUpload = file;
      if (file.type.indexOf('image') > -1) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => this.imageTmp = reader.result;
        return;
      } else {
        swal('Only images!', 'Selected file is not an image', 'error');
      }
    }

    this.imageUpload = null;
  }

  changeImage() {
    this.userService.changeImage(this.imageUpload, this.user._id);
  }

}
