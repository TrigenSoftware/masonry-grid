import type {
  ComponentProps,
  CSSProperties,
  JSX
} from 'preact'
import {
  MasonryGrid as VanillaMasonryGrid,
  BalancedMasonryGrid as VanillaBalancedMasonryGrid
} from '@masonry-grid/vanilla'
import {
  type MasonryGridHookProps,
  useMasonryGrid
} from './hook.js'
import { formatUnit } from './utils.js'

export { useMasonryGrid }

type ElementType = keyof JSX.IntrinsicElements

export type AsElementProps<T extends ElementType> = {
  as?: T
  style?: CSSProperties
} & Omit<ComponentProps<T>, 'style'>

function getContainerStyle(
  styleProp: CSSProperties | undefined,
  frameWidth: number | string | undefined,
  gap: number | string | undefined
) {
  const style: CSSProperties = {
    display: 'grid',
    overflow: 'hidden',
    ...styleProp
  }

  if (frameWidth !== undefined && !style.gridTemplateColumns) {
    style.gridTemplateColumns = `repeat(auto-fill, minmax(${formatUnit(frameWidth)}, 1fr))`
  }

  if (gap !== undefined && !style.gap) {
    style.gap = formatUnit(gap)
  }

  return style
}

interface BaseMasonryGridProps extends MasonryGridHookProps {
  /**
   * Minimum width of each frame of the grid.
   * If not provided, the grid will auto-fit as many columns as possible.
   */
  frameWidth?: number | string
  /**
   * Grid gap between items.
   */
  gap?: number | string
}

function BaseMasonryGrid<
  T extends ElementType
>(
  props: BaseMasonryGridProps & AsElementProps<T>
): JSX.Element

function BaseMasonryGrid({
  ref,
  as: As = 'div',
  type,
  frameWidth,
  gap,
  disabled,
  style,
  ...props
}: BaseMasonryGridProps & AsElementProps<'div'>) {
  const containerRef = useMasonryGrid<HTMLDivElement>({
    type,
    disabled
  })

  if (ref) {
    if (typeof ref === 'function') {
      ref(containerRef.current)
    } else {
      ref.current = containerRef.current
    }
  }

  return (
    <As
      ref={containerRef}
      style={getContainerStyle(style, frameWidth, gap)}
      {...props}
    />
  )
}

export interface MasonryGridProps extends Omit<BaseMasonryGridProps, 'type'> {}

export function MasonryGrid<
  T extends ElementType = 'div'
>(
  props: MasonryGridProps & AsElementProps<T>
) {
  return (
    <BaseMasonryGrid<T>
      type={VanillaMasonryGrid}
      {...props}
    />
  )
}

export function BalancedMasonryGrid<
  T extends ElementType = 'div'
>(
  props: MasonryGridProps & AsElementProps<T>
) {
  return (
    <BaseMasonryGrid<T>
      type={VanillaBalancedMasonryGrid}
      {...props}
    />
  )
}

export interface FrameProps {
  /**
   * Width of the frame.
   * Not necessarily real width, but used for aspect ratio calculation.
   */
  width: number
  /**
   * Height of the frame.
   * Not necessarily real height, but used for aspect ratio calculation.
   */
  height: number
}

export function Frame<
  T extends ElementType = 'div'
>(
  props: FrameProps & AsElementProps<T>
): JSX.Element

export function Frame({
  as: As = 'div',
  style,
  width,
  height,
  ...props
}: FrameProps & AsElementProps<'div'>) {
  return (
    <As
      style={{
        '--width': width,
        '--height': height,
        'aspectRatio': 'var(--width) / var(--height)',
        ...style
      } as CSSProperties}
      {...props}
    />
  )
}
