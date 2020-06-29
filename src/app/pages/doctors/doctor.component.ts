import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { DoctorService, HospitalService } from '../../services/service.index';
import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[] = [];
  doc: Doctor = new Doctor();
  hospital: Hospital = new Hospital('');
  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id !== 'new') {
        this.getDoctor(id);
      } else {
        this.doc.hospital = '';
      }
    });
  }

  ngOnInit(): void {
    this.hospitalService.loadHospitals(-1).subscribe((resp: any) => {
      this.hospitals = resp.hospital;
    });

    this.modalUploadService.notification.subscribe((resp: any) => {
      this.doc.img = resp.doctor?.img;
    });
  }

  getDoctor(id: string) {
    this.doctorService.getDoctor(id).subscribe((resp: any) => {
      this.doc = resp;
      this.hospital = resp.hospital;
      this.doc.hospital = this.hospital._id;
    });
  }

  selectHospitalDetail(id: string) {
    this.hospitalService.getHospital(id).subscribe((resp: Hospital) => this.hospital = resp);
  }

  saveDoctor(f: NgForm) {
    if (f.valid) {
      this.doctorService.createDoctor(this.doc).subscribe((doctor: Doctor) => {
        this.doc._id = doctor._id;
        this.router.navigate(['/doctor', this.doc._id]);
      });
    }
  }

  changeImage() {
    this.modalUploadService.showModal('doctor', this.doc._id);
  }
}
