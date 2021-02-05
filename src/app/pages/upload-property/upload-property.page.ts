import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-property',
  templateUrl: './upload-property.page.html',
  styleUrls: ['./upload-property.page.scss'],
})
export class UploadPropertyPage implements OnInit {

  isBuyClicked: boolean = false;
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
  
  mycolor: string;
  myfill: string;
  constructor() { }

  ngOnInit() {
  }
  buyClick() {
    this.isBuyClicked = true;
    this.isRentClicked = false;
    console.log('Buy');
    
  }
  rentClick() {
    this.isRentClicked = true;
    this.isBuyClicked = false;
    console.log('Rent');
    
  }
  // Number of Pieces
  oneClick() {
    this.isPiece1 = true;
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
    console.log('Plus piece', this.isPiecePlus);
     
  }
  // Number of rooms
  oneRoom() {
    this.isRoom1 = true;
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
    console.log('Plus rooms', this.isRoomPlus);
     
  }
  onClickApp() {
    
    this.isAppartClicked = true; 
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
  }
  
}
