let runningTotal = 0; //the OG number we want displayed will be 0
let buffer = "0"; //this is in string format since everything is a string to begin with
let previousOperator; // keeping track of what the user previousely pressed, you want it to rember you  pressed "+"
const screen = document.querySelector(".screen");


// this function tells what to do once the button is clicked to verify if there is a symbol or # being clicked
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }   else {
        handleNumber(value);
    }  
    rerender();
}

// this funciton will handle the numbers
function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
    rerender();
}

function handleMath (value) {
    if (buffer === "0") { //do nothing
    return;
    }
    const intBuffer = parseInt(buffer); 
    if (runningTotal === 0) {
        runningTotal = intBuffer; //connecting runningTotal to intBuffer
    } else {
      flushOperation (intBuffer); // we need to store the value here
    }
    
    previousOperator = value;
    
    buffer = "0";
}

//this is the function for flushOperation, or the heart of our math
function flushOperation (intBuffer) {
    if (previousOperator === "+") {  // if we press "+", I wnat my running total to add
     runningTotal += intBuffer;
    }else if (previousOperator === "-") {
     runningTotal -= intBuffer;
    }else if (previousOperator === "x") {
     runningTotal *= intBuffer;
    }else if (previousOperator === "÷") {
     runningTotal /= intBuffer;
    }
}

// this funciton will handle the symbols
function handleSymbol (value) {
    switch (value) {
        case "C": // if vlaue is = to "C" then do this.... onto next line
            buffer = "0";
            runningTotal = 0;
        break;
        
        case "=":
            if (previousOperator === null) { //previousOperator equaling null means we need 2 Numbers to do math
            return;
            }
            flushOperation(parseInt(buffer)); //turn buffer into a # and pass it into flushOperation
            PreviousOperator = null;
            buffer = "" +runningTotal; //string concatination
            runningTotal = 0;
        break;

        case "←":
            if (buffer.length === 1) {
            buffer = "0";
        } else {
            buffer = buffer.substring (0, buffer.length - 1); //taking one number off of the string instead of clearing
        }
        break;
        default:
            handleMath(value);
    }
}
// this is the rerender funciton that is seen throughout the program to rerender the screen/
function rerender(){
    screen.innerText = buffer;
}

//this function adds the "click" event listener to the "calc button" selector 

document.querySelector(".calc-buttons")
.addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
});
