<script lang="ts">
  import { masonry } from './action.js'
  import { formatUnit } from './utils.js'
  import type { BaseMasonryGridProps } from './types.js';

  interface Props extends BaseMasonryGridProps {}

  let {
    type,
    disabled,
    as = 'div',
    frameWidth,
    gap,
    style,
    children,
    ...props
  }: Props = $props()

  let containerStyle = $derived.by(() => {
    let styles = 'display: grid; overflow: hidden;'

    if (frameWidth !== undefined) {
      styles += `grid-template-columns: repeat(auto-fill, minmax(${formatUnit(frameWidth)}, 1fr));`
    }

    if (gap !== undefined) {
      styles += `gap: ${formatUnit(gap)};`
    }

    if (style) {
      styles += style
    }

    return styles
  })
</script>

<svelte:element
  this={as}
  use:masonry={{ type, disabled }}
  style={containerStyle}
  {...props}
>
  {@render children?.()}
</svelte:element>
