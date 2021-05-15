import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
})
export class TabnavPage implements OnInit {
isLoggeIn = new BehaviorSubject<Boolean>(false);
display: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.authService.getToken().then(() => {
      this.isLoggeIn.next(this.authService.isLoggedIn);
      this.display = this.isLoggeIn.getValue();
      console.log(this.display);
    });
  }
  onClick(ev: any) {
    console.log(ev);
    this.ngOnInit();
  }
}
