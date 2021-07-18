import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePropertyPage } from './update-property.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePropertyPageRoutingModule {}
