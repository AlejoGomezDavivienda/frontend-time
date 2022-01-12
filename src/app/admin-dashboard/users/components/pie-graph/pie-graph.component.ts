import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserTimeReportService } from 'src/app/dashboard/services/user-time-report.service';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss']
})
export class PieGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input()
  idUser: string

  labelsChart: string[] = [];
  dataChart: number[] = [];

  // Pie graph
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {

    labels: this.labelsChart,
    datasets: [
      {
        data: this.dataChart
      }
    ]
  };


  public pieChartType: ChartType = 'pie';

  constructor(private reportService: UserTimeReportService) {
    this.idUser = '';
  }

  ngOnInit(): void {
    this.getUsersReports(this.idUser);
  }

  getUsersReports(id: string) {

    this.reportService.getAllTimeData(undefined, id).subscribe(
      (reports: any) => {

        reports.reports.forEach((report: any) => {
          this.labelsChart.push(report.activity.name)
          this.dataChart.push(report.hours)
        });
      },
      (error) => console.log(error)
    );
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
