import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  toast;
  loading;
  constructor( 
    private alertCrtl: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController

  ) { }

  async basciAlert(header, message, buttons) {
    const alert = await this.alertCrtl.create({
      header,
      message,
      buttons
    });
    alert.present();
  }
  async presentToast(message: any, color) {
    const toast = await this.toastController.create({
    message,
    duration: 3000,
    position:'top',
    color,
  });
  toast.present();
  }
  async dismissToast() {
    return this.toast.dismiss()
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      // message: 'Chargement...',
      spinner: 'crescent',
    });
    await loading.present();
    
  }
  async dismissLoading() {
    const loader = this.loadingController.getTop();

    (await loader).parentNode.removeChild(await loader);
  }
}
