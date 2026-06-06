export const DEFAULT_INFINITE_SCROLL_ROOT_MARGIN = "200px";

export const getScrollableParent = (element: HTMLElement | null): Element | null => {
  if (!element) {
    return null;
  }

  let parent = element.parentElement;

  while (parent) {
    const { overflowY } = getComputedStyle(parent);

    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      return parent;
    }

    parent = parent.parentElement;
  }

  return null;
};

export const isSentinelIntersecting = (sentinel: Element, root: Element | null): boolean => {
  const sentinelRect = sentinel.getBoundingClientRect();

  if (!root) {
    return sentinelRect.top < window.innerHeight && sentinelRect.bottom > 0;
  }

  const rootRect = root.getBoundingClientRect();

  return sentinelRect.top < rootRect.bottom && sentinelRect.bottom > rootRect.top;
};
