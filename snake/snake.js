let width;
let height;

let snakeBoxSize=20;

let background;

let playBox;
let playBoxHeight;
let playBoxWidth;

let minBorderSize=50;

let movingSteps=4;
let currentStep=4;

let movingInterval=30;

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

let lockDirection=false;

let callTime=1;

let isBoxFill=false;

let snakeIncrementSize=2;

document.addEventListener('DOMContentLoaded', start);
document.addEventListener('keydown', (e)=>{
    if(lockDirection==false)    {
        switch (e.key) {
            case "ArrowUp":
                nextDirection=nextDirection!="down" ? "up" : nextDirection;
                lockDirection=true;
                if(firstMove) {
                    currentDirection=nextDirection;
                    interval=setInterval(move, movingInterval);
                    firstMove=false;
                }
                break;
            case "ArrowDown":
                nextDirection=nextDirection!="up" ? "down" : nextDirection;
                lockDirection=true;
                if(firstMove) {
                    currentDirection=nextDirection;
                    interval=setInterval(move, movingInterval);
                    firstMove=false;
                }
                break;
            case "ArrowLeft":
                nextDirection=nextDirection!="right" ? "left" : nextDirection;
                lockDirection=true;
                if(firstMove) {
                    currentDirection=nextDirection;
                    interval=setInterval(move, movingInterval);
                    firstMove=false;
                }
                break;
            case "ArrowRight":
                nextDirection=nextDirection!="left" ? "right" : nextDirection;
                lockDirection=true;
                if(firstMove) {
                    currentDirection=nextDirection;
                    interval=setInterval(move, movingInterval);
                    firstMove=false;
                }
                break;
        }
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
    makeApple();
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
            box.id="outbox "+b+","+a;
            innerBox.id=getBlockId(b, a);
            playBox.appendChild(box);
            box.appendChild(innerBox);
        }
    }
}

function getBlockId(row, col)   {
    return "box "+row+","+col;
}

function clearBox(row, col) {
    let box=document.getElementById(getBlockId(row, col));
    box.style.backgroundColor="transparent";
}

function fillBox(row, col)  {
    let box=document.getElementById(getBlockId(row, col));
    box.style.width="100%";
    box.style.height="100%";
    box.style.backgroundColor="mediumblue";
}

function move() {
    console.log(movingInterval);
    if(snakeArray.length>snakeLength)   {
        callTime++;
        let deleted=snakeArray[0];
        let nextBlock=snakeArray[1];
        let tailSide;
        if(nextBlock.theRow<deleted.theRow) {
            tailSide="top";
        }
        else if(nextBlock.theRow>deleted.theRow) {
            tailSide="bottom";
        }
        else if(nextBlock.theCol<deleted.theCol)    {
            tailSide="left";
        }
        else if(nextBlock.theCol>deleted.theCol)    {
            tailSide="right";
        }
        let percentage=100-callTime*(100/movingSteps);
        fillBoxFromEdge(deleted.theRow, deleted.theCol, tailSide, percentage);
        if(percentage==0) {
            snakeArray.shift();
        }
        if(callTime==movingSteps)   {
            callTime=1;
        }
    }
    if(currentDirection=="right")  {
        if(currentColumn<cols)    {
            if(currentStep==movingSteps)    {
                lockDirection=false;
                currentColumn=currentDirection==nextDirection ? currentColumn+1 : currentColumn;
                isBoxFill=currentDirection==nextDirection ? false : true;
                currentDirection=nextDirection;
                currentStep=0;
            }
            else    {
                currentColumn=isBoxFill ? currentColumn+1 : currentColumn;
                currentStep++;
                isBoxFill=false;
            }
            if(!isBoxFill) {
                fillBoxFromEdge(currentRow, currentColumn, "left", currentStep*(100/movingSteps));
                if(currentStep==movingSteps) {
                    snakeArray.push({theRow: currentRow, theCol: currentColumn});
                }
            }
        }
        else    {
            gameOver();
        }
    }
    else if(currentDirection=="left")  {
        if(currentColumn>=0)  {
            if(currentStep==movingSteps)    {
                lockDirection=false;
                currentColumn=currentDirection==nextDirection ? currentColumn-1 : currentColumn;
                isBoxFill=currentDirection==nextDirection ? false : true;
                currentDirection=nextDirection;
                currentStep=0;
            }
            else    {
                currentColumn=isBoxFill ? currentColumn-1 : currentColumn;
                currentStep++;
                isBoxFill=false;
            }
            if(!isBoxFill) {
                fillBoxFromEdge(currentRow, currentColumn, "right", currentStep*(100/movingSteps));
                if(currentStep==movingSteps) {
                    snakeArray.push({theRow: currentRow, theCol: currentColumn});
                }
            }
        }
        else    {
            gameOver();
        }
    }
    else if(currentDirection=="up")  {      
        if(currentRow>=0)   {
            if(currentStep==movingSteps)    {
                lockDirection=false;
                currentRow=currentDirection==nextDirection ? currentRow-1 : currentRow;
                isBoxFill=currentDirection==nextDirection ? false : true;
                currentDirection=nextDirection;
                currentStep=0;
            }
            else    {
                currentRow=isBoxFill ? currentRow-1 : currentRow;
                currentStep++;
                isBoxFill=false;
            }
            if(!isBoxFill) {
                fillBoxFromEdge(currentRow, currentColumn, "bottom", currentStep*(100/movingSteps));
                if(currentStep==movingSteps) {
                    snakeArray.push({theRow: currentRow, theCol: currentColumn});
                }
            }
        }
        else    {
            gameOver();
        }
    }
    else if(currentDirection=="down")  {
        if(currentRow<rows)  {
            if(currentStep==movingSteps)    {
                lockDirection=false;
                currentRow=currentDirection==nextDirection ? currentRow+1 : currentRow;
                isBoxFill=currentDirection==nextDirection ? false : true;
                currentDirection=nextDirection;
                currentStep=0;
            }
            else    {
                currentRow=isBoxFill ? currentRow+1 : currentRow;
                currentStep++;
                isBoxFill=false;
            }
            if(!isBoxFill) {
                fillBoxFromEdge(currentRow, currentColumn, "top", currentStep*(100/movingSteps));
                if(currentStep==movingSteps) {
                    snakeArray.push({theRow: currentRow, theCol: currentColumn});
                }
            }        
        }
        else    {
            gameOver();
        }
    }
    eat(currentRow, currentColumn);
    if(callTime>1)  {
        dieIntoBody();
    }
}

function fillBoxFromEdge(row, col, fromEdge, percentage) {
    let miniBox=document.getElementById(getBlockId(row, col));
    miniBox.style.backgroundColor="mediumblue";
    if(fromEdge=="right")   {
        miniBox.style.left=percentage==0 ? "0%" : 100-percentage+"%";
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
        miniBox.style.top=percentage==0 ? "0%" : 100-percentage+"%";
        miniBox.style.height=percentage+"%";
    }
    if(percentage==0)   {
        miniBox.style.backgroundColor="transparent";
        miniBox.style.width="100%";
        miniBox.style.height="100%";
    }
}

function gameOver() {
    clearInterval(interval);
    let lose=document.getElementById("loseScreen");
    lose.style.display="block";
}

function restart()  {
    let lose=document.getElementById("loseScreen");
    lose.style.display="none";
    for(let a=0; a<snakeArray.length; a++)   {
        let toClear=snakeArray[a];
        clearBox(toClear.theRow, toClear.theCol);
    }
    lockDirection=false;
    firstMove=true;
    movingInterval=30;
    isBoxFill=false;
    callTime=1;
    currentRow=10;
    currentColumn=15;
    snakeArray=[{theRow: currentRow, theCol: currentColumn}];
    console.log(snakeArray);
    nextDirection=undefined;
    firstMove=true;
    currentStep=4;
    snakeLength=3;
    currentDirection=undefined;
    fillBox(currentRow, currentColumn);
}

function makeApple()    {
    let row=Math.floor(Math.random()*rows);
    let col=Math.floor(Math.random()*cols);
    let apple=document.getElementById(getBlockId(row, col));
    while(apple.style.backgroundColor=="mediumblue")   {
        row=Math.floor(Math.random()*rows);
        col=Math.floor(Math.random()*cols);
        apple=document.getElementById(getBlockId(row, col));
    }
    let appleBox=document.getElementById("outbox "+row+","+col);
    appleBox.style.backgroundColor="red";
}

function eat(row, col)  {
    let apple=document.getElementById("outbox "+row+","+col);
    if(apple.style.backgroundColor=="red")  {
        apple.style.backgroundColor="limegreen";
        snakeLength=snakeLength+snakeIncrementSize;
        makeApple();
        if(movingInterval>=18 && (snakeLength-3)%(snakeIncrementSize*3)==0)    {
            clearInterval(interval);
            movingInterval=movingInterval-2;
            interval=setInterval(move, movingInterval);
        }
    }
}

function dieIntoBody() {
    let head=snakeArray[snakeArray.length-1];
    for (let i=0; i<snakeArray.length-1; i++) {
        let body=snakeArray[i];
        if(body.theRow==head.theRow && body.theCol==head.theCol) {
            gameOver();
            console.log("bleh");
        }
    }
}