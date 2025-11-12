import type {
  ComponentProps,
  CSSProperties,
  JSX
} from 'preact'
import {
  RegularMasonryGrid as VanillaRegularMasonryGrid,
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

export function RegularMasonryGrid<
  T extends ElementType = 'div'
>(
  props: MasonryGridProps & AsElementProps<T>
) {
  return (
    <BaseMasonryGrid<T>
      type={VanillaRegularMasonryGrid}
      {...props}
    />
  )
}

/**
 * @deprecated Use `RegularMasonryGrid` instead.
 */
export const MasonryGrid = RegularMasonryGrid

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

export interface SpannedMasonryGridProps {
  /**
   * Style for the inner container element.
   */
  innerStyle?: CSSProperties
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
   * Precision for span calculation.
   * Affects how accurately frames will maintain their aspect ratios.
   * Higher precision results in more accurate sizes but may impact performance and cause bugs in some browsers.
   */
  precision?: number
}

const DEFAULT_SPAN_PRECISION = 10
const SPANNED_INNER_STYLE = {
  display: 'grid',
  clipPath: 'margin-box',
  margin: 'calc(-1 * var(--gap, 0) / 2)',
  gridTemplateColumns: 'repeat(auto-fill, minmax(var(--frame-width), 1fr))'
}

export function SpannedMasonryGrid<
  T extends ElementType
>(
  props: SpannedMasonryGridProps & AsElementProps<T>
): JSX.Element

export function SpannedMasonryGrid({
  ref,
  as: As = 'div',
  precision = DEFAULT_SPAN_PRECISION,
  frameWidth,
  gap,
  style,
  innerStyle,
  children,
  ...props
}: SpannedMasonryGridProps & AsElementProps<'div'>) {
  return (
    <As
      style={{
        '--frame-width': formatUnit(frameWidth),
        '--gap': formatUnit(gap),
        '--precision': precision,
        ...style
      } as CSSProperties}
      {...props}
    >
      <div
        style={{
          ...SPANNED_INNER_STYLE,
          ...innerStyle
        }}
      >
        {children}
      </div>
    </As>
  )
}

export interface SpannedFrameProps extends FrameProps {
  /**
   * Style for the inner container element.
   */
  innerStyle?: CSSProperties
}

const SPANNED_FRAME_STYLE: CSSProperties = {
  aspectRatio: 'var(--width) / var(--height)',
  width: '100%',
  height: '100%',
  position: 'relative',
  gridRow: 'span calc(var(--height) / var(--width) * var(--precision))'
}
const SPANNED_FRAME_INNER_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 'calc(var(--gap, 0) / 2)'
}

export function SpannedFrame<
  T extends ElementType = 'div'
>(
  props: SpannedFrameProps & AsElementProps<T>
): JSX.Element

export function SpannedFrame({
  as: As = 'div',
  width,
  height,
  style,
  innerStyle,
  children,
  ...props
}: SpannedFrameProps & AsElementProps<'div'>) {
  return (
    <As
      style={{
        '--width': width,
        '--height': height,
        ...SPANNED_FRAME_STYLE,
        ...style
      } as CSSProperties}
      {...props}
    >
      <div
        style={{
          ...SPANNED_FRAME_INNER_STYLE,
          ...innerStyle
        }}
      >
        {children}
      </div>
    </As>
  )
}
