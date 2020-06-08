import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styles: [
  ]
})
export class DoughnutGraphComponent implements OnInit {

  @Input() doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  @Input() doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
