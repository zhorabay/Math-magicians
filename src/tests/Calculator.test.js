import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calculator from '../components/Calculator';

test('Calculator displays 0 initially', () => {
  const { getByTestId } = render(<Calculator />);
  const display = getByTestId('display');
  expect(display).toBeInTheDocument();
});

test('Calculator updates display when buttons are clicked', () => {
  const { getByTestId, getByText } = render(<Calculator />);
  const display = getByTestId('calculator-display');

  fireEvent.click(getByText('1'));
  expect(display).toHaveTextContent('1');

  fireEvent.click(getByText('2'));
  expect(display).toHaveTextContent('12');

  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('3'));
  fireEvent.click(getByText('='));
  expect(display).toHaveTextContent('15');
});
