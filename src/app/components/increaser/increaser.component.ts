import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyend: string = 'Leyend';
  @Input() percentage: number = 50;

  @Output() ChangeValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChanges(newVal: number){
    if (newVal >= 100) { this.percentage = 100; }
    else if (newVal <= 0 || !newVal) { this.percentage = 0; }
    else { this.percentage = newVal; }

    this.txtProgress.nativeElement.value = this.percentage;

    this.ChangeValue.emit(this.percentage);

    this.txtProgress.nativeElement.focus();
  }

  changeValue(value: number){
    if (this.percentage < 100 && this.percentage > 0 ||
       ((this.percentage >= 100 && value < 0) || (this.percentage <= 0 && value > 0)))
    {
        this.percentage += value;
        this.ChangeValue.emit(this.percentage);
    }
  }

}
