// function handleEqual() { [MATHEMATICALLY CORRECT VERSION - GOOGLE CALC VERSION]
//     while (storedOperandArray.length > 1) {
//         let answer = ""
//         let divisorIndex = storedOperandArray.indexOf('/')
//         let multiplyIndex = storedOperandArray.indexOf('*')

//         if (divisorIndex < 0 && multiplyIndex < 0) {
//             let plusIndex = storedOperandArray.indexOf('+')
//             let minusIndex = storedOperandArray.indexOf('-')

//             if (plusIndex > 0 && minusIndex > 0) {
//                 if (plusIndex > minusIndex) {
//                     answer = operate(storedOperandArray[minusIndex-1],
//                         storedOperandArray[minusIndex+1],
//                         storedOperandArray[minusIndex])
//                     storedOperandArray.splice(minusIndex-1, 3, answer)
//                     console.log(storedOperandArray)
//                     continue
//                 } else {
//                     answer = operate(storedOperandArray[plusIndex-1],
//                         storedOperandArray[plusIndex+1],
//                         storedOperandArray[plusIndex])
//                     storedOperandArray.splice(plusIndex-1, 3, answer)
//                     console.log(storedOperandArray)
//                     continue
//                 }
//             } else if (plusIndex > 0 && minusIndex < 0) {
//                 answer = operate(storedOperandArray[plusIndex-1],
//                     storedOperandArray[plusIndex+1],
//                     storedOperandArray[plusIndex])
//                 storedOperandArray.splice(plusIndex-1, 3, answer)
//                 console.log(storedOperandArray)
//                 continue
//             } else if (plusIndex < 0 && minusIndex > 0) {
//                 answer = operate(storedOperandArray[minusIndex-1],
//                     storedOperandArray[minusIndex+1],
//                     storedOperandArray[minusIndex])
//                 storedOperandArray.splice(minusIndex-1, 3, answer)
//                 console.log(storedOperandArray)
//                 continue
//             }                        
//         } else if (divisorIndex > 0 && multiplyIndex > 0) {
//             if (divisorIndex > multiplyIndex) {
//                 answer = operate(storedOperandArray[multiplyIndex-1],
//                     storedOperandArray[multiplyIndex+1],
//                     storedOperandArray[multiplyIndex])
//                 storedOperandArray.splice(multiplyIndex-1, 3, answer)
//                 console.log(storedOperandArray)
//                 continue
//             } else {
//                 answer = operate(storedOperandArray[divisorIndex-1],
//                     storedOperandArray[divisorIndex+1],
//                     storedOperandArray[divisorIndex])
//                 storedOperandArray.splice(divisorIndex-1, 3, answer)
//                 console.log(storedOperandArray)
//                 continue
//             }
//         } else if (divisorIndex > 0 && multiplyIndex < 0) {
//             answer = operate(storedOperandArray[divisorIndex-1],
//                 storedOperandArray[divisorIndex+1],
//                 storedOperandArray[divisorIndex])
//             storedOperandArray.splice(divisorIndex-1, 3, answer)
//             console.log(storedOperandArray)
//             continue
//         } else if (divisorIndex < 0 && multiplyIndex > 0) {
//             answer = operate(storedOperandArray[multiplyIndex-1],
//                 storedOperandArray[multiplyIndex+1],
//                 storedOperandArray[multiplyIndex])
//             storedOperandArray.splice(multiplyIndex-1, 3, answer)
//             console.log(storedOperandArray)
//             continue
//         }
//     }
// }
function operate(a, b, operator) {
    a = parseFloat(a)
    b = parseFloat(b)
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
let displayValue = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";
let operatorKey = "";
let waitingForSecondOperand = false
let darkMode = false;
const numberRegex = /\d+/g;
const operators = document.querySelectorAll('.operators')

function handleNumber(keyValue) {
    if (operator === "/" && keyValue === "0") {
        console.log(operator, keyValue)
        displayValue = "nice try"
        return
    }
    if (waitingForSecondOperand) {
        secondOperand += keyValue
        displayValue += keyValue
    } else {
        if (displayValue === "0") {
            firstOperand = keyValue
            displayValue = keyValue
        } else {
            firstOperand += keyValue
            displayValue += keyValue
        }
    }
}
function handleOperator(keyValue) {
    if (waitingForSecondOperand && secondOperand !== "") {
        let result = operate(firstOperand, secondOperand, operator)
        displayValue = result
        firstOperand = result
        secondOperand = ""
    }  
    operator = keyValue
    waitingForSecondOperand = true
}
function handleEqual() {
    let result = operate(firstOperand, secondOperand, operator)
    displayValue = result
    firstOperand = result
    secondOperand = ""
    waitingForSecondOperand = false;
    [...operators].forEach(operator => {
        if (operator.classList.contains('highlightOperator')) {
            operator.classList.toggle('highlightOperator')
        }
    })
}
function reset() {
    displayValue = "0";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    waitingForSecondOperand = false;
    [...operators].forEach(operator => {
        if (operator.classList.contains('highlightOperator')) {
            operator.classList.toggle('highlightOperator')
        }
    })
}
function handleDot() {
    if (waitingForSecondOperand) {
        secondOperand += "."
        displayValue += "."
    } else if (!waitingForSecondOperand) {
        firstOperand += "."
        displayValue += "."
    }
}
function handlePercent() {
    if(!displayValue == "0"){
        displayValue *= 0.01;
        displayValue = Math.round(displayValue*100000000)/100000000;
    }
}
function updateDisplay() {
    const display = document.querySelector('.calculator-screen')
    if (displayValue.length > 14) {
        display.value = displayValue.slice(0, 15)
    } else {
        display.value = displayValue
    }
}
// main calculator function
const keys = document.querySelectorAll('.input')
const colorMode = document.querySelector('.colorMode')
keys.forEach(key => {
    key.addEventListener('click', () => {
            if (key.classList.contains('number')) {
                handleNumber(key.value)
                updateDisplay()
            }
            if (key.classList.contains('operators')) {
                [...operators].forEach(operator => {
                    if (operator.classList.contains('highlightOperator')) {
                        operator.classList.toggle('highlightOperator')
                        displayValue = firstOperand
                    }
                })
                key.classList.toggle('highlightOperator')
                handleOperator(key.value);
                updateDisplay()
                displayValue = ""
            }
            if (key.classList.contains('equal')) {
                handleEqual()
                updateDisplay()
            }
            if (key.classList.contains('clear')) {
                reset()
                updateDisplay()
            }
            if (key.classList.contains('del')) {
                if (waitingForSecondOperand) {
                    secondOperand = secondOperand.slice(0, -1)
                    displayValue = secondOperand
                    updateDisplay()
                } else {
                    firstOperand = firstOperand.slice(0, -1)
                    displayValue = firstOperand
                    updateDisplay()
                }
            }
            if (key.classList.contains('dot')) {
                handleDot()
                updateDisplay()
            }
            if (key.classList.contains('percent')) {
                handlePercent()
                updateDisplay()
            }
    })
})
// dark mode function
colorMode.addEventListener('click', () => {
    const jr7 = document.querySelector('.jr7')
    const inputButtons = document.querySelectorAll('.input')
    const edgeButtons = document.querySelectorAll('.edge')
    const calc = document.querySelector('#calculator')
    const output = document.querySelector('#output')
    const calcScreen = document.querySelector('.calculator-screen')
    const equalBtn = document.querySelector('#equalBtn')
    const pic = document.querySelector('.mode')

    console.log(darkMode)
    if (darkMode) {
        document.body.style.backgroundColor = "#FFFFFF"
        document.body.style.color = "#171717"
        jr7.style.color = "#171717"
    
        inputButtons.forEach(inputButton => {
            inputButton.style.color = "#171717"
            inputButton.style.backgroundColor = "#EFEFEF"
        })
        edgeButtons.forEach(edgeButton => {
            edgeButton.style.backgroundColor = "#FFEDC3"
            edgeButton.style.color = "#ca932c"
        })
        calc.style.border = "2px solid #dadada"
        output.style.backgroundColor = "#f4fdfb"
        output.style.borderBottom = "0px solid #dadada"
        calcScreen.style.backgroundColor = "#f4fdfb"
        calcScreen.style.color = "#171717"
        equalBtn.style.backgroundColor = "#FDC239"
        equalBtn.style.color = "#ca932c"
        pic.src = "assets/sun.png"
        darkMode = false
    } else {
        document.body.style.backgroundColor = "#1E1E1E"
        document.body.style.color = "#FCFCFC"
        jr7.style.color = "#FCFCFC"
    
        inputButtons.forEach(inputButton => {
            inputButton.style.color = "#FCFCFC"
            inputButton.style.backgroundColor = "#252525"
        })
        edgeButtons.forEach(edgeButton => {
            edgeButton.style.backgroundColor = "#333333"
        })
        calc.style.border = "2px solid #414141"
        output.style.backgroundColor = "#1E1E1E"
        output.style.borderBottom = "1px solid #414141"
        calcScreen.style.backgroundColor = "#1E1E1E"
        calcScreen.style.color = "#FCFCFC"
        pic.src = "assets/moon.png"
        darkMode = true
    }
})
// keyboard function
function keyCheck(event) {
    var keyID = event.keyCode;
    var key = event.key
    if (keyID == 8) {
        if (waitingForSecondOperand) {
            secondOperand = secondOperand.slice(0, -1)
            displayValue = secondOperand
            updateDisplay()
        } else {
            firstOperand = firstOperand.slice(0, -1)
            displayValue = firstOperand
            updateDisplay()
        }
    }
    else if (key >= 0 && key <= 9) {
        handleNumber(key)
        updateDisplay()
    }
    else if (key == 'c') {
        reset()
        updateDisplay()
    }
    else if (key == '+' || key == '-' || key == '/' || key == '*') {
        [...operators].forEach(operator => {
            if (operator.value == key) {
                operatorKey = operator
            }
            if (operator.classList.contains('highlightOperator')) {
                operator.classList.toggle('highlightOperator')
                displayValue = firstOperand
            }
        })
        console.log(operatorKey)
        operatorKey.classList.toggle('highlightOperator')
        handleOperator(operatorKey.value);
        updateDisplay()
        displayValue = ""
    }
    else if (keyID == 13) {
        handleEqual()
        updateDisplay()
    }
    // else if (key == '%') {
    //     handlePercent();
    //     updateDisplay();
    // }
    else if (key == '.') {
        handleDot();
        updateDisplay();
    }
}
document.addEventListener("keydown", keyCheck);