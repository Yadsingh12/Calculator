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

const dis = document.querySelector('#display');

const digit = document.querySelectorAll(".digit");
const op = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");

digit.forEach((element) => {
    element.addEventListener("click", () => {
        dis.textContent += element.textContent;
        op.forEach((element) => {
            element.disabled = false;
        })
        equal.disabled = false;
    })
});

op.forEach((element) => {
    element.addEventListener("click", () => {
        dis.textContent += element.textContent;
        op.forEach((element) => {
            element.disabled = true;
        })
        equal.disabled = true;
    })
});

clear.addEventListener("click", () => (dis.textContent = "0"))

equal.addEventListener("click", () => {
    let exp = dis.textContent;
    const operands = exp.split(/[+-/*]+/);
    for (let operand in operands) {
        operands[operand] = Number(operands[operand]);
    }
    console.log(operands);
    const operators = exp.replace(/[0-9]/g, "").split("");
    console.log(operators);
    i = 0;
    let result = operands[i];
    i++;
    for (let operator in operators) {
        result = operate(result, operands[i], operators[operator]);
        i++;
        console.log(result);
    }
    dis.textContent = result;
});