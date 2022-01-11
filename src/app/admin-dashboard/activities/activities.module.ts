import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ShowActivityComponent } from './pages/show-activity/show-activity.component';
import { EditAuditorComponent } from './pages/edit-auditor/edit-auditor.component' 

import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShowActivityComponent,
    EditAuditorComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    FormsModule
  ]
})
export class ActivitiesModule { }
