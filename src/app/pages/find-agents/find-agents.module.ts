import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindAgentsPageRoutingModule } from './find-agents-routing.module';

import { FindAgentsPage } from './find-agents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindAgentsPageRoutingModule
  ],
  declarations: [FindAgentsPage]
})
export class FindAgentsPageModule {}
