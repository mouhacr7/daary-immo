import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
const THEME_KEY = 'theme-switch';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {

  switch_theme = new BehaviorSubject<any>('');

  constructor(
     public storage: Storage
  ) { }


clickThemeSwitcher(ev: any, state_toggle) {
  let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  systemDark.addListener(this.colorTest);
  console.log(state_toggle);
  
  if(ev.detail.checked) {
    this.switch_theme.next(document.body.setAttribute('color-theme', 'dark'));
    return this.storage.set(THEME_KEY, ev.detail.checked);
  }
  else{
    this.switch_theme.next(document.body.setAttribute('color-theme', 'light'));
    return this.storage.set(THEME_KEY, ev.detail.unchecked);
  }
}
getThemeSwitch(){
  // console.log(this.storage.get(STORAGE_KEY));
  return this.storage.get(THEME_KEY).then( response => {
    if (response) {
      this.switch_theme.next(document.body.setAttribute('color-theme', 'dark'));
    } else {
      this.switch_theme.next(document.body.setAttribute('color-theme', 'light'));
    }
  });
}

  colorTest(systemInitiatedDark) {
  if (systemInitiatedDark.matches) {
    document.body.setAttribute('color-theme', 'dark');		
  } else {
    document.body.setAttribute('color-theme', 'light');
  }
  }

}