import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import {
  DEFAULT_INFINITE_SCROLL_ROOT_MARGIN,
  getScrollableParent,
  isSentinelIntersecting,
} from "../infinite-scroll.utils";

type InfiniteScrollContainerProps = {
  children: ReactNode;
  hasMore: boolean;
  loadingMore?: boolean;
  onLoadMore: () => void;
  root?: Element | null;
  rootRef?: RefObject<Element | null>;
  detectScrollRoot?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
  loader?: ReactNode;
  endMessage?: ReactNode;
  className?: string;
  sentinelClassName?: string;
  disabled?: boolean;
};

const DefaultLoader = () => (
  <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden="true" />
);

const InfiniteScrollContainer = ({
  children,
  hasMore,
  loadingMore = false,
  onLoadMore,
  root = null,
  rootRef,
  detectScrollRoot = true,
  rootMargin = DEFAULT_INFINITE_SCROLL_ROOT_MARGIN,
  threshold = 0,
  loader,
  endMessage,
  className,
  sentinelClassName,
  disabled = false,
}: InfiniteScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onLoadMoreRef = useRef(onLoadMore);
  const isBlockedRef = useRef(false);
  const [scrollRoot, setScrollRoot] = useState<Element | null | undefined>(() => {
    if (rootRef || root !== null) {
      return root;
    }

    return detectScrollRoot ? undefined : null;
  });

  onLoadMoreRef.current = onLoadMore;
  isBlockedRef.current = loadingMore || disabled;

  useEffect(() => {
    if (rootRef || root !== null) {
      setScrollRoot(root);
      return;
    }

    if (!detectScrollRoot) {
      setScrollRoot(null);
      return;
    }

    setScrollRoot(getScrollableParent(containerRef.current));
  }, [detectScrollRoot, root, rootRef]);

  const isScrollRootReady = scrollRoot !== undefined;
  const observerRoot = rootRef ? null : root ?? scrollRoot ?? null;

  const tryLoadMore = () => {
    if (isBlockedRef.current) {
      return;
    }

    onLoadMoreRef.current();
  };

  const sentinelRef = useIntersectionObserver({
    enabled: hasMore && isScrollRootReady,
    root: observerRoot,
    rootRef,
    rootMargin,
    threshold,
    onIntersect: tryLoadMore,
  });

  const prevLoadingMoreRef = useRef(loadingMore);
  const prevDisabledRef = useRef(disabled);

  useEffect(() => {
    const loadingMoreFinished = prevLoadingMoreRef.current && !loadingMore;
    const disabledFinished = prevDisabledRef.current && !disabled;

    prevLoadingMoreRef.current = loadingMore;
    prevDisabledRef.current = disabled;

    if (loadingMore || disabled || !hasMore || (!loadingMoreFinished && !disabledFinished)) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      const sentinel = sentinelRef.current;

      if (!sentinel || isBlockedRef.current) {
        return;
      }

      if (isSentinelIntersecting(sentinel, observerRoot)) {
        onLoadMoreRef.current();
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [disabled, hasMore, loadingMore, observerRoot, sentinelRef]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}

      {hasMore ? (
        <div
          ref={sentinelRef}
          className={cn("flex min-h-8 items-center justify-center py-4", sentinelClassName)}
          aria-hidden="true"
        >
          {loadingMore ? loader ?? <DefaultLoader /> : null}
        </div>
      ) : endMessage ? (
        <div className="py-4 text-center text-sm text-muted-foreground">{endMessage}</div>
      ) : null}
    </div>
  );
};

export default InfiniteScrollContainer;
