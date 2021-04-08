import { NavController, NavParams, ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  @ViewChild('slidesRef') viewer: IonSlides;
  img: any;
  gallery: any;
  imagepath: string = "https://daary-immo.com/storage/property/gallery";
  sliderOne: any;
  // 
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true
  };

  constructor(private navparams: NavParams, private modalCtrl: ModalController) { 
    this.sliderOne = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [{
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
    this.img = this.navparams.get('img');
    this.gallery = this.navparams.get('gallery')
    console.log(this.gallery);
    
  }

  onSlideMoved(event) {
    /** isEnd true when slides reach at end slide */
    event.target.isEnd().then(isEnd => {
      console.log('End of slide', isEnd);
    });

    event.target.isBeginning().then((istrue) => {
      console.log('End of slide', istrue);
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

  close() {
    this.modalCtrl.dismiss();
  }

}
