import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

import { GraphicsComponent } from './graphics/graphics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagenotfoundComponent } from '../shared/pagenotfound/pagenotfound.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
            {path: 'progress', component: ProgressComponent, data: { title: 'Progress' }},
            {path: 'graphics', component: GraphicsComponent, data: { title: 'Graphics' }},
            {path: 'promises', component: PromisesComponent, data: { title: 'Promises' }},
            {path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' }},
            {path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' }},
            {path: 'profile', component: ProfileComponent, data: { title: 'User profile' }},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
      },
      {path: '**', component: PagenotfoundComponent}
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
  })

export class PagesRoutingModule { }
