import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DEFAULT_TIMELINE_TEMPLATE,
  formatTimelineTimestamp,
  type ConfigurableTimelineItem,
} from "../timeline.utils";
import TimelineTemplateMessage from "./TimelineTemplateMessage";

type ConfigurableTimelineProps = {
  items: ConfigurableTimelineItem[];
  template?: string;
  emptyMessage?: string;
  emptyDescription?: string;
  formatTimestamp?: (value: string) => string;
  className?: string;
};

const ConfigurableTimeline = ({
  items,
  template = DEFAULT_TIMELINE_TEMPLATE,
  emptyMessage = "No events yet",
  emptyDescription = "Activity will appear here when something happens.",
  formatTimestamp = formatTimelineTimestamp,
  className,
}: ConfigurableTimelineProps) => {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">{emptyMessage}</p>
        <p className="mt-1 text-sm text-muted-foreground">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <Card className={cn("[--card-spacing:--spacing(0)]", className)}>
      <CardContent className="px-0 pb-0 pt-2">
        <Timeline>
          {items.map((item, index) => {
            const itemTemplate = item.template ?? template;
            const isLast = index === items.length - 1;

            return (
              <TimelineItem key={item.id} className="pb-0">
                <div className="flex w-full gap-5 px-6 transition-colors hover:bg-muted/40">
                  <div className="relative flex w-3 shrink-0 flex-col items-center self-stretch pt-4">
                    {!isLast ? (
                      <TimelineSeparator className="top-9 left-1/2 h-[calc(100%-1rem)] -translate-x-1/2" />
                    ) : null}

                    <TimelineDot className="relative z-10 mt-1.5 size-3 border-primary bg-primary/10 shadow-sm" />
                  </div>

                  <TimelineContent
                    className={cn(
                      "min-w-0 flex-1 gap-2 pt-4",
                      !isLast && "border-b border-border/50 pb-4",
                      isLast && "pb-4",
                    )}
                  >
                    <TimelineTime
                      dateTime={item.timestamp}
                      className="inline-flex w-fit rounded-md bg-muted/70 px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase"
                    >
                      {formatTimestamp(item.timestamp)}
                    </TimelineTime>
                    <TimelineTitle className="text-sm leading-relaxed text-muted-foreground">
                      <TimelineTemplateMessage
                        template={itemTemplate}
                        values={item.values}
                      />
                    </TimelineTitle>
                  </TimelineContent>
                </div>
              </TimelineItem>
            );
          })}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default ConfigurableTimeline;
