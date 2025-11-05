import type {
  JSX,
  ComponentProps
} from 'solid-js'
import {
  splitProps,
  mergeProps
} from 'solid-js'
import { Dynamic } from 'solid-js/web'
import {
  MasonryGrid as VanillaMasonryGrid,
  BalancedMasonryGrid as VanillaBalancedMasonryGrid
} from '@masonry-grid/vanilla'
import {
  type MasonryGridEffectParams,
  useMasonryGrid
} from './effect.js'
import { formatUnit } from './utils.js'

export { useMasonryGrid }

type ElementType = keyof JSX.IntrinsicElements

export type AsElementProps<T extends ElementType> = {
  as?: T
  style?: JSX.CSSProperties
} & Omit<ComponentProps<T>, 'style'>

function getContainerStyle(
  styleProp: JSX.CSSProperties | string | undefined,
  frameWidth: number | string | undefined,
  gap: number | string | undefined
): JSX.CSSProperties {
  const baseStyle: JSX.CSSProperties = {
    display: 'grid',
    overflow: 'hidden'
  }

  if (frameWidth !== undefined) {
    baseStyle['grid-template-columns'] = `repeat(auto-fill, minmax(${formatUnit(frameWidth)}, 1fr))`
  }

  if (gap !== undefined) {
    baseStyle.gap = formatUnit(gap)
  }

  if (typeof styleProp === 'string') {
    return baseStyle
  }

  return {
    ...baseStyle,
    ...styleProp
  }
}

interface BaseMasonryGridProps extends MasonryGridEffectParams {
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
  props: BaseMasonryGridProps & Omit<AsElementProps<T>, 'type'>
): JSX.Element

function BaseMasonryGrid(
  props: BaseMasonryGridProps & AsElementProps<'div'>
) {
  const merged = mergeProps({
    as: 'div' as const
  }, props)
  const [local, others] = splitProps(merged, [
    'as',
    'type',
    'disabled',
    'frameWidth',
    'gap',
    'style'
  ])
  const containerRef = useMasonryGrid(local)

  return (
    <Dynamic
      component={local.as}
      ref={containerRef}
      style={getContainerStyle(local.style, local.frameWidth, local.gap)}
      {...others}
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

export function Frame(
  props: FrameProps & AsElementProps<'div'>
) {
  const merged = mergeProps({
    as: 'div' as const
  }, props)
  const [local, others] = splitProps(merged, [
    'as',
    'width',
    'height',
    'style'
  ])

  return (
    <Dynamic
      component={local.as}
      style={{
        '--width': local.width,
        '--height': local.height,
        'aspect-ratio': 'var(--width) / var(--height)',
        ...local.style
      }}
      {...others}
    />
  )
}
