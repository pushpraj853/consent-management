import { useCallback, useEffect, useRef, useState } from "react";
import { EndpointConfigType } from "@/configs/endpoints";
import { useApiRequest } from "@/hooks";

export type PaginatedPage<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type UseInfiniteScrollOptions = {
  endpointConfig: EndpointConfigType;
  pageSize?: number;
  showErrorToast?: boolean;
};

type UseInfiniteScrollResult<TItem> = {
  items: TItem[];
  hasMore: boolean;
  initialLoading: boolean;
  loadingMore: boolean;
  loadMore: () => void;
};

const useInfiniteScroll = <TItem, TPage extends PaginatedPage<TItem>>({
  endpointConfig,
  pageSize = 20,
  showErrorToast = false,
}: UseInfiniteScrollOptions): UseInfiniteScrollResult<TItem> => {
  const [items, setItems] = useState<TItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageRef = useRef(0);
  const isFetchingRef = useRef(false);

  const { makeApiCall } = useApiRequest<TPage>({
    endpointConfig,
    hitApiOnMount: false,
    showErrorToast,
  });

  const makeApiCallRef = useRef(makeApiCall);
  makeApiCallRef.current = makeApiCall;

  const fetchPage = useCallback(
    async (pageNumber: number, append: boolean) => {
      if (isFetchingRef.current) {
        return;
      }

      isFetchingRef.current = true;

      if (append) {
        setLoadingMore(true);
      } else {
        setInitialLoading(true);
      }

      try {
        const result = await makeApiCallRef.current({
          queryParams: {
            page: pageNumber,
            size: pageSize,
          },
        });

        const pageData = result?.data;

        if (!pageData) {
          return;
        }

        setItems((currentItems) =>
          append ? [...currentItems, ...pageData.content] : pageData.content,
        );
        pageRef.current = pageNumber;
        setHasMore(pageNumber + 1 < pageData.totalPages);
      } catch {
        // Errors are handled inside useApiRequest.
      } finally {
        isFetchingRef.current = false;
        setInitialLoading(false);
        setLoadingMore(false);
      }
    },
    [pageSize],
  );

  useEffect(() => {
    fetchPage(0, false);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingRef.current || initialLoading) {
      return;
    }

    fetchPage(pageRef.current + 1, true);
  }, [fetchPage, hasMore, initialLoading]);

  return { items, hasMore, initialLoading, loadingMore, loadMore };
};

export default useInfiniteScroll;
