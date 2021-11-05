import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewRegisterDialogComponent } from '../../components/new-register-dialog/new-register-dialog.component';


export interface TimeData {
  date: string;
  activity: string;
  detail: string;
  hours: number;
}

@Component({
  selector: 'app-user-time-report',
  templateUrl: './user-time-report.component.html',
  styleUrls: ['./user-time-report.component.scss']
})
export class UserTimeReportComponent implements OnInit, AfterViewInit
{
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  displayedColumns: string[] = ['date', 'activity', 'detail', 'hours', 'actions'];
  dataSource: MatTableDataSource<TimeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog
  ) 
  { 
    const timeData: TimeData[] = [
      {date: '5/11/2021', activity: 'Innovación', detail: 'Actualización del bot', hours: 8}
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(timeData);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(NewRegisterDialogComponent, {
      width: '270px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.animal = result;
    });
  }

}