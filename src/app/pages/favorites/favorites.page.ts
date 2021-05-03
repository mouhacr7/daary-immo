import { NetworkService } from 'src/app/services/network.service';
import { AlertService } from 'src/app/services/alert.service';
import { Properties } from './../../models/properties';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { FavoriteService } from './../../services/favorite.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, merge, Observable, Subject } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  like: boolean = false;
  count: number;
  propertiesList: Properties[] = [];
  displayedList: Properties[];
  favItem: Properties[] = [];
  favIdList: any;
  favId: any;
  favArraylist: any = [];
  arrayList: any = [];
  duplicates = [];
  uniques = [];
  valueCounts = {};
  extra: any;
  showData: boolean = false;
  favData: any;
  propertyList$: Observable<Properties[]>;
  refreshDataClickSubject = new Subject();

  model$: Observable<{ properties: Properties[]}>;
  constructor(
    private router: Router,
    public favService: FavoriteService,
    private propertyService: PropertiesService,
    private alertService: AlertService,
    private networkService: NetworkService
  ) { 
    // console.log(this.favService.getAllFavoriteProperties());
    this.propertyList$ = this.propertyService.getPosts();
    const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
    const refreshTrigger$ = refreshDataClick$.pipe(
      startWith({})
    );
    const favList$ = refreshTrigger$.pipe(
      mergeMap(() => this.favService.getAllFavoriteProperties())
    );
    favList$.subscribe((favIdList) => {
      this.favData = favIdList;
      console.log(favIdList);
      if (favIdList !== null) {
        this.showData = true;
        favIdList.map(fav => {
          this.favId = fav;
          console.log(this.favId);
            this.propertyList$.subscribe((data) => {
              this.favItem = data.filter(p => p.id === fav);
                console.log(this.favItem[0]);
                data.forEach(element => {
                  if(element.id !== this.favId) {
                    console.log('not fav');
                  } else {
                    this.favArraylist.push(this.favItem[0]);
                    console.log('fav');
                  }
                });
              })
            }) 
           this.getDuplicatesAndUniques(this.favArraylist,'id')
           console.log(this.duplicates);
           console.log(this.uniques);
      } else {
        this.alertService.presentToast('Vérifier votre connexion internet', 'danger')
      }
    });
    
    this.model$ = merge(
      refreshTrigger$.pipe(map(() => ({ properties: []}))),
      favList$.pipe(map(properties => ({ properties: properties}))),
    );   
    
  }
  ionViewDidLeave() {
    console.log("TabX is exited")
}
  ionViewDidEnter() {
    this.refreshDataClickSubject.next();
    console.log("TabX is enter")
  }

  
  getDuplicatesAndUniques(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (!this.valueCounts[array[i][value]])
        this.valueCounts[array[i][value]] = 1;
      else
        this.valueCounts[array[i][value]]++;
    }
  
    for (var i = 0; i < array.length; i++) {
      if (this.valueCounts[array[i][value]] == 1) {
        this.uniques.push(array[i]);
      } else {
        this.duplicates.push(array[i]);
      }
    }
  }
   
 
    
  
  ngOnInit() {
    this.networkService.initializeNetworkEvents();
 } 
  doRefresh(event: any) { 
    setTimeout(() => {
      this.refreshDataClickSubject.next();
      event.target.complete();  // This is a must for us to perform the method
    }, 1000);  // 1000 means that the execution time is within 1s. If the execution is slow, this needs to be increased.
  }
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
