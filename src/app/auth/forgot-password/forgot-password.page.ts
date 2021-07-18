import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenSessionStorageService } from 'src/app/services/token-session-storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted: boolean = false;
  token: string;
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController,
    private tokenSessionStorageService: TokenSessionStorageService,
    private alertService: AlertService
  ) { 
    this.menuController.enable(false);
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}')]],
    });
  }
  forgotPassword() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm)
      this.alertService.presentLoading();
      this.authService.forgotPassword(
        this.ionicForm.value.phone_number.toString())
        .subscribe(
          data => {
            this.tokenSessionStorageService.saveToken(data.accessToken);
            this.tokenSessionStorageService.saveUser(data);
              this.token = this.tokenSessionStorageService.getToken();
              console.log(this.token);
              if (data['user_error']) {
                this.alertService.basciAlert('Réponse', 'Aucune Corespondance avec ce numèro de Téléphone', ['OK']);
                this.alertService.dismissLoading()
                this.alertService.presentToast('Numéro de téléphone non reconnu', 'danger')
              } else {
                this.alertService.presentToast('Numéro de téléphone reconnu', 'success');
                this.alertService.dismissLoading();
                this.router.navigateByUrl('/verification-code');
              } 
            },
            err => {
              this.alertService.dismissLoading();
              this.alertService.basciAlert('Réponse', 'Numéro de téléphone non-reconu dans notre base des données', ['OK']);
              this.alertService.dismissLoading()
           console.log(err);
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
  loginLoad() {
    this.logout();
    this.router.navigateByUrl('/login');
  }
  logout() {
    this.tokenSessionStorageService.signOut();
  }

}
