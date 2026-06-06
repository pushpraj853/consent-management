export const DEFAULT_MAX_VISIBLE_BADGES = 5;

export const DEFAULT_BADGE_CLASS = "h-4 px-1.5 py-0 text-[0.7rem]";

export const formatHumanizedKey = (value: string) =>
  value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
