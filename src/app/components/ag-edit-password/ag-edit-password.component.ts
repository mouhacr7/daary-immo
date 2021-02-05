import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-ag-edit-password',
  templateUrl: './ag-edit-password.component.html',
  styleUrls: ['./ag-edit-password.component.scss'],
})
export class AgEditPasswordComponent implements OnInit {
  data: any;
  ionicForm: FormGroup;
  @Output() editPasswordEvent = new EventEmitter();
 // Param headers for edit password system
//  currentpassword: string = '';
//  newpassword  : string = '';
//  newpassword_confirmation  : string = '';
errorMessage = '';
isSubmitted: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() { 
    this.ionicForm = this.formBuilder.group({
      currentpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword_confirmation: [''],
    }, { validator: ValidatorService('newpassword', 'newpassword_confirmation')});
  }
  sendUpload() {
    this.data = {
      currentpassword: this.ionicForm.value.currentpassword,
      newpassword: this.ionicForm.value.newpassword,
      newpassword_confirmation: this.ionicForm.value.newpassword_confirmation,
    }
    this.editPasswordEvent.emit(this.data);
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
}
