import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class ListUsersComponent implements OnInit, AfterViewInit {
  private data: GeneralUser = {
    email: '',
    name: ''
  };

  userImg = 'https://firebasestorage.googleapis.com/v0/b/subasta-inversa-d6e7a.appspot.com/o/User-80_icon-icons.com_57249.png?alt=media&token=283572e2-e8d3-4149-9227-8ae3b795652e';

  // countries = [
  //   {
  //     name: 'Panamá',
  //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/200px-Flag_of_Panama.svg.png'
  //   },
  //   {
  //     name: 'El Salvador',
  //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_El_Salvador.svg/2560px-Flag_of_El_Salvador.svg.png'
  //   },
  //   {
  //     name: 'Honduras',
  //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Flag_of_Honduras.svg/800px-Flag_of_Honduras.svg.png'
  //   },
  //   {
  //     name: 'Costa Rica',
  //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Costa_Rica_%28state%29.svg/200px-Flag_of_Costa_Rica_%28state%29.svg.png'
  //   },
  //   {
  //     name: 'Colombia',
  //     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/200px-Flag_of_Colombia.svg.png'
  //   }
  // ]


  public userName: string = '';
  public userCountry = localStorage.getItem('country');
  public userRole = localStorage.getItem('role');
  public userArea = localStorage.getItem('area');
  public userId = localStorage.getItem('idUser');

  public poseePermisos: boolean = false;

  displayedColumns: string[] = ['image-avatar', 'email', 'name', 'country', 'role',  'actions'];
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

    if (this.userRole !== 'SUPERVISOR_ROLE' && this.userRole !== 'AUDITOR_ROLE')
      this.poseePermisos = true;
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user-name') || '';
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.userService.getAllUsers().subscribe(
      (users) => {

        // Si es el vicepresidente
        if (this.userRole === 'VP_ROLE')
          this.usersData = users.users;

        // Si es gerente de CAM desde Colombia (Ricardo)
        else if (this.userRole === 'DIRECTOR_ROLE' && this.userCountry === 'CAM')
          this.usersData = users.users.filter((u) => u.area.country.code !== 'CO');

        // Si es director de Conductas especiales (Leonardo)
        else if (this.userRole === 'DIRECTOR_ROLE' && this.userArea === '9') //TODO: 
          this.usersData = users.users.filter((u) => u.area.code === 9);

        // Si es director de Colombia (Yaquelyn)
        else if (this.userRole === 'DIRECTOR_ROLE')
          this.usersData = users.users.filter((u) => u.area.country.code === 'CO' && u.area.code !== 9 && u.role.code !== 'VP_ROLE');

        // Si es jefe (Jorge, Luz H, etc, etc)
        else if (this.userRole === 'LEADER_ROLE')
          this.usersData = users.users.filter((u) => u.area.code.toString() === this.userArea);

        // Si es supervisor con equipo fijo
        else if (this.userRole === 'SUPERVISOR_ROLE') {

          this.usersData = users.users.filter((u) => u.supervised_by === this.userId);

          // Si es Tatiana, Rony, Anyela
          if (this.usersData.length === 0)
            this.usersData = users.users.filter((u) =>
              u.area.code.toString() === this.userArea &&
              u.role.code !== 'LEADER_ROLE' && u.role.code !== 'SUPERVISOR_ROLE');

        }


        else
          console.log('No es posible filtrar a los usuarios')

        this.dataSource.data = this.usersData;
      },
      (error) => {
        console.log("Error obteniendo usuarios del backend");
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
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
            () => {
              this.sweetAlert.presentSuccess('Usuario creado con éxito');
              this.loadData();
            },
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

  showUserPerformance(id: string) {
    if (this.userRole === 'SUPERVISOR_ROLE')
      this.router.navigate(['/supervisor/users/performance/' + id]);
    else
      this.router.navigate(['/admin/users/performance/' + id]);
  }


}
