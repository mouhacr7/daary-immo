import { Properties } from './../models/properties';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { TokenSessionStorageService } from './token-session-storage.service';
import { AlertService } from './alert.service';


const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  token: any;
  isLoggedIn: boolean;
  public uploadProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public downloadProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _refreshNeeded$ = new Subject<void>();
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private tokenSession: TokenSessionStorageService,
    private alertService: AlertService,
  ) {

    // this.token = this.tokenSession.getUser()['token'];
    // console.log(this.token);
  }
  
  getPosts(): Observable<Properties[]> {
    return this.http.get<Properties[]>(`/mobile/properties`, {})
    .pipe(
      tap(() => {
        console.log("properties loaded");
      }),
      catchError(this.handleError)
    );
  }
  getPostsPaginated(page_number: number): Observable<Properties[]> {
    return this.http.get<Properties[]>(`/mobile/properties?page=${page_number}`, {})
    .pipe(
      tap(_ => console.log('response received')),
      catchError(this.handleError)
    );
  }
  getAgentProperties(id: number, page_number: number): Observable<Properties[]> {
    return this.http.get<Properties[]>(`/mobile/agent/${id}/properties?page=${page_number}`, {})
    .pipe(
      tap(_ => console.log('response received')),
      catchError(this.handleError)
    );
  }
  getSingleProperty(id: number): Observable<Properties> {
    return this.http.get<Properties>(`/mobile/property/${id}`);
  }
  getFilteredProperties(request: any) {
    return this.http.get(`/mobile/search?${request}`)
  } 
  changePassword(data: any) {
    return this.http.post('/mobile/change_password', data)
    .pipe(
      tap( data => console.log('response received', data)),
      catchError(this.handleError)
    );
  } 
  addProperty(data: any): Observable<any>{
    const input = new FormData();
    input.append('title',data.title)
    input.append('purpose',data.purpose)
    input.append('type',data.type)
    input.append('price',data.price)
    input.append('cuisine',data.cuisine)
    input.append('douche',data.douche)
    input.append('image',data.image)
    input.append('bedroom',data.bedroom)
    input.append('bathroom',data.bathroom)
    input.append('city',data.city)
    input.append('address',data.address)
    input.append('area',data.area)
    input.append('floor_plan',data.floor_plan)
    input.append('description',data.description)
    if (data.image === '') {
      // input.append('image','')
    } else {
      input.append('image',data.image)
    }
    if (data.floor_plan === '') {
      // input.append('floor_plan','')
    } else {
      input.append('floor_plan',data.floor_plan)
    }

    if (typeof data.gallaryimage === 'undefined') {
      input.append("gallaryimage[]",  '');
    } else {
      for(var i =  0; i <  data.gallaryimage.length; i++)  {  
        input.append("gallaryimage[]",  data.gallaryimage[i]);
      } 
    }
    console.log(input.getAll(data));
    // this.alertService.presentLoading();
    return this.http.post('/mobile/add_property', input)
    .pipe(
      tap(response => {
        // this.alertService.dismissLoading();
        console.log(`add_property launched,` + response)
      }),
      catchError(this.handleError)
    );
  }
  updateAgentData(data: any): Observable<any> {
    const input = new FormData();
    input.append('name',data.name)
    input.append('username',data.username)
    input.append('email',data.email)
    input.append('phone_number', data.phone_number)
    input.append('image', data.image)
    console.log(input.getAll(data));
    
    return this.http.post(`/mobile/updateProfile`, input, {reportProgress: true})
    .pipe(
      tap(_ => console.log(`Agent profile updated`)),
      catchError(this.handleError)
    );
  }
  updatePropertyData(id: any, data: any): Observable<any> {
    const input = new FormData();
    input.append('title',data.title)
    input.append('purpose',data.purpose)
    input.append('type',data.type)
    input.append('price',data.price)
    input.append('cuisine',data.cuisine)
    input.append('douche',data.douche)
    input.append('bedroom',data.bedroom)
    input.append('bathroom',data.bathroom)
    input.append('city',data.city)
    input.append('address',data.address)
    input.append('area',data.area)
    input.append('description',data.description)
    
    if (data.image === '') {
      // input.append('image','')
    } else {
      input.append('image',data.image)
    }
    if (data.floor_plan === '') {
      // input.append('floor_plan','')
    } else {
      input.append('floor_plan',data.floor_plan)
    }

    if (typeof data.gallaryimage === 'undefined') {
      input.append("gallaryimage[]",  '');
    } else {
      for(var i =  0; i <  data.gallaryimage.length; i++)  {  
        input.append("gallaryimage[]",  data.gallaryimage[i]);
      } 
    }
    console.log(input.getAll(data));

    return this.http.post(`/mobile/update_property/${id}`, input).pipe(
      tap(_ => console.log(`updated property id=${id}`)),
      catchError(this.handleError)
    );
  } 
  deleteProperty(id: any,  property: any) {
    return this.http.post(`/mobile/delete_property/${id}`, property).pipe(
      tap(_ => console.log(`deleted property id=${id}`)),
      catchError(this.handleError)
    );
  
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
   console.log(errorMessage);
    return throwError(errorMessage);
  }

}
