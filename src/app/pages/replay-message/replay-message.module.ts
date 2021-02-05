import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReplayMessagePageRoutingModule } from './replay-message-routing.module';

import { ReplayMessagePage } from './replay-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    IonicModule,
    ReplayMessagePageRoutingModule
  ],
  declarations: [ReplayMessagePage]
})
export class ReplayMessagePageModule {}
