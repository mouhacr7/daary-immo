import { ComponentsModule } from 'src/app/components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppFlowPageRoutingModule } from './app-flow-routing.module';

import { AppFlowPage } from './app-flow.page';
import { MatCarouselModule } from '@ngmodule/material-carousel'; // ---------- Important

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AppFlowPageRoutingModule,
    MatCarouselModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppFlowPage]
})
export class AppFlowPageModule {}
