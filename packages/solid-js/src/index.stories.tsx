import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import { For } from 'solid-js'
import {
  type AspectRatio,
  getRandomAspectRatio,
  getRandomColor
} from '../test/utils.mock.js'
import {
  MasonryGrid,
  BalancedMasonryGrid,
  Frame
} from './index.js'

const meta: Meta = {
  title: 'MasonryGrid',
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

function createItems(itemsCount: number) {
  const items = []
  let aspectRatio: AspectRatio | undefined

  for (let i = 0; i < itemsCount; i++) {
    aspectRatio = getRandomAspectRatio(aspectRatio)

    const backgroundColor = getRandomColor()

    items.push({
      id: i,
      width: aspectRatio[0],
      height: aspectRatio[1],
      style: {
        'background-color': backgroundColor,
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-size': '14px',
        'font-weight': 'bold',
        'color': 'rgba(0, 0, 0, 0.5)'
      }
    })
  }

  return items
}

export const Default: Story = {
  args: {
    itemsCount: 12,
    containerWidth: 100,
    gap: 10,
    frameWidth: 200
  },
  render: (args: any) => (
    <MasonryGrid
      frameWidth={args.frameWidth}
      gap={args.gap}
      style={{
        width: `${args.containerWidth}%`
      }}
    >
      <For each={createItems(args.itemsCount)}>
        {item => (
          <Frame
            width={item.width}
            height={item.height}
            style={item.style}
          >
            {item.id + 1}
          </Frame>
        )}
      </For>
    </MasonryGrid>
  )
}

export const Balanced: Story = {
  args: {
    itemsCount: 12,
    containerWidth: 100,
    gap: 10,
    frameWidth: 200
  },
  render: (args: any) => (
    <BalancedMasonryGrid
      frameWidth={args.frameWidth}
      gap={args.gap}
      style={{
        width: `${args.containerWidth}%`
      }}
    >
      <For each={createItems(args.itemsCount)}>
        {item => (
          <Frame
            width={item.width}
            height={item.height}
            style={item.style}
          >
            {item.id + 1}
          </Frame>
        )}
      </For>
    </BalancedMasonryGrid>
  )
}
