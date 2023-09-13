import { evaluate } from './operate';
import ACTIONS from './actions';

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.MAKE_NEGATIVE:
      if (state.currentOperand !== null) {
        const newOperand = parseFloat(state.currentOperand) * -1;
        return {
          ...state,
          currentOperand: newOperand.toString(),
        };
      }
      return state;

    case ACTIONS.GIVE_PERCENTAGE:
      if (state.currentOperand !== null) {
        const newOperand = (parseFloat(state.currentOperand) / 100).toString();
        return {
          ...state,
          currentOperand: newOperand,
        };
      }
      return state;

    case ACTIONS.EVALUATE:
      if (
        state.operation == null
        || state.currentOperand == null
        || state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
}

export default reducer;
