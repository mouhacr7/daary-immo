import { PropertiesService } from 'src/app/services/properties.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router  } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Properties } from 'src/app/models/properties';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.page.html',
  styleUrls: ['./update-property.page.scss'],
})
export class UpdatePropertyPage implements OnInit {
// @Input() userProfile: any;
data: any;
  
// Purpose
isSaleClicked: boolean = false;
isRentClicked: boolean = false;

// Cuisine
isIntClicked: boolean = false;
isExtClicked: boolean = false;
isIntExtClicked: boolean = false;

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
onTerrain: boolean = false;
onRent: boolean = false;

// Param headers for filter properties system
title = new BehaviorSubject('');
price  : string = '';
purpose = new BehaviorSubject('');
type = new BehaviorSubject('');
cuisine = new BehaviorSubject('');
douche = new BehaviorSubject('');
image : string ='';
bedroom = new BehaviorSubject('');
bathroom = new BehaviorSubject('');
city : string = '';
address : string = '';
area : string = '';
floor_plan = '';
description: string = '';
// nearby: string = '';
gallaryimage = '';
floor_preview: string;
img_preview: string;
gallery_preview: string;
number_bath: any;
number_bed: any;
// featured = new BehaviorSubject('');

// Multiple images upload
selectedFiles: FileList;
progressInfos = [];
message = '';
fileInfos: Observable<any>;
property: Properties;
showData: boolean;
successColor: string;
outlineColor: string;
bedroom_number: any;
bathroom_number: any;

// process of inserting by steps
step1: boolean = true;
step2: boolean = false;
step3: boolean = false;
step4: boolean = false;

// Step behavior
onPrev: boolean = false;
onNext: boolean = true;

 constructor(
   private route: ActivatedRoute, 
   private router: Router, 
   private propertyService: PropertiesService,
   private alertService: AlertService
) {}
diplayLoader() {
  this.alertService.presentLoading();
  setTimeout(() => {
    this.alertService.dismissLoading();
    // This is a must for us to perform the method
  }, 2000);
}
onStep1() {
  this.diplayLoader();
this.step1 = false;
this.step2 = true;
console.log('step1');
}
onStepBack1() {

this.step1 = true;
this.step2 = false;
console.log('step back 1');

}
onStep2() {
  this.diplayLoader();
this.step2 = false;
this.step3 = true;
console.log('step2');
}
onStepBack2() {
this.step2 = true;
this.step3 = false;
console.log('step back 2');

}
onStep3() {
  this.diplayLoader();
this.step3 = false;
this.step4 = true;
console.log('step3');
}
onStepBack3() {
this.step3 = true;
this.step4 = false;
console.log('step back 3');

}

  ngOnInit() {
   
  this.route.data.subscribe((data: { property: Properties[] }) => {
    console.log(data);
    this.property = data.property['property'];
    console.log(this.property);
    this.showData = true;
  });

 // Switch for purpose incomimg data from server
  switch (this.property.purpose) {
    case 'Vendre':
      this.saleClick();
      break;
    case 'Louer':
      this.rentClick();
      break;
    default:
      break;
  }
    // Switch for cuisine incomimg data from server
  switch (this.property.cuisine) {
    case 'interne':
      this.intClick();
      break;
    case 'externe':
      this.extClick();
      break;
    case 'Les_deux':
      this.intextClick();
      break;
    default:
      break;
  }
   // Switch for type incomimg data from server
  switch (this.property.type) {
    case 'Appartement':
      this.onClickApp();
      break;
    case 'Maison':
      this.onClickHouse();
      break;
    case 'Terrain':
      this.onClickLand();
      break;
    case 'immeuble':
      this.onClickBuilding();
      break;
    case 'Boutique':
      this.onClickShop();
      break;
    case 'Bureau':
      this.onClickOffice();
      break;
    case 'Studio':
      this.onClickStudio();
      break;
    default:
      this.property.type;
      break;
  }
   // Switch for bedroom incomimg data from server
  switch (this.property.bedroom.toString()) {
    case '1':
      this.oneClick();
      break;
    case '2':
      this.twoClick();
      break;
    case '3':
      this.threeClick();
      break;
    case '4':
      this.fourClick();
      break;
    case '5':
      this.fiveClick();
      break;
    case 'plus':
      this.plusClick();
      break;
    default:
      break;
  }
   // Switch for bedroom incomimg data from server
  switch (this.property.bathroom.toString()) {
    case '1':
      this.oneRoom();
      break;
    case '2':
      this.twoRoom();
      break;
    case '3':
      this.threeRoom();
      break;
    case '4':
      this.fourRoom();
      break;
    case '5':
      this.fiveRoom();
      break;
    case 'plus':
      this.plusRoom();
      break;
    default:
      this.property.bathroom;
      break;
  }
}
uploadImage(event) {
  // if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.image = file ;
  // }
  const reader = new FileReader();
  reader.onload = () => {
    this.img_preview = reader.result as string
  }
  reader.readAsDataURL(file);
}
uploadFloor(event) {
  // if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.floor_plan = file;
  // }
  const reader = new FileReader();
  reader.onload = () => {
    this.floor_preview = reader.result as string
  }
  reader.readAsDataURL(file);
}
uploadGallery(event) {
  this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
}
  sendUpload() { 
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
      if (typeof this.bedroom_number === 'undefined') {
        this.bedroom_number = this.property.bedroom;
      } 
      if (typeof this.bathroom_number === 'undefined'){
        this.bathroom_number = this.property.bathroom;
      }
      if (this.cuisine.getValue() === null) {
        this.cuisine.next(this.property.cuisine);
      }
      
  
  this.data = {
    title: this.property.title,
    purpose: this.purpose.getValue(),
    type: this.type.getValue(),
    price: this.property.price,
    cuisine: this.cuisine.getValue(),
    douche: this.douche.getValue(),
    image: this.image,
    bedroom: this.bedroom_number,
    bathroom: this.bathroom_number,
    city: this.property.city,
    address: this.property.address,
    area: this.property.area,
    floor_plan: this.floor_plan,
    description: this.property.description,
    gallaryimage: this.selectedFiles
  };
  console.log(this.data);
  
//  call service/api to post message
//  this.alertService.presentLoading();
//     this.propertyService.updatePropertyData(this.property.id, this.data).subscribe(
//       data => {      
//         this.alertService.dismissLoading();
//         this.alertService.presentToast('Popriété modifiée avec succés :) ', 'success');
//         this.router.navigateByUrl('/ag-dashboard');
//         console.log('Property succesfully updated', data);
//       },
//       error => {
//         this.alertService.dismissLoading();
//         this.alertService.presentToast('Vous avez oubliez certains champs :( !! vérifier à nouveau les données entrées :) ', 'danger');
//         console.log('Something went wrong!', error);
//     })
}

onTerrainClicked() {
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
 this.douche.next('');
 
 // Type of cuisine
 this.isIntClicked = false;
 this.isExtClicked = false;
 this.isIntExtClicked = false
 this.cuisine.next('');

 

}
bedroomChange(e) {
  console.log(e.target.value);
  if (e.target.value > -1)
  this.isPiece1 = false;
  this.isPiece2 = false;
  this.isPiece3 = false;
  this.isPiece4 = false;
  this.isPiece5 = false;
  this.bedroom.next('');

  }
  bathroomChange(e) {
  console.log(e.target.value);
  if (e.target.value > -1)
  this.isRoom1 = false;
  this.isRoom2 = false;
  this.isRoom3 = false;
  this.isRoom4 = false;
  this.isRoom5 = false;
  this.bathroom.next('');

  }
  // Purpose handle
  saleClick() {
  this.isSaleClicked = true;
  this.isRentClicked = false;
  if (this.isSaleClicked) {
  this.purpose.next('Vendre');
  }
  this.onRent = false;
  }
  rentClick() {
  this.isRentClicked = true;
  this.isSaleClicked = false;
  if (this.isRentClicked) {
  this.purpose.next('Louer');
  }
  this.onRent = true;
  }
  // Cuisine handle
  intClick() {
  this.isIntClicked = true;
  this.isExtClicked = false;
  this.isIntExtClicked = false;
  if (this.isIntClicked) {
  this.cuisine.next('interne');
  }
  }
  extClick() {
  this.isExtClicked = true;
  this.isIntClicked = false;
  this.isIntExtClicked = false;
  if (this.isExtClicked) {
  this.cuisine.next('externe');
  }

  }
  intextClick() {
  this.isIntExtClicked = true;
  this.isExtClicked = false;
  this.isIntClicked = false;
  if (this.isIntExtClicked) {
  this.cuisine.next('Les_deux');
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
  this.onTerrain = false;

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
  this.onTerrain = false;
  this.onTerrain = false;
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
  this.onTerrain = true;
  // reinitialised features 
  this.onTerrainClicked();
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
  this.onTerrain = false;
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
  this.onTerrain = false;
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
  this.onTerrain = false;
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
  this.onTerrain = false;
  }

}

