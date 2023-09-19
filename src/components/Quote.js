import './style.css';
import React, { useState, useEffect } from 'react';

function Quote() {
  const [quote, setQuote] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      const category = 'education';
      const apiKey = 'f43KyTOqfaUkfa3a36GGcsjbsNvlENjE2mpBHy7M';
      setIsLoading(true);
      fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.length > 0) {
            setQuote(json[0]);
          } else {
            setHasError(true);
          }
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, [setQuote, setIsLoading]);

  if (hasError) return <div>Something went wrong!</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="quote-flex">
      <h3 className="quote">
        {quote.quote}
        <span className="quote-author">
          -
          {quote.author}
        </span>
      </h3>
    </div>
  );
}

export default Quote;
