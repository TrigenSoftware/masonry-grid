import { useState } from 'preact/hooks'
import { render } from 'preact'
import {
  SpannedMasonryGrid as MasonryGrid,
  SpannedFrame as Frame
} from '@masonry-grid/preact'
import {
  type ControlsData,
  Controls,
  defaultControlsData,
  useItems
} from './controls'
import './index.css'

function App() {
  const [controlsData, setControlsData] = useState<ControlsData>(defaultControlsData)
  const items = useItems(controlsData.itemsCount)

  return (
    <div className='container'>
      <h1>Spanned Masonry Grid - Preact</h1>

      <Controls onChange={setControlsData} data={controlsData} />

      <MasonryGrid
        className='container'
        gap={controlsData.gap}
        frameWidth={controlsData.frameWidth}
        precision={controlsData.precision}
        style={{ width: `${controlsData.containerWidth}%` }}
      >
        {items.map(({ width, height, backgroundColor }, i) => (
          <Frame
            key={i}
            width={width}
            height={height}
            className='frame'
            innerStyle={{ backgroundColor }}
          >
            {i + 1}
          </Frame>
        ))}
      </MasonryGrid>
    </div>
  )
}

render(<App />, document.getElementById('root')!)
