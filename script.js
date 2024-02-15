const addition = function (a, b) {
    return a + b;
}
const subtraction = function (a, b) {
    return addition(a, -b);
}
const multiply = function (a, b) {
    return a * b;
}
const divide = function (a, b) {
    return a / b;
}
const operate = function (operand1, operand2, operator) {
    let result;
    switch (operator) {
        case "+":
            result = addition(operand1, operand2);
            break;
        case "-":
            result = subtraction(operand1, operand2);
            break;
        case "*":
            result = multiply(operand1, operand2);
            break;
        case "/":
            result = divide(operand1, operand2);
            break;
    }
    return result;
}
let operand1 = null, operand2 = null, operator = null;
//console.log (operate(3,4,"*"));
const dis = document.querySelector('#display');

const digit = document.querySelectorAll(".digit");
const op = document.querySelectorAll(".operator");

digit.forEach((element)=> {
    element.addEventListener("click",()=> {
        dis.textContent += element.textContent;
        op.forEach((element)=>{
            element.disabled = false;
        })
    })
});

op.forEach((element)=> {
    element.addEventListener("click",()=> {
        dis.textContent += element.textContent;
        op.forEach((element)=>{
            element.disabled = true;
        })
    })
});