import { Component, OnInit } from '@angular/core';
import { LoadFileService } from '../../services/load-file/load-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imageUpload: File;
  imageTmp: string | ArrayBuffer;

  constructor(
    public loadFileService: LoadFileService,
    public modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit(): void {
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

      }
    }

    this.imageUpload = null;
  }

  closeModal() {
    this.imageTmp = null;
    this.imageUpload = null;

    this.modalUploadService.hideModal();
  }

  uploadImage() {
    this.loadFileService.uploadFile(this.imageUpload, this.modalUploadService.type, this.modalUploadService.id)
      .then(resp => {
        this.modalUploadService.notification.emit(resp);
        this.closeModal();
      })
      .catch(err => {
        console.log('Error loading file');
      });
  }

}
