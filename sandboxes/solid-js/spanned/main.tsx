import { createMemo, createSignal, For } from 'solid-js'
import { render } from 'solid-js/web'
import {
  SpannedMasonryGrid as MasonryGrid,
  SpannedFrame as Frame
} from '@masonry-grid/solid-js'
import {
  type ControlsData,
  Controls,
  defaultControlsData,
  useItems
} from './controls'
import './index.css'

function App() {
  const [controlsData, setControlsData] = createSignal<ControlsData>(defaultControlsData)
  const itemsCount = createMemo(() => controlsData().itemsCount)
  const gap = createMemo(() => controlsData().gap)
  const frameWidth = createMemo(() => controlsData().frameWidth)
  const containerWidth = createMemo(() => controlsData().containerWidth)
  const precision = createMemo(() => controlsData().precision)
  const items = useItems(itemsCount)

  return (
    <div class='container'>
      <h1>Spanned Masonry Grid - SolidJS</h1>

      <Controls data={controlsData} onChange={setControlsData} />

      <MasonryGrid
        class='container'
        gap={gap()}
        frameWidth={frameWidth()}
        precision={precision()}
        style={{ width: `${containerWidth()}%` }}
      >
        <For each={items()}>
          {({ width, height, backgroundColor }, i) => (
            <Frame
              class='frame'
              width={width}
              height={height}
              innerStyle={{ 'background-color': backgroundColor }}
            >
              {i() + 1}
            </Frame>
          )}
        </For>
      </MasonryGrid>
    </div>
  )
}

render(() => <App />, document.getElementById('root')!)
