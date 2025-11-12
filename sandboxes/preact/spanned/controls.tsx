import { useMemo } from 'preact/hooks'

export interface ControlsData {
  itemsCount: number
  frameWidth: number
  gap: number
  containerWidth: number
  precision: number
}

interface ControlsProps {
  data: ControlsData
  onChange: (data: ControlsData) => void
}

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

export const defaultControlsData: ControlsData = {
  itemsCount: 35,
  frameWidth: 200,
  gap: 10,
  containerWidth: 100,
  precision: 10
}

export function useItems(itemsCount: number) {
  return useMemo(() => {
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
  }, [itemsCount])
}

export function Controls({ data, onChange }: ControlsProps) {
  const handleChange = (key: keyof ControlsData, value: number) => {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className='controls'>
      <div className='control-group'>
        <label htmlFor='itemsCount'>Items Count: {data.itemsCount}</label>
        <input
          id='itemsCount'
          type='range'
          min='3'
          max='100'
          value={data.itemsCount}
          onChange={(e) => handleChange('itemsCount', Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div className='control-group'>
        <label htmlFor='frameWidth'>Frame Width: {data.frameWidth}px</label>
        <input
          id='frameWidth'
          type='range'
          min='50'
          max='300'
          value={data.frameWidth}
          onChange={(e) => handleChange('frameWidth', Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div className='control-group'>
        <label htmlFor='gap'>Gap: {data.gap}px</label>
        <input
          id='gap'
          type='range'
          min='0'
          max='40'
          value={data.gap}
          onChange={(e) => handleChange('gap', Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div className='control-group'>
        <label htmlFor='containerWidth'>Container Width: {data.containerWidth}%</label>
        <input
          id='containerWidth'
          type='range'
          min='0'
          max='100'
          value={data.containerWidth}
          onChange={(e) => handleChange('containerWidth', Number((e.target as HTMLInputElement).value))}
        />
      </div>

      <div className='control-group'>
        <label htmlFor='precision'>Precision: {data.precision}</label>
        <input
          id='precision'
          type='range'
          min='10'
          max='100'
          step='10'
          value={data.precision}
          onChange={(e) => handleChange('precision', Number((e.target as HTMLInputElement).value))}
        />
      </div>
    </div>
  )
}
