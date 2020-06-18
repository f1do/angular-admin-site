import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Pipes
import { PipesModule } from '../pipes/pipes.module';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

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
        BreadcrumbsComponent
    ],
    exports: [
        PagenotfoundComponent,
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent
    ]
})

export class SharedModule { }
