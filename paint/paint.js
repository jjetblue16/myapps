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

let i=0;

let stack;

let fileInput;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    stack=new Stack();
    fileInput = document.getElementById('fileInput');
    fillButton=document.getElementById("fill");
    circleButton=document.getElementById("drawCircle");
    layeredCanvas=document.getElementById("layeredCanvas");
    layeredCtx=layeredCanvas.getContext('2d', {willReadFrequently: true});
    rectangleButton=document.getElementById("drawRectangle");
    paintbrush=document.getElementById("paintbrush");
    eraser=document.getElementById("eraser");
    eraser.style.border="none";
    rectangleButton.style.border="none";
    fillButton.style.border="none";
    circleButton.style.border="none";
    paintbrush.style.border="5px black solid";
    background=document.getElementById("background");
    followCircle=document.getElementById("follow");
    followCircle.style.width=sliderValue/8+"px";
    followCircle.style.height=sliderValue/8+"px";
    let backgroundInfo=background.getBoundingClientRect();
    width=backgroundInfo.width;
    height=backgroundInfo.height;
    layeredCanvas.width=width*0.8+"";
    layeredCanvas.height=height+"";
    layeredCanvas.style.top="0";
    layeredCanvas.style.right="0";
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
    ctx=theCanvas.getContext('2d', {willReadFrequently: true});
    theCanvas.width=width*0.8+"";
    theCanvas.height=height+"";
    clearAll();
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
        const x=e.offsetX;
        const y=e.offsetY;
        ctx.strokeStyle=currentColor;
        if(tool=="erase")  {
            ctx.strokeStyle="white";
        }
        ctx.lineWidth=sliderValue/7;
        console.log('mouseDown', e);
        if(tool=="paint" || tool=="erase")  {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else if(tool=="filler") {
            ctx.fillStyle=currentColor;
            newFloodFill(x, y);
        }
    });
    theCanvas.addEventListener('mousemove', function(e) {
        if(isMouseDown) {
            const x=e.offsetX;
            const y=e.offsetY;
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
        const x=e.offsetX;
        const y=e.offsetY;
        if(tool=="paint" || tool=="erase")  {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });
    layeredCanvas.addEventListener('mousedown', function(e)    {
        layeredCtx.clearRect(0, 0, layeredCanvas.width, layeredCanvas.height);
        isMouseDown=true;
        let x=e.offsetX;
        let y=e.offsetY;
        if(tool=="drawRect") {
            rectangleTopLeftX=x;
            rectangleTopLeftY=y;
        }
        else if(tool=="drawCircle") {
            x=e.clientX;
            y=e.clientY;
            isDrawing = true;
            startX=x-theCanvas.getBoundingClientRect().left;
            startY=y-theCanvas.getBoundingClientRect().top;
        }
    });
    layeredCanvas.addEventListener('mousemove', function(e)    {
        layeredCtx.clearRect(0, 0, layeredCanvas.width, layeredCanvas.height);
        const x=e.offsetX;
        const y=e.offsetY;
        layeredCtx.beginPath();
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
                layeredCtx.strokeStyle="black";
                layeredCtx.strokeRect(rectangleTopLeftX, rectangleTopLeftY, rectWidth, rectHeight);
                layeredCtx.stroke();
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
        isMouseDown=false;
        if(tool=="drawRect")    {
            ctx.fillStyle=currentColor;
            ctx.fillRect(rectangleTopLeftX, rectangleTopLeftY, rectWidth, rectHeight);
            rectangleTopLeftX=null;
            rectangleTopLeftY=null;
            rectWidth=null;
            rectHeight=null;
        }
        else if(tool=="drawCircle") {
            isDrawing=false;
            layeredCtx.clearRect(0, 0, theCanvas.width, theCanvas.height);
            const currentX=e.clientX-theCanvas.getBoundingClientRect().left;
            const currentY=e.clientY-theCanvas.getBoundingClientRect().top;
            drawEllipse(startX, startY, currentX, currentY, false);
        }
        layeredCtx.clearRect(0, 0, layeredCanvas.width, layeredCanvas.height);
    });
    layeredCanvas.addEventListener('mouseleave', function(e)    {
        if(tool=="drawRect" && isMouseDown)    {
            isMouseDown=false;
            ctx.fillStyle=currentColor;
            ctx.fillRect(rectangleTopLeftX, rectangleTopLeftY, rectWidth, rectHeight);
        }
        else if(tool=="drawCircle" && isDrawing) {
            isDrawing=false;
            layeredCtx.clearRect(0, 0, theCanvas.width, theCanvas.height);
            const currentX=e.clientX-theCanvas.getBoundingClientRect().left;
            const currentY=e.clientY-theCanvas.getBoundingClientRect().top;
            drawEllipse(startX, startY, currentX, currentY, false);
        }
        layeredCtx.clearRect(0, 0, layeredCanvas.width, layeredCanvas.height);
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
    ctx.fillStyle="white";
    ctx.fillRect(0, 0, theCanvas.width, theCanvas.height);
}

function getCurrentColor(x, y)  {
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const red = pixelData[0];
    const green = pixelData[1];
    const blue = pixelData[2];
    const alpha = pixelData[3] / 255;
    return {red, blue, green, alpha};
}

function isSameColor(x, y, theColor)    {
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const red = pixelData[0];
    const green = pixelData[1];
    const blue = pixelData[2];
    const alpha = pixelData[3] / 255;
    return theColor.red==red && theColor.green==green && theColor.blue==blue && theColor.alpha==alpha;
}

/* find stack size
function inc() {
    i++;
    inc();
}

try {
    inc();
}
catch(e) {
    i++;
    console.log('Maximum stack size is', i, 'in your current browser');
}  
*/

function newFloodFill(x, y) {
    let currentPixelColor=getCurrentColor(x, y);
    ctx.fillRect(x, y, 1, 1);
    stack.push({x: x, y: y, visitedR: false, visitedL: false, visitedT: false, visitedB: false});

    while (!stack.isEmpty()) {
        ctx.fillStyle=currentColor;
        let latestPixel = stack.pop();
        if (!latestPixel.visitedR) {
            latestPixel.visitedR = true;
            stack.push(latestPixel);
            if(isSameColor(latestPixel.x+1, latestPixel.y, currentPixelColor) && latestPixel.x+1<=theCanvas.width)  {
                ctx.fillRect(latestPixel.x+1, latestPixel.y, 1, 1);
                stack.push({x: latestPixel.x+1, y: latestPixel.y, visitedR: false, visitedL: true, visitedT: false, visitedB: false});
            }
        }
        else if(!latestPixel.visitedL)   {
            latestPixel.visitedL = true;
            stack.push(latestPixel);
            if(isSameColor(latestPixel.x-1, latestPixel.y, currentPixelColor) && latestPixel.x-1>=0) {
                ctx.fillRect(latestPixel.x-1, latestPixel.y, 1, 1);
                stack.push({x: latestPixel.x-1, y: latestPixel.y, visitedR: true, visitedL: false, visitedT: false, visitedB: false});
            }
        }
        else if(!latestPixel.visitedT)  {
            latestPixel.visitedT = true;
            stack.push(latestPixel);
            if(isSameColor(latestPixel.x, latestPixel.y-1, currentPixelColor) && latestPixel.y-1>=0) {
                ctx.fillRect(latestPixel.x, latestPixel.y-1, 1, 1);
                stack.push({x: latestPixel.x, y: latestPixel.y-1, visitedR: false, visitedL: false, visitedT: false, visitedB: true});
            }
        }
        else if(!latestPixel.visitedB)  {
            latestPixel.visitedB = true;
            stack.push(latestPixel);
            if(isSameColor(latestPixel.x, latestPixel.y+1, currentPixelColor) && latestPixel.y+1<=theCanvas.height) {
                ctx.fillRect(latestPixel.x, latestPixel.y+1, 1, 1);
                stack.push({x: latestPixel.x, y: latestPixel.y+1, visitedR: false, visitedL: false, visitedT: true, visitedB: false});
            }
        }
    }
    console.log("it has finished filling");
}

class Stack {
    constructor() {
      this.items = []; 
    }
  
    push(element) {
      this.items.push(element);
    }
  
    pop() {
      if (this.isEmpty()) {
        return "Stack is empty"; 
      }
      return this.items.pop();
    }
  
    peek() {
      if (this.isEmpty()) {
        return "Stack is empty"; 
      }
      return this.items[this.items.length - 1];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    size() {
      return this.items.length;
    }
  
    print() {
      console.log(JSON.stringify(this.items));
    }
}

function saveAsPng()    {
    const imageDataURL = theCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageDataURL;
    link.download = 'canvas-image.png';
    link.click();
}

function getFileInput() {
    fileInput.click();
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            console.log(`Selected file: ${file.name}`);
            if(file.type==='image/png' || file.type==="image/jpeg") {
                const img = new Image();
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target.result;
                };
                img.onload = () => {
                    img.width="100%";
                    img.height="100%";
                    ctx.drawImage(img, 0, 0);
                };
                reader.readAsDataURL(file);
            }
            else alert('Please upload a valid PNG file.');
        }
    });
}