import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphicsComponent } from './graphics/graphics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerifyTokenGuard } from '../services/guards/verify-token.guard';


const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [VerifyTokenGuard], data: { title: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'graphics', component: GraphicsComponent, data: { title: 'Graphics' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'User profile' } },
  { path: 'search/:term', component: GlobalSearchComponent, data: { title: 'Seeker' } },
  // Maintenance
  { path: 'user', component: UserComponent, data: { title: 'User maintenance' }, canActivate: [AdminGuard] },
  { path: 'hospital', component: HospitalsComponent, data: { title: 'Hospital maintenance' } },
  { path: 'doctor', component: DoctorsComponent, data: { title: 'Doctor maintenance' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Update Doctor' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
