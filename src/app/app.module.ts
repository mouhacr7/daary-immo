import { LoadingServiceService } from './services/loading-service.service';
import { Network } from '@ionic-native/network/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpConfigInterceptor } from './services/httpinterceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValuesPipe } from './pipes/values.pipe';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComponentsModule } from './components/components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// app.module.ts

@NgModule({
  declarations: [AppComponent, ValuesPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatExpansionModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    CallNumber,
    Network,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    NativeStorage,
    LoadingServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

