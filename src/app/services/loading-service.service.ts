import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCOmpleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined
  }

  loadingOn(){
    console.log('loading on');
    
    this.loadingSubject.next(true)
  }
  loadingOff() {
    console.log('loading off');

    this.loadingSubject.next(false)
  }
  
  // constructor() { }
}
