import { BaseMasonryGrid, type FramePosition } from './BaseMasonryGrid.js'

export class BalancedMasonryGrid extends BaseMasonryGrid {
  protected bufferA: FramePosition[] = []
  protected bufferB: FramePosition[] = []

  /**
   * Balance row with previous.
   * Current implementation stacks row with previous to have minimal possible height.
   * @param positions - Virtual positions of the frames in the grid.
   * @param start - Start index of the row to balance.
   * @param end - End index of the row to balance.
   */
  protected balanceRow(positions: FramePosition[], start: number, end: number) {
    const {
      columnsCount,
      bufferA,
      bufferB
    } = this
    const bufferLen = end - start + 1

    bufferA.length = bufferLen
    bufferB.length = bufferLen

    for (let i = 0, j = start; j <= end; i++, j++) {
      bufferA[i] = positions[j - columnsCount]
      bufferB[i] = positions[j]
    }

    bufferA.sort((a, b) => b.virtualBottom - a.virtualBottom)
    bufferB.sort((a, b) => a.height - b.height)

    for (let i = 0, j = start, vi = 0; j <= end; i++, j++) {
      vi = bufferA[i].virtualIndex + columnsCount
      positions[vi] = bufferB[i]
      bufferB[i].virtualIndex = vi
    }
  }

  protected reflow(isMutation = false) {
    const { columnsCount } = this

    // Reflow is not needed if there is only one column
    // and the reflow is triggered by a mutation (e.g. adding/removing frames).
    if (isMutation && columnsCount === 1) {
      return
    }

    const {
      container,
      marker
    } = this
    const frames = container.children as unknown as ArrayLike<HTMLElement>
    const framesCount = frames.length - 1 // last item is marker
    const lastFrameIndex = framesCount - 1
    const positions = Array(framesCount) as FramePosition[]
    let containerHeight = -1
    let isMatchedSequence = isMutation

    // Set marker position to the end of the grid.
    marker.style.order = String(framesCount)

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
        frame.style.removeProperty('order')
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
          positions[position.virtualIndex] = position
        } else {
          isMatchedSequence = false

          const rowStart = i - (i % columnsCount)

          // Something in a row has changed, so we need to recalculate all frames in the row.
          for (let j = rowStart, subframe: HTMLElement; j < i; j++) {
            subframe = frames[j]
            position = this.getFramePositionAndCache(
              subframe,
              j,
              prevRealRowBottom
            )
            positions[j] = position
          }
        }
      }

      // Run reflow on resize or if is it something new in the row.
      if (!isMatchedSequence) {
        position = this.getFramePositionAndCache(frame, i, prevRealRowBottom)
        positions[i] = position

        // Run reflow one every end of the row.
        if (
          i >= columnsCount
          && ((i + 1) % columnsCount === 0 || i === lastFrameIndex)
        ) {
          const start = i - (i % columnsCount)
          const end = i

          // Balance the row with the previous one.
          this.balanceRow(positions, start, end)

          // Pull up the frames in the row to the upper frame.
          for (let j = start; j <= end; j++) {
            position = positions[j]
            frame = frames[position.realIndex]

            // Apply virtual index to the frame.
            frame.style.order = String(position.virtualIndex)

            const upperFrameRect = positions[j - columnsCount]
            const distance = prevRealRowBottom - upperFrameRect.virtualBottom

            // If the distance is not zero, pull up the frame to the upper frame.
            if (distance !== 0) {
              const translateY = ((distance * 100) / position.height) * -1

              frame.style.transform = `translateY(${translateY}%)`
              position.virtualBottom -= distance
            } else {
              frame.style.removeProperty('transform')
            }

            // Calculate the real bottom position of the row.
            realContainerBottom = Math.max(
              realContainerBottom,
              position!.realBottom
            )
            // Calculate the virtual height of the grid.
            containerHeight = Math.max(
              containerHeight,
              position!.virtualBottom
            )
          }
        } else if (i < columnsCount) {
          // Reset first row frames.
          frame.style.order = String(i)
          frame.style.removeProperty('transform')
          frame.style.removeProperty('order')
          // Calculate the real bottom position of the row.
          realContainerBottom = Math.max(
            realContainerBottom,
            position!.realBottom
          )
          // Calculate the virtual height of the grid.
          containerHeight = Math.max(containerHeight, position!.virtualBottom)
        }
      } else {
        // Calculate the real bottom position of the row.
        realContainerBottom = Math.max(
          realContainerBottom,
          position!.realBottom
        )
        // Calculate the virtual height of the grid.
        containerHeight = Math.max(containerHeight, position!.virtualBottom)
      }
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

  override destroy() {
    super.destroy()
    this.bufferA.length = 0
    this.bufferB.length = 0
  }
}
