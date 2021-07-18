import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPropertyPageRoutingModule } from './upload-property-routing.module';

import { UploadPropertyPage } from './upload-property.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPropertyPageRoutingModule
  ],
  declarations: [UploadPropertyPage]
})
export class UploadPropertyPageModule {}
