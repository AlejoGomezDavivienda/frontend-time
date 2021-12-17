import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService 
{

  constructor() { }

  /**
   * Obtiene el token almacenado en el localstorage o devuelve cadena vacia si no se encuentra.
   * @returns Token de autenticación.
   */
   getToken(): string
   {
     let token = '';
     const existToken = localStorage.getItem('x-token');
     if(existToken)
     {
       token = existToken;
     }
 
     return token;
   }

   setToken(token: string, name: string)
   {
      localStorage.setItem('x-token', token);
      localStorage.setItem('user-name',name);
   }

   clearStorage()
   {
     localStorage.clear();
   }
}
