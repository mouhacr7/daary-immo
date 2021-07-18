import { Component, OnInit } from '@angular/core';
import { IonSlides, MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.page.html',
  styleUrls: ['./message-details.page.scss'],
})
export class MessageDetailsPage implements OnInit {
  message: any;

  constructor(private route: ActivatedRoute
   ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { message: any[] }) => {
      this.message = data.message['message'];
        console.log( this.message);
      });
  }
}
