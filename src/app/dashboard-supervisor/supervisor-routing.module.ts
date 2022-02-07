import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTimeReportComponent } from '../dashboard/pages/user-time-report/user-time-report.component';


const routes: Routes = [
  {
    path: '',
    component: UserTimeReportComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SupervisorDashboardRoutingModule { }