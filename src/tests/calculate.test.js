import calculate from '../logic/calculate';

jest.mock('../logic/operate', () => ({
  __esModule: true,
  default: (total, next, operation) => {
    if (operation === '+') return (parseFloat(total) + parseFloat(next)).toString();
    if (operation === '-') return (parseFloat(total) - parseFloat(next)).toString();
    if (operation === '×') return (parseFloat(total) * parseFloat(next)).toString();
    if (operation === '÷') return (parseFloat(total) / parseFloat(next)).toString();
    return '0';
  },
}));

describe('calculate', () => {
  test('should clear the calculator when "AC" button is pressed', () => {
    const result = calculate({ total: '10', next: '5', operation: '+' }, 'AC');
    expect(result).toEqual({
      total: null,
      next: null,
      operation: null,
    });
  });

  test('should update calculator state correctly when numeric buttons are pressed', () => {
    const result1 = calculate({ total: '10', next: '5', operation: '+' }, '2');
    expect(result1).toEqual({ total: '10', next: '52', operation: '+' });

    const result2 = calculate({ total: '0', next: '0', operation: null }, '0');
    expect(result2).toEqual({});
  });

  test('should handle the "=" button correctly', () => {
    const result = calculate({ total: '10', next: '5', operation: '+' }, '=');
    expect(result).toEqual({ total: '15', next: null, operation: null });
  });

  test('should handle the "+/-" button correctly', () => {
    const result1 = calculate({ total: '10', next: '5', operation: '+' }, '+/-');
    expect(result1).toEqual({ total: '10', next: '-5', operation: '+' });

    const result2 = calculate({ total: null, next: '5', operation: null }, '+/-');
    expect(result2).toEqual({ total: null, next: '-5', operation: null });
  });
});
