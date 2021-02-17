import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PropertiesService } from 'src/app/services/properties.service';
import { TokenSessionStorageService } from 'src/app/services/token-session-storage.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-ag-update-profile',
  templateUrl: './ag-update-profile.component.html',
  styleUrls: ['./ag-update-profile.component.scss'],
})
export class AgUpdateProfileComponent implements OnInit {

  data : any;
  ionicForm: FormGroup;
  @Output() updateDataEvent = new EventEmitter();

errorMessage = '';
isSubmitted: boolean = false;
  users: any;
  token: any;
  currentUser: any;
  img_preview: string;

  name : string ='';
  username : string ='';
  email : string ='';
  phone_number : number;
  image: string = '';
  constructor(
    private alertCtrl:AlertController,
    private tokenSession: TokenSessionStorageService,
    private propertyService: PropertiesService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() { 
    
    this.users = this.tokenSession.getUser();
    this.token = this.tokenSession.getUser()['token'];
    this.currentUser = this.users.user;
  }

  uploadImage(event) {
    // if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    // }
    const reader = new FileReader();
    reader.onload = () => {
      this.img_preview = reader.result as string
    }
    reader.readAsDataURL(file);
  }
  sendUpdatedData() {
    this.data = {
      name: this.currentUser.name,
      phone_number: this.currentUser.phone_number,
      username: this.currentUser.username,
      email: this.currentUser.email,
      about: this.currentUser.about,
      image: this.image
  }
    this.updateDataEvent.emit(this.data);
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
}
