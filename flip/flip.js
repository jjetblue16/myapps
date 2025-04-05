function flip() {
    let coin=document.getElementById("coin");
    let randomSide=Math.floor(Math.random()*2);
    if(randomSide==0)   {
        coin.style.backgroundColor="red";
    }
    else    {
        coin.style.backgroundColor="blue";
    }
}