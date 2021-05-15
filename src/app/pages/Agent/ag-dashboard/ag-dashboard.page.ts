import {
  PropertiesService
} from 'src/app/services/properties.service';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MenuController,
  NavController,
  AlertController,
  IonContent,
  ToastController,
  IonInfiniteScroll,
  LoadingController
} from '@ionic/angular';
import {
  User
} from 'src/app/models/user';
import {
  TokenSessionStorageService
} from 'src/app/services/token-session-storage.service';
import {
  NavigationExtras,
  Router
} from '@angular/router';
import {
  Properties
} from 'src/app/models/properties';
import {
  BehaviorSubject
} from 'rxjs';
import {
  MessagesService
} from 'src/app/services/messages.service';
import {
  DOCUMENT
} from '@angular/common';
import {
  AlertService
} from 'src/app/services/alert.service';
import {
  CallNumber
} from '@ionic-native/call-number/ngx';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-ag-dashboard',
  templateUrl: './ag-dashboard.page.html',
  styleUrls: ['./ag-dashboard.page.scss'],
})
export class AgDashboardPage implements OnInit {

  @ViewChild(IonContent, {
    static: false
  }) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  propertiesList: Properties[] = [];
  displayedList: Properties[];
  messagesList = [];
  property: Properties;
  users: User;
  name: string = '';
  username: string = '';
  email: string = '';
  bio: string = '';
  currentUser: any;
  role: string;
  isPersonalUp: boolean;
  isProfileUp: boolean;
  isUploadUp: boolean;
  isPropretiesUp: boolean;
  isMessagesUp: boolean;
  isPasswordUp: boolean;
  sameShipping: boolean;
  agent_id: number;
  idx = new BehaviorSubject < any > ('');
  propertyID: number;
  cpt_number: number = 1;
  showData = false;
  // Format data to receive 

  editProfileStatus = false;
  token: any;
  currentPage = 1;
  loading: HTMLIonLoadingElement;
  collapse_trigger_prop = new BehaviorSubject < any > ('');
  collapse_trigger_mess = new BehaviorSubject < any > ('');
  isLoggedIn: boolean = false;
  status = 'ONLINE';
  isConnected = true;
  showLoadMoreButton: boolean = true; 

  constructor(
    private menu: MenuController,
    public loadingController: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private propertiesServices: PropertiesService,
    public toastController: ToastController,
    private callNumber: CallNumber,
    private tokenSession: TokenSessionStorageService,
    private alertService: AlertService,
    private authService: AuthService,
    private propertyService: PropertiesService,
    private messageService: MessagesService,
    private connectionService: ConnectionService
  ) {
    this.menu.enable(true);
    this.collapse_trigger_prop.next('collapse');
    this.collapse_trigger_mess.next('collapse');
  }

  receiveMessage(data) {
    this.users = this.tokenSession.getUser();
    this.agent_id = this.users.user.role_id;
    console.log(data);

    //call service/api to post message
    this.alertService.presentLoading();
    this.propertyService.addProperty(data).subscribe(
      response => {
        this.alertService.dismissLoading();
        this.alertService.presentToast('Popriété insérée avec succés :) ', 'success');
        this.currentPage = 1;
        this.ngOnInit();
        console.log(response)
      },
      error => {
        this.alertService.dismissLoading()
        this.alertService.presentToast('Vous avez oubliez certains champs :( !! vérifier à nouveau les données entrées :) ', 'danger')
        console.log('Something went wrong!', error);
      }
    );
  }
  receiveDataEditPassword(data) {
    console.log(data);
    this.alertService.presentLoading();
    this.propertyService.changePassword(data).subscribe(
      data => {
        this.alertService.dismissLoading();
        this.alertService.presentToast('Mot de passe modifié avec succés :) ', 'success');
        console.log('Password succesfully edited', data);
        this.currentPage = 1;
        this.ngOnInit();
      },
      error => {
        this.alertService.presentToast('Erreur au moment de l\'insertion des données :) ', 'danger');
        this.alertService.dismissLoading();
        console.log('Something went wrong!', error);
      }
    );
  }

  receiveUpdatedDate(data) {
    console.log(data);
    //call service/api to post message
    this.alertService.presentLoading();
    this.propertyService.updateAgentData(data).subscribe(
      data => {
        this.alertService.dismissLoading();
        this.alertService.presentToast('Informations modifiées avec succés :) ', 'success');
        this.currentPage = 1;
        this.ngOnInit();
        console.log('Profile succesfully edited', data);
      },
      error => {
        this.alertService.presentToast('Les informations saisies sont incomplètes :(, veuillez resaisir les informations correctement ', 'danger');
        this.alertService.dismissLoading();
        console.log('Something went wrong!', error);
      }
    );
  }
  async loadingFunction() {
    this.loading = await this.loadingController.create({
      message: 'Veuillez patienter...',
      spinner: 'crescent',
      duration: 2000
    });
    await this.loading.present();
  }
  ngOnInit() {
    // this.authService.getToken().then(() => {
    //   console.log(this.authService.isLoggedIn);
    //   if(this.authService.isLoggedIn) {
    //     this.router.navigateByUrl('/ag-dashboard');
    //     this.alertService.presentToast('Vous étes déjà connecté :)', 'success')
    //   } else {
    //     this.router.navigateByUrl('/login');
    //     this.alertService.presentToast('Vous étes déconnecté :)', 'danger')
    //   }
    // });
    if (this.tokenSession.getUser()['token']) {
      this.isLoggedIn = true;
      this.users = this.tokenSession.getUser();
      this.token = this.tokenSession.getUser()['token'];
      console.log(this.token);
      this.currentUser = this.users.user;
    }
    if (this.currentUser.role_id == 2) {
      this.role = 'agent';
    } else {
      this.role = 'user';
    }
    console.log(this.currentUser.id)

    this.loadingFunction();
    // Agent properties
    this.propertyService.getPosts().subscribe( (properties: Properties[]) => {
      console.log([...properties]);
    })

    this.propertyService.getAgentProperties(this.currentUser.id, this.currentPage).subscribe(async (data: Properties[]) => {
      this.propertiesList = data;
      this.displayedList = [...this.propertiesList];
      console.log(this.propertiesList)

    });
    // Agent Messages
    this.messageService.getAgentMessages().subscribe(async (data: any) => {
      this.messagesList = data;
      console.log(this.messagesList);
    })
  }
  ionViewWillEnter() {
    // this.refreshDataClickSubject.next();
    console.log("TabX is enter")
    return this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      console.log(this.isConnected);
      
      if (this.isConnected) {
        this.showLoadMoreButton = true;
        this.currentPage = 1;
        this.status = "ONLINE";
        console.log( this.status);
        this.alertService.presentToast(this.status,'success')
        this.ngOnInit();
      }
      else {
        this.showData = false;
        this.status = "OFFLINE";
        console.log( this.status);
        this.alertService.presentToast(this.status,'danger')
      }
    })
  }
  doRefresh(event: any) {
    setTimeout(() => {
      this.currentPage = 1;
      this.ngOnInit();
      event.target.complete();  // This is a must for us to perform the method
    }, 1000);  // 1000 means that the execution time is within 1s. If the execution is slow, this needs to be increased.
  }

  async deleteAlertConfirm(id: number) {
    this.idx.next(id);
    console.log(this.idx.getValue());
    const alert = await this.alertCtrl.create({
      header: 'Attention!',
      message: 'Vous confirmez la suppréssion la propriété ' + this.idx.getValue() + '?',
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Annulation confirmée !');
        }
      }, {
        text: 'Supprimer',
        handler: () => {
          this.onDelete(this.idx.getValue())
          console.log('Suppréssion confirmée');
        }
      }]
    });
    await alert.present();
  }
  onDelete(id: number) {
    let extras;
    this.alertService.presentLoading();
    this.propertyService.deleteProperty(id, extras)
      .subscribe(
        () => {
          this.alertService.dismissLoading()
          this.alertService.presentToast('Popriété supprimée avec succés :) ', 'success');
          this.displayedList = this.displayedList.filter((item) => {
            return item.id !== id;
          });
          this.displayedList = [...this.displayedList];
          this.currentPage = 1;
          this.ngOnInit();
        },
        err => {
          this.alertService.presentToast('Une erreur s\'est produite :( !! veuillez réessayer ', 'danger')
          this.alertService.dismissLoading()
          console.log(err);
        });

  }


  editProfileToggle() {
    this.editProfileStatus = !this.editProfileStatus;
  }
  propertyDetails(id: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate([`/property-details/`+id], navigationExtras);
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast('Vous étes déconnecté :)', 'danger');        
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigate(['/app-flow']);
      }
    );
  }
  onCallCustomer(phone: any) {
    return this.callNumber.callNumber(phone.toString(), true)
      .then(res => console.log('Launched dialer! Number called = ' + phone.toString(), res))
      .catch(err => console.log('Error launching dialer ! Number called = ' + phone.toString(), err))
  }
  async loadMorePosts(event) {
    const toast = await this.toastController.create({
      message: 'Fin de liste :)',
      animated: true,
      duration: 5000,
      buttons: [{
        text: 'Done',
        role: 'cancel',
        icon: 'close'
      }]
    });
 
      this.currentPage++;
      this.propertyService.getAgentProperties(this.currentUser.id,this.currentPage).subscribe(async (data: Properties[]) => {
        this.propertiesList = this.propertiesList.concat(data);
        this.displayedList = [...this.propertiesList];
        console.log(this.displayedList);
        

        if (data.length < 10) {
          this.showLoadMoreButton = false;
          await toast.present().then();
        }
      }, (err) => {
        console.log(err);
      });
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  ScrollToTop() {
    this.content.scrollToTop(1500);
  }
  scrollProperties(el: HTMLElement) {
    el.scrollIntoView();
    this.isPropretiesUp = true;
    this.collapse_trigger_prop.next('collapse show');
  }
  scrollMessages(el: HTMLElement) {
    el.scrollIntoView();
    this.isMessagesUp = true;
    this.collapse_trigger_mess.next('collapse show');
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
