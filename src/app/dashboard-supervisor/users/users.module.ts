import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatTooltipModule
  ]
})
export class UsersModule { }