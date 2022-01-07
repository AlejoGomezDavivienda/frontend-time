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

  verifyAuth() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getUserLogged().subscribe(
        userData => {
          this.tokenService.setToken(token, userData.user.name);

          if (userData.user.rol === 'ADMIN_ROLE') // Si es un administrador lo mando a la ruta /admin
          {
            this.router.navigate(['/admin']);
          }
          else if (userData.user.rol === 'USER_ROLE') // Si es un usuario corriente lo mando a la ruta /dashboard
          {
            this.router.navigate(['/dashboard']);
          }
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
        this.tokenService.setToken(res.token, res.user.name);

        // Si es un administrador lo mando a la ruta /admin
        if (res.user.rol === 'ADMIN_ROLE') {
          this.router.navigate(['/admin']);
        }

        // Si es un usuario corriente lo mando a la ruta /dashboard
        else if (res.user.rol === 'USER_ROLE') {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        this.sweetAlert.presentError('Datos inválidos!');
      }
    );

  }

}
