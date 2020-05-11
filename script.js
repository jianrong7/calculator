const checkbox = document.querySelector(".checkbox");
const keys = document.querySelector("#calculatorInput");

let displayValue = "0";
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

function updateDisplay() {
    const display = document.querySelector("#number");
    display.value = displayValue;
}
function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    }
    else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}
function inputDecimal(dot) {
    if (waitingForSecondOperand === true) return;
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);

        displayValue = String(result);
        firstOperand = result;
    }
    waitingForSecondOperand = true;
    operator = nextOperator;
}
// perform calculations
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
};
function resetCalculator() {
    displayValue = "0";
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
}
function handlePercent() {
    if(!displayValue == "0"){
        displayValue *= 0.01;
        displayValue = Math.round(displayValue*100000000)/100000000;
    }
    updateDisplay();
}
function handlePlusMinus() {
    if (displayValue[0] === '-') {
        displayValue = displayValue.slice(1);
    } else {
          displayValue = '-' + displayValue;
    }
}

updateDisplay();
keys.addEventListener("click", (event) => {
    //const { target } = event;
    const target = event.target;
    if(!target.matches('button')) {
        return;
    }
    if(target.classList.contains('math')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if(target.classList.contains('percent')) {
        handlePercent();
        updateDisplay();
    }
    if(target.classList.contains('plusMinus')) {
        handlePlusMinus();
        updateDisplay();
    }
    if(target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        console.log(displayValue)
        return;
    }
    if(target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

// // night mode
checkbox.addEventListener("change", nightmode)
// // end night mode--

// night mode function
function nightmode(e) {
    const border = document.querySelector("#calculator");
    const header = document.querySelector("#calculatorHeader");
    const output = document.querySelector("#output");
    const number = document.querySelector("#number");
    const calcInput = document.querySelector("#calculatorInput");
    const operatorInputs = document.querySelectorAll(".input");
    const numberInputs = document.querySelectorAll(".numInput");
    const equal = document.querySelector("#equalBtn");
    if (this.checked) {
        border.style.borderColor = "#212b41";
        border.style.transitionDuration = ".4s";

        header.style.backgroundColor = "#212b41";
        header.style.transitionDuration = ".4s";

        output.style.backgroundColor = "#212b41";
        output.style.transitionDuration = ".4s";

        number.style.color = "#18d4a3";
        number.style.backgroundColor = "#212b41";
        number.style.transitionDuration = ".4s";

        calcInput.style.backgroundColor = "#2d384f";
        calcInput.style.transitionDuration = ".4s";

        operatorInputs.forEach((operatorInput) => {
            operatorInput.style.backgroundColor = "#212b41";
            operatorInput.style.color = "#18d4a3";
            operatorInput.style.transitionDuration = ".4s";
        })

        numberInputs.forEach((numberInput) => {
            numberInput.style.backgroundColor = "#2d384f";
            numberInput.style.color = "#96a8a0";
            numberInput.style.transitionDuration = ".4s";
        })

        equal.style.backgroundColor = "#18d4a3";
        equal.style.color = "#333333";
        equal.style.transitionDuration = ".4s";
    }
    else {
        border.style.borderColor = "grey"
        header.style.backgroundColor = "#f4fdfb";
        output.style.backgroundColor = "#f4fdfb";
        number.style.color = "#373e47";
        number.style.backgroundColor = "#f4fdfb";
        calcInput.style.backgroundColor = "white";

        operatorInputs.forEach((operatorInput) => {
            operatorInput.style.backgroundColor = "#f4fdfb";
            operatorInput.style.color = "#333333";
        })

        numberInputs.forEach((numberInput) => {
            numberInput.style.backgroundColor = "#f4fdfb";
            numberInput.style.color = "#333333";
        })

        equal.style.backgroundColor = "#18d4a3";
        equal.style.color = "white";
    }
}
/* NIGHT MODE */