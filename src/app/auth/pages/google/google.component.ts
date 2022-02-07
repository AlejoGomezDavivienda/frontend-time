import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LoginData } from '../../interfaces/LoginData';
import { AuthService } from '../../services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {


  logoDayToDay = environment.LOGO_DAY_TO_DAY;
  logoCentral = environment.ICON_DAY_TO_DAY;

  showIcon = true;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private sweetAlert: SweetAlertService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.verifyAuth();
  }

  isMobile(): boolean {

    return window.screen.width < 900 ? false : true;
  }

  verifyAuth() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getUserLogged().subscribe(
        userData => {

          this.tokenService.setToken(
            token,
            userData.user.name,
            userData.user.area.country.code,
            userData.user.role.code,
            userData.user.area.code,
            userData.user.id
          );

          // TODO: Agregar VP, SUPERVISOR, CAM roles
          // Si es un administrador lo mando a la ruta /admin
          if (userData.user.role.code === 'VP_ROLE' || userData.user.role.code === 'DIRECTOR_ROLE' || userData.user.role.code === 'LEADER_ROLE')
            this.router.navigate(['/admin']);

          // Si es un usuario lo mando a la ruta /dashboard
          else if (userData.user.role.code === 'SUPERVISOR_ROLE' || userData.user.role.code === 'AUDITOR_ROLE')
            this.router.navigate(['/dashboard']);

          // Llegado el caso el auditor no tuviera rol alguno
          else
            this.sweetAlert.presentError('Debe tener un rol asignado');

        },
        error => console.log(error)
      );
    }
  }

  async loginWithGoogle(): Promise<void> {
    const data = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.authService.loginWithGoogle(data).subscribe(
      (res) => {

        // Guardar en el localstorage
        this.tokenService.setToken(
          res.token,
          res.user.name,
          res.user.area.country.code,
          res.user.role.code,
          res.user.area.code,
          res.user.id
        );


        // Si es un administrador lo mando a la ruta /admin
        if (res.user.role.code === 'VP_ROLE' || res.user.role.code === 'DIRECTOR_ROLE' || res.user.role.code === 'LEADER_ROLE')
          this.router.navigate(['/admin']);

        // Si es un usuario lo mando a la ruta /dashboard
        else if (res.user.role.code === 'SUPERVISOR_ROLE' || res.user.role.code === 'AUDITOR_ROLE')
          this.router.navigate(['/dashboard']);

        // Llegado el caso el auditor no tuviera rol alguno
        else
          this.sweetAlert.presentError('Debe tener un rol asignado');

      },

      (error) => this.sweetAlert.presentError(error.error.error)
    );

  }

}
