import './Calculator.css';
import React, { useReducer } from 'react';
import calculate from '../logic/calculate';

const initialState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CLEAR':
      return calculate(state, 'AC');
    case 'TOGGLE_SIGN':
      return calculate(state, '+/-');
    case 'PERCENTAGE':
      return calculate(state, '%');
    case 'OPERATION':
      return calculate(state, action.operation);
    case 'DIGIT':
      return calculate(state, action.digit);
    case 'EQUALS':
      return calculate(state, '=');
    default:
      return state;
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const formatOperand = (operand) => operand || '0';

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(state.previousOperand)}
          {' '}
          {state.operation}
        </div>
        <div className="current-operand">{formatOperand(state.currentOperand)}</div>
      </div>
      <button type="button" onClick={() => dispatch({ type: 'CLEAR' })}>AC</button>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_SIGN' })}>+/-</button>
      <button type="button" onClick={() => dispatch({ type: 'PERCENTAGE' })}>%</button>
      <button type="button" className="symbol-bg" onClick={() => dispatch({ type: 'OPERATION', operation: '÷' })}>÷</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '7' })}>7</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '8' })}>8</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '9' })}>9</button>
      <button type="button" className="symbol-bg" onClick={() => dispatch({ type: 'OPERATION', operation: 'x' })}>x</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '4' })}>4</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '5' })}>5</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '6' })}>6</button>
      <button type="button" className="symbol-bg" onClick={() => dispatch({ type: 'OPERATION', operation: '-' })}>-</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '1' })}>1</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '2' })}>2</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '3' })}>3</button>
      <button type="button" className="symbol-bg" onClick={() => dispatch({ type: 'OPERATION', operation: '+' })}>+</button>
      <button type="button" className="span-two" onClick={() => dispatch({ type: 'DIGIT', digit: '0' })}>0</button>
      <button type="button" onClick={() => dispatch({ type: 'DIGIT', digit: '.' })}>.</button>
      <button type="button" className="symbol-bg" onClick={() => dispatch({ type: 'EQUALS' })}>=</button>
    </div>
  );
}

export default Calculator;
