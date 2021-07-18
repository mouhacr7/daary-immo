import { LoadingServiceService } from './loading-service.service';
import { HttpClient } from '@angular/common/http';
import { Properties } from './../models/properties';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, shareReplay, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private subject = new BehaviorSubject<Properties[]>([]);

  properties$ : Observable<Properties[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingServiceService,

  ) { 
  }

    public loadProperties(page_number: number) {
     return this.http.get<Properties[]>(`/mobile/properties?page=${page_number}`, {})
      .pipe(
        map(res => res['properties']['data']),
        shareReplay(),
        catchError(err => () =>{
          console.log(err);
          return throwError(err);
        }),
        tap(properties => this.subject.next(properties))
      );
        // console.log(loadProperties$);
        
      // this.loading.showLoaderUntilCOmpleted(loadProperties$)
      // .subscribe();
    }

}
