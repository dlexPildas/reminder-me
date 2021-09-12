import { ToastService } from './../../../../shared/services/toast.service';
import { Reminder } from 'src/app/pages/reminder/models/reminder';
import { ReminderService } from './../../services/reminder.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.scss'],
})
export class ReminderCreateComponent implements OnInit {
  @Input() reminderId: number;

  reminderForm: FormGroup;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private reminderService: ReminderService,
    private router: Router,
    private modalController: ModalController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.initializeForm();
    if (this.reminderId) {
      return this.loadReminder();
    }
  }

  loadReminder(): void {
    this.reminderService.getReminderById(this.reminderId)
      .subscribe(
        (reminder: Reminder) => {
          this.reminderForm.setValue({
            date: this.returnDateFormated(reminder.reminderDate),
            icon: reminder.icon,
            description: reminder.description
          });
        }
      );
  }

  initializeForm(): void {
    const currentDate = new Date();
    const currentDateAsString = new Date(currentDate.getTime() -
      currentDate.getTimezoneOffset() * 60000).toISOString();

    this.reminderForm = this.formBuilder.group({
      date: [currentDateAsString, Validators.required],
      icon: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  createReminder(): void {
    const reminder = this.returnReminderFormated();

    this.reminderService.addReminder(reminder)
      .pipe(
        finalize(() => this.closeModal())
      )
      .subscribe(
        () => this.toastService.presentToastSucess('Reminder was created with success'),
        () => this.toastService.presentToastError('There was an error to create a reminder')
      );
  }

  editReminder(): void {
    const reminder = {
      id: this.reminderId,
      ...this.returnReminderFormated()
    } as Reminder;

    this.reminderService.updateReminder(reminder)
      .pipe(
        finalize(() => this.closeModal())
      )
      .subscribe(
        () => this.toastService.presentToastSucess('Reminder was edited with success'),
        () => this.toastService.presentToastError('There was an error to edit a reminder')
      );
  }

  returnReminderFormated(): Reminder {
    const reminderDate = new Date(this.reminderForm.value.date);
    const reminder = {
      ...this.reminderForm.value,
      reminderDate
    } as Reminder;

    return reminder;
  }

  closeModal(): void {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  returnDateFormated(reminderDate: Date): string {
    const date = new Date(reminderDate);
    return new Date(date.getTime() -
      date.getTimezoneOffset() * 60000).toISOString();
  }

}
