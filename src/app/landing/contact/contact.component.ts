import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageService } from '../../services/alert-message.service';
import { FormSpreeService } from '../../services/form-spree.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formContact: FormGroup =  this._fb.group({});
  countMessage: number = 0;
  constructor(
    private _fb: FormBuilder,
    private _formSpreeService: FormSpreeService,
    private _translateService: LangService,
    private _alertMessageService: AlertMessageService,
    private _spinnerService: NgxSpinnerService
  ) {
   
  }

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formContact = this._fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      phone: [
        '',
        [
          Validators.pattern('[- +()0-9]+'),
          Validators.maxLength(15),
          Validators.minLength(7)
        ]
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)]
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(256)
        ]
      ]
    });
  }

  get email() {
    return this.formContact.get('email') as FormControl;
  }

  get name() {
    return this.formContact.get('name') as FormControl;
  }

  get message() {
    return this.formContact.get('message') as FormControl;
  }

  get phone() {
    return this.formContact.get('phone') as FormControl;
  }

  checkError(element: FormControl) {
    return element.invalid && (element.dirty || element.touched);
  }

  validate(element: FormControl) {
    return (
      this.checkError(element) &&
      (element.errors?.['required'] ||
        element.errors?.['maxlengt'] ||
        element.errors?.['minlengt'])
    );
  }

  validateEmail(element: FormControl) {
    return (
      this.checkError(element) &&
      (element.errors?.['required'] ||
        element.errors?.['maxlengt'] ||
        element.errors?.['email'])
    );
  }

  validatePhone(element: FormControl) {
    return (
      this.checkError(element) &&
      (element.errors?.['pattern'] ||
        element.errors?.['maxlengt'] ||
        element.errors?.['required'] ||
        element.errors?.['minlength'])
    );
  }

  setCountMessage(event: any): void {
    this.countMessage = event.target.value.length;
  }

  private markAllAsTouched() {
    const controls = this.formContact.controls;
    Object.values(controls).forEach((control) => control.markAsTouched());
  }

  private sendMessage() {
    this._spinnerService.show();
    // this._formSpreeService.sendMessage(this.formContact.value).subscribe(
    //   (rsp) => {
    //     this._alertMessageService.success(
    //       this._translateService.getTranslate('contact.message_sent')
    //     );
    //     this.formContact.reset();
    //     this._spinnerService.hide();
    //   },
    //   (err) => {
    //     this._alertMessageService.error(
    //       this._translateService.getTranslate('contact.error_send_email')
    //     );
    //     this._spinnerService.hide();
    //   }
    // );
  }

  submit(): void {
    this.formContact.valid ? this.sendMessage() : this.markAllAsTouched();
  }
}
