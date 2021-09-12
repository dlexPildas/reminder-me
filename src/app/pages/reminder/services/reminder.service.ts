import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reminder } from './../models/reminder';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private baseUrl = `${environment.baseUrl}/reminder`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getReminders(): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.baseUrl}`);
  }

  getReminderById(reminderId: number): Observable<Reminder> {
    return this.http.get<Reminder>(`${this.baseUrl}/${reminderId}`);
  }

  addReminder(reminder: Reminder) {
    return this.http.post(
      `${this.baseUrl}`,
      reminder,
    );
  }

  updateReminder(reminder: Reminder): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}`, reminder);
  }

  deleteReminder(reminderId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${reminderId}`);
  }
}
