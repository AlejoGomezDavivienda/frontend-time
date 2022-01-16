import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ShowUserComponent } from './pages/show-user/show-user.component';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { DoughnutGraphComponent } from './components/doughnut-graph/doughnut-graph.component';
import { PieGraphComponent } from './components/pie-graph/pie-graph.component';
import { GanttGraphComponent } from './components/gantt-graph/gantt-graph.component';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [
    ListUsersComponent,
    CreateUserComponent,
    ShowUserComponent,
    BarGraphComponent,
    DoughnutGraphComponent,
    PieGraphComponent,
    GanttGraphComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatTooltipModule
  ]
})
export class UsersModule { }
