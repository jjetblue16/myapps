let background;
let width;
let height;

let leftJoystick;
let leftPosition;

document.addEventListener('DOMContentLoaded', start);

function start()    {
    background=document.getElementById("background");
    let backgroundInfo=background.getBoundingClientRect();
    width=backgroundInfo.width;
    height=backgroundInfo.height;
    leftJoystick=document.getElementById("leftJoy");
    leftPosition=document.getElementById("leftPosition");
    window.addEventListener("gamepadconnected", (event) => {
        console.log("Gamepad Connected");
        setInterval(getJoysticks, 25);
    });
}

function getJoysticks() {
    const gamepads = navigator.getGamepads();
    if (gamepads && gamepads[0]) {
        const gamepad = gamepads[0];
        if (gamepad) {
            let leftStickX = gamepad.axes[0];
            let leftStickY = gamepad.axes[1];
            let rightStickX = gamepad.axes[2];
            let rightStickY = gamepad.axes[3];
            console.log("Left Stick X:", leftStickX);
            console.log("Left Stick Y:", leftStickY);
            console.log("Right Stick X:", rightStickX);
            console.log("Right Stick Y:", rightStickY);
            leftPosition.style.left=leftStickX*250;
            leftPosition.style.top=leftStickY*250;
        }
    }
}