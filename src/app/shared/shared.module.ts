import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Pipes
import { PipesModule } from '../pipes/pipes.module';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        PagenotfoundComponent,
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ],
    exports: [
        PagenotfoundComponent,
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ]
})

export class SharedModule { }
