import { AfterViewInit, Component } from '@angular/core';

declare const $: any
declare const jvm:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'frontend-time';

  ngAfterViewInit(): void {


    // $('#world-map').vectorMap({
    //   map: 'world_mill_en',
    //   backgroundColor: '#a5bfdd',
    //   borderColor: '#818181',
    //   borderOpacity: 0.25,
    //   borderWidth: 1,
    //   color: '#f4f3f0',
    //   enableZoom: true,
    //   hoverColor: '#c9dfaf',
    //   hoverOpacity: null,
    //   normalizeFunction: 'linear',
    //   scaleColors: ['#b6d6ff', '#005ace'],
    //   selectedColor: '#c9dfaf',
    //   selectedRegions: null,
    //   showTooltip: true
    // })
  }
}
