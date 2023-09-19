import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TestWrapper = () => (
  <Router>
    <Navbar />
  </Router>
);

describe('Navbar', () => {
  it('contains navigation links', () => {
    render(<TestWrapper />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent('Home');

    const calculatorLink = screen.getByRole('link', { name: /calculator/i });
    expect(calculatorLink).toHaveAttribute('href', '/calculator');
    expect(calculatorLink).toHaveTextContent('Calculator');

    const quoteLink = screen.getByRole('link', { name: /quote/i });
    expect(quoteLink).toHaveAttribute('href', '/quote');
    expect(quoteLink).toHaveTextContent('Quote');
  });
});
