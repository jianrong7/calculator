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
  