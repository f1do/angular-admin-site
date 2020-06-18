import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class LoadFileService {

  constructor() { }

  uploadFile( file: File, type: string, id: string) {
    return new Promise(( resolve, reject ) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);
      xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log('image uploaded');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Upload fail');
            reject(xhr.response);
          }
        }
      };

      const url = URL_SERVICIOS + `/upload/${type}/${id}`;
      const token: string = localStorage.getItem('token');
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('token', token);
      xhr.send(formData);
  });
}

}
