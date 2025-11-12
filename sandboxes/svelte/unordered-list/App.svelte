<script lang="ts">
  import { BalancedMasonryGrid as MasonryGrid, Frame } from '@masonry-grid/svelte'
  import Controls from './Controls.svelte'
  import { createItems } from './utils'

  let itemsCount = $state(35)
  let frameWidth = $state(200)
  let gap = $state(10)
  let containerWidth = $state(100)

  let items = $derived(createItems(itemsCount))
</script>

<div class="container">
  <h1>Unordered List Masonry Grid - Svelte</h1>
  <p class="description">
    This example demonstrates using semantic HTML elements (ul/li) with the masonry grid.
  </p>

  <Controls
    bind:itemsCount
    bind:frameWidth
    bind:gap
    bind:containerWidth
  />

  <MasonryGrid
    as="ul"
    class="container masonry-list"
    {gap}
    {frameWidth}
    style="width: {containerWidth}%"
  >
    {#each items as item, i (i)}
      <Frame
        as="li"
        class="frame"
        width={item.width}
        height={item.height}
        style="background-color: {item.backgroundColor}"
      >
        {i + 1}
      </Frame>
    {/each}
  </MasonryGrid>
</div>
