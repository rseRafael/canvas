import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private mouseEvent;
  constructor(){

   }
   getMouseEvent(){
     return this.mouseEvent;
   }
   setMouseEvent(event){
    console.log("received an event at the service");
    this.mouseEvent = event;
    console.log("\t\t\t\tEVENT SERVICE: ");
    console.log(this.mouseEvent);
    console.log("setted the mouseEvent attribute");
   }
  
}
