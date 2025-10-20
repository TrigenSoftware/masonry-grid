<script lang="ts">
  import MasonryGrid from '../src/MasonryGrid.svelte'
  import Frame from '../src/Frame.svelte'

  let {
    frameWidth = 200
  } = $props()
</script>

<MasonryGrid {frameWidth}>
  <Frame width={1} height={1}>
    Item 1
  </Frame>
  <Frame width={2} height={3}>
    Item 2
  </Frame>
</MasonryGrid>
