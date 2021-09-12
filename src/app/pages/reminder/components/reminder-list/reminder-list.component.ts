import { ReminderService } from './../../services/reminder.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reminder } from '../../models/reminder';
import { Observable } from 'rxjs';

import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss'],
})
export class ReminderListComponent implements OnInit {
  @Input() title: string;
  @Input() reminders: Reminder[];
  @Input() onlyTime = true;

  @Output() editReminder = new EventEmitter<number>();
  @Output() deleteReminder = new EventEmitter<number>();

  constructor(
    public platform: Platform,
  ) { }

  ngOnInit() {

  }

  edit(reminderId: number): void {
    this.editReminder.emit(reminderId);
  }

  delete(reminderId: number): void {
    this.deleteReminder.emit(reminderId);
  }

}
