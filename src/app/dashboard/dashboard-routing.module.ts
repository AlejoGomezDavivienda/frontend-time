import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTimeReportComponent } from './pages/user-time-report/user-time-report.component';

const routes: Routes = [
  {
    path: '',
    component: UserTimeReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
