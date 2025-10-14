import { getEntryWidth } from './utils.js'

export interface FramePosition {
  aspectRatio: number
  realIndex: number
  virtualIndex: number
  realBottom: number
  virtualBottom: number
  height: number
  width: number
}

export abstract class BaseMasonryGrid {
  /**
   * Grid gap value in pixels.
   * -1 means that the gap is not calculated or set.
   */
  protected gap = -1
  /**
   * Width of the frame in pixels.
   * -1 means that the width is not calculated or set.
   */
  protected frameWidth = -1
  /**
   * Width of the container in pixels.
   * -1 means that the width is not calculated or set.
   */
  protected containerWidth = -1
  /**
   * Number of columns in the grid.
   * -1 means that the number of columns is not calculated or set.
   */
  protected columnsCount = -1
  /**
   * Aspect ratio of the container.
   * -1 means that the aspect ratio is not calculated or set.
   */
  protected containerAspectRatio: number = -1
  /**
   * Map of frames positions.
   * Key is the frame element, value is the FramePosition object.
   */
  protected framesPositionsMap: WeakMap<HTMLElement, FramePosition> = new WeakMap()

  /**
   * Resize observer to observe changes in the container and marker size.
   */
  protected resizeObserver: ResizeObserver
  /**
   * Mutation observer to observe changes in the container's children.
   */
  protected mutationObserver: MutationObserver
  /**
   * Marker element to observe column width changes.
   */
  protected marker: HTMLElement

  constructor(
    /**
     * Container element that holds the grid.
     */
    protected container: HTMLElement
  ) {
    const containerStyle = getComputedStyle(container)
    const marker = document.createElement('div')

    container.append(marker)

    const resizeObserver = new ResizeObserver((entries) => {
      const containerWidth = getEntryWidth(
        entries,
        container,
        this.containerWidth
      )
      const frameWidth = getEntryWidth(entries, marker, this.frameWidth)
      let gap = this.gap

      // Refresh gap if it is not set or if the marker width has changed
      if (gap === -1 || frameWidth !== this.frameWidth) {
        gap = parseFloat(containerStyle.gap)

        if (isNaN(gap)) {
          gap = 0
        }
      }

      // Nothing has changed, stop processing
      if (
        gap === this.gap
        && containerWidth === this.containerWidth
        && frameWidth === this.frameWidth
      ) {
        return
      }

      this.containerWidth = containerWidth
      this.frameWidth = frameWidth

      // Calculate the number of columns based on the container width, frame width, and gap
      const columnsCount = Math.round(
        (containerWidth + gap) / (frameWidth + gap)
      )

      // If the number of columns and gap has not changed, just resize the height
      if (this.columnsCount === columnsCount && gap === this.gap) {
        stopMutationObserver()
        this.resizeHeight()
        startMutationObserver()
        return
      }

      this.gap = gap
      this.columnsCount = columnsCount

      // If the number of columns has changed, reflow the grid
      stopMutationObserver()
      this.reflow()
      startMutationObserver()
    })
    const mutationObserver = new MutationObserver(() => {
      stopMutationObserver()
      // Move the marker to the end of the container
      container.append(marker)

      // Try to partially reflow the grid, only if there are columns
      if (this.columnsCount > 0) {
        this.reflow(true)
      }

      startMutationObserver()
    })
    const startMutationObserver = () => {
      mutationObserver.observe(container, {
        childList: true,
        attributeFilter: ['style'],
        subtree: true
      })
    }
    const stopMutationObserver = () => {
      mutationObserver.disconnect()
    }

    this.marker = marker
    this.mutationObserver = mutationObserver
    this.resizeObserver = resizeObserver

    // Observe the container to know container width
    resizeObserver.observe(container)
    // Observe the marker to know frame width and when need to refresh gap
    resizeObserver.observe(marker)
    // Observe the container for mutations to know when frames are updated
    startMutationObserver()
  }

  /**
   * Resize the height of the container based on the current width and aspect ratio.
   * If the aspect ratio is not set, the height will be removed.
   * Aspect ratio should be set while reflowing the grid.
   */
  protected resizeHeight() {
    const {
      container,
      containerAspectRatio
    } = this

    if (containerAspectRatio !== -1) {
      container.style.height = `${
        this.containerWidth * containerAspectRatio
      }px`
    } else {
      container.style.removeProperty('height')
    }
  }

  /**
   * Get the aspect ratio of the frame based on its width and height.
   * @param element - The frame element to calculate the aspect ratio for.
   * @returns The aspect ratio of the frame as a number (height / width).
   */
  protected getFrameAspectRatio(element: HTMLElement) {
    const width = parseFloat(element.style.getPropertyValue('--width'))
    const height = parseFloat(element.style.getPropertyValue('--height'))

    return height / width
  }

  /**
   * Get the position of the frame in the grid.
   * @param element - The frame element to get the position for.
   * @param i - The real index of the frame in the grid.
   * @param offset - The offset from the top of the container in pixels.
   * @returns An object containing the position of the frame in the grid.
   */
  protected getFramePosition(
    element: HTMLElement,
    i: number,
    offset: number
  ): FramePosition {
    const {
      gap,
      columnsCount,
      frameWidth
    } = this
    const aspectRatio = this.getFrameAspectRatio(element)
    const height = aspectRatio * frameWidth
    const bottom = offset + height + (i >= columnsCount ? gap : 0)

    return {
      aspectRatio,
      realIndex: i,
      virtualIndex: i,
      height,
      realBottom: bottom,
      virtualBottom: bottom,
      width: frameWidth
    }
  }

  /**
   * Get the position of the frame in the grid and cache it.
   * @param element - The frame element to get the position for.
   * @param i - The real index of the frame in the grid.
   * @param offset - The offset from the top of the container in pixels.
   * @returns An object containing the position of the frame in the grid.
   */
  protected getFramePositionAndCache(
    element: HTMLElement,
    i: number,
    offset: number
  ): FramePosition {
    const position = this.getFramePosition(element, i, offset)

    this.framesPositionsMap.set(element, position)

    return position
  }

  /**
   * Get the cached position of the frame in the grid and scale it to the current frame width.
   * If the frame position is not cached or the index does not match, return null.
   * @param element - The frame element to get the position for.
   * @param i - The real index of the frame in the grid.
   * @returns An object containing the scaled position of the frame in the grid or null if not found.
   */
  protected getCachedScaledFramePosition(
    element: HTMLElement,
    i: number,
    framesCount: number
  ): FramePosition | null {
    const { frameWidth } = this
    const aspectRatio = this.getFrameAspectRatio(element)
    const position = this.framesPositionsMap.get(element)

    if (
      !position
      || position.realIndex !== i
      || position.virtualIndex >= framesCount
      || position.aspectRatio !== aspectRatio
    ) {
      return null
    }

    const factor = frameWidth / position.width

    position.height *= factor
    position.realBottom *= factor
    position.virtualBottom *= factor
    position.width = frameWidth

    return position
  }

  /**
   * Reflow the grid.
   * @param isMutation - Whether the reflow is triggered by a mutation (e.g. adding/removing frames).
   */
  protected abstract reflow(isMutation?: boolean): void

  /**
   * Destroy the MasonryGrid instance.
   */
  destroy() {
    const {
      resizeObserver,
      mutationObserver,
      marker,
      container,
      framesPositionsMap
    } = this

    resizeObserver.disconnect()
    mutationObserver.disconnect()
    marker.remove()

    const frames = container.children as unknown as ArrayLike<HTMLElement>

    container.style.removeProperty('height')

    for (
      let i = 0, frame: HTMLElement, framesCount = frames.length;
      i < framesCount;
      i++
    ) {
      frame = frames[i]
      frame.style.removeProperty('transform')
      frame.style.removeProperty('order')
      framesPositionsMap.delete(frame)
    }
  }
}
