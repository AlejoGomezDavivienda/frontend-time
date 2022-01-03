import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gantt-graph',
  templateUrl: './gantt-graph.component.html',
  styleUrls: ['./gantt-graph.component.scss']
})
export class GanttGraphComponent implements OnInit 
{
  config = {
    columns: [
      {type: 'string', name: 'ID', field: 'id'},
      {type: 'string', name: 'Name', field: 'name'},
      {type: 'date', name: 'Start Date', field: 'startDate'},
      {type: 'date', name: 'End Date', field: 'endDate'},
      {type: 'number', name: 'Duration', field: 'duration'},
      {type: 'number', name: 'Percentage Complete', field: 'percentComplete'},
      {type: 'string', name: 'Pending Reasons', field: 'pendingReasons'}
    ], data: [
      {
        id: 'setup',
        name: 'Angular',
        startDate: new Date(2021, 2, 10),
        endDate: new Date(2021, 2, 15),
        duration: 2,
        percentComplete:  100,
        pendingReasons: null
      }, {
        id: 'Start Development',
        name: 'Login Feature',
        startDate: new Date(2021, 2, 13),
        endDate: new Date(2021, 2, 14),
        duration: 2,
        percentComplete:  0,
        pendingReasons: null
      },{
        id: 'Test',
        name: 'Test Login Feature',
        startDate: new Date(2021, 2, 16),
        endDate: new Date(2021, 2, 17),
        duration: 2,
        percentComplete:  0,
        pendingReasons: null
      }, {
        id: 'Deploy',
        name: 'Deploy to server',
        startDate: new Date(2021, 2, 18),
        endDate: new Date(2021, 2, 18),
        duration: 1,
        percentComplete:  0,
        pendingReasons: null
      }
    ],
    options: {
      height: 275,
      gantt: {
        criticalPathEnabled: false,
        innerGridHorizLine: {
          stroke: '#ffe0b2',
          strokeWidth: 2
        },
        innerGridTrack: {fill: '#fff3e0'},
        innerGridDarkTrack: {fill: '#ffcc80'}
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
