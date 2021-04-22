import { TokenSessionStorageService } from './../../services/token-session-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string[] = [];
  agent: string = '2';
  user: string = '3';
  isSubmitted: boolean = false;
  mySubscription: any;
 
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router,
    private menuController: MenuController,
    private tokenSessionStorageService: TokenSessionStorageService,
    private alertService: AlertService
  ) { 
    
    this.menuController.enable(true);
    // if (this.tokenSessionStorageService.getToken()) {
    //   this.isLoggedIn = true;
    //   this.role = this.tokenSessionStorageService.getUser().user.role_id;
    //   if (this.role.toString() == this.agent) {
    //     this.navCtrl.navigateForward('/ag-dashboard');
    //     this.alertService.presentToast('Vous étes déjà connecté :)', 'success')
    //   } else {
    //     this.navCtrl.navigateForward('/usr-dashboard');
    //     this.alertService.presentToast('Vous étes déjà connecté :)', 'success')
    //   }
    //   console.log(this.role.toString());
    // }
  }
  ngOnInit() {
  
    this.ionicForm = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      console.log(this.authService.isLoggedIn);
      if(this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/ag-dashboard');
        this.alertService.presentToast('Vous étes déjà connecté :)', 'success')
      }
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  // On Register button tap
  async registerLoad() {
    this.navCtrl.navigateRoot('/signup');
  }
  async forgotPassLoad() {
    this.navCtrl.navigateRoot('/forgot-password');
  }
  login() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.alertService.presentLoading();
      this.authService.login(
        this.ionicForm.value.phone_number,
        this.ionicForm.value.password)
        .subscribe(
          data => {
            this.tokenSessionStorageService.saveToken(data.accessToken);
            this.tokenSessionStorageService.saveUser(data);
  
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.role = this.tokenSessionStorageService.getUser().user.role_id;
            console.log(this.role);
            if (this.role.toString() == this.agent) {
              this.navCtrl.navigateRoot('/ag-dashboard');
              this.alertService.dismissLoading()
            } else {
              this.navCtrl.navigateRoot('/usr-dashboard');
              this.alertService.dismissLoading()
            }
            console.log(this.role.toString());
            },
            err => {
              this.alertService.dismissLoading()
              this.errorMessage = err.error.error;
              console.log(this.errorMessage);
              this.isLoginFailed = true;
            }
        );
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  reloadPage() {
    window.location.reload();
  }

}
