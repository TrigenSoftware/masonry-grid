# Svelte Masonry Grid

<img align="right" width="150" height="150" alt="Logo" src="../../website/src/assets/logo.svg">

[![ESM-only package][package]][package-url]
[![NPM version][npm]][npm-url]
[![Install size][size]][size-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]

[package]: https://img.shields.io/badge/package-ESM--only-ffe536.svg
[package-url]: https://nodejs.org/api/esm.html

[npm]: https://img.shields.io/npm/v/%40masonry-grid%2Fsvelte.svg
[npm-url]: https://npmjs.com/package/@masonry-grid/svelte

[size]: https://deno.bundlejs.com/badge?q=%40masonry-grid%2Fsvelte
[size-url]: https://bundlejs.com/?q=%40masonry-grid%2Fsvelte

[build]: https://img.shields.io/github/actions/workflow/status/TrigenSoftware/masonry-grid/tests.yml?branch=main
[build-url]: https://github.com/TrigenSoftware/masonry-grid/actions

[coverage]: https://img.shields.io/codecov/c/github/TrigenSoftware/masonry-grid.svg
[coverage-url]: https://app.codecov.io/gh/TrigenSoftware/masonry-grid

A fast, lightweight, and responsive masonry grid layout library for Svelte.

- 🪶 **Lightweight**. Zero dependencies except Svelte.
- ⚡ **Fast**. Built on top of [@masonry-grid/vanilla](../vanilla) with optimized reflow algorithms.
- 📱 **Responsive**. Automatically adapts to container size changes using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
- 📘 **TypeScript**-first.

_Read the docs and explore examples at [masonry-grid.js.org](https://masonry-grid.js.org)_

```svelte
<script>
  import { BalancedMasonryGrid, Frame } from '@masonry-grid/svelte'
</script>

<BalancedMasonryGrid
  frameWidth={200}
  gap={10}
>
  <Frame width={4} height={3}>
    <img src='https://picsum.photos/400/300' alt='Photo 1' />
  </Frame>
  <Frame width={1} height={1}>
    <img src='https://picsum.photos/200/200' alt='Photo 2' />
  </Frame>
  <Frame width={3} height={4}>
    <img src='https://picsum.photos/300/400' alt='Photo 3' />
  </Frame>
  <Frame width={3} height={4}>
    <img src='https://picsum.photos/300/400' alt='Photo 4' />
  </Frame>
  <Frame width={1} height={1}>
    <img src='https://picsum.photos/200/200' alt='Photo 5' />
  </Frame>
  <Frame width={4} height={3}>
    <img src='https://picsum.photos/400/300' alt='Photo 6' />
  </Frame>
</BalancedMasonryGrid>
```

## Install

```bash
pnpm add @masonry-grid/svelte
# or
npm i @masonry-grid/svelte
# or
yarn add @masonry-grid/svelte
```

## Docs

- [Guides](https://masonry-grid.js.org/guides/prerequisites/)
- [API Reference](https://masonry-grid.js.org/api/svelte/)
- [Examples](https://masonry-grid.js.org/examples/#svelte)
