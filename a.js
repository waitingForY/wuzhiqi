// JavaScript Documentvar canvas = document.getElementsByTagName("canvas")[0]
var ctx = canvas.getContext("2d");
var frame = 0;
var color1 = Math.random(),
    color2 = Math.random(),
    color3 = Math.random();
var interval1 = Math.random()*0.1,
    interval2 = Math.random()*0.1,
    interval3 = Math.random()*0.1;
var colorMax1 = 100 + Math.floor(155*Math.random()),
    colorMax2 = 100 + Math.floor(155*Math.random()),
    colorMax3 = 100 + Math.floor(155*Math.random());
var scale = 1.5;
var rotation = Math.random()*0.01;
var seedX = seedY = 10
var amount = 0.09;
var mouseX = mouseY = 0;
var enableMouse = false;
var halfwidth = ctx.canvas.width/2;
var halfheight = ctx.canvas.height/2;

document.onmousedown = function() {enableMouse = true;}
document.onmouseup = function() {enableMouse = false;}
document.onmousemove = setMousePosition;

function setMousePosition(e) {
  mouseX = (e.clientX/window.innerWidth)*ctx.canvas.width;
  mouseY = (e.clientY/window.innerHeight)*ctx.canvas.height;
}

function draw(){
 
  ctx.fillStyle = 
    "rgb("
   +Math.floor(colorMax1*Math.sin(color1))+","
   +Math.floor(colorMax2*Math.sin(color2))+","
   +Math.floor(colorMax3*Math.sin(color3))+")";
  
  ctx.fillRect(halfwidth-5, halfheight-5,seedX,seedY); 

  if(enableMouse) {
    ctx.fillRect(mouseX-5, mouseY-5,10,10);
  }

  ctx.save();
  ctx.globalAlpha = amount;
  ctx.translate(
    halfwidth,
    halfheight);
  ctx.rotate(frame);
  ctx.scale(scale, scale);
  ctx.translate(
    -halfwidth, 
    -halfheight);
  ctx.drawImage(canvas,0,0)
  ctx.restore();

  frame+=rotation; 
  color1+=interval1;
  color2+=interval2;
  color3+=interval3;
  
  window.requestAnimationFrame(draw);
};

window.setInterval(resetInterval, 1000);

function resetInterval() {
    interval1 = Math.random()*0.1;
    interval2 = Math.random()*0.1;
    interval3 = Math.random()*0.1;
    colorMax1 = 100 + Math.floor(155*Math.random());
    colorMax2 = 100 + Math.floor(155*Math.random());
    colorMax3 = 100 + Math.floor(155*Math.random());
    rotation = Math.random()*0.01;
    seedX = seedY = Math.random()*10;
 // amount = Math.random()*0.1;
}

// lets get this party started
window.requestAnimationFrame(draw);
