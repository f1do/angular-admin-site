import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
  this.subscription = this.returnObservable().pipe(retry(2))
    .subscribe(
      num => console.log('Subs', num),
      error => console.log('Error in obs', error),
      () => console.log('Todo Terminó con éxito!')
    );
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('Closing page!');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter ++;

        const exit = {
          value: counter
        };

        observer.next(exit);

        // if (counter === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (counter === 2) {
        //   clearInterval(interval);
        //   observer.error('Help!');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.value),
      filter((resp, ndx) => {
        return resp % 2 === 1;
      })
      );
  }

}
