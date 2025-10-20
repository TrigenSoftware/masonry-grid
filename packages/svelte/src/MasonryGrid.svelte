<script lang="ts">
  import { MasonryGrid as VanillaMasonryGrid } from '@masonry-grid/vanilla'
  import BaseMasonryGrid from './BaseMasonryGrid.svelte'
  import type { MasonryGridProps } from './types.js';

  interface Props extends MasonryGridProps {}

  let props: Props = $props()
</script>

<BaseMasonryGrid
  type={VanillaMasonryGrid}
  {...props}
/>
