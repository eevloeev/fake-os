import { WindowType } from "@/components/Desktop/types"
import { Placement } from "@/shared/Window/types"
import { CSSProperties, useCallback, useEffect, useState } from "react"

const DURATION = {
  NONE: 0,
  SHORT: 200,
  LONG: 400,
}

const TRANSITION = {
  [DURATION.NONE]: `${DURATION.NONE}ms`,
  [DURATION.SHORT]: `${DURATION.SHORT}ms`,
  [DURATION.LONG]: `${DURATION.LONG}ms`,
}

const DEFAULT_POSITION: CSSProperties["position"] = "absolute"
const DEFAULT_DISPLAY = "block"
export const MIN_WIDTH = 400
export const MIN_HEIGHT = 400
const DEFAULT_WIDTH = 900
const DEFAULT_HEIGHT = 600
const DEFAULT_TOP = 100
const DEFAULT_LEFT = 200
const DEFAULT_TRANSITION = TRANSITION[DURATION.NONE]
const DEFAULT_TRANSFORM = ""
const DEFAULT_TRANSFORM_ORIGIN: CSSProperties["transformOrigin"] = "top left"

function useWindowPlacement(window: WindowType) {
  const [display, setDisplay] =
    useState<CSSProperties["display"]>(DEFAULT_DISPLAY)
  const [top, setTop] = useState<Placement["top"]>(DEFAULT_TOP)
  const [left, setLeft] = useState<Placement["left"]>(DEFAULT_LEFT)
  const [width, setWidth] = useState<Placement["width"]>(DEFAULT_WIDTH)
  const [height, setHeight] = useState<Placement["height"]>(DEFAULT_HEIGHT)
  const [transition, setTransition] =
    useState<CSSProperties["transition"]>(DEFAULT_TRANSITION)
  const [transform, setTransform] =
    useState<CSSProperties["transform"]>(DEFAULT_TRANSFORM)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [placementBeforeMaximize, setPlacementBeforeMaximize] =
    useState<Placement>({
      top: DEFAULT_TOP,
      left: DEFAULT_LEFT,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    })
  const [placementBeforeMinimize, setPlacementBeforeMinimize] =
    useState<Placement>({
      top: DEFAULT_TOP,
      left: DEFAULT_LEFT,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    })

  const setTransitionTimeout = useCallback(
    (transition: number) => {
      setTransition(TRANSITION[transition])
      setTimeout(() => {
        setTransition(TRANSITION[DURATION.NONE])
      }, transition)
    },
    [setTransition]
  )

  const maximize = useCallback(() => {
    const desktop = document.getElementById("desktop") as HTMLElement

    setTransitionTimeout(DURATION.SHORT)

    if (
      top === 0 &&
      left === 0 &&
      width === desktop.clientWidth &&
      height === desktop.clientHeight
    ) {
      setTop(placementBeforeMaximize.top)
      setLeft(placementBeforeMaximize.left)
      setWidth(placementBeforeMaximize.width)
      setHeight(placementBeforeMaximize.height)
    } else {
      setPlacementBeforeMaximize({ top, left, width, height })
      setTop(0)
      setLeft(0)
      setWidth(desktop.clientWidth)
      setHeight(desktop.clientHeight)
    }
  }, [
    setTransitionTimeout,
    top,
    left,
    width,
    height,
    placementBeforeMaximize.top,
    placementBeforeMaximize.left,
    placementBeforeMaximize.width,
    placementBeforeMaximize.height,
  ])

  useEffect(() => {
    const tab = document.getElementById(
      `windows-bar__window-${window.windowId}`
    )

    if (!tab) {
      setDisplay(window.isMinimized ? "none" : DEFAULT_DISPLAY)
      return
    }

    const tabRect = tab.getBoundingClientRect()

    setTransitionTimeout(DURATION.LONG)

    if (window.isMinimized) {
      setPlacementBeforeMinimize({ top, left, width, height })
      setTop(tabRect.top + tabRect.height / 2)
      setLeft(tabRect.left + tabRect.width / 2)
      setTransform("scale(0)")
    } else {
      setTop(placementBeforeMinimize.top)
      setLeft(placementBeforeMinimize.left)
      setTransform("")
    }
  }, [window.isMinimized])

  return {
    position: DEFAULT_POSITION,
    display,
    setDisplay,
    top,
    setTop,
    left,
    setLeft,
    width,
    setWidth,
    height,
    setHeight,
    maximize,
    transition,
    setTransition,
    transform,
    setTransform,
    transformOrigin: DEFAULT_TRANSFORM_ORIGIN,
    isDragging,
    setIsDragging,
  }
}

export default useWindowPlacement
