let theCanvas;

let ctx;

let isMouseDown=false;

let background;

let width;
let height;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    background=document.getElementById("background");
    let backgroundInfo=background.getBoundingClientRect();
    width=backgroundInfo.width;
    height=backgroundInfo.height;
    theCanvas=document.getElementById("myCanvas");
    ctx=theCanvas.getContext('2d');
    theCanvas.width=width+"";
    theCanvas.height=height+"";
    theCanvas.addEventListener('mousedown', function(e) {
        isMouseDown=true;
        const x=e.clientX;
        const y=e.clientY;
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
    })
}