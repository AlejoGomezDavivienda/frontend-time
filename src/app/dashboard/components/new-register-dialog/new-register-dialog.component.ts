import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeData } from '../../interfaces/TimeData';

@Component({
  selector: 'app-new-register-dialog',
  templateUrl: './new-register-dialog.component.html',
  styleUrls: ['./new-register-dialog.component.scss']
})
export class NewRegisterDialogComponent implements OnInit 
{
  public activities: string[] = ['Innovación', 'Apoyo Auditorías', 'Project Plan'];

  constructor(
    public dialogRef: MatDialogRef<NewRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeData,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
