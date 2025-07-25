const calculatorDisplay = document.querySelector('h1');
const inputButtons  = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
  if(awaitingNextValue){
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal(){
  if(awaitingNextValue) return;
  if(!calculatorDisplay.textContent.includes('.')){
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator){
  const currentValue = Number(calculatorDisplay.textContent);
  if(operatorValue && awaitingNextValue){
    operatorValue = operator;
    return;
  }
  if(!firstValue){
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;

    // ✅ Save to backend
    saveHistory(`${firstValue} ${operator} ${currentValue}`, calculation);
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

function resetAll(){
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', resetAll);

inputButtons.forEach((btn) => {
  if(btn.classList.length === 0){
    btn.addEventListener('click', () => sendNumberValue(btn.value));
  } else if(btn.classList.contains('operator')){
    btn.addEventListener('click', () => useOperator(btn.value));
  }
});

async function saveHistory(expression, result) {
  await fetch('/api/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${yourToken}`
    },
    body: JSON.stringify({ expression, result })
  });
}

async function getHistory() {
  const res = await fetch('/api/history', {
    headers: { 'Authorization': `Bearer ${yourToken}` }
  });
  const data = await res.json();
  console.log(data);
}

const yourToken = '<<PASTE_YOUR_SANCTUM_TOKEN_HERE>>';
