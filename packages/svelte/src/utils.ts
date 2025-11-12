export function formatUnit(value: string | number | undefined) {
  return value === undefined
    ? ''
    : typeof value === 'number' ? `${value}px` : value
}
