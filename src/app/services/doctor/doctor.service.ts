import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../users/user.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Doctor } from '../../models/doctor.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) { }

  loadDoctors(from: number) {
    const url = URL_SERVICIOS + '/doctor?from=' + from;

    return this.http.get(url, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  searchDoctor(term: string) {
    const url = URL_SERVICIOS + `/search/collection/doctor/${term}`;

    return this.http.get(url, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => res.doctor));
  }

  removeDoctor(id: string) {
    const url = URL_SERVICIOS + `/doctor/${id}`;

    return this.http.delete(url, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => res.doctor));
  }

  createDoctor(doctor: Doctor) {
    let url = URL_SERVICIOS + '/doctor';

    if (doctor._id) {
      url += '/' + doctor._id;
      return this.http.put(url, doctor, { headers: { token: this.userService.token } })
        .pipe(map((res: any) => {
          swal('Doctor updated successfully!', doctor.name, 'success');
          return res.doctor;
        }));
    } else {
      return this.http.post(url, doctor, { headers: { token: this.userService.token } })
        .pipe(map((res: any) => {
          swal('Doctor created successfully!', doctor.name, 'success');
          return res.doctor;
        }));
    }

  }

  getDoctor(id: string) {
    const url = URL_SERVICIOS + `/doctor/${id}`;

    return this.http.get(url, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => res.doctor));
  }

  updateDoctor(doctor: Doctor) {
    const url = URL_SERVICIOS + '/doctor/' + doctor._id;

    return this.http.put(url, doctor, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => {
        swal('Doctor updated successfully!', doctor.name, 'success');
        return res.doctor;
      }));
  }
}
