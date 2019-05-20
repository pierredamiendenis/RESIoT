import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicemaquetteService {

  onConnected : boolean = false;

  constructor() { }

  onChangeConnection(b){
    this.onConnected = b;
  }

  onGetConnectionStatus(){
    return this.onConnected;
  }



}
