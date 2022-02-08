import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatTooltipModule
  ]
})
export class UsersModule { }