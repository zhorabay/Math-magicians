import './Calculator.css';
import { useReducer } from 'react';
import reducer from '../logic/calculate';
import {
  OperationButton, ToggleSignButton, PercentageButton, DigitButton, formatOperand,
} from '../logic/operate';
import ACTIONS from '../logic/actions';

function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)}
          {' '}
          {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button type="button" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <ToggleSignButton dispatch={dispatch} />
      <PercentageButton dispatch={dispatch} />
      <OperationButton className="symbol-bg" operation="÷" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton className="symbol-bg" operation="x" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton className="symbol-bg" operation="-" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton className="symbol-bg" operation="+" dispatch={dispatch} />
      <DigitButton className="span-two" digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button type="button" className="symbol-bg" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default Calculator;
