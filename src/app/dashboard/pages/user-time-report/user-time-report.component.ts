import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewRegisterDialogComponent } from '../../components/new-register-dialog/new-register-dialog.component';
import { TimeData } from '../../interfaces/TimeData';
import { UserTimeReportService } from '../../services/user-time-report.service';

@Component({
  selector: 'app-user-time-report',
  templateUrl: './user-time-report.component.html',
  styleUrls: ['./user-time-report.component.scss']
})
export class UserTimeReportComponent implements OnInit, AfterViewInit
{
  private data: TimeData = {
    date: new Date(),
    activity: '',
    detail: '',
    hours: 0
  };

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  displayedColumns: string[] = ['date', 'activity', 'detail', 'hours', 'actions'];
  dataSource: MatTableDataSource<TimeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private timeData: TimeData[] = [
    {date: new Date(), activity: 'Innovación', detail: 'Actualización del bot', hours: 8}
  ];

  constructor(
    private userTimeReportService: UserTimeReportService,
    public dialog: MatDialog
  ) 
  { 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.timeData);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
          console.log(result);
          this.timeData.push(result);
          this.dataSource.data = this.timeData;
        }
        else
        {
          window.alert('Información invalida sweet alert');
        }
      }
    });
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

}