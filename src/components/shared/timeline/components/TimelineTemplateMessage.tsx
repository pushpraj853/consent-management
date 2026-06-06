import type { TimelineTemplateValues } from "../timeline.utils";
import { renderTimelineTemplate } from "../timeline.utils";

type TimelineTemplateMessageProps = {
  template: string;
  values: TimelineTemplateValues;
};

const TimelineTemplateMessage = ({
  template,
  values,
}: TimelineTemplateMessageProps) => (
  <span>{renderTimelineTemplate(template, values)}</span>
);

export default TimelineTemplateMessage;
