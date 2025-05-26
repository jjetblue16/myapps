let theCanvas;

let ctx;

let isMouseDown=false;

let background;

let width;
let height;

let tools;
let paletteOpen;

let palette;

let currentColor="black";

let color;

let slidecontainer;

let sliderValue=50;

let slider;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    background=document.getElementById("background");
    let backgroundInfo=background.getBoundingClientRect();
    width=backgroundInfo.width;
    height=backgroundInfo.height;
    slidecontainer=document.getElementById("slidecontainer");
    paletteOpen=document.getElementById("openPalette");
    tools=document.getElementById("tools");
    color=document.getElementsByClassName("color");
    slider=document.getElementById("myRange");
    for(let m=0; m<color.length; m++)   {
        color[m].style.height=(100/color.length)*2+"%";
    }
    palette=document.getElementById("palette");
    theCanvas=document.getElementById("myCanvas");
    ctx=theCanvas.getContext('2d');
    theCanvas.width=width+"";
    theCanvas.height=height+"";
    theCanvas.addEventListener('mousedown', function(e) {
        isMouseDown=true;
        const x=e.clientX;
        const y=e.clientY;
        ctx.strokeStyle=currentColor;
        ctx.lineWidth=sliderValue/10;
        ctx.beginPath();
        ctx.moveTo(x, y);
        console.log('d');
    });
    theCanvas.addEventListener('mousemove', function(e) {
        if(isMouseDown) {
            const x=e.clientX;
            const y=e.clientY;
            ctx.lineTo(x, y);
            ctx.stroke();
            console.log('m');
        }
    });
    theCanvas.addEventListener('mouseup', function(e)   {
        console.log('u');
        isMouseDown=false;
        const x=e.clientX;
        const y=e.clientY;
        ctx.lineTo(x, y);
        ctx.stroke();
    });
    slider.addEventListener('input', function() {
        sliderValue = slider.value;
    });
}

function changeColor(color) {
    currentColor=color;
}