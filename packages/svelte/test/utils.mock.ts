export type AspectRatio = [number, number]

const aspectRatios: AspectRatio[] = [
  [1, 1],
  [2, 3],
  [3, 2]
]

export function getRandomAspectRatio(prevAspectRatio?: AspectRatio) {
  const newAspectRatio =
    aspectRatios[Math.floor(Math.random() * aspectRatios.length)]

  if (newAspectRatio === prevAspectRatio) {
    return getRandomAspectRatio(prevAspectRatio)
  }

  return newAspectRatio
}

export function getRandomColor() {
  return `hsl(${Math.floor(
    Math.random() * 360
  )}, 100%, 75%)`
}
