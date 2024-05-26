"use client"

import { CSSProperties, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import styles from "./Tooltip.module.css"

export enum POSITION {
  TOP = "top",
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM = "bottom",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
  LEFT = "left",
  RIGHT = "right",
}

type Props = {
  children: React.ReactNode
  text?: string
  duration?: number
  position?: POSITION
}

const MARGIN = 5
const DEFAULT_POSITION = POSITION.TOP

function Tooltip(props: Props) {
  const { children, text, duration, position } = props

  const [isShown, setIsShown] = useState(false)

  let top: CSSProperties["top"] = undefined
  let right: CSSProperties["right"] = undefined
  let bottom: CSSProperties["bottom"] = undefined
  let left: CSSProperties["left"] = undefined
  let transform: CSSProperties["transform"] = undefined

  switch (position ?? DEFAULT_POSITION) {
    case POSITION.TOP:
      bottom = `calc(100% + ${MARGIN}px)`
      left = "50%"
      transform = "translateX(-50%)"
      break
    case POSITION.TOP_LEFT:
      bottom = `calc(100% + ${MARGIN}px)`
      right = 0
      break
    case POSITION.TOP_RIGHT:
      bottom = `calc(100% + ${MARGIN}px)`
      left = 0
      break
    case POSITION.BOTTOM:
      top = `calc(100% + ${MARGIN}px)`
      left = "50%"
      transform = "translateX(-50%)"
      break
    case POSITION.BOTTOM_LEFT:
      top = `calc(100% + ${MARGIN}px)`
      right = 0
      break
    case POSITION.BOTTOM_RIGHT:
      top = `calc(100% + ${MARGIN}px)`
      left = 0
      break
    case POSITION.LEFT:
      top = "50%"
      right = `calc(100% + ${MARGIN}px)`
      transform = "translateY(-50%)"
      break
    case POSITION.RIGHT:
      top = "50%"
      left = `calc(100% + ${MARGIN}px)`
      transform = "translateY(-50%)"
      break
  }

  const show = useDebouncedCallback(() => {
    setIsShown(true)
  }, duration ?? 500)

  const hide = () => {
    show.cancel()
    setIsShown(false)
  }

  return (
    <span className={styles.anchor} onMouseOver={show} onMouseOut={hide}>
      <span
        className={styles.tooltip}
        style={{
          display: isShown ? "flex" : "none",
          top,
          right,
          bottom,
          left,
          transform,
        }}
      >
        {text}
      </span>
      {children}
    </span>
  )
}

export default Tooltip
