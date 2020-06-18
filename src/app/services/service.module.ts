import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService, SidebarService, SharedService, UserService } from './service.index';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { LoadFileService } from './load-file/load-file.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    LoadFileService
  ]
})
export class ServiceModule { }
