import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppFlowPage } from './app-flow.page';

const routes: Routes = [
  {
    path: '',
    component: AppFlowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppFlowPageRoutingModule {}
