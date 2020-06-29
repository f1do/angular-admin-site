import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  from: number = 0;
  loading: boolean = false;
  totalRecords: number = 0;
  hospitals: Hospital[];

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.loadHospitals();
    this.modalUploadService.notification.subscribe(resp => {
      this.loadHospitals();
    });
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals(this.from)
      .subscribe((resp: any) => {
        this.hospitals = resp.hospital;
        this.totalRecords = resp.total ? Number(resp.total) : 0;
        this.loading = false;
      });
  }

  removeHospital(hospital: Hospital) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this information!',
      icon: 'warning',
      buttons: ['Cancel', 'Accept'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.hospitalService.removeHospital(hospital._id).subscribe((resp: Hospital) => {
            this.loadHospitals();
            swal('Hospital deleted successfully', resp.name, 'success');
          });
        } else {
          swal('Don\'t worry, the record was not deleted', 'Excellent, everything is as usual', 'success');
        }
      });
  }

  searchHospital(term: string) {
    if (term.length > 3) {
      this.hospitalService.searchHospital(term).subscribe((resp: Hospital[]) => {
        this.hospitals = resp;
      });
    }
    else if (term.length === 0) {
      this.loadHospitals();
    }
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital).subscribe();
  }

  showModal(id: string) {
    this.modalUploadService.showModal('hospital', id);
  }

  changeFrom(f: number) {
    if (!((this.from === 0 && f < 0) || ((this.from + f) >= this.totalRecords && f > 0))) {
      this.from += f;
      this.loadHospitals();
    }
  }

  createNewHospital() {

    swal({
      title: 'Create Hospital',
      icon: 'info',
      text: 'Please, enter a name for the new hospital.',
      content: 'input',
      buttons: [false, true],
      dangerMode: true
    })
      .then((name: any) => {

        if (!name) { throw null; }

        this.hospitalService.createHpspital(name).subscribe((resp: Hospital) => {
          this.loadHospitals();
        });
      })
      .catch(err => {
        if (err) {
          swal('Oh noes!', 'The request failed!', 'error');
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  }
}
