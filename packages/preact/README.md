# Preact Masonry Grid

<img align="right" width="150" height="150" alt="Logo" src="../../website/src/assets/logo.svg">

[![ESM-only package][package]][package-url]
[![NPM version][npm]][npm-url]
[![Install size][size]][size-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]

[package]: https://img.shields.io/badge/package-ESM--only-ffe536.svg
[package-url]: https://nodejs.org/api/esm.html

[npm]: https://img.shields.io/npm/v/%40masonry-grid%2Fpreact.svg
[npm-url]: https://npmjs.com/package/@masonry-grid/preact

[size]: https://deno.bundlejs.com/badge?q=%40masonry-grid%2Fpreact
[size-url]: https://bundlejs.com/?q=%40masonry-grid%2Fpreact

[build]: https://img.shields.io/github/actions/workflow/status/TrigenSoftware/masonry-grid/tests.yml?branch=main
[build-url]: https://github.com/TrigenSoftware/masonry-grid/actions

[coverage]: https://img.shields.io/codecov/c/github/TrigenSoftware/masonry-grid.svg
[coverage-url]: https://app.codecov.io/gh/TrigenSoftware/masonry-grid

A fast, lightweight, and responsive masonry grid layout library for Preact.

- 🪶 **Lightweight**. ~1.7 kB (minified and brotlied). Zero dependencies except Preact.
- ⚡ **Fast**. Built on top of [@masonry-grid/vanilla](../vanilla) with optimized reflow algorithms.
- 📱 **Responsive**. Automatically adapts to container size changes using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
- 📘 **TypeScript**-first.

_Read the docs and explore examples at [masonry-grid.js.org](https://masonry-grid.js.org)_

```tsx
import { BalancedMasonryGrid as MasonryGrid, Frame } from '@masonry-grid/preact'

function Gallery() {
  return (
    <MasonryGrid
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
    </MasonryGrid>
  )
}
```

## Install

```bash
pnpm add @masonry-grid/preact
# or
npm i @masonry-grid/preact
# or
yarn add @masonry-grid/preact
```

## Docs

- [Guides](https://masonry-grid.js.org/guides/prerequisites/)
- [API Reference](https://masonry-grid.js.org/api/preact/)
- [Examples](https://masonry-grid.js.org/examples/#preact)
