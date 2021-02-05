"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavoritesPage = void 0;
var core_1 = require("@angular/core");
var FavoritesPage = /** @class */ (function () {
    function FavoritesPage(router, favService, propertyService, loadingController) {
        var _this = this;
        this.router = router;
        this.favService = favService;
        this.propertyService = propertyService;
        this.loadingController = loadingController;
        this.like = false;
        this.propertiesList = [];
        this.favList = [];
        this.data = [];
        setTimeout(function () {
            _this.onFav();
        }, 3000);
    }
    FavoritesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.propertyService.getPosts().subscribe(function (properties) {
            _this.propertiesList = properties;
        });
        this.favService.getAllFavoriteProperties().then(function (resultats) {
            _this.favIdList = resultats;
        });
    };
    FavoritesPage.prototype.onFav = function () {
        var _this = this;
        console.log(this.propertiesList);
        console.log(this.favIdList);
        this.favIdList.map(function (fav) {
            _this.favList = _this.propertiesList['properties'].filter(function (p) { return p.id === fav; });
            if (_this.data.indexOf(_this.favList[0]) === -1) {
                _this.data.push(_this.favList[0]);
            }
            else if (_this.data.indexOf(_this.favList[0]) > -1) {
                console.log('New favourite collection added : ');
            }
            console.log(_this.data);
        });
    };
    FavoritesPage = __decorate([
        core_1.Component({
            selector: 'app-favorites',
            templateUrl: './favorites.page.html',
            styleUrls: ['./favorites.page.scss']
        })
    ], FavoritesPage);
    return FavoritesPage;
}());
exports.FavoritesPage = FavoritesPage;
