import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  enableNotifications = false;
  sendEmail = false;
  minutesBeforeReminder = 5;
  messageErrorInApp = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  navigateToHome(): void {
    this.router.navigateByUrl('reminder');
  }

}
