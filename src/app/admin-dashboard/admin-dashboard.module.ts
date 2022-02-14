import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ResumeProjectPlanComponent } from './pages/resume-project-plan/resume-project-plan.component';
import { AddGeneralActivityComponent } from './components/add-general-activity/add-general-activity.component';
import { AddSpecificActivityComponent } from './components/add-specific-activity/add-specific-activity.component';


@NgModule({
  declarations: [
    ResumeProjectPlanComponent,
    AddGeneralActivityComponent,
    AddSpecificActivityComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule
  ]
})
export class AdminDashboardModule { }

