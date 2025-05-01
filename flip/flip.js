let side;

let isHeads=true;

let interval=150;

let button;

document.addEventListener('DOMContentLoaded', start)

function start()    {
    side=document.getElementById("side");
    button=document.getElementById("theButton");
}

function flip() {
    button.disabled=true;
    let randomSide=Math.floor(Math.random()*2);
    isHeads=randomSide==0;
    side.src=isHeads ?"heads.png" :"tails.png";
    let flipTimes=6;
    for(let i=0; i<flipTimes; i++)  {
        let enableButton=i==flipTimes-1;
        setTimeout(animateFlip, i*interval, enableButton);
    }
}

function animateFlip(enableButton)  {
    isHeads=!isHeads;
    side.src=isHeads ?"heads.png" :"tails.png";
    button.disabled=!enableButton;
}