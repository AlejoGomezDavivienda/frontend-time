import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { GeneralUser } from '../../interfaces/GeneralUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
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
    private sweetAlert: SweetAlertService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.usersData);
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user-name') || '';
    this.loadData();
  }

  loadData() {
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

  addUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '70%',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const checkData = this.verifyUserData(result);

        if (checkData) {
          const user = result as GeneralUser;

          // Capitalize the user's name
          // eg: Juan Esteban Gomez Forero
          // eg: María A. Quintero Rojas
          user.name = user.name.trim().toLowerCase()
            .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

          user.email = user.email.trim().toLowerCase();

          this.userService.createUser(user).subscribe(
            () => this.sweetAlert.presentSuccess('Usuario creado con éxito'),
            (error) => this.sweetAlert.presentError(error.error.error)
          );
        }
        else {
          this.sweetAlert.presentError('Información Inválida o faltante');
        }
      }
    });
  }

  verifyUserData(userData: GeneralUser): boolean {


    if (userData.email && userData.name && userData.country && userData.rol)
      if (userData.email.toLowerCase().includes('@davivienda'))
        return true;

    return false;
  }

  showUser(id: string) {
    this.router.navigate(['/admin/users/' + id]);
  }

}
