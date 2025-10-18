# React Masonry Grid

<img align="right" width="150" height="150" alt="Logo" src="../../website/src/assets/logo.svg">

[![ESM-only package][package]][package-url]
[![NPM version][npm]][npm-url]
[![Install size][size]][size-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]

[package]: https://img.shields.io/badge/package-ESM--only-ffe536.svg
[package-url]: https://nodejs.org/api/esm.html

[npm]: https://img.shields.io/npm/v/%40masonry-grid%2Freact.svg
[npm-url]: https://npmjs.com/package/@masonry-grid/react

[size]: https://deno.bundlejs.com/badge?q=%40masonry-grid%2Freact
[size-url]: https://bundlejs.com/?q=%40masonry-grid%2Freact

[build]: https://img.shields.io/github/actions/workflow/status/TrigenSoftware/masonry-grid/tests.yml?branch=main
[build-url]: https://github.com/TrigenSoftware/masonry-grid/actions

[coverage]: https://img.shields.io/codecov/c/github/TrigenSoftware/masonry-grid.svg
[coverage-url]: https://app.codecov.io/gh/TrigenSoftware/masonry-grid

A fast, lightweight, and responsive masonry grid layout library for React.

- 🪶 **Lightweight**. ~1.7 kB (minified and brotlied). Zero dependencies except React.
- ⚡ **Fast**. Built on top of [@masonry-grid/vanilla](../vanilla) with optimized reflow algorithms.
- 📱 **Responsive**. Automatically adapts to container size changes using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
- 📘 **TypeScript**-first.

```tsx
import { BalancedMasonryGrid, Frame } from '@masonry-grid/react'

function Gallery() {
  return (
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
  )
}
```

## Install

```bash
pnpm add @masonry-grid/react
# or
npm i @masonry-grid/react
# or
yarn add @masonry-grid/react
```

## API

### MasonryGrid

Standard masonry layout that stacks items by pulling them up to fill gaps.

```tsx
import { MasonryGrid, Frame } from '@masonry-grid/react'

<MasonryGrid
  frameWidth={200}
  gap={10}
>
  <Frame width={4} height={3}>
    <img src='...' />
  </Frame>
  {/* more frames... */}
</MasonryGrid>
```

#### Props

- `frameWidth?: number | string` - Minimum width of each frame. Used to calculate `grid-template-columns`. Can be a number (px) or string with units.
- `gap?: number | string` - Gap between items. Can be a number (px) or string with units.
- `disabled?: boolean` - Disable the masonry layout (no transforms/reordering will be applied).
- `as?: ElementType` - Render as a different element (default: `'div'`).
- All other HTML attributes are passed through.

### BalancedMasonryGrid

Balanced masonry layout that reorders items inside rows to minimize overall grid height.

```tsx
import { BalancedMasonryGrid, Frame } from '@masonry-grid/react'

<BalancedMasonryGrid
  frameWidth={200}
  gap={10}
>
  <Frame width={4} height={3}>
    <img src='...' />
  </Frame>
  {/* more frames... */}
</BalancedMasonryGrid>
```

#### Props

Same as `MasonryGrid`.

### Frame

Component for defining masonry grid item with aspect ratio.

```tsx
import { Frame } from '@masonry-grid/react'

<Frame
  width={16}
  height={9}
  as='li'
>
  <img src='...' />
</Frame>
```

#### Props

- `width: number` - Width for aspect ratio calculation (not necessarily real pixel width).
- `height: number` - Height for aspect ratio calculation (not necessarily real pixel height).
- `as?: ElementType` - Render as a different element (default: `'div'`).
- All other HTML attributes are passed through.

### useMasonryGrid

Hook for advanced use cases when you need direct access to the masonry grid instance.

```tsx
import { useMasonryGrid } from '@masonry-grid/react'
import { MasonryGrid as VanillaMasonryGrid } from '@masonry-grid/vanilla'

function CustomGrid() {
  const containerRef = useMasonryGrid<HTMLDivElement>({
    type: VanillaMasonryGrid
  })

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        overflow: 'hidden',
        gap: '10px'
      }}
    >
      {/* children */}
    </div>
  )
}
```
