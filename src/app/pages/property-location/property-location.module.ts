import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyLocationPageRoutingModule } from './property-location-routing.module';

import { PropertyLocationPage } from './property-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyLocationPageRoutingModule
  ],
  declarations: [PropertyLocationPage]
})
export class PropertyLocationPageModule {}
