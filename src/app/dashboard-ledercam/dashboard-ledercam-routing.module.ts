import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTimeReportComponent } from '../dashboard/pages/user-time-report/user-time-report.component';

const routes: Routes = [

  // leader-cam/
  {
    path: '',
    component: UserTimeReportComponent
  },

  // leader-cam/project-plan
  {
    path: 'project-plan',
    loadChildren: () => import('./project-plan/project-plan.module').then( m => m.ProjectPlanModule )
  },

  // leader-cam/users
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule )
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLedercamRoutingModule { }
