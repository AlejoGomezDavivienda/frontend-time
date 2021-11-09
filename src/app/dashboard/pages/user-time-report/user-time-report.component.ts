import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
export class UserTimeReportComponent implements OnInit, AfterViewInit
{
  public userName: string = '';

  private data: TimeData = {
    date: new Date(),
    activity: '',
    detail: '',
    hours: 0
  };

  public range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  displayedColumns: string[] = ['date', 'activity', 'detail', 'hours', 'actions'];
  dataSource: MatTableDataSource<TimeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private timeData: TimeData[] = [];

  constructor(
    private userTimeReportService: UserTimeReportService,
    public dialog: MatDialog,
    private sweetAlert: SweetAlertService
  ) 
  { 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.timeData);
  }

  ngOnInit(): void 
  {
    this.userName = localStorage.getItem('user-name') || '';
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData()
  {
    this.userTimeReportService.getAllTimeData().subscribe(
      responseTimeData => { 
        this.timeData = responseTimeData.reports; 
        this.dataSource.data = this.timeData;
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

  openDialog(timeData?: TimeData): void 
  {
    if(timeData) this.data = timeData;

    const dialogRef = this.dialog.open(NewRegisterDialogComponent, {
      width: '270px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        const checkData = this.verifyTimeData(result);
        if(checkData)
        {
          if(!timeData) // Si se desea agregar uno nuevo
          {
            this.userTimeReportService.createTimeData( result ).subscribe(
              () => {                
                this.sweetAlert.presentSuccess('Registro Creado Correctamente!');
                this.loadData();
              },
              () => { this.sweetAlert.presentError('No Fue Posible Crear El Registro!') }
            );
          }
          else // Se desea editar un registro
          {
            this.userTimeReportService.editTimeData(timeData).subscribe(
              () => {
                this.sweetAlert.presentSuccess('Registro Editado Correctamente!');
                this.loadData();
              },
              () => { this.sweetAlert.presentError('No Fue Posible Editar El Registro!') }
            );
          }          
        }
        else
        {
          this.sweetAlert.presentError('Información Inválida!');
        }
      }
    });
  }

  async deleteReport(timeData: TimeData)
  {
    const { isConfirmed } = await this.sweetAlert.presentDelete('El registro de la base de datos!');
    if(isConfirmed)
    {
      const { id } = timeData;
      if( id )
      {
        this.userTimeReportService.deleteTimeData( id ).subscribe(
          () => this.sweetAlert.presentSuccess('Registro eliminado correctamente!'),
          () => this.sweetAlert.presentError('No fue posible eliminar el registro!')
        );
      }
    }
  }

  verifyTimeData(timeData: TimeData): boolean
  {
    if(timeData.date && timeData.activity && timeData.detail && timeData.hours)
    {
      if(!(timeData.hours <= 0 && timeData.hours >= 15))
      {
        return true;
      }
    }

    return false;
  }

  filterReport()
  {
    const rangeTime: RangeTime = this.range.value;
    const { start, end } = rangeTime;
    if(start && end)
    {
      const endMoment = moment( end ).add(1, 'days');
      rangeTime.end = endMoment.toDate();

      this.userTimeReportService.getAllTimeData( rangeTime ).subscribe(
        responseTimeData => {
          this.timeData = responseTimeData.reports; 
          this.dataSource.data = this.timeData;
        },
        error => this.sweetAlert.presentError('Obteniendo rango de datos!')
      );
    }
  }
}