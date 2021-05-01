import { LoadingServiceService } from './services/loading-service.service';
import { ThemeSwitcherService } from './services/theme-switcher.service';
import {
  Component
} from '@angular/core';
import {
  MenuController,
  NavController,
  Platform
} from '@ionic/angular';
import {
  TokenSessionStorageService
} from './services/token-session-storage.service';
import {
  Plugins,
  StatusBarStyle
} from '@capacitor/core';
const {
  StatusBar,
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
  isLoggedIn: boolean = false;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private tokenSession: TokenSessionStorageService,
    private themeSwitch: ThemeSwitcherService
  ) {
    this.initializeApp();
    this.themeSwitch.getThemeSwitch();
  }
  logout() {
    this.tokenSession.signOut();
    // window.location.reload();
    this.navCtrl.navigateRoot('app-flow')
    this.menuCtrl.close();
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