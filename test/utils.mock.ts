type AspectRatio = [number, number]

const aspectRatios: AspectRatio[] = [
  [1, 1],
  [2, 3],
  [3, 2]
]

export function waitForLayout(ms = 200) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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

export function createContainer() {
  const container = document.createElement('div')

  Object.assign(container.style, {
    display: 'grid',
    overflow: 'hidden',
    gridTemplateColumns: 'repeat(auto-fill, minmax(var(--frame-width, 200px), 1fr))',
    gap: 'var(--gap, 10px)',
    width: 'var(--container-width, 100%)'
  })

  return container
}

export function createFrame([w, h]: AspectRatio) {
  const frame = document.createElement('div')

  frame.style.setProperty('--width', String(w))
  frame.style.setProperty('--height', String(h))
  frame.style.aspectRatio = `var(--width) / var(--height)`

  return frame
}

export function createRandomFrames(count: number) {
  let aspectRatio: AspectRatio | undefined
  const frames = Array.from({
    length: count
  }, () => {
    aspectRatio = getRandomAspectRatio(aspectRatio)

    const frame = createFrame(aspectRatio)

    frame.style.backgroundColor = getRandomColor()

    return frame
  })

  return frames
}

export function createFrames(aspectRatios: AspectRatio[]) {
  return aspectRatios.map((ar) => {
    const frame = createFrame(ar)

    frame.style.backgroundColor = getRandomColor()

    return frame
  })
}
