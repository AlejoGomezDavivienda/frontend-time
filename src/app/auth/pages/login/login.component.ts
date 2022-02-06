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

          this.tokenService.setToken(token, userData.user.name, userData.user.area.country.code, userData.user.role.code);

          // TODO: Agregar VP, SUPERVISOR, CAM roles
          // Si es un administrador lo mando a la ruta /admin
          if (userData.user.role.code === 'LEADER_ROLE' || userData.user.role.code === 'VP_ROLE')
            this.router.navigate(['/admin']);

          // Si es un usuario corriente lo mando a la ruta /dashboard
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
        // Guardar en el localstorage
        this.tokenService.setToken(res.token, res.user.name, res.user.area.country.code, res.user.role.code);

        // Si es un administrador lo mando a la ruta /admin
        if (res.user.role.code === 'LEADER_ROLE' || res.user.role.code === 'VP_ROLE') {
          this.router.navigate(['/admin']);
        }
        // Si es un usuario corriente lo mando a la ruta /dashboard
        else if (res.user.role.code === 'AUDITOR_ROLE') {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        this.sweetAlert.presentError('Datos inválidos!');
      }
    );
  }

}
