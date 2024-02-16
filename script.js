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

digit.forEach((element) => {
    element.addEventListener("click", () => {
        if (dis.textContent == "0") dis.textContent = element.textContent;
        else dis.textContent += element.textContent;
        changeOperatorsState(false);
        equal.disabled = false;
    })
});

dot.addEventListener("click", () => {
    dis.textContent += dot.textContent;
    dot.disabled = true;
})

op.forEach((element) => {
    element.addEventListener("click", () => {
        dis.textContent += element.textContent;
        changeOperatorsState(true);
        equal.disabled = true;
        dot.disabled = false;
    })
});

backspace.addEventListener("click", () => {
    const operators = "-/+*";
    const Dot = ".";
    if (operators.includes(dis.textContent.at(-1))) {
        changeOperatorsState(false);
        equal.disabled = false;
    }
    else if (dis.textContent.at(-1) == '.') {
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

    if (dis.textContent.length == 0 || dis.textContent.length == 1) dis.textContent = "0";
})

clear.addEventListener("click", () => {
    dis.textContent = "0";
    dot.disabled = false;
    op.forEach((element) => {
        element.disabled = false;
    })
    equal.disabled = false;
    console.clear();
})

equal.addEventListener("click", () => {
    let exp = dis.textContent;
    const operands = exp.split(/[-+/*]/g);
    for (let operand in operands) {
        operands[operand] = Number(operands[operand]);
    }

    const operators = exp.replace(/[0-9]/g, "").replace(/[.]/g, "").split("");

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
});