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
  backgroundColors: string[] = [];

  mostrar: boolean = false;

  // Pie graph
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Horas trabajadas por actividad'
      },
      subtitle: {
        display: true,
        text: 'Custom Chart Subtitle'
      }
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {

    labels: this.labelsChart,

    datasets: [
      {
        data: this.dataChart,
        backgroundColor: this.backgroundColors,
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

        this.generateBackgroundColors();
      },
      (error) => console.log(error)
    );
  }


  generateBackgroundColors() {

    for (let i = 0; i < this.dataChart.length; i++) {
      const colorR = Math.floor(Math.random() * 255);
      const colorG = Math.floor(Math.random() * 255);
      const colorB = Math.floor(Math.random() * 255);

      const colorRGB = `RGB(${colorR},${colorG},${colorB})`;
      this.backgroundColors.push(colorRGB);
    }

  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
