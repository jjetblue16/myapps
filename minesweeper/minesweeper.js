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

const bombArray=new Array();

document.addEventListener('DOMContentLoaded', start);

function start()    {
    background=document.getElementById("background");
    gameBox=document.getElementById("gameBox");
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
    block.style.backgroundColor="rgb(177, 177, 177)"
    for(let f=0; f<bombArray.length; f++)   {
        if(row==bombArray[f].theRow && col==bombArray[f].theCol)  {
            let image=document.createElement('img');
            image.src="mine3.png";
            block.appendChild(image);
        }
    }
}

function getBlockId(row, col)   {
    return "block "+row+","+col;
}