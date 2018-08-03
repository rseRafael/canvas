import { Component } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( private eventService: EventService ){

  }

  passMouseEvent(mouseEvent){
    console.log("passing mouse event");
    this.eventService.setMouseEvent(mouseEvent);
    console.log("passMouseEvent done")
  }
}
