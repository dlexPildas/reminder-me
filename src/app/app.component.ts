import { SqliteService } from './shared/services/sqlite.service';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/reminder', icon: 'home' },
    // { title: 'Novo lembrete', url: '/reminder/create', icon: 'alarm' },
    { title: 'Configurações', url: '/setting', icon: 'settings' },
    { title: 'Sobre', url: '/about', icon: 'person' }
  ];


  constructor() { }
}
