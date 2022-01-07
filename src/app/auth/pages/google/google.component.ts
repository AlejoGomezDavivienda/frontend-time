import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LoginData } from '../../interfaces/LoginData';
import { AuthService } from '../../services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  public loginData: LoginData = {
    email: '',
    password: '',
    remember: false
  };

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private sweetAlert: SweetAlertService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

  }

  login(): void {
    this.authService.login(this.loginData).subscribe(
      res => {
        // console.log(res);
        // Guardar en el localstorage
        this.tokenService.setToken(res.token, res.user.name);
        if (res.user.rol === 'ADMIN_ROLE') // Si es un administrador lo mando a la ruta /admin
        {
          this.router.navigate(['/admin']);
        }
        else if (res.user.rol === 'USER_ROLE') // Si es un usuario corriente lo mando a la ruta /dashboard
        {
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        this.sweetAlert.presentError('Datos inválidos!');
      }
    );
  }

}
