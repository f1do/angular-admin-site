import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraphicsComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraphicsComponent
    ],
    imports: [
        SharedModule,
        PagesRoutingModule
    ]
})

export class PagesModule { }
