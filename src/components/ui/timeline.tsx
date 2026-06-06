import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const timelineDotVariants = cva(
  "relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full border-2 bg-background",
  {
    variants: {
      variant: {
        default: "border-primary",
        muted: "border-muted-foreground/40",
        success: "border-green-600 dark:border-green-500",
        warning: "border-amber-600 dark:border-amber-500",
        destructive: "border-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      role="list"
      data-slot="timeline"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function TimelineItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      role="listitem"
      data-slot="timeline-item"
      className={cn("relative flex gap-4 pb-8 last:pb-0", className)}
      {...props}
    />
  );
}

function TimelineSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-separator"
      aria-hidden="true"
      className={cn(
        "absolute top-5 left-[4.5px] h-[calc(100%-8px)] w-px bg-border",
        className,
      )}
      {...props}
    />
  );
}

function TimelineDot({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof timelineDotVariants>) {
  return (
    <div
      data-slot="timeline-dot"
      className={cn(timelineDotVariants({ variant }), className)}
      {...props}
    />
  );
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-1 pt-0.5", className)}
      {...props}
    />
  );
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-title"
      className={cn("text-sm leading-snug text-foreground", className)}
      {...props}
    />
  );
}

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineTime,
  TimelineTitle,
  timelineDotVariants,
};
