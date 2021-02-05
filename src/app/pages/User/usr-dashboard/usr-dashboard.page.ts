import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-usr-dashboard',
  templateUrl: './usr-dashboard.page.html',
  styleUrls: ['./usr-dashboard.page.scss'],
})
export class UsrDashboardPage implements OnInit {

  constructor(private menu: MenuController,) { 
    this.menu.enable(true);
  }

  ngOnInit() {
  }

}
