import { createMemo, createSignal, For } from 'solid-js'
import { render } from 'solid-js/web'
import {
  BalancedMasonryGrid as MasonryGrid,
  Frame
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
  const items = useItems(itemsCount)

  return (
    <div class='container'>
      <h1>Balanced Masonry Grid - SolidJS</h1>

      <Controls data={controlsData} onChange={setControlsData} />

      <MasonryGrid
        class='container'
        gap={gap()}
        frameWidth={frameWidth()}
        style={{ width: `${containerWidth()}%` }}
      >
        <For each={items()}>
          {({ width, height, backgroundColor }, i) => (
            <Frame
              class='frame'
              width={width}
              height={height}
              style={{ 'background-color': backgroundColor }}
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
