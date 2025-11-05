export function formatUnit(value: string | number | undefined) {
  return value === undefined
    ? value
    : typeof value === 'number' ? `${value}px` : value
}
