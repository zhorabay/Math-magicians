import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './Navbar';

test('renders Navbar component correctly', () => {
  const { container } = render(<Navbar />);
  expect(container).toMatchSnapshot();
});

test('contains navigation links', () => {
  const { getByText } = render(<Navbar />);
  const homeLink = getByText('Home');
  const calculatorLink = getByText('Calculator');
  const quoteLink = getByText('Quote');

  expect(homeLink).toBeInTheDocument();
  expect(calculatorLink).toBeInTheDocument();
  expect(quoteLink).toBeInTheDocument();
});