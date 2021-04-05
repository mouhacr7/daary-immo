import {
  Properties
} from './../../models/properties';
import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MenuController,
  LoadingController,
  IonInfiniteScroll,
  ToastController
} from '@ionic/angular';
import {
  PropertiesService
} from './../../services/properties.service';
import {
  Router
} from '@angular/router';
import {
  DOCUMENT
} from '@angular/common';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-app-flow',
  templateUrl: './app-flow.page.html',
  styleUrls: ['./app-flow.page.scss'],
})
export class AppFlowPage implements OnInit {
  like: boolean;
  count: number = 0;
  propertiesList: Properties[] = [];
  posts: any[] = [];
  totalPosts = 0;
  currentPage = 1;
  limit = 10;
  loading: any;
  property: Properties;
  showData = false;
  mySubscription: any;
  infoExist: boolean ;
  // loading: HTMLIonLoadingElement;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  paginate: any;
  displayedList: Properties[];
  bedroom: boolean = true;
  bathroom: boolean = true;
  area: boolean = true;
  douches: boolean = true;

  constructor(
    private menuCtrl: MenuController,
    private propertiesServices: PropertiesService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private networkService: NetworkService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.menuCtrl.enable(true);
    this.getAllProperties()
  }
  ngOnInit() {
    this.networkService.initializeNetworkEvents();
  }
  // ionViewWillEnter() {
    
  // }
  doRefresh(event: any) {
    setTimeout(() => {
      this.document.location.reload();
      event.target.complete(); // This is a must for us to perform the method
    }, 1000); // 1000 means that the execution time is within 1s. If the execution is slow, this needs to be increased.
  }

  existInfos(variables: any) {
    switch (variables) {
      case "0":
      return;
        break;
      case null:
       return;
        break;
      case undefined:
         return;
        break;
      case -1:
         return;
        break;
    
      default:
         return variables;
        break;
    }
  } 
  async getAllProperties() {
    this.propertiesServices.getPostsPaginated(this.currentPage).subscribe(async (data: Properties[]) => {
      this.propertiesList = data['properties']['data'];
      this.displayedList = [...this.propertiesList];
      this.paginate = data['properties'];
      console.log(this.paginate);
      for (let i = 0; i < 5; i++) {
        this.posts.push(this.propertiesList[i]);
      }
      this.showData = true;
      this.propertiesList.map((prop: Properties) => {
      
      });
    })
  }

  //have issue here about "disabling"
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
    if (event == null) {
      this.currentPage = 1;
      return;
    } else {
      this.currentPage++;
      this.propertiesServices.getPostsPaginated(this.currentPage).subscribe(async (data: Properties[]) => {
        this.propertiesList = this.propertiesList.concat(data['properties']['data']);
        this.displayedList = [...this.propertiesList];

        if (event !== null) {
          event.target.complete();
        }

        if (data['properties']['data'].length < 10) {
          await toast.present().then();
          event.target.disabled = true;
        }
      }, (err) => {
        console.log(err);
      });

    }

  }
  //
  formatNumber(number) {
    number = number.toFixed(2) + '';
    let x = number.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1;
  }
  

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  onFav() {
    this.like = !this.like;
    if (!this.like) {
      this.count = 0;
    } else {
      this.count = 1;
    }
    console.log(this.count);
  }

}
