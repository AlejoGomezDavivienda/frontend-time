import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/admin-dashboard/services/activity.service';
import { UserService } from 'src/app/admin-dashboard/users/services/user.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Activity, SortUser } from '../../../interfaces/Activity';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditAuditorComponent } from '../edit-auditor/edit-auditor.component';


@Component({
  selector: 'app-show-activity',
  templateUrl: './show-activity.component.html',
  styleUrls: ['./show-activity.component.scss']
})
export class ShowActivityComponent implements OnInit {

  public activity: Activity = {
    id: '',
    name: '',
    open_state: true,
    initial_date: new Date(),
    end_date: new Date(),
    estimated_hours: 1,
    worked_hours: 0,
    is_general: false,
    state: true,
    country: {code : 'CO', name: 'Colombia'}
  };

  public users: any[] = [];


  public dataSource: MatTableDataSource<SortUser>;
  public usersData: SortUser[] = [];
  public displayedColumns: string[] = ['name', 'email', 'estimated-hours', 'worked-hours', 'porcentaje-avance', 'is-active', 'actions'];

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private sweetAlert: SweetAlertService,
    private router: Router,
    private dialog: MatDialog,

  ) {

    this.dataSource = new MatTableDataSource(this.usersData);

  }

  ngOnInit(): void {

    this.getUsers();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getActivityById(id)
    }
    else {
      this.sweetAlert.presentError('Error');
      this.router.navigate(['/admin']);
    }
  }

  getActivityById(id: string) {
    this.activityService.getActivityById(id).subscribe(
      (activity: any) => {
        this.activity = activity.activity;
        this.usersData = activity.activity.users;
        this.dataSource = new MatTableDataSource(this.usersData);
        console.log(activity.total);
        console.log(this.activity);
      },
      (error) => console.error(error)
    );
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      (users: any) => this.users = users,
      (error) => console.error(error)
    );
  }

  showUser(user: any) {

    console.log(user);

    const dialogRef = this.dialog.open(EditAuditorComponent, {
      width: '75%',
      data: user
    });

    dialogRef.afterClosed().subscribe((result) => {

      // console.log(result);

      if (result) {

        const assign = {
          activity_id: this.activity.id || '',
          user_id: user.user._id,
          user_name: result.user.name,
          user_state_activity: result.is_active,
          user_estimated_hours_activity: result.estimated_hours,
          user_worked_hours_activity: result.worked_hours,
          user_log_description_activity: result.description_event
        }

        console.log(assign);


        this.activityService.assignActivity(assign).subscribe(
          (user) => {
            console.log(user);
          },
          (error) => {
            console.error(error);
            this.sweetAlert.presentError('Error retriving user info');
          }
        );

      } else {
        console.log('error recibiendo los datos');
      }
    });
  }

  verifyActivityData(user: SortUser): boolean {
    if
      (
      user.estimated_hours > 0
    )
      return true;

    return false;
  }

  formatearPorcentajes(horasTrabajadas: number, horasEstimadas: number): string {
    return ((horasTrabajadas / horasEstimadas) * 100).toFixed(2);
  }


}
