import { InfiniteScrollContainer, useInfiniteScroll } from "@/components/shared/infinite-scroll";
import { AUDIT_TRAIL_ENDPOINT } from "@/configs/endpoints";
import { AuditEventType, AuditTrailPageType } from "@/types";
import { AuditTrails } from "../components";

const AuditTrailsContainer = () => {
  const { items, hasMore, initialLoading, loadingMore, loadMore } = useInfiniteScroll<
    AuditEventType,
    AuditTrailPageType
  >({
    endpointConfig: AUDIT_TRAIL_ENDPOINT,
  });

  return (
    <InfiniteScrollContainer
      hasMore={hasMore}
      loadingMore={loadingMore}
      onLoadMore={loadMore}
      disabled={initialLoading}
    >
      <AuditTrails loading={initialLoading} events={items} />
    </InfiniteScrollContainer>
  );
};

export default AuditTrailsContainer;
