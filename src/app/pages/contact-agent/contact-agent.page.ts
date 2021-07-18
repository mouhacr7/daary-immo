import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Properties } from 'src/app/models/properties';
import { PropertiesService } from 'src/app/services/properties.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { AlertService } from 'src/app/services/alert.service';
import { IonInfiniteScroll, LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-agent',
  templateUrl: './contact-agent.page.html',
  styleUrls: ['./contact-agent.page.scss'],
})
export class ContactAgentPage implements OnInit {
  agent: any;
  propertiesList: Properties[] = [];
  displayedList: Properties[];
  property: Properties;
  showData = false;
  loading: any;
  name: any;
  email: any;
  phone: any;
  my_message: any;
  message: any;
  errorMessage = '';
  data: {};
  ionicForm: FormGroup;
  isSubmitted: boolean;
  currentPage = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private propertyService: PropertiesService,  
    private alertService: AlertService,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    private messageService: MessagesService,
    private callNumber: CallNumber
  ) { 
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]] ,
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      message: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  
  async loadingFunction() {
    this.loading = await this.loadingController.create({
      message: 'Veuillez patienter...',
      spinner: 'crescent',
      duration: 2000
    });
    await this.loading.present();
  }
  
  ngOnInit() {
    this.route.data.subscribe((data: { agent : any }) => {
      this.agent = data.agent.agent[0];
     console.log(this.agent);
    });
    this.loadingFunction();
    this.propertyService.getAgentProperties(this.agent.id, this.currentPage).subscribe(async (data: Properties[]) => {
      
      this.propertiesList = data['properties']['data'];
      this.displayedList = [...this.propertiesList];
      console.log( this.propertiesList )
      // console.log(this.propertiesList);
      
      this.propertiesList.map( prop => {
       console.log(prop);
      });
    })
  }

  sendMessage() { 
    this.isSubmitted = true;
    this.data = {
        agent_id: this.agent.id,
        property_id: null,
        name: this.ionicForm.value.name,
        email: this.ionicForm.value.email,
        phone: this.ionicForm.value.phone,
        message: this.ionicForm.value.message,
    }
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.data);
      this.alertService.presentLoading();
      this.messageService.SendMessage(this.data)
        .subscribe(
            data => {
              if (data['message'] == "Message send successfully." ) {
                this.alertService.dismissLoading();
                this.alertService.presentToast('Message envoyé avec succés :)', 'success');
              } 
            else {
                this.alertService.dismissLoading()
                this.alertService.presentToast('Erreur dans l\'envoi du message', 'danger')
            } 
            },
            err => {
              this.alertService.dismissLoading();
              console.log(err);
            }
        );
                
    }
}

async loadMorePosts(event) {
  const toast = await this.toastController.create({
    message: 'Fin de liste :)',
    animated: true,
    duration: 5000,
    buttons: [
        {
            text: 'Done',
            role: 'cancel',
            icon: 'close'
        }
    ]
});
if (event == null) {
  this.currentPage = 1;
  return;
} else {
  this.currentPage++;
  this.propertyService.getPostsPaginated(this.currentPage).subscribe(async (data: Properties[]) => {
      this.propertiesList = this.propertiesList.concat(data['properties']['data']);
      this.displayedList = [...this.propertiesList];

      if (event !== null) {
        event.target.complete();
      }

      if (data['properties']['data'].length < 10) {
          await toast.present().then();
          event.target.disabled = true;
      }
  }, (err) => {
      console.log(err);
  });

}

}
toggleInfiniteScroll() {
  this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
}
get errorControl() {
  return this.ionicForm.controls;
}
callAgent() {
  return this.callNumber.callNumber(this.agent.phone_number.toString(), true)
  .then(res => console.log('Launched dialer! Number called = ' + this.agent.phone_number.toString(), res))
  .catch(err => console.log('Error launching dialer ! Number called = ' + this.agent.phone_number.toString(), err))
}
}