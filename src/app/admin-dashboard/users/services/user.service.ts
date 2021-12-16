import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralUser } from '../interfaces/GeneralUser';
import { ResponseGetUsers } from '../interfaces/ResponseGetUsers';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<ResponseGetUsers>
  {
    return this.http.get<ResponseGetUsers>(`${environment.API_URL}/users`);
  }

  createUser(user: GeneralUser): Observable<ResponseGetUsers>
  {
    return this.http.post<ResponseGetUsers>(`${environment.API_URL}/users`, user);
  }

}
