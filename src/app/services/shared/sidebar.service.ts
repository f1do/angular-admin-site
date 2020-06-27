import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [{
    title: 'Main',
    icon: 'mdi mdi-gauge',
    submenu: [
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'ProgressBar', url: '/progress' },
      { title: 'Graphics', url: '/graphics' },
      { title: 'Promises', url: '/promises' },
      { title: 'RXJS', url: '/rxjs' }
    ]
  },
  {
    title: 'Maintenance',
    icon: 'mdi mdi-folder-lock-open',
    submenu: [
      { title: 'Users', url: '/user' },
      { title: 'Hospitals', url: '/hospital' },
      { title: 'Doctors', url: '/doctor' }
    ]
  }];

  constructor() { }
}
