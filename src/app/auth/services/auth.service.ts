import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/LoginData';
import { LoginResponse } from '../interfaces/LoginResponse';
import { MeResponse } from '../interfaces/MeResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Inicia sesión en el backend del sistema.
   * @param data Información requerida para hacer login (mail || username) && password
   */
   login(data: LoginData): Observable<LoginResponse>
   {
     return this.http.post<LoginResponse>(`${environment.API_URL}/auth/login`, data);
   }

   getUserLogged(token: string): Observable<MeResponse>
   {
     return this.http.get<MeResponse>(`${environment.API_URL}/auth/me`);
   }
}
