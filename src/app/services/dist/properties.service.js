"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PropertiesService = void 0;
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var HttpUploadOptions = {
    headers: new http_1.HttpHeaders({ "Content-Type": "multipart/form-data" })
};
var PropertiesService = /** @class */ (function () {
    function PropertiesService(http, storageService, tokenSession) {
        this.http = http;
        this.storageService = storageService;
        this.tokenSession = tokenSession;
        // this.token = this.tokenSession.getUser()['token'];
        // console.log(this.token);
    }
    PropertiesService.prototype.getPosts = function () {
        return this.http.get('/mobile/properties', {})
            .pipe(operators_1.tap(function (_) { return console.log('response received'); }), operators_1.catchError(this.handleError('properties', [])));
    };
    PropertiesService.prototype.getAgentProperties = function () {
        return this.http.get('/mobile/added_properties', {})
            .pipe(operators_1.tap(function (_) { return console.log('response received'); }), operators_1.catchError(this.handleError('properties', [])));
    };
    PropertiesService.prototype.getAgentMessages = function () {
        return this.http.get('/mobile/message', {})
            .pipe(operators_1.tap(function (_) { return console.log('response received'); }), operators_1.catchError(this.handleError('properties', [])));
    };
    PropertiesService.prototype.getSingleProperty = function (id) {
        return this.http.get("/mobile/property/" + id);
    };
    PropertiesService.prototype.getFilteredProperties = function (request) {
        return this.http.get("/mobile/search?" + request);
    };
    PropertiesService.prototype.changePassword = function (data) {
        return this.http.post('/mobile/change_password', data)
            .pipe(operators_1.tap(function (data) { return console.log('response received', data); }), operators_1.catchError(this.handleError('properties', [])));
    };
    PropertiesService.prototype.addProperty = function (data) {
        var input = new FormData();
        input.append('title', data.title);
        input.append('purpose', data.purpose);
        input.append('type', data.type);
        input.append('price', data.price);
        input.append('cuisine', data.cuisine);
        input.append('douche', data.douche);
        input.append('image', data.image);
        input.append('bedroom', data.bedroom);
        input.append('bathroom', data.bathroom);
        input.append('city', data.city);
        input.append('address', data.address);
        input.append('area', data.area);
        input.append('floor_plan', data.floor_plan);
        input.append('description', data.description);
        input.append('nearby', data.nearby);
        for (var i = 0; i < data.gallaryimage.length; i++) {
            input.append("gallaryimage[]", data.gallaryimage[i]);
        }
        console.log(input.getAll(data));
        return this.http.post('/mobile/add_property', input)
            .pipe(operators_1.tap(function (data) { return console.log('response received', data); }), operators_1.catchError(this.handleError('properties', [])));
    };
    PropertiesService.prototype.updateAgentData = function (data) {
        var input = new FormData();
        input.append('name', data.name);
        input.append('username', data.username);
        input.append('email', data.email);
        input.append('phone_number', data.phone_number);
        input.append('image', data.image);
        console.log(input.getAll(data));
        return this.http.post("/mobile/updateProfile", input).pipe(operators_1.tap(function (_) { return console.log("Agent profile updated"); }), operators_1.catchError(this.handleError('updateAgent')));
    };
    PropertiesService.prototype.updatePropertyData = function (id, data) {
        var input = new FormData();
        input.append('title', data.title);
        input.append('purpose', data.purpose);
        input.append('type', data.type);
        input.append('price', data.price);
        input.append('cuisine', data.cuisine);
        input.append('douche', data.douche);
        input.append('image', data.image);
        input.append('bedroom', data.bedroom);
        input.append('bathroom', data.bathroom);
        input.append('city', data.city);
        input.append('address', data.address);
        input.append('area', data.area);
        input.append('floor_plan', data.floor_plan);
        input.append('description', data.description);
        input.append('nearby', data.nearby);
        for (var i = 0; i < data.gallaryimage.length; i++) {
            input.append("gallaryimage[]", data.gallaryimage[i]);
        }
        console.log(input.getAll(data));
        return this.http.post("/mobile/update_property/" + id, input).pipe(operators_1.tap(function (_) { return console.log("updated property id=" + id); }), operators_1.catchError(this.handleError('updateProduct')));
    };
    PropertiesService.prototype.deleteProperty = function (id, property) {
        return this.http.post("/mobile/delete_property/" + id, property).pipe(operators_1.tap(function (_) { return console.log("deleted property id=" + id); }), operators_1.catchError(this.handleError('deleteProduct')));
    };
    // Error handler
    PropertiesService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
    /** Log a HeroService message with the MessageService */
    PropertiesService.prototype.log = function (message) {
        console.log(message);
    };
    PropertiesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PropertiesService);
    return PropertiesService;
}());
exports.PropertiesService = PropertiesService;
