import { NgModule } from '@angular/core';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
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
