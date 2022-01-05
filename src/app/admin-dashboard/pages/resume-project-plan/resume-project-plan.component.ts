import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { AddGeneralActivityComponent } from '../../components/add-general-activity/add-general-activity.component';
import { AddSpecificActivityComponent } from '../../components/add-specific-activity/add-specific-activity.component';
import { Activity, SortUser } from '../../interfaces/Activity';
import { ActivityService } from '../../services/activity.service';
import { UserService } from '../../users/services/user.service';

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
    private userService: UserService,
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
        this.generalActivities = activities.activities.filter(a => a.is_general);
        this.specificActivities = activities.activities.filter(a => !a.is_general);
        console.log("Especifiiiicasss: ", this.specificActivities);
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
              this.generalActivities.push(activity.activity);
              this.sweetAlert.presentSuccess('Actividad Agregada Correctamente!');
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

  async getUserNameById(userId: string)
  {
    const user = await this.userService.getUserById(userId);
    console.log("user: ", user);
    return "Generic";
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
              this.specificActivities.push(activity.activity);
              this.sweetAlert.presentSuccess('Actividad Agregada Correctamente!');
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

  getUserResume(activity: Activity, user: SortUser): string
  {
    // % trabajado por el usuario
    let worked = 0;

    let resume = '';
    // Agregar el nombre del usuario primero.
    resume += user.user.name.toUpperCase();
    // calcular cuanto a trabajado el usuario en la actividad.
    const indexUser = activity.users?.findIndex(u => u.user._id == user.user._id);
    if(indexUser !== -1)
    {
      const workedHours = user.worked_hours || 0;
      // Si las horas estimadas son el 100% -> cuanto % es las horas que a trabajado el usuario.
      try {
        worked = (100 * workedHours) / activity.estimated_hours;
      } catch (error) {
        console.log("Division 0/0");
      }      
    }

    resume += ` --- Indicador: ${worked}%`;

    return resume;
  }

}
