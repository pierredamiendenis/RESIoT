import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicemaquetteService } from '../services/servicemaquette.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../ip-address/ip-address.component';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  isConnected = false;
  isLoading = false;

  subscription : Subscription;

  constructor(private httpClient: HttpClient, private serviceMaquette: ServicemaquetteService, private _formBuilder : FormBuilder) { 

    this.subscription = this.serviceMaquette.getConnection().subscribe(data=>{
      this.isConnected = data;
    });
    
  }

  knxGroup : FormGroup;

  ngOnInit(){
    this.knxGroup = this._formBuilder.group({
      inputIpKnxControl: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
          Validators.pattern(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)
        ])
      ],

    });
  }
  

 

  matcher = new MyErrorStateMatcher();


  onStart(str){
    //console.log("coucou");

    //const h = new HttpHeaders({responseType: 'text', 'Accept': 'text/html, application/xhtml+xml, */*', 'Content-Type': 'application/x-www-form-urlencoded'});


    this.isLoading = true;

    var donnee = {ip:str};

    this.httpClient.post('http://localhost:8000/connect', donnee, {responseType: 'text'})
    .subscribe(
      (data)  => {

        console.log(data);
        this.isLoading = false;
        this.isConnected = true;
          },
      err => {
        console.log('Erreur ! : ' + err);
        console.log(JSON.stringify(err));
        this.isConnected = false;
        this.isLoading = false;      
      }
    )

  }

  onTest(){
    //console.log("coucou");

    setTimeout(
      () => {
        this.isLoading = false;
        this.isConnected = true;

      }, 2000
    );

  }


  setOnConnected(){
    this.isConnected = true;
  }

  setOffConnected(){
    this.isConnected = false;
  }

  

}
