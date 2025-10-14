export function getEntryWidth(
  entries: ResizeObserverEntry[],
  element: HTMLElement,
  fallback: number
): number {
  if (entries.length > 0) {
    if (entries[0].target === element) {
      return entries[0].contentRect.width
    }

    if (entries.length === 2) {
      if (entries[1].target === element) {
        return entries[1].contentRect.width
      }
    }
  }

  return fallback
}
