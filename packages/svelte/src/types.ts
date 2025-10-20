import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { MasonryGridActionParams } from './action.js'

export interface BaseMasonryGridProps extends MasonryGridActionParams, HTMLAttributes<HTMLElement> {
  /**
   * Custom element tag to use for the container.
   */
  as?: string
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
   * Children content.
   */
  children?: Snippet
}

export interface MasonryGridProps extends Omit<BaseMasonryGridProps, 'type'> {}
