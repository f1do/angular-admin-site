import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { PagesComponent } from './pages/pages.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./pages/pages.module').then(c => c.PagesModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

