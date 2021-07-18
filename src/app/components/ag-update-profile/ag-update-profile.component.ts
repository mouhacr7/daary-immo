import { User } from './../../models/user';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { TokenSessionStorageService } from 'src/app/services/token-session-storage.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { merge, Observable, Subject } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';

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
  isLoggedIn: boolean = false;
  name : string ='';
  username : string ='';
  email : string ='';
  phone_number : number;
  image: string = '';
  currentObject: any;
  id: User;

  currentUser$: Observable<User[]>;
  currentObject$: Observable<User[]>;
  user: User;
  // refresh data subject reactive
  refreshDataClickSubject = new Subject();
  modelUser$: Observable<{ user: User[]}>;
  
  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
  ) {}

  async ngOnInit() { 
    this.agentInfos();
  }

  async agentInfos() {
    const refreshDataClick$ = this.refreshDataClickSubject.asObservable();
   const refreshTrigger$ = refreshDataClick$.pipe(
     startWith({})
   );
  //  Agent profile infos
   this.currentObject$ = this.authService.userInfos();
   this.currentUser$ = refreshTrigger$.pipe(
    mergeMap(() => this.currentObject$)
  )
  this.currentUser$.subscribe((data) => {
    this.currentUser = data;
    console.log(this.currentUser);
    
  }) 
  this.modelUser$ = merge(
    refreshTrigger$.pipe(map(() => ({ user: []}))),
    this.currentUser$.pipe(map(user => ({ user: user})))
  );  
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
      about: this.currentUser.username,
      image: this.currentUser.username
  }
    this.updateDataEvent.emit(this.data);
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
}
