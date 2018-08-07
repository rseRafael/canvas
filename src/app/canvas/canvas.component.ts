import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {

  private stack = [];
  private garbageStack = [];
  private color = 'black';
  private mode = true;
  private imagePath = "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg";
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
  }

  constructor(private eventService: EventService){ 
  }

  ngOnInit() {

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
  loadImage(){
    //var img = document.getElementById("canvas-image");
    var img = new Image();
    img.src = this.imagePath;
    var canvas: any = document.getElementById("myCanvas");
    canvas.setAttribute("height", img.height);
    canvas.setAttribute("width", img.width);
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);

  }
  recreateMarkUp(){
    this.loadImage();
    var canvas: any  = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    for(var i = 0; i < this.stack.length; i++){
        this.createMarkUp(ctx, this.stack[i].x, this.stack[i].y, this.stack[i].color, this.stack[i].width, this.stack[i].size, this.stack[i].mode, false);
    }
  }
  canvasClickHandler(mouseEvent){
    var canvas: any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var lineWidth: any = document.getElementById("lineWidth");
    var lineSize: any = document.getElementById("lineSize");
    this.createMarkUp(ctx, mouseEvent.offsetX, mouseEvent.offsetY, this.color, Math.round(lineWidth.value), Math.round(lineSize.value), this.mode, true);
  }
  testClickHandler(m){
    var canvas: any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var lineSize: any = document.getElementById("lineSize");
    ctx.fillStyle = "green";
    console.log("\t\t\t\t\tREAL VALUES");

    //offsetX and offsetY são clientX - canvas.getClientRects()[0].x && clientY - canvas.getClientRects()[0].y;
    
    console.log(m.offsetX, m.offsetY)
    var x = m.clientX - canvas.getClientRects()[0].x;
    var y = m.clientY - canvas.getClientRects()[0].y;
    console.log("\t\t\t\t\tCOMPARE");
    console.log(x, y);
    ctx.fillRect(m.clientX - canvas.getClientRects()[0].x, m.clientY - canvas.getClientRects()[0].y, 10, 10);
    console.log("\t\tMOUSE EVENT");
    console.log(m);
    ctx.stroke();
  }
}
