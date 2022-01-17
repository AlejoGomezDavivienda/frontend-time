import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { NewRegisterDialogComponent } from '../../components/new-register-dialog/new-register-dialog.component';
import { RangeTime } from '../../interfaces/RangeTime';
import { TimeData } from '../../interfaces/TimeData';
import { UserTimeReportService } from '../../services/user-time-report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-time-report',
  templateUrl: './user-time-report.component.html',
  styleUrls: ['./user-time-report.component.scss']
})
export class UserTimeReportComponent implements OnInit, AfterViewInit {
  public userName: string = '';
  public userId: string = '';

  public today = new Date();

  private data: TimeData = {
    date: new Date(),
    activity: { _id: '', name: '' },
    detail: '',
    hours: 0,
    current_hours: 0,
    edit: false,
    checked: false
  };

  public horasTrabajadasHoy = 0;
  public timeDataActual: TimeData[] = [];

  public range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  displayedColumns: string[] = ['select', 'date', 'activity', 'detail', 'hours', 'actions'];
  dataSource: MatTableDataSource<TimeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private timeData: TimeData[] = [];
  private deleteReportsMassive: TimeData[] = [];
  registros: boolean = false;


  constructor(
    private userTimeReportService: UserTimeReportService,
    public dialog: MatDialog,
    private sweetAlert: SweetAlertService,
    private _snackBar: MatSnackBar
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.timeData);
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user-name') || '';
    this.userId = localStorage.getItem('x-token') || '';
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }

  loadData() {

    this.horasTrabajadasHoy = 0;

    this.userTimeReportService.getAllTimeData().subscribe(
      responseTimeData => {
        this.timeData = responseTimeData.reports;
        this.dataSource.data = this.timeData;

        let cDate = moment(new Date()).format('YYYY-MM-DD');
        for (let i = 0; i < this.timeData.length; i++) {
          if (cDate == moment(this.timeData[i].date).format('YYYY-MM-DD')) {
            this.timeDataActual.push(this.timeData[i])
            this.horasTrabajadasHoy += this.timeData[i].hours;

            if (this.horasTrabajadasHoy > 24)
              this.openSnackBar('Te has excedido de tus horas diarias de trabajo, revisa tus actividades de hoy para ajustar los tiempos');
          }
        }
      },

      error => { console.log(error) }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(timeData?: TimeData, editar?: Boolean): void {
    if (timeData) {
      this.data = timeData;
      this.data.current_hours = timeData.hours;
    }
    if (editar) {
      this.data.edit = true;
      this.data.titleDialog = 'Editar Registro';
    }
    else {
      this.data.edit = false;
      this.data.titleDialog = 'Agregar Registro'
    }

    const dialogRef = this.dialog.open(NewRegisterDialogComponent, {
      width: '70%',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const checkData = this.verifyTimeData(result);
        if (checkData) {
          // Si se desea agregar uno nuevo
          if (!timeData) {
            this.userTimeReportService.createTimeData(result).subscribe(
              () => {
                this.sweetAlert.presentSuccess('Registro Creado Correctamente!');
                this.loadData();
                this.data = {
                  date: new Date(),
                  activity: { _id: '', name: '' },
                  detail: '',
                  hours: 0,
                  current_hours: 0,
                  edit: false
                };
              },
              () => { this.sweetAlert.presentError('No fue posible crear el registro! Revisa los datos ingresados') }
            );
          }

          // Se desea editar un registro
          else {

            this.userTimeReportService.editTimeData(timeData).subscribe(
              () => {
                this.sweetAlert.presentSuccess('Registro Editado Correctamente!');
                this.loadData();

                this.data = {
                  date: new Date(),
                  activity: { _id: '', name: '' },
                  detail: '',
                  hours: 0,
                  current_hours: 0,
                  edit: false
                };
              },
              () => { this.sweetAlert.presentError('No Fue Posible Editar El Registro!') }
            );
          }
        }
        else {
          this.sweetAlert.presentError('Información Inválida!');
        }
      }
    });


  }


  async deleteReport(timeData: TimeData) {

    const { isConfirmed } = await this.sweetAlert.presentDelete('El registro de la base de datos!');

    if (isConfirmed) {
      const { id } = timeData;
      if (id) {
        this.userTimeReportService.deleteTimeData(id).subscribe(
          () => {
            this.sweetAlert.presentSuccess('Registro eliminado correctamente!');
            this.loadData();
            // this.openSnackBar();
          },
          () => this.sweetAlert.presentError('No fue posible eliminar el registro!')
        );
      }
    }
  }

  async deleteSelectedReports() {
    const { isConfirmed } = await this.sweetAlert.presentDelete('Los registros seleccionados');

    if (isConfirmed) {
      this.userTimeReportService.deleteReportsTimeData(this.deleteReportsMassive)
        .subscribe(
          (res) => {
            this.sweetAlert.presentSuccess('Registros eliminados correctamente!');
            console.log(res);
            this.registros = false;
            this.deleteReportsMassive = [];
            this.loadData();

            // this.openSnackBar();

          },
          (error) => {
            this.sweetAlert.presentError('No fue posible eliminar los registros!')
            console.log(error);
          }
        );
    }

  }

  verifyTimeData(timeData: TimeData): boolean {

    console.log((this.horasTrabajadasHoy - timeData.current_hours + timeData.hours));

    if ((this.horasTrabajadasHoy - timeData.current_hours + timeData.hours) > 24) {
      console.log((this.horasTrabajadasHoy - timeData.current_hours + timeData.hours));
      this.openSnackBar(`Horas diarias excedidas, más de 24 horas diarias. 
      Revisa la información ingresada de tus actividades de hoy y editalas si es necesario`);
      return false;
    }

    if (timeData.hours > 24) {
      this.openSnackBar(`Solo puedes agregar 24 horas de trabajo por acividad por día`);
      return false;
    }

    if (timeData.date && timeData.activity && timeData.detail && timeData.hours)
      if (timeData.hours > 0 && timeData.hours <= 24)
        return true;

    return false;
  }

  filterReport() {
    const rangeTime: RangeTime = this.range.value;
    const { start, end } = rangeTime;

    if (start && end) {
      const endMoment = moment(end).add(1, 'days');
      rangeTime.end = endMoment.toDate();

      this.userTimeReportService.getAllTimeData(rangeTime, '').subscribe(
        (responseTimeData) => {
          this.timeData = responseTimeData.reports;
          this.dataSource.data = this.timeData;
        },
        (error) => this.sweetAlert.presentError('Obteniendo rango de datos!')
      );
    }

  }

  selectReport(report: TimeData) {


    if (!this.deleteReportsMassive.includes(report)) {
      this.deleteReportsMassive.push(report);
    }
    else {
      let indexReport = this.deleteReportsMassive.indexOf(report);
      if (indexReport !== -1) {
        this.deleteReportsMassive.splice(indexReport, 1);
      }
    }

    if (this.deleteReportsMassive.length > 1)
      this.registros = true;
    else
      this.registros = false;

  }

  openSnackBar(aviso?: string) {

    let message = 'Horas trabajadas el día de hoy';

    if (this.horasTrabajadasHoy > 24)
      message = `Te has excedido de las horas permitdas por día, revisa tus actividades ingresadas hoy`;
    else if (this.horasTrabajadasHoy >= 8)
      message = `Has completado tu registro de 8 horas diarias, 
      de igual manera puedes seguir agregando actividades si es el caso`;

    if (aviso != null && aviso != '' && aviso != undefined)
      message = aviso || 'a';

    this._snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

}