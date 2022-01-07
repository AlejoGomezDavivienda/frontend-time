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
export class LoginComponent implements OnInit 
{
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

  ngOnInit(): void 
  {
    this.verifyAuth();
  }

  verifyAuth()
  {
    const token = this.tokenService.getToken();
    if( token )
    {
      this.authService.getUserLogged().subscribe(
        userData => {
          this.tokenService.setToken(token, userData.user.name);
          
          if(userData.user.rol === 'ADMIN_ROLE') // Si es un administrador lo mando a la ruta /admin
          {
            this.router.navigate(['/admin']);
          }
          else if(userData.user.rol === 'USER_ROLE') // Si es un usuario corriente lo mando a la ruta /dashboard
          {
            this.router.navigate(['/dashboard']);
          }          
        },
        error => console.log(error)
      );
    }
  }

  login()
  {
    this.authService.login(this.loginData).subscribe(
      res => {
        // console.log(res);
        // Guardar en el localstorage
        this.tokenService.setToken(res.token, res.user.name);
        if(res.user.rol === 'ADMIN_ROLE') // Si es un administrador lo mando a la ruta /admin
        {
          this.router.navigate(['/admin']);
        }
        else if(res.user.rol === 'USER_ROLE') // Si es un usuario corriente lo mando a la ruta /dashboard
        {
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        this.sweetAlert.presentError( 'Datos inválidos!' );
      }
    );
  }

}
