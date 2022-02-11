import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowActivityComponent } from 'src/app/admin-dashboard/activities/pages/show-activity/show-activity.component';
import { ResumeProjectPlanComponent } from 'src/app/admin-dashboard/pages/resume-project-plan/resume-project-plan.component';

const routes: Routes = [

    // leader-cam/project-plan/
    {
      path: '',
      component: ResumeProjectPlanComponent
    },

    // leader-cam/project-plan/activities/id
    {
      path: 'activities/:id',
      component: ShowActivityComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPlanRoutingModule { }
