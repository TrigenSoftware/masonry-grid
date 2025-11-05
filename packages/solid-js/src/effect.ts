import {
  createEffect,
  onCleanup
} from 'solid-js'
import type { BaseMasonryGrid } from '@masonry-grid/vanilla'

export interface MasonryGridConstructor {
  new (container: HTMLElement): BaseMasonryGrid
  prototype: BaseMasonryGrid
}

export interface MasonryGridEffectParams {
  /**
   * The MasonryGrid constructor to use.
   */
  type: MasonryGridConstructor
  /**
   * If true, the MasonryGrid will not be initialized.
   */
  disabled?: boolean
}

/**
 * Effect to create a MasonryGrid on a container element ref.
 * @param params
 * @param params.type - The MasonryGrid constructor to use.
 * @param params.disabled - If true, the MasonryGrid will not be initialized.
 * @returns A function to set the container element ref.
 */
export function useMasonryGrid(params: MasonryGridEffectParams) {
  let container: HTMLElement | undefined

  createEffect(() => {
    if (!container || params.disabled) {
      return
    }

    const MasonryGrid = params.type
    const masonryGrid = new MasonryGrid(container)

    onCleanup(() => masonryGrid.destroy())
  })

  return (ref: HTMLElement | undefined) => {
    container = ref
  }
}
