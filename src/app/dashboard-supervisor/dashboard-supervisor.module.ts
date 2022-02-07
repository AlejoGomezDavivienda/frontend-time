import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
// import { SupervisorTimeReportComponent } from './users/pages/supervisor-time-report/supervisor-time-report.component';
import { SupervisorDashboardRoutingModule } from './supervisor-routing.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' }
  ],
  declarations: [
    // SupervisorTimeReportComponent
  ],
  imports: [
    CommonModule,
    SupervisorDashboardRoutingModule,
    SharedModule,

    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class DashboardSupervisorModule { }
