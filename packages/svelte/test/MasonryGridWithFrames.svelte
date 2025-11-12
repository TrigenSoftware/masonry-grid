<script lang="ts">
  import RegularMasonryGrid from '../src/RegularMasonryGrid.svelte'
  import Frame from '../src/Frame.svelte'

  let {
    frameWidth = 200
  } = $props()
</script>

<RegularMasonryGrid {frameWidth}>
  <Frame width={1} height={1}>
    Item 1
  </Frame>
  <Frame width={2} height={3}>
    Item 2
  </Frame>
</RegularMasonryGrid>
