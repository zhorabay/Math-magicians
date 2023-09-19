import operate from '../logic/operate';

describe('operate function', () => {
  it('should add two numbers', () => {
    expect(operate('2', '3', '+')).toBe('5');
  });

  it('should subtract two numbers', () => {
    expect(operate('5', '3', '-')).toBe('2');
  });

  it('should multiply two numbers', () => {
    expect(operate('2', '3', 'x')).toBe('6');
  });

  it('should divide two numbers', () => {
    expect(operate('6', '2', '÷')).toBe('3');
  });

  it('should handle division by zero', () => {
    expect(operate('5', '0', '÷')).toBe("Can't divide by 0.");
  });

  it('should find modulo', () => {
    expect(operate('10', '3', '%')).toBe('1');
  });

  it('should handle modulo with division by zero', () => {
    expect(operate('5', '0', '%')).toBe("Can't find modulo as can't divide by 0.");
  });

  it('should throw an error for unknown operation', () => {
    expect(() => operate('2', '3', '#')).toThrow("Unknown operation '#'");
  });
});
