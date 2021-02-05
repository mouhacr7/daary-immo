import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgDashboardPage } from './ag-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AgDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgDashboardPageRoutingModule {}
