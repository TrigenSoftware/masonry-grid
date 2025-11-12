<script lang='ts' module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
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
      },
      precision: {
        control: {
          type: 'number',
          min: 1,
          max: 100,
          step: 10
        },
        description: 'Span precision for the grid'
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
    <RegularMasonryGrid
      {frameWidth}
      {gap}
      style='width: {containerWidth}%; margin: 0 auto;'
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
    </RegularMasonryGrid>
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
      style='width: {containerWidth}%; margin: 0 auto;'
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

<Story name='Spanned' args={{
  itemsCount: 12,
  containerWidth: 100,
  gap: 10,
  frameWidth: 200,
  precision: 10
}}>
  {#snippet template({
    itemsCount,
    frameWidth,
    gap,
    containerWidth,
    precision
  })}
    {@const items = createItems(itemsCount)}
    <SpannedMasonryGrid
      {frameWidth}
      {gap}
      {precision}
      style='width: {containerWidth}%; margin: 0 auto;'
    >
      {#each items as item (item.id)}
        <SpannedFrame
          width={item.width}
          height={item.height}
          innerStyle='background-color: {item.backgroundColor}; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; color: rgba(0, 0, 0, 0.5);'
        >
          {item.id + 1}
        </SpannedFrame>
      {/each}
    </SpannedMasonryGrid>
  {/snippet}
</Story>
