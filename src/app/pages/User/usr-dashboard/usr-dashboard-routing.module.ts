import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsrDashboardPage } from './usr-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: UsrDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsrDashboardPageRoutingModule {}
