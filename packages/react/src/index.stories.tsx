/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'
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

function useItems(itemsCount: number) {
  return useMemo(() => {
    let aspectRatio: AspectRatio

    return Array.from({
      length: itemsCount
    }, (_, i) => {
      aspectRatio = getRandomAspectRatio(aspectRatio)

      const backgroudColor = getRandomColor()

      return (
        <Frame
          key={i}
          width={aspectRatio[0]}
          height={aspectRatio[1]}
          style={{
            backgroundColor: backgroudColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          {i + 1}
        </Frame>
      )
    })
  }, [itemsCount])
}

export const Default: Story = {
  args: {
    itemsCount: 12,
    containerWidth: 100,
    gap: 10,
    frameWidth: 200
  },
  render({
    itemsCount,
    frameWidth,
    gap,
    containerWidth
  }: any) {
    const items = useItems(itemsCount)

    return (
      <MasonryGrid
        frameWidth={frameWidth}
        gap={gap}
        style={{
          width: `${containerWidth}%`
        }}
      >
        {items}
      </MasonryGrid>
    )
  }
}

export const Balanced: Story = {
  args: {
    itemsCount: 12,
    containerWidth: 100,
    gap: 10,
    frameWidth: 200
  },
  render({
    itemsCount,
    frameWidth,
    gap,
    containerWidth
  }: any) {
    const items = useItems(itemsCount)

    return (
      <BalancedMasonryGrid
        frameWidth={frameWidth}
        gap={gap}
        style={{
          width: `${containerWidth}%`
        }}
      >
        {items}
      </BalancedMasonryGrid>
    )
  }
}
