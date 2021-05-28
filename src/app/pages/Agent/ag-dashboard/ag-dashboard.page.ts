import { NetworkService } from 'src/app/services/network.service';
import { User } from './../../../models/user';
import {
  PropertiesService
} from 'src/app/services/properties.service';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MenuController,
  AlertController,
  IonContent,
  ToastController,
  IonInfiniteScroll,
  LoadingController
} from '@ionic/angular';
import {
  NavigationExtras,
  Router
} from '@angular/router';
import {
  Properties
} from 'src/app/models/properties';
import {
  BehaviorSubject, merge, Observable, Subject
} from 'rxjs';
import {
  MessagesService
} from 'src/app/services/messages.service';
import {
  AlertService
} from 'src/app/services/alert.service';
import {
  CallNumber
} from '@ionic-native/call-number/ngx';
import { ConnectionService } from 'ng-connection-service';
import { map, mergeMap, startWith } from 'rxjs/operators';

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
  name: string = '';
  username: string = '';
  email: string = '';
  bio: string = '';
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
  cpt_agent_properties: Properties[];
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
  showLoadMoreButton: boolean = false; 
  loader = false;

// RXJS reactive system
  // properties data
  propertiesList$: Properties[];
  propertyList$: Observable<Properties[]>;
  propList$: Observable<Properties[]>;
  // user data
  id: User;
  currentUser: User[];
  currentUser$: Observable<User[]>;
  currentObject$: Observable<User[]>;
  user: User;
  // refresh data subject reactive
  refreshDataClickSubject = new Subject();
  model$: Observable<{ properties: Properties[]}>;
  modelUser$: Observable<{ user: User[]}>;


  constructor(
    private menu: MenuController,
    public loadingController: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    private callNumber: CallNumber,
    private alertService: AlertService,
    private authService: AuthService,
    private propertyService: PropertiesService,
    private messageService: MessagesService,
    private networkService: NetworkService,
    private connectionService: ConnectionService
  ) {
      this.id = this.authService.currentUserValue.user; 
      console.log(this.authService.currentUserValue.user.id);
      
    this.menu.enable(true);
    this.collapse_trigger_prop.next('collapse');
    this.collapse_trigger_mess.next('collapse');
  }

  receiveMessage(data) {
    this.agent_id =  this.id.role_id;
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
  async ngOnInit() {
    // Agent properties not paginated
    this.propertyService.getAgentPropertiesNoPaginate()
   .subscribe( (data: Properties[]) => {
     this.cpt_agent_properties = data['properties'].length;
   })
    // Agent profile infos
    this.agentInfos();
    // Agent properties
    this.propsList()
    // Agent Messages
    this.messageList()

    this.getAgentProperties(); 
  }
  async agentInfos() {
    const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
   const refreshTrigger$ = refreshDataClick$.pipe(
     startWith({})
   );
  //  Agent profile infos
   this.currentObject$ = this.authService.userInfos();
   this.currentUser$ = refreshTrigger$.pipe(
    mergeMap(() => this.currentObject$)
  )
  this.currentUser$.subscribe((data) => {
    this.currentUser = data;
    console.log(this.currentUser);
    
  }) 
  this.currentPage = 1;
  this.modelUser$ = merge(
    refreshTrigger$.pipe(map(() => ({ user: []}))),
    this.currentUser$.pipe(map(user => ({ user: user})))
  );  
  }
  async messageList() {
     // Agent Messages
     this.messageService.getAgentMessages().subscribe(async (data: any) => {
      this.messagesList = data;
      console.log(this.messagesList);
    })
  }
  async propsList() {
    console.log(this.id);
    
    const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
    const refreshTrigger$ = refreshDataClick$.pipe(
      startWith({})
    );
    this.propertyList$ = this.propertyService.getAgentProperties(this.id.id, this.currentPage);
    // Agent properties
    this.propList$ = refreshTrigger$.pipe(
      mergeMap(() => this.propertyList$)
    )
    this.propList$.subscribe((data) => {
      this.showData = true;
      this.displayedList = data;
    }) 
    this.currentPage = 1;
    this.model$ = merge(
      refreshTrigger$.pipe(map(() => ({ properties: []}))),
      this.propList$.pipe(map(properties => ({ properties: properties})))
    );  
  }
 
  ionViewWillEnter() {
    // this.refreshDataClickSubject.next();
    console.log("TabX is enter")
    return this.connectionService.monitor().subscribe(() => {
      if (this.networkService.isConnected) {
        this.showLoadMoreButton = true;
        this.currentPage = 1;
        this.ngOnInit();
      }
      else {
        this.showData = false;
      }
    })
  }
  doRefresh(event: any) {
    setTimeout(() => {
      this.showLoadMoreButton = true;
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
    this.authService.logout();
  }
  onCallCustomer(phone: any) {
    return this.callNumber.callNumber(phone.toString(), true)
      .then(res => console.log('Launched dialer! Number called = ' + phone.toString(), res))
      .catch(err => console.log('Error launching dialer ! Number called = ' + phone.toString(), err))
  }
  getAgentProperties() {
   this.propertyService.getAgentProperties(this.id.id, this.currentPage)
   .subscribe( (data: Properties[]) => {
     this.propertiesList$ = data;
     this.showData = true;
     console.log(this.propertiesList$);
   })
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
      console.log(this.id.id);
      
      this.propertyList$ = this.propertyService.getAgentProperties(this.id.id, this.currentPage)
      const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
      const refreshTrigger$ = refreshDataClick$.pipe(
        startWith({})
      );
      this.propList$ = refreshTrigger$.pipe(
        mergeMap(() => this.propertyList$)
      )
      // console.log(this.propertyList$);
      
      this.propList$.subscribe(async (data) => {
        console.log(data);
        
        this.propertiesList$ = this.propertiesList$.concat(data);
        this.displayedList = this.propertiesList$;

         
        if (event !== null) {
          event.target.complete();
        }

        if (data.length < 10) {
          await toast.present().then();
          event.target.disabled = true;
        }
      }, (err) => {
        console.log(err);
      });
  }
  async loadMorePostsButton(event) {
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
      this.propertyList$ = this.propertyService.getAgentProperties(this.id.id, this.currentPage)
      const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
      const refreshTrigger$ = refreshDataClick$.pipe(
        startWith({})
      );
      this.propList$ = refreshTrigger$.pipe(
        mergeMap(() => this.propertyList$)
      )
      this.propList$.subscribe(async (data) => {
        this.propertiesList$ = this.propertiesList$.concat(data);
        this.displayedList = this.propertiesList$;
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
