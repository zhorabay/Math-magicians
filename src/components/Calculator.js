import './Calculator.css';
import React, { useReducer } from 'react';
import calculate from '../logic/calculate';

const initialState = {
  currentOperand: '0',
  previousOperand: '',
  operation: null,
  waitingForOperand: false,
  decimalUsed: false,
  newCalculation: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CLEAR':
      return initialState;
    case 'TOGGLE_SIGN':
      return {
        ...state,
        currentOperand:
          state.currentOperand.charAt(0) === '-'
            ? state.currentOperand.slice(1)
            : `-${state.currentOperand}`,
      };
    case 'PERCENTAGE':
      return {
        ...state,
        currentOperand: (parseFloat(state.currentOperand) / 100).toString(),
      };
    case 'OPERATION':
      if (state.waitingForOperand) {
        return {
          ...state,
          operation: action.operation,
        };
      }
      if (state.operation) {
        const updatedState = calculate(state, '=');
        return {
          ...updatedState,
          waitingForOperand: true,
          newCalculation: true,
          operation: action.operation,
          previousOperand: state.currentOperand,
          currentOperand: '0',
          decimalUsed: false,
        };
      }
      return {
        ...state,
        waitingForOperand: true,
        operation: action.operation,
        previousOperand: state.currentOperand,
        currentOperand: '0',
        decimalUsed: false,
      };
    case 'DIGIT':
      if (state.waitingForOperand) {
        return {
          ...state,
          currentOperand: action.digit,
          waitingForOperand: false,
          decimalUsed: false,
        };
      }
      if (action.digit === '.' && state.decimalUsed) {
        return state;
      }
      if (action.digit === '.') {
        return {
          ...state,
          currentOperand: state.currentOperand + action.digit,
          decimalUsed: true,
        };
      }
      return {
        ...state,
        currentOperand:
          state.currentOperand === '0' ? action.digit : state.currentOperand + action.digit,
      };
    case 'EQUALS':
      if (state.operation) {
        const updatedState = calculate(state, '=');
        return {
          ...updatedState,
          waitingForOperand: true,
          newCalculation: true,
        };
      }
      return state;
    default:
      return state;
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {state.previousOperand}
          {state.operation}
        </div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button type="button" onClick={() => dispatch({ type: 'CLEAR' })}>
        AC
      </button>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_SIGN' })}>
        +/-
      </button>
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
