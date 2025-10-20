import {
  describe,
  it,
  expect,
  afterEach
} from 'vitest'
import {
  render,
  cleanup
} from '@testing-library/svelte'
import MasonryGrid from './MasonryGrid.svelte'
import Frame from './Frame.svelte'
import MasonryGridWithFrames from '../test/MasonryGridWithFrames.svelte'
import BalancedMasonryGridWithFrames from '../test/BalancedMasonryGridWithFrames.svelte'
import FrameWithChildren from '../test/FrameWithChildren.svelte'

describe('@masonry-grid/svelte', () => {
  afterEach(() => {
    cleanup()
  })

  describe('MasonryGrid', () => {
    it('should render with default div element', () => {
      const { container } = render(MasonryGrid)
      const gridElement = container.querySelector('div')

      expect(gridElement).toBeInTheDocument()
    })

    it('should render with custom element using as prop', () => {
      const { container } = render(MasonryGrid, {
        props: {
          as: 'section'
        }
      })
      const gridElement = container.querySelector('section') as HTMLElement

      expect(gridElement).toBeInTheDocument()
      expect(gridElement.style.display).toBe('grid')
      expect(gridElement.style.overflow).toBe('hidden')
    })

    it('should apply frameWidth prop to grid styles', () => {
      const { container } = render(MasonryGrid, {
        props: {
          frameWidth: 200
        }
      })
      const gridElement = container.querySelector('div[style]') as HTMLDivElement

      expect(gridElement.style.gridTemplateColumns).toBe('repeat(auto-fill, minmax(200px, 1fr))')
    })

    it('should apply frameWidth prop with string value', () => {
      const { container } = render(MasonryGrid, {
        props: {
          frameWidth: '15rem'
        }
      })
      const gridElement = container.querySelector('div[style]') as HTMLDivElement

      expect(gridElement.style.gridTemplateColumns).toBe('repeat(auto-fill, minmax(15rem, 1fr))')
    })

    it('should apply gap prop to grid styles', () => {
      const { container } = render(MasonryGrid, {
        props: {
          gap: 10
        }
      })
      const gridElement = container.querySelector('div') as HTMLDivElement

      expect(gridElement.style.gap).toBe('10px')
    })

    it('should apply gap prop with string value', () => {
      const { container } = render(MasonryGrid, {
        props: {
          gap: '1rem'
        }
      })
      const gridElement = container.querySelector('div') as HTMLDivElement

      expect(gridElement.style.gap).toBe('1rem')
    })

    it('should pass through custom class', () => {
      const { container } = render(MasonryGrid, {
        props: {
          class: 'custom-grid'
        }
      })
      const gridElement = container.querySelector('div')

      expect(gridElement).toHaveClass('custom-grid')
    })

    it('should merge custom styles with default styles', () => {
      const { container } = render(MasonryGrid, {
        props: {
          style: 'background-color: red;'
        }
      })
      const gridElement = container.querySelector('div') as HTMLDivElement

      expect(gridElement.style.display).toBe('grid')
      expect(gridElement.style.overflow).toBe('hidden')
      expect(gridElement.style.backgroundColor).toBe('red')
    })

    it('should not override existing gridTemplateColumns in custom style', () => {
      const { container } = render(MasonryGrid, {
        props: {
          frameWidth: 200,
          style: 'grid-template-columns: repeat(3, 1fr);'
        }
      })
      const gridElement = container.querySelector('div') as HTMLDivElement

      expect(gridElement.style.gridTemplateColumns).toBe('repeat(3, 1fr)')
    })

    it('should not override existing gap in custom style', () => {
      const { container } = render(MasonryGrid, {
        props: {
          gap: 10,
          style: 'gap: 2rem;'
        }
      })
      const gridElement = container.querySelector('div') as HTMLDivElement

      expect(gridElement.style.gap).toBe('2rem')
    })
  })

  describe('BalancedMasonryGrid', () => {
    it('should render with default div element', () => {
      const { container } = render(BalancedMasonryGridWithFrames, {
        props: {
          gap: 10
        }
      })
      const gridElement = container.querySelector('ul')

      expect(gridElement).toBeInTheDocument()
    })

    it('should apply frameWidth and gap props', () => {
      const { container } = render(BalancedMasonryGridWithFrames, {
        props: {
          gap: 15
        }
      })
      const gridElement = container.querySelector('ul') as HTMLElement

      expect(gridElement.style.gap).toBe('15px')
    })
  })

  describe('Frame', () => {
    it('should render with default div element', () => {
      const { container } = render(Frame, {
        props: {
          width: 4,
          height: 3
        }
      })
      const frameElement = container.querySelector('div')

      expect(frameElement).toBeInTheDocument()
    })

    it('should render with custom element using as prop', () => {
      const { container } = render(Frame, {
        props: {
          as: 'li',
          width: 4,
          height: 3
        }
      })
      const frameElement = container.querySelector('li')

      expect(frameElement).toBeInTheDocument()
      expect(container.querySelector('div')).not.toBeInTheDocument()
    })

    it('should set CSS variables for aspect ratio', () => {
      const { container } = render(Frame, {
        props: {
          width: 16,
          height: 9
        }
      })
      const frameElement = container.querySelector('div') as HTMLElement

      expect(frameElement.style.getPropertyValue('--width')).toBe('16')
      expect(frameElement.style.getPropertyValue('--height')).toBe('9')
    })

    it('should set aspect-ratio CSS property', () => {
      const { container } = render(Frame, {
        props: {
          width: 4,
          height: 3
        }
      })
      const frameElement = container.querySelector('div') as HTMLElement

      expect(frameElement.style.aspectRatio).toBe('var(--width) / var(--height)')
    })

    it('should merge custom styles with aspect ratio styles', () => {
      const { container } = render(Frame, {
        props: {
          width: 1,
          height: 1,
          style: 'background-color: blue; padding: 10px;'
        }
      })
      const frameElement = container.querySelector('div') as HTMLElement

      expect(frameElement.style.backgroundColor).toBe('blue')
      expect(frameElement.style.padding).toBe('10px')
      expect(frameElement.style.getPropertyValue('--width')).toBe('1')
      expect(frameElement.style.getPropertyValue('--height')).toBe('1')
    })

    it('should pass through class and other props', () => {
      const { container } = render(Frame, {
        props: {
          'width': 1,
          'height': 1,
          'class': 'frame-item',
          'data-id': 'frame-1'
        }
      })
      const frameElement = container.querySelector('div')

      expect(frameElement).toHaveClass('frame-item')
      expect(frameElement).toHaveAttribute('data-id', 'frame-1')
    })

    it('should render children content', () => {
      const { container } = render(FrameWithChildren, {
        props: {
          width: 1,
          height: 1
        }
      })
      const contentElement = container.querySelector('b')

      expect(contentElement).toBeInTheDocument()
      expect(contentElement?.textContent).toBe('Hello Frame')
    })
  })

  describe('Integration', () => {
    it('should render MasonryGrid with Frame children', () => {
      const { container } = render(MasonryGridWithFrames, {
        props: {
          frameWidth: 200
        }
      })
      const gridElement = container.querySelector('div')
      const frames = container.querySelectorAll('[style*="--width"]')

      expect(gridElement).toBeInTheDocument()
      expect(frames.length).toBe(2)
    })

    it('should work with BalancedMasonryGrid and custom elements', () => {
      const { container } = render(BalancedMasonryGridWithFrames, {
        props: {
          gap: 10
        }
      })
      const gridElement = container.querySelector('ul')
      const frames = container.querySelectorAll('li')

      expect(gridElement).toBeInTheDocument()
      expect(frames.length).toBe(2)
    })
  })
})
