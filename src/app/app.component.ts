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
  // public selectedIndex = 0;
  // public appPages = [{
  //     title: 'Mon accueil',
  //     url: '/app-flow',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'Mes recherches',
  //     url: '/search-property',
  //     icon: 'paper-plane'
  //   },
  //   {
  //     title: 'Mes favoris',
  //     url: '/favorites',
  //     icon: 'heart'
  //   },
  //   {
  //     title: 'Mon compte',
  //     url: '/login',
  //     icon: 'person'
  //   },
  //   {
  //     title: 'Infos pratiques',
  //     url: '/infos',
  //     icon: 'information-circle'
  //   }
    // {
    //   title: 'Trouver une agence',
    //   url: '/find-agents',
    //   icon: 'archive'
    // },
    // {
    //   title: 'Vendre mon bien',
    //   url: '/upload-property',
    //   icon: 'cash'
    // },
  // ];
  isLoggedIn: boolean = false;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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