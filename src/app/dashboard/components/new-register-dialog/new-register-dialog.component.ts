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
  public today = new Date();
  public titulo: string;
  
  public minDate = new Date();
  public currentMonth = this.minDate.getMonth();
  public currentYear = this.minDate.getFullYear();


  constructor(
    public dialogRef: MatDialogRef<NewRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeData,

    private userTimeReportService: UserTimeReportService
  ) {
    this.titulo = this.data.titleDialog || 'Agregar Registro';
    this.minDate.setFullYear(this.currentYear, this.currentMonth, 1); 
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

    this.userTimeReportService.getAllActivitiesFromUser().subscribe(

      (activities) => {

        if (this.data.edit) {

          this.activities = activities.activities.filter((a) => a.name === this.data.activity.name);
          console.log(this.activities);
        }
        else
          this.activities = activities.activities.sort((a, b) => Number(a.is_general) - Number(b.is_general));

      },
      (error) => console.log(error)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
