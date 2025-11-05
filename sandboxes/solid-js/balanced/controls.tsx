import { createMemo, type Accessor } from 'solid-js'

export interface ControlsData {
  itemsCount: number
  frameWidth: number
  gap: number
  containerWidth: number
}

interface ControlsProps {
  data: Accessor<ControlsData>
  onChange: (data: ControlsData) => void
}

export type AspectRatio = [number, number]

const aspectRatios: AspectRatio[] = [
  [1, 1],
  [2, 3],
  [3, 2]
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

export const defaultControlsData: ControlsData = {
  itemsCount: 35,
  frameWidth: 200,
  gap: 10,
  containerWidth: 100
}

export function useItems(itemsCount: Accessor<number>) {
  return createMemo(() => {
    let aspectRatio: AspectRatio

    return Array.from({
      length: itemsCount()
    }, () => {
      aspectRatio = getRandomAspectRatio(aspectRatio)

      const backgroundColor = getRandomColor()

      return {
        width: aspectRatio[0],
        height: aspectRatio[1],
        backgroundColor
      }
    })
  })
}

export function Controls(props: ControlsProps) {
  const handleChange = (key: keyof ControlsData, value: number) => {
    props.onChange({ ...props.data(), [key]: value })
  }

  return (
    <div class='controls'>
      <div class='control-group'>
        <label for='itemsCount'>Items Count: {props.data().itemsCount}</label>
        <input
          id='itemsCount'
          type='range'
          min='3'
          max='100'
          value={props.data().itemsCount}
          onInput={(e) => handleChange('itemsCount', Number(e.currentTarget.value))}
        />
      </div>

      <div class='control-group'>
        <label for='frameWidth'>Frame Width: {props.data().frameWidth}px</label>
        <input
          id='frameWidth'
          type='range'
          min='50'
          max='300'
          value={props.data().frameWidth}
          onInput={(e) => handleChange('frameWidth', Number(e.currentTarget.value))}
        />
      </div>

      <div class='control-group'>
        <label for='gap'>Gap: {props.data().gap}px</label>
        <input
          id='gap'
          type='range'
          min='0'
          max='40'
          value={props.data().gap}
          onInput={(e) => handleChange('gap', Number(e.currentTarget.value))}
        />
      </div>

      <div class='control-group'>
        <label for='containerWidth'>Container Width: {props.data().containerWidth}%</label>
        <input
          id='containerWidth'
          type='range'
          min='0'
          max='100'
          value={props.data().containerWidth}
          onInput={(e) => handleChange('containerWidth', Number(e.currentTarget.value))}
        />
      </div>
    </div>
  )
}
