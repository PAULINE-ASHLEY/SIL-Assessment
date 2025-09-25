import { useState, useEffect } from 'react';

// Custom hook for handling data fetching with loading and error states
export default function useFetch(fetchFunction) {
  const [data, setData] = useState(null); // Stores the fetched data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores any error messages

  // useEffect hook to handle the data fetching lifecycle
  useEffect(() => {
    let isMounted = true;

    // Async function to perform the data fetch
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        if (!isMounted) return;
        setData(result);
      } catch (err) {
        if (!isMounted) return;

        setError(err.message || 'Error fetching data');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction]);

  return { data, loading, error };
}
