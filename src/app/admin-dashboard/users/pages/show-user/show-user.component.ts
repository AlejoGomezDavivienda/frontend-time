import { Component, OnInit, ViewChild } from '@angular/core';
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
export class ShowUserComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.loadData();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getUserById(id)
    }
    else {
      this.sweetAlert.presentError('Error');
      this.router.navigate(['/admin/users']);
    }
  }

  getUserById(id: string) {
    this.userService.getUserById(id)
      .subscribe(
        (user) => this.user = user.user,
        (error) => console.error(error)
      );
  }

  verifyUser(index: number) {

    if (this.activities[index]) {

      const users = this.activities[index].users || [];

      const search = users.findIndex(user => user.user._id === this.user.id);

      if (search !== -1)
        return true;

      // return (this.activities[index]?.users[index]?.user === this.user.id) || false;
    }

    return false;
  }

  loadData() {
    this.activityService.getActivities(true).subscribe(
      activities => this.activities = activities.activities,
      error => console.error(error)
    );
  }

  assignActivity(activity: Activity) {

    const assign: AssignActivity = {
      activity_id: activity.id || '',
      user_id: this.user.id,
      user_name: 'Auditor de prueba',
      user_state_activity: true,
      user_estimated_hours_activity: 1,
      user_worked_hours_activity: 0,
      user_log_description_activity: 'Probanding algo GTM -5',
    }

    this.activityService.assignActivity(assign).subscribe(
      (activity) => console.log(activity),
      (error) => console.error(error)
    );
  }

}
