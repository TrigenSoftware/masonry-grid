<script lang="ts">
  import BalancedMasonryGrid from '../src/BalancedMasonryGrid.svelte'
  import Frame from '../src/Frame.svelte'

  let {
    gap = 10
  } = $props()
</script>

<BalancedMasonryGrid as="ul" {gap}>
  <Frame as="li" width={1} height={1}>
    Item 1
  </Frame>
  <Frame as="li" width={3} height={2}>
    Item 2
  </Frame>
</BalancedMasonryGrid>
