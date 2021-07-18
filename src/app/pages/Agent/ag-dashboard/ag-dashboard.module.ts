import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgDashboardPageRoutingModule } from './ag-dashboard-routing.module';
import { AgDashboardPage } from './ag-dashboard.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgDashboardPageRoutingModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: AgDashboardPage }])
  ],
  declarations: [AgDashboardPage]
})
export class AgDashboardPageModule {}
