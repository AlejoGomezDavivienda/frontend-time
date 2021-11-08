import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeData } from '../../interfaces/TimeData';
import { UserTimeReportService } from '../../services/user-time-report.service';

@Component({
  selector: 'app-new-register-dialog',
  templateUrl: './new-register-dialog.component.html',
  styleUrls: ['./new-register-dialog.component.scss']
})
export class NewRegisterDialogComponent implements OnInit 
{
  public activities: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeData,
    private userTimeReportService: UserTimeReportService
  ) { }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData()
  {
    this.userTimeReportService.getAllActivitiesFromUser().subscribe(
      activities => {
        this.activities = activities;
      },
      error => console.log(error)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
