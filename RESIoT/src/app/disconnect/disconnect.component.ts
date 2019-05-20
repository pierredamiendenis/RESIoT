import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicemaquetteService } from '../services/servicemaquette.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-disconnect',
  templateUrl: './disconnect.component.html',
  styleUrls: ['./disconnect.component.scss']
})
export class DisconnectComponent implements OnInit {

  constructor(private httpClient: HttpClient, private serviceMaquette: ServicemaquetteService) { 
   }

  ngOnInit() {
  }

  onStart(){
    //console.log("coucou");
    this.httpClient
    .get<any[]>('http://localhost:8000/disconnect')
    .subscribe(
      (response) => {
        console.log(response);
        this.serviceMaquette.setConnection(false);
        
      },
      (error) => {
        console.log('Erreur ! : ' + error);
        console.log(JSON.stringify(error));
      }
    );
  }

}
