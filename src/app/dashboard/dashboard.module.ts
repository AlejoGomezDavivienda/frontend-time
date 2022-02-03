import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserTimeReportComponent } from './pages/user-time-report/user-time-report.component';
import { MaterialModule,  } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NewRegisterDialogComponent } from './components/new-register-dialog/new-register-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MAT_DATE_LOCALE } from '@angular/material/core';




@NgModule({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  ],
  declarations: [
    UserTimeReportComponent,
    NewRegisterDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // MaterialModule,
    SharedModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class DashboardModule { }
