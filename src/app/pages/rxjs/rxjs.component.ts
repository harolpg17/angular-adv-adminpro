import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {    
        
    // this.retornaObservable()
    //   .pipe(
    //     retry(1)
    //   )
    //   .subscribe(
    //   valor => console.log('Subs: ' + valor),
    //   error => console.warn('Error: ' + error),
    //   () => console.info('Obs completado'));

    // this.retornaIntervalo()
    //   .subscribe(
    //     valor => console.log(valor)
    //   );

    this.intervalSubs = this.retornaIntervaloUnsubcribe()
      .subscribe(
        valor => console.log(valor)
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  

  retornaIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        take(50),
        map(valor => valor + 1),
        filter(valor => valor % 2 === 0),
      );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    
    return new Observable<number>(observer => {
      
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {          
          observer.error('i llego al valor 2');
        }

      }, 1000)
    });
  }

  retornaIntervaloUnsubcribe(): Observable<number> {
    return interval(100)
      .pipe(        
        map(valor => valor + 1),
        filter(valor => valor % 2 === 0),
      );
  }

}
