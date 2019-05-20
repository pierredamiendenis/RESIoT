import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.scss'],


})


  


export class IpAddressComponent implements OnInit {

  constructor(private _formBuilder : FormBuilder) { }
  
 /* ipGroup: FormGroup;

  ngOnInit() {
    this.ipGroup = this._formBuilder.group({
      emailFormControl : ['',
      Validators.compose([
        Validators.required,
        Validators.pattern('/^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/'),
      ])
    ]
    })
  }*/

  knxGroup : FormGroup;

  ngOnInit(){
    this.knxGroup = this._formBuilder.group({
      inputNameKnxControl: [
        '',
        Validators.compose([
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(254)
        ])
      ],
      inputIpKnxControl: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
          Validators.pattern(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)
        ])
      ],
      inputPortKnxControl: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(5),
        ]) 
      ],

    });
  }
  

 

  matcher = new MyErrorStateMatcher();

}
