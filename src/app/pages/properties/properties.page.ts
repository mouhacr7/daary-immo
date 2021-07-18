import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll, MenuController } from '@ionic/angular';
import { Properties } from 'src/app/models/properties';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  like: boolean;
  count: number = 0;
  propertiesList: Properties[] = [];
  property: Properties;
  showData = false;
  posts: any[] =[];
  totalPosts = 0;
  limit = 10;
  loading: any;
  url: string;
  page_number = 1;
  page_limit = 8;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

  constructor(
    private menuCtrl: MenuController,
    private propertiesServices: PropertiesService
  ) { 
    this.getAllProperties()
  }

  async ngOnInit() {
    this.like = false;
    // console.log(this.count);
    this.menuCtrl.enable(true);
  }
   getAllProperties() {
    this.propertiesServices.getPosts().subscribe(async (data: Properties[]) => {
      this.propertiesList = data['properties'];
      this.propertiesList.map( prop => {
       console.log(prop);
      });
    })
  }

  doInfinite(event) {

    // Using settimeout to simulate api call 
    setTimeout(() => {

      // load more data
      this.getAllProperties()

      //Hide Infinite List Loader on Complete
      event.target.complete();

      //Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.propertiesList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
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
