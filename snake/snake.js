let width;
let height;

let snakeBoxSize=20;

let background;

let playBox;
let playBoxHeight;
let playBoxWidth;

let minBorderSize=50;

let movingSteps=5;

let movingInterval=90;

let snakeLength=3;

let rows;
let cols;

let nextDirection;

let firstMove=true;

let currentRow=10;
let currentColumn=15;

let interval;

let snakeArray=[{theRow: 10, theCol: 15}];

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

function drawGrid() {
    for(let a=0; a<cols; a++)   {
        for(let b=0; b<rows; b++)   {
            let box=document.createElement('div');
            box.className="box";
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
    box.style.backgroundColor="mediumblue";
    snakeArray.push({theRow: row, theCol: col});
}

function clearBox(row, col) {
    let box=document.getElementById(getBlockId(row, col));
    box.style.backgroundColor="limegreen";
}

function move() {
    if(snakeArray.length>=snakeLength)   {
        let deleted=snakeArray[0];
        snakeArray.shift();
        clearBox(deleted.theRow, deleted.theCol);
    }
    if(nextDirection=="right")  {
        if(currentColumn+1<cols)    {
            currentColumn=currentColumn+1;
            fillBox(currentRow, currentColumn);
        }
        else    {
            gameOver();
        }
    }
    else if(nextDirection=="left")  {
        if(!currentColumn-1<0)  {
            currentColumn=currentColumn-1;
            fillBox(currentRow, currentColumn);
        }
        else    {
            gameOver();
        }
    }
    else if(nextDirection=="up")  {
        if(!currentRow-1<0) {
            currentRow=currentRow-1;
            fillBox(currentRow, currentColumn);
        }
        else    {
            gameOver();
        }
    }
    else if(nextDirection=="down")  {
        if(currentRow+1<rows)  {
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