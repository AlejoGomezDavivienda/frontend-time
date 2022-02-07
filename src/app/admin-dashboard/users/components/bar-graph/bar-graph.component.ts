import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserTimeReportService } from 'src/app/dashboard/services/user-time-report.service';

import * as moment from 'moment';


@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {

  @Input()
  idUser: string = '';

  labelsChart: string[] = [];
  dataChart: number[] = [];

  mostrar: boolean = false;



  // Gráficas
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    }
  };
  public barChartType: ChartType = 'bar';


  // public barChartData: ChartData<'bar'> = {
  //   labels: ['10 Dic', '11 Dic', '12 Dic', '13 Dic', '14 Dic', '15 Dic', '16 Dic', '17 Dic'],
  //   datasets: [
  //     {
  //       data: [7, 8, 7.5, 7, 6, 5.5, 4, 6, 5, 4, 3],
  //       label: 'Horas Trabajadas'
  //     }
  //   ]
  // };

  public barChartData: ChartData<'bar'> = {
    labels: this.labelsChart,
    datasets: [
      {
        data: this.dataChart,
        label: 'Horas trabajadas por día'
      }
    ]
  };

  constructor(
    private reportService: UserTimeReportService
  ) { }

  ngOnInit(): void {
    this.getUsersReports(this.idUser);

    setTimeout(() => this.mostrar = true, 2000);
  }


  getUsersReports(id: string) {

    this.reportService.getAllTimeData(undefined, id).subscribe(
      (reports: any) => {

        reports.reports.reverse().forEach((report: any) => {

          if (report.state) {

            const date = moment(report.date).format('DD-MM-YYYY');
            if (!this.labelsChart.includes(date)) {
              this.labelsChart.push(date);
              this.dataChart.push(report.hours);
            } else {
              let report_1 = this.labelsChart.indexOf(date);
              this.dataChart[report_1] += report.hours;
            }
          }
        });


        // const orederedReports = reports.reports
        //   .filter((a: any, b: any) => {
        //     return moment(a.date).toDate() >= moment(a.date).toDate()
        //   });

        // console.log(reports.reports.reverse());
      },
      (error) => console.log(error)
    );
  }

}
