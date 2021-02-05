import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppFlowPageRoutingModule } from './app-flow-routing.module';

import { AppFlowPage } from './app-flow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppFlowPageRoutingModule
  ],
  declarations: [AppFlowPage]
})
export class AppFlowPageModule {}
