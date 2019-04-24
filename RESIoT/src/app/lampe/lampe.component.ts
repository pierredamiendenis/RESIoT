import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lampe',
  templateUrl: './lampe.component.html',
  styleUrls: ['./lampe.component.scss']
})
export class LampeComponent implements OnInit {

  isOn_one = false;
  isOn_two = false;
  isOn_three = false;
  isOn_four = false;

  sub: Subscription;
  socketData: any;

  constructor(private socketDataService: SocketService) {}

    ngOnInit() {
      this.getSocketData();
    }

    getSocketData(){
    this.sub = this.socketDataService.getSocketData()
      .subscribe(data => {
        this.socketData = data;

        console.log(data);
        
        var jsondata =  JSON.parse(data.toString());

        var dst = jsondata.dst;
        var etat = jsondata.etat;

        //console.log("state : " + "  |  " + dst + "   " + etat);

        if(dst==1){

          if(etat==0){

            this.isOn_one=false;

          } else {

            this.isOn_one=true;

          }

        }

        if(dst==2){

          if(etat==0){

            this.isOn_two=false;

          } else {

            this.isOn_two=true;

          }

        }

        if(dst==3){

          if(etat==0){

            this.isOn_three=false;

          } else {

            this.isOn_three=true;

          }

        }

        if(dst==4){

          if(etat==0){

            this.isOn_four=false;

          } else {

            this.isOn_four=true;

          }

        }

        
    })
  }

  onSetOn(){
    this.isOn_one = true;
  }

  onSetOff(){
    this.isOn_one = false;
  }

  onStart(){
    console.log("test")
  }


}
