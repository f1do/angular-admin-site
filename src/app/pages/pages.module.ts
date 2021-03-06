import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

// ng2 - Charts
import { ChartsModule } from 'ng2-charts';
import { DoughnutGraphComponent } from '../components/doughnut-graph/doughnut-graph.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsComponent } from './graphics/graphics.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// Temporal
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { GlobalSearchComponent } from './global-search/global-search.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        GraphicsComponent,
        IncreaserComponent,
        DoughnutGraphComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UserComponent,
        // ModalUploadComponent,
        HospitalsComponent,
        DoctorsComponent,
        DoctorComponent,
        GlobalSearchComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraphicsComponent
    ],
    imports: [
        // SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]
})

export class PagesModule { }
