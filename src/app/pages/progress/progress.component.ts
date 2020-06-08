import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent implements OnInit {

  bluePercentage: number = 20;
  greenPercentage: number = 60;

  constructor() { }

  ngOnInit(): void {
  }

  update(event: number){
    this.bluePercentage = event;
  }

}
