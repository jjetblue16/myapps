function flip() {
    let side=document.getElementById("side");
    let randomSide=Math.floor(Math.random()*2);
    side.src=randomSide==0 ?"heads.png" :"tails.png";
}