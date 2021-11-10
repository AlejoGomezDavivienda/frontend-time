import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { LoginData } from '../../interfaces/LoginData';
import { AuthService } from '../../services/auth.service';

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
      this.authService.getUserLogged( token ).subscribe(
        userData => {
          this.tokenService.setToken(token, userData.user.name);
          this.router.navigate(['/dashboard']);
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
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.sweetAlert.presentError( 'Datos inválidos!' );
      }
    );
  }

}
