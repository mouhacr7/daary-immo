"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PropertyDetailsPage = void 0;
var core_1 = require("@angular/core");
// @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
var PropertyDetailsPage = /** @class */ (function () {
    function PropertyDetailsPage(route, menuCtrl, router, storage, navController, favService) {
        this.route = route;
        this.menuCtrl = menuCtrl;
        this.router = router;
        this.storage = storage;
        this.navController = navController;
        this.favService = favService;
        this.isFavorite = false;
        this.count = 0;
        this.showData = false;
        this.sliderConfig = {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 20,
            autoplay: true
        };
        //Item object for Nature
        this.sliderOne =
            {
                isBeginningSlide: true,
                isEndSlide: false,
                slidesItems: [
                    {
                        id: 995
                    },
                    {
                        id: 925
                    },
                    {
                        id: 940
                    },
                    {
                        id: 943
                    },
                    {
                        id: 944
                    }
                ]
            };
    }
    PropertyDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            console.log(data);
            _this.property = data.property['property'];
            console.log(_this.property);
            _this.showData = true;
        });
        this.like = false;
        // console.log(this.count);
        this.menuCtrl.enable(true);
        this.favService.isFavorite(this.property.id).then(function (isFav) {
            _this.isFavorite = isFav;
        });
    };
    PropertyDetailsPage.prototype.favoriteProperty = function () {
        var _this = this;
        this.favService.favoriteProperty(this.property.id).then(function () {
            _this.isFavorite = true;
        });
    };
    PropertyDetailsPage.prototype.unFavoriteProperty = function () {
        var _this = this;
        this.favService.unfavoriteProperty(this.property.id).then(function () {
            _this.isFavorite = false;
        });
    };
    //Move to Next slide
    PropertyDetailsPage.prototype.slideNext = function (object, slideView) {
        var _this = this;
        slideView.slideNext(500).then(function () {
            _this.checkIfNavDisabled(object, slideView);
        });
    };
    //Move to previous slide
    PropertyDetailsPage.prototype.slidePrev = function (object, slideView) {
        var _this = this;
        slideView.slidePrev(500).then(function () {
            _this.checkIfNavDisabled(object, slideView);
        });
        ;
    };
    //Method called when slide is changed by drag or navigation
    PropertyDetailsPage.prototype.SlideDidChange = function (object, slideView) {
        this.checkIfNavDisabled(object, slideView);
    };
    //Call methods to check if slide is first or last to enable disbale navigation  
    PropertyDetailsPage.prototype.checkIfNavDisabled = function (object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
    };
    PropertyDetailsPage.prototype.checkisBeginning = function (object, slideView) {
        slideView.isBeginning().then(function (istrue) {
            object.isBeginningSlide = istrue;
        });
    };
    PropertyDetailsPage.prototype.checkisEnd = function (object, slideView) {
        slideView.isEnd().then(function (istrue) {
            object.isEndSlide = istrue;
        });
    };
    PropertyDetailsPage.prototype.onFav = function () {
        this.like = !this.like;
        if (!this.like) {
            this.count = 0;
        }
        else {
            this.count = 1;
        }
        console.log(this.count);
    };
    PropertyDetailsPage.prototype.back = function () {
        this.navController.back();
    };
    PropertyDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-property-details',
            templateUrl: './property-details.page.html',
            styleUrls: ['./property-details.page.scss']
        })
    ], PropertyDetailsPage);
    return PropertyDetailsPage;
}());
exports.PropertyDetailsPage = PropertyDetailsPage;
