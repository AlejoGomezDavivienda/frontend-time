import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/admin-dashboard/interfaces/Activity';
import { ActivityService } from 'src/app/admin-dashboard/services/activity.service';
import { User } from 'src/app/core/interfaces/User';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { AssignActivity } from '../../interfaces/AssignActivity';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit 
{
  public user: User = {
    id: '',
    created_at: new Date(),
    email: '',
    name: '',
    rol: '',
    updated_at: new Date()
  };

  public activities: Activity[] = [];

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) 
  { }

  ngOnInit(): void 
  {
    this.loadData();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
    {
      this.getUserById( id )
    }
    else
    {
      this.sweetAlert.presentError('Error iniciando el licor seleccionado (NO ID)');
      this.router.navigate(['/admin/users']);
    }
  }

  getUserById(id: string)
  {
    this.userService.getUserById(id).subscribe(
      user => {
        this.user = user.user;
        console.log(user);
      },
      error => {
        console.log(error);
      }
    );
  }

  loadData()
  {
    this.activityService.getActivities(true).subscribe(
      activities => {
        this.activities = activities.activities;
        console.log(activities);
      },
      error => {
        console.log(error);
      }
    );
  }

  assignActivity(activity: Activity)
  {
    const assign: AssignActivity = {
      activity_id: activity.id || '',
      user_id: this.user.id
    }

    this.activityService.assignActivity(assign).subscribe(
      activity => {
        console.log(activity);
      },
      error => {
        console.log(error)
      }
    );
  }

}
