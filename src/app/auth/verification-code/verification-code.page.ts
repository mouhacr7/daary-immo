import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenSessionStorageService } from 'src/app/services/token-session-storage.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.page.html',
  styleUrls: ['./verification-code.page.scss'],
})
export class VerificationCodePage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted: boolean = false;
  token: string;
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private menuController: MenuController,
    private tokenSessionStorageService: TokenSessionStorageService,
    private alertService: AlertService)
     {
      this.menuController.enable(false);
     }

  ngOnInit() {
    this.token = this.tokenSessionStorageService.getUser()['token'];
    console.log(this.token);
    this.ionicForm = this.formBuilder.group({
      verification_code: ['', [Validators.required, Validators.pattern('^[0-9]{6}')]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}')]]
    });
    
  }
  verificationCode() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm)
      this.alertService.presentLoading();
      this.authService.verification_code(
        this.ionicForm.value.verification_code,
        this.ionicForm.value.phone_number.toString())
        .subscribe(
          data => {
              if (this.token) {
              console.log(this.token);
              console.log(data);
            if (data['message'] == "Votre code à bien été verifié, à present veuillez changer votre numéro de passe" ) {
                this.alertService.presentToast('Numéro de téléphone reconnu', 'success');
                this.alertService.dismissLoading();
              this.navCtrl.navigateRoot('/change-password');
              } 
            else if (data == "[HTTP 404] Unable to create record: The requested resource \/Services\/VAc1b6e3ff9145b90016e76f0594cb276c\/VerificationCheck was not found") {
                this.alertService.basciAlert('Réponse', 'Aucune Corespondance avec ce numèro de Téléphone, Veuillez vérifier votre code validation et votre numéro de téléphone', ['OK']);
                this.alertService.dismissLoading()
                this.alertService.presentToast('Numéro de téléphone ou code non reconnu, Veuillez vérifier une autre fois', 'danger')
            } 
                this.alertService.dismissLoading()
              } 
            },
            err => {
              this.alertService.dismissLoading();
              console.log(err);
              this.alertService.basciAlert('Réponse', 'Numéro de téléphone non-reconu dans notre base des données, vérifier le code de vérification reçu dans votre boite sms !', ['OK'])
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
    this.navCtrl.navigateRoot('/login');
  }
  logout() {
    this.tokenSessionStorageService.signOut();
  }

}
