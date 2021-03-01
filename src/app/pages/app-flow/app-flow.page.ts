import { Properties } from './../../models/properties';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, LoadingController, IonInfiniteScroll, ToastController } from '@ionic/angular';
import { PropertiesService } from './../../services/properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-flow',
  templateUrl: './app-flow.page.html',
  styleUrls: ['./app-flow.page.scss'],
})
export class AppFlowPage implements OnInit {
  like: boolean;
  count: number = 0;
  propertiesList: Properties[] = [];
  posts: any[] =[];
  totalPosts = 0;
  currentPage = 1;
  limit = 10;
  loading: any;
  property: Properties;
  showData = false;
  mySubscription: any;
  // loading: HTMLIonLoadingElement;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  paginate: any;
  displayedList: Properties[];

  constructor(
    private menuCtrl: MenuController,
    private propertiesServices: PropertiesService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    ) {    
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.getAllProperties()
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
      this.propertiesList.map(prop => {
       console.log(prop);
      });
    })
  }

 //have issue here about "disabling"
 async loadMorePosts(event) {
  const toast = await this.toastController.create({
    message: 'Fin de liste :)',
    animated: true,
    duration: 5000,
    buttons: [
        {
            text: 'Done',
            role: 'cancel',
            icon: 'close'
        }
    ]
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
