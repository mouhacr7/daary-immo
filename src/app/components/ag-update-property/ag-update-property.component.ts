import { PropertiesService } from 'src/app/services/properties.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router  } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Properties } from 'src/app/models/properties';

@Component({
  selector: 'app-ag-update-property',
  templateUrl: './ag-update-property.component.html',
  styleUrls: ['./ag-update-property.component.scss'],
})
export class AgUpdatePropertyComponent implements OnInit {
 // @Input() userProfile: any;
 data: any;
  
 @Output() updataPropertyEvent = new EventEmitter();

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
 
 // Param headers for filter properties system
 title: string = '';
 price  : string = '';
 purpose = new BehaviorSubject('');
 type = new BehaviorSubject('');
 cuisine = new BehaviorSubject('');
 douche : string ='';
 image: string = '';
 bedroom = new BehaviorSubject('');
 bathroom = new BehaviorSubject('');
 city : string = '';
 address : string = '';
 area : string = '';
 floor_plan = '';
 description: string = '';
 nearby: string = '';
 gallaryimage = '';
 floor_preview: string;
 img_preview: string;
 gallery_preview: string;
 // featured = new BehaviorSubject('');

 // Multiple images upload
 selectedFiles: FileList;
 progressInfos = [];
 message = '';
 fileInfos: Observable<any>;
 propertiesList: Properties;
 
  constructor(
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private router: Router,
 ) {}

  ngOnInit() {
    
  }

}
