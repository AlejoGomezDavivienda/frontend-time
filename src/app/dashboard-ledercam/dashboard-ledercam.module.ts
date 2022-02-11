import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardLedercamRoutingModule } from './dashboard-ledercam-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardLedercamRoutingModule,

    SharedModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class DashboardLedercamModule { }
