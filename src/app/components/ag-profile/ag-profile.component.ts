import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PropertiesService } from 'src/app/services/properties.service';
import { TokenSessionStorageService } from 'src/app/services/token-session-storage.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-ag-profile',
  templateUrl: './ag-profile.component.html',
  styleUrls: ['./ag-profile.component.scss'],
})
export class AgProfileComponent implements OnInit {
 data : any;
  ionicForm: FormGroup;
  @Output() updateDataEvent = new EventEmitter();
 // Param headers for edit password system
//  currentpassword: string = '';
//  newpassword  : string = '';
//  newpassword_confirmation  : string = '';
errorMessage = '';
isSubmitted: boolean = false;
  users: any;
  token: any;
  currentUser: any;
  constructor(
    private alertCtrl:AlertController,
    private tokenSession: TokenSessionStorageService,
    private propertyService: PropertiesService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() { 
    
    this.users = this.tokenSession.getUser();
    this.token = this.tokenSession.getUser()['token'];
    console.log(this.token);
    
    this.currentUser = this.users.user;
    console.log(this.currentUser.name);

    this.ionicForm = this.formBuilder.group({
      currentpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword_confirmation: [''],
    }, { validator: ValidatorService('newpassword', 'newpassword_confirmation')});
  }
  sendUpdatedData() {
    this.data = {
      currentpassword: this.ionicForm.value.currentpassword,
      newpassword: this.ionicForm.value.newpassword,
      newpassword_confirmation: this.ionicForm.value.newpassword_confirmation,
    }
    this.updateDataEvent.emit(this.data);
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
}
