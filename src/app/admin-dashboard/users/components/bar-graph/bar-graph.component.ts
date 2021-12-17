import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit 
{
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
  public barChartData: ChartData<'bar'> = {
    labels: [ '10 Dic', '11 Dic', '12 Dic', '13 Dic', '14 Dic', '15 Dic', '16 Dic', '17 Dic' ],
    datasets: [
      { data: [ 7, 8, 7.5, 7, 6, 5.5, 4, 6, 5, 4, 3 ], label: 'Horas Trabajadas' }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
