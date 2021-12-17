import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss']
})
export class PieGraphComponent implements OnInit 
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie graph
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    // labels: [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ],
    labels: ['Pausas Activas','Auditoría Daviplata', 'Daily'],
    datasets: [ {
      data: [ 2, 15, 20 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';

  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
