import { ThemeSwitcherService } from './services/theme-switcher.service';
import {
  Component
} from '@angular/core';
import {
  Platform
} from '@ionic/angular';
import {
  Plugins
} from '@capacitor/core';
const {

  SplashScreen
} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash: boolean = true;
  connectedStatus: boolean = false;
  isConnected = true;
  status: string;

  constructor(
    private platform: Platform,
    private themeSwitch: ThemeSwitcherService
  ) {
    this.initializeApp();
    this.themeSwitch.getThemeSwitch();
    
  }
  
  componentDidMount() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
     SplashScreen.hide();
    });
  }
}