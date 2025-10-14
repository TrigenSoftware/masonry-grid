# Masonry Grid

[![ESM-only package][package]][package-url]
[![NPM version][npm]][npm-url]
[![Install size][size]][size-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]

[package]: https://img.shields.io/badge/package-ESM--only-ffe536.svg
[package-url]: https://nodejs.org/api/esm.html

[npm]: https://img.shields.io/npm/v/masonry-grid.svg
[npm-url]: https://npmjs.com/package/masonry-grid

[size]: https://deno.bundlejs.com/badge?q=masonry-grid
[size-url]: https://bundlejs.com/?q=masonry-grid

[build]: https://img.shields.io/github/actions/workflow/status/TrigenSoftware/masonry-grid/tests.yml?branch=main
[build-url]: https://github.com/TrigenSoftware/masonry-grid/actions

[coverage]: https://img.shields.io/codecov/c/github/TrigenSoftware/masonry-grid.svg
[coverage-url]: https://app.codecov.io/gh/TrigenSoftware/masonry-grid

A fast, lightweight, and responsive masonry grid layout library in vanilla JavaScript.

- **Lightweight**. ~1.4 kB (minified and brotlied). Zero dependencies.
- **Fast**. Direct DOM manipulation with optimized reflow algorithms.
- **Responsive**. Automatically adapts to container size changes using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
- **TypeScript**-first.

```html
<style>
.masonry {
  /* Required styles */
  display: grid;
  overflow: hidden;
  /* Optional styles */
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.frame {
  /* Required styles */
  aspect-ratio: var(--width) / var(--height);
}
</style>
<div class="masonry">
  <!-- Each item must have aspect-ratio set by --width and --height CSS variables -->
  <div class="frame" style="--width: 4; --height: 3;">
    <img src="https://picsum.photos/400/300" />
  </div>
  <div class="frame" style="--width: 1; --height: 1;">
    <img src="https://picsum.photos/200/200" />
  </div>
  <div class="frame" style="--width: 3; --height: 4;">
    <img src="https://picsum.photos/300/400" />
  </div>
  <div class="frame" style="--width: 3; --height: 4;">
    <img src="https://picsum.photos/300/400" />
  </div>
  <div class="frame" style="--width: 1; --height: 1;">
    <img src="https://picsum.photos/200/200" />
  </div>
  <div class="frame" style="--width: 4; --height: 3;">
    <img src="https://picsum.photos/400/300" />
  </div>
</div>
<script type="module">
import { BalancedMasonryGrid } from 'https://cdn.skypack.dev/masonry-grid';

new BalancedMasonryGrid(document.querySelector('.masonry'));
</script>
```

## Install

```bash
pnpm add masonry-grid
# or
npm i masonry-grid
# or
yarn add masonry-grid
```

## API

### Prerequirements

The container must be CSS Grid and each item must have `--width` and `--height` CSS variables to define aspect ratio and should maintain this aspect ratio, for example using the CSS `aspect-ratio` property.

### MasonryGrid

Standard masonry layout that stacks items by pulling them up to fill gaps.

```ts
import { MasonryGrid } from 'masonry-grid'

const grid = new MasonryGrid(container)
```

### BalancedMasonryGrid

Balanced masonry layout that reorders items inside rows to minimize overall grid height.

```ts
import { BalancedMasonryGrid } from 'masonry-grid'

const grid = new BalancedMasonryGrid(container)
```

### `#destroy()`

Both `MasonryGrid` and `BalancedMasonryGrid` have `destroy()` method that destroys the grid instance and cleans up all observers and styles.

```ts
grid.destroy()
```

## How It Works

### MasonryGrid

It uses ResizeObserver and MutationObserver to monitor changes to the container and its items. When a change is detected, it recalculates the layout using aspect ratios defined by `--width` and `--height` CSS variables on each item. Then it applies vertical translations using `transform: translateY()` to pull items up and fill gaps, while maintaining the natural order of items in the DOM. Because of we know the aspect ratios, and translate values are calculated in percentages, resizing the container without changing columns count does not require recalculating the layout.

### BalancedMasonryGrid

Same as MasonryGrid, plus it reorders items within each row to minimize overall grid height. It does this by calculating the optimal order of items in each row based on their heights and adjusting their `order` CSS property accordingly without changing order of items in the DOM.
