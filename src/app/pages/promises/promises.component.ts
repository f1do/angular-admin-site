import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countOnThree()
    .then(msg => console.log('Terminó!', msg))
    .catch(err => console.log('Terminó con error: ', err));

   }

  ngOnInit(): void {
  }

  countOnThree(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador++;
        if(contador === 3)
        {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    } );
  }

}
