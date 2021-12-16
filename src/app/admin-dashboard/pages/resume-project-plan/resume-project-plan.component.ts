import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { AddGeneralActivityComponent } from '../../components/add-general-activity/add-general-activity.component';
import { AddSpecificActivityComponent } from '../../components/add-specific-activity/add-specific-activity.component';
import { Activity } from '../../interfaces/Activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-resume-project-plan',
  templateUrl: './resume-project-plan.component.html',
  styleUrls: ['./resume-project-plan.component.scss']
})
export class ResumeProjectPlanComponent implements OnInit 
{
  public generalActivities: Activity[] = [];
  public specificActivities: Activity[] = [];

  private data: Activity = {
    name: '',
    initial_date: new Date(),
    end_date: new Date(),
    estimated_hours: 0,
    open_state: false,
    is_general: false
  };

  constructor(
    private activityService: ActivityService,
    public dialog: MatDialog,
    private sweetAlert: SweetAlertService
  ) 
  { }

  ngOnInit(): void 
  {
    this.loadData();
  }

  loadData()
  {
    this.activityService.getActivities().subscribe(
      activities => {
        console.log(activities)
        this.generalActivities = activities.activities.filter(a => a.is_general);
        this.specificActivities = activities.activities.filter(a => !a.is_general);
      },
      error => {
        console.log(error)
      }
    );
  }

  addGeneral()
  {
    const dialogRef = this.dialog.open(AddGeneralActivityComponent, {
      width: '85%',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        const checkData = this.verifyActivityData(result);
        if(checkData)
        {
          const activity = result as Activity;
          activity.is_general = true;

          this.activityService.createActivity( activity ).subscribe(
            activity => {
              console.log(activity)
            },
            error => {
              console.log(error)
            }
          );          
        }
        else
        {
          this.sweetAlert.presentError('Información Inválida!');
        }
      }
    });
  }

  addSpecific()
  {
    const dialogRef = this.dialog.open(AddSpecificActivityComponent, {
      width: '85%',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        const checkData = this.verifyActivityData(result);
        if(checkData)
        {
          const activity = result as Activity;
          activity.is_general = false;

          this.activityService.createActivity( activity ).subscribe(
            activity => {
              console.log(activity)
            },
            error => {
              console.log(error)
            }
          );          
        }
        else
        {
          this.sweetAlert.presentError('Información Inválida!');
        }
      }
    });
  }

  verifyActivityData(activityData: Activity): boolean
  {
    if(activityData.name && activityData.initial_date && activityData.end_date && activityData.estimated_hours)
    {
      return true;
    }

    return false;
  }

}
