let background;

let gameBox;

let width;
let height;

let boxSize=50;

let rows;
let cols;

let gameWidth=450;
let gameHeight=450;

let mines=13;

let mode='shovel';

const bombArray=new Array();

let alive=true;

let lose;

let flagButton;
let shovelButton;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    shovelButton=document.getElementById("shovel");
    flagButton=document.getElementById("flag");
    background=document.getElementById("background");
    gameBox=document.getElementById("gameBox");
    lose=document.getElementById("lose");
    let sizeInfo=background.getBoundingClientRect();
    width=sizeInfo.width;
    height=sizeInfo.height;
    gameBox.style.width=gameWidth+"px";
    gameBox.style.height=gameHeight+"px";
    rows=gameHeight/boxSize;
    cols=gameWidth/boxSize;
    makeGrid();
    for(let d=0; d<mines; d++)  {
        addBomb();
    }
    document.addEventListener('click', function(e)  {
        if(e.target.className=='block')    {
            let block=document.getElementById(e.target.id);
            let row=block.id;
            let col=block.id;
            row=Number(row.charAt(6));
            col=Number(col.charAt(8));
            console.log(row+","+col);
            if(mode=="shovel")  {
                open(row, col);
            }
            else    {
                flagSpace(row, col);
            }
        }
    });
}

function makeGrid() {
    for(let r=0; r<rows; r++)   {
        for(let c=0; c<cols; c++)   {
            let block=document.createElement('div');
            block.style.width=boxSize+"px";
            block.style.height=boxSize+"px";
            block.className="block";
            block.id=getBlockId(r, c);
            gameBox.appendChild(block);
        }
    }
}

function addBomb()  {
    let randomRow=Math.floor(Math.random()*rows);
    let randomCol=Math.floor(Math.random()*cols);
    bombArray.push({theRow: randomRow, theCol: randomCol});
}
 
function open(row, col) {
    let block=document.getElementById(getBlockId(row, col));
    if(document.getElementById(getFlagId(row, col))==null)  {
        block.style.backgroundColor="rgb(177, 177, 177)";
        for(let f=0; f<bombArray.length; f++)   {
            if(row==bombArray[f].theRow && col==bombArray[f].theCol)  {
                let image=document.createElement('img');
                image.src="mine3.png";
                block.appendChild(image);
                alive=false;
                gameOver();
            }
        }
        if(alive)   {
            let bomb=getNumberOfBombs(row, col);
            if(bomb!=0)    {
                block.textContent=bomb;
            }
        }
    }
}

function flagSpace(row, col)    {
    let block=document.getElementById(getBlockId(row, col));
    let flagPng=document.createElement('img');
    flagPng.src="flag.png";
    flagPng.style.width="100%";
    flagPng.style.height="100%";
    flagPng.style.top=0;
    flagPng.style.left=0;
    flagPng.id=getFlagId(row, col);
    block.appendChild(flagPng);
}

function close()    {
    for(let b=0; b<rows; b++) {
        for(let c=0; c<cols; c++)   {
            let block=document.getElementById(getBlockId(b, c));
            block.style.backgroundColor="gray";
            block.textContent="";
        }
    }
}

function gameOver() {
    lose.style.display="block";
}

function restart()  {
    mode='shovel';
    bombArray.splice(0, bombArray.length);
    close();
    alive=true;
    lose.style.display="none";
    flagButton.style.backgroundColor="gray";
    shovelButton.style.backgroundColor="rgb(177, 177, 177)"
}

function switchTool(tool)   {
    mode=tool;
    if(tool=='shovel')  {
        shovelButton.style.backgroundColor="rgb(177, 177, 177)";
        flagButton.style.backgroundColor="gray";
    }
    else    {
        flagButton.style.backgroundColor="rgb(177, 177, 177)";
        shovelButton.style.backgroundColor="gray";
    }
}

function getNumberOfBombs(row, col)  {
    let bombs=0;
    for(let b=0; b<bombArray.length; b++)   {
        if(row-1==bombArray[b].theRow && col-1==bombArray[b].theCol)    {
            bombs++;
        }
        if(row-1==bombArray[b].theRow && col==bombArray[b].theCol)  {
            bombs++;
        }
        if(row-1==bombArray[b].theRow && col-1==bombArray[b].theCol)    {
            bombs++;
        }
        if(row==bombArray[b].theRow && col-1==bombArray[b].theCol)  {
            bombs++;
        }
        if(row==bombArray[b].theRow && col+1==bombArray[b].theCol)  {
            bombs++;
        }
        if(row+1==bombArray[b].theRow && col-1==bombArray[b].theCol)  {
            bombs++;
        }
        if(row+1==bombArray[b].theRow && col==bombArray[b].theCol)  {
            bombs++;
        }
        if(row+1==bombArray[b].theRow && col+1==bombArray[b].theCol)  {
            bombs++;
        }
    }
    return bombs;
}

function getBlockId(row, col)   {
    return "block "+row+","+col;
}

function getFlagId(row, col)    {
    return "flag "+row+","+col;
}