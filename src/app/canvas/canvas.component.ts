import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {
  public open = false;
  public received = true;
  public clicked = false;
  public intervalSettter = null;
  private currentImgPath= null;
  private currentPDFPages = null;
  private stack = [];
  private garbageStack = [];
  private color = 'black';
  private mode = true;
  private zoomer = 3;
  private ids = {
    'blueButton': ''
  }
  private erasable = false;
  private buttonsMethods = {
    setColorBlue: ()=>{
      this.makeUnerasable();
      this.color = 'blue';
    },
    setColorGreen: ()=>{
      this.makeUnerasable();
      this.color ='green';
    },
    setColorPink: ()=>{
      this.makeUnerasable();
      this.color = 'rgba(255, 50, 149, 0.92)';
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
    nextPage:(selectedPage = null)=>{
      if(selectedPage == null){
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
          this.buttonsMethods.setPage();

        }
      }
      else{
        var host = "http://localhost:8080/";
        var arr = this.currentImgPath.split("/");
        var page = arr.pop();
        var path = arr.pop();
        page = selectedPage
        if(page < this.currentPDFPages){
          var length = String(this.currentPDFPages).length;
          page = this.formatNumber(page, length) + ".jpg";
          this.currentImgPath = host + path + "/" + page;
          this.getStack();
          this.buttonsMethods.setPage();
        }
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
        this.buttonsMethods.setPage();
      }
    },
    setPage:()=>{
      var pg: any = document.getElementById("pageNumber");
      var path  =this.currentImgPath.split("/");
      var number = path.pop();
      number = parseInt(number.replace(".jpg",  ""));
      console.log(number);
      pg.value = number;

    },
    goToPage: ()=>{
      var pg: any = document.getElementById("pageNumber");
      this.buttonsMethods.nextPage(pg.value);
    },
    setConfigDiv: ()=>{
      
      var mainDiv = document.getElementById("configDiv");
      var open = !this.open;
      
      if(open == true){
        mainDiv.style.animation = "increase";
        mainDiv.style.animationDuration = "0.5s";
        mainDiv.style.animationIterationCount = "1";
        mainDiv.style.width = "1700px";
      }
      else{
        mainDiv.style.animation = "decrease";
        mainDiv.style.animationDuration = "0.5s";
        mainDiv.style.animationIterationCount = "1";
        mainDiv.style.width = "55px";
      }
      mainDiv.addEventListener("animationend",()=>{
        this.open = open;
        console.log("Finishing animation");
      });
      mainDiv.addEventListener("animationstart", ()=>{
        console.log("beggining animation");
      });
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
    console.log(1);
    this.currentImgPath = "http://localhost:8000/static/dog.jpg"
    this.loadImage(this.currentImgPath);
    console.log(2);
    //this.getStack();
    console.log(3);
    //this.buttonsMethods.setPage();
    console.log(4);
    //console.log("pdf pages: ", this.currentPDFPages);
    var canvas = document.getElementById("myCanvas");
    /*
    canvas.onmousemove = (event)=>{
      this.whereWeAre(event.offsetX, event.offsetY);
    }
    canvas.onmouseover = (event) =>{
      console.log("hello, world")
      this.whereWeAre(event.offsetX, event.offsetY);
    }
    */
   /*
    canvas.onclick = (event)=>{
      console.log("clicked");
      var canvas: any = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.strokeStyle = "blue";
      ctx.arc(event.offsetX,event.offsetY,10,0,2*Math.PI);
      ctx.fill()
      ctx.stroke();
    }
  */
  }
  zoomIn(){
    this.zoomer += 0.3;
    this.canvasWhite();
    this.loadImage(this.currentImgPath);
    console.log("zoomIn");
  }
  zoomOut(){
    if(this.zoomer >= 0.3){
      this.zoomer -= 0.3;
      this.canvasWhite();
      this.loadImage(this.currentImgPath);
      console.log("zoomOut");
    }
  }

  createMarkUp(ctx, x, y, color = "black", width = 3,  size = 10, mode = true, push = true){
    //mode é a variável que determina se o markup vai ser para abrir ou fechar.
    //push é a variável que determina se o markup vai ser colocado na lista stack.
    //lógica para controle de valor

    console.log("------------------- 0 --------------------------")
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
    console.log("------------ 1 -------------");
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
        console.log("------------ 2 -------------");
        /*
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
        */
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
    //img.crossOrigin = "anonymous";
    img.src = imgPath;
    console.log("loadImage");

    img.onload = 
      ()=>{ 
        console.log(imgPath);
        var canvas: any = document.getElementById("myCanvas");
        var height = img.height/3;
        var width = img.width/3;
        var context = canvas.getContext("2d");
        context.drawImage(img, 20, 20, img.width/this.zoomer, img.height/this.zoomer);
      }
    
  }

  recreateMarkUp(){
    var img = new Image();
    img.src = this.currentImgPath;
    console.log("reacreateMarkUp");
    img.onload = 
      ()=>{ 
        console.log(this.currentImgPath);
        var canvas: any = document.getElementById("myCanvas");
        var height = img.height/1.5;
        var width = img.width/1.5;
        canvas.setAttribute("height", height);
        canvas.setAttribute("width", width);
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, width, height);
        /*an
        for(var i = 0; i < this.stack.length; i++){
          this.createMarkUp(context, this.stack[i].x, this.stack[i].y, this.stack[i].color, this.stack[i].width, this.stack[i].size, this.stack[i].mode, false);
        }
        */
    }
  }

  canvasClickHandler(mouseEvent){
    console.log(mouseEvent);
    var arr = []
    var prop: string;
    for(var prop in mouseEvent){
      if(prop.search("X") != -1 || prop.search("Y") != -1){
        console.log(`${prop} = ${mouseEvent[prop]}`);
      }
      else if(prop.search("x") != -1 || prop.search("y") != -1){
        console.log(`${prop} = ${mouseEvent[prop]}`);
      }
      else{
        arr.push(prop);
      }
    }
    console.log(arr);
  
    if(this.erasable){
      console.log("start erasing");
      this.eraseMark(mouseEvent);
     
    }
    else{
      console.log("start marking up");
      var canvas: any = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var lineWidth: any = document.getElementById("lineWidth");
      var lineSize: any = document.getElementById("lineSize");
      console.log("creating mark up")
      console.log(this.color);
      this.createMarkUp(ctx, mouseEvent.offsetX, mouseEvent.offsetY, this.color, Math.round(lineWidth.value), Math.round(lineSize.value), this.mode, true);
      console.log(this.stack.length);
    }
  }

  canvasWhite(){
    var canvas: any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokStyle = "white";
    ctx.fillRect(0,0,500,500)
    ctx.fill();
    ctx.stroke();
    ctx.rect(0,0,500,500);
    ctx.clearRect(0,0,canvas.width, canvas.heigth);
  }

  whereWeAre(x: number, y: number){
    this.loadImage(this.currentImgPath);
    var canvas: any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.strokeStyle = "blue";
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.fill()
    ctx.stroke();

  }


  sendStack(){
    var canvas: any = document.getElementById("myCanvas");
    var input: any = document.getElementById("hidden_data");
    input.value = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");

    var data = new FormData(document.forms["myForm"]);
    var header = new Headers();

    data.append("imgPATH",  this.currentImgPath);
    
    console.log("Loopar a stack");
    for (var i = 0; i < this.stack.length; i++){
      var json = JSON.stringify(this.stack[i])
      console.log(`${i}-object: ${json}`);
      data.append("obj" + (i+1), json);
    }
    console.log("Fazer a stack normal");
   
    var options: any ={
      'method': 'POST',
      'mode': 'cors',
      'headers': header,
      'redirect': 'follow',
      'body': data,
    }

    this.received = false;
    console.log("Sending the stack of length: " + this.stack.length);
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

  makeErasable(){
    this.erasable = true;
  }

  makeUnerasable(){
    this.erasable = false;
  }

  eraseMark(mouseEvent){
    var x0 = mouseEvent.offsetX;
    var y0 = mouseEvent.offsetY;
    var dist: number = null;
    var index = null;
    for( var i in this.stack){  
      var d = this.distance(x0, y0, this.stack[i].x, this.stack[i].y);
      if(dist === null){
        dist = d;
        index = parseInt(i);
      }
      else if(d < dist){
        dist = d;
        index = parseInt(i);
      }
    }
    if(dist !== null && index !== null){
      if(dist <= 15){
        console.log(`distance: ${dist}, index: ${index}`);
        this.popAnIndex(index);
      }
    }
  }

  popAnIndex(index: number){
    console.log("index: ");
    console.log(index);
    var stack1 = this.stack.slice(0, index);
    console.log("this.stack.length: " + this.stack.length);
    var indexplus = index + 1;
    console.log("indexplus: "+ indexplus);
    var stack2 = this.stack.slice(indexplus, this.stack.length);
    console.log("this.stack.length: " + this.stack.length);
    console.log("Stack 1: ");
    console.log(stack1);
    console.log("Stack 2:");
    console.log(stack2);
    console.log("old stack length: " + this.stack.length);
    this.stack = stack1.concat(stack2);
    console.log("new stack length: " + this.stack.length);
    var popedItem = this.stack[index];
    this.garbageStack.push(popedItem);
    this.recreateMarkUp();
    console.log(`recreated!!`);
  }

  distance(x0, y0, x1, y1): number{
    var dist = Math.sqrt((x1 - x0)**2 + (y1 - y0)**2);
    return dist;
  }

}
