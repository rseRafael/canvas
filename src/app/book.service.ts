import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public imgsPath = null;
  public PAGES = null;
  constructor(){

   }

   setImgsPath(imgsPath){
    this.imgsPath = imgsPath;
   }

   setPagesNumber(pages){
    this.PAGES = pages;
   }
}
