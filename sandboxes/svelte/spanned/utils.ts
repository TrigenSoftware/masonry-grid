export type AspectRatio = [number, number]

const aspectRatios: AspectRatio[] = [
  [1, 1],
  [2, 3],
  [3, 2],
  [16, 9],
  [9, 16],
  [4, 3],
  [3, 4]
]

function getRandomAspectRatio(prevAspectRatio?: AspectRatio) {
  const newAspectRatio =
    aspectRatios[Math.floor(Math.random() * aspectRatios.length)]

  if (newAspectRatio === prevAspectRatio) {
    return getRandomAspectRatio(prevAspectRatio)
  }

  return newAspectRatio
}

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`
}

export function createItems(itemsCount: number) {
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
