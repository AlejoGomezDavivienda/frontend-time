import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTimeReportComponent } from './pages/user-time-report/user-time-report.component';

const routes: Routes = [
  {
    path: '',
    component: UserTimeReportComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user-performance/user.module').then( m => m.UsersModule )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
