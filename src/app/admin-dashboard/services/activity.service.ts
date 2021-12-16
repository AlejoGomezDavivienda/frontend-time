import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../interfaces/Activity';
import { ResponseActivities } from '../interfaces/ResponseActivities';
import { ResponseActivity } from '../interfaces/ResponseActivity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService 
{

  constructor(
    private http: HttpClient
  ) 
  { }

  createActivity(activityData: Activity): Observable<ResponseActivity>
  {
    return this.http.post<ResponseActivity>(`${environment.API_URL}/activities`, activityData);
  }

  getActivities(): Observable<ResponseActivities>
  {
    return this.http.get<ResponseActivities>(`${environment.API_URL}/activities`);
  }

}
