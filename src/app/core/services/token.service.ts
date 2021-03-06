import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  /**
   * Obtiene el token almacenado en el localstorage o devuelve cadena vacia si no se encuentra.
   * @returns Token de autenticación.
   */
  getToken(): string {
    let token = '';
    const existToken = localStorage.getItem('x-token');
    if (existToken)
      token = existToken;

    return token;
  }

  setToken(token: string, name: string, country: string, role: string, area: number, id: string, roleName: string) {
    localStorage.setItem('x-token', token);
    localStorage.setItem('user-name', name);
    localStorage.setItem('country', country);
    localStorage.setItem('role', role);
    localStorage.setItem('area', area + '');
    localStorage.setItem('idUser', id);
    localStorage.setItem('role_name', roleName);
  }

  clearStorage() {
    localStorage.clear();
  }
}
