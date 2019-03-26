import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lampe',
  templateUrl: './lampe.component.html',
  styleUrls: ['./lampe.component.scss']
})
export class LampeComponent implements OnInit {

  isOn = false;
  @Input() numero: string;


  constructor() { }

  ngOnInit() {
  }

  onStart(){
    console.log("je suis la lampe");
    this.isOn = !this.isOn;
  }

  onSetOn(){
    this.isOn = true;
  }

  onSetOff(){
    this.isOn = false;
  }

}
