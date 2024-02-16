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
const dot = document.querySelector('#dot');
const backspace = document.querySelector('#backspace');

const changeOperatorsState = function (bool) {
    op.forEach((element) => {
        element.disabled = bool;
    })
}

const dotFunction = function () {
    dis.textContent += dot.textContent;
    dot.disabled = true;
}

const operatorFunction = function (operator) {
    dis.textContent += operator;
    changeOperatorsState(true);
    equal.disabled = true;
    dot.disabled = false;
}

const operandFunction = function (operand) {
    if (dis.textContent == "0") dis.textContent = operand;
    else dis.textContent += operand;
    changeOperatorsState(false);
    equal.disabled = false;
}

const backspaceFunction = function () {
    const operators = "-/+*";
    const Dot = ".";
    if (operators.includes(dis.textContent.at(-1))) {
        changeOperatorsState(false);
        equal.disabled = false;
    }
    else if (dis.textContent.at(-1) === '.') {
        dot.disabled = false;
    }

    dis.textContent = dis.textContent.slice(0, -1);

    if (operators.includes(dis.textContent.at(-1))) {
        changeOperatorsState(true);
        equal.disabled = true;
        dot.disabled = false;
    } else {
        if (
            dis.textContent.lastIndexOf(".") > dis.textContent.lastIndexOf("+")
            && dis.textContent.lastIndexOf(".") > dis.textContent.lastIndexOf("-")
            && dis.textContent.lastIndexOf(".") > dis.textContent.lastIndexOf("*")
            && dis.textContent.lastIndexOf(".") > dis.textContent.lastIndexOf("/")
        ) {
            dot.disabled = true;
        }
    }

    if (dis.textContent.length == 0) dis.textContent = "0";
}

const equalFunction = function () {
    let exp = dis.textContent;
    const operands = exp.split(/[-+/*]/g);
    for (let operand in operands) {
        operands[operand] = Number(operands[operand]);
    }
    console.log(operands);
    const operators = exp.replace(/[0-9]/g, "").replace(/[.]/g, "").split("");
    console.log(operators);
    i = 0;
    let result = operands[i];
    i++;
    for (let operator in operators) {
        result = +parseFloat(operate(result, operands[i], operators[operator])).toFixed(3);
        if (isNaN(result) || !isFinite(result)) {
            alert("Dividing by zero is not allowed");
            return;
        }
        i++;
        console.log(result);
    }

    dis.textContent = result;
}

digit.forEach((element) => {
    element.addEventListener("click", () => { operandFunction(element.textContent); });
});

dot.addEventListener("click", () => {dotFunction();});

op.forEach((element) => {
    element.addEventListener("click", () => { operatorFunction(element.textContent); });
});

backspace.addEventListener("click", () => {backspaceFunction();});

equal.addEventListener("click", () => {equalFunction();});

clear.addEventListener("click", () => {
    dis.textContent = "0";
    dot.disabled = false;
    op.forEach((element) => {
        element.disabled = false;
    })
    equal.disabled = false;
    console.clear();
})

document.addEventListener("keydown", (event) => {
    const operands = "123456789";
    const operators = "-+/*";
    if (operands.includes(event.key)) {
        operandFunction(event.key);
    } else if (operators.includes(event.key) && op[0].disabled == false) {
        operatorFunction(event.key);
    } else if (event.key === "." && dot.disabled == false) {
        dotFunction();
    } else if (event.key === "Backspace") {
        backspaceFunction();
    } else if (event.key === "=" && equal.disabled == false) {
        equalFunction();
    }
})
