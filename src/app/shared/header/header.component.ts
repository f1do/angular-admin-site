import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user: User;
  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  search(term: string) {
    this.router.navigate(['/search', term]);
  }

}
