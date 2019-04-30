import { Component } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { FormsModule, NgForm } from '@angular/forms';

import 'hammerjs/hammer';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient){}

  title = 'RESIoT';

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

}
