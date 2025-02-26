let currentNumber=0;

let numberStorage;

let whatOperatorClicked;

let decimalClick=false;

let divideForDecimal=10;

function decimal()  {
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
    currentNumber=currentNumber*-1
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
    whatOperatorClicked=operator
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

function equal()    {
    decimalClick=false;
    divideForDecimal;
    if(!operatorClicked==undefined) {
        if(whatOperatorClicked=="plus") {
            currentNumber=numberStorage+currentNumber;
        }
        else if(whatOperatorClicked=="minus")   {
            currentNumber=numberStorage-currentNumber;
        }
        else if(whatOperatorClicked=="multi")   {
            currentNumber=numberStorage*currentNumber;
        }
        else if(whatOperatorClicked=="divide")  {
            currentNumber=numberStorage/currentNumber;
        }
    }
    let result=currentNumber
    result=result.toPrecision(10)*1;
    document.getElementById("calNumber").textContent=currentNumber;
    currentNumber=0;
    return result;
}

function numberButton(number)   {
    if(decimalClick)    {
        currentNumber=currentNumber+number/divideForDecimal;
        divideForDecimal=divideForDecimal*10;
        currentNumber=currentNumber.toPrecision(10)*1;
    }
    else    {
        currentNumber=currentNumber*10+number
    }
    document.getElementById("calNumber").textContent=currentNumber;
}

function clearButton()  {
    currentNumber=0;
    decimalClick=false;
    numberStorage=undefined;
    document.getElementById("calNumber").textContent=0;
    divideForDecimal=10;
}