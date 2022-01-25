import { Component, AfterViewInit, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { AddGeneralActivityComponent } from '../../components/add-general-activity/add-general-activity.component';
import { AddSpecificActivityComponent } from '../../components/add-specific-activity/add-specific-activity.component';
import { Activity } from '../../interfaces/Activity';
import { ActivityService } from '../../services/activity.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-resume-project-plan',
  templateUrl: './resume-project-plan.component.html',
  styleUrls: ['./resume-project-plan.component.scss']
})
export class ResumeProjectPlanComponent implements OnInit, AfterViewInit {

  public generalActivities: Activity[] = [];
  public specificActivities: Activity[] = [];

  private data: Activity = {
    name: '',
    initial_date: new Date(),
    end_date: new Date(),
    estimated_hours: 0,
    worked_hours: 0,
    open_state: true,
    is_general: true,
    country: 'CO'
  };

  // Paginator
  length = this.generalActivities.length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, this.generalActivities.length / 2, this.generalActivities.length];


  displayedColumnsGeneral: string[] = ['name', 'inicio-date', 'fin-date'];
  displayedColumnsSpecific: string[] =
    ['name', 'inicio-date', 'fin-date', 'porcentaje-avance', 'actions'];

  generalActivitiesSource: MatTableDataSource<Activity>;
  specificActivitiesSource: MatTableDataSource<Activity>;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(
    private activityService: ActivityService,
    public dialog: MatDialog,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) {
    this.generalActivitiesSource = new MatTableDataSource(this.generalActivities);
    this.specificActivitiesSource = new MatTableDataSource(this.specificActivities);
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.specificActivitiesSource.paginator = this.paginator.toArray()[0];
    this.specificActivitiesSource.sort = this.sort.toArray()[0];

    this.generalActivitiesSource.paginator = this.paginator.toArray()[1];
    this.generalActivitiesSource.sort = this.sort.toArray()[1];
  }
  
  loadData() {

    this.activityService.getActivities().subscribe(
      (activities) => {

        // Inicializa la tabla de actividades generales
        this.generalActivities = activities.activities.filter(a => a.is_general);
        this.generalActivitiesSource.data = this.generalActivities;

        // Inicializa la tabla de actividades especificas
        this.specificActivities = activities.activities.filter(a => !a.is_general);
        this.specificActivitiesSource.data = this.specificActivities;

      },
      (error) => console.error(error)
    );
  }

  addGeneral() {
    const dialogRef = this.dialog.open(AddGeneralActivityComponent, {
      width: '70%',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const checkData = this.verifyActivityData(result);
        if (checkData) {
          const activity = result as Activity;
          activity.is_general = true;
          activity.open_state = true;

          this.activityService.createActivity(activity).subscribe(
            activity => {
              this.generalActivities.push(activity.activity);
              this.sweetAlert.presentSuccess('Actividad Agregada Correctamente!');

              this.loadData();
            },
            error => {
              console.log(error)
            }
          );
        }
        else {
          this.sweetAlert.presentError('Información Inválida!');
        }
      }
    });
  }

  addSpecific() {
    const dialogRef = this.dialog.open(AddSpecificActivityComponent, {
      width: '70%',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const checkData = this.verifyActivityData(result);
        if (checkData) {
          const activity = result as Activity;
          activity.is_general = false;
          activity.open_state = false;

          this.activityService.createActivity(activity).subscribe(
            activity => {
              this.specificActivities.push(activity.activity);
              this.sweetAlert.presentSuccess('Actividad Agregada Correctamente!');

              this.loadData();
            },
            error => {
              console.log(error)
            }
          );
        }
        else {
          this.sweetAlert.presentError('Información Inválida!');
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.generalActivitiesSource.filter = filterValue.trim().toLowerCase();
    this.specificActivitiesSource.filter = filterValue.trim().toLowerCase();

    if (this.generalActivitiesSource.paginator)
    this.generalActivitiesSource.paginator.firstPage();
    
    if (this.specificActivitiesSource.paginator)
      this.specificActivitiesSource.paginator.firstPage();
  }


  verifyActivityData(activityData: Activity): boolean {
    if (activityData.name && activityData.initial_date && activityData.end_date && activityData.estimated_hours)
      return true;

    return false;
  }

  formatearPorcentajes(horasTrabajadas: number, horasEstimadas: number): string {
    return ((horasTrabajadas / horasEstimadas) * 100).toFixed(2);
  }

  /**
   * Ir al detalle de la actividad en cuestión
   * @param {string} idActivity 
   */
  showActivity(idActivity: string) {
    console.log(idActivity);
    this.router.navigate(['/admin/activities/' + idActivity]);
  }

}
