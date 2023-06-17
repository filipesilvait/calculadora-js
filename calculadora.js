const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', handleButtonClick);
document.addEventListener('keydown', handleKeyPress);

function handleButtonClick(event) {
  const key = event.target;
  handleKeyAction(key);
}

function handleKeyPress(event) {
  const key = document.querySelector(`button[data-key="${event.key}"]`);
  if (key) {
    handleKeyAction(key);
  }
}

function handleKeyAction(key) {
  const keyContent = key.textContent;
  const displayedNum = display.textContent;
  const action = key.dataset.action;

  if (!action) {
    if (displayedNum.length < 10) {
      display.textContent = displayedNum === '0' || calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate' ? keyContent : displayedNum + keyContent;
    }
    calculator.dataset.previousKeyType = 'number';
  }

  if (action === 'decimal') {
    if (!display.textContent.includes('.') && calculator.dataset.previousKeyType !== 'operator') {
      display.textContent += '.';
      calculator.dataset.previousKeyType = 'decimal';
    }
  }

  if (action === 'clear') {
    display.textContent = '0';
    calculator.dataset.previousKeyType = 'clear';
  }

  if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (firstValue && operator && calculator.dataset.previousKeyType !== 'operator' && calculator.dataset.previousKeyType !== 'calculate') {
      const result = calculate(parseFloat(firstValue), operator, parseFloat(secondValue));
      display.textContent = result;
      calculator.dataset.firstValue = result;
    } else {
      calculator.dataset.firstValue = displayedNum;
    }

    calculator.dataset.operator = action;
    calculator.dataset.previousKeyType = 'operator';
  }

  if (action === 'calculate') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (firstValue && operator) {
      display.textContent = calculate(parseFloat(firstValue), operator, parseFloat(secondValue));
    }

    calculator.dataset.previousKeyType = 'calculate';
  }
}

function calculate(firstValue, operator, secondValue) {
  switch (operator) {
    case 'add':
      return firstValue + secondValue;
    case 'subtract':
      return firstValue - secondValue;
    case 'multiply':
      return firstValue * secondValue;
    case 'divide':
      return firstValue / secondValue;
    default:
      return secondValue;
  }
}


function openEmail(emailAddress, subject) {
  
  var mailtoLink = "mailto:" + emailAddress + "?subject=" + subject;

  
  window.open(mailtoLink);
}