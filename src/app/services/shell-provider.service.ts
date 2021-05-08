import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { delay, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShellProvider<T> {

  private _observable: Observable<T>;

  // A Subject that requires an initial value and emits its current value to new subscribers
  // If we choose a BehaviorSubject, new subscribers will only get the latest value (real data).
  // This is useful for repeated use of the resolved data (navigate to a page, go back, navigate to the same page again)
  private _subject: BehaviorSubject<T>;

  // We wait on purpose 2 secs on local environment when fetching from json to simulate the backend roundtrip.
  private networkDelay = 2000;

  constructor(shellModel: T, dataObservable: Observable<T>) {
    // Set the shell model as the initial value
    this._subject = new BehaviorSubject<T>(shellModel);

    const delayObservable = of(true).pipe(
      delay(this.networkDelay)
    );

    dataObservable.pipe(
      first() // Prevent the need to unsubscribe because .first() completes the observable
    );

    // Put both delay and data Observables in a forkJoin so they execute in parallel so that
    // the delay caused (on purpose) by the delayObservable doesn't get added to the time the dataObservable takes to complete
    const forkedObservables = forkJoin(
      delayObservable,
      dataObservable
    )
    .pipe()
    .subscribe(([delayValue, dataValue]: [boolean, T]) => {
      this._subject.next(dataValue);
    });

    this._observable = this._subject.asObservable();
  }

  public get observable(): Observable<T> {
    return this._observable;
  }
}
