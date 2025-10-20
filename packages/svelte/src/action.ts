import type { Action } from 'svelte/action'
import type { BaseMasonryGrid } from '@masonry-grid/vanilla'

export interface MasonryGridConstructor {
  new (container: HTMLElement): BaseMasonryGrid
  prototype: BaseMasonryGrid
}

export interface MasonryGridActionParams {
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
 * Svelte action to create a MasonryGrid on a container element.
 * @param element - The container element.
 * @param params
 * @param params.type - The MasonryGrid constructor to use.
 * @param params.disabled - If true, the MasonryGrid will not be initialized.
 * @returns An object with update and destroy methods.
 */
export const masonry: Action<HTMLElement, MasonryGridActionParams> = (
  element,
  params
) => {
  let { type: MasonryGrid, disabled } = params
  let instance: BaseMasonryGrid | null = null

  function init() {
    if (!disabled && !instance) {
      instance = new MasonryGrid(element)
    }
  }

  function destroy() {
    if (instance) {
      instance.destroy()
      instance = null
    }
  }

  init()

  return {
    update(params) {
      if (params.type !== MasonryGrid || params.disabled !== disabled) {
        destroy()
        MasonryGrid = params.type
        disabled = params.disabled
        init()
      }
    },
    destroy
  }
}
