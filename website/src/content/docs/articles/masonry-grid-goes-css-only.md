---
title: "Masonry Grid Goes CSS-Only: An Experimental Approach"
description: A new experimental approach to masonry layouts using CSS Grid's grid-row span property. Pure CSS, perfect for SSR, but with trade-offs.
sidebar:
  hidden: true
head:
  - tag: meta
    attrs:
      property: og:image
      content: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/frc1qxx2g8gzaaw3iv5m.png
  - tag: meta
    attrs:
      name: twitter:image:src
      content: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/frc1qxx2g8gzaaw3iv5m.png
---

I recently published an [article](https://masonry-grid.js.org/articles/masonry-grid-a-14-kb-library-that-actually-works/) about Masonry Grid, and here I am again with another post. What happened?

Well, something interesting popped up in the Reddit comments.

## A CSS Trick from the Comments

After sharing the initial release, [Zardoz84](https://www.reddit.com/user/Zardoz84/) in the comments linked to [a clever CSS-only masonry example](https://codepen.io/zardoz89/pen/KKVEGbw). The example used a neat trick with `grid-row: span X` to create a masonry effect without any JavaScript.

The original example was hand-tuned for specific content, but the technique itself caught my attention. Could this approach work with dynamic content?

## Adapting the Span Trick

The core idea is simple:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.item {
  aspect-ratio: var(--width) / var(--height);
  grid-row: span calc(var(--height) / var(--width) * var(--precision));
}
```

The trick is elegant: each item maintains its aspect ratio with CSS `aspect-ratio`, then spans multiple grid rows based on that ratio. The `precision` parameter acts as a multiplier - the higher the value, the more accurately the aspect ratio is maintained.

I adapted this technique to work with dynamic content and aspect ratios, and that's how `SpannedMasonryGrid` was born:

```tsx
import { SpannedMasonryGrid as MasonryGrid, SpannedFrame as Frame } from '@masonry-grid/react'

<MasonryGrid
  frameWidth={200}
  gap={10}
  precision={10} // Controls aspect-ratio accuracy
>
  <Frame width={16} height={9}>
    <img src="photo1.jpg" />
  </Frame>
  <Frame width={3} height={2}>
    <img src="photo2.jpg" />
  </Frame>
  {/* More frames... */}
</MasonryGrid>
```

## The Obvious Advantages

**No JavaScript Required**

The layout is pure CSS. Once the HTML is rendered, the browser handles everything. No observers, no reflow calculations, no JavaScript at all.

**Perfect SSR Compatibility**

Since the layout is determined entirely by CSS, there's no client-side recalculation after hydration. What the server renders is what the user sees - no layout shifts, no flicker.

## The Trade-offs

But it's not all perfect. There are some notable limitations:

**Aspect Ratio Imprecision**

Due to how `grid-row: span` works with fractional values, frames can't maintain their aspect ratios with 100% accuracy.

The `precision` parameter (default: 10) lets you control this:

- **Lower precision (~10)**: Less accurate aspect ratios, but very stable
- **Higher precision (>=100)**: More accurate sizes, but potential for visual bugs in some browsers with many items

**Gap Workaround Required**

CSS Grid's native `gap` property can't be used with this technique - it would break the span calculations. Instead, we use negative margins and padding:

```css
.grid {
  margin: calc(-1 * var(--gap) / 2);
}

.frame > div {
  inset: calc(var(--gap) / 2);
}
```

It works, but it's a workaround, not a clean solution.

## Conclusion

This is an **experimental** approach - it has trade-offs, and the classic `BalancedMasonryGrid` and `RegularMasonryGrid` remain the safer options for most cases. But if the CSS-only nature fits your needs, give it a try!

Check out the interactive examples:

- [React](https://masonry-grid.js.org/examples/react-spanned/)
- [Preact](https://masonry-grid.js.org/examples/preact-spanned/)
- [Svelte](https://masonry-grid.js.org/examples/svelte-spanned/)
- [SolidJS](https://masonry-grid.js.org/examples/solid-spanned/)

Play with the precision slider and see how it affects the layout. You'll quickly get a feel for the trade-offs.

The library is open source and available on [GitHub](https://github.com/TrigenSoftware/masonry-grid). Contributions, feedback, and bug reports are always welcome!
