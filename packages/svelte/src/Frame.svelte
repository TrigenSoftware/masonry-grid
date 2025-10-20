<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Custom element tag to use for the frame.
     */
    as?: string
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
    width,
    height,
    style,
    children,
    ...props
  }: Props = $props()

  let containerStyle = $derived.by(() => {
    let styles = `--width: ${width}; --height: ${height}; aspect-ratio: var(--width) / var(--height);`

    if (style) {
      styles += style
    }

    return styles
  })
</script>

<svelte:element
  this={as}
  style={containerStyle}
  {...props}
>
  {@render children?.()}
</svelte:element>
