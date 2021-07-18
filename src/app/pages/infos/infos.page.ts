import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.page.html',
  styleUrls: ['./infos.page.scss'],
})
export class InfosPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  isPersonalUp: boolean;
  isProfileUp: boolean;
  isUploadUp: boolean;
  isPropretiesUp: boolean;
  isMessagesUp: boolean;
  isPasswordUp: boolean;
  constructor() { }

  ngOnInit() {
  }

  ScrollToTop() {
    this.content.scrollToTop(1500);
  }

  toggleUp(section: string) {

    switch (section) {

      case 'profile':
        this.isProfileUp = !this.isProfileUp;
        break;
      case 'upload':
        this.isUploadUp = !this.isUploadUp;
        break;
      case 'profile':
        this.isProfileUp = !this.isProfileUp;
        break;
      case 'propreties':
        this.isPropretiesUp = !this.isPropretiesUp;
        break;
      case 'messages':
        this.isMessagesUp = !this.isMessagesUp;
        break;
      case 'edit_password':
        this.isPasswordUp = !this.isPasswordUp;
        break;
      default:
        this.isPersonalUp = !this.isPersonalUp;
        break;
    }
  }

}
