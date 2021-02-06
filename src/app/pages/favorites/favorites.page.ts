import { map } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';
import { FavoriteService } from './../../services/favorite.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Properties } from 'src/app/models/properties';
import { BehaviorSubject } from 'rxjs';
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
  favList: Properties[] = [];
  favIdList: any;
  favId: any;
  data: any = [];
  extra: any;
  showData: boolean = false;
  favData: boolean = false;
  constructor(
    private router: Router,
    public favService: FavoriteService,
    private propertyService: PropertiesService,
    private loadingController: LoadingController,
    @Inject(DOCUMENT) private document: Document
  ) { 
   
  }
  
  ngOnInit() {
    this.propertyService.getPosts().subscribe((properties:  Properties[] ) => {
      this.propertiesList = properties['properties']['data'];
    })
    this.favService.getAllFavoriteProperties().then(resultats => {
      this.favIdList = resultats;
    });
    setTimeout(() => {
      this.onFav();
    }, 5000);    
  }
  doRefresh(event: any) { 
    setTimeout(() => {
      this.document.location.reload();
      event.target.complete();  // This is a must for us to perform the method
    }, 1000);  // 1000 means that the execution time is within 1s. If the execution is slow, this needs to be increased.
  }
 
  onFav() {
    console.log(this.propertiesList)
    console.log(this.favIdList)
    
    if (typeof this.favIdList === 'undefined' ||  this.favIdList === null) {
      setTimeout(() => {
        this.showData = true;
      }, 5000);
      return;
    } else {
      
      this.favIdList.map(fav => {
        this.showData = true;
        this.favList = this.propertiesList.filter(p => p.id === fav);
        if (this.data.indexOf(this.favList[0]) === -1) {   
          this.favService.favouriteProperty(fav, this.extra).subscribe( 
            data => {
              console.log('New data collection added' + data);
          },
          error => {
            console.log('Something went wrong' + error);
          }
          );
          console.log('New data collection added : ' + fav)
          this.data.push(this.favList[0]);
          
        } else if (this.data.indexOf(this.favList[0]) > -1) {
          console.log('already exists in data collection added : ')
        }
      console.log(this.data);
      })
    }
  }

}
