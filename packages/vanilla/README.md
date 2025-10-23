# Masonry Grid

<img align="right" width="150" height="150" alt="Logo" src="../../website/src/assets/logo.svg">

[![ESM-only package][package]][package-url]
[![NPM version][npm]][npm-url]
[![Install size][size]][size-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]

[package]: https://img.shields.io/badge/package-ESM--only-ffe536.svg
[package-url]: https://nodejs.org/api/esm.html

[npm]: https://img.shields.io/npm/v/%40masonry-grid%2Fvanilla.svg
[npm-url]: https://npmjs.com/package/@masonry-grid/vanilla

[size]: https://deno.bundlejs.com/badge?q=%40masonry-grid%2Fvanilla
[size-url]: https://bundlejs.com/?q=%40masonry-grid%2Fvanilla

[build]: https://img.shields.io/github/actions/workflow/status/TrigenSoftware/masonry-grid/tests.yml?branch=main
[build-url]: https://github.com/TrigenSoftware/masonry-grid/actions

[coverage]: https://img.shields.io/codecov/c/github/TrigenSoftware/masonry-grid.svg
[coverage-url]: https://app.codecov.io/gh/TrigenSoftware/masonry-grid

A fast, lightweight, and responsive masonry grid layout library in vanilla JavaScript.

- 🪶 **Lightweight**. ~1.4 kB (minified and brotlied). Zero dependencies.
- ⚡ **Fast**. Direct DOM manipulation with optimized reflow algorithms.
- 📱 **Responsive**. Automatically adapts to container size changes using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
- 📘 **TypeScript**-first.

_Read the docs and explore examples at [masonry-grid.js.org](https://masonry-grid.js.org)_

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

  & img {
    width: 100%;
  }
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
import { BalancedMasonryGrid } from 'https://cdn.skypack.dev/@masonry-grid/vanilla'

new BalancedMasonryGrid(document.querySelector('.masonry'))
</script>
```

## Install

```bash
pnpm add @masonry-grid/vanilla
# or
npm i @masonry-grid/vanilla
# or
yarn add @masonry-grid/vanilla
```

## Docs

- [Guides](https://masonry-grid.js.org/guides/prerequisites/)
- [API Reference](https://masonry-grid.js.org/api/vanilla/)
- [Examples](https://masonry-grid.js.org/examples/#vanilla-javascript)
