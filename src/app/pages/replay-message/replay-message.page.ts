import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { AlertService } from 'src/app/services/alert.service';
import { MessagesService } from 'src/app/services/messages.service';
@Component({
  selector: 'app-replay-message',
  templateUrl: './replay-message.page.html',
  styleUrls: ['./replay-message.page.scss'],
})
export class ReplayMessagePage implements OnInit {
  message: any;
  ionicForm: FormGroup;
  errorMessage = '';
  data: {};
  constructor(
              private alertService: AlertService,
              private route: ActivatedRoute,
              public formBuilder: FormBuilder,
              private messageService: MessagesService,
   ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { message: any[] }) => {
      this.message = data.message['message'];
        console.log( this.message);
      });

      this.ionicForm = this.formBuilder.group({
        my_message: ['', [Validators.required, Validators.minLength(2)]] ,
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
       
      });
  }

  sendMessage() {
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.data = {
        user_id:  this.message.id,
        name:  this.message.name,
        email:  this.message.email,
        phone: this.ionicForm.value.phone,
        message: this.ionicForm.value.my_message,
      }
      this.alertService.presentLoading();
      this.messageService.replayMessage(this.data).subscribe(
          data => {
            this.alertService.presentToast('Message envoyé avec succés :) !!', 'success');
            this.alertService.dismissLoading()
            console.log(data);
            
              },
              err => {
                this.alertService.presentToast('Une erreur s\'est pproduit au moment de l\'envoi du message :( !! Veuillez réessayer', 'danger');
                this.alertService.dismissLoading()
                this.errorMessage = err.error;
                console.log(this.errorMessage)
              }
        );
    }
  }
}
