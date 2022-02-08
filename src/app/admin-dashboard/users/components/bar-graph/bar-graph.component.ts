import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Legend } from 'chart.js';
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
    backgroundColor: '#0080c0',
    borderColor: '#005d8c',
    plugins: {
      title: {
        display: true,
        text: 'Horas trabajadas por fecha'
      },
      legend: {
        title: {
          text: 'HOLA'
        }
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: {
          stepSize: 2,
        }
      }
    }
  };
  public barChartType: ChartType = 'line';

  public barChartData: ChartData<'line'> = {
    labels: this.labelsChart,
    datasets: [
      {
        data: this.dataChart,
        label: 'Tendencia de trabajo diaria',
        hoverBackgroundColor: '#005d8c',
        pointBackgroundColor: '#e2982f',
        pointHoverBorderColor: '#e2982f',
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.3
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
