import PropTypes from 'prop-types';
import ACTIONS from './actions';

export function OperationButton({ dispatch, operation, className }) {
  return (
    <button
      type="button"
      className={`operation-button ${className}`}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation}
    </button>
  );
}

OperationButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  operation: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export function ToggleSignButton({ dispatch }) {
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: ACTIONS.MAKE_NEGATIVE })}
    >
      +/-
    </button>
  );
}

ToggleSignButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export function PercentageButton({ dispatch }) {
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: ACTIONS.GIVE_PERCENTAGE })}
    >
      %
    </button>
  );
}

PercentageButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export function DigitButton({ dispatch, digit, className }) {
  return (
    <button
      type="button"
      className={`digit-button ${className}`}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

DigitButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  digit: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (Number.isNaN(prev) || Number.isNaN(current)) return '';
  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case 'x':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
    default:
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

export function formatOperand(operand) {
  if (operand == null) return undefined;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
