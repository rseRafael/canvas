import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {
  public received = true;
  public clicked = false;
  public intervalSettter = null;
  private currentImgPath= null;
  private currentPDFPages = null;
  private stack = [];
  private garbageStack = [];
  private color = 'black';
  private mode = true;
  private ids = {
    'blueButton': ''
  }

  private buttonsMethods = {
    setColorBlue: ()=>{
      this.color = 'blue';
    },
    setColorGreen: ()=>{
      this.color ='green';
    },
    setColorPink: ()=>{
      this.color = 'pink';
    },
    showColor: ()=>{
      console.log(this.color);
    },
    openMarkUp: ()=>{
      this.mode = true;
    },
    closeMarkUp: ()=>{
      this.mode = false;
    },
    nextPage:()=>{
      var host = "http://localhost:8080/";
      var arr = this.currentImgPath.split("/");
      var page = arr.pop();
      var path = arr.pop();
      page = parseInt(page.replace(".jpg", ""));
      if(page < this.currentPDFPages){
        page += 1;
        var length = String(this.currentPDFPages).length;
        page = this.formatNumber(page, length) + ".jpg";
        this.currentImgPath = host + path + "/" + page;
        this.getStack();

      }
    },
    backPage: ()=>{
      var host = "http://localhost:8080/";
      var arr = this.currentImgPath.split("/");
      var page = arr.pop();
      var path = arr.pop();
      page = parseInt(page.replace(".jpg", ""));
      if(page > 1){
        page -= 1;
        var length = String(this.currentPDFPages).length;
        page = this.formatNumber(page, length) + ".jpg";
        this.currentImgPath = host + path + "/" + page;
        this.getStack();

      }
    }
  }

  constructor(private bookservice: BookService){ 
  }

  formatNumber(number, length){
    number = String(number);
    while(number.length < length){
      number = "0" + number;
    }
    return number;
  }

  ngOnInit() {
    this.currentImgPath = this.bookservice.imgsPath;
    this.currentPDFPages = this.bookservice.PAGES;
    this.loadImage(this.currentImgPath);
    this.getStack();
    
  }

  createMarkUp(ctx, x, y, color = "black", width = 3,  size = 10, mode = true, push = true){
    //mode é a variável que determina se o markup vai ser para abrir ou fechar.
    //push é a variável que determina se o markup vai ser colocado na lista stack.

    //lógica para controle de valor
    if(typeof width != 'number'){
        width = 3;
    }
    if(typeof size != 'number'){
        width = 3;
    }
    if(width <= 0){
        width = 3;
    }
    if(size <= 0){
        size = 10;
    }

    if(ctx != null && typeof ctx == "object"){
        console.log(`mode: ` + this.mode);
        if(mode){
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.moveTo(x + size/2, y + size);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x, y - size);
            ctx.lineTo(x + size/2, y - size);
            ctx.stroke();
            ctx.closePath();
        }
        else{
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.moveTo(x - size/2, y - size);
            ctx.lineTo(x, y - size);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x - size/2, y + size);
            ctx.stroke();
            ctx.closePath();
        }
        if(push){
            this.stack.push({
                "x": x,
                "y": y,
                "mode":  mode,
                "color": color,
                "width": width,
                "size": size,
            });
            console.log(this.stack);
            this.garbageStack = [];
        }
        this.mode  = !this.mode;
    }
  }

  backward(): boolean{
    if(this.stack.length > 0){
      this.garbageStack.push(this.stack.pop());
      this.recreateMarkUp();
      return true;
    }
    else{
      return false;
    }
  }

  forward(): boolean{
    if(this.garbageStack.length >0){
      this.stack.push(this.garbageStack.pop());
      this.recreateMarkUp();
      return  true;
    }
    else{
      return false;
    }
  }

  replace(){
    var canvas: any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
  }

  loadImage(imgPath){
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgPath;
    img.onload = 
      ()=>{ 
        console.log(imgPath);
        var canvas: any = document.getElementById("myCanvas");
        canvas.setAttribute("height", img.height);
        canvas.setAttribute("width", img.width);
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
      }
    
  }

  recreateMarkUp(){
    var img = new Image();
    img.src = this.currentImgPath;
    img.onload = 
      ()=>{ 
        console.log(this.currentImgPath);
        var canvas: any = document.getElementById("myCanvas");
        canvas.setAttribute("height", img.height);
        canvas.setAttribute("width", img.width);
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        for(var i = 0; i < this.stack.length; i++){
          this.createMarkUp(context, this.stack[i].x, this.stack[i].y, this.stack[i].color, this.stack[i].width, this.stack[i].size, this.stack[i].mode, false);
      }
    }
  }

  canvasClickHandler(mouseEvent){
    this.clicked = true;
    var canvas: any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var lineWidth: any = document.getElementById("lineWidth");
    var lineSize: any = document.getElementById("lineSize");
    this.createMarkUp(ctx, mouseEvent.offsetX, mouseEvent.offsetY, this.color, Math.round(lineWidth.value), Math.round(lineSize.value), this.mode, true);
    this.clicked = false;
  }


  sendStack(){
    var canvas: any = document.getElementById("myCanvas");
    var input: any = document.getElementById("hidden_data");
    input.value = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");

    var data = new FormData(document.forms["myForm"]);
    var header = new Headers();

    data.append("imgPATH",  this.currentImgPath);

    for (var i = 0; i < this.stack.length; i++){
      var json = JSON.stringify(this.stack[i])
      data.append("obj" + (i+1), json);
    }
   
    var options: any ={
      'method': 'POST',
      'mode': 'cors',
      'headers': header,
      'redirect': 'follow',
      'body': data,
    }

    this.received = false;
    console.log("Sending the stack");
    fetch("http://localhost:8000/books/setstack/", options)
    .then((value)=>{
      console.log(value);
      return value.json();
    })
    .then((value)=>{
      console.log(value);
      this.received = true;
      console.log("the stack was sent");
    })
    .catch((reason)=>{
      console.log("deu erro");
      console.log(reason);
    })
  }
  
  SetInterval(){
    this.intervalSettter = setInterval(
      ()=>{
        if(this.received && !this.clicked){
          this.sendStack();
        }
      },
      2000
    )
  }

  getStack(){
    var arr = this.currentImgPath.split("/");
    var page = arr.pop();
    var book_id = parseInt(arr.pop().replace("book", ""));
    fetch(`http://localhost:8000/books/getstack/${book_id}/${page}/`)
    .then(
      (response)=>{
        console.log(response);
        return response.json();
      }
    )
    .then(
      (response)=>{

        console.log(response);
        console.log("reponse['info']")
        console.log(response['info'])
        if (response['info'] === undefined ){
          console.log("foi")
          this.stack = [];
          for(var obj in response){
            var o = response[obj];
            console.log(o);
            this.stack.push(JSON.parse(o));
          }
          console.log(this.stack);
          this.recreateMarkUp();
        }
        //this.SetInterval();
      }
    )
    .catch(
      (reason)=>{
        console.log("Aconteceu um Erro");
        console.log(reason);
      }
    )
  }

}
