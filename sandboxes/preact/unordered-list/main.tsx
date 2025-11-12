import { useState } from 'preact/hooks'
import { render } from 'preact'
import {
  BalancedMasonryGrid as MasonryGrid,
  Frame
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
      <h1>Unordered List Masonry Grid - Preact</h1>
      <p className='description'>
        This example demonstrates using semantic HTML elements (ul/li) with the masonry grid.
      </p>

      <Controls onChange={setControlsData} data={controlsData} />

      <MasonryGrid
        as='ul'
        className='container masonry-list'
        gap={controlsData.gap}
        frameWidth={controlsData.frameWidth}
        style={{ width: `${controlsData.containerWidth}%` }}
      >
        {items.map(({ width, height, backgroundColor }, i) => (
          <Frame
            as='li'
            key={i}
            className='frame'
            width={width}
            height={height}
            style={{ backgroundColor }}
          >
            {i + 1}
          </Frame>
        ))}
      </MasonryGrid>
    </div>
  )
}

render(<App />, document.getElementById('root')!)
