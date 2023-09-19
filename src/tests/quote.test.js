import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Quote from '../components/Quote';

describe('Quote Component', () => {
  it('renders the loading message initially', async () => {
    render(<Quote />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays a quote', async () => {
    const mockQuote = {
      quote: 'Test quote',
      author: 'Test author',
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => [mockQuote],
    });

    render(<Quote />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.api-ninjas.com/v1/quotes?category=education',
        expect.any(Object),
      );
    });
  });

  it('handles errors when fetching', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce({});

    render(<Quote />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.api-ninjas.com/v1/quotes?category=education',
        expect.any(Object),
      );
    });

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });
});
