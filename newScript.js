let waitingForSecondOperand = false
let waitingForEqual = false
let firstOperand = ""
let secondOperand = ""
let answer = ""
let operator = ""

function operate(a, b, operator) {
    a = parseInt(a)
    b = parseInt(b)
    let temp = 0
    switch(operator) {
        case "+":
            temp = a + b
            return temp.toString()
        case "-":
            temp = a - b
            return temp.toString()
        case "*":
            temp = a * b
            return temp.toString()
        case "/":
            temp = a / b
            return temp.toString()
    }
}
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
                waitingForEqual = false
                firstOperand = answer
                secondOperand = ""
            }
            if (key.classList.contains('clear')) {
                waitingForSecondOperand = false
                waitingForEqual = false
                firstOperand = ""
                secondOperand = ""
                answer = ""
                operator = ""
                updateDisplay()
            }
        })
    })
}
inputDigit()