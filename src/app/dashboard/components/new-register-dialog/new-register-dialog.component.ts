import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from 'src/app/admin-dashboard/interfaces/Activity';
import { TimeData } from '../../interfaces/TimeData';
import { UserTimeReportService } from '../../services/user-time-report.service';

@Component({
  selector: 'app-new-register-dialog',
  templateUrl: './new-register-dialog.component.html',
  styleUrls: ['./new-register-dialog.component.scss']
})
export class NewRegisterDialogComponent implements OnInit {
  public activities: Activity[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeData,
    private userTimeReportService: UserTimeReportService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userTimeReportService.getAllActivitiesFromUser().subscribe(
      (activities) => this.activities = activities.activities,
      (error) => console.log(error)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
