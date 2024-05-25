import { useCallback, useState } from "react"

export const MIN_WIDTH = 400
export const MIN_HEIGHT = 400
const DEFAULT_WIDTH = 900
const DEFAULT_HEIGHT = 600
const DEFAULT_TOP = 100
const DEFAULT_LEFT = 200

const DURATION = {
  NONE: 0,
  SMOOTH: 200,
}

const TRANSITION = {
  [DURATION.NONE]: `${DURATION.NONE}ms`,
  [DURATION.SMOOTH]: `${DURATION.SMOOTH}ms`,
}

function useWindowPlacement() {
  const [top, setTop] = useState(DEFAULT_TOP)
  const [left, setLeft] = useState(DEFAULT_LEFT)
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  const [height, setHeight] = useState(DEFAULT_HEIGHT)
  const [transition, setTransition] = useState(TRANSITION[DURATION.NONE])
  const [isDragging, setIsDragging] = useState(false)
  const [previousPlacement, setPreviousPlacement] = useState({
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

    setTransitionTimeout(DURATION.SMOOTH)

    if (
      top === 0 &&
      left === 0 &&
      width === desktop.clientWidth &&
      height === desktop.clientHeight
    ) {
      setTop(previousPlacement.top)
      setLeft(previousPlacement.left)
      setWidth(previousPlacement.width)
      setHeight(previousPlacement.height)
    } else {
      setPreviousPlacement({ top, left, width, height })
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
    previousPlacement.top,
    previousPlacement.left,
    previousPlacement.width,
    previousPlacement.height,
  ])

  return {
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
    isDragging,
    setIsDragging,
  }
}

export default useWindowPlacement
