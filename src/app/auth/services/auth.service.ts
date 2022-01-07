import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/LoginData';
import { LoginResponse } from '../interfaces/LoginResponse';
import { MeResponse } from '../interfaces/MeResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  /**
   * Inicia sesión en el backend del sistema.
   * @param data Información requerida para hacer login (mail || username) && password
   */
  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.API_URL}/auth/login`, data);
  }

  loginWithGoogle(data: any): Observable<LoginResponse> {

    console.log(data);

    const datas = JSON.parse(data);
    return this.http.post<LoginResponse>(`${environment.API_URL}/auth/google`, datas);
  }

  getUserLogged(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${environment.API_URL}/auth/me`);
  }

  logout() {
    this.tokenService.clearStorage();
  }
}
