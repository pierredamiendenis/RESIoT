import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';


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

  constructor(private socketDataService: SocketService, private http: HttpClient) {}

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

  onStart(id){

    var url = "http://localhost:8000/specificlampe";

    if(id==1){

      //this.isOn_one = !this.isOn_one;

      var etat = this.isOn_one;

    } else if(id==2){

      //this.isOn_two = !this.isOn_two;

      var etat = this.isOn_two;

    } else if(id==3){

      //this.isOn_three = !this.isOn_three;

      var etat = this.isOn_three;

    } else if(id==4){

      //this.isOn_four = !this.isOn_four;

      var etat = this.isOn_four;

    }

    console.log(id, etat);

    if(etat==true){
      var etat_numero = 0;
    } else {
      var etat_numero = 1;
    }


    var donnee = {data:"specificlampe",numerolamp:id, state:etat_numero };

    this.http.post(url, donnee, {responseType: 'text'})
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
