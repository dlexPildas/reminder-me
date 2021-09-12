import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReminderPageRoutingModule } from './reminder-routing.module';
import { ReminderPage } from './reminder.page';
import { ReminderCreateComponent } from './components/reminder-create/reminder-create.component';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReminderPageRoutingModule,
    SharedModule
  ],
  declarations: [
    ReminderPage,
    ReminderListComponent,
    ReminderCreateComponent
  ]
})
export class ReminderPageModule { }
