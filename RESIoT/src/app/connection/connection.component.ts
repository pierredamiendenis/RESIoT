import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  isConnected = false;
  isLoading = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

  }
  

  onStart(){
    //console.log("coucou");
    this.httpClient
    .get<any[]>('http://localhost/connect')
    .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
        console.log(JSON.stringify(error));
      }
    );
  }

  onTest(){
    //console.log("coucou");
    this.isLoading = true;

    setTimeout(
      () => {
        this.isConnected = true;
        this.isLoading = false;
      }, 4000
    );

  }


  setOnConnected(){
    this.isConnected = true;
  }

  setOffConnected(){
    this.isConnected = false;
  }

}
