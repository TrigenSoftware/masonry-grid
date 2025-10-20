<script lang="ts">
  import { BalancedMasonryGrid as VanillaBalancedMasonryGrid } from '@masonry-grid/vanilla'
  import BaseMasonryGrid from './BaseMasonryGrid.svelte'
  import type { MasonryGridProps } from './types.js';

  interface Props extends MasonryGridProps {}

  let props: Props = $props()
</script>

<BaseMasonryGrid
  type={VanillaBalancedMasonryGrid}
  {...props}
/>
