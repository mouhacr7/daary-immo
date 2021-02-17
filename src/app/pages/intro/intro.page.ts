import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular'
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  @ViewChild(IonSlides)
  slides: IonSlides;

  ngOnInit() {
  }

  async finish() {
    await this.storage.set('introComplete', true);
    this.router.navigateByUrl('/app-flow');
  }

  next() {
    this.slides.slideNext();
  }

}
