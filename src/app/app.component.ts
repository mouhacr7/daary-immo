import { Component } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { TokenSessionStorageService } from './services/token-session-storage.service';
import { Plugins, StatusBarStyle } from '@capacitor/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash: boolean = true;
  connectedStatus: boolean = false;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Mon accueil',
      url: '/app-flow',
      icon: 'home'
    },
    {
      title: 'Mes recherches',
      url: '/search-property',
      icon: 'paper-plane'
    },
    {
      title: 'Mes favoris',
      url: '/favorites',
      icon: 'heart'
    },
    {
      title: 'Mon compte',
      url: '/login',
      icon: 'person'
    },
    {
      title: 'Infos pratiques',
      url: '/infos',
      icon: 'information-circle'
    }
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
  ];
  isLoggedIn: boolean = false;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private tokenSession: TokenSessionStorageService,
  ) {
    this.initializeApp();
  }
  logout() {
    this.tokenSession.signOut();
    // window.location.reload();
    this.navCtrl.navigateRoot('app-flow')
    this.menuCtrl.close();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Light });
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#CDCDCD' });
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
}
