import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  isFilePdf = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submitHandler(event: Event){
    event.preventDefault();
    var book: any = document.getElementById("book");
    var file: any = book.files[0];
    console.log(file)
    if(file){
      if(file.type.search("pdf") != -1){
        this.isFilePdf = true;
        var form: any = document.getElementById("form");
        var data = new FormData(form);
        var header = new Headers();
        data.append("csrfmiddlewaretoken",  "1zYlklGam9WsvvfZUysfErZ1ugnWsoYzuECpChnLzaFvVaofNV4GxMWzrYm4frzl");
        header.append('X-CSRFToken', "1zYlklGam9WsvvfZUysfErZ1ugnWsoYzuECpChnLzaFvVaofNV4GxMWzrYm4frzl");
        var options: any ={
          'method': 'POST',
          'mode': 'cors',
          'headers': header,
          'redirect': 'follow',
          'body': data,
        }
        fetch("http://localhost:8000/book/upload/", options)
        .then((value)=>{
          console.log(value);
          return value.json();
        })
        .then((value)=>{
          console.log(value);
        })
        .catch((reason)=>{
          console.log("deu erro");
          console.log(reason);
        })
      }
      else{
        this.isFilePdf = false;
      }
    }
    

  }
}
