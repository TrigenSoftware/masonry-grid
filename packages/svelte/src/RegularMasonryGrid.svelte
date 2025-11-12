<script lang="ts">
  import { RegularMasonryGrid as VanillaRegularMasonryGrid } from '@masonry-grid/vanilla'
  import BaseMasonryGrid from './BaseMasonryGrid.svelte'
  import type { MasonryGridProps } from './types.js';

  interface Props extends MasonryGridProps {}

  let props: Props = $props()
</script>

<BaseMasonryGrid
  type={VanillaRegularMasonryGrid}
  {...props}
/>
