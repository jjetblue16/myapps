let currentNumber="0";

let numberStorage;

let whatOperatorClicked;

let decimalClick=false;

let lastNumber;

function decimal()  {
    if(decimalClick==false) {
        currentNumber=currentNumber+".";
        document.getElementById("calNumber").textContent=currentNumber;
    }
    decimalClick=true;
}

function percent()  {
    /*currentNumber=currentNumber/100;
    document.getElementById("calNumber").textContent=currentNumber;
    use divide_bd*/
}

function negate()   {
    /*currentNumber=currentNumber*-1;
    document.getElementById("calNumber").textContent=currentNumber;
    use multiply_bd*/
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
    decimalClick=false;
    divideForDecimal=10;
    if (lastNumber!=undefined) {
        currentNumber=lastNumber;
        lastNumber=undefined;
    }
    if (whatOperatorClicked=="plus") {
        result=decimal_add(numberStorage, currentNumber);
    }
    else if (whatOperatorClicked=="minus") {
        result=numberStorage-currentNumber;
    }
    else if (whatOperatorClicked=="multi") {
        result=decimal_multi(numberStorage, currentNumber);
    }
    else if (whatOperatorClicked=="divide") {
        result=numberStorage/currentNumber;
    }
    numberStorage=result;
    lastNumber=currentNumber;
    document.getElementById("calNumber").textContent=result;
    currentNumber = 0;
    return result;
}

function numberButton(number)   {
    lastNumber=undefined;    
    if(currentNumber=="0")    {
        currentNumber=number;
    }
    else    {
        currentNumber=currentNumber+number;
    }
    document.getElementById("calNumber").textContent=currentNumber;
}

function clearButton()  {
    currentNumber="0";
    decimalClick=false;
    numberStorage=undefined;
    document.getElementById("calNumber").textContent=0;
    divideForDecimal=10;
    lastNumber=undefined;
}

function decimal_add(number1, number2) {
    let decimalPointIndex=number1.indexOf(".");
    let decimalPointIndex2=number2.indexOf(".");
    let decimalPointLength=number1.length;
    let decimalPointLength2=number2.length;
    let numbersAfterPoint=decimalPointIndex!=-1?decimalPointLength-1-decimalPointIndex:0;
    let numbersAfterPoint2=decimalPointIndex2!=-1?decimalPointLength2-1-decimalPointIndex2:0;
    number1=number1.replace(".", "");
    number2=number2.replace(".", "");
    let firstNumber=parseInt(number1);
    let secondNumber=parseInt(number2);
    let maxFractionalPart=Math.max(numbersAfterPoint, numbersAfterPoint2);
    let stringResult;
    let result;
    if(maxFractionalPart!=0)    {
        firstNumber=firstNumber*(10**(maxFractionalPart-numbersAfterPoint));
        secondNumber=secondNumber*(10**(maxFractionalPart-numbersAfterPoint2));
        result=firstNumber+secondNumber;
        stringResult=result.toString();
        console.log(firstNumber+"=firstnumber");
        console.log(secondNumber+"=secondneumrb");
        console.log("result="+stringResult);
        if(stringResult.length<=maxFractionalPart)   {
            stringResult = "0." + "0".repeat(maxFractionalPart-stringResult.length)+stringResult;
        }
        else {
            stringResult=stringResult.substring(0, stringResult.length-maxFractionalPart)+"."+stringResult.substring(stringResult.length-maxFractionalPart);
        }
        while(stringResult.charAt(stringResult.length-1)=="0")   {
            stringResult=stringResult.substring(0, stringResult.length-1);
        }
    }
    else    {
        result=firstNumber+secondNumber;
        stringResult=result.toString();
    }
    if(stringResult.charAt(stringResult.length-1)==".") {
        stringResult=stringResult.replace(".", "");
    }
    return stringResult;
}

function decimal_multi(number1, number2) {
    let decimalPointIndex=number1.indexOf(".");
    let decimalPointIndex2=number2.indexOf(".");
    let decimalPointLength=number1.length;
    let decimalPointLength2=number2.length;
    let numbersAfterPoint=decimalPointIndex!=-1?decimalPointLength-1-decimalPointIndex:0;
    let numbersAfterPoint2=decimalPointIndex2!=-1?decimalPointLength2-1-decimalPointIndex2:0;
    number1=number1.replace(".", "");
    number2=number2.replace(".", "");
    let firstNumber=parseInt(number1);
    let secondNumber=parseInt(number2);
    let maxFractionalPart=Math.max(numbersAfterPoint, numbersAfterPoint2);
    let stringResult;
    let result;
    if(maxFractionalPart!=0)    {
        firstNumber=firstNumber*(10**(maxFractionalPart-numbersAfterPoint));
        secondNumber=secondNumber*(10**(maxFractionalPart-numbersAfterPoint2));
        result=firstNumber*secondNumber;
        stringResult=result.toString();
        console.log(firstNumber+"=firstnumber");
        console.log(secondNumber+"=secondneumrb");
        console.log("result="+stringResult);
        if(stringResult.length<maxFractionalPart*2)   {
            stringResult = "0." + "0".repeat(maxFractionalPart*2-stringResult.length) + stringResult;
        }
        else {
            stringResult=stringResult.substring(0, stringResult.length-maxFractionalPart*2)+"."+stringResult.substring(stringResult.length-maxFractionalPart*2);
        }
        while(stringResult.charAt(stringResult.length-1)=="0")   {
            stringResult=stringResult.substring(0, stringResult.length-1);
        }
    }
    else    {
        result=firstNumber*secondNumber;
        stringResult=result.toString();
    }
    if(stringResult.charAt(stringResult.length-1)==".") {
        stringResult=stringResult.replace(".", "");
    }
    return stringResult;
}

function decimal_subtract(number1, number2) {
    let decimalPointIndex=number1.indexOf(".");
    let decimalPointIndex2=number2.indexOf(".");
    let decimalPointLength=number1.length;
    let decimalPointLength2=number2.length;
    let numbersAfterPoint=decimalPointIndex!=-1?decimalPointLength-1-decimalPointIndex:0;
    let numbersAfterPoint2=decimalPointIndex2!=-1?decimalPointLength2-1-decimalPointIndex2:0;
    number1=number1.replace(".", "");
    number2=number2.replace(".", "");
    let firstNumber=parseInt(number1);
    let secondNumber=parseInt(number2);
    let maxFractionalPart=Math.max(numbersAfterPoint, numbersAfterPoint2);
    let stringResult;
    let result;
    if(maxFractionalPart!=0)    {
        firstNumber=firstNumber*(10**(maxFractionalPart-numbersAfterPoint));
        secondNumber=secondNumber*(10**(maxFractionalPart-numbersAfterPoint2));
        result=firstNumber-secondNumber;
        stringResult=result.toString();
        console.log(firstNumber+"=firstnumber");
        console.log(secondNumber+"=secondneumrb");
        console.log("result="+stringResult);
        if(stringResult.length<=maxFractionalPart)   {
            stringResult = "0." + "0".repeat(maxFractionalPart-stringResult.length)+stringResult;
        }
        else {
            stringResult=stringResult.substring(0, stringResult.length-maxFractionalPart)+"."+stringResult.substring(stringResult.length-maxFractionalPart);
        }
        while(stringResult.charAt(stringResult.length-1)=="0")   {
            stringResult=stringResult.substring(0, stringResult.length-1);
        }
    }
    else    {
        result=firstNumber-secondNumber;
        stringResult=result.toString();
    }
    if(stringResult.charAt(stringResult.length-1)==".") {
        stringResult=stringResult.replace(".", "");
    }
    return stringResult;
}
