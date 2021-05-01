import { Properties } from './../../models/properties';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { FavoriteService } from './../../services/favorite.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';

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
  extra: any;
  showData: boolean = false;
  favData: boolean = false;
  propertyList$: Observable<Properties[]>;
  refreshDataClickSubject = new Subject();

  model$: Observable<{ properties: Properties[]}>;
  constructor(
    private router: Router,
    public favService: FavoriteService,
    private propertyService: PropertiesService,
    private loadingController: LoadingController,
    @Inject(DOCUMENT) private document: Document
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

    // this.propertyList$.subscribe((data) => {
    //   data.map(prop => {
    //    console.log(prop.id)

    //  })
    //  });
    //  favList$.subscribe((favIdList) => {
    //    favIdList.map(favItem => {
    //   console.log(favItem); 
          
    // })
    //  });

    favList$.subscribe((favIdList) => {
      console.log(favIdList);  
      favIdList.map(fav => {
        this.propertyList$.subscribe((data) => {
          const favItem = data.filter((fil) => fil.id === fav );
          console.log(favItem[0]);
              if (this.arrayList.findIndex(i => i.id == favItem[0]) === -1) 
              {
                this.arrayList.push(favItem[0])
              }
             var intrus = this.arrayList.find(i => {
                return i.id != favItem[0]
              })
              console.log(intrus);
              
            }) 
          }) 
          this.favArraylist = this.arrayList;
          console.log(this.favArraylist);
          
    });



    this.model$ = merge(
      refreshTrigger$.pipe(map(() => ({ properties: []}))),
      favList$.pipe(map(properties => ({ properties: properties}))),
    );   
  }
  removeDuplicates(array, key) {
    let lookup = {};
    return array.filter(obj => !lookup[obj[key]] && lookup[obj[key]] == true);
}
    
  
  ngOnInit() {

  //   this.favService.refreshNeeded$.subscribe(() => {
  //     this.getAllFavourites() ;
  //   })
  //   this.getAllFavourites();
  // }
  // private getAllFavourites() {
  //  this.propertyService.getPosts().subscribe((properties:  Properties[] ) => {
  //    this.propertiesList = this.propertiesList.concat(properties);
  //    this.displayedList = [...this.propertiesList];
  //    console.log(this.displayedList);
  //  })
  //  this.favService.getAllFavoriteProperties().then(resultats => {
  //    this.favIdList = resultats;
  //  });
  //  setTimeout(() => {
  //    this.onFav();
  //  }, 5000);  

 } 
  doRefresh(event: any) { 
    setTimeout(() => {
      this.document.location.reload();
      event.target.complete();  // This is a must for us to perform the method
    }, 1000);  // 1000 means that the execution time is within 1s. If the execution is slow, this needs to be increased.
  }
 
  // onFav() {
  //   console.log(this.propertiesList)
  //   console.log(this.favIdList)
    
  //   if (typeof this.favIdList === 'undefined' ||  this.favIdList === null) {
  //     setTimeout(() => {
  //       this.showData = true;
  //     }, 5000);
  //     return;
  //   } else {
    
  //     this.favIdList.map(fav => {
  //       this.showData = true;
  //       this.favList = this.propertiesList.filter(p => p.id === fav);
  //       if (this.data.indexOf(this.favList[0]) === -1) {   
  //         this.favService.favouriteProperty(fav, this.extra).subscribe( 
  //         data => {
  //             console.log('New data collection added = ' + fav);
  //         },
  //         error => {
  //           console.log('Something went wrong' + error);
  //         }
  //         );
  //         if (typeof this.favList[0] === 'undefined') {
  //           return 0;
  //         } else {
  //           this.data.push(this.favList[0]);
  //         }
          
  //       } else if (this.data.indexOf(this.favList[0]) > -1) {
  //         console.log('already exists in data collection added : ')
  //       }
  //     console.log(this.data);
  //     })
  //   }
  // }
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
