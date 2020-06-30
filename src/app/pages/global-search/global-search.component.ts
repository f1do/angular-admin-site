import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UserService } from 'src/app/services/service.index';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styles: [
  ]
})
export class GlobalSearchComponent implements OnInit {

  term: string = '';
  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      this.term = p.term;
      this.searchData();
    });
  }

  searchData() {
    const url = `${URL_SERVICIOS}/search/all/${this.term}`;

    this.http.get(url, { headers: { token: this.userService.token } })
      .subscribe((res: any) => {
        console.log(res);
        this.users = res.user;
        this.doctors = res.doctor;
        this.hospitals = res.hospital;
      });
  }

}
