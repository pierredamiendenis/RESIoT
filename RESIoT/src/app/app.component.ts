import { Component, Inject } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { FormsModule, NgForm, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';



import 'hammerjs/hammer';
import { HttpClient } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  //'/^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$/'

  matcher = new MyErrorStateMatcher();



  constructor(private http: HttpClient){}

  show_connected = false;


  title = 'RESIoT';

  sens = false;

  ip: '';
  autoTicks = true;
  disabled = false;
  invert = false;
  max = 5000;
  min = 500;
  showTicks = true;
  step = 100;
  thumbLabel = true;
  value = (this.max+this.min)/2;
  vertical = false;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;



    onTest(){

      console.log(this.value)




    }

    onSens(){

      var url_specific_speed = "http://localhost:8000/specificorder";

      var donnee = {data:"specificorder",lamporder:this.sens };

      console.log(donnee)

    this.http.post(url_specific_speed, donnee, {responseType: 'text'})
    .subscribe(
      (data)  => {

        console.log(data);
        this.sens = !this.sens;


          },
      err => {
        console.log("err : " + err.message);
      }
    )




    }

    onSpeed(){

      var url_specific_speed = "http://localhost:8000/specificspeed";

      var donnee = {data:"specificspeed",lampspeed:this.value };
      console.log(donnee)

    this.http.post(url_specific_speed, donnee, {responseType: 'text'})
    .subscribe(
      (data)  => {

        console.log(data);

          },
      err => {
        console.log("err : " + err.message);
      }
    )



    }

}


