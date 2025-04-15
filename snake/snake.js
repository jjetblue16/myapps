let width;
let height;

let snakeBoxSize=20;

let background;

let playBox;
let playBoxHeight;
let playBoxWidth;

let minBorderSize=50;

let movingSteps=4;
let currentStep=0;

let movingInterval=300;

let snakeLength=3;

let rows;
let cols;

let currentDirection;
let nextDirection;

let firstMove=true;

let currentRow=10;
let currentColumn=15;

let interval;

let snakeArray=[{theRow: 10, theCol: 15}];

let sound;

document.addEventListener('DOMContentLoaded', start);
document.addEventListener('keydown', (e)=>{
    sound.load();
    sound.play();
    switch (e.key) {
        case "ArrowUp":
            nextDirection=nextDirection!="down" ? "up" : nextDirection;
            if(firstMove) {
                currentDirection=nextDirection;
                interval=setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowDown":
            nextDirection=nextDirection!="up" ? "down" : nextDirection;
            if(firstMove) {
                currentDirection=nextDirection;
                interval=setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowLeft":
            nextDirection=nextDirection!="right" ? "left" : nextDirection;
            if(firstMove) {
                currentDirection=nextDirection;
                interval=setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
        case "ArrowRight":
            nextDirection=nextDirection!="left" ? "right" : nextDirection;
            if(firstMove) {
                currentDirection=nextDirection;
                interval=setInterval(move, movingInterval);
                firstMove=false;
            }
            break;
    }
})

function start()    {
    sound=new Audio('turn.mp3');
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
            let innerBox=document.createElement('div');
            box.className="box";
            innerBox.className="innerBox";
            innerBox.style.height="100%";
            innerBox.style.width="100%";
            box.style.height=snakeBoxSize;
            box.style.width=snakeBoxSize;
            box.style.top=b*snakeBoxSize+"px";
            box.style.left=a*snakeBoxSize+"px";
            innerBox.id=getBlockId(b, a);
            playBox.appendChild(box);
            box.appendChild(innerBox);
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
        let deleted=snakeArray.shift();
        clearBox(deleted.theRow, deleted.theCol);
    }
    if(currentDirection=="right")  {
        if(currentColumn+1<cols)    {
            if(currentStep==movingSteps)    {
                currentColumn=currentColumn+1;
                currentStep=0;
                currentDirection=nextDirection;
            }
            else    {
                currentStep++;
            }
            fillBoxFromEdge(currentRow, currentColumn, "left", currentStep*(100/movingSteps));
        }
        else    {
            gameOver();
        }
    }
    else if(currentDirection=="left")  {
        if(!currentColumn-1<0)  {
            if(currentStep==movingSteps)    {
                currentColumn=currentColumn-1;
                currentStep=0;
                currentDirection=nextDirection;
            }
            else    {
                currentStep++;
            }
            fillBoxFromEdge(currentRow, currentColumn, "right", currentStep*(100/movingSteps));

        }
        else    {
            gameOver();
        }
    }
    else if(currentDirection=="up")  {
        if(!currentRow-1<0) {
            if(currentStep==movingSteps)    {
                currentRow=currentRow-1;
                currentStep=0;
                currentDirection=nextDirection;
            }
            else    {
                currentStep++;
            }
            fillBoxFromEdge(currentRow, currentColumn, "bottom", currentStep*(100/movingSteps));

        }
        else    {
            gameOver();
        }
    }
    else if(currentDirection=="down")  {
        if(currentRow+1<rows)  {
            if(currentStep==movingSteps)    {
                currentRow=currentRow+1;
                currentStep=0;
                currentDirection=nextDirection;
            }
            else    {
                currentStep++;
            }
            fillBoxFromEdge(currentRow, currentColumn, "top", currentStep*(100/movingSteps));
        }
        else    {
            gameOver();
        }
    }
}

function fillBoxFromEdge(row, col, fromEdge, percentage) {
    let miniBox=document.getElementById(getBlockId(row, col));
    if(fromEdge=="right")   {
        miniBox.style.left=100-percentage+"%";
        miniBox.style.width=percentage+"%";
    }
    else if(fromEdge=="left")   {
        miniBox.style.left="0";
        miniBox.style.width=percentage+"%";
    }
    else if(fromEdge=="top") {
        miniBox.style.top="0";
        miniBox.style.height=percentage+"%";
    }
    else if(fromEdge=="bottom") {
        miniBox.style.top=100-percentage+"%";
        miniBox.style.height=percentage+"%";
    }
    miniBox.style.backgroundColor="mediumblue";
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