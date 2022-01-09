import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../interfaces/Activity';
import { ResponseActivities } from '../interfaces/ResponseActivities';
import { ResponseActivity } from '../interfaces/ResponseActivity';
import { AssignActivity } from '../users/interfaces/AssignActivity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http: HttpClient
  ) { }

  createActivity(activityData: Activity): Observable<ResponseActivity> {
    return this.http.post<ResponseActivity>(`${environment.API_URL}/activities`, activityData);
  }

  getActivities(specific?: boolean): Observable<ResponseActivities> {
    const httpOptions = {
      params: new HttpParams().set('specific', specific ? true : false)
    };
    return this.http.get<ResponseActivities>(`${environment.API_URL}/activities`, httpOptions);
  }

  assignActivity(assign: AssignActivity) {
    return this.http.patch(`${environment.API_URL}/activities/${assign.activity_id}`, assign);
  }

}
