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

let rows;
let cols;

let direction;
let nextDirection;

let firstMove=true;

let currentRow=10;
let currentColumn=15;

document.addEventListener('DOMContentLoaded', start);
document.addEventListener('keydown', (e)=>{
    switch (e.key) {
        case "ArrowUp":
            nextDirection="up";
            if(firstMove) {
                setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowDown":
            nextDirection="down";
            if(firstMove) {
                setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowLeft":
            nextDirection="left";
            if(firstMove) {
                setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowRight":
            nextDirection="right";
            if(firstMove) {
                setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
    }
})

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
    fillBox(currentRow, currentColumn);
}

function drawSnake(row, col)    {
    let snakeBox=document.createElement('div');
    snakeBox.className="snake";
    snakeBox.style.height=snakeBoxSize+"px";
    snakeBox.style.width=snakeBoxSize+"px";
}

function drawGrid() {
    for(let a=0; a<rows; a++)   {
        for(let b=0; b<cols; b++)   {
            let box=document.createElement('div');
            box.style.height=snakeBoxSize;
            box.style.width=snakeBoxSize;
            box.className="box";
            box.style.top=b*snakeBoxSize+"px";
            box.style.left=a*snakeBoxSize+"px";
            box.id=getBlockId(b, a);
            playBox.appendChild(box);
        }
    }
}

function getBlockId(row, col)   {
    return "box "+row+","+col;
}

function fillBox(row, col)  {
    let box=document.getElementById(getBlockId(row, col));
    box.style.backgroundColor="red";
}

function clearBox(row, col) {
    let box=document.getElementById(getBlockId(row, col));
    box.style.backgroundColor="transparent";
}

function move() {
    if(nextDirection=="right" && direction!="left")  {
        clearBox(currentRow, currentColumn);
        currentColumn=currentColumn+1;
        fillBox(currentRow, currentColumn);
        direction="right"
    }
    else if(nextDirection=="left" && direction!="right")  {
        clearBox(currentRow, currentColumn);
        currentColumn=currentColumn-1;
        fillBox(currentRow, currentColumn);
        direction="left"
    }
    else if(nextDirection=="up" && direction!="down")  {
        clearBox(currentRow, currentColumn);
        currentRow=currentRow-1;
        fillBox(currentRow, currentColumn);
        direction="up"
    }
    else if(nextDirection=="down" && direction!="up")  {
        clearBox(currentRow, currentColumn);
        currentRow=currentRow+1;
        fillBox(currentRow, currentColumn);
        direction="down"
    }
}