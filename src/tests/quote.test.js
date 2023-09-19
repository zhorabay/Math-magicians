import React from 'react';
import { render} from '@testing-library/react';
import Quote from '../components/Quote';


test('renders Quote component correctly', () => {
  const { container } = render(<Quote />);
  expect(container).toMatchSnapshot();
});

test('displays loading text when isLoading is true', () => {
  const { getByText } = render(<Quote isLoading={true} />);
  const loadingText = getByText('Loading...');
  expect(loadingText).toBeInTheDocument();
});

test('displays error message when hasError is true', () => {
  const { getByText } = render(<Quote hasError={true} />);
  const errorMessage = getByText('Something went wrong!');
  expect(errorMessage).toBeInTheDocument();
});

test('displays quote and author when data is available', () => {
  const quoteData = {
    quote: 'Test Quote',
    author: 'Test Author',
  };
  const { getByText } = render(<Quote quote={quoteData} />);
  const quoteText = getByText('Test Quote');
  const authorText = getByText('- Test Author');
  expect(quoteText).toBeInTheDocument();
  expect(authorText).toBeInTheDocument();
});
