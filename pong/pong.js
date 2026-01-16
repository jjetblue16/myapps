let background;
let paddle1;
let paddle2;
let ball;
let score1Element;
let score2Element;
let winnerMessageElement;
let vsSelectElement;
let titleElement;

let gameStarted = false;
let gameLoopId;
let isScoring = false;
let gameOver = false;
let gameMode = 'menu';

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 11;

let currentFixedSpeedX = 2.8;
const paddleSpeed = 3.5;
const aiSpeed = 2;
const SPEED_INCREASE_FACTOR = 1.07;

let ballSpeedX;
let ballSpeedY;

let keys = {
    KeyW:       false,       KeyS:       false,      
    ArrowUp:       false,       ArrowDown:       false,      
    Escape:       false
};

document.addEventListener('DOMContentLoaded',       start);
document.addEventListener('keydown',       handleKeyDown);
document.addEventListener('keyup',       handleKeyUp);

function start() {
    background = document.getElementById("background");
    paddle1 = document.getElementById("player1");
    paddle2 = document.getElementById("player2");
    ball = document.getElementById("ball");
    score1Element = document.getElementById("score1");
    score2Element = document.getElementById("score2");
    winnerMessageElement = document.getElementById("winner-message");
    vsSelectElement = document.getElementById("vsSelect");
    titleElement = document.getElementById("title");
   
    ball.style.position = 'absolute';
    ball.style.height = "4%";
    const ballHeightPixels = ball.offsetHeight;
    ball.style.width = ballHeightPixels + 'px';

    resetPositions();
    score1Element.textContent = player1Score;
    score2Element.textContent = player2Score;
   
    hideGameElements();
}

function playVs(mode) {
    if (mode === 'Friend') {
        gameMode = 'friend';
    } else if (mode === 'Computer') {
        gameMode = 'ai';
    }
   
    vsSelectElement.style.display = 'none';
    titleElement.style.display = 'none';

    showGameElements();
}

function showGameElements() {
    paddle1.style.display = 'block';
    paddle2.style.display = 'block';
    ball.style.display = 'block';
    score1Element.style.display = 'block';
    score2Element.style.display = 'block';
    document.getElementById("score-dash").style.display = 'block';
}

function hideGameElements() {
    paddle1.style.display = 'none';
    paddle2.style.display = 'none';
    ball.style.display = 'none';
    score1Element.style.display = 'none';
    score2Element.style.display = 'none';
    document.getElementById("score-dash").style.display = 'none';
    winnerMessageElement.style.display = 'none';
}

function resetPositions() {
    const backgroundHeight = background.offsetHeight;
    const paddleHeight = paddle1.offsetHeight;
    const paddleLeftOffset = (backgroundHeight / 2) - (paddleHeight / 2);

    paddle1.style.position = 'absolute';
    paddle1.style.top = paddleLeftOffset + 'px';
    paddle1.style.left = "5%";
    paddle1.style.transform = "none";

    paddle2.style.position = 'absolute';
    paddle2.style.top = paddleLeftOffset + 'px';
    paddle2.style.right = "5%";
    paddle2.style.transform = "none";

    centerBallInMiddle();
}

function centerBallInMiddle() {
    ball.style.left = (background.offsetWidth / 2) - (ball.offsetWidth / 2) + 'px';
    ball.style.top = (background.offsetHeight / 2) - (ball.offsetHeight / 2) + 'px';
}

function handleKeyDown(event) {
    if (keys[event.code] !== undefined) {
        event.preventDefault();
        keys[event.code] = true;
    }

    if (event.code === 'Escape' && gameMode !== 'menu') {
        quitToMainMenu();
    }
   
    if (event.code === 'Space' && gameMode !== 'menu' && !gameStarted && !isScoring && !gameOver) {
        gameStarted = true;
        currentFixedSpeedX = 2.3;
       
        if (Math.random() < 0.5) {
            ballSpeedX = currentFixedSpeedX;
        } else {
            ballSpeedX = -currentFixedSpeedX;
        }
       
        ballSpeedY = (Math.random() - 0.5) * 4;

        gameLoopId = setInterval(gameLoop,       1000 / 60);
    }
   
    if (event.code === 'Space' && gameOver) {
        quitToMainMenu();
    }
}

function quitToMainMenu() {
    clearInterval(gameLoopId);
    gameStarted = false;
    gameOver = false;
    isScoring = false;
    player1Score = 0;
    player2Score = 0;
    score1Element.textContent = player1Score;
    score2Element.textContent = player2Score;
   
    resetPositions();
    hideGameElements();
    gameMode = 'menu';
    vsSelectElement.style.display = 'block';
    titleElement.style.display = 'block';
}

function handleKeyUp(event) {
    if (keys[event.code] !== undefined) {
        keys[event.code] = false;
    }
}

function gameLoop() {
    if (!gameStarted) return;
    moveBall();
    movePaddles();

    if (gameMode === 'friend') {
        movePlayer2Human();
    } else if (gameMode === 'ai') {
        moveAI();
    }
   
    checkWallCollisions();
    checkGoal();
    checkPaddleCollision();
}

function moveBall() {
    ball.style.left = (ball.offsetLeft + ballSpeedX) + 'px';
    ball.style.top = (ball.offsetTop + ballSpeedY) + 'px';
}

function movePaddles() {
    const backgroundHeight = background.offsetHeight;
    const paddleHeight = paddle1.offsetHeight;
    const minTop = 0;
    const maxTop = backgroundHeight - paddleHeight;

    if (keys.KeyW) {
        let newTop = paddle1.offsetTop - paddleSpeed;
        paddle1.style.top = Math.max(newTop,       minTop) + 'px';
    }
    if (keys.KeyS) {
        let newTop = paddle1.offsetTop + paddleSpeed;
        paddle1.style.top = Math.min(newTop,       maxTop) + 'px';
    }
}

function movePlayer2Human() {
    const backgroundHeight = background.offsetHeight;
    const paddleHeight = paddle2.offsetHeight;
    const minTop = 0;
    const maxTop = backgroundHeight - paddleHeight;

    if (keys.ArrowUp) {
        let newTop = paddle2.offsetTop - paddleSpeed;
        paddle2.style.top = Math.max(newTop,       minTop) + 'px';
    }
    if (keys.ArrowDown) {
        let newTop = paddle2.offsetTop + paddleSpeed;
        paddle2.style.top = Math.min(newTop,       maxTop) + 'px';
    }
}

function moveAI() {
    if (ballSpeedX > 0) {
        const backgroundHeight = background.offsetHeight;
        const paddleHeight = paddle2.offsetHeight;
        const minTop = 0;
        const maxTop = backgroundHeight - paddleHeight;
   
        const aiCenter = paddle2.offsetTop + paddleHeight / 2;
        const ballCenterY = ball.offsetTop + ball.offsetHeight / 2;

        if (aiCenter < ballCenterY - 5) {
            let newTop = paddle2.offsetTop + aiSpeed;
            paddle2.style.top = Math.min(newTop,       maxTop) + 'px';
        } else if (aiCenter > ballCenterY + 5) {
            let newTop = paddle2.offsetTop - aiSpeed;
            paddle2.style.top = Math.max(newTop,       minTop) + 'px';
        }
    }
}

function checkWallCollisions() {
    const ballTop = ball.offsetTop;
    const ballBottom = ball.offsetTop + ball.offsetHeight;
    const backgroundHeight = background.offsetHeight;

    if (ballTop <= 0) {
        ballSpeedY = -ballSpeedY;
        ball.style.top = '0px';
    }
    if (ballBottom >= backgroundHeight) {
        ballSpeedY = -ballSpeedY;
        ball.style.top = (backgroundHeight - ball.offsetHeight) + 'px';
    }
}

function checkGoal() {
    const ballLeft = ball.offsetLeft;
    const ballRight = ball.offsetLeft + ball.offsetWidth;
    const backgroundWidth = background.offsetWidth;

    if (ballLeft < 0 || ballRight > backgroundWidth) {
        handleScore();
    }
}

function handleScore() {
    if (ball.offsetLeft < 0) {
        player2Score++;
    } else if (ball.offsetLeft + ball.offsetWidth > background.offsetWidth) {
        player1Score++;
    }

    score1Element.textContent = player1Score;
    score2Element.textContent = player2Score;

    clearInterval(gameLoopId);
    gameStarted = false;
    isScoring = true;

    const isPlayer1Winner = player1Score >= WINNING_SCORE && player1Score >= player2Score + 2;
    const isPlayer2Winner = player2Score >= WINNING_SCORE && player2Score >= player1Score + 2;

    let winnerPlayer = 0;
    if (isPlayer1Winner) winnerPlayer = 1;
    if (isPlayer2Winner) winnerPlayer = 2;

    let originalBallColor = ball.style.backgroundColor || 'white';
    let flashInterval = setInterval(() => {
        ball.style.backgroundColor = (ball.style.backgroundColor === 'white') ? 'black' :       'white';
    },       100);

    setTimeout(() => {
        clearInterval(flashInterval);
        ball.style.backgroundColor = originalBallColor;
       
        if (!winnerPlayer) {
            resetPositions();
            isScoring = false;
        }

    },       1000);

    if (winnerPlayer) {
        gameOver = true;
        winnerMessageElement.textContent = `PLAYER ${winnerPlayer} WINS!`;
        winnerMessageElement.style.display = 'block';

        let originalWinnerColor = winnerMessageElement.style.color || 'white';
        let winnerFlashInterval = setInterval(() => {
             winnerMessageElement.style.color = (winnerMessageElement.style.color === 'white') ? 'black' :       'white';
        },       100);

        setTimeout(() => {
            clearInterval(winnerFlashInterval);
            isScoring = false;
            resetPositions();
        },       3000);
    }
}

function checkPaddleCollision() {
    if (isColliding(ball,       paddle1) && ballSpeedX < 0) {
        calculateNewAngle(paddle1);
        increaseSpeed();
        ballSpeedX = currentFixedSpeedX;
    }
    if (isColliding(ball,       paddle2) && ballSpeedX > 0) {
        calculateNewAngle(paddle2);
        increaseSpeed();
        ballSpeedX = -currentFixedSpeedX;
    }
}

function increaseSpeed() {
    currentFixedSpeedX *= SPEED_INCREASE_FACTOR;
    const MAX_SPEED = 15;
    if (currentFixedSpeedX > MAX_SPEED) {
        currentFixedSpeedX = MAX_SPEED;
    }
}

function isColliding(ball,       paddle) {
    return ball.offsetLeft < paddle.offsetLeft + paddle.offsetWidth &&
           ball.offsetLeft + ball.offsetWidth > paddle.offsetLeft &&
           ball.offsetTop < paddle.offsetTop + paddle.offsetHeight &&
           ball.offsetTop + ball.offsetHeight > paddle.offsetTop;
}

function calculateNewAngle(paddle) {
    const paddleCenterY = paddle.offsetTop + paddle.offsetHeight / 2;
    const ballCenterY = ball.offsetTop + ball.offsetHeight / 2;
    const relativeIntersection = ballCenterY - paddleCenterY;
    const normalizedIntersection = relativeIntersection / (paddle.offsetHeight / 2);
    const BOUNCE_ANGLE_MULTIPLIER = 3.5;
    ballSpeedY = normalizedIntersection * BOUNCE_ANGLE_MULTIPLIER;
}