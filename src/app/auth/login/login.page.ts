import {
  Storage
} from '@ionic/storage';
import {
  TokenSessionStorageService
} from './../../services/token-session-storage.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  MenuController,
  NavController,
  ToastController
} from '@ionic/angular';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  AlertService
} from 'src/app/services/alert.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from '@angular/router';
import {
  TabService
} from 'src/app/services/tab.service';
import {
  first
} from 'rxjs/operators';

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
  returnUrl: string;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private tabService: TabService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private menuController: MenuController,
    private alertService: AlertService
  ) {
    this.ionicForm = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.menuController.enable(true);
  }
  async ngOnInit() {
    const isComplete = await this.storage.get('token')
    console.log(isComplete);

    if (isComplete) {
      this.router.navigateByUrl('/ag-dashboard')
    }

  }

  public changeTab(ev: any) {
    this.tabService.changeTabInContainerPage(ev);
  }
  // On Register button tap
  registerLoad() {
    this.router.navigateByUrl('/signup');
  }
  forgotPassLoad() {
    this.router.navigateByUrl('/forgot-password');
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
        .subscribe(async (result) => {
            if (result) {
              console.log(result);
              this.isLoggedIn = true;
              this.alertService.dismissLoading()
              this.router.navigateByUrl('ag-dashboard');
              this.changeTab(this.isLoggedIn)
            }
          },
          error => {
            switch (error) {
              case '400':
                this.alertService.dismissLoading()
                this.alertService.presentToast('Mot de passe ou Numéro de téléphone incorrect', 'danger')
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
          });
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

}
