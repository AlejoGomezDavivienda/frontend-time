import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../../interfaces/LoginData';

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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login()
  {
    this.router.navigate(['/dashboard']);
  }

}
