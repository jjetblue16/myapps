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

let popup;

let flagButton;
let shovelButton;

let firstMove=true;

let toOpen;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    shovelButton=document.getElementById("shovel");
    flagButton=document.getElementById("flag");
    background=document.getElementById("background");
    gameBox=document.getElementById("gameBox");
    popup=document.getElementById("popup");
    let sizeInfo=background.getBoundingClientRect();
    width=sizeInfo.width;
    height=sizeInfo.height;
    gameBox.style.width=gameWidth+"px";
    gameBox.style.height=gameHeight+"px";
    rows=gameHeight/boxSize;
    cols=gameWidth/boxSize;
    toOpen=rows*cols-mines;
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
            if(firstMove)   {
                while(hasBomb(row, col) || getNumberOfBombs(row, col)!=0)   {
                    bombArray.splice(0, bombArray.length);
                    for(let d=0; d<mines; d++)  {
                        addBomb();
                    }
                }
                firstMove=false;
            }
            console.log(row+","+col);
            if(mode=="shovel")  {
                open(row, col);
                if(toOpen==0)   {
                    gameOver();
                }
            }
            else    {
                flagSpace(row, col);
            }
        }
    });
}

function isPhone() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobi|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  const isTablet = /(ipad|tablet|(android(?!.*mobi))|nexus(7|9))/i.test(userAgent);
  return isMobile && !isTablet;
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
    console.log('bomb added');
    let randomRow=Math.floor(Math.random()*rows);
    let randomCol=Math.floor(Math.random()*cols);
    for(let m=0; m<bombArray.length; m++)   {
        while(randomRow==bombArray[m].theRow && randomCol==bombArray[m].theCol) {
            randomRow=Math.floor(Math.random()*rows);
            randomCol=Math.floor(Math.random()*cols);
        }
    }
    bombArray.push({theRow: randomRow, theCol: randomCol});
}
 
function open(row, col) {
    if((row>=0 && row<rows) && (col>=0 && col<cols))  {
        let block=document.getElementById(getBlockId(row, col));
        if(block.style.backgroundColor!="rgb(177, 177, 177)")   {
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
                    toOpen--;
                    let bomb=getNumberOfBombs(row, col);
                    if(bomb!=0)    {
                        block.textContent=bomb;
                    }
                    else    {
                        openSurrounding(row, col);
                    }
                }
            }
        }
    }
}

function flagSpace(row, col)    {
    let block=document.getElementById(getBlockId(row, col));
    if(block.style.backgroundColor!="rgb(177, 177, 177)" && document.getElementById(getFlagId(row, col))==null)  {
        let flagPng=document.createElement('img');
        flagPng.src="flag.png";
        flagPng.style.width="100%";
        flagPng.style.height="100%";
        flagPng.style.top=0;
        flagPng.style.left=0;
        flagPng.style.pointerEvents="none";
        flagPng.id=getFlagId(row, col);
        block.appendChild(flagPng);
    }
    else if(block.style.backgroundColor!="rgb(177, 177, 177)")    {
        block.innerHTML='';
        console.log("bye");
    }
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
    popup.style.display="block";
    let theText=document.getElementById("theText");
    if(!alive)   {
        theText.textContent="You Lost";
    }
    else    {
        theText.textContent="You Win";
    }
}

function restart()  {
    mode='shovel';
    bombArray.splice(0, bombArray.length);
    close();
    alive=true;
    toOpen=rows*cols-mines;
    popup.style.display="none";
    flagButton.style.backgroundColor="gray";
    shovelButton.style.backgroundColor="rgb(177, 177, 177)";
    shovelButton.style.border="5px black solid";
    for(let g=0; g<mines; g++)  {
        addBomb(g);
    }
    firstMove=true;
}

function switchTool(tool)   {
    mode=tool;
    if(tool=='shovel')  {
        shovelButton.style.backgroundColor="rgb(177, 177, 177)";
        shovelButton.style.border="5px black solid";
        flagButton.style.backgroundColor="gray";
        flagButton.style.border='none';
    }
    else    {
        flagButton.style.backgroundColor="rgb(177, 177, 177)";
        flagButton.style.border="5px black solid";
        shovelButton.style.backgroundColor="gray";
        shovelButton.style.border='none';
    }
}

function getNumberOfBombs(row, col)  {
    let bombs=0;
    bombs+=hasBomb(row-1, col-1) ?1 :0;
    bombs+=hasBomb(row-1, col) ?1 :0;
    bombs+=hasBomb(row-1, col+1) ?1 :0;
    bombs+=hasBomb(row, col-1) ?1 :0;
    bombs+=hasBomb(row, col+1) ?1 :0;
    bombs+=hasBomb(row+1, col-1) ?1 :0;
    bombs+=hasBomb(row+1, col) ?1 :0;
    bombs+=hasBomb(row+1, col+1) ?1 :0;
    return bombs;
}

function hasBomb(row, col)  {
    for(let l=0; l<bombArray.length; l++)   {
        if(row==bombArray[l].theRow && col==bombArray[l].theCol)    {
            return true;
        }
    }
    return false;
}

function openSurrounding(row, col)  {
    open(row-1, col-1);
    open(row-1, col);
    open(row-1, col+1);
    open(row, col-1);
    open(row, col+1);
    open(row+1, col-1);
    open(row+1, col);
    open(row+1, col+1);
}

function getBlockId(row, col)   {
    return "block "+row+","+col;
}

function getFlagId(row, col)    {
    return "flag "+row+","+col;
}