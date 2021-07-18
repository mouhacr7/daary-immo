import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyLocationPage } from './property-location.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyLocationPageRoutingModule {}
