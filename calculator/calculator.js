let currentNumber=0;

let numberStorage;

let whatOperatorClicked;

let decimalClick=false;

let divideForDecimal=10;

let lastNumber;

let maxDigits=11;

function decimal()  {
    let currentString = currentNumber.toString();
    if (currentString.length >= maxDigits) {
        return;
    }
    if(decimalClick==false) {
        document.getElementById("calNumber").textContent=currentNumber+".";
    }
    decimalClick=true;
}

function percent()  {
    currentNumber=currentNumber/100;
    document.getElementById("calNumber").textContent=currentNumber;
}

function negate()   {
    currentNumber=currentNumber*-1;
    document.getElementById("calNumber").textContent=currentNumber;
}

function operatorClicked(operator)  {
    if(numberStorage==undefined)    {
        numberStorage=currentNumber;
        currentNumber=0;
        decimalClick=false;
        divideForDecimal=10;
    }
    else    {
        numberStorage=equal();
    }
    whatOperatorClicked=operator;
}

function divide()   {
    operatorClicked("divide");
}

function plus()   {
    operatorClicked("plus");
}

function multi()   {
    operatorClicked("multi");
}

function minus()   {
    operatorClicked("minus");
}

function equal() {
    let result;
    decimalClick = false;
    divideForDecimal = 10;

    if (lastNumber != undefined) {
        currentNumber = lastNumber;
        lastNumber = undefined;
    }

    let decimalsCurrent = getDecimalPlaces(currentNumber);
    let decimalsStored = getDecimalPlaces(numberStorage);

    let factor = Math.pow(10, Math.max(decimalsCurrent, decimalsStored));
    console.log("Scaling Factor:", factor);

    let currentInt = currentNumber * factor;
    let storedInt = numberStorage * factor;
    console.log("Current as Integer:", currentInt);
    console.log("Stored as Integer:", storedInt);

    if (whatOperatorClicked == "plus") {
        result = storedInt + currentInt;
    } else if (whatOperatorClicked == "minus") {
        result = storedInt - currentInt;
    } else if (whatOperatorClicked == "multi") {
        result = storedInt * currentInt;
    } else if (whatOperatorClicked == "divide") {
        if (currentInt === 0) {
            console.log("Error: Division by zero");
            return;
        }
        result = storedInt / currentInt;
    }

    result = result / factor;
    result = Math.round(result * 100000000000) / 100000000000;

      let resultString = result.toString();
    if (resultString.length >= maxDigits) {
        return;
    }

    numberStorage = result;
    lastNumber = currentNumber;
    document.getElementById("calNumber").textContent = result;

    currentNumber = 0;
    disableOperatorsIfExceedsLimit(result);
    return result;
}

function disableOperatorsIfExceedsLimit(result) {
    let resultString = result.toString();
    if (resultString.length >= maxDigits) {
        document.getElementById("plusButton").disabled = true;
        document.getElementById("minusButton").disabled = true;
        document.getElementById("multiButton").disabled = true;
        document.getElementById("divideButton").disabled = true;
    }
}

function enableOperators() {
    document.getElementById("plusButton").disabled = false;
    document.getElementById("minusButton").disabled = false;
    document.getElementById("multiButton").disabled = false;
    document.getElementById("divideButton").disabled = false;
}

function numberButton(number)   {
    lastNumber=undefined;
    
    let currentString = currentNumber.toString();
    if (currentString.length >= maxDigits) {
        return;
    }

    if(decimalClick)    {
        currentNumber=currentNumber+number/divideForDecimal;
        divideForDecimal=divideForDecimal*10;
    }
    else    {
        if(currentNumber<0) {
            currentNumber=currentNumber*10-number;
        }
        else    {
            currentNumber=currentNumber*10+number;
        }
    }
    currentNumber = clipToMaxDigits(currentNumber);
    document.getElementById("calNumber").textContent=currentNumber;
}

function clipToMaxDigits(num) {
    let numStr = num.toString();
    if (numStr.length > maxDigits) {
        num = parseFloat(numStr.slice(0, maxDigits));
    }
    return num;
}

function clearButton()  {
    currentNumber=0;
    decimalClick=false;
    numberStorage=undefined;
    document.getElementById("calNumber").textContent=0;
    divideForDecimal=10;
    lastNumber=undefined;
    enableOperators();
}

function getDecimalPlaces(num) {
    let numStr = num.toString();
    if (numStr.includes('.')) {
        return numStr.split('.')[1].length;
    }
    return 0;
}
