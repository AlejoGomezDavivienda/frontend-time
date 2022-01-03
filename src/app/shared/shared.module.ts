import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { NgChartsModule } from 'ng2-charts';
import { GanttChartAngularModule } from 'gantt-chart-angular';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserLayoutComponent
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
