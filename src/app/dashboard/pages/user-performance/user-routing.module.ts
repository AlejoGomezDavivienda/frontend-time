import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowGraphsComponent } from 'src/app/admin-dashboard/users/pages/show-graphs/show-graphs.component';


const routes: Routes = [
  
  // dashboard/user/performance/:id
  {
    path: 'performance/:id',
    component: ShowGraphsComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
