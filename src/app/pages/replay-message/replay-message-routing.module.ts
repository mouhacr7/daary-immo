import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReplayMessagePage } from './replay-message.page';

const routes: Routes = [
  {
    path: '',
    component: ReplayMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReplayMessagePageRoutingModule {}
