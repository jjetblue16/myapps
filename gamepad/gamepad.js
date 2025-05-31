let background;
let width;
let height;

let leftJoystick;
let leftPosition;

const gateway='ws://192.168.86.41/';
let websocket;

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
        websocket=new WebSocket(gateway);
        setInterval(sendJoystick, 25);
        websocket.onopen=()=>   {
            console.log("websock coneckted")
            sendJoystick();
        }
        websocket.onclose=()=>   {
            console.log("Websocket disconeccte");
        }
    });
}

function sendJoystick() {
    const location=getJoystickValues();
    const message=JSON.stringify(location);
    if(websocket.readyState===WebSocket.OPEN)   {
        console.log("sending "+message);
        websocket.send(message);
    }
}

function getJoystickValues()    {
    const gamepads = navigator.getGamepads();
    if (gamepads && gamepads[0]) {
        const gamepad = gamepads[0];
        if (gamepad) {
            let leftStickX = gamepad.axes[0];
            let leftStickY = gamepad.axes[1];
            leftStickX=leftStickX*100;
            leftStickY=leftStickY*100;
            return {x: leftStickX, y: leftStickY};
        }
    }
    return null;
}