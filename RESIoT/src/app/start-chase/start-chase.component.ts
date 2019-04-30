import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-start-chase',
  templateUrl: './start-chase.component.html',
  styleUrls: ['./start-chase.component.scss']
})
export class StartChaseComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onStart(){
    console.log("coucou");
    this.httpClient
    .get<any[]>('http://localhost:8000/startandstopchenillard')
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
