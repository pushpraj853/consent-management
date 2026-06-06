import {
  DEFAULT_TIMELINE_TEMPLATE,
  type ConfigurableTimelineItem,
} from "@/components/shared/timeline";
import { AuditEventMetadataType, AuditEventType } from "@/types";

export const AUDIT_TIMELINE_TEMPLATE = DEFAULT_TIMELINE_TEMPLATE;

export const parseAuditMetadata = (
  metadata: AuditEventMetadataType | string,
): AuditEventMetadataType => {
  if (typeof metadata === "string") {
    try {
      return JSON.parse(metadata) as AuditEventMetadataType;
    } catch {
      return {};
    }
  }

  return metadata ?? {};
};

export const mapAuditEventToTimelineItem = (event: AuditEventType): ConfigurableTimelineItem => {
  const metadata = parseAuditMetadata(event.metadata);

  return {
    id: event.auditId,
    timestamp: event.createdAt,
    values: {
      processor: metadata.processor ?? "N/A",
      dataShared: metadata.dataShared?.join(", ") ?? "N/A",
      purpose: metadata.accessReason ?? metadata.purpose ?? "unspecified purpose",
    },
  };
};
