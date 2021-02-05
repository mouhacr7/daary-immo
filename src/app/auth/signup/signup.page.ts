import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform, MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { TokenSessionStorageService } from 'src/app/services/token-session-storage.service';
import { ValidatorService } from 'src/app/services/validator.service'; 
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  number: number;
  state: boolean = false;
  ionicForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string[] = [];
  agent: string = '2';
  user: string = '3';
  isSuccessful = false;
  isSignUpFailed = false;
  isSubmitted: boolean = false;
  currentUser: any;
  currentUserName: any;
  
  constructor(
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private tokenSessionStorageService: TokenSessionStorageService) {
    
      this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]] ,
      // username: ['', [Validators.required, Validators.minLength(6)]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: [''],
      agent: [true]
    }, { validator: ValidatorService('password', 'password_confirmation')});

    if (this.tokenSessionStorageService.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenSessionStorageService.getUser().user.role_id;
      this.currentUserName = this.tokenSessionStorageService.getUser().user.name;
      if (this.role.toString() == this.agent) {
        this.navCtrl.navigateRoot('/ag-dashboard');
        this.alertService.presentToast(`Vous étes déjà connecté :)`, 'success')
      } else {
        this.navCtrl.navigateRoot('/usr-dashboard');
        this.alertService.presentToast('Vous étes déjà connecté :)', 'success')
      }
      console.log(this.role.toString());
    }
  }
    // On Register button tap
  async loginLoad() {
    this.navCtrl.navigateRoot('/login');
  }

  register(form: NgForm) {
    console.log(form);
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.alertService.presentLoading();
      this.authService.register(form).subscribe(
          data => {
            this.alertService.dismissLoading()
            this.tokenSessionStorageService.saveToken(data.accessToken);
            this.tokenSessionStorageService.saveUser(data);
  
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.role = this.tokenSessionStorageService.getUser().user.role_id;
              if (this.role.toString() == this.agent) {
                this.navCtrl.navigateRoot('/ag-dashboard');
                }
              console.log(this.role.toString());
              },
              err => {
                this.alertService.dismissLoading()
                this.alertService.basciAlert( 'Oups!!!','Une erreur s\'est produite( Veuillez vérifier les données saisies !',  ['OK'])
                this.errorMessage = err.error;
                console.log(this.errorMessage)
                this.isLoginFailed = true;
              }
        );
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
}
