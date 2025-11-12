/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/preact'
import { useMemo } from 'preact/hooks'
import {
  type AspectRatio,
  getRandomAspectRatio,
  getRandomColor
} from '../test/utils.mock.js'
import {
  RegularMasonryGrid,
  BalancedMasonryGrid,
  Frame,
  SpannedMasonryGrid,
  SpannedFrame
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
      <RegularMasonryGrid
        frameWidth={frameWidth}
        gap={gap}
        style={{
          width: `${containerWidth}%`,
          margin: '0 auto'
        }}
      >
        {items}
      </RegularMasonryGrid>
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
          width: `${containerWidth}%`,
          margin: '0 auto'
        }}
      >
        {items}
      </BalancedMasonryGrid>
    )
  }
}

function useSpannedItems(itemsCount: number) {
  return useMemo(() => {
    let aspectRatio: AspectRatio

    return Array.from({
      length: itemsCount
    }, (_, i) => {
      aspectRatio = getRandomAspectRatio(aspectRatio)

      const backgroudColor = getRandomColor()

      return (
        <SpannedFrame
          key={i}
          width={aspectRatio[0]}
          height={aspectRatio[1]}
          innerStyle={{
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
        </SpannedFrame>
      )
    })
  }, [itemsCount])
}

export const Spanned: Story = {
  args: {
    itemsCount: 12,
    containerWidth: 100,
    gap: 10,
    frameWidth: 200,
    precision: 10
  },
  argTypes: {
    ...meta.argTypes,
    precision: {
      control: {
        type: 'number',
        min: 1,
        max: 100,
        step: 10
      },
      description: 'Span precision for the grid'
    }
  },
  render({
    itemsCount,
    frameWidth,
    gap,
    containerWidth,
    precision
  }: any) {
    const items = useSpannedItems(itemsCount)

    return (
      <SpannedMasonryGrid
        frameWidth={frameWidth}
        gap={gap}
        precision={precision}
        style={{
          width: `${containerWidth}%`,
          margin: '0 auto'
        }}
      >
        {items}
      </SpannedMasonryGrid>
    )
  }
}

