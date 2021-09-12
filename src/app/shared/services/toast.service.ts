import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
  ) { }

  async presentToastSucess(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'font-weight-bold',
      color: 'success',
      message,
      duration: 2000,
      buttons: [
        {
          side: 'end',
          icon: 'happy',
          text: ''
        }
      ]
    });
    toast.present();
  }

  async presentToastError(message: string) {
    const toast = await this.toastController.create({
      color: 'danger',
      message,
      duration: 2000
    });
    toast.present();
  }
}
