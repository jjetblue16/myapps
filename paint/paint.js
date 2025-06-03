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

let tool="paint";

let followCircle;

let paintbrush;
let eraser;

let rectangleButton;

let rectangleTopLeftX;
let rectangleTopLeftY;
let rectWidth;
let rectHeight;

let layeredCanvas;
let layeredCtx;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    layeredCanvas=document.getElementById("layeredCanvas");
    layeredCtx=layeredCanvas.getContext('2d');
    rectangleButton=document.getElementById("drawRectangle");
    paintbrush=document.getElementById("paintbrush");
    eraser=document.getElementById("eraser");
    eraser.style.border="none";
    rectangleButton.style.border="none";
    paintbrush.style.border="5px black solid";
    background=document.getElementById("background");
    followCircle=document.getElementById("follow");
    followCircle.style.width=sliderValue/8+"px";
    followCircle.style.height=sliderValue/8+"px";
    let backgroundInfo=background.getBoundingClientRect();
    width=backgroundInfo.width;
    height=backgroundInfo.height;
    layeredCanvas.width=width+"";
    layeredCanvas.height=height+"";
    layeredCanvas.style.top="0";
    layeredCanvas.style.left="0";
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
    window.addEventListener('resize', function() {
        backgroundInfo=background.getBoundingClientRect();
        width=backgroundInfo.width;
        height=backgroundInfo.height;
        let imgD=ctx.getImageData(0, 0, theCanvas.width-1, theCanvas.height-1);
        theCanvas.width=width+"";
        theCanvas.height=height+"";
        layeredCanvas.width=width+"";
        layeredCanvas.height=height+"";
        ctx.putImageData(imgD, 0, 0);
    });
    theCanvas.addEventListener('mousedown', function(e) {
        isMouseDown=true;
        const x=e.clientX;
        const y=e.clientY;
        ctx.strokeStyle=currentColor;
        if(tool=="erase")  {
            ctx.strokeStyle="white";
        }
        ctx.lineWidth=sliderValue/7;
        console.log('d');
        if(tool=="paint" || tool=="erase")  {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    });
    theCanvas.addEventListener('mousemove', function(e) {
        if(isMouseDown) {
            const x=e.clientX;
            const y=e.clientY;
            if(tool=="paint" || tool=="erase")  {
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            console.log('m');
        }
    });
    theCanvas.addEventListener('mouseup', function(e)   {
        console.log('u');
        isMouseDown=false;
        const x=e.clientX;
        const y=e.clientY;
        if(tool=="paint" || tool=="erase")  {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });
    layeredCanvas.addEventListener('mousedown', function(e)    {
        isMouseDown=true;
        const x=e.clientX;
        const y=e.clientY;
        rectangleTopLeftX=x;
        rectangleTopLeftY=y;
    });
    layeredCanvas.addEventListener('mousemove', function(e)    {
        layeredCtx.clearRect(0, 0, layeredCanvas.width, layeredCanvas.height);
        const x=e.clientX;
        const y=e.clientY;
        rectWidth=x-rectangleTopLeftX;
        rectHeight=y-rectangleTopLeftY;
        layeredCtx.fillStyle=currentColor;
        layeredCtx.strokeStyle="black";
        if(isMouseDown) {
            document.addEventListener('keydown', function(e) {
                if (e.shiftKey) {
                    if(rectHeight>rectWidth)    {
                        rectHeight=rectWidth;
                    }
                    else if(rectWidth>rectHeight)   {
                        rectWidth=rectHeight
                    }
                    layeredCtx.clearRect(0, 0, layeredCanvas.width, layeredCanvas.height);
                    layeredCtx.strokeRect(rectangleTopLeftX, rectangleTopLeftY, rectWidth, rectHeight);
                }
            });
            layeredCtx.strokeRect(rectangleTopLeftX, rectangleTopLeftY, rectWidth, rectHeight);
            layeredCtx.strokeStyle="black";
        }
    });
    layeredCanvas.addEventListener('mouseup', function(e)    {
        isMouseDown=false;
        const x=e.clientX;
        const y=e.clientY;
        ctx.fillStyle=currentColor;
        ctx.fillRect(rectangleTopLeftX, rectangleTopLeftY, rectWidth, rectHeight);
    });
    slider.addEventListener('input', function() {
        sliderValue = slider.value;
        followCircle.style.width=sliderValue/8+"px";
        followCircle.style.height=sliderValue/8+"px";
    });
    window.addEventListener('mousemove', function(e)   {
        const x = e.clientX;
        const y = e.clientY;
        let circleInfo=followCircle.getBoundingClientRect();
        let circleWidth=circleInfo.width;
        let circleHeight=circleInfo.height;
        followCircle.style.left=x-circleWidth/2;
        followCircle.style.top=y-circleHeight/2;
    });
    document.documentElement.addEventListener('mouseenter', () => {
        followCircle.style.display="block";
    });

    document.documentElement.addEventListener('mouseleave', () => {
        followCircle.style.display="none";
    });
}

function changeColor(color) {
    currentColor=color;
}

function switchTool(theTool)   {
    tool=theTool;
    if(theTool=="paint")    {
        paintbrush.style.border="5px black solid";
        eraser.style.border="none";
        rectangleButton.style.border="none";
        layeredCanvas.style.display="none";
    }
    else if(theTool=="erase")   {
        eraser.style.border="5px black solid";
        paintbrush.style.border="none";
        rectangleButton.style.border="none";
        layeredCanvas.style.display="none";
    }
    else if(theTool=="drawRect")    {
        rectangleButton.style.border="5px black solid";
        paintbrush.style.border="none";
        eraser.style.border="none";
        layeredCanvas.style.display="block";
    }
}

function clearAll()    {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
}