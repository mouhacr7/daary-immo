import {
  Router
} from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModalController,
  NavController,
  Platform,
  MenuController
} from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm
} from "@angular/forms";
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  TokenSessionStorageService
} from 'src/app/services/token-session-storage.service';
import {
  ValidatorService
} from 'src/app/services/validator.service';
import {
  AlertService
} from 'src/app/services/alert.service';


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
    private router: Router,
    private menuCtrl: MenuController,
    private platform: Platform,
    private tokenSessionStorageService: TokenSessionStorageService) {

    this.ionicForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      // username: ['', [Validators.required, Validators.minLength(6)]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone_number: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [''],
      agent: [true]
    }, {
      validator: ValidatorService('password', 'password_confirmation')
    });
    this.menuCtrl.enable(true);
  }

  ngOnInit() {

    if (this.tokenSessionStorageService.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenSessionStorageService.getUser().user.role_id;
      this.currentUserName = this.tokenSessionStorageService.getUser().user.name;
      if (this.role.toString() == this.agent) {
        this.router.navigateByUrl('/ag-dashboard');
        this.alertService.presentToast(`Vous étes déjà connecté :)`, 'success')
      } else {
        this.router.navigateByUrl('/usr-dashboard');
        this.alertService.presentToast('Vous étes déjà connecté :)', 'success')
      }
      console.log(this.role.toString());
    }
  }
  // On Register button tap
  async loginLoad() {
    this.router.navigateByUrl('/login');
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
        result => {
          if (result) {
            this.alertService.dismissLoading()
            this.router.navigateByUrl('/login');
          }
        },
        error => {
          switch (error) {
            case '400':
              this.alertService.dismissLoading()
              this.alertService.presentToast('Numéro de télélphone éxiste déjà', 'danger')
              this.errorMessage = error;
              console.log(this.errorMessage);
              break;
            default:
              this.alertService.dismissLoading()
              this.alertService.presentToast('Une érreur s\'est produite! Réessayer', 'danger')
              this.errorMessage = error;
              console.log(this.errorMessage);
              break;
          }
        }
      );
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
}