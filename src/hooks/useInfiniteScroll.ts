import type { RefObject } from "react";
import { useCallback, useEffect } from "react";

type UseInfiniteScrollProps = {
  ref: RefObject<HTMLDivElement | null>;
  loadMoreFn?: () => void;
};

const opts = {
  root: null,
  rootMargin: "200px",
  threshold: 1,
};

const useInfiniteScroll = ({ ref, loadMoreFn }: UseInfiniteScrollProps) => {
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) loadMoreFn?.();
    },
    [loadMoreFn]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, opts);
    const observedRef = ref.current;

    if (observedRef) observer.observe(observedRef);

    return () => {
      if (observedRef) observer.unobserve(observedRef);
    };
  }, [ref, handleIntersection]);
};

export default useInfiniteScroll;
