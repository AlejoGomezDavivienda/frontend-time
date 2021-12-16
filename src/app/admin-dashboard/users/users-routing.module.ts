import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ShowUserComponent } from './pages/show-user/show-user.component';

const routes: Routes = [
  // admin/users
  {
    path: '',
    component: ListUsersComponent
  },
  // admin/users/:id
  {
    path: ':id',
    component: ShowUserComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
