import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


import { ResponseTimeData } from 'src/app/dashboard/interfaces/ResponseTimeData';
import { TimeData } from 'src/app/dashboard/interfaces/TimeData';
import { UserTimeReportService } from 'src/app/dashboard/services/user-time-report.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RangeTime } from 'src/app/dashboard/interfaces/RangeTime';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as moment from 'moment';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss']
})
export class PieGraphComponent implements OnInit, AfterViewInit {


  public range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  private data: TimeData = {
    date: new Date(),
    activity: {
      id: '',
      name: '',
      company: { code: 1, name: '', country: { code: '', name: '', img: '' } },
      open_state: true,
      initial_date: new Date(),
      end_date: new Date(),
      estimated_hours: 1,
      worked_hours: 1,
      is_general: false
    },
    detail: '',
    hours: 0,
    current_hours: 0,
    edit: false,
    checked: false
  };

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input()
  idUser: string

  horasTrabajadasEnTotal = 0;
  horasTrabajadasEnPromedio = 0;

  labelsChart: string[] = [];
  dataChart: number[] = [];
  backgroundColors: string[] = [];

  labelsBarChart: string[] = [];
  dataBarChart: number[] = [];

  mostrar: boolean = false;
  today = new Date();
  estaSupervisando = false;


  private timeData: TimeData[] = [];
  // Tabla de detalle
  displayedColumns: string[] = ['date', 'activity', 'hours', 'detail'];
  dataSource: MatTableDataSource<TimeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Pie graph
  public pieChartType: ChartType = 'pie';

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

    labels: [''],

    datasets: [
      {
        data: [0],
        backgroundColor: this.backgroundColors,
        hoverBackgroundColor: this.backgroundColors,
        hoverBorderWidth: 0
      }
    ]
  };



  // Bar graph
  public barChartType: ChartType = 'line';

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

  public barChartData: ChartData<'line'> = {
    labels: [''],
    datasets: [
      {
        data: [0],
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


  constructor(private reportService: UserTimeReportService,
    private sweetAlert: SweetAlertService,
    private router: Router) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.timeData);
    this.idUser = '';
  }

  ngOnInit(): void {
    this.getUsersReports(this.idUser);
    setTimeout(() => this.mostrar = true, 1000);
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

    // this.dataSource.sort = this.sort;
    // to put where you want the sort to be programmatically triggered, for example inside ngOnInit
    // this.sort.sort(({ id: 'date', start: 'desc' }) as MatSortable);
    // this.dataSource.sort = this.sort;

    // let href = this.router.url.toString();
    // if (href.includes('/admin/') || href.includes('/supervisor/'))
    //   this.estaSupervisando = true;
  }

  getUsersReports(id: string) {

    this.reportService.getAllTimeData(undefined, id)
      .subscribe((reports: ResponseTimeData) => {

        // Organizar reportes del m??s reciente al m??s antiguo
        let reportes: TimeData[] = reports.reports.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        this.fillDetailTable(reportes);
        // Generar el Pie Chart
        this.generatePieChart(reportes);
        // Generar el Bar Chart
        this.generateBarChart(reportes);

      },
        (error) => console.log(error)
      );
  }


  private fillDetailTable(responseTimeData: TimeData[]) {
    this.timeData = responseTimeData;
    this.dataSource.data = this.timeData;
  }

  private generatePieChart(reports: TimeData[]) {

    reports.forEach((report: TimeData) => {

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

    this.pieChartData.labels = this.labelsChart;
    this.pieChartData.datasets[0].data = this.dataChart;

    this.generateBackgroundColors();
  }


  private generateBarChart(reports: TimeData[]) {

    reports.forEach((report: TimeData) => {

      if (report.state) {

        const date = moment(report.date).format('DD-MM-YYYY');

        if (!this.labelsBarChart.includes(date)) {
          this.labelsBarChart.push(date);
          this.dataBarChart.push(report.hours);
        } else {
          let report_1 = this.labelsBarChart.indexOf(date);
          this.dataBarChart[report_1] += report.hours;
        }

        this.horasTrabajadasEnTotal += report.hours;
      }
    });

    this.horasTrabajadasEnPromedio = (this.horasTrabajadasEnTotal / this.dataBarChart.length);

    this.barChartData.labels = this.labelsBarChart;
    this.barChartData.datasets[0].data = this.dataBarChart;

  }


  public filterReport() {


    const rangeTime: RangeTime = this.range.value;
    const { start, end } = rangeTime;

    if (start && end) {
      this.mostrar = false;
      const endMoment = moment(end).add(1, 'days');
      rangeTime.end = endMoment.toDate();

      this.reportService.getAllTimeData(rangeTime, this.idUser)
        .subscribe((reports: ResponseTimeData) => {

          // Organizar reportes del m??s reciente al m??s antiguo
          let reportes = reports.reports.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          this.labelsChart = [];
          this.dataChart = [];
          this.backgroundColors = [];

          this.labelsBarChart = [];
          this.dataBarChart = [];

          this.horasTrabajadasEnTotal = 0;

          // console.log(this.labelsBarChart.length);

          // Llenar tabla de detalle
          this.fillDetailTable(reportes);
          // Generar el Pie Chart
          this.generatePieChart(reportes);
          // Generar el Bar Chart
          this.generateBarChart(reportes);

          this.mostrar = true;

        },
          (error) => this.sweetAlert.presentError('Error obteniendo rango de datos!'));
    }


  }



  private generateBackgroundColors() {

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
