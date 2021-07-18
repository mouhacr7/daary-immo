import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsrDashboardPageRoutingModule } from './usr-dashboard-routing.module';

import { UsrDashboardPage } from './usr-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsrDashboardPageRoutingModule
  ],
  declarations: [UsrDashboardPage]
})
export class UsrDashboardPageModule {}
