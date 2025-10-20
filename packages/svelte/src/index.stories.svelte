<script lang='ts' module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
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

  const { Story } = defineMeta({
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
  });

  function createItems(count: number) {
    let aspectRatio: AspectRatio

    return Array.from({
      length: count
    }, (_, i) => {
      aspectRatio = getRandomAspectRatio(aspectRatio)

      const backgroundColor = getRandomColor()

      return {
        id: i,
        width: aspectRatio[0],
        height: aspectRatio[1],
        backgroundColor
      }
    })
  }
</script>

<Story name='Default' args={{
  itemsCount: 12,
  containerWidth: 100,
  gap: 10,
  frameWidth: 200
}}>
  {#snippet template({
    itemsCount,
    frameWidth,
    gap,
    containerWidth
  })}
    {@const items = createItems(itemsCount)}
    <MasonryGrid
      {frameWidth}
      {gap}
      style='width: {containerWidth}%'
    >
      {#each items as item (item.id)}
        <Frame
          width={item.width}
          height={item.height}
          style='background-color: {item.backgroundColor}; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: rgba(0, 0, 0, 0.5);'
        >
          {item.id + 1}
        </Frame>
      {/each}
    </MasonryGrid>
  {/snippet}
</Story>

<Story name='Balanced' args={{
  itemsCount: 12,
  containerWidth: 100,
  gap: 10,
  frameWidth: 200
}}>
  {#snippet template({
    itemsCount,
    frameWidth,
    gap,
    containerWidth
  })}
    {@const items = createItems(itemsCount)}
    <BalancedMasonryGrid
      {frameWidth}
      {gap}
      style='width: {containerWidth}%'
    >
      {#each items as item (item.id)}
        <Frame
          width={item.width}
          height={item.height}
          style='background-color: {item.backgroundColor}; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: rgba(0, 0, 0, 0.5);'
        >
          {item.id + 1}
        </Frame>
      {/each}
    </BalancedMasonryGrid>
  {/snippet}
</Story>

