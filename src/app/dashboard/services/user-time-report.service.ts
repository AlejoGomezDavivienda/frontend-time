import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  getTimeData()
  {
    return this.http.get(``);
  }

  /**
   * crear un nuevo registro en el time report del usuario.
   * @param timeData 
   */
  createTimeData(timeData: TimeData)
  {
    return this.http.post('', {});
  }

  /**
   * Edita un registro del time report.
   * @param timeData 
   */
  editTimeData(timeData: TimeData)
  {
    return this.http.put(`${timeData.id}`, timeData);
  }

  /**
   * Elimina un registro del time report.
   * @param id Identificador de la información a borrar
   */
  deleteTimeData(id: string)
  {
    return this.http.delete(`${id}`);
  }

}
