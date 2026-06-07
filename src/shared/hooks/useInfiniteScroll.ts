import { useEffect, useRef } from "react";

/*
  Attaches an IntersectionObserver to a sentinel element.
  Calls `onIntersect` whenever the sentinel enters the viewport,
  which triggers loading the next page.
*/
export function useInfiniteScroll(
  onIntersect: () => void,
  enabled: boolean,
): React.RefObject<HTMLDivElement | null> {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: '200px' },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [onIntersect, enabled]);

  return sentinelRef;
}
