import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach
} from 'vitest'
import { BalancedMasonryGrid } from './BalancedMasonryGrid.js'
import {
  waitForLayout,
  createContainer,
  createFrames,
  createRandomFrames
} from '../test/utils.mock.js'

describe('mason-grid', () => {
  describe('BalancedMasonryGrid', () => {
    let container: HTMLElement
    let grid: BalancedMasonryGrid

    beforeEach(() => {
      container = createContainer()

      document.body.appendChild(container)
    })

    afterEach(() => {
      grid?.destroy()

      if (container.parentElement) {
        document.body.removeChild(container)
      }
    })

    describe('initialization', () => {
      it('should create a BalancedMasonryGrid instance', () => {
        grid = new BalancedMasonryGrid(container)

        expect(grid).toBeInstanceOf(BalancedMasonryGrid)
      })

      it('should add a marker element to the container', () => {
        grid = new BalancedMasonryGrid(container)

        expect(container.children.length).toBe(1)
      })
    })

    describe('layout calculations', () => {
      it('should set container height after reflow', async () => {
        grid = new BalancedMasonryGrid(container)

        container.append(...createRandomFrames(6))

        await waitForLayout()

        const height = parseFloat(container.style.height)

        expect(height).toBeGreaterThan(0)
      })

      it('should apply order property for balancing', async () => {
        grid = new BalancedMasonryGrid(container)

        document.body.style.height = '2000px'

        container.style.width = '800px'

        const frames = createFrames([
          /* eslint-disable */
          [1, 2], [2, 1], [1, 1],
          [1, 1], [1, 2], [1, 1]
          /* eslint-enable */
        ])

        container.append(...frames)

        await waitForLayout()

        const orderedFrames = frames.filter(frame => frame.style.order !== '')

        expect(orderedFrames.length).toBeGreaterThan(0)
      })

      it('should handle single column layout', async () => {
        grid = new BalancedMasonryGrid(container)

        container.style.width = '200px'

        const frames = createRandomFrames(3)

        container.append(...frames)

        await waitForLayout()

        expect(container.style.height).toBe('')
        expect(frames[0].style.transform).toBe('')
        expect(frames[1].style.transform).toBe('')
        expect(frames[2].style.transform).toBe('')
      })

      it('should set marker order correctly', async () => {
        grid = new BalancedMasonryGrid(container)

        container.style.width = '800px'

        container.append(...createRandomFrames(6))

        await waitForLayout()

        const marker = (grid as any).marker
        const markerOrder = marker.style.order

        expect(markerOrder).toBeDefined()
        expect(markerOrder).not.toBe('')
      })
    })

    describe('balancing behavior', () => {
      it('should balance layout to minimize height', async () => {
        grid = new BalancedMasonryGrid(container)

        container.style.width = '700px'

        // Add frames with very different heights to test balancing
        const frames = createFrames([
          [2, 3],
          [1, 1],
          [3, 2],
          [2, 3],
          [1, 1],
          [3, 2]
        ])

        container.append(...frames)

        await waitForLayout()

        const order = frames.map((frame, i) => parseInt(frame.style.order) || i)

        expect(order).toEqual([
          0,
          1,
          2,
          5,
          4,
          3
        ])
      })
    })

    describe('resize handling', () => {
      it('should recalculate layout on container resize', async () => {
        grid = new BalancedMasonryGrid(container)

        const frames = createRandomFrames(12)

        container.append(...frames)

        await waitForLayout()

        const height = container.style.height

        container.style.width = '450px'

        await waitForLayout()

        expect(container.style.height).not.toBe(height)
      })
    })

    describe('destroy', () => {
      it('should remove marker element', () => {
        grid = new BalancedMasonryGrid(container)

        expect(container.children.length).toBe(1)

        grid.destroy()

        expect(container.children.length).toBe(0)
      })

      it('should remove container height', async () => {
        grid = new BalancedMasonryGrid(container)

        const frames = createRandomFrames(12)

        container.append(...frames)

        await waitForLayout()

        grid.destroy()

        expect(container.style.height).toBe('')
      })

      it('should remove transforms and orders from frames', async () => {
        grid = new BalancedMasonryGrid(container)

        container.style.width = '800px'

        const frames = createRandomFrames(12)

        container.append(...frames)

        await waitForLayout()

        grid.destroy()

        frames.forEach((frame) => {
          expect(frame.style.transform).toBe('')
          expect(frame.style.order).toBe('')
        })
      })
    })
  })
})
