import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  DEFAULT_BADGE_CLASS,
  DEFAULT_MAX_VISIBLE_BADGES,
} from "../overflow-badges.utils";

type OverflowBadgesProps = {
  items?: readonly string[];
  maxVisible?: number;
  getLabel?: (item: string) => string;
  emptyText?: ReactNode;
  className?: string;
  badgeClassName?: string;
};

const OverflowBadges = ({
  items = [],
  maxVisible = DEFAULT_MAX_VISIBLE_BADGES,
  getLabel = (item) => item,
  emptyText = "—",
  className,
  badgeClassName = DEFAULT_BADGE_CLASS,
}: OverflowBadgesProps) => {
  if (!items.length) {
    return <span className="text-muted-foreground">{emptyText}</span>;
  }

  const visibleItems = items.slice(0, maxVisible);
  const hiddenItems = items.slice(maxVisible);
  const hiddenLabels = hiddenItems.map((item) => getLabel(item)).join(", ");

  const badges = (
    <div className={cn("flex max-w-xs flex-wrap gap-1", className)}>
      {visibleItems.map((item) => (
        <Badge key={item} variant="outline" className={badgeClassName}>
          {getLabel(item)}
        </Badge>
      ))}
      {hiddenItems.length > 0 ? (
        <Badge variant="secondary" className={badgeClassName}>
          +{hiddenItems.length}
        </Badge>
      ) : null}
    </div>
  );

  if (!hiddenItems.length) {
    return badges;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={badges} />
      <TooltipContent className="max-w-xs">{hiddenLabels}</TooltipContent>
    </Tooltip>
  );
};

export default OverflowBadges;
