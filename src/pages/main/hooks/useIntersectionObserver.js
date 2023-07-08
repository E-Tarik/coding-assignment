import { useEffect, useCallback } from 'react';

let previousY = 0;

const useIntersectionObserver = (elementRef, onIntersect) => {
  const handleObserver = useCallback(
    entries => {
      const [entry] = entries;

      const currentY = entry.boundingClientRect.y;

      if (entry.intersectionRatio === 1 && currentY < previousY) {
        onIntersect();
      }

      previousY = currentY;
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const options = {
      rootMargin: '30%',
    };

    const observer = new IntersectionObserver(handleObserver, options);

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, handleObserver]);
};

export { useIntersectionObserver };
