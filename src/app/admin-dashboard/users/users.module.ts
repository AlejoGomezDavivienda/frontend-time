import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ShowUserComponent } from './pages/show-user/show-user.component';


@NgModule({
  declarations: [
    ListUsersComponent,
    CreateUserComponent,
    ShowUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
