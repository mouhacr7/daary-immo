import { NavController, NavParams, ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  @ViewChild('slider', { read: ElementRef})slider: ElementRef;
  img: any;
  imagepath: string = "https://daary-immo.com/storage/property/gallery";
  sliderOpts = {
    zoom:{
      maxRatio: 5
    }
  }

  constructor(private navparams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.img = this.navparams.get('img');
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
