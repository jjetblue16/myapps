let width;
let height;

let snakeBoxSize=20;

let background;

let playBox;
let playBoxHeight;
let playBoxWidth;

let minBorderSize=50;

let movingSteps=5;

let movingInterval=40;

let movingDirection;

let distanceTop;
let distanceLeft;

let rows;
let cols;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    playBox=document.getElementById("playBox");
    background=document.getElementById("background");
    let size=background.getBoundingClientRect();
    width=size.width;
    height=size.height;
    playBoxHeight=height-((height%snakeBoxSize)+(minBorderSize*2-minBorderSize*2%snakeBoxSize));
    playBoxWidth=width-((width%snakeBoxSize)+(minBorderSize*2-minBorderSize*2%snakeBoxSize));
    playBox.style.height=playBoxHeight+"px";
    playBox.style.width=playBoxWidth+"px";
    console.log(playBoxWidth+","+playBoxHeight)
    cols=playBoxHeight/snakeBoxSize;
    rows=playBoxWidth/snakeBoxSize;
    drawGrid();
    fillBox(10, 10);
}

function drawSnake(row, col)    {
    let snakeBox=document.createElement('div');
    snakeBox.className="snake";
    snakeBox.style.height=snakeBoxSize+"px";
    snakeBox.style.width=snakeBoxSize+"px";
}

function drawGrid() {
    for(let a=0; a<rows; a++)   {
        for(b=0; b<cols; b++)   {
            let box=document.createElement('div');
            box.style.height=snakeBoxSize;
            box.style.width=snakeBoxSize;
            box.className="box";
            box.style.top=b*snakeBoxSize+"px";
            box.style.left=a*snakeBoxSize+"px";
            box.id="box "+a+","+b;
            playBox.appendChild(box);
        }
    }
}

function getBlockId(row, col)   {
    return "box "+row+","+col;
}

function fillBox(row, col)  {
    let box=document.getElementById(getBlockId(row, col))
    box.style.backgroundColor="red";
}