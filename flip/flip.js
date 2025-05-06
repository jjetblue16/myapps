let side;

let isHeads=true;

let interval=250;

let button;

let coinSound;

document.addEventListener('DOMContentLoaded', start)

function start()    {
    side=document.getElementById("side");
    button=document.getElementById("theButton");
    coinSound=new Audio("coin-sound.mp3");
    coinSound.load();
    coinSound.addEventListener('playing', (event) => {
        let randomSide=Math.floor(Math.random()*2);
        isHeads=randomSide==0;
        side.src=isHeads ?"heads.png" :"tails.png";
        let flipTimes=13;
        for(let i=0; i<flipTimes; i++)  {
            let enableButton=i==flipTimes-1;
            setTimeout(animateFlip, i*interval, enableButton);
        }
    });
    coinSound.addEventListener('ended', (event) => {
        button.disabled=false;
    });
}

function flip() {
    button.disabled=true;
    coinSound.play();
}

function animateFlip(enableButton)  {
    isHeads=!isHeads;
    side.src=isHeads ?"heads.png" :"tails.png";
}