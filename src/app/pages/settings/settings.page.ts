import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
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
    private themeSwitch: ThemeSwitcherService
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

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('color-theme', 'dark');		
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }
}
