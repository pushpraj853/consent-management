import { ConfigurableTimeline } from "@/components/shared/timeline";
import { AuditEventType } from "@/types";
import {
  AUDIT_TIMELINE_TEMPLATE,
  mapAuditEventToTimelineItem,
} from "../audit-trails.utils";
import AuditTrailsSkeleton from "./AuditTrailsSkeleton";

type AuditTrailsProps = {
  loading: boolean;
  events: AuditEventType[];
};

const AuditTrails = ({ loading, events }: AuditTrailsProps) => {
  const timelineItems = events.map(mapAuditEventToTimelineItem);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-xl font-medium">Audit Trails</h1>
          <p className="text-sm text-muted-foreground">
            A chronological record of consent and data access activity.
          </p>
        </div>
        {!loading && timelineItems.length > 0 ? (
          <p className="text-xs font-medium text-muted-foreground">
            {timelineItems.length} event{timelineItems.length !== 1 ? "s" : ""}
          </p>
        ) : null}
      </div>

      {loading ? (
        <AuditTrailsSkeleton />
      ) : (
        <ConfigurableTimeline
          items={timelineItems}
          template={AUDIT_TIMELINE_TEMPLATE}
          emptyMessage="No audit events yet"
          emptyDescription="When your data is accessed or consent changes, it will appear here."
        />
      )}
    </div>
  );
};

export default AuditTrails;
