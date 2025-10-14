import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach
} from 'vitest'
import { MasonryGrid } from './MasonryGrid.js'
import {
  waitForLayout,
  createContainer,
  createFrames,
  createRandomFrames
} from '../test/utils.mock.js'

describe('mason-grid', () => {
  describe('MasonryGrid', () => {
    let container: HTMLElement
    let grid: MasonryGrid

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
      it('should create a MasonryGrid instance', () => {
        grid = new MasonryGrid(container)

        expect(grid).toBeInstanceOf(MasonryGrid)
      })

      it('should add a marker element to the container', () => {
        grid = new MasonryGrid(container)

        expect(container.children.length).toBe(1)
      })
    })

    describe('layout calculations', () => {
      it('should set container height after reflow', async () => {
        grid = new MasonryGrid(container)

        container.append(...createRandomFrames(6))

        await waitForLayout()

        const height = parseFloat(container.style.height)

        expect(height).toBeGreaterThan(0)
      })

      it('should apply transform to frames in non-first rows', async () => {
        grid = new MasonryGrid(container)

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

        expect(frames[0].style.transform).toBe('')
        expect(frames[1].style.transform).toBe('')
        expect(frames[2].style.transform).toBe('')

        expect(frames[3].style.transform).toBe('')
        expect(frames[4].style.transform).not.toBe('')
        expect(frames[5].style.transform).not.toBe('')
      })

      it('should handle single column layout', async () => {
        grid = new MasonryGrid(container)

        container.style.width = '200px'

        const frames = createRandomFrames(3)

        container.append(...frames)

        await waitForLayout()

        expect(container.style.height).toBe('')
        expect(frames[0].style.transform).toBe('')
        expect(frames[1].style.transform).toBe('')
        expect(frames[2].style.transform).toBe('')
      })
    })

    describe('resize handling', () => {
      it('should recalculate layout on container resize', async () => {
        grid = new MasonryGrid(container)

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
        grid = new MasonryGrid(container)

        expect(container.children.length).toBe(1)

        grid.destroy()

        expect(container.children.length).toBe(0)
      })

      it('should remove container height', async () => {
        grid = new MasonryGrid(container)

        const frames = createRandomFrames(12)

        container.append(...frames)

        await waitForLayout()

        grid.destroy()

        expect(container.style.height).toBe('')
      })

      it('should remove transforms from frames', async () => {
        grid = new MasonryGrid(container)

        const frames = createRandomFrames(12)

        container.append(...frames)

        await waitForLayout()

        grid.destroy()

        frames.forEach((frame) => {
          expect(frame.style.transform).toBe('')
        })
      })
    })
  })
})
