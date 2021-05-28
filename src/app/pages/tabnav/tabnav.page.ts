import { TabService } from 'src/app/services/tab.service';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
})
export class TabnavPage implements OnInit {
isLoggeIn = new BehaviorSubject<Boolean>(false);
display: boolean = false;
auth: string;
  constructor(
    private authService: AuthService,
    private tabService: TabService
  ) { 
    
  }
  
  async ngOnInit() {
   await this.authService.loadStoredToken();
   
   console.log(await this.authService.isLoggedIn.value);
    // console.log(await this.authService.currentUserValue);
    
 if (this.authService.currentUserValue !== null) {
    this.auth = 'ag-dashboard';
    this.tabService.changeTabInContainerPage('ag-dashboard')
  } else {
    this.display = false;
    this.auth = 'login'
    this.tabService.changeTabInContainerPage('login')
  }
 console.log(this.display);
 
  }
  onClick(ev: any) {
    console.log(ev);
    this.ngOnInit();
  }
}
