import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public bookList = null;
  
  constructor(public bookservice: BookService, private router: Router ){ 
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    fetch("http://localhost:8000/books/get/")
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      if(json['info'] === undefined){
        this.bookList = [];
        for(var prop in json){
          json[prop]['capaPATH'] = `http://localhost:8080/book${json[prop]['id']}/` + json[prop]['capaPATH'];
          this.bookList.push(json[prop])
        }
      }
    })
    .catch((reason)=>{
      console.log("alguma erro aconteceu");
      console.log(reason);
    })
  }
  
  loadCanvas(book){
    for(var prop in this.bookList){
      var b = this.bookList[prop];
      if (b == book){
        this.bookservice.setImgsPath(book['capaPATH']);
        this.bookservice.setPagesNumber(book['PAGES']);
        console.log(this.bookservice.imgsPath);
        this.router.navigate(["/canvas"])
      }
    }
  }
}
