<script lang="ts">
  import { SpannedMasonryGrid as MasonryGrid, SpannedFrame as Frame } from '@masonry-grid/svelte'
  import Controls from './Controls.svelte'
  import { createItems } from './utils'

  let itemsCount = $state(35)
  let frameWidth = $state(200)
  let gap = $state(10)
  let containerWidth = $state(100)
  let precision = $state(10)

  let items = $derived(createItems(itemsCount))
</script>

<div class="container">
  <h1>Spanned Masonry Grid - Svelte</h1>

  <Controls
    bind:itemsCount
    bind:frameWidth
    bind:gap
    bind:containerWidth
    bind:precision
  />

  <MasonryGrid
    class="container"
    {gap}
    {frameWidth}
    {precision}
    style="width: {containerWidth}%"
  >
    {#each items as item, i (i)}
      <Frame
        class="frame"
        width={item.width}
        height={item.height}
        innerStyle="background-color: {item.backgroundColor}"
      >
        {i + 1}
      </Frame>
    {/each}
  </MasonryGrid>
</div>
