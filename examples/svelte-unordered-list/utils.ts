export type AspectRatio = [number, number]

const aspectRatios: AspectRatio[] = [
  [1, 1],
  [2, 3],
  [3, 2]
]

export function getRandomAspectRatio(prevAspectRatio?: AspectRatio): AspectRatio {
  const newAspectRatio =
    aspectRatios[Math.floor(Math.random() * aspectRatios.length)]

  if (newAspectRatio === prevAspectRatio) {
    return getRandomAspectRatio(prevAspectRatio)
  }

  return newAspectRatio
}

export function getRandomColor(): string {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`
}

export interface Item {
  width: number
  height: number
  backgroundColor: string
}

export function createItems(itemsCount: number): Item[] {
  let aspectRatio: AspectRatio

  return Array.from({
    length: itemsCount
  }, () => {
    aspectRatio = getRandomAspectRatio(aspectRatio)

    const backgroundColor = getRandomColor()

    return {
      width: aspectRatio[0],
      height: aspectRatio[1],
      backgroundColor
    }
  })
}
