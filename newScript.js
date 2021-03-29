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
let waitingForSecondOperand = false
const numberRegex = /\d+/g;

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
    if (waitingForSecondOperand) {
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
    waitingForSecondOperand = false
}
function reset() {
    displayValue = "0";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    waitingForSecondOperand = false
}
function updateDisplay() {
    const display = document.querySelector('.calculator-screen')
    display.value = displayValue
}

const keys = document.querySelectorAll('.input')
keys.forEach(key => {
    key.addEventListener('click', () => {
            if (key.classList.contains('number')) {
                handleNumber(key.value)
                updateDisplay()
            }
            if (key.classList.contains('operators')) {
                handleOperator(key.value)
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
    })
})