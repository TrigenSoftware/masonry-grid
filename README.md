# Masonry Grid

<img align="right" width="150" height="150" alt="Logo" src="website/src/assets/logo.svg">

[![ESM-only package][package]][package-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]

[package]: https://img.shields.io/badge/package-ESM--only-ffe536.svg
[package-url]: https://nodejs.org/api/esm.html

[build]: https://img.shields.io/github/actions/workflow/status/TrigenSoftware/masonry-grid/tests.yml?branch=main
[build-url]: https://github.com/TrigenSoftware/masonry-grid/actions

[coverage]: https://img.shields.io/codecov/c/github/TrigenSoftware/masonry-grid.svg
[coverage-url]: https://app.codecov.io/gh/TrigenSoftware/masonry-grid

A fast, lightweight, and responsive masonry grid layout library.

- 🪶 **Lightweight**. ~1.4 kB (minified and brotlied). Zero dependencies.
- ⚡ **Fast**. Direct DOM manipulation with optimized reflow algorithms.
- 📱 **Responsive**. Automatically adapts to container size changes using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
- 📘 **TypeScript**-first.

_Read the docs and explore examples at [masonry-grid.js.org](https://masonry-grid.js.org)_

## Packages

| Package | Version | Size |
|---------|---------|------|
| [`@masonry-grid/vanilla`](packages/vanilla#readme) | [![NPM version][vanilla-npm]][vanilla-npm-url] | [![Bundle size][vanilla-size]][vanilla-size-url] |
| [`@masonry-grid/react`](packages/react#readme) | [![NPM version][react-npm]][react-npm-url] | [![Bundle size][react-size]][react-size-url] |
| [`@masonry-grid/svelte`](packages/svelte#readme) | [![NPM version][svelte-npm]][svelte-npm-url] | [![Bundle size][svelte-size]][svelte-size-url] |

<!-- vanilla -->

[vanilla-npm]: https://img.shields.io/npm/v/%40masonry-grid%2Fvanilla.svg
[vanilla-npm-url]: https://www.npmjs.com/package/@masonry-grid/vanilla

[vanilla-size]: https://deno.bundlejs.com/badge?q=%40masonry-grid%2Fvanilla
[vanilla-size-url]: https://bundlejs.com/?q=%40masonry-grid%2Fvanilla

<!-- react -->

[react-npm]: https://img.shields.io/npm/v/%40masonry-grid%2Freact.svg
[react-npm-url]: https://www.npmjs.com/package/@masonry-grid/react

[react-size]: https://deno.bundlejs.com/badge?q=%40masonry-grid%2Freact
[react-size-url]: https://bundlejs.com/?q=%40masonry-grid%2Freact

<!-- svelte -->

[svelte-npm]: https://img.shields.io/npm/v/%40masonry-grid%2Fsvelte.svg
[svelte-npm-url]: https://www.npmjs.com/package/@masonry-grid/svelte

[svelte-size]: https://deno.bundlejs.com/badge?q=%40masonry-grid%2Fsvelte
[svelte-size-url]: https://bundlejs.com/?q=%40masonry-grid%2Fsvelte
