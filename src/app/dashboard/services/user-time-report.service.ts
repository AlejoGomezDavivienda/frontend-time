import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseTimeData } from '../interfaces/ResponseTimeData';
import { TimeData } from '../interfaces/TimeData';

@Injectable({
  providedIn: 'root'
})
export class UserTimeReportService 
{

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene el time report del usuario.
   */
  getAllTimeData(): Observable<ResponseTimeData>
  {
    return this.http.get<ResponseTimeData>(`${environment.API_URL}/reports`);
  }

  /**
   * crear un nuevo registro en el time report del usuario.
   * @param timeData 
   */
  createTimeData(timeData: TimeData)
  {
    return this.http.post(`${environment.API_URL}/reports`, timeData);
  }

  /**
   * Edita un registro del time report.
   * @param timeData 
   */
  editTimeData(timeData: TimeData)
  {
    const {id, ...data} = timeData;
    return this.http.put(`${environment.API_URL}/reports/${id}`, data);
  }

  /**
   * Elimina un registro del time report.
   * @param id Identificador de la información a borrar
   */
  deleteTimeData(id: string)
  {
    return this.http.delete(`${id}`);
  }

  // **************ESPECIALES******************ESPECIALES************ESPECIALES*************//
  getAllActivitiesFromUser(): Observable<string[]>
  {
    return this.http.get<string[]>(`${environment.API_URL}/reports/activities`);
  }

}
