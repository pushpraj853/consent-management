import { useEffect, useRef, type RefObject } from "react";

type UseIntersectionObserverOptions = {
  enabled?: boolean;
  root?: Element | null;
  rootRef?: RefObject<Element | null>;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: () => void;
};

const useIntersectionObserver = <T extends Element = HTMLDivElement>({
  enabled = true,
  root = null,
  rootRef,
  rootMargin = "0px",
  threshold = 0,
  onIntersect,
}: UseIntersectionObserverOptions): RefObject<T | null> => {
  const targetRef = useRef<T | null>(null);
  const onIntersectRef = useRef(onIntersect);
  const wasIntersectingRef = useRef(false);

  onIntersectRef.current = onIntersect;

  useEffect(() => {
    wasIntersectingRef.current = false;
  }, [enabled, root, rootRef, rootMargin, threshold]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const target = targetRef.current;

    if (!target) {
      return;
    }

    const observerRoot = rootRef?.current ?? root;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);

        if (isIntersecting && !wasIntersectingRef.current) {
          onIntersectRef.current();
        }

        wasIntersectingRef.current = isIntersecting;
      },
      { root: observerRoot, rootMargin, threshold },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, root, rootRef, rootMargin, threshold]);

  return targetRef;
};

export default useIntersectionObserver;
