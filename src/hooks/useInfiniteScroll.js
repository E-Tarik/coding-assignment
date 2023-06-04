import { useState, useEffect } from 'react';

export function useInfiniteScroll(elementId) {
  const [page, setPage] = useState(1); // Track the current page number

  useEffect(() => {
    const element = document.getElementById(elementId)

    if(!element) return

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when the element is 50% visible
    };

    // Intersection Observer callback
    const handleObserver = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementId]);

  return { page };
}
