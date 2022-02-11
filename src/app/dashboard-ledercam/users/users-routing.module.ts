import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from 'src/app/admin-dashboard/users/pages/list-users/list-users.component';
import { ShowGraphsComponent } from 'src/app/admin-dashboard/users/pages/show-graphs/show-graphs.component';
import { ShowUserComponent } from 'src/app/admin-dashboard/users/pages/show-user/show-user.component';

const routes: Routes = [

    // leader-cam/users
    {
      path: '',
      component: ListUsersComponent
    },
    // leader-cam/users/:id
    {
      path: ':id',
      component: ShowUserComponent
    },
    // leader-cam/users/performance/:id
    {
      path: 'performance/:id',
      component: ShowGraphsComponent
    } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
