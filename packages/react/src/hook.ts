import {
  useLayoutEffect,
  useRef
} from 'react'
import type { BaseMasonryGrid } from '@masonry-grid/vanilla'

export interface MansoryGridConstructor {
  new (container: HTMLElement): BaseMasonryGrid
  prototype: BaseMasonryGrid
}

export interface MasonryGridHookProps {
  /**
   * The MasonryGrid constructor to use.
   */
  type: MansoryGridConstructor
  /**
   * If true, the MasonryGrid will not be initialized.
   */
  disabled?: boolean
}

/**
 * Hook to create a MasonryGrid on a container element ref.
 * @param params
 * @param params.type - The MasonryGrid constructor to use.
 * @param params.disabled - If true, the MasonryGrid will not be initialized.
 * @returns A ref to be attached to the container element.
 */
export function useMasonryGrid<T extends HTMLElement = HTMLElement>({
  type: MasonryGrid,
  disabled = false
}: MasonryGridHookProps) {
  const containerRef = useRef<T>(null)

  useLayoutEffect(() => {
    const container = containerRef.current

    if (!container || disabled) {
      return
    }

    const masonryGrid = new MasonryGrid(container)

    return () => masonryGrid.destroy()
  }, [MasonryGrid, disabled])

  return containerRef
}
