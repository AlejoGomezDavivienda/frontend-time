import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserTimeReportComponent } from './pages/user-time-report/user-time-report.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NewRegisterDialogComponent } from './components/new-register-dialog/new-register-dialog.component';


@NgModule({
  declarations: [
    UserTimeReportComponent,
    NewRegisterDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
