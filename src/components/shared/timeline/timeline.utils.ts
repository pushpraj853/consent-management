import type { ReactNode } from "react";
import { createElement, Fragment } from "react";

export type TimelineTemplateValues = Record<string, string>;

export type ConfigurableTimelineItem = {
  id: string;
  timestamp: string;
  values: TimelineTemplateValues;
  template?: string;
};

export const DEFAULT_TIMELINE_TEMPLATE = "{processor} accessed {dataShared} for {purpose}";

const PLACEHOLDER_PATTERN = /\{([^}]+)\}/g;

const PLACEHOLDER_VALUES = new Set(["N/A", "unspecified purpose"]);

const isPlaceholderValue = (value: string) => PLACEHOLDER_VALUES.has(value);

export const renderTimelineTemplate = (
  template: string,
  values: TimelineTemplateValues,
): ReactNode => {
  const segments: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  PLACEHOLDER_PATTERN.lastIndex = 0;

  while ((match = PLACEHOLDER_PATTERN.exec(template)) !== null) {
    if (match.index > lastIndex) {
      segments.push(template.slice(lastIndex, match.index));
    }

    const key = match[1];
    const value = values[key] ?? key;
    segments.push(
      createElement(
        "span",
        {
          key: `${key}-${match.index}`,
          className: isPlaceholderValue(value)
            ? "text-muted-foreground/70"
            : "font-medium text-foreground",
        },
        value,
      ),
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < template.length) {
    segments.push(template.slice(lastIndex));
  }

  return createElement(Fragment, null, ...segments);
};

export const formatTimelineTimestamp = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
