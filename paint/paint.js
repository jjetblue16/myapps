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

let circleButton;

let fillButton;

let isDrawing = false;
let startX, startY;

let layeredCanvas;
let layeredCtx;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    fillButton=document.getElementById("fill");
    circleButton=document.getElementById("drawCircle");
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
        theCanvas.width=width+"";
        theCanvas.height=height+"";
        layeredCanvas.width=width+"";
        layeredCanvas.height=height+"";
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
        else if(tool=="filler") {
            floodFill(x, y);
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
        if(tool=="drawRect") {
            rectangleTopLeftX=x;
            rectangleTopLeftY=y;
        }
        else if(tool=="drawCircle") {
            isDrawing = true;
            startX=x-theCanvas.getBoundingClientRect().left;
            startY=y-theCanvas.getBoundingClientRect().top;
        }
    });
    layeredCanvas.addEventListener('mousemove', function(e)    {
        layeredCtx.clearRect(0, 0, layeredCanvas.width, layeredCanvas.height);
        const x=e.clientX;
        const y=e.clientY;
        if(tool=="drawRect") {
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
        }
        else if(tool=="drawCircle") {
            if(!isDrawing) return;
            layeredCtx.clearRect(0, 0, theCanvas.width, theCanvas.height);
            const currentX=e.clientX-theCanvas.getBoundingClientRect().left;
            const currentY=e.clientY-theCanvas.getBoundingClientRect().top;
            drawEllipse(startX, startY, currentX, currentY, true);
        }
    });
    layeredCanvas.addEventListener('mouseup', function(e)    {
        if(tool=="drawRect")    {
            isMouseDown=false;
            const x=e.clientX;
            const y=e.clientY;
            ctx.fillStyle=currentColor;
            ctx.fillRect(rectangleTopLeftX, rectangleTopLeftY, rectWidth, rectHeight);
        }
        else if(tool=="drawCircle") {
            isDrawing=false;
            layeredCtx.clearRect(0, 0, theCanvas.width, theCanvas.height);
            const currentX=e.clientX-theCanvas.getBoundingClientRect().left;
            const currentY=e.clientY-theCanvas.getBoundingClientRect().top;
            drawEllipse(startX, startY, currentX, currentY, false);
        }
    });
    slider.addEventListener('input', function() {
        sliderValue=slider.value;
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

function drawEllipse(x1, y1, x2, y2, onLayered) {
    const centerX=(x1+x2)/2;
    const centerY=(y1+y2)/2;
    const radiusX=Math.abs(x2-x1)/2;
    const radiusY=Math.abs(y2-y1)/2;
    if(onLayered) {
        layeredCtx.beginPath();
        layeredCtx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2*Math.PI);
        layeredCtx.stroke();
    }
    else    {
        ctx.beginPath();
        ctx.fillStyle=currentColor;
        ctx.strokeStyle=currentColor;
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
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
        circleButton.style.border="none";
        layeredCanvas.style.display="none";
        fillButton.style.border="none";
    }
    else if(theTool=="erase")   {
        eraser.style.border="5px black solid";
        paintbrush.style.border="none";
        rectangleButton.style.border="none";
        circleButton.style.border="none";
        layeredCanvas.style.display="none";
        fillButton.style.border="none";
    }
    else if(theTool=="drawRect")    {
        rectangleButton.style.border="5px black solid";
        paintbrush.style.border="none";
        eraser.style.border="none";
        circleButton.style.border="none";
        layeredCanvas.style.display="block";
        fillButton.style.border="none";
    }
    else if(theTool=="drawCircle")  {
        circleButton.style.border="5px black solid";
        paintbrush.style.border="none";
        eraser.style.border="none";
        rectangleButton.style.border="none";
        fillButton.style.border="none";
        layeredCanvas.style.display="block";
    }
    else if(theTool=="filler")  {
        fillButton.style.border="5px black solid";
        paintbrush.style.border="none";
        eraser.style.border="none";
        rectangleButton.style.border="none";
        circleButton.style.border="none";
        layeredCanvas.style.display="none";
    }
}

function clearAll()    {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
}

function floodFill(x, y) {
    if(x>=0 && x<=theCanvas.width && y>=0 && y<=theCanvas.height)   {
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const red = pixelData[0];
        const green = pixelData[1];
        const blue = pixelData[2];
        const alpha = pixelData[3] / 255;
        ctx.fillStyle=currentColor;
        if(red==0 && blue==0 && green==0 && alpha==0)   {
            ctx.fillRect(x, y, 1, 1);
            floodSurrounding(x, y);
        }
    }
}

function floodSurrounding(x, y)    {
    console.log("x="+x+", y="+y);
    floodFill(x-1, y-1);
    floodFill(x, y-1); 
    floodFill(x+1, y-1); 
    floodFill(x-1, y); 
    floodFill(x+1, y); 
    floodFill(x-1, y+1); 
    floodFill(x, y+1); 
    floodFill(x+1, y+1);
}