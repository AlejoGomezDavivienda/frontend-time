import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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

  mostrar: boolean = false;

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

    setTimeout(() => this.mostrar = true, 2000);
  }


  getUsersReports(id: string) {

    this.reportService.getAllTimeData(undefined, id).subscribe(
      (reports: any) => {

        reports.reports.forEach((report: any) => {

          if (report.state) {
            if (!this.labelsChart.includes(report.activity.name)) {
              this.labelsChart.push(report.activity.name);
              this.dataChart.push(report.hours);
            } else {
              let activity = this.labelsChart.indexOf(report.activity.name);
              this.dataChart[activity] += report.hours;
            }
          }
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
