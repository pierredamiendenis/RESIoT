import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicemaquetteService {

  onConnected : boolean = false;

  private subject = new Subject<any>();

  constructor() { }

  setConnection(b:boolean){
    this.subject.next(b);
  }

  getConnection(){
    return this.subject.asObservable();
  }



}
