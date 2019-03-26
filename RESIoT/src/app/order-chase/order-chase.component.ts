import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order-chase',
  templateUrl: './order-chase.component.html',
  styleUrls: ['./order-chase.component.scss']
})
export class OrderChaseComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onStart(){
    //console.log("coucou");
    this.httpClient
    .get<any[]>('http://localhost/orderchenillard')
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
