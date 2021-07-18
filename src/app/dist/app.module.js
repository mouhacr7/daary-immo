"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var ngx_1 = require("@ionic-native/splash-screen/ngx");
var ngx_2 = require("@ionic-native/status-bar/ngx");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var ngx_3 = require("@ionic-native/native-storage/ngx");
var http_1 = require("@angular/common/http");
var storage_1 = require("@ionic/storage");
var httpinterceptor_service_1 = require("./services/httpinterceptor.service");
var forms_1 = require("@angular/forms");
// app.module.ts
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            entryComponents: [],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                angular_1.IonicModule.forRoot(),
                storage_1.IonicStorageModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule
            ],
            providers: [
                ngx_2.StatusBar,
                ngx_1.SplashScreen,
                { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: httpinterceptor_service_1.HttpConfigInterceptor, multi: true },
                ngx_3.NativeStorage
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
