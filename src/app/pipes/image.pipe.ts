import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, id: string, type: string = 'user'): any {
    const url = URL_SERVICIOS + '/img';
    id = !id ? JSON.parse(localStorage.getItem('user'))._id : id;

    if (img?.indexOf('https') > -1) {
      return img;
    }

    if (img) {
      return url + `/${type}/${id}/${img}`;
    }

    return url + `/${type}/${id}/no-defined`;
  }

}
