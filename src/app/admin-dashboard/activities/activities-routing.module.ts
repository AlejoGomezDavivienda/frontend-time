import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowActivityComponent } from './pages/show-activity/show-activity.component';


const routes: Routes = [

  // admin/users/:id
  {
    path: ':id',
    component: ShowActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
