class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNummber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let result;
    const previousNumber = parseInt(this.previousOperand);
    const currentNumber = parseInt(this.currentOperand);
    if (isNaN(previousNumber) || isNaN(currentNumber)) return;
    switch (this.operation) {
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "-":
        result = previousNumber - currentNumber;
        break;
      case "*":
        result = previousNumber * currentNumber;
        break;
      case "%":
        result = previousNumber / currentNumber;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.previousOperand = "";
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay;
    }
  }

  updateResult() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-allclear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNummber(button.innerText);
    calculator.updateResult();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateResult();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateResult();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateResult();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateResult();
});
