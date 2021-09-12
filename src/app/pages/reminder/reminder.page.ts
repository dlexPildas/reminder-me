import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize, map, take, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ReminderCreateComponent } from './components/reminder-create/reminder-create.component';
import { Reminder } from './models/reminder';
import { ReminderService } from './services/reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  remindersToday$: Observable<Reminder[]>;
  remindersAfterToday$: Observable<Reminder[]>;
  reminders$: Observable<Reminder[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reminderService: ReminderService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(() => this.loadReminders());
  }

  loadReminders(event = null): void {
    const todayDate = new Date();
    const yesterdayDate = new Date();

    todayDate.setHours(23, 59, 59);
    yesterdayDate.setHours(0, 0, 0);

    this.reminders$ = this.reminderService
      .getReminders()
      .pipe(
        finalize(() => event?.target?.complete()),
      );

    this.remindersToday$ = this.reminders$
      .pipe(
        map(result => result.filter(x => new Date(x.reminderDate) >= yesterdayDate && new Date(x.reminderDate) <= todayDate)),
      );

    this.remindersAfterToday$ = this.reminders$
      .pipe(
        map(result => result.filter(x => new Date(x.reminderDate) > todayDate)),
      );
  }

  deleteReminder(reminderId: number): void {
    this.reminderService
      .deleteReminder(reminderId)
      .subscribe(
        () => {
          this.toastService.presentToastSucess('Reminder was deleted with success');
          this.loadReminders();
        },
        () => this.toastService.presentToastError('There was an error to delete the reminder'));
  }

  async openModalToCreateReminder(): Promise<void> {
    const modal = await this.modalController
      .create({
        component: ReminderCreateComponent,
      });

    modal.present();
    modal.onDidDismiss().then(() => this.loadReminders());
  }

  async openModalToEditReminder(reminderId: number) {
    const modal = await this.modalController
      .create({
        component: ReminderCreateComponent,
        componentProps: {
          reminderId
        }
      });

    modal.present();
    modal.onDidDismiss().then(() => this.loadReminders());
  }
}
