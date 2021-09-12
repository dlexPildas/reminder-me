import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  isRegister = false;

  constructor() {
    //this.initialize();
  }

  initialize(): void {
    console.log('Was did initialize');
    this.requestPermission();
    this.register();
    this.erroNotification();
    this.pushNotificationReceived();
    this.whereToGoWhenTappingNotification();
  }

  requestPermission(): void {
    PushNotifications.requestPermissions()
      .then(result => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        }
      });
  }

  register(): void {
    PushNotifications.addListener('registration',
      (token: Token) => {
        this.isRegister = true;
      }
    );
  }

  erroNotification(): void {
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );
  }

  pushNotificationReceived(): void {
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );
  }

  whereToGoWhenTappingNotification(): void {
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => { }
    );
  }
}
