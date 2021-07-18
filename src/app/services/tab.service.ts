import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  
  tabChange: any;
  onClick: any;
  constructor(private platform: Platform){
  }
  
  public changeTabInContainerPage(ev: any) {
    console.log(ev);
    
  }
}
