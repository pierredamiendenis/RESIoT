import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicemaquetteService } from '../services/servicemaquette.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  isConnected = false;
  isLoading = false;

  constructor(private httpClient: HttpClient, private serviceMaquette: ServicemaquetteService) { }

  ngOnInit() {

  }
  

  onStart(){
    //console.log("coucou");

    //const h = new HttpHeaders({responseType: 'text', 'Accept': 'text/html, application/xhtml+xml, */*', 'Content-Type': 'application/x-www-form-urlencoded'});


    this.isLoading = true;
    this.httpClient
    .get('http://localhost:8000/connect')
    .subscribe(
      (response) => {
        //this.onTest();
        console.log(response);
        this.isLoading = false;
        this.isConnected = true;
        this.serviceMaquette.onChangeConnection(true);

      },
      (error) => {
        console.log('Erreur ! : ' + error);
        console.log(JSON.stringify(error));
        this.isConnected = false;
        this.isLoading = false;
      }
    );

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
