let waitingForSecondOperand = false
let waitingForEqual = false
let firstOperand = ""
let secondOperand = ""
let answer = ""
let operator = ""

// function add(a, b) {
//     return a + b;
// }
// function subtract(a, b) {
//     return a - b;
// }
// function multiply(a, b) {
//     return a * b;
// }
// function divide(a, b) {
//     return a / b;
// }
function operate(a, b, operator) {
    a = parseInt(a)
    b = parseInt(b)
    console.log(a)
    console.log(b)
    console.log(operator)
    switch(operator) {
        case "+":
            return a + b
        case "-":
            return a - b
        case "*":
            return a * b
        case "/":
            return a / b
    }
}
// function updateDisplay(displayValue) {
//     const display = document.querySelector('.calculator-screen')
//     displayValue = parseInt(displayValue)

//     if (Number.isNaN(displayValue)) {
//         return
//     } else {
//         if (display.Value == "") {
//             display.value = displayValue
//         } else {
//             display.value += displayValue
//         }
//     }
// }
// function handleOperator(key, firstNumber) {
//     // if (key.value == )
//     console.log(firstNumber)
// }
function updateDisplay() {
    const display = document.querySelector('.calculator-screen')
    if (!waitingForSecondOperand) {
        display.value = firstOperand
    } else if (waitingForEqual) {
        display.value = answer
    } else {
        display.value = secondOperand
    }
}
function updateOperand(key) {
    if (!waitingForSecondOperand) {
        firstOperand += key.value
    } else {
        secondOperand += key.value
    }
}
function inputDigit() {
    const keys = document.querySelectorAll('.input')
    const display = document.querySelector('.calculator-screen')
    keys.forEach(key => {
        key.addEventListener('click', () => {
            if (key.classList.contains('number')) {
                updateOperand(key)
                updateDisplay()
            }
            if (key.classList.contains('operators')) {
                waitingForSecondOperand = true
                operator = key.value
                console.log(operator)
                updateDisplay()
            }
            if (key.classList.contains('equal')) {
                waitingForEqual = true                
                answer = operate(firstOperand, secondOperand, operator)
                console.log(answer)
                updateDisplay()
                waitingForSecondOperand = false
            }
        })
    })
}
inputDigit()