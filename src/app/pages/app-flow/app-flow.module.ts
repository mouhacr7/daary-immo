import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppFlowPageRoutingModule } from './app-flow-routing.module';

import { AppFlowPage } from './app-flow.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponentComponent } from 'src/app/components/loading-component/loading-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AppFlowPageRoutingModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AppFlowPage]
})
export class AppFlowPageModule {}
