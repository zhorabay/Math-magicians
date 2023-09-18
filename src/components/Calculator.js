import './style.css';
import React, { useState } from 'react';
import calculate from '../logic/calculate';

function Calculator() {
  const [calculatorData, setCalculatorData] = useState({
    total: null,
    next: null,
    operation: null,
  });
  const handleClick = (buttonName) => {
    let modifiedButtonName = buttonName;

    if (buttonName === '/') {
      modifiedButtonName = '÷';
    }

    const newCalculatorData = calculate(calculatorData, modifiedButtonName);
    setCalculatorData(newCalculatorData);
  };

  const displayValue = calculatorData.next || calculatorData.total || '0';

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <button type="button" onClick={() => handleClick('AC')}>AC</button>
        <button type="button" onClick={() => handleClick('+/-')}>+/-</button>
        <button type="button" onClick={() => handleClick('%')}>%</button>
        <button type="button" className="symbol-bg" onClick={() => handleClick('/')}>÷</button>
        <button type="button" onClick={() => handleClick('7')}>7</button>
        <button type="button" onClick={() => handleClick('8')}>8</button>
        <button type="button" onClick={() => handleClick('9')}>9</button>
        <button type="button" className="symbol-bg" onClick={() => handleClick('x')}>x</button>
        <button type="button" onClick={() => handleClick('4')}>4</button>
        <button type="button" onClick={() => handleClick('5')}>5</button>
        <button type="button" onClick={() => handleClick('6')}>6</button>
        <button type="button" className="symbol-bg" onClick={() => handleClick('-')}>-</button>
        <button type="button" onClick={() => handleClick('1')}>1</button>
        <button type="button" onClick={() => handleClick('2')}>2</button>
        <button type="button" onClick={() => handleClick('3')}>3</button>
        <button type="button" className="symbol-bg" onClick={() => handleClick('+')}>+</button>
        <button type="button" className="span-two" onClick={() => handleClick('0')}>0</button>
        <button type="button" onClick={() => handleClick('.')}>.</button>
        <button type="button" className="symbol-bg" onClick={() => handleClick('=')}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
