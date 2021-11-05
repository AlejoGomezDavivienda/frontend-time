import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserTimeReportComponent } from './pages/user-time-report/user-time-report.component';


@NgModule({
  declarations: [
    UserTimeReportComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
