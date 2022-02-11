import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { NgChartsModule } from 'ng2-charts';
import { GanttChartAngularModule } from 'gantt-chart-angular';
import { SupervisorLayoutComponent } from './layouts/supervisor-layout/supervisor-layout.component';
import { LeaderCamLayoutComponent } from './layouts/leader-cam/leader-cam.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserLayoutComponent,
    SupervisorLayoutComponent,
    LeaderCamLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgChartsModule,
    GanttChartAngularModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgChartsModule,
    GanttChartAngularModule,
    AdminLayoutComponent
  ]
})
export class SharedModule { }
