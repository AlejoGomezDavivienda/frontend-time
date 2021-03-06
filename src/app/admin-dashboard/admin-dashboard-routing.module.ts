import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeProjectPlanComponent } from './pages/resume-project-plan/resume-project-plan.component';

const routes: Routes = [
  {
    path: '',
    component: ResumeProjectPlanComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule )
  },
  {
    path: 'activities',
    loadChildren: () => import('./activities/activities.module').then( m => m.ActivitiesModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
