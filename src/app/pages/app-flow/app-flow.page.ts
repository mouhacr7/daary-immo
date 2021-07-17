import {
  Properties
} from './../../models/properties';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MenuController,
  LoadingController,
  IonInfiniteScroll,
  ToastController,
  IonVirtualScroll
} from '@ionic/angular';
import {
  PropertiesService
} from './../../services/properties.service';
import { NavigationExtras, Router  } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NetworkService } from 'src/app/services/network.service';
import { AlertService } from 'src/app/services/alert.service';
import { map, startWith, mergeMap } from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { ConnectionService } from 'ng-connection-service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel'; // -------- important

@Component({
  selector: 'app-app-flow',
  templateUrl: './app-flow.page.html',
  styleUrls: ['./app-flow.page.scss'],
})
export class AppFlowPage implements OnInit {
  like: boolean;
  count: number = 0;
  propertiesList$: Properties[];
  propertiesData$: Observable<Properties[]>;
  posts: any[] = [];
  totalPosts = 0;
  currentPage = 1;
  limit = 10;
  // loading: any;
  property: Properties;
  showData = false;
  mySubscription: any;
  infoExist: boolean ;
  imagePath: String = "https://daary-immo.com/storage/property";
  loading = false;
  // loading: HTMLIonLoadingElement;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

  paginate: any;
  displayedList: Properties[];
  bedroom: boolean = true;
  bathroom: boolean = true;
  area: boolean = true;
  douches: boolean = true;

slidesOptions = {
  slidesPerView: 3.5,
  centeredSlides: true,
  loop: true,
  spaceBetween: 10,
  // autoplay:true,
}

propertyList$: Observable<Properties[]>;
propList$: Observable<Properties[]>;
refreshDataClickSubject = new Subject();
model$: Observable<{ properties: Properties[]}>;
status = 'ONLINE';
isConnected = true;
showLoadMoreButton: boolean = false;
  constructor(
    private menuCtrl: MenuController,
    private propertiesServices: PropertiesService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private networkService: NetworkService,
    private alertService: AlertService,
    public navCtrl: NavController,
    public router: Router,
    private connectionService: ConnectionService
  ) {
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
       // Rxjs strategy to refresh current component state using observables 
    this.propertyList$ = this.propertiesServices.getPostsPaginated(this.currentPage);
    const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
    const refreshTrigger$ = refreshDataClick$.pipe(
      startWith({})
    );
    this.propList$ = refreshTrigger$.pipe(
      mergeMap(() => this.propertyList$)
    )
    this.propList$.subscribe((data) => {
      this.showData = true;
      this.displayedList = data;
    }) 
    
  
    this.model$ = merge(
      refreshTrigger$.pipe(map(() => ({ properties: []}))),
      this.propList$.pipe(map(properties => ({ properties: properties}))),
    );  

    this.getAllProperties()
  }
  
  ionViewWillEnter() {
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

  onClickAlert() {
    this.alertService.presentToast('test','success')
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
   getAllProperties() {
    const loadProperties$ = this.propertiesServices.getPostsPaginated(this.currentPage)
   .subscribe( (data: Properties[]) => {
     this.propertiesList$ = data;
     this.showData = true;
     console.log(this.propertiesList$);
   })
  }

  propertyDetails(id: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate([`/property-details/`+id], navigationExtras);
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
      this.propertyList$ = this.propertiesServices.getPostsPaginated(this.currentPage);
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
      this.loading = true;
      this.currentPage++;
      this.propertyList$ = this.propertiesServices.getPostsPaginated(this.currentPage);
      const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
      const refreshTrigger$ = refreshDataClick$.pipe(
        startWith({})
      );
      this.propList$ = refreshTrigger$.pipe(
        mergeMap(() => this.propertyList$)
      )
      this.propList$.subscribe(async (data) => {
        this.loading = false;
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
  categoryFilter(category: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        purpose:"",
        city:"",
        type: category,
        bedroom: "",
        bathroom:"",
        minprice:"",
        maxprice: "",
        minarea: "",
        maxarea:"",
      }
    }; 
    console.log(navigationExtras);
    this.router.navigate(['/search-result'], navigationExtras);
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
 }
