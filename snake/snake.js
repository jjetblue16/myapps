let width;
let height;

let snakeBoxSize=20;

let background;

let playBox;
let playBoxHeight;
let playBoxWidth;

let minBorderSize=50;

let movingSteps=5;

let movingInterval=80;

let rows;
let cols;

let nextDirection;

let firstMove=true;

let currentRow=10;
let currentColumn=15;

let interval;

document.addEventListener('DOMContentLoaded', start);
document.addEventListener('keydown', (e)=>{
    switch (e.key) {
        case "ArrowUp":
            nextDirection=nextDirection!="down" ? "up" : nextDirection;
            if(firstMove) {
                interval=setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowDown":
            nextDirection=nextDirection!="up" ? "down" : nextDirection;
            if(firstMove) {
                interval=setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowLeft":
            nextDirection=nextDirection!="right" ? "left" : nextDirection;
            if(firstMove) {
                interval=setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowRight":
            nextDirection=nextDirection!="left" ? "right" : nextDirection;
            if(firstMove) {
                interval=setInterval(move, movingInterval);
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
    cols=playBoxWidth/snakeBoxSize;
    rows=playBoxHeight/snakeBoxSize;
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
    let colorCounter=0;
    for(let a=0; a<cols; a++)   {
        colorCounter++;
        for(let b=0; b<rows; b++)   {
            colorCounter++;
            let box=document.createElement('div');
            if(colorCounter%2==0)   {
                box.className="box green"
            }
            else    {
                box.className="box lime";
            }
            box.style.height=snakeBoxSize;
            box.style.width=snakeBoxSize;
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
    if(nextDirection=="right")  {
        if(currentColumn+1<cols)    {
            clearBox(currentRow, currentColumn);
            currentColumn=currentColumn+1;
            fillBox(currentRow, currentColumn);
        }
        else    {
            gameOver();
        }
    }
    else if(nextDirection=="left")  {
        if(!currentColumn-1<0)  {
            clearBox(currentRow, currentColumn);
            currentColumn=currentColumn-1;
            fillBox(currentRow, currentColumn);
        }
        else    {
            gameOver();
        }
    }
    else if(nextDirection=="up")  {
        if(!currentRow-1<0) {
            clearBox(currentRow, currentColumn);
            currentRow=currentRow-1;
            fillBox(currentRow, currentColumn);
        }
        else    {
            gameOver();
        }
    }
    else if(nextDirection=="down")  {
        if(currentRow+1<rows)  {
            clearBox(currentRow, currentColumn);
            currentRow=currentRow+1;
            fillBox(currentRow, currentColumn);
        }
        else    {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(interval);

}

function restart()  {
    for(let a=0; a<cols; a++)   {
        for(let b=0; b<rows; b++)   {
            clearBox(b, a);
        }
    }
    currentRow=10;
    currentColumn=15;
    fillBox(10, 15);
    nextDirection=undefined;
    firstMove=true;
}