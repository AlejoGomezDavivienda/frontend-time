import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private sweetAlert: SweetAlertService
  ) { }

  ngOnInit(): void {
  }

  login()
  {
    this.authService.login(this.loginData).subscribe(
      res => {
        console.log(res);
        // Guardar en el localstorage
        localStorage.setItem('x-token', res.token);
        localStorage.setItem('user-name', res.user.name);
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.sweetAlert.presentError( 'Datos inválidos!' );
      }
    );
  }

}
