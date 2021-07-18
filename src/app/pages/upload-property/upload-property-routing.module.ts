import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPropertyPage } from './upload-property.page';

const routes: Routes = [
  {
    path: '',
    component: UploadPropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadPropertyPageRoutingModule {}
