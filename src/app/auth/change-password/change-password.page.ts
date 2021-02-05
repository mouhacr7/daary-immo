import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { TokenSessionStorageService } from 'src/app/services/token-session-storage.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted: boolean = false;
  token: any;
  data: { newpassword: any; newpassword_confirmation: any; };

  constructor(
    private propertyService: PropertiesService,
    private authService: AuthService,
    private navCtrl: NavController,
    private menuController: MenuController,
    private tokenSessionStorageService: TokenSessionStorageService,
    private alertService: AlertService,
    public formBuilder: FormBuilder
  ) { 
    this.menuController.enable(false);
    this.ionicForm = this.formBuilder.group({
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword_confirmation: [''],
    }, { validator: ValidatorService('newpassword', 'newpassword_confirmation')});
  }

  ngOnInit() {
    this.token = this.tokenSessionStorageService.getUser()['user_token'];
    console.log(this.token);
  }
  changePassword() {
    this.data = {
      newpassword: this.ionicForm.value.newpassword,
      newpassword_confirmation: this.ionicForm.value.newpassword_confirmation,
    }
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.data)
      this.alertService.presentLoading();
      this.authService.reset_password(this.data)
        .subscribe(
          data => {
            console.log(data);
              console.log(data['message']);
              if (data['message'] === "Votre mot de passe actuel ne correspond pas au mot de passe que vous avez fourni! Veuillez réessayer.") {
                this.alertService.dismissLoading()
                this.alertService.basciAlert('Oups!!!', data['message'],  ['OK'])
              } else if (data['message'] === "Le mot de passe a été changé avec succès.") {
                this.alertService.basciAlert('Bravo!!!', data['message'],  ['OK'])
                this.logout();
                this.navCtrl.navigateRoot('/login');
                this.alertService.dismissLoading()
              } else {
                this.alertService.dismissLoading()
                this.alertService.basciAlert('Oups!!!', data['message'],  ['OK'])
              }
            },
            err => {
           console.log(err);
           console.log(err);
            }
        );
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  loginLoad() {
    this.logout();
    this.navCtrl.navigateRoot('/login');
  }
  logout() {
    this.tokenSessionStorageService.signOut();
  }
}
