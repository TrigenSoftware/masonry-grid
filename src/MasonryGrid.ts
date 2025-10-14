import {
  type FramePosition,
  BaseMasonryGrid
} from './BaseMasonryGrid.js'

export class MasonryGrid extends BaseMasonryGrid {
  protected reflow(isMutation = false) {
    const { columnsCount } = this

    // Reflow is not needed if there is only one column
    // and the reflow is triggered by a mutation (e.g. adding/removing frames).
    if (isMutation && columnsCount === 1) {
      return
    }

    const {
      container,
      framesPositionsMap
    } = this
    const frames = container.children as unknown as ArrayLike<HTMLElement>
    const framesCount = frames.length - 1 // last item is marker
    let containerHeight = -1
    let isMatchedSequence = isMutation

    for (
      let i = 0,
        frame: HTMLElement,
        realContainerBottom = 0,
        prevRealRowBottom = 0,
        position: FramePosition;
      i < framesCount;
      i++
    ) {
      frame = frames[i]

      // Reflow is not needed if there is only one column.
      // Clear frames from previous reflow.
      if (columnsCount === 1) {
        frame.style.removeProperty('transform')
        continue
      }

      // Save the previous row bottom position on every new row.
      if (i % columnsCount === 0) {
        prevRealRowBottom = realContainerBottom
      }

      // If the reflow is triggered by a mutation, try to not reflow unchanged frames.
      // Use cached position if available.
      if (isMatchedSequence) {
        const cachedPosition = this.getCachedScaledFramePosition(
          frame,
          i,
          framesCount
        )

        if (cachedPosition) {
          position = cachedPosition
        } else {
          isMatchedSequence = false
        }
      }

      // Run reflow on resize or if is it a new frame.
      if (!isMatchedSequence) {
        position = this.getFramePositionAndCache(frame, i, prevRealRowBottom)

        // Do not touch first row.
        if (i >= columnsCount) {
          const upperFramePosition = framesPositionsMap.get(
            frames[i - columnsCount]
          )!
          const distance = prevRealRowBottom - upperFramePosition.virtualBottom

          // If the distance is not zero, pull up the frame to the upper frame.
          if (distance !== 0) {
            const translateY = ((distance * 100) / position.height) * -1

            frame.style.transform = `translateY(${translateY}%)`
            position.virtualBottom -= distance
          } else {
            frame.style.removeProperty('transform')
          }
        } else {
          frame.style.removeProperty('transform')
        }
      }

      // Calculate the real bottom position of the row.
      realContainerBottom = Math.max(realContainerBottom, position!.realBottom)
      // Calculate the virtual height of the grid.
      containerHeight = Math.max(containerHeight, position!.virtualBottom)
    }

    // Apply new container height and aspect ratio if available.
    if (containerHeight === -1) {
      container.style.removeProperty('height')
      this.containerAspectRatio = -1
    } else {
      container.style.height = `${containerHeight}px`
      this.containerAspectRatio = containerHeight / this.containerWidth
    }
  }
}
