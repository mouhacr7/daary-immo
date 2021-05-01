import { LoadingComponentComponent } from './loading-component/loading-component.component';
import { AgUpdatePropertyComponent } from './ag-update-property/ag-update-property.component';
import { AgUpdateProfileComponent } from './ag-update-profile/ag-update-profile.component';
import { AgMessagesComponent } from './ag-messages/ag-messages.component';
import { AgProfileComponent } from './ag-profile/ag-profile.component';
import { AgUploadComponent } from './ag-upload/ag-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgPropertiesComponent } from './ag-properties/ag-properties.component';
import { AgEditPasswordComponent } from './ag-edit-password/ag-edit-password.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AgUploadComponent,
    AgPropertiesComponent,
    AgEditPasswordComponent,
    AgProfileComponent,
    AgMessagesComponent,
    AgUpdateProfileComponent,
    AgUpdatePropertyComponent,
    LoadingComponentComponent

  ],
  exports: [
    AgUploadComponent,
    AgPropertiesComponent,
    AgEditPasswordComponent,
    AgProfileComponent,
    AgMessagesComponent,
    AgUpdateProfileComponent,
    AgUpdatePropertyComponent,
    LoadingComponentComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ]
})
export class ComponentsModule { }
