import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadFileService } from '../load-file/load-file.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../users/user.service';
import { Hospital } from '../../models/hospital.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public uploadFileService: LoadFileService,
    public userService: UserService
  ) { }

  loadHospitals(from: number) {
    const url = URL_SERVICIOS + '/hospital?from=' + from;

    return this.http.get(url, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getHospital(id: string) {
    const url = URL_SERVICIOS + `/hospital/${id}`;

    return this.http.get(url, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => res.hospital));
  }

  removeHospital(id: string) {
    const url = URL_SERVICIOS + `/hospital/${id}`;

    return this.http.delete(url, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => res.hospital));
  }

  createHpspital(name: string) {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.post(url, { name }, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => {
        swal('Hospital created successfully!', name, 'success');
        return res.hospital;
      }));
  }

  searchHospital(term: string) {
    const url = URL_SERVICIOS + `/search/collection/hospital/${term}`;

    return this.http.get(url, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => res.hospital));
  }

  updateHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id;

    return this.http.put(url, hospital, { headers: { token: this.userService.token } })
      .pipe(map((res: any) => {
        swal('Hospital updated successfully!', hospital.name, 'success');
        return res.hospital;
      }));
  }
}
