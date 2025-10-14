import type { Meta, StoryObj } from '@storybook/html'
import {
  createContainer,
  createRandomFrames
} from '../test/utils.mock.js'
import { BalancedMasonryGrid } from './BalancedMasonryGrid.js'

const meta: Meta = {
  title: 'BalancedMasonryGrid',
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    itemsCount: {
      control: {
        type: 'range',
        min: 3,
        max: 100,
        step: 1
      },
      description: 'Number of items in the grid'
    },
    containerWidth: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 5
      },
      description: 'Width of the container'
    },
    gap: {
      control: {
        type: 'range',
        min: 0,
        max: 40,
        step: 5
      },
      description: 'Gap between items'
    },
    frameWidth: {
      control: {
        type: 'number',
        min: 50,
        max: 300,
        step: 10
      },
      description: 'Width of each item'
    }
  }
}

export default meta

type Story = StoryObj

function createGrid() {
  const container = createContainer()
  let grid: BalancedMasonryGrid | undefined

  return (args: any) => {
    if (!grid) {
      void Promise.resolve().then(() => {
        grid = new BalancedMasonryGrid(container)
      })
    }

    container.style.setProperty('--container-width', `${args.containerWidth}%`)
    container.style.setProperty('--gap', `${args.gap}px`)
    container.style.setProperty('--frame-width', `${args.frameWidth}px`)

    const currentItemsCount = Math.max(0, container.children.length - 1)

    if (currentItemsCount !== args.itemsCount) {
      if (currentItemsCount < args.itemsCount) {
        const toAdd = args.itemsCount - currentItemsCount
        const frames = createRandomFrames(toAdd)

        container.append(...frames)
      } else {
        const toRemove = currentItemsCount - args.itemsCount

        for (let i = 0; i < toRemove; i++) {
          const frame = container.children[container.children.length - 2]

          if (frame) {
            container.removeChild(frame)
          }
        }
      }
    }

    return container
  }
}

export const Default: Story = {
  args: {
    itemsCount: 12,
    containerWidth: 100,
    gap: 10,
    frameWidth: 200
  },
  render: createGrid()
}
