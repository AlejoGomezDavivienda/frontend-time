import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatSortModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatTableModule,
    MatPaginatorModule, 
    MatDialogModule, 
    MatSelectModule, 
    MatSortModule, 
    MatExpansionModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
