import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { ConnectionService } from 'ng-connection-service';

@Injectable({
  providedIn: 'root'
})

export class NetworkService {
  isConnected = true;
  status: string;
  constructor(
    private connectionService: ConnectionService,
    private alertService: AlertService
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      console.log(this.isConnected);
      
      if (this.isConnected) {
        this.status = "Vous êtes en ligne";
        console.log( this.status);
        this.alertService.presentToast(this.status,'success')
      }
      else {
        this.status = "Vous êtes déconnecté";
        console.log( this.status);
        this.alertService.presentToast(this.status,'danger')
      }
    })
  }
   
  
}