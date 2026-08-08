function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a *  b;
}
function divide(a,b){
    if(b==0) return "Error!";
    return a / b;
}
function operate(operator,a,b){
    if(operator=="+") return add(a,b);
    if(operator=="-") return subtract(a,b);
    if(operator=="×") return multiply(a,b);
    if(operator=="÷") return divide(a,b);
}
//State variables
let firstNumber="";
let secondNumber="";
let operator="";
let shouldResetDisplay=false;

//display
const display=document.querySelector("#display")
function updateDisplay(value){
    display.textContent=value;
}

function inputNumber(number) {
  if (shouldResetDisplay) {
    updateDisplay("");
    shouldResetDisplay = false;
  }

  if (display.textContent === "0") {
    updateDisplay(number);
  } else {
    updateDisplay(display.textContent + number);
  }
  }

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputNumber(button.textContent);
  });
});

function inputOperator(op) {
  if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
    const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
    updateDisplay(result);
    firstNumber = String(result);
    secondNumber = "";
  } else {
    firstNumber = display.textContent;
  }
  
  operator = op;
  shouldResetDisplay = true;
}

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputOperator(button.textContent);
  });
});
function calculate() {
  if (firstNumber === "" || operator === "") return;
  
  secondNumber = display.textContent;
  
  let result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
  
  if (typeof result === "number") {
    result = Math.round(result * 1000000000) / 1000000000;
  }
  
  updateDisplay(result);
  firstNumber = String(result);
  secondNumber = "";
  operator = "";
  shouldResetDisplay = true;
}

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", calculate);

function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  shouldResetDisplay = false;
  updateDisplay("0");
}

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearCalculator);

function backspace() {
  if (display.textContent.length === 1) {
    updateDisplay("0");
  } else {
    updateDisplay(display.textContent.slice(0, -1));
  }
}

const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", backspace);

