import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BalancedMasonryGrid,
  Frame
} from '@masonry-grid/react'
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
      <h1>Balanced Masonry Grid - React</h1>

      <Controls onChange={setControlsData} data={controlsData} />

      <BalancedMasonryGrid
        className='container'
        gap={controlsData.gap}
        frameWidth={controlsData.frameWidth}
        style={{ width: `${controlsData.containerWidth}%` }}
      >
        {items.map(({ width, height, backgroundColor }, i) => (
          <Frame
            key={id}
            width={width}
            height={height}
            style={{ backgroundColor }}
          >
            {i + 1}
          </Frame>
        ))}
      </BalancedMasonryGrid>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
