var checkbox = document.querySelector("input[name=checkbox]");

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return roundNum(add(a, b));
        case '-':
            return roundNum(subtract(a, b));
        case 'x':
            return roundNum(multiply(a, b));
        case '÷':
            return roundNum(divide(a, b));
    }
}
function roundNum(num) {
    if (String(num).includes('.') && String(num).replace(/\d*./, '').length > 9){
        return Math.round(num*100000000)/100000000;
    }
    return num;
}
function buttonPressed(btn) {
    btn.classList.add('clicked');
    // setTimeout(removeClicked.bind(null, btn), 100);
    setTimeout(() => {btn.classList.remove('clicked')}, 100);
}

/* NIGHT MODE*/
checkbox.addEventListener("change", function() {
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
        border.style.border = "grey;"
        header.style.backgroundColor = "#f4fdfb";
        output.style.backgroundColor = "#f4fdfb";
        number.style.color = "#373e47";
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
})
/* NIGHT MODE */