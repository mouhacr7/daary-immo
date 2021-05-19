import { filter } from 'rxjs/operators';
import { PropertiesService } from './../../services/properties.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router  } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Properties } from 'src/app/models/properties';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.page.html',
  styleUrls: ['./search-property.page.scss'],
})
export class SearchPropertyPage implements OnInit {
  // Purpose
  isSaleClicked: boolean = false;
  isRentClicked: boolean = false;

  // Property type
  isAppartClicked: boolean = false;
  isHouseClicked: boolean = false;
  isLandClicked: boolean = false;
  isShopClicked: boolean = false;
  isBuildingClicked: boolean = false;
  isOfficeClicked: boolean = false;
  isStudioClicked: boolean = false;
  // Number of rooms
  isRoom1: boolean = false;
  isRoom2: boolean = false;
  isRoom3: boolean = false;
  isRoom4: boolean = false;
  isRoom5: boolean = false;
  isRoomPlus: boolean = false;
  
  // Number of rooms
  isPiece1: boolean = false;
  isPiece2: boolean = false;
  isPiece3: boolean = false;
  isPiece4: boolean = false;
  isPiece5: boolean = false;
  isPiecePlus: boolean = false;
  currency: string;
  mycolor: string;
  myfill: string;
  

  // Param headers for filter properties system
  purpose = new BehaviorSubject('');
  type = new BehaviorSubject('');
  local = new BehaviorSubject('');;
  bedroom = new BehaviorSubject('');
  bathroom = new BehaviorSubject('');
  minprice  : string = '';
  maxprice : string = '';
  minarea : string = '';
  maxarea : string = '';
  // featured = new BehaviorSubject('');
  number_bath: string;
  number_bed: string;
  bedroom_number : string = '';
  bathroom_number : string = '';
  citiesData: any = [];
  showCity: boolean = false;
  showCityBadge: boolean = false;
  dataList = [];
  allCityList = [];
  cityList = [];
  constructor(
    public formBuilder: FormBuilder,
    private propertiesServices: PropertiesService,
    public navCtrl: NavController,
    public router: Router
  ) {}

  ngOnInit() {
    this.listCitiesData();
    this.loadCities(); 
  }
  
  async loadCities() {
      await this.propertiesServices.getPosts().subscribe( (data: Properties[]) => {
        this.dataList = data;
        console.log(this.dataList );
        this.dataList.forEach(data => {
          this.allCityList.push(data.city)
        })
        let uniqueArray = this.allCityList.filter((item, index) => this.allCityList.indexOf(item) === index);
        uniqueArray.map(city => {
        this.citiesData.push({"city": city})
      });
    })
  }
  
  async listCitiesData() {
    this.cityList = [...this.citiesData];
    console.log(this.cityList);
  }

  filterJsonData(ev: any) {
    this.listCitiesData();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.showCity = true;
      this.cityList  = this.cityList.filter((item) => {
        return (item.city.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.showCityBadge = false;
      this.showCity = false;
      this.local.next('');
      return 0;
    }
    }

    selectVal(val) {
      this.showCityBadge = true;
      this.showCity = false;
      console.log("you have selected = " + val);
      this.local.next(val);
    }
    onRemoveLocal() {
      this.showCityBadge = false;
      this.showCity = false;
      this.local.next('');
    }

  onRefreshFilters() {
    // Purpose
  this.isSaleClicked = false;
  this.isRentClicked = false;
  this.purpose.next('');
  // Property type
  this.isAppartClicked = false;
  this.isHouseClicked = false;
  this.isLandClicked = false;
  this.isShopClicked = false;
  this.isBuildingClicked = false;
  this.isOfficeClicked = false;
  this.isStudioClicked = false;
  this.type.next('');
  // Number of rooms
  this.isRoom1 = false;
  this.isRoom2 = false;
  this.isRoom3 = false;
  this.isRoom4 = false;
  this.isRoom5 = false;
  this.isRoomPlus = false;
  this.bedroom.next('');
  // Number of rooms
  this.isPiece1 = false;
  this.isPiece2 = false;
  this.isPiece3 = false;
  this.isPiece4 = false;
  this.isPiece5 = false;
  this.isPiecePlus = false;
  this.bathroom.next('');

  this.bedroom_number = '';
  this.bathroom_number = '';
  this.number_bath = '';
  this.number_bed = '';
  this.minprice  = '';
  this.maxprice = '';
  this.minarea = '';
  this.local.next('');
  
  }

  searchClick() {
    if (this.bedroom.getValue() === '') {
      this.bedroom_number = this.number_bed
    } else {
      this.bedroom_number = this.bedroom.getValue()
    }
    if (this.bathroom.getValue() === '') {
      this.bathroom_number = this.number_bath
    } else {
      this.bathroom_number = this.bathroom.getValue()
    }
    
    if(typeof this.bedroom_number === 'undefined') {
      this.bedroom_number = '';
    }
    if(typeof this.bathroom_number === 'undefined') {
      this.bathroom_number = '';
    }
    console.log(this.bedroom_number);
    console.log(this.bathroom_number);
    

    let navigationExtras: NavigationExtras = {
      state: {
        purpose: this.purpose.getValue(),
        city: this.local.getValue(),
        type: this.type.getValue(),
        bedroom: this.bedroom_number,
        bathroom: this.bathroom_number,
        minprice: this.minprice,
        maxprice: this.maxprice,
        minarea: this.minarea,
        maxarea: this.maxarea
      }
    };
    this.router.navigate(['/search-result'], navigationExtras);
  }

  bedroomChange(e) {
    console.log(e.target.value);
    if (e.target.value > -1) {
      this.isPiece1 = false;
      this.isPiece2 = false;
      this.isPiece3 = false;
      this.isPiece4 = false;
      this.isPiece5 = false;
      this.bedroom.next('');
    }
    
    }
    bathroomChange(e) {
    console.log(e.target.value);
    if (e.target.value > -1) {
      this.isRoom1 = false;
      this.isRoom2 = false;
      this.isRoom3 = false;
      this.isRoom4 = false;
      this.isRoom5 = false;
      this.bathroom.next('');
    }
  }

  // Purpose handle
saleClick() {
    this.isSaleClicked = true;
    this.isRentClicked = false;
    if (this.isSaleClicked) {
      this.purpose.next('Vendre');
    }
  }
  rentClick() {
    this.isRentClicked = true;
    this.isSaleClicked = false;
    if (this.isRentClicked) {
      this.purpose.next('Louer');
    }
    
  }
  // Number of Pieces
  oneClick() {
    this.isPiece1 = true;
    if (this.isPiece1) {
      this.bedroom.next('1');
    }
    this.isPiece2 = false;
    this.isPiece3 = false;
    this.isPiece4 = false;
    this.isPiece5 = false;
    this.isPiecePlus = false;
    console.log('1 piece', this.isPiece1);
     
  }
  twoClick() {
    this.isPiece1 = false;
    this.isPiece2 = true;
    if (this.isPiece2) {
      this.bedroom.next('2');
    }
    this.isPiece3 = false;
    this.isPiece4 = false;
    this.isPiece5 = false;
    this.isPiecePlus = false;
    console.log('2 piece', this.isPiece2);
     
  }
  threeClick() {
    this.isPiece1 = false;
    this.isPiece2 = false;
    this.isPiece3 = true;
    if (this.isPiece3) {
      this.bedroom.next('3');
    }
    this.isPiece4 = false;
    this.isPiece5 = false;
    this.isPiecePlus = false;
    console.log('3 piece', this.isPiece3);
     
  }
  fourClick() {
    this.isPiece1 = false;
    this.isPiece2 = false;
    this.isPiece3 = false;
    this.isPiece4 = true;
    if (this.isPiece4) {
      this.bedroom.next('4');
    }
    this.isPiece5 = false;
    this.isPiecePlus = false;
    console.log('4 piece', this.isPiece4);
     
  }
  fiveClick() {
    this.isPiece1 = false;
    this.isPiece2 = false;
    this.isPiece3 = false;
    this.isPiece4 = false;
    this.isPiece5 = true;
    if (this.isPiece5) {
      this.bedroom.next('5');
    }
    this.isPiecePlus = false;
    console.log('5 piece', this.isPiece5);
     
  }
  plusClick() {
    this.isPiece1 = false;
    this.isPiece2 = false;
    this.isPiece3 = false;
    this.isPiece4 = false;
    this.isPiece5 = false;
    this.isPiecePlus = true;
      if (this.isPiecePlus) {
        this.bedroom.next('');
      }
    console.log('Plus piece', this.isPiecePlus);
     
  }
  // Number of rooms
  oneRoom() {
    this.isRoom1 = true;
    if (this.isRoom1) {
      this.bathroom.next('1');
    }
    this.isRoom2 = false;
    this.isRoom3 = false;
    this.isRoom4 = false;
    this.isRoom5 = false;
    this.isRoomPlus = false;
    console.log('2 rooms', this.isRoom1);
  }
  twoRoom() {
    this.isRoom1 = false;
    this.isRoom2 = true;
    if (this.isRoom2) {
      this.bathroom.next('2');
    }
    this.isRoom3 = false;
    this.isRoom4 = false;
    this.isRoom5 = false;
    this.isRoomPlus = false;
    console.log('2 rooms', this.isRoom2);
     
  }
  threeRoom() {
    this.isRoom1 = false;
    this.isRoom2 = false;
    this.isRoom3 = true;
    if (this.isRoom3) {
      this.bathroom.next('3');
    }
    this.isRoom4 = false;
    this.isRoom5 = false;
    this.isRoomPlus = false;
    console.log('3 rooms', this.isRoom3);
     
  }
  fourRoom() {
    this.isRoom1 = false;
    this.isRoom2 = false;
    this.isRoom3 = false;
    this.isRoom4 = true;
    if (this.isRoom4) {
      this.bathroom.next('4');
    }
    this.isRoom5 = false;
    this.isRoomPlus = false;
    console.log('4 rooms', this.isRoom4);
  }
  fiveRoom() {
    this.isRoom1 = false;
    this.isRoom2 = false;
    this.isRoom3 = false;
    this.isRoom4 = false;
    this.isRoom5 = true;
    if (this.isRoom5) {
      this.bathroom.next('5');
    }
    this.isRoomPlus = false;
    console.log('5 rooms', this.isRoom5);
     
  }
  plusRoom() {
    this.isRoom1 = false;
    this.isRoom2 = false;
    this.isRoom3 = false;
    this.isRoom4 = false;
    this.isRoom5 = false;
    this.isRoomPlus = true; 
    if (this.isRoomPlus) {
      this.bathroom.next('');
    }
    console.log('Plus rooms', this.isRoomPlus);
     
  }
  onClickApp() {
    
    this.isAppartClicked = true; 
    if (this.isAppartClicked) {
      this.type.next('Appartement');
    }
    this.isHouseClicked = false;
    this.isLandClicked = false;
    this.isShopClicked = false;
    this.isBuildingClicked = false;
    this.isOfficeClicked = false;
    this.isStudioClicked = false;
   
  }
  onClickHouse() {
    
    this.isAppartClicked = false; 
    this.isHouseClicked = true;
    if (this.isHouseClicked) {
      this.type.next('Maison');
    }
    this.isLandClicked = false;
    this.isShopClicked = false;
    this.isBuildingClicked = false;
    this.isOfficeClicked = false;
    this.isStudioClicked = false;
  }
  onClickLand() {
    
    this.isAppartClicked = false; 
    this.isHouseClicked = false;
    this.isLandClicked = true;
    if (this.isLandClicked) {
      this.type.next('Terrain');
    }
    this.isShopClicked = false;
    this.isBuildingClicked = false;
    this.isOfficeClicked = false;
    this.isStudioClicked = false;
  }
  
  onClickShop() {
    this.isAppartClicked = false; 
    this.isHouseClicked = false;
    this.isLandClicked = false;
    this.isShopClicked = true;
    if (this.isShopClicked) {
      this.type.next('Boutique');
    }
    this.isBuildingClicked = false;
    this.isOfficeClicked = false;
    this.isStudioClicked = false;
  }
  onClickBuilding() {
    this.isAppartClicked = false; 
    this.isHouseClicked = false;
    this.isLandClicked = false;
    this.isShopClicked = false;
    this.isBuildingClicked = true;
    if (this.isBuildingClicked) {
      this.type.next('Immeuble');
    }
    this.isOfficeClicked = false;
    this.isStudioClicked = false;
  }
  onClickOffice() {
    
    this.isAppartClicked = false; 
    this.isHouseClicked = false;
    this.isLandClicked = false;
    this.isShopClicked = false;
    this.isBuildingClicked = false;
    this.isOfficeClicked = true;
    if (this.isOfficeClicked) {
      this.type.next('Bureau');
    }
    this.isStudioClicked = false;
  }
  onClickStudio() {
    
    this.isAppartClicked = false; 
    this.isHouseClicked = false;
    this.isLandClicked = false;
    this.isShopClicked = false;
    this.isBuildingClicked = false;
    this.isOfficeClicked = false;
    this.isStudioClicked = true;
    if (this.isStudioClicked) {
      this.type.next('Studio');
    }
  }
  
}
