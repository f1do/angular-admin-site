import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/service.index';
import { Doctor } from '../../models/doctor.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  from: number = 0;
  loading: boolean = false;
  totalRecords: number = 0;
  doctors: Doctor[];

  constructor(
    public doctorService: DoctorService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.loadDoctors();
    this.modalUploadService.notification.subscribe(() => this.loadDoctors());
  }

  searchDoctor(term: string) {
    if (term.length > 3) {
      this.doctorService.searchDoctor(term).subscribe((resp: Doctor[]) => {
        this.doctors = resp;
      });
    }
    else if (term.length === 0) {
      this.loadDoctors();
    }
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors(this.from)
      .subscribe((resp: any) => {
        this.doctors = resp.doctor;
        this.totalRecords = resp.total ? Number(resp.total) : 0;
        this.loading = false;
      });
  }

  showModal(id: string) {
    this.modalUploadService.showModal('doctor', id);
  }

  changeFrom(f: number) {
    if (!((this.from === 0 && f < 0) || ((this.from + f) >= this.totalRecords && f > 0))) {
      this.from += f;
      this.loadDoctors();
    }
  }

  removeDoctor(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this information!',
      icon: 'warning',
      buttons: ['Cancel', 'Accept'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.doctorService.removeDoctor(id).subscribe((resp: Doctor) => {
            this.loadDoctors();
            swal('Doctor deleted successfully', resp.name, 'success');
          });
        } else {
          swal('Don\'t worry, the record was not deleted', 'Excellent, everything is as usual', 'success');
        }
      });
  }

}
