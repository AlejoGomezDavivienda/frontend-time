import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { LoginData } from '../../interfaces/LoginData';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginData: LoginData = {
    email: '',
    password: '',
    remember: false
  };

  logoDayToDay = environment.LOGO_DAY_TO_DAY;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sweetAlert: SweetAlertService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.verifyAuth();
  }

  verifyAuth() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getUserLogged().subscribe(
        (userData) => {

          console.log(userData);

          this.tokenService.setToken(
            token,
            userData.user.name,
            userData.user.area.country.code,
            userData.user.role.code,
            userData.user.area.code,
            userData.user.id,
            userData.user.role.name
          );

          // TODO: Agregar VP, SUPERVISOR, CAM roles
          // Si vice, director o jefe
          if (userData.user.role.code === 'VP_ROLE' || userData.user.role.code === 'DIRECTOR_ROLE' || userData.user.role.code === 'LEADER_ROLE')
            this.router.navigate(['/admin']);

          // Si es jefe de algún país de CAM
          else if (userData.user.role.code === 'LEADER_CAM_ROLE')
            this.router.navigate(['/leader-cam']);

          // Si es un usuario va a la ruta /supervisor
          else if (userData.user.role.code === 'SUPERVISOR_ROLE')
            this.router.navigate(['/supervisor']);

          // Si es un auditor va a la ruta /dashboard
          else if (userData.user.role.code === 'AUDITOR_ROLE')
            this.router.navigate(['/dashboard']);

          // Llegado el caso el auditor no tuviera rol alguno
          else
            this.sweetAlert.presentError('Debe tener un rol asignado');
        },
        error => console.log(error)
      );
    }
  }

  login() {
    this.authService.login(this.loginData).subscribe(
      (res) => {

        console.log(res);
        // Guardar en el localstorage
        this.tokenService.setToken(
          res.token,
          res.user.name,
          res.user.area.country.code,
          res.user.role.code,
          res.user.area.code,
          res.user.id,
          res.user.role.name
        );

        // Si es un administrador lo mando a la ruta /admin
        if (res.user.role.code === 'VP_ROLE' || res.user.role.code === 'DIRECTOR_ROLE' || res.user.role.code === 'LEADER_ROLE')
          this.router.navigate(['/admin']);

        // Si es jefe de algún país de CAM
        else if (res.user.role.code === 'LEADER_CAM_ROLE')
          this.router.navigate(['/leader-cam']);

        // Si es un usuario va a la ruta /supervisor
        else if (res.user.role.code === 'SUPERVISOR_ROLE')
          this.router.navigate(['/supervisor']);

        // Si es un auditor va a la ruta /dashboard
        else if (res.user.role.code === 'AUDITOR_ROLE')
          this.router.navigate(['/dashboard']);

      },
      (error) => {
        this.sweetAlert.presentError('Datos inválidos!');
      }
    );
  }

}
