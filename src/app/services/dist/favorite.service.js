"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavoriteService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var STORAGE_KEY = 'favoriteProperties';
var FavoriteService = /** @class */ (function () {
    // public propertiesServices: PropertiesService
    function FavoriteService(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    FavoriteService.prototype.isFavorite = function (popertyId) {
        return this.getAllFavoriteProperties().then(function (result) {
            return result && result.indexOf(popertyId) !== -1;
        });
    };
    FavoriteService.prototype.favoriteProperty = function (popertyId) {
        var _this = this;
        return this.getAllFavoriteProperties().then(function (result) {
            if (result) {
                result.push(popertyId);
                return _this.storage.set(STORAGE_KEY, result);
            }
            else {
                return _this.storage.set(STORAGE_KEY, [popertyId]);
            }
        });
    };
    FavoriteService.prototype.unfavoriteProperty = function (popertyId) {
        var _this = this;
        return this.getAllFavoriteProperties().then(function (result) {
            if (result) {
                var index = result.indexOf(popertyId);
                result.splice(index, 1);
                return _this.storage.set(STORAGE_KEY, result);
            }
        });
    };
    FavoriteService.prototype.getAllFavoriteProperties = function () {
        return this.storage.get(STORAGE_KEY);
    };
    // Send to api
    FavoriteService.prototype.favouriteProperty = function (id, property) {
        return this.http.post("/mobile/toggle_favorite/" + id, property).pipe(operators_1.tap(function (_) { return console.log("favourite added id=" + id); }), catchError(this.handleError('favouriteProduct')));
    };
    // Error handler
    FavoriteService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    /** Log a HeroService message with the MessageService */
    FavoriteService.prototype.log = function (message) {
        console.log(message);
    };
    FavoriteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FavoriteService);
    return FavoriteService;
}());
exports.FavoriteService = FavoriteService;
