import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styles: [
  ]
})
export class GraphicsComponent implements OnInit {

  graphics: any = {
    'graphic1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyend': 'El pan se come con'
    },
    'graphic2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyend': 'Entrevistados'
    },
    'graphic3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyend': '¿Le dan gases los frijoles?'
    },
    'graphic4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyend': '¿Le importa que le den gases?'
    },
  };

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
