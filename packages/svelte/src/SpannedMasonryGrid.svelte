<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { formatUnit } from './utils.js'

  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Custom element tag to use for the grid.
     */
    as?: string
    /**
     * Style for the inner container element.
     */
    innerStyle?: string
    /**
     * Minimum width of each frame of the grid.
     * If not provided, the grid will auto-fit as many columns as possible.
     */
    frameWidth?: number | string
    /**
     * Grid gap between items.
     */
    gap?: number | string
    /**
     * Precision for span calculation.
     * Affects how accurately frames will maintain their aspect ratios.
     * Higher precision results in more accurate sizes but may impact performance and cause bugs in some browsers.
     */
    precision?: number
    /**
     * Children content.
     */
    children?: Snippet
  }

  const DEFAULT_SPAN_PRECISION = 10

  let {
    as = 'div',
    innerStyle,
    frameWidth,
    gap,
    precision = DEFAULT_SPAN_PRECISION,
    style,
    children,
    ...props
  }: Props = $props()

  let containerStyle = $derived.by(() => {
    let styles = `--frame-width: ${formatUnit(frameWidth)}; --gap: ${formatUnit(gap)}; --precision: ${precision};`

    if (style) {
      styles += style
    }

    return styles
  })

  let innerContainerStyle = $derived.by(() => {
    let styles = 'display: grid; clip-path: margin-box; margin: calc(-1 * var(--gap, 0) / 2); grid-template-columns: repeat(auto-fill, minmax(var(--frame-width), 1fr));'

    if (innerStyle) {
      styles += innerStyle
    }

    return styles
  })
</script>

<svelte:element
  this={as}
  style={containerStyle}
  {...props}
>
  <div style={innerContainerStyle}>
    {@render children?.()}
  </div>
</svelte:element>
