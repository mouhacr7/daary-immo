import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindAgentsPage } from './find-agents.page';

const routes: Routes = [
  {
    path: '',
    component: FindAgentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindAgentsPageRoutingModule {}
