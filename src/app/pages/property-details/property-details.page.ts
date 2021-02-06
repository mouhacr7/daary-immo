import { PropertiesService } from 'src/app/services/properties.service';
import { Properties } from './../../models/properties';
import { Component, OnInit } from '@angular/core';
import { IonSlides, MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { AlertService } from 'src/app/services/alert.service';


// @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage implements OnInit {

  name: string;
  email: any;
  phone: any;
  my_message: any;
  message: any;
  errorMessage = '';
  data: {};
  like: boolean;
  isFavorite = false;
  count: number = 0;
  property: Properties;
  prop: Properties;
  imagepath: string = "https://daary-immo.com/storage/property/gallery";
  showData = false;
  desc: string;
  user: any[];
  sliderOne: any;
  sliderConfig = {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    autoplay: true

  };  
  

  constructor(private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    private messageService: MessagesService,
    private navController: NavController,
    private favService: FavoriteService,
    private callNumber: CallNumber
    ) {
   
                //Item object for Nature
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 995
        },
        {
          id: 925
        },
        {
          id: 940
        },
        {
          id: 943
        },
        {
          id: 944
        }
      ]
    };
  }

  ngOnInit() {
    this.route.data.subscribe((data: { property: Properties[] }) => {
        console.log(data);

        this.property = data.property['property'];
       console.log(this.property.gallery);
       
        this.showData = true;
      });
      this.like = false;
      // console.log(this.count);
      this.menuCtrl.enable(true);
      this.favService.isFavorite(this.property.id).then(isFav => {
        this.isFavorite = isFav;
      });
  }
  sendMessage() { 
      this.data = {
        agent_id:  this.property.agent_id,
        property_id:  this.property.id,
        name:  this.name,
        email:  this.email,
        phone: this.phone,
        message: this.my_message,
      }
      console.log(this.data);
      
      this.alertService.presentLoading();
      this.messageService.SendMessage(this.data).subscribe(
          data => {
            this.alertService.presentToast('Message envoyé avec succés :) !!', 'success');
            this.alertService.dismissLoading()
            console.log(data);
              },
              err => {
                this.alertService.presentToast('Une erreur s\'est pproduit au moment de l\'envoi du message :( !! Veuillez réessayer', 'danger');
                this.alertService.dismissLoading()
                this.errorMessage = err.error;
                console.log(this.errorMessage)
              }
        );
  }
  callAgent() {
    return this.callNumber.callNumber(this.property.user.phone_number.toString(), true)
    .then(res => console.log('Launched dialer! Number called = ' + this.property.user.phone_number.toString(), res))
    .catch(err => console.log('Error launching dialer ! Number called = ' + this.property.user.phone_number.toString(), err))
  }
  favoriteProperty() {
    this.favService.favoriteProperty(this.property.id).then(() => {
      this.isFavorite = true;
    });
  }
 
  unFavoriteProperty() {
    this.favService.unfavoriteProperty(this.property.id).then(() => {
      this.isFavorite = false;
    });
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }
  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

   //Call methods to check if slide is first or last to enable disbale navigation  
   checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }
  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
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

  back() {
    this.navController.back();
}

}
