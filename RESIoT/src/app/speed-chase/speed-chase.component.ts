import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-speed-chase',
  templateUrl: './speed-chase.component.html',
  styleUrls: ['./speed-chase.component.scss']
})
export class SpeedChaseComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onStart(){
    console.log("speed");
    this.httpClient
    .get<any[]>('http://localhost:8000/speedchenillard')
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

}
