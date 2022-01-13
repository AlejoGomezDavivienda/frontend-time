import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RangeTime } from '../interfaces/RangeTime';
import { ResponseTimeData } from '../interfaces/ResponseTimeData';
import { ResponseUserActivities } from '../interfaces/ResponseUserActivities';
import { TimeData } from '../interfaces/TimeData';

@Injectable({
  providedIn: 'root'
})
export class UserTimeReportService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene el time report del usuario.
   */
  getAllTimeData(rangeTime?: RangeTime, userId?: string): Observable<ResponseTimeData> {

    let httpOptions = {};


    if (rangeTime) {

      httpOptions = {
        params: new HttpParams()
          .set('start', rangeTime.start.toDateString())
          .set('end', rangeTime.end.toDateString())
          .set('user_id', userId || '')
      };
    }

    if (userId !== '' && userId !== undefined)
      httpOptions = { params: new HttpParams().set('user_id', userId || '') };

    return this.http.get<ResponseTimeData>(`${environment.API_URL}/reports`, httpOptions);
  }

  /**
   * crear un nuevo registro en el time report del usuario.
   * @param timeData 
   */
  createTimeData(timeData: TimeData) {
    return this.http.post(`${environment.API_URL}/reports`, timeData);
  }

  /**
   * Edita un registro del time report.
   * @param timeData 
   */
  editTimeData(timeData: TimeData) {
    const { id, ...data } = timeData;
    return this.http.put(`${environment.API_URL}/reports/${id}`, data);
  }

  /**
   * Elimina un registro del time report.
   * @param id Identificador de la información a borrar
   */
  deleteTimeData(id: string) {
    return this.http.delete(`${environment.API_URL}/reports/${id}`);
  }

  // **************ESPECIALES******************ESPECIALES************ESPECIALES*************//
  getAllActivitiesFromUser(): Observable<ResponseUserActivities> {
    return this.http.post<ResponseUserActivities>(`${environment.API_URL}/activities/specific`, {});
  }
}
