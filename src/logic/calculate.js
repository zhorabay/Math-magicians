import Big from 'big.js';

export default function calculate(obj, buttonName) {
  const { currentOperand, previousOperand, operation } = obj;
  let result;

  switch (buttonName) {
    case 'AC':
      return {
        currentOperand: null,
        previousOperand: null,
        operation: null,
      };
    case '+/-':
      if (currentOperand) {
        result = Big(currentOperand).times(-1).toString();
        return {
          currentOperand: result,
          previousOperand,
          operation,
        };
      }
      return obj;
    case '%':
      if (currentOperand) {
        result = Big(currentOperand).div(100).toString();
        return {
          currentOperand: result,
          previousOperand,
          operation,
        };
      }
      return obj;
    case '+':
    case '-':
    case 'x':
    case '÷':
      if (currentOperand && previousOperand) {
        switch (operation) {
          case '+':
            result = Big(previousOperand).plus(currentOperand).toString();
            break;
          case '-':
            result = Big(previousOperand).minus(currentOperand).toString();
            break;
          case 'x':
            result = Big(previousOperand).times(currentOperand).toString();
            break;
          case '÷':
            if (currentOperand === '0') {
              return { ...obj, currentOperand: "Can't divide by 0." };
            }
            result = Big(previousOperand).div(currentOperand).toString();
            break;
          default:
            return obj;
        }
        return {
          currentOperand: result,
          previousOperand: result,
          operation: buttonName,
        };
      }
      if (currentOperand) {
        return {
          currentOperand,
          previousOperand: currentOperand,
          operation: buttonName,
        };
      }
      return obj;
    case '=':
      if (currentOperand && previousOperand && operation) {
        switch (operation) {
          case '+':
            result = Big(previousOperand).plus(currentOperand).toString();
            break;
          case '-':
            result = Big(previousOperand).minus(currentOperand).toString();
            break;
          case 'x':
            result = Big(previousOperand).times(currentOperand).toString();
            break;
          case '÷':
            if (currentOperand === '0') {
              return { ...obj, currentOperand: "Can't divide by 0." };
            }
            result = Big(previousOperand).div(currentOperand).toString();
            break;
          default:
            return obj;
        }
        return {
          currentOperand: result,
          previousOperand: ' ',
          operation: ' ',
        };
      }
      return obj;
    default:
      if (buttonName === '0' && currentOperand === '0') {
        return obj;
      }
      if (operation === '=') {
        return {
          currentOperand: buttonName,
          previousOperand: ' ',
          operation: ' ',
        };
      }
      return {
        currentOperand: currentOperand === '0' ? buttonName : currentOperand + buttonName,
        previousOperand,
        operation,
      };
  }
}
