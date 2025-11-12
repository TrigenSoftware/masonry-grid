<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Custom element tag to use for the frame.
     */
    as?: string
    /**
     * Style for the inner container element.
     */
    innerStyle?: string
    /**
     * Width of the frame.
     * Not necessarily real width, but used for aspect ratio calculation.
     */
    width: number
    /**
     * Height of the frame.
     * Not necessarily real height, but used for aspect ratio calculation.
     */
    height: number
    /**
     * Children content.
     */
    children?: Snippet
  }

  let {
    as = 'div',
    innerStyle,
    width,
    height,
    style,
    children,
    ...props
  }: Props = $props()

  let containerStyle = $derived.by(() => {
    let styles = `--width: ${width}; --height: ${height}; aspect-ratio: var(--width) / var(--height); width: 100%; height: 100%; position: relative; grid-row: span calc(var(--height) / var(--width) * var(--percision));`

    if (style) {
      styles += style
    }

    return styles
  })

  let innerContainerStyle = $derived.by(() => {
    let styles = 'position: absolute; inset: calc(var(--gap, 0) / 2);'

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
