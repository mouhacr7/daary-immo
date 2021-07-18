import { ToastController } from '@ionic/angular';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ThemeSwitcherService } from 'src/app/services/theme-switcher.service';

const THEME_KEY = 'theme-switch';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  state_toggle: boolean;
  constructor(
    public storage: Storage,
    private themeSwitch: ThemeSwitcherService,
    private alertService: AlertService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.storage.get(THEME_KEY).then(response => {
     if (response) {
       this.state_toggle = true
     } else {
       this.state_toggle = false
     }
     console.log(this.state_toggle);
    });
  }

  onClick(event, toggle){
   this.themeSwitch.clickThemeSwitcher(event, toggle);
  }

  onClickLanguage(ev: any) {
    this.toastController.create({
    message: 'Fonctionnalité en construction, disponible dans la prochaine version de daary',
    duration: 3000,
    position:'top',
    color: 'warning',
    }).then((alert) => alert.present());
    // this.alertService.toast('','')
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('color-theme', 'dark');		
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }
}
