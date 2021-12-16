import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { GeneralUser } from '../../interfaces/GeneralUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit 
{
  private data: GeneralUser = {
    email: '',
    name: '',
    // state: true
  };

  public userName: string = '';

  displayedColumns: string[] = ['email', 'name', 'state', 'actions'];
  dataSource: MatTableDataSource<GeneralUser>;
  private usersData: GeneralUser[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private sweetAlert: SweetAlertService
  )
  { 
    this.dataSource = new MatTableDataSource(this.usersData);
  }

  ngOnInit(): void 
  {
    this.userName = localStorage.getItem('user-name') || '';
    this.loadData();
  }

  loadData()
  {
    this.userService.getAllUsers().subscribe(
      users => {
        this.usersData = users.users;
        this.dataSource.data = this.usersData;
      },
      error => {
        console.log("Error obteniendo usuarios del backend");
        console.log(error);
      }
    );
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser()
  {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '85%',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        const checkData = this.verifyUserData(result);
        if(checkData)
        {
          const user = result as GeneralUser;
          user.name = user.name.toUpperCase();

          this.userService.createUser( user ).subscribe(
            user => {
              console.log(user);
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

  verifyUserData(userData: GeneralUser): boolean
  {
    if(userData.email && userData.name)
    {
      return true;
    }

    return false;
  }

}
